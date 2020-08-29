//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/*document.addEventListener("DOMContentLoaded", function(e){
document.getElementById("entrar").addEventListener("click", function(e) {
    let inputEmail = document.getElementById("mail");
    let inputPassword = document.getElementById("pass");
    let camposCompletos = true;
    
    if (inputEmail.value === ''){
        inputEmail.classList.add("invalid");
        camposCompletos = false;
    }
    if (inputPassword.value === ''){
        inputPassword.classList.add("invalid");
        camposCompletos = false;
    }
    if (camposCompletos) {
localStorage.setItem('Usuario', JSON.stringify({ email: inputEmail.value}));
window.location = 'home.html';
}else{
    alert("Debes ingresar los datos!")
}
});
});
*/
function validar() {
    let contEmail = document.getElementById("mail").value;
    let contPasswd = document.getElementById("pass").value;
    if (contEmail.trim() === "" || contPasswd.trim() === "") {
        alert("Invalid data")

    } else {



       localStorage.setItem("user-logged", JSON.stringify({ user: contEmail }));


        window.location.href = "home.html";

    }




}