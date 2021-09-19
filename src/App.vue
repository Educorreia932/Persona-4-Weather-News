<template>
	<div>
		<div id="upper-left">
			<img id="rotating-circle" src="./assets/images/WEATHER_NEWS.SPR_3.png" alt="">
		</div>

		<div id="upper-right">
			<img src="./assets/images/CAMP.BIN_38.png" alt="">

			<div id="date">
				<p>{{ today.getMonth() + 1 }}/{{ today.getDate() }}</p>
			</div>

			<div id="day-period">

			</div>
		</div>

		<div id="weather-cards">
			<weather-card v-for="(info, i) in weatherInfo" :key="i" :info="info"/>
		</div>

		<p id="area-panel">This is the weekly forecast for the {{ this.region }} area.</p>
	</div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard";

export default {
	name: "newtab",
	components: {WeatherCard},
	data() {
		return {
			today: new Date(),
			region: "",
			weatherInfo: []
		}
	},
	created() {
		this.retrieveCurrentWeather(41.331408, -8.569011, "2597951605976751b9fbc9aedaa4dd68")
	},
	methods: {
		async retrieveCurrentWeather(latitude, longitude, apiKey) {
			const base = 'https://api.openweathermap.org';
			const forecastEndpoint = new URL(`/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, base)
			const onecallEndpoint = new URL(`/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, base);
			const forecastResponse = await (await fetch(forecastEndpoint)).json();
			const onecallResponse = await (await fetch(onecallEndpoint)).json();

			console.log(onecallResponse)

			this.region = forecastResponse["city"]["name"];
			this.weatherInfo = onecallResponse["daily"].slice(1, 8);

			console.log(this.weatherInfo)
		}
	}
}
</script>

<style lang="scss">
@font-face {
	font-family: IwonaHeavyRegular;

	src: url(./assets/fonts/IwonaHeavy-Regular.ttf);
}

body {
	@apply m-0 text-base bg-gray-800 relative h-screen;
	font-family: IwonaHeavyRegular, sans-serif;
}

p {
	@apply m-0;
}

#weather-cards {
	@apply flex flex-row space-x-3 justify-center items-center h-screen;
}

#area-panel {
	@apply bg-black text-white px-8 py-2 rounded-l w-9/12 right-0 bottom-1 absolute;
}

@keyframes rotation {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(359deg);
	}
}

#rotating-circle {
	@apply absolute;
	top: -9%;
	left: -4%;
	animation: rotation 8s infinite linear;
}

#upper-right {
	@apply absolute right-0 top-0;

	#date {
		@apply text-white;
	}
}
</style>
