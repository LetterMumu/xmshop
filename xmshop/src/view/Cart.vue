<template>
  <div>
    <head-nav/>
    <nav-bread><span href="/">购物车</span></nav-bread>
    <carter/>
    <foot-nav/>
  </div>
</template>

<script>
  import HeadNav from '@/components/Header'
  import NavBread from '@/components/NavBread'
  import FootNav from '@/components/Footer'
  import Carter from "@/components/Carter";
    export default {
        name: "Cart",
        components:{
          Carter,
          HeadNav,
          NavBread,
          FootNav
        }
    }
</script>

<style scoped>

</style>
