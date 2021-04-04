import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_key: '1d7473400fd8bc0ab68a262fe77679a5',
    url: 'https://api.openweathermap.org/data/2.5',
    weather: null,
    metricId: '',
  },
  mutations: {
    setWeather(state, weather) {
      state.weather = weather
    },
    setId(state, id) {
      state.metricId = id
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
  },
  getters: {
    RETURN_WEATHER: (state) => state.weather,
    RETURN_METRIC_ID: (state) => state.metricId,
  },
})
