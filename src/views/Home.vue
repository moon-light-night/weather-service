<template>
  <div class="home-wrap">
    <div class="home">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Body from '@/components/Body.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Body,
    Footer,
  },
}
</script>

<style scoped>
.home-wrap {
  max-width: 1190px;
  height: 852px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home {
  width: 100%;
  height: 100%;
}
</style>
