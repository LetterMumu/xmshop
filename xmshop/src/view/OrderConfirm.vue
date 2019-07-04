<template>
    <div>
      <head-nav/>
      <nav-bread><span href="/">结算</span></nav-bread>
      <order-confirmer/>
      <foot-nav/>
    </div>
</template>

<script>
  import HeadNav from '@/components/Header'
  import NavBread from '@/components/NavBread'
  import OrderConfirmer from '@/components/OrderConfirmer'
  import FootNav from '@/components/Footer'
    export default {
      name: "Adderss",
      components:{
        HeadNav,
        NavBread,
        OrderConfirmer,
        FootNav
      }
    }
</script>

<style scoped>

</style>
