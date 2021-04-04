<template>
  <div class="body">
    <div class="body__view">
      <div
        class="body__view-img"
        v-if="this.weather"
        :class="this.weather.weather[0].main"
      ></div>
      <!-- <div class="body__view-img Clear" v-if="this.weather === null"></div> -->
      <!-- <div class="body__view-degrees" v-if="this.weather === null">
        19 &#176;
      </div> -->

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
    <!-- <div class="body__description" v-if="this.weather === null">
      Преимущественно солнечно
    </div> -->
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

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 218px;
}
.body__view {
  display: flex;
  margin: 0 0 10px;
}
.body__view-img {
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}
.body__view-degrees {
  font-size: 180px;
  line-height: 216px;
  text-align: center;
}
.body__description {
  font-size: 25px;
  line-height: 30px;
  text-align: center;
}
.body__description::first-letter {
  text-transform: capitalize;
}
.Clear {
  background-image: url('~@/assets/Clear.png');
}
.Rain {
  background-image: url('~@/assets/Rain.png');
}
.Clouds {
  background-image: url('~@/assets/Clouds.png');
}
.Storm {
  background-image: url('~@/assets/Storm.png');
}
.Cloudy {
  background-image: url('~@/assets/Cloudy.png');
}
</style>
