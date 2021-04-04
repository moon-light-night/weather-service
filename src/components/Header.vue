<template>
  <div class="header">
    <div class="header__current-place" v-if="isVisible">
      <div class="header__places" v-if="this.weather">
        <!-- <div class="header__places-city" v-if="this.weather === null">
          Ваш город
        </div> -->
        <div class="header__places-city">
          {{ this.weather.name }}
        </div>
        <div class="header__places-current-place">
          <button class="header__places-change-city" @click="showField">
            Сменить город
          </button>
          <div class="header__places-my-place">
            Мое местоположение
          </div>
        </div>
      </div>
    </div>

    <div class="header__search-box" v-if="!isVisible">
      <input
        type="text"
        name=""
        id=""
        placeholder="city"
        v-model="query"
        class="header__search-field"
        @keypress="fetchWeather"
      />
      <div class="header__search-btn" @click="fetchWeather">
        ОК
      </div>

      <ul class="header__citiesList" v-if="this.query">
        <li
          v-for="(item, i) in searchHandler"
          :key="i"
          class="header__citiesList-li"
        >
          <p @click="setQuery" :id="item.city" class="header__citiesList-p">
            {{ item.city }}
          </p>
        </li>
      </ul>
    </div>

    <div class="header__degrees">
      <div class="header__degrees-point"></div>
      <div class="header__degrees-box" @click="submitId">
        <div class="header__degrees-c" @click="addClassC" id="c">C</div>
        <div class="header__degrees-f" @click="addClassF" id="f">F</div>
      </div>
    </div>
  </div>
</template>

<script>
import { data } from '../data/cities.js'
export default {
  data: () => ({
    isVisible: true,
    query: '',
    isActive: true,
    cities: [],
  }),
  methods: {
    showField() {
      this.isVisible = false
      this.query = ''
    },
    fetchWeather(e) {
      if (e.key == 'Enter' || e.type == 'click') {
        this.$store.dispatch('getWeather', this.query)
        this.isVisible = !this.isVisible
      }
    },
    submitId(event) {
      this.$store.commit('setId', event.target.id)
    },
    addClassC(event) {
      document.querySelector('.header__degrees-f').classList.remove('active-f')
      event.target.classList.add('active-c')
    },
    addClassF(event) {
      document.querySelector('.header__degrees-c').classList.remove('active-c')
      event.target.classList.add('active-f')
    },
    setQuery(event) {
      console.log(event.target.id)
      this.query = event.target.id
    },
  },
  created() {
    this.cities = data
    console.log(this.cities)
  },
  mounted() {
    this.$store.dispatch('getWeather', '%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0')
  },
  computed: {
    weather() {
      return this.$store.getters['RETURN_WEATHER']
    },
    searchHandler() {
      return this.cities.filter((el) => {
        return el.city.toLowerCase().includes(this.query)
      })
    },
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  margin: 0 0 186px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__current-place {
  display: flex;
  justify-content: space-between;
}
.header__search-box {
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 30px;
  line-height: 36px;
}
.header__citiesList-p {
  font-size: 30px;
  line-height: 36px;
  margin: 10px 0;
  width: max-content;
}
.header__citiesList-p:hover {
  cursor: pointer;
}
.header__search-field {
  width: 579px;
  height: 90px;
  border-radius: 3px;
  border: none;
  font-size: 30px;
  line-height: 36px;
  color: #000;
}
.header__search-field:focus {
  outline: none;
}
.header__search-btn {
  font-size: 30px;
  line-height: 36px;
  position: absolute;
  transform: translate(500px, 30px);
  color: rgba(16, 134, 255, 1);
  border: none;
  background-color: rgba(255, 255, 255, 0);
  height: max-content;
}
.header__search-btn:hover {
  cursor: pointer;
}
.header__places {
  display: flex;
  flex-direction: column;
}
.header__places-city {
  font-size: 50px;
  line-height: 60px;
  margin: 0 0 9px;
}
.header__places-current-place {
  display: flex;
}
.header__places-change-city {
  margin: 0 29px 0 0;
  font-size: 18px;
  line-height: 22px;
  color: white;
  opacity: 0.6;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}
.header__places-change-city:hover {
  cursor: pointer;
}
.header__places-my-place {
  display: flex;
  font-size: 18px;
  line-height: 22px;
  opacity: 0.6;
  font-weight: 300;
}
.header__places-my-place::before {
  content: '';
  background-image: url('~@/assets/place-arrow.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 15px;
  height: 20px;
  margin: 0 12px 0 0;
}
.header__degrees {
  width: 94px;
  height: 29px;
  display: flex;
  align-self: baseline;
}
.header__degrees-point {
  width: 8px;
  height: 22px;
  margin: 0 9px 0 0;
  background-image: url('~@/assets/degree-sign.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.header__degrees-box {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 77px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 8px;
}
.header__degrees-c {
  width: 38.25px;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 22px;
  opacity: 0.4;
}
.header__degrees-c:hover {
  cursor: pointer;
}
.header__degrees-f:hover {
  cursor: pointer;
}
.header__degrees-f {
  width: 38.25px;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 22px;
  opacity: 0.4;
}
.active-c {
  opacity: 1 !important;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 7px 0 0 7px;
}
.active-f {
  opacity: 1 !important;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0 7px 7px 0;
}
.header__citiesList {
  position: absolute;
  top: 100px;
  width: -webkit-fill-available;
  height: 200px;
  overflow: auto;
}
.header__citiesList::-webkit-scrollbar {
  width: 20px;
  height: 20px;
}
.header__citiesList::-webkit-scrollbar-track {
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #f9f9fd;
  border-radius: 5px;
}
.header__citiesList::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #84caff;
}
</style>
