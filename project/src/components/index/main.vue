<template>
  <div class="main">
    <Object
          v-for="v in skus" :key="v.id"
          :img_path=v.cover
          :describe=v.title
          :price="('￥'+v.price)"
          :id=v.id
      />
  </div>
</template>

<script>
import Object from "@/components/index/Object";

export default {
  name: "index",
  components: {
    Object
  },
  data(){
    return{
      skus:'',
      show:true,

    }
  },
  mounted() {
    this.A()
  },
  methods:{
    A(){
      this.axios({
        method: 'post',
        url: '/api/sku/list',
      }).then(res => {
        this.skus=res.data.rows;
        this.show=false;
      }).catch(error => {
        console.log(error);
      });
    },
}
}
</script>
<style scoped>

*{
  box-sizing: border-box;
}

.main{
  display: flex;
  width: 100%;
  background-color: #f1eded;
  overflow: auto;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1.2rem;
}

</style>