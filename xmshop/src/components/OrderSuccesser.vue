<template>
  <div>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>订单详情</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>确认地址</span></li>
          <li class="cur"><span>查看您的订单</span></li>
          <li class="cur"><span>付款</span></li>
          <li class="cur"><span>订单确认</span></li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>恭喜你!<br>您的订单正在处理中! </h3>
          <p>
            <span>订单ID：{{this.orderId}}</span>
            <span>总金额为：{{this.orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/Cart"> 购物车列表 </router-link>
              <!-- <a href="javascript:;" class="btn btn--m">Cart List</a> -->
            </div>
            <div class="btn-r-wrap">
              <router-link  class="btn btn--m" to="/">商品列表</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        orderId:'',
        orderTotal:0
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init()
      {
        var order = this.$route.query.orderId;
        this.orderId = order
        if (!this.orderId) {
          return;
        }
        this.$http.post("/users/orderDetail", {
            orderId: order
        }).then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.orderId = res.result.orderId;
            this.orderTotal = res.result.orderTotal;
          }
        })
      }
    }
  }
</script>
