const { title } = require("process");

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

async function salvarProduto() {
    const nomeProduto = document.getElementById('nome').value
    const precoProduto = document.getElementById('preco').value
    const descProduto = document.getElementById('descricao').value
    const image = document.getElementById("image").files[0]

    // ! tratamento de erro para campo vazio

    if (!nomeProduto) {
        Swal.fire({
            title: "Por favor, insira um nome para o produto",
            icon: "error"
        })
        return;
    }

    if (!precoProduto) {
        Swal.fire({
            title: "Por favor, insira um preço para o produto",
            icon: "error"
        })
        return;
    }

    let reader = new FileReader()
    reader.onload = async function() {
        const imageBase64 = reader.result

        const payload = {
            nome: nomeProduto,
            preco: precoProduto,
            descricao: descProduto,
            image: imageBase64
        }
        const requestMethod = {
            method: "POST",
            body: JSON.stringify(payload)
        };

        await fetch(urlApi, requestMethod)

        const modal = document.getElementById('staticBackdrop');
        bootstrap.Modal.getInstance(modal).hide()

        carregarUsuarios()
    }

    reader.readAsDataURL(image)

}

// Call the function to load users when the page loads
document.addEventListener('DOMContentLoaded', carregarUsuarios);
document.getElementById('btn-salvarProduto').addEventListener('click', salvarProduto)