const urlApi = "http://localhost:3000/produtos"

// * GET

async function carregarUsuarios() {
    const requestMethod = {
        method: "GET"
    };

    const response = await fetch(urlApi, requestMethod)
    const produtos = await response.json();

    alimentarCards(produtos);

}

function alimentarCards(produtos) {
    const htmlCards = produtos.map(item =>
        
        `
        <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.descricao}</p>
            <h4>${item.price}</h4>
        </div>
        `
    )

    const htmlConteudo = htmlCards.join("")
    document.getElementById('card').innerHTML = htmlConteudo
}

// Call the function to load users when the page loads
document.addEventListener('DOMContentLoaded', carregarUsuarios);