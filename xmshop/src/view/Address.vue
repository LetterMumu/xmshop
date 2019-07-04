<template>
    <div>
      <head-nav/>
      <nav-bread><span href="/">收货地址</span></nav-bread>
      <addresser/>
      <foot-nav/>
    </div>
</template>

<script>
  import HeadNav from '@/components/Header'
  import NavBread from '@/components/NavBread'
  import Addresser from '@/components/Addresser'
  import FootNav from '@/components/Footer'
    export default {
      name: "Adderss",
      components:{
        HeadNav,
        NavBread,
        Addresser,
        FootNav
      }
    }
</script>

<style scoped>

</style>
