const body = document.querySelector("body");
const demoAPIContainer = body.querySelector(".demoAPIContainer");
const BASE_URL = "http://localhost:3000/productos/"

async function request() {
    try{
        const res = await fetch(BASE_URL);
        if(!res.ok){
            throw new Error ("Error al procesar los datos");
        }
        const parsed = await res.json();
        return parsed;
    }catch (err){
        throw new Error ("Error al procesar los datos");
    }
}

request()
.then(data =>{
    data.slice(0, 8).forEach(element => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${ element.img }">
            <div>
                <a id="${element.id}" href="${BASE_URL + element.id}" target="_blank"> ${ element.nombre } </a>
                <p> <span> Marca: </span> ${element.marca} </p>
                <p> <span> Categoría: </span> ${element.categoria} </p>
                <p> <span> Descripción: </span> ${element.descripcion} </p>
                <p> <span> Precio: </span>$ ${element.precio} </p>
            </div>
        `;
        
        demoAPIContainer.appendChild(div);
    });
    const count = document.createElement("div");
    count.innerHTML= `
    <p style="color: white;">Mostrando 8 elementos de ${data.length}</p>
    `
    demoAPIContainer.appendChild(count);
}
)
