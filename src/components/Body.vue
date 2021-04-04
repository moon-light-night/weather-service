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

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 218px;
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

@media (min-width: 730px) {
  .body {
    margin: 0 auto 231px;
  }
  .body__view {
    margin: 8px 0px 2px -49px;
  }
}

@media (max-width: 730px) {
  .body {
    margin: 0 auto 150px;
    min-width: 169px;
  }
  .body__view {
    align-items: center;
  }
  .body__view-degrees {
    font-size: 90px;
    line-height: 155px;
  }
  .body__view-img {
    width: 100px;
    height: 100px;
  }
  .body__description {
    font-size: 20px;
    line-height: 0px;
  }
  .body__view {
    margin: 0;
  }
}
</style>
