const materias = document.querySelectorAll('.materia');
const telaSetas = document.getElementById('setas');

function gerarCorAleatoria() {
    const hue = Math.floor(Math.random() * 360); 
    return `hsl(${hue}, 85%, 65%)`; 
}

materias.forEach(materia => {

    materia.addEventListener('click', function(){
        if(this.classList.contains('trancada')){
            return;
        }

        this.classList.toggle('concluida');
        verificarRequisitos();
        atualizarProgresso();
    });

    materia.addEventListener('mouseover', function() {
        if (this.classList.contains('trancada')){
            return;
        }

        const idAtual = this.id;
        if (!idAtual){
            return;
        }

        const todasComRequisito = document.querySelectorAll('[data-requisito]');
        const dependentes = [];

        todasComRequisito.forEach(dep => {
            const requisitos = dep.getAttribute('data-requisito').split(',');
            
            if (requisitos.includes(idAtual)) {
                dependentes.push(dep); 
            }
        });

        dependentes.forEach(dep => {
            dep.classList.add('destaque-dependente'); 
            desenharSeta(this, dep);
        });
    });
    
    materia.addEventListener('mouseout', function() {
        const idAtual = this.id;
        if (!idAtual) return;
        
        const todasComRequisito = document.querySelectorAll('[data-requisito]');
        const dependentes = [];

        todasComRequisito.forEach(dep => {
            const requisitos = dep.getAttribute('data-requisito').split(',');
            if (requisitos.includes(idAtual)) {
                dependentes.push(dep);
            }
        });

        dependentes.forEach(dep => {
            dep.classList.remove('destaque-dependente'); 
        });

        if (telaSetas) {
            const setas = telaSetas.querySelectorAll('.seta-desenhada');
            setas.forEach(seta => seta.remove());

            const pontas = telaSetas.querySelectorAll('.ponta-dinamica');
            pontas.forEach(ponta => ponta.remove());
        }
    });
});

function desenharSeta(origem, destino){
    if (!telaSetas) return; 

    const corSeta = gerarCorAleatoria();
    const idPonta = 'ponta-' + Math.random().toString(36).substr(2, 9);

    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', idPonta);
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '8');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('class', 'ponta-dinamica'); 

    const pathPonta = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathPonta.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    pathPonta.setAttribute('fill', corSeta); 
    marker.appendChild(pathPonta);

    let defs = telaSetas.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        telaSetas.appendChild(defs);
    }
    defs.appendChild(marker);

    const posOrigem = origem.getBoundingClientRect();
    const posDestino = destino.getBoundingClientRect();

    const x1 = posOrigem.right;
    const y1 = posOrigem.top + (posOrigem.height / 2);
    const x2 = posDestino.left;
    const y2 = posDestino.top + (posDestino.height / 2);

    const distanciaX = Math.max(Math.abs(x2 - x1) * 0.5, 40);
    const caminhoD = `M ${x1} ${y1} C ${x1 + distanciaX} ${y1}, ${x2 - distanciaX} ${y2}, ${x2} ${y2}`;

    const caminho = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    caminho.setAttribute('d', caminhoD);
    caminho.setAttribute('fill', 'none');
    caminho.setAttribute('stroke', corSeta); 
    caminho.setAttribute('stroke-width', '3'); 
    caminho.setAttribute('stroke-linecap', 'round'); 
    caminho.setAttribute('marker-end', `url(#${idPonta})`); 
    caminho.setAttribute('class', 'seta-desenhada'); 

    telaSetas.appendChild(caminho);
}

function verificarRequisitos(){
    const materiasComRequisito = document.querySelectorAll('[data-requisito]');

    materiasComRequisito.forEach(materiaDependente =>{ 
        const idsRequisitos = materiaDependente.getAttribute('data-requisito').split(',');

        const podeDestrancar = idsRequisitos.every(idAtual => {
            const materiaRequisito = document.getElementById(idAtual);
            return materiaRequisito && materiaRequisito.classList.contains('concluida');
        });

        if(podeDestrancar){
            materiaDependente.classList.remove('trancada');
        } else {
            materiaDependente.classList.add('trancada');
            materiaDependente.classList.remove('concluida');
        }
    });
}


function atualizarProgresso() {
    const obrigatorias = document.querySelectorAll('.materia:not(.optativa)');
    const obrigatoriasConcluidas = document.querySelectorAll('.materia.concluida:not(.optativa)');
    
    const optativas = document.querySelectorAll('.materia.optativa');
    const optativasConcluidas = document.querySelectorAll('.materia.optativa.concluida');

    const somarHoras = (listaDeMaterias) => {
        let total = 0;
        listaDeMaterias.forEach(materia => {
            const horas = parseInt(materia.getAttribute('data-horas')) || 0;
            total += horas;
        });
        return total;
    };

    const totalHorasObrigatorias = somarHoras(obrigatorias);
    const horasObrigatoriasConcluidas = somarHoras(obrigatoriasConcluidas);

    const totalHorasOptativas = 240; 
    const horasOptativasConcluidas = somarHoras(optativasConcluidas);

    const porcObrigatorias = totalHorasObrigatorias > 0 
        ? Math.round((horasObrigatoriasConcluidas / totalHorasObrigatorias) * 100) 
        : 0;

    let porcOptativas = totalHorasOptativas > 0 
        ? Math.round((horasOptativasConcluidas / totalHorasOptativas) * 100) 
        : 0;

    if (porcOptativas > 100) {
        porcOptativas = 100;
    }

    const barraObrig = document.getElementById('progresso-obrigatorias');
    const textoObrig = document.getElementById('texto-obrigatorias');
    
    if (barraObrig && textoObrig) {
        barraObrig.style.width = `${porcObrigatorias}%`;
        textoObrig.innerText = `${porcObrigatorias}% (${horasObrigatoriasConcluidas}h / ${totalHorasObrigatorias}h)`;
    }

    const barraOpt = document.getElementById('progresso-optativas');
    const textoOpt = document.getElementById('texto-optativas');

    if (barraOpt && textoOpt) {
        barraOpt.style.width = `${porcOptativas}%`;
        textoOpt.innerText = `${porcOptativas}% (${horasOptativasConcluidas}h / ${totalHorasOptativas}h)`;
    }
}

atualizarProgresso();
    