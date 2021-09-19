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
			<div class="weather-card" v-for="i in 7" :key="i">
				<span class="week-day">MON</span>
				<span class="month-day">20</span>
			</div>
		</div>

		<p id="area-panel">This is the weekly forecast for the {{ this.region }} area.</p>
	</div>
</template>

<script>
export default {
	name: "newtab",
	data() {
		return {
			today: new Date(),
			region: ""
		}
	},
	created() {
		this.retrieveRegion();
	},
	methods: {
		async retrieveRegion() {
			const url = "https://geolocation-db.com/json/";
			const response = await fetch(url);

			this.region = (await response.json())["state"];
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

.weather-card {
	@apply flex flex-col rounded text-center p-1;
	background: rgb(255, 239, 48);
	background: linear-gradient(180deg, rgba(255, 239, 48, 1) 0%, rgba(255, 202, 5, 1) 100%);

	.week-day {
		@apply text-sm;
	}

	.month-day {
		@apply text-lg;
	}
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
