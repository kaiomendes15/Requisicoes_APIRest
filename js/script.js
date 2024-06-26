

const urlApi = "http://localhost:3000/produtos"

// * GET

async function carregarProdutos() {
    const requestMethod = {
        method: "GET"
    };

    const response = await fetch(urlApi, requestMethod)
    const produtos = await response.json();

    alimentarCards(produtos);

}


function alimentarCards(produtos) {
    const htmlCards = produtos.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${item.nome}" style="width: 50px;">
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <h4>${item.preco}</h4>
        </div>
    `);

    const htmlConteudo = htmlCards.join("");
    document.getElementById('card').innerHTML = htmlConteudo;
}

// * POST

async function salvarProduto() {
    const nomeProduto = document.getElementById('nome').value;
    const precoProduto = document.getElementById('preco').value;
    const descProduto = document.getElementById('descricao').value;
    const image = document.getElementById("image").files[0];

    // ! tratamento de erro para campo vazio

    if (!nomeProduto) {
        Swal.fire({
            title: "Por favor, insira um nome para o produto",
            icon: "error"
        });
        return;
    }

    if (!precoProduto) {
        Swal.fire({
            title: "Por favor, insira um preço para o produto",
            icon: "error"
        });
        return;
    }

    if (!image) {
        Swal.fire({
            title: "Por favor, selecione uma imagem para o produto",
            icon: "error"
        });
        return;
    }

    let reader = new FileReader();
    reader.onload = async function() {
        const imageBase64 = reader.result;

        const payload = {
            nome: nomeProduto,
            preco: precoProduto,
            descricao: descProduto,
            image: imageBase64
        };

        const requestMethod = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch(urlApi, requestMethod);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const modal = document.getElementById('staticBackdrop');
            bootstrap.Modal.getInstance(modal).hide();

            carregarProdutos();
        } catch (error) {
            console.error('Error saving product:', error);
            Swal.fire({
                title: "Erro ao salvar produto",
                text: error.message,
                icon: "error"
            });
        }
        carregarProdutos()
    };

    reader.readAsDataURL(image);
}

// * PUT

function updateUser(id, name, quantidade, preco) {
    const users = getUsers();
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index].name = name;
        users[index].quantidade = quantidade;
        users[index].preco = preco;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Call the function to load users when the page loads
document.addEventListener('DOMContentLoaded', carregarProdutos);
document.getElementById('btn-salvarProduto').addEventListener('click', salvarProduto)