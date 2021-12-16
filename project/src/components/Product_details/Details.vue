<template>
  <div class="page1">

    <div class="return" @click="return_index"> </div>

    <div class="box">
      <div class="C">
        <div class="banner">
          <div class="item">
            <img :src="dataList[currentIndex]">
          </div>
          <div class="page" v-if="this.dataList.length > 1">
            <ul>
              <li @click="gotoPage(prevIndex)">&lt;</li>
              <li v-for="(item,index) in dataList" :key="item"  @click="gotoPage(index)" :class="{'current':currentIndex == index}">  {{index+1}}</li>
              <li @click="gotoPage(nextIndex)">&gt;</li>
            </ul>
          </div>
        </div>
        <div class="price">{{"￥"+price}}</div>
        <div class="stock">{{"库存:"+stock}}</div>
        <div class="txt">{{title}}</div>
        <div class="images">
          <img v-for="v in detail" :key="v.id" :src="v" alt="" >
        </div>
      </div>
    </div>

      <div class="menu" >
        <button class="btn" @click="Cart">
            <span class="a cart"></span>
          <span class="b1 ">购物车</span>
        </button>
        <button class="btn_add" @click="add_Cart">加入购物车</button>
      </div>
    <div class="rou">
      <router-view>

      </router-view>
    </div>
  </div>

</template>
<script>
export default {
name: "details",
  data(){
      return{
        id:this.$route.query.id,
        dataList:'',
        currentIndex: 0,   //默认显示图片
        timer: null ,   //定时器
        price:'',
        stock:'',
        title:'',
        detail:''
      }
  },

  mounted() {
    this.getdetails();
  },

  methods:{
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

    getdetails(){
      this.axios({
        method: 'post',
        url: '/api/sku/info',
        data:{
          id:this.$route.query.id
        }
      }).then(res => {
          console.log(res.data);
          this.dataList=res.data.data.gallery;
          this.price=res.data.data.price;
          this.stock=res.data.data.stock;
          this.title=res.data.data.title;
          this.detail=res.data.data.detail;
      })
    },
    add_Cart(){
      this.axios({
        method: 'post',
        url: '/api/user/info',
      }).then(res => {
        if (res.data.stat ==='OK') {
          this.axios({
            method: 'post',
            url: '/api/cart/add',
            data:{
              skuId:this.$route.query.id
            }
          })
        }
        else {
          this.$router.push('/Login');
          this.axios({
            method: 'post',
            url: '/api/cart/add',
            data:{
              skuId:this.$route.query.id
            }
          })
        }
      }
      )},
    gotoPage(index) {
      this.currentIndex = index;
    },
    return_index(){
      this.$router.push('/main');
    },


  },
  computed: {
    //上一张
    prevIndex() {
      if(this.currentIndex == 0) {
        return this.dataList.length - 1;
      }else{
        return this.currentIndex - 1;
      }
    },
    //下一张
    nextIndex() {
      if(this.currentIndex == this.dataList.length - 1) {
        return 0;
      }else {
        return this.currentIndex + 1;
      }
    }
  },

}
</script>

<style scoped>
.page1{
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
}
.page{
  overflow: auto;
  background-color: #f4f4f4;
}
.btn{
  border: none;
  background-color: #F8F8F8;
  cursor: pointer;
  outline: none;
}
.menu{
  border-top: 1px solid #ECECEC;
  /*padding-top: 5px;*/
  /*padding-bottom: 5px;*/
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #F8F8F8;
  font-size: 1.2rem;
  color: #666;
  /*position: absolute;*/
  /*bottom: 0;*/
}
a{
  color: #333;
  text-decoration: none;
}
.a {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  background-repeat: no-repeat;
}

.b1 {
  padding: 0;
  margin-left: -55px;
  color: #666;
  font-weight: bold;
  font-size: 1.5rem;
}

.cart{
  background-image: url("../../assets/购物车.svg");
}

.box {
  flex: 1;
  overflow: auto;
  width: 100%;
  /*height: 89% ;*/
  z-index: 1;
}
.btn_add{
  cursor: pointer;
  height: 3.5rem;
  border-radius: 4rem;
  color: #fff;
  background: #FF5000;
  font-size: 1.6rem;
  padding: 0 2rem;
  outline: none;
  border: none;
}


* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
  float: left;
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: rgba(255,255,255,.8);
  font-size: 14px;
}
.banner {
  margin: 0 auto;
  position: relative;
}
.banner img {
  width: 100%;
  display: block;
}
.banner .page {
  background: rgba(0,0,0,.5);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
.banner .page ul {
  float: right;
}
.price{
  color: #ff5000;
  font-size: 2.4rem;
  margin: 2rem;
}

.stock {
  font-size: 1.4rem;
  color: #999999;
  margin: 2rem;
  padding-left: 5px;
}

.txt {
  margin: 2rem;
  padding-left: 5px;
  font-size: 1.6rem;
  line-height: 1.6em;
  font-weight: bold;
}

.images {
  display: flex;
  flex-direction: column;
}

.return {
  cursor: pointer;
  width: 48px;
  height: 48px;
  margin-left: 1rem;
  margin-top: 1rem;
  border-radius: 1.6rem;
  color: #fff;
  font-size: 2rem;
  left: 1.5rem;
  top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/返回_icon.svg");
  position: absolute;
  background-repeat: no-repeat;
  z-index: 5;
}

.C {
  width: 100%;
  background-color: #f1eded;
  overflow: auto;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1.2rem;
}
@media screen and (max-width: 400px) {
  .box{
    height: 46rem ;
  }}

.rou {
  position: absolute;
  left: 50%;
  top: 10%;
}
</style>
