//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let imgValue = document.getElementById("imagenPerfil");
let btn = document.getElementById("perfil");


btn.addEventListener("click", function(e){

let nombre = document.getElementById("nombrePerfil");
let apellido = document.getElementById("apellidoPerfil");
let mail = document.getElementById("mailPerfil");
let tel = document.getElementById("telefonoPerfil");
let edad = document.getElementById("edadPerfil");
let imgPerfil = document.getElementById("imagenPerfil");
var validar = true;

if(nombre.value.trim()=== ""){
    validar = false;
}

if(apellido.value.trim()=== ""){
    validar = false;
}
if(mail.value.trim()=== ""){
    validar = false;
}

if(tel.value.trim()=== ""){
    validar = false;
}

if(edad.value.trim()=== ""){
    validar = false;
}
if(imgPerfil.value.trim() === ""){
    validar = false;
}

      if(validar){
        localStorage.setItem("usuario",
        JSON.stringify({
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            mail: mail.value,
            tel: tel.value,
            imgPerfil: imgPerfil.value
        }));
        console.log({localStorage})
    }
});
let userLog= localStorage.getItem("user-logged");
if(userLog){
let newProf = localStorage.getItem("usuario")
if(newProf){
    newProf = JSON.parse(newProf);
    if (newProf.imgPerfil != ""){
        document.getElementById("minuta").src = newProf.imgPerfil;
    }
    document.getElementById("nombrePerfil").value = newProf.nombre;
    document.getElementById("apellidoPerfil").value = newProf.apellido;
    document.getElementById("mailPerfil").value = newProf.mail;
    document.getElementById("telefonoPerfil").value = newProf.tel;
    document.getElementById("edadPerfil").value = newProf.edad;
}
}





 

