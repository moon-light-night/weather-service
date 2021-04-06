<template>
  <div class="header">
    <div class="header__current-place" v-if="isVisible">
      <div class="header__places" v-if="this.weather">
        <div class="header__places-city">
          {{ this.weather.name }}
        </div>
        <div class="header__places-current-place">
          <button class="header__places-change-city" @click="showField">
            Сменить город
          </button>
          <div class="header__places-my-place" @click="defPosition">
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
        placeholder="Введите город"
        v-model="query"
        class="header__search-field"
        @keypress="fetchWeather"
      />
      <div class="header__search-btn" @click="fetchWeather">
        ОК{{ this.currentCity }}
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
    coords: {},
    latitude: '',
    longitude: '',
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
      this.query = event.target.id
    },

    defPosition() {
      const p = new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(success, error)

        function success(pos) {
          const position = pos.coords
          resolve(position)
        }
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`)
        }
      })

      p.then((coords) => {
        console.log('after promise coords: ', coords)
        this.$store.dispatch('getPosition', coords)
      })
    },
  },
  created() {
    this.cities = data
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
        return (
          el.city.includes(this.query) ||
          el.city.toLowerCase().includes(this.query.toLowerCase())
        )
      })
    },
    currentCity() {
      return this.$store.getters['RETURN_CITY']
    },
  },
}
</script>

<style>
@import '../styles/header.css';
</style>
