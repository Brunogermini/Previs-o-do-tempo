import apiKey from "../js/apikey"
const apiPaises = "https://flagsapi.com/";
const btnSearch = document.querySelector("#search")

const cidadePesquisada = document.querySelector("#cidade")
const temperatura =document.querySelector("#temperatura span")
const descricao =document.querySelector("#descricao")
const iconeClima = document.querySelector("#icone-clima")
const umidade =document.querySelector("#umidade span")
const vento =document.querySelector("#vento span")
const pais =document.querySelector("#pais")
const containerCidade= document.querySelector(".container-cidade")
const erro = document.querySelector("#error-message")

function inserirDados(dadosApi){


  
cidadePesquisada.innerHTML = dadosApi.name
temperatura.innerHTML = Math.floor(dadosApi.main.temp)
descricao.innerHTML = dadosApi.weather[0].description
iconeClima.src = `https://openweathermap.org/img/wn/${dadosApi.weather[0].icon}.png` 
umidade.innerHTML = dadosApi.main.humidity +"%"
vento.innerHTML = dadosApi.wind.speed + " Km/h"
pais.src = `https://flagsapi.com/${dadosApi.sys.country}/shiny/64.png/`;


containerCidade.classList.remove("hide")
erro.classList.add('hide')
}


async function  buscarCidade(cidade){
    
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`
    const dados = await fetch(api);
    const dadosApi =await dados.json();

    console.log(dadosApi)
    if(dadosApi.hasOwnProperty('message')){
        erro.classList.remove('hide')
        containerCidade.classList.add("hide")
    }
    else{
        inserirDados(dadosApi)
    }


console.log(cidade)

}

function handleClick() {
    const cidade = document.querySelector("#city-input").value
   
    console.log(cidade)
buscarCidade(cidade)


}

btnSearch.addEventListener("click", handleClick)


const cidade = document.querySelector("#city-input")

cidade.addEventListener("keyup",(e) =>{

    if(e.code ==="Enter"){
const cidade = e.target.value;

buscarCidade(cidade)

    }
})