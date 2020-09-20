//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var comentariosArray = [];
var productRelated = [];

function showRelated(products, productRelated) {
  let cont = "";
  productRelated.forEach(function (i) {
    cont += `
            
    <div class="col-md-4">
    <a href="categories.html" class="card mb-4 shadow-sm custom-card">
      <img class="bd-placeholder-img card-img-top" src="${products[i].imgSrc}">
      <h3 class="m-3">${products[i].name}</h3>
      <div class="card-body">
      <p class="card-text">U$S ${products[i].cost}</p>
        <p class="card-text">${products[i].description}</p>
      </div>
    </a>
  </div>` ;

  });

  document.getElementById("relatedProduct").innerHTML = cont;
}

function showProduct(product, comentariosArray) {
  let info = "";
  let comments = "<hr>"
  info += `
    <div class="container mt-5">
    <div class="text-center p-4">
      <h2>Descripción del producto</h2>
      <p class="lead">Encontrarás aquí toda la información del producto seleccionado.</p>
      
    </div>
    <h3>${product.name}</h3>
    <hr class="my-3">
    <dl>
      <dt>Descripción</dt>
      <dd>
        <p>${product.description}</p>
      </dd>

      <dt>Precio</dt>
      <dd>
        <p>USD ${product.cost}</p>
      </dd>

      <dt>Cantidad de vendidos</dt>
      <dd>
        <p>${product.soldCount}</p>
      </dd>

      <dt>Imágenes ilustrativas</dt>
      <dd>
        <div class="row text-center text-lg-left pt-2" id="productImagesGallery">
        </div>
      </dd>
    </dl>
    <a type="button" class="btn btn-light btn-lg btn-block" href="products.html">Ver productos</a>
  </div>
  `;
  comentariosArray.forEach(function (comment) {
    let puntos = "";
    comments += `<strong>${comment.user}</strong> dice:<br>
      <p>${comment.description}</p>
      `;

    for (let i = 1; i <= comment.score; i++) {
      puntos += `<span class=" fa fa-star checked"></span>`;
    }
    for (let i = comment.score + 1; i <= 5; i++) {
      puntos += `<span class=" fa fa-star"></span>`;
    }
    comments += `<sub>${comment.dateTime}</sub><br>`;
    comments += `<div style="text-align: right;">${puntos}</div><br><hr>`
  });
  document.getElementById("listProduct").innerHTML = info;
  info = info + showImagesGallery(product.images);
  document.getElementById("commentProducts").innerHTML = comments;
}

function showImagesGallery(array) {

  let htmlContentToAppend = "";

  for (let i = 0; i < 1 ; i++) {
    let imageSrc = array[i];

    htmlContentToAppend += `
     
       
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${array[0]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${array[1]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${array[2]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${array[3]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${array[4]}" class="d-block w-100" alt="...">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
        `

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {

  let userLog = localStorage.getItem("user-logged");
  if (userLog) {
    document.getElementById("nuevoComentario").style = "display: inline-block;";
  }


  document.getElementById("sendComment").addEventListener("click", function () {
    let now = new Date();
    let dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    let newComment = {
      score: parseInt(estrellas()),
      description: document.getElementById("comentario").value,
      user: JSON.parse(localStorage.getItem("user-logged")).user,
      dateTime: dateTime
    };
    comentariosArray.push(newComment);
    showProduct(product, comentariosArray);
  });

  function estrellas() {
    let stars = document.getElementsByName("rating");
    for (let i = 0; i <= stars.length; i++) {
      if (stars[i].checked) {
        return stars[i].value
      }
    }
  }


  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentariosArray = resultObj.data;
    }
  });

  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
      showProduct(product, comentariosArray);
    }
  });
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productRelated = resultObj.data;

      showRelated(productRelated, product.relatedProducts);
    }
  });
});