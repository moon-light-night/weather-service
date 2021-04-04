<template>
  <div class="footer">
    <div class="footer__item" v-if="this.weather === null">
      <div class="footer__item-name">Ветер</div>
      <div class="footer__item-value">5 м/c, западный</div>
    </div>
    <div class="footer__item" v-if="this.weather">
      <div class="footer__item-name">Ветер</div>
      <div class="footer__item-value">
        {{ this.weather.wind.speed }} м/c,
        {{ this.weather.wind.deg | defineDirection }}
      </div>
    </div>

    <div class="footer__item" v-if="this.weather === null">
      <div class="footer__item-name">Давление</div>
      <div class="footer__item-value">752 мм рт. ст.</div>
    </div>
    <div class="footer__item" v-if="this.weather">
      <div class="footer__item-name">Давление</div>
      <div class="footer__item-value">
        {{ this.weather.main.pressure | definePressure }} мм рт. ст.
      </div>
    </div>

    <div class="footer__item" v-if="this.weather === null">
      <div class="footer__item-name">Влажность</div>
      <div class="footer__item-value">60%</div>
    </div>
    <div class="footer__item" v-if="this.weather">
      <div class="footer__item-name">Влажность</div>
      <div class="footer__item-value">{{ this.weather.main.humidity }} %</div>
    </div>

    <div class="footer__item" v-if="this.weather === null">
      <div class="footer__item-name">Вероятность дождя</div>
      <div class="footer__item-value">10%</div>
    </div>
    <div class="footer__item" v-if="this.weather">
      <div class="footer__item-name">Вероятность дождя</div>
      <div class="footer__item-value">10%</div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    directions: ['северный', 'восточный', 'южный', 'западный'],
    dir: '',
  }),
  computed: {
    weather() {
      return this.$store.getters['RETURN_WEATHER']
    },
    // windDirection() {
    //   if (this.$store.getters['RETURN_WEATHER'] !== null) {
    //     console.log('work')
    //     switch (this.weather.wind.deg) {
    //       case this.weather.wind.deg > 315 && this.weather.wind.deg < 45: {
    //         return this.directions[0]

    //       }
    //       case this.weather.wind.deg > 45 && this.weather.wind.deg < 135: {
    //         return this.directions[1]

    //       }
    //       case this.weather.wind.deg > 135 && this.weather.wind.deg < 225: {
    //         return this.directions[2]

    //       }
    //       case this.weather.wind.deg > 225 && this.weather.wind.deg < 315: {
    //         return this.directions[3]

    //       }
    //     }
    //   }
    // },
  },
  filters: {
    defineDirection: function(value) {
      if (value > 315 || value < 45) {
        return 'северный'
      }
      if (value > 45 || value < 135) {
        return 'восточный'
      }
      if (value > 135 || value < 225) {
        return 'южный'
      }
      if (value > 225 || value < 315) {
        return 'западный'
      }
    },
    definePressure: function(value) {
      return Math.round(value / 1.333)
    },
  },
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  /* margin: 0 0 122px; */
}
.footer__item {
  display: flex;
  flex-direction: column;
  width: auto;
}
.footer__item-name {
  font-size: 18px;
  line-height: 22px;
  margin: 0 0 10px;
  opacity: 0.6;
}
.footer__item-value {
  font-size: 25px;
  line-height: 30px;
}
</style>
