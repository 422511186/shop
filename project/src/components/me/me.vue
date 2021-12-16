<template>
<div class="app">
  <img class="img" :src='Src' alt="">
  <div>{{username}}</div>
  <button class="bto" @click="B">退出登录</button>
</div>
</template>

<script>
export default {
name: "me",
  data(){
  return {
    username: '',
    Src: "",
   }
  },
  mounted() {
    this.A();
  },
  methods: {
    // 获取登录信息
    A() {
      this.axios({
        method: 'post',
        url: '/api/user/info',
      }).then(res => {
        if (res.data.stat ==='OK'){
           this.Src=res.data.data.avatar;
           this.username=res.data.data.nickname;
        }else{
          console.log('获取登录信息失败!!!');
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 退出登录
    B(){
      this.axios({
        method: 'post',
        url: '/api/user/logout',
      }).then(res => {
        if (res.data.stat ==='OK'){
          alert("退出成功！");
          this.$router.push('/main');
        }else{
          alert('退出失败！！');
        }
      }).catch(error => {
        console.log(error);
      });
  }
  }
}
</script>

<style scoped>
.app{
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 4rem;
  font-size: 2.5rem;
}
.img{
  width: 8rem;
  border-radius: 8rem;
  margin-bottom: 3rem;
}
.bto{
  height: 3.5rem;
  border-radius: 4rem;
  color: #fff;
  background: #FF5000;
  font-size: 1.6rem;
  padding: 0 2rem;
  outline: none;
  border: none;
  width: 100%;
  margin-top: 2rem;
  cursor: pointer;
}
</style>