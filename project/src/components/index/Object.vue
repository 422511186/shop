<template>
  <div class="Object" @click="C">
    <img :src="img_path" class="image">
    <div class="describe">{{ describe }}</div>
    <div class="price">{{ price }}</div>
  </div>
</template>

<script>
export default {
  name: "Object",
  props:{
    img_path:{
      type:String,
      require:true
    },
    describe:{
      type:String,
      default:'',
    } ,
    price:{
      type:String,
      default:''
    },
    id:{
      type:String,
      default:''
    }
  },
  methods:{
    C(){
      this.$router.push({
        path:'/details',
        query:{
          id:this.id,
        }
      }
    );
      // console.log('id = '+this.id);
    }
  }
}
</script>

<style scoped>

.Object{
  border: #f4f4f4 solid 0.5rem;
  width: 48.5%;
  overflow: hidden;
  /*margin-bottom: 0.5rem;*/
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.image {
  width: 100%;
  border-radius: 0.5rem;
}
.describe {
  margin-left: 2px;
  font-size: 1.3rem;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price {
  font-size: 1.6rem;
  margin-left: 5px;
  color: #ff5500;
}
</style>
