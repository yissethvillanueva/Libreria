
function loguear (){
    let user= document.getElementById("username").value;
    let pass= document.getElementById("password").value;
    
    if (user=="paola" && pass=="1234"){
     window.location="index.html";
    }
    else{
        alert("Contraseña Incorrecta");
    }
    
    }