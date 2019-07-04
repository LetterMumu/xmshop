<template>
    <div>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="pricesort">价格{{upDown}}<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
              <dt>价格:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(price , index) in priceFilter" :key="index" >
                <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur': priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goods" :key='index'>
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt="" :key="item.productImage"></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <div style="clear: both;" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    <span style="display: none">...</span>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 在未登录的情况下 -->
      <modal :mdShow="mdShow">
        <p slot="message">请先登陆，否则无法加入购物车</p>
        <div slot="btnGroup">
          <a href="javascipt:;" class="btn-login" @click="mdShow= false">
            关闭</a>
        </div>
      </modal>

      <!-- 在登录的情况下 -->
      <modal :mdShow="mdShowCart">
        <p slot="message">加入购物车成功</p>
        <div slot="btnGroup">
          <a href="javascipt:;" class="btn btn--m" @click="mdShowCart = false">
            继续购物</a>
          <router-link class="btn btn--m" to="/cart">
            查看购物车</router-link>
        </div>
      </modal>
    </div>
</template>

<script>
  import axios from 'axios'
  import Modal from '@/components/Modal'
  import PubSub from 'pubsub-js'
    export default {
      name: "GoodListBodyer",
      components:{Modal},
      data(){
          return{
            goods:[],
            sortFlog:true,
            priceChecked:'all',
            busy:true,
            page:1,
            pageSize:8,
            mdShow:false,
            mdShowCart:false,
            upDown:'(降序)',
            priceFilter:[
              {
                startPrice:'0',
                endPrice:'100'
              },
              {
                startPrice:'100',
                endPrice:'500'
              },
              {
                startPrice:'500',
                endPrice:'1000'
              },
              {
                startPrice:'1000',
                endPrice:'5000'
              },
            ]
        }
      },
      created(){
        this.getGoodsList()
      },
      mounted(){
        PubSub.subscribe('refresh', (msg,data) => {
          this.getGoodsList
        })
      },
      methods:{
        getGoodsList(flag){
          let sort = this.sortFlog ? 1 : -1;
          if(sort==1){
            this.upDown = '(升序)'
          }else{
            this.upDown = '(降序)'
          }
          let param = {
            sort:sort,
            priceLevel:this.priceChecked,
            page:this.page,
            pagesize:this.pagesize
          }
            axios.get('/goods/list',{params:param})
            .then(res=>{
              if(flag){
                //多次加载数据
                this.goods = this.goods.concat(res.data.result)
                if(res.data.result.length == 0){
                  this.busy = true
                }else{
                  this.busy = false
                }
              }else{
                //第一次加载数据
                this.goods= res.data.result
                this.busy = false
              }

            })
        },
        //  getGoodsList(){
        //         axios.get('http://easy-mock.com/mock/59664d4d58618039284c7710/example/goods/list').then(res=>{
        //             console.log(res);
        //             this.goods = res.data;
        //         })
        //         // axios.get('goods').then(res=>{
        //         //     this.goods = res.data.data;
        //         // })
        //     },
        pricesort(){
          this.page = 1
          this.sortFlog = !this.sortFlog
          this.getGoodsList()
        },
        setPriceFilter(index){
          this.page = 1
          this.priceChecked = index
          this.getGoodsList()
        },
        loadMore: function() {
          this.busy = true;
          //第二次加载数据
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 500);
        },
        addCart(productId){
          axios.post('/goods/addCart',{productId:productId})
            .then(
              result => {
                let res = result.data;
                if(res.status == 1){
                  this.mdShow = true;
                  //  alert('加入购物车失败！')
                }else{
                  // alert('加入购物车成功！')
                  this.mdShowCart = true;
                }
          })
        }
      },
      computed:{
      },
      watch:{
      }
    }
</script>

<style scoped>

</style>
