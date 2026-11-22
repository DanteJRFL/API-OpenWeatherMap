const apiKey = "0e2e581a7023aa9c9a95751dfec2055f"; 

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const tempValue = document.getElementById('temp-value');
const humidityValue = document.getElementById('humidity-value');
const windValue = document.getElementById('wind-value');
const animationContainer = document.getElementById('weather-animation-container');

// Carrega Aracaju ao abrir
window.addEventListener('load', () => {
    fetchWeatherByCity('Aracaju');
});

searchBtn.addEventListener('click', () => {
    handleSearch();
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeatherByCity(city);
    }
}

async function fetchWeatherByCity(city) {
    try {
        cityName.textContent = 'Buscando...';
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt_br&appid=${apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Não foi possível encontrar essa cidade. Verifique o nome digitado e tente novamente.');
        cityName.textContent = 'Cidade não encontrada';
        tempValue.textContent = '--º';
        humidityValue.textContent = '--%';
        windValue.textContent = '-- km/h';
        animationContainer.innerHTML = '';
    }
}

function updateUI(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    tempValue.textContent = `${Math.round(data.main.temp)}º`;
    humidityValue.textContent = `${data.main.humidity}%`;
    
    const windSpeedKmH = Math.round(data.wind.speed * 3.6);
    windValue.textContent = `${windSpeedKmH} km/h`;

    renderWeatherAnimation(data.weather[0].icon);
}

function renderWeatherAnimation(iconCode) {
    animationContainer.innerHTML = ''; // Limpa animação anterior

    let htmlContent = '';

    // Separação clara baseada nos códigos do OpenWeatherMap
    if (iconCode.startsWith('01')) {
        // Céu limpo / Ensolarado
        htmlContent = `<div class="weather-sun"></div>`;
    } 
    else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) {
        // Nublado / Nuvens
        htmlContent = `
            <div class="weather-clouds">
                <div class="cloud-base"></div>
                <div class="cloud-puff"></div>
                <div class="cloud-puff-2"></div>
            </div>
        `;
    } 
    else if (iconCode.startsWith('09') || iconCode.startsWith('10')) {
        // Chuva
        htmlContent = `
            <div class="weather-rain">
                <div class="weather-clouds" style="transform: scale(0.8);">
                    <div class="cloud-base"></div>
                    <div class="cloud-puff"></div>
                    <div class="cloud-puff-2"></div>
                </div>
                <div class="rain-drop"></div>
                <div class="rain-drop"></div>
                <div class="rain-drop"></div>
            </div>
        `;
    } 
    else if (iconCode.startsWith('11')) {
        // Tempestade (com raio piscando)
        htmlContent = `
            <div class="weather-storm">
                <div class="storm-cloud"></div>
                <div class="lightning"></div>
            </div>
        `;
    } 
    else {
        // Padrão (Ensolarado/Limpo para outros estados como neve ou névoa se não especificados)
        htmlContent = `<div class="weather-sun"></div>`;
    }

    animationContainer.innerHTML = htmlContent;
}