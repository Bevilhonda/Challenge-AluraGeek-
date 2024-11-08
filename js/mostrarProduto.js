import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

export default function construirProduto(titulo, valor, imagem,id) {

  const produto = document.createElement("div");

  produto.className = "card";
  produto.innerHTML = `<img class="img__produtos" src="${imagem}" alt="imagem produto">
                    <div class="card-container--info" data-id="${id}">
                        <p class="nome__produto">${titulo}</p>
                        <div class="card-container--value">
                            <p class="preco__produto">${valor}</p>
                            <input class="img__lixo"
                             type="image" 
                             src="img/trash.png"
                              alt="Ícone excluir">
                        </div>
                    </div>`;

  const deleteButton = produto.querySelector(".img__lixo");
  deleteButton.addEventListener("click", async () => {
    try {
      await conectaApi.deleteProduto(id);
      produto.remove();
      console.log(`Produto com ID ${id} excluído.`);
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  });

  return produto;

}

async function listaProdutos() {
  try {
    const listaApi = await conectaApi.listaProdutos();
    listaApi.forEach(elemento => lista.appendChild(
      construirProduto(elemento.titulo, elemento.valor, elemento.imagem, elemento.id)))
  } catch {
    lista.innerHTML = `<h2 class = "mensagemErrorLista">
    Não foi possível carregar a lista de produtos
    </h2>`
  }
}

listaProdutos();