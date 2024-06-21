const urlApi = "http://localhost:3000"

const loadingElement = document.querySelector("#loading")

// * pegar todos os produtos ja cadastrados

async function getProducts() {
    
    const response = await fetch(urlApi);

    console.log(response);

    const data = await response.json();

    console.log(data);

    loadingElement.classList.add("hide");

    data.map((product) => {

        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

    }) 

}

getProducts();