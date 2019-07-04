<template>
    <div>
      <head-nav/>
      <indexer/>
      <foot-nav/>
    </div>
</template>

<script>
  import HeadNav from '@/components/Header'
  import Indexer from '@/components/indexer'
  import FootNav from '@/components/Footer'
    export default {
      name: "index",
      components:{
        HeadNav,
        Indexer,
        FootNav
      }
    }
</script>

<style scoped>

</style>
