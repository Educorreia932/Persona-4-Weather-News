<template>
	<div class="weather-card">
		<span class="week-day">{{ weekday }}</span>
		<span class="month-day">{{ monthDay }}</span>

		<img :src="require(`@/assets/images/weather/${weatherIcon}.png`)" alt="">
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

const weatherIcons = {
	"Clear": "sunny",
	"Clouds": "cloudy",
	"Rain": "rain"
}

export default {
	name: "WeatherCard",
	props: [
		"info"
	],
	data() {
		return {
			date: new Date(this.info["dt"] * 1000)
		}
	},
	computed: {
		weekday() {
			return weekdayNames[0];
		},
		monthDay() {
			return this.date.getDate();
		},
		weatherIcon() {
			const weather = this.info["weather"][0]["main"];

			return weatherIcons[weather];
		}
	}
}
</script>

<style scoped lang="scss">
.weather-card {
	@apply flex flex-col rounded-md text-center p-2;
	background: linear-gradient(180deg, rgba(255, 239, 48, 1) 0%, rgba(255, 202, 5, 1) 100%);

	.week-day {
		@apply text-sm;
	}

	.month-day {
		@apply text-xl;
	}

	img {
		@apply rounded-md;
		background-color: #423e40;
		width: 3.5em;
	}
}
</style>