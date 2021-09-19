import "crx-hotreload";

async function getCurrentWeather(latitude, longitude, apiKey) {
    const base = 'https://api.openweathermap.org';
    const endpoint = new URL(`/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, base);

    const response = await fetch(endpoint);

    return response.json();
}


async function getRegion() {

}

getRegion().then(r => console.log(r))
