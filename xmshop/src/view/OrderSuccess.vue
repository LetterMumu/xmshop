<template>
  <div>
    <head-nav/>
    <nav-bread><span href="/">订单完成</span></nav-bread>
    <order-successer/>
    <foot-nav/>
  </div>
</template>

<script>
  import HeadNav from '@/components/Header'
  import NavBread from '@/components/NavBread'
  import FootNav from '@/components/Footer'
  import OrderSuccesser from "@/components/OrderSuccesser";
    export default {
        name: "OrderSuccess",
        components:{
          OrderSuccesser,
          HeadNav,
          NavBread,
          FootNav
        }
    }
</script>

<style scoped>

</style>
