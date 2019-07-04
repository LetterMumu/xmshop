<template>
  <div>
    <head-nav/>
    <nav-bread><span href="/">明星单品</span></nav-bread>
    <good-list-bodyer/>
    <foot-nav/>
  </div>
</template>

<script>
  import HeadNav from '@/components/Header'
  import NavBread from '@/components/NavBread'
  import GoodListBodyer from '@/components/GoodListBodyer'
  import FootNav from '@/components/Footer'


    export default {
      components:{
        HeadNav,
        NavBread,
        GoodListBodyer,
        FootNav
      }
    }
</script>

<style scoped>

</style>
