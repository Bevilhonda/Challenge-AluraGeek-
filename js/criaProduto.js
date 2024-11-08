import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-formulario]");

async function criarProduto(evento){
  evento.preventDefault();

  const nome = document.querySelector("[data-titulo]").value;
  const valor = document.querySelector("[data-valor]").value;
  const imagem = document.querySelector("[data-imagem]").value;
  
  try {

    await conectaApi.criaProduto(nome,valor,imagem) ;

    window.location.href = "../index.html";

  } catch(error) {

    alert(error); // tratar essa mensagem no futuro

  }

}

formulario.addEventListener("submit", criarProduto);