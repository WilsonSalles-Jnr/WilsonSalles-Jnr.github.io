import projetos from "./projectList.js";
import skillList from "./skillList.js";
const projectSection = document.getElementsByClassName('project-list')[0];

const CARD = "card";
const newItem = "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger";
const cardImg = "card-img-top";
const cardBody = "card-body";
const cardTitle = "card-title";
const cardText = "card-text";
const cardTag = "badge rounded-pill bg-warning text-dark m-1";
const linkProject = "btn btn-primary m-1";
const linkCode = "btn btn-secondary m-1";

const checkLocal = () => {
  if (!localStorage.visita) {
    localStorage.visita = Date.parse('1900/01/01')
  }
  return localStorage.visita
}

const isNew = (data, toAppend) => {
  const dia = data.slice(0,2);
  const mes = data.slice(3,5);
  const ano = data.slice(6,10);
  if (Date.parse(`${ano}/${mes}/${dia}`) - checkLocal() > 0) {
    const span = document.createElement('span');
    span.className = newItem;
    span.innerText = "NEW";
    toAppend.appendChild(span);
  }
}

const appendProject = (project, indice) => {
  // CRIA O CARD
  const section = document.createElement('section');
  section.id = `project-${indice}`
  section.className = CARD;
  section.style = "width: 18rem";
  projectSection.appendChild(section);
  // SELECIONA O CARD RECÉM CRIADO
  const createdCard = document.getElementById(`project-${indice}`)
  // INSERE ITENS NO CARD
  const image = document.createElement('img');
  image.className = cardImg;
  image.src = project.imagem;
  image.alt = project.nome;
  isNew(project.data, createdCard);
  createdCard.appendChild(image);
  // CRIA SEÇÃO ABAIXO DA IMAGEM
  const body = document.createElement('section');
  body.className = cardBody;
  body.id = `body-${indice}`
  createdCard.appendChild(body);
  // SELETOR DE SEÇÃO ABAIXO DA IMAGEM
  const createdBody = document.getElementById(`body-${indice}`);
  // INSERE TÍTULO
  const title = document.createElement('h3');
  title.className = cardTitle;
  title.innerText = project.nome;
  createdBody.appendChild(title);
  // INSERE DESCRIÇÃO
  const paragraph = document.createElement('p');
  paragraph.className = cardText;
  paragraph.innerText = project.descricao;
  createdBody.appendChild(paragraph);
  // INSERE TAGS
  project.tags.map((tag) => {
    const span = document.createElement('span');
    span.className = cardTag
    span.innerText = tag;
    createdBody.appendChild(span);
  })
  // INSERE QUEBRA DE LINHA
  const breaking = document.createElement('br');
  createdBody.appendChild(breaking);
  // INSERE BOTÕES
  if ( project.linkProjeto !== "") {
    const linker = document.createElement('a');
    linker.href = project.linkProjeto;
    linker.target ="_blank";
    linker.className = linkProject;
    linker.innerText = "Ver Projeto";
    createdBody.appendChild(linker);
  };
  const code = document.createElement('a');
  code.href = project.linkRepositorio;
  code.target = "_blank";
  code.className = linkCode;
  code.innerText = "Ver código";
  createdBody.appendChild(code);

}

window.onload = () => {
  // console.log(Object.keys(skillList[0])[0])
  projetos.map((projeto, indice) => appendProject(projeto, indice))
  localStorage.visita = Date.now();

}
