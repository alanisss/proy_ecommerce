//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "cost->COST";
const ORDER_DESC_BY_COST = "COST->cost";
const ORDER_DESC_BY_REL ="SOLDCOUNT->soldcount";

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj){
    if(resultObj.status === "ok"){
        productsArray = resultObj.data ;
    //Muestro categorías ordenadamente
    showProductsList(productsArray);
    }
});
});
var productsArray = [];
var minCost = undefined;
var maxCost = undefined;
var buscar = undefined;
function sortProducts(criterio, array) {
    let result = [];
    if (criterio === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b){
            if (a.cost < b.cost){ return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_COST) {
        result = array.sort(
            function (a, b) {
                if (a.cost > b.cost){
                    return -1;
                }

                if (a.cost < b.cost) {
                    return 1;
                }

                return 0;
            
    });
    
    } else if (criterio === ORDER_DESC_BY_REL){
        result = array.sort(function (a, b){
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }
    return result;
}
document.getElementById("descendente").addEventListener("click", function(e){
    productsArray = sortProducts(ORDER_DESC_BY_COST, productsArray);
    document.getElementById("ascendente").classList.remove('active');
    document.getElementById("relevancia").classList.remove('active');

    showProductsList(productsArray);

});
document.getElementById("ascendente").addEventListener("click", function(e){
    productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);
    document.getElementById("descendente").classList.remove('active');
    document.getElementById("relevancia").classList.remove('active');

    showProductsList(productsArray);

});
document.getElementById("relevancia").addEventListener("click", function(e){
    productsArray = sortProducts(ORDER_DESC_BY_REL, productsArray);
    document.getElementById("ascendente").classList.remove('active');
    document.getElementById("descendente").classList.remove('active');

    showProductsList(productsArray);

});

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
        
            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1){

            
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + " - USD $" + product.cost + `</h4>
                            <small class="text-muted">` + product.soldCount + " vendidos" + ` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        }
            document.getElementById("ProductList").innerHTML = htmlContentToAppend;
        }

        
    }
    
    document.getElementById("FilterCost").addEventListener("click", function(){
        
        minCost = document.getElementById("MinCost").value;
        maxCost = document.getElementById("MaxCost").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList(productsArray);
    });
    
    document.getElementById("clearFilter").addEventListener("click", function(){
        document.getElementById("MinCost").value = "";
        document.getElementById("MaxCost").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList(productsArray);
    });

    document.getElementById("buscador").addEventListener('input', function(){
        buscar = document.getElementById("buscador").value.toLowerCase();
        showProductsList(productsArray);
    });