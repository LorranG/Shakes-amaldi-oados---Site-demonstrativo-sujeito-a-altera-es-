const form = document.getElementById("formComentario");
const input = document.getElementById("inputComentario");
const lista = document.getElementById("listaComentarios");

// Carregar comentários salvos
let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

// Função para salvar
function salvarComentarios() {
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

// Função para exibir todos os comentários
function renderizarComentarios() {
  lista.innerHTML = "";
  comentarios.forEach((texto, index) => {
    const div = document.createElement("div");
    div.classList.add("comentario-item");

    const p = document.createElement("p");
    p.textContent = texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("botao-excluir");

    botaoExcluir.addEventListener("click", () => {
      comentarios.splice(index, 1); // remove do array
      salvarComentarios();
      renderizarComentarios(); // atualiza lista
    });

    div.appendChild(p);
    div.appendChild(botaoExcluir);
    lista.appendChild(div);
  });
}

// Adicionar novo comentário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto) {
    comentarios.push(texto);
    salvarComentarios();
    renderizarComentarios();
    input.value = "";
  }
});

// Renderiza os existentes ao abrir
renderizarComentarios();
