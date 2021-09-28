<template>
	<div id="overlay">
		<div id="upper-left">
			<img id="rotating-circle" src="./assets/images/WEATHER_NEWS.SPR_3.png" alt="">
			<img src="./assets/images/WEATHER_NEWS.SPR_1.png" class="top-24 absolute" alt="">
		</div>

		<div id="upper-right">
			<img id="circle" src="./assets/images/YellowCircle.svg" alt="">

			<div id="date">
				<p>
					<span class="text-base" style="line-height: 0.8">{{ monthDay }}/{{ month }}</span>
					<span id="weekday">{{ weekday }}</span>
				</p>
			</div>
		</div>

		<div id="weather-cards">
			<weather-card v-for="(info, i) in weatherInfo" :key="i" :info="info"/>
		</div>

		<p id="area-panel">
			This is the weekly forecast<br>
			for the {{ this.region }} area.
		</p>
	</div>
</template>

<script>
const weekdayNames = [
	"SUN",
	"MON",
	"TUE",
	"WED",
	"THU",
	"FRI",
	"SAT"
]

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
	computed: {
		monthDay() {
			return String(this.today.getMonth() + 1).padStart(2, '0');
		},
		month() {
			return String(this.today.getDate()).padStart(2, '0');
		},
		weekday() {
			return weekdayNames[this.today.getDay()];
		}
	},
	created() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const {latitude, longitude} = position.coords

				this.retrieveCurrentWeather(latitude, longitude, "2597951605976751b9fbc9aedaa4dd68")
			},
			(error) => {
				console.log(error)
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		)

	},
	methods: {
		async retrieveCurrentWeather(latitude, longitude, apiKey) {
			const base = 'https://api.openweathermap.org';
			const forecastEndpoint = new URL(`/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, base);
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
	@apply m-0 text-base bg-gray-800 relative h-screen overflow-hidden;
	font-family: IwonaHeavyRegular, sans-serif;
	background-image: url("assets/images/background/map.png");
	background-size: cover;
	background-position: right 0 bottom 50%;
}

#overlay {
	background-color: rgba(0, 0, 0, 0.5);
}

p {
	@apply m-0;
}

#weather-cards {
	@apply flex flex-row space-x-4 justify-center items-center h-screen;
}

#area-panel {
	@apply bg-black text-white px-8 py-2 rounded-l w-9/12 h-1/5 right-0 bottom-1 absolute;
}

@keyframes rotation {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(359deg);
	}
}

#upper-left {
	@apply absolute -left-16 -top-16 hidden sm:block;

	#rotating-circle {
		animation: rotation 8s infinite linear;
		width: 10em;
	}
}

#upper-right {
	@apply relative top-0;

	#circle {
		@apply absolute;
		width: 6em;
		right: 0;
	}

	#date {
		@apply absolute text-white right-20 top-5 rounded-xl px-5 text-sm;
		background-color: #3d3c3f;

		#weekday {
			@apply px-2.5 pr-10;
		}
	}
}
</style>
