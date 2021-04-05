import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_key: '1d7473400fd8bc0ab68a262fe77679a5',
    url: 'https://api.openweathermap.org/data/2.5',
    weather: null,
    metricId: '',
    latitude: '',
    longitude: '',
    options: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    },
    city: '',
  },
  mutations: {
    setWeather(state, weather) {
      state.weather = weather
    },
    setId(state, id) {
      state.metricId = id
    },
    setCity(state, city) {
      state.city = city
    },
  },
  actions: {
    async getWeather(ctx, query) {
      await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          query +
          '&units=metric&lang=ru&appid=1d7473400fd8bc0ab68a262fe77679a5'
      )
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          ctx.commit('setWeather', res)
        })
    },

    async getCurrentCityWeather(ctx, city) {
      await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          city +
          '&units=metric&lang=ru&appid=1d7473400fd8bc0ab68a262fe77679a5'
      )
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          ctx.commit('setWeather', res)
        })
    },

    async getPosition({ dispatch, ctx }, coords) {
      await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=07d18d98-5fdb-4066-98d8-fcfc0f281034&geocode=${coords.longitude},${coords.latitude}`
      )
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          console.log(
            res,
            res.response.GeoObjectCollection.featureMember[0].GeoObject
              .metaDataProperty.GeocoderMetaData.AddressDetails.Country
              .AdministrativeArea.SubAdministrativeArea.Locality.LocalityName
          )
          let city =
            res.response.GeoObjectCollection.featureMember[0].GeoObject
              .metaDataProperty.GeocoderMetaData.AddressDetails.Country
              .AdministrativeArea.SubAdministrativeArea.Locality.LocalityName
          dispatch('getCurrentCityWeather', city)
        })
    },
  },
  getters: {
    RETURN_WEATHER: (state) => state.weather,
    RETURN_METRIC_ID: (state) => state.metricId,
    RETURN_CITY: (state) => state.city,
  },
})
