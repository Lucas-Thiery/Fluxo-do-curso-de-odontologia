# FluxoOdontes 🦷

Um sistema web interativo e gamificado desenvolvido para ajudar estudantes de Odontologia a planejarem sua jornada acadêmica. O projeto transforma a tradicional matriz curricular em um mapa visual e inteligente.

## Principais Funcionalidades

* **Sistema de Cadeados Inteligente:** O código lê os pré-requisitos de cada disciplina e destranca automaticamente as matérias avançadas apenas quando as disciplinas básicas são marcadas como concluídas.
* **Mapeamento Visual Dinâmico:** Ao passar o mouse sobre uma matéria, o sistema utiliza SVG e JavaScript puro para gerar setas curvas animadas com cores aleatórias, conectando a disciplina aos seus dependentes futuros.
* **Painel de Progresso Real:** Barras de progresso que calculam a porcentagem de conclusão do curso baseadas na **carga horária real** das disciplinas, dividindo o progresso entre matérias obrigatórias e optativas.
* **Catálogo de Optativas:** Uma página dedicada e organizada por trilhas de conhecimento para o cumprimento das 240 horas de disciplinas optativas exigidas pelo curso.
* **Toggle de Carga Horária:** Um botão global no cabeçalho que permite exibir ou ocultar rapidamente as horas de todas as disciplinas na tela usando manipulação de classes CSS.

## Tecnologias Utilizadas

Este projeto foi construído sem o uso de frameworks externos, focando no domínio das bases da web:
* **HTML5:** Semântica e estruturação de dados usando atributos customizados (`data-requisito`, `data-horas`).
* **CSS3:** Flexbox, animações de interface (keyframes e transitions), custom properties e pseudo-elementos.
* **JavaScript (Vanilla):** Manipulação pesada da DOM, eventos, cálculos matemáticos, geração dinâmica de elementos SVG (criação de paths matemáticos e marcadores) e renderização condicional.

## Como Executar o Projeto

Como o projeto utiliza apenas tecnologias nativas do navegador, a execução é simples e direta:

1. Clone este repositório: `git clone https://github.com/SEU_USUARIO/FluxoOdontes.git`
2. Abra a pasta do projeto.
3. Dê um duplo clique no arquivo `index.html` para abri-lo em qualquer navegador de sua preferência.

## Sobre o Desenvolvedor

Projeto de férias desenvolvido por **Lucas Thiery** em 2026. A ideia nasceu da necessidade de unir tecnologia e usabilidade para resolver o problema de organização acadêmica na faculdade.
