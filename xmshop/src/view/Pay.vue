<template>
  <div>
    <head-nav/>
    <nav-bread><span href="/">支付</span></nav-bread>
    <payer/>
    <foot-nav/>
  </div>
</template>

<script>
  import HeadNav from '@/components/Header'
  import NavBread from '@/components/NavBread'
  import Payer from '@/components/Payer'
  import FootNav from '@/components/Footer'
  export default {
    name: "Pay",
    components:{
      HeadNav,
      NavBread,
      Payer,
      FootNav
    }
  }
</script>

<style scoped>

</style>
