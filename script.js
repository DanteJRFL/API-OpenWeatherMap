const key = "0e2e581a7023aa9c9a95751dfec2055f"

function pesquisarCidade() {
    const cidade = document.getElementById("cidade").value
    console.log(cidade)
    dadosAPI(cidade)
}

async function dadosAPI(cidade) {
    let dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=metric&lang=pt_br`).then(res => res.json())
    console.log(dados)
    
    trocarDados(dados)
}

function trocarDados(dados) {
    document.getElementById("nome-cidade").textContent = dados.name

    document.getElementById("umidade").textContent = "Umidade relativa do ar: " + dados.main.humidity + "%"

    document.getElementById("temp").textContent = Math.round(dados.main.temp) + "°C"
    
    document.getElementById("previsao").textContent = dados.weather[0].description

    document.getElementById("img-icon").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`

    document.getElementById("vento").textContent = "Velocidade do Vento: " + Math.round(dados.wind.speed) + "Km/h"
}

