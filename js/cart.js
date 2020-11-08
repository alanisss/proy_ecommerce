//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var articulo = {};
var cart = [];
let st = document.getElementById("Calle")
let esq = document.getElementById("Esquina")
let pais = document.getElementById("paisel")
let numero = document.getElementById("Numero")

let tarjeta = document.getElementById("numTarjeta")
let cuentabanco = document.getElementById("numCuenta")
let titular = document.getElementById("titularTarjeta")
let cvc = document.getElementById("cvc")


//Función de costo total
function CostoTotal() {
    let total = 0;
    let cantSub = document.getElementsByClassName("total");
    for (let i = 0; i < cantSub.length; i++) {
        total += parseInt(cantSub[i].innerHTML);
    }

    document.getElementById("sumaTotal").innerHTML = total;
}

//Función del subtotal
function SubtotalC(unitCost, i) {
    let count = parseInt(document.getElementById(`cant${i}`).value);
    subTot = unitCost * count;
    document.getElementById(`sumaSubtotal${i}`).innerHTML = subTot

    CostoTotal();
    costoEnvio();
}

//Función que convierte los pesos Uruguayos en dólares
function conversion(currency, cost) {
    if (currency === "UYU") {
        return cost / 40;
    } else {
        return cost
    }
}

//Función que que muestra los artículos de la tienda, a su vez hace uso de las funciones de conversión y costo total
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

//Función que calcula el costo de envío
function costoEnvio() {
    let sumaTotal = parseInt(document.getElementById("sumaTotal").innerHTML);
    let env;
    let content = "";
    let coso = document.getElementsByName("carlos")

    for (var i = 0; i < coso.length; i++) {
        if (coso[i].checked) {
            env = parseInt(coso[i].value);
        }
    }
    let costoEnvio = (env * sumaTotal) / 100;
    let envioTotal = sumaTotal + costoEnvio;


    content += `
    <tr>
    <td> USD ${costoEnvio}</td>
    <td>USD ${envioTotal}</td>
    </tr>`;

    document.getElementById("totalEnvio").innerHTML = content;
}

//Función que te deja seleccionar el tipo de pago que quiere el usuario
function modoPago() {
    var pagos = document.getElementsByName("metodo");
    for (var i = 0; i < pagos.length; i++) {
        if (pagos[i].checked && (pagos[i].value) == "1") {
            document.getElementById("datosTarjeta").classList.remove("d-none");
            document.getElementById("datosBanco").classList.add("d-none");

        } else if (pagos[i].checked && (pagos[i].value) == "2") {
            document.getElementById("datosTarjeta").classList.add("d-none");
            document.getElementById("datosBanco").classList.remove("d-none");
        }
    }
}


//Agrega o quita check formulario
st.addEventListener("input", function (e) {
    validar("st")
});
numero.addEventListener("input", function (e) {
    validar("numero")
});
esq.addEventListener("input", function (e) {
    validar("esq")
});

pais.addEventListener("input", function (e) {
    validar("pais")
});
function validar(campo) {

    if (campo === "st") {
        if (st.value.trim() === "") {
            if (st.classList.contains("is-valid") === true) {
                st.classList.remove("is-valid");
            }
            if (st.classList.contains("is-invalid") === false) {
                st.classList.add("is-invalid");
            }
        } else {
            if (st.classList.contains("is-invalid") === true) {
                st.classList.remove("is-invalid");

            } st.classList.add("is-valid");

        }
    }

    if (campo === "numero") {
        if (numero.value.trim() === "") {
            if (numero.classList.contains("is-valid") === true) {
                numero.classList.remove("is-valid");
            }
            if (numero.classList.contains("is-invalid") === false) {
                numero.classList.add("is-invalid");
            }
        } else {
            if (numero.classList.contains("is-invalid") === true) {
                numero.classList.remove("is-invalid");

            } numero.classList.add("is-valid");

        }
    }

    if (campo === "esq") {
        if (esq.value.trim() === "") {
            if (esq.classList.contains("is-valid") === true) {
                esq.classList.remove("is-valid");
            }
            if (esq.classList.contains("is-invalid") === false) {
                esq.classList.add("is-invalid");
            }
        } else {
            if (esq.classList.contains("is-invalid") === true) {
                esq.classList.remove("is-invalid");

            } esq.classList.add("is-valid");

        }
    }

    if (campo === "pais") {
        if (pais.value.trim() === "") {
            if (pais.classList.contains("is-valid") === true) {
                pais.classList.remove("is-valid");
            }
            if (pais.classList.contains("is-invalid") === false) {
                pais.classList.add("is-invalid");
            }
        } else {
            if (pais.classList.contains("is-invalid") === true) {
                pais.classList.remove("is-invalid");

            } pais.classList.add("is-valid");

        }
    }
}


