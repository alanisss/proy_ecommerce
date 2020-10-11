//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var articulo = {};
var cart = [];

function CostoTotal() {
    let total = 0;
    let cantSub = document.getElementsByClassName("total");
    for (let i = 0; i < cantSub.length; i++) {
        total += parseInt(cantSub[i].innerHTML);
    }

    document.getElementById("sumaTotal").innerHTML = total;
}

function SubtotalC(unitCost, i) {
    let count = parseInt(document.getElementById(`cant${i}`).value);
    subTot = unitCost * count;
    document.getElementById(`sumaSubtotal${i}`).innerHTML = subTot

    CostoTotal();
}
function conversion(currency, cost){
    if(currency === "UYU"){
        return cost /40;
    }else{
        return cost
    }
}

function showArticles(atributos) {
    let content = "";
    for (let i = 0; i < atributos.length; i++) {
        
        let articles = atributos[i];
        let costoDolares = conversion(articles.currency, articles.unitCost)
        let subTotal = costoDolares;
        content +=
            `
        <tr>
        <td><img src= '${articles.src}' width="100px"></td>
        <td>${articles.name}</td>
        <td>USD ${costoDolares}</td>
        <td><input style="width:60px;" onchange="SubtotalC(${costoDolares}, ${i})"
        type="number" id="cant${i}" value="${articles.count}" min="1"></td>
        <td><span id="sumaSubtotal${i}" class="total" style="font-weight:bold;">${subTotal}</span></td>
        </tr>


        `
        document.getElementById("TD").innerHTML = content;
    }
    CostoTotal();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data.articles;
            showArticles(cart);
        }
    });

});