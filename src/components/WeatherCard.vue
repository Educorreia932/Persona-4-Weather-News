<template>
	<div class="weather-card">
		<span class="week-day">{{ weekday }}</span>
		<span class="month-day">{{ monthDay }}</span>
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
		}
	}
}
</script>

<style scoped lang="scss">
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
</style>