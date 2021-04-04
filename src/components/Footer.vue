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

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  margin: 0 0 122px;
}
.footer__item {
  display: flex;
  flex-direction: column;
  width: max-content;
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

@media (max-width: 730px) {
  .footer {
    flex-wrap: wrap;
    margin: 0;
  }
  .footer__item {
    margin: 0 0 35px 2px;
  }
  .footer__item:nth-child(4) {
    margin-right: -4px;
  }
  .footer__item:nth-child(2) {
    margin-right: 19px;
  }
  .footer__item-name {
    font-size: 15px;
    line-height: 18px;
    margin: 0 0 2px;
  }
  .footer__item-value {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
  }
}

@media (min-width: 730px) {
  .footer {
    margin: 0px 0 122px 5px;
  }
  /* .footer__item:nth-child(1) {
    margin: 0px -110px 122px 0px;
  }
  .footer__item:nth-child(2) {
    margin: 0 0 0 -108px;
  }
  .footer__item:nth-child(3) {
    margin: 0 -36px 0 -174px;
  }
  .footer__item:nth-child(4) {
    margin: 0px 108px 0 -110px;
  } */
}

@media (max-width: 365px) {
  .footer {
    flex-direction: column;
    text-align: center;
  }
  .footer__item {
    margin: 0 auto 35px;
  }
  .footer__item:nth-child(2) {
    margin: 0 auto 35px;
  }
  .footer__item:nth-child(4) {
    margin: 0 auto 35px;
  }
}
</style>
