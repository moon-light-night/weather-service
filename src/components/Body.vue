<template>
  <div class="body">
    <div class="body__view">
      <div
        class="body__view-img"
        v-if="this.weather"
        :class="this.weather.weather[0].main"
      ></div>
      <div class="body__view-degrees" v-if="this.weather && !this.metricId">
        {{ Math.round(this.weather.main.temp) }} &#176;
      </div>

      <div
        class="body__view-degrees"
        v-if="this.metricId === 'c' && this.weather"
      >
        {{ Math.round(this.weather.main.temp) }} &#176;
      </div>

      <div
        class="body__view-degrees"
        v-if="this.metricId === 'f' && this.weather"
      >
        {{ Math.round((this.weather.main.temp * 9) / 5 + 32) }} &#176;
      </div>
    </div>
    <div class="body__description" v-if="this.weather">
      {{ this.weather.weather[0].description }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    weather() {
      return this.$store.getters['RETURN_WEATHER']
    },
    metricId() {
      return this.$store.getters['RETURN_METRIC_ID']
    },
  },
}
</script>

<style>
@import '../styles/body.css';
</style>
