<template>
  <div class="app" >
    <div class="nullCart" v-show="nullcart">
        <nullCart />
    </div>
      <div class="bigBox">
        <div class="box" v-for="a in rows" :key="a.id">
          <div class="flex">
            <input type="checkbox" name="layout" :id= a.id :value=a.id   v-model=checkedIds >
            <label :for= a.id></label>
          </div>
            <img class="img" :src=a.cover alt="">
          <div class="kk">
            <div class="detail">{{a.title}}</div>
            <div class="price">{{'￥'+a.price}}</div>
          </div>
        </div>
      </div>
      <div class="bottom_">
          <div>
            <input  type="checkbox" name="layout" id= 'all' v-model="checked">
            <label for='all' >
            </label><span>全选</span>
          </div>
          <button type="button" class="but" @click="Delete">删除</button>
        </div>

  </div>
</template>

<script>
import nullCart from "@/components/Cart/nullCart";

export default {
  components: {
    nullCart
  },
  data(){
    return{
      rows:[],
      checkedIds:[],
      checked:false,
      list:[],
      nullcart:true
  }
},
  methods: {
    testdel(ids) {
      this.axios({
        method: 'post',
        url: '/api/cart/remove',
        data: {
          ids: ids
        }
      }).then(res => {
        console.log(res.data);
      })
    },
    Delete() {
      if (this.checkedIds.length === 0) {
        return;
      } else {
        this.testdel(this.checkedIds);
        this.getCartList();
        this.checked = false;
        this.checkedIds = [];
      }
    },
    getCartList() {
      this.axios({
        method: 'post',
        url: '/api/cart/list',
      }).then(res => {
        this.rows = res.data.rows;
      })
    },

  },
  beforeUpdate() {
    this.list=[];
    for (let i=0;i<this.rows.length;i++){
      this.list.push(this.rows[i].id)
    }
  },
  mounted() {
    this.getCartList();
  },
  //监听
  watch:{
    rows(){
      if (this.rows.length===0){
        this.nullcart=true
      }else {
        this.nullcart=false
      }
    },
    checkedIds(){
      if (this.rows.length===this.checkedIds.length){
        this.checked=true;
      }
      else{
        this.checked=false;
      }
    },
    checked() {
      if (this.checked){
        this.checkedIds=[]
        this.checkedIds=this.list;
        // this.checkedIds[0]=true
      }
      else{
        this.checkedIds=[]
      }
    },
  },

}
</script>

<style scoped>
label{
  cursor: pointer;
}
.app{
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #f4f4f4;
}

.bigBox {
  overflow: auto;
  width: 100%;
  flex: 1;
  border-radius: 0.8rem;
  background: #fff;
  z-index: 1;
}
.box{
  overflow-x:hidden ;
  overflow-y:auto ;
  display: flex;
  background: #fff;
  border: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #f4f4f4;
}
.flex{
  display: flex;
  align-items: center;

}
 input {
  visibility: hidden;
}
.flex input+label{
  background-color: white;
  /*border-radius: 50px;*/
  /*border: 2px solid #847d7d;*/
  /*width: 2rem;*/
  /*height: 2rem;*/
  width: 38px;
  height: 38px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  background-image: url('../../assets/选择.svg');
  background-repeat: no-repeat;
}

.bottom_ input+label{
  background-color: white;
  /*border-radius: 50px;*/
  /*border: 2px solid #847d7d;*/
  width: 38px;
  height: 38px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  background-image: url('../../assets/选择.svg');
  background-repeat: no-repeat;
}

.flex input:checked + label{
  background-image: url('../../assets/选择r.svg');
}
.bottom_ input:checked + label{
  /*background-color: #847d7d;*/
  background-image: url('../../assets/选择r.svg');
}
.img{
  width: 10rem;
  height: 10rem;
  border-radius: 0.5rem;
  margin: 0 1rem;
}
.price{
  margin-top: 4.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #ff5500;
}

.detail {
  font-size: 1.4rem;
  line-height: 1.5em;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical
}



.bottom_ {
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: #fff;
}

.but {
  height: 3.5rem;
  border-radius: 4rem;
  color: #fff;
  background: #FF5000;
  font-size: 1.6rem;
  padding: 0 2rem;
  outline: none;
  border: none;
  opacity: 0.5;
  cursor: pointer;
}
.kk{
  display: flex;
  flex-direction: column;
}

.nullCart {
  overflow: auto;
  width: 100%;
height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
