const numeros = document.querySelectorAll(".number");
const suma = document.querySelector("#suma");
const resta = document.querySelector("#resta");
const division = document.querySelector("#division");
const multiplicacion = document.querySelector("#multiplicacion");
const clear = document.querySelector("#clear");
const igual = document.querySelector("#igual");
const resultado = document.querySelector(".result");
var operacion = [];
var contador = 0;


numeros.forEach(numero=>{
    numero.addEventListener("click", ()=>{
        if(contador>0 || resultado.value == "Syntax Error"){
            var regExpNum = /[\d\.]/g;
            if(regExpNum.test(numero.textContent)){
                resultado.value = "";
            }else{
               console.log("operador"); 
               localStorage.setItem("ultimoOperador", numero.textContent);
            }
            resultado.value += numero.textContent;
            operacion.push("x");
            operacion.push(numero.textContent);
            contador = 0;
        }else{
            resultado.value += numero.textContent;
            var regExpNum = /[\d\.]/g;
            if(!regExpNum.test(numero.textContent) && numero.textContent!="."){
                operacion.push("x");
            }
            operacion.push(numero.textContent);
        }
    });
});

clear.addEventListener("click",()=>{
    resultado.value = "";
    operacion = [];
    contador = 0;
});



igual.addEventListener("click", ()=>{
    try{
        if(contador == 0 && resultado.value == ""){
            resultado.value = "";
        }else{
            if(resultado.value == "."){
                resultado.value = "0";
            }
            contador++;
            localStorage.setItem("resultado", resultado.value);
            if(contador>1){
                operacion.splice(0,operacion.lastIndexOf("x")+1);
                var operacionJunta = operacion.join("");
                resultado.value = eval(localStorage.getItem("resultado") + operacionJunta);
                localStorage.setItem("resultado", resultado.value);
            }else{
                resultado.value = eval(resultado.value);
            }
        }
    }catch{
        resultado.value = "Syntax Error";
    }
});