//Agrega o quita check del modal 
tarjeta.addEventListener("input", function (e) {
    validarTarjeta("tarjeta");
});


cuentabanco.addEventListener("input", function (e) {
    validarTarjeta("cuentabanco");
});


titular.addEventListener("input", function (e) {
    validarTarjeta("titular");
});


cvc.addEventListener("input", function (e) {
    validarTarjeta("cvc");
});

function validarTarjeta(campoModal) {



    if (campoModal === "tarjeta") {
        if (tarjeta.value.trim() === "") {
            if (tarjeta.classList.contains("is-valid") === true) {
                tarjeta.classList.remove("is-valid");
            }
            if (tarjeta.classList.contains("is-invalid") === false) {
                tarjeta.classList.add("is-invalid");
            }
        } else {
            if (tarjeta.classList.contains("is-invalid") === true) {
                tarjeta.classList.remove("is-invalid");

            } tarjeta.classList.add("is-valid");

        }
    }

    if (campoModal === "cuentabanco") {
        if (cuentabanco.value.trim() === "") {
            if (cuentabanco.classList.contains("is-valid") === true) {
                cuentabanco.classList.remove("is-valid");
            }
            if (cuentabanco.classList.contains("is-invalid") === false) {
                cuentabanco.classList.add("is-invalid");
            }
        } else {
            if (cuentabanco.classList.contains("is-invalid") === true) {
                cuentabanco.classList.remove("is-invalid");

            } cuentabanco.classList.add("is-valid");

        }
    }
    if (campoModal === "titular") {
        if (titular.value.trim() === "") {
            if (titular.classList.contains("is-valid") === true) {
                titular.classList.remove("is-valid");
            }
            if (titular.classList.contains("is-invalid") === false) {
                titular.classList.add("is-invalid");
            }
        } else {
            if (titular.classList.contains("is-invalid") === true) {
                titular.classList.remove("is-invalid");

            } titular.classList.add("is-valid");

        }
    }

    if (campoModal === "cvc") {
        if (cvc.value.trim() === "") {
            if (cvc.classList.contains("is-valid") === true) {
                cvc.classList.remove("is-valid");
            }
            if (cvc.classList.contains("is-invalid") === false) {
                cvc.classList.add("is-invalid");
            }
        } else {
            if (cvc.classList.contains("is-invalid") === true) {
                cvc.classList.remove("is-invalid");

            } cvc.classList.add("is-valid");

        }
    }

}
document.getElementById("compra").addEventListener("click", function () {
    rezongarKawaii();
});

//Función que te envía un alert dependiendo de la validación
function rezongarKawaii() {
    var campovacio = false;
    if (document.getElementById("credito").checked === true) {
        if (tarjeta.value === "") {
            campovacio = "Número de tarjeta";

        }
        if (titular.value === "") {
            campovacio = "Nombre de titular";

        }
        if (cvc.value === "") {
            campovacio = "CVC";

        }
    } else {
        if (cuentabanco.value === "") {
            campovacio = "Número de cuenta";

        }
    } if (campovacio === false) {
        alert("COMPRA APROBADA!");
    } else {
        alert("El campo " + campovacio + " está vacío");
    }
}

document.getElementById("botoncito").addEventListener("click", function () {
    rezongarForm();
});
function rezongarForm() {
    var vacio = false;
    if (st.value === "") {
        vacio = "Calle";

    }
    if (esq.value === "") {
        vacio = "Esquina";

    }
    if (pais.value === "") {
        vacio = "País";

    }
    if (numero.value === "") {
        vacio = "Número";

    }
     if (vacio === false) {
        alert("Puede continuar");
    } else {
        alert("El campo " + vacio + " está vacío");
    }
}
//Trae el JSON de los artículos del carrito
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data.articles;
            showArticles(cart);
            costoEnvio();
        }
    });


});

