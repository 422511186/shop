<template>
  <div class="page">
    <div class="box">
      <router-view/>
    </div>

    <div class="menu" >
      <button  @click="shop">
        <span class="a shop"></span>
        <span class="b ">商品</span>
      </button>
      <button  @click="Cart">
        <span class="a cart"></span>
        <span class="b1 b">购物车</span>
      </button>
      <button @click="me">
        <span class="a me"></span>
        <span class="b">个人</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods:{

    shop(){
      this.$router.push('/main')
    },
    Cart(){
      this.axios({
        method: 'post',
        url: '/api/user/info',
      }).then(res => {
      if (res.data.stat ==='OK') {
        this.$router.push('/Cart');
      }else {
        this.$router.push('/Login');
      }
    })},
    me(){
      this.axios({
        method: 'post',
        url: '/api/user/info',
      }).then(res => {
        if (res.data.stat ==='OK') {
          this.$router.push('/me');
        }else {
          this.$router.push('/Login');
        }
      })},
  }

}
</script>

<style scoped>

button{
  border: none;
  background-color: #F8F8F8;
  cursor: pointer;
  outline: none;
}
.menu{
  border-top: 1px solid #ECECEC;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #F8F8F8;
  font-size: 1.2rem;
  color: #666;
}
a{
  color: #333;
  text-decoration: none;
}
.a {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin-bottom: 25px;
  background-repeat: no-repeat;
}
.b {
  padding: 0;
  margin-left: -45px;
  font-weight: bold;
  font-size: 1.5rem;
  color: #666;
}
.b1 {
  padding: 0;
  margin-left: -50px;
  color: #666;
}
.shop{
  background-image: url("../../assets/商品.svg");
}
.cart{
  background-image: url("../../assets/购物车.svg");
}
.me{
  background-image: url("../../assets/个人中心.svg");
}
.page{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}
.box {
  overflow: auto;
  width: 100%;
  z-index: 1;
  flex: 1;
}

</style>