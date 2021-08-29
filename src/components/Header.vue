<template>
  <div class="header">
    <div class="header__current-place" v-if="modalIsVisible">
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

    <div class="header__search-box" v-if="!modalIsVisible">
      <input
        type="text"
        name=""
        id=""
        placeholder="Введите город"
        v-model="query"
        class="header__search-field"
        @keypress="fetchWeather"
      />
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
      <div class="header__degrees-box" @click="handleDegree">
        <input
          type="radio"
          class="custom-checkbox"
          name="degree"
          value="c"
          id="c"
          checked
          v-model="currentDegree"
        />
        <label
          for="c"
          class="custom-checkbox-label"
          :class="{ activeDegree: currentDegree === 'c' }"
          style="border-radius: 7px 0 0 7px;"
          >C</label
        >
        <input
          type="radio"
          class="custom-checkbox"
          name="degree"
          id="f"
          value="f"
          v-model="currentDegree"
        />
        <label
          for="f"
          class="custom-checkbox-label"
          :class="{ activeDegree: currentDegree === 'f' }"
          style="border-radius: 0 7px 7px 0;"
          >F</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import { data } from '../data/cities.js'
export default {
  data: () => ({
    query: '',
    isActive: true,
    cities: [],
    coords: {},
    latitude: '',
    longitude: '',
    currentDegree: 'c',
  }),
  methods: {
    showField() {
      this.$store.commit('closeModal')
      this.query = ''
    },
    fetchWeather(e) {
      if (e && e.key == 'Enter' && this.query) {
        this.$store.dispatch('getWeather', this.query)
        this.$store.commit('toggleModal')
      }
    },
    handleDegree(event) {
      this.$store.commit('setId', event.target.value)
    },
    async setQuery(event) {
      await (this.query = event.target.id)
      this.$store.dispatch('getWeather', this.query)
      this.$store.commit('toggleModal')
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
    modalIsVisible() {
      return this.$store.getters['RETURN_MODALISVISIBLE']
    },
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
