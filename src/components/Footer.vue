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

<style>
@import '../styles/footer.css';
</style>
