<template>
  <div>
    <div class="login">
      <a href="">
        <img src="../../assets/淘.svg" alt="" class="img">
      </a>
      <span class="error">{{error}}</span>
        <input type="text" v-model="user.username" name="username" placeholder="用户名" class="username">
        <input type="password" v-model="user.password" name="password" placeholder="密码" class="password">
        <input type="submit" value="登录" class="loginBto" @click="Login">
    </div>
  </div>
</template>

<script>

export default {
name: "Login",
  data(){
  return{
    user:{
      username:'',
      password:'',
    },
    error:'',
  }
  },
  methods: {
    Login() {
      if (this.user.username === '' || this.user.password === '')
        alert('账号或密码不能为空');
      else {
        this.axios({
          method: 'post',
          url: '/api/user/login',
          data: {
            username:this.user.username,
            password:this.user.password
          },
        }).then(res => {
          // console.log(res.data);
          if (res.data.stat==="OK"){
             alert('登陆成功');
            this.$router.push('/me')
          }
          else
            alert(res.data.message);
        }).catch(error => {
          console.log(error);
        });
      }
    },

    }

}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 4rem;

}
.img {
  width: 5rem;
  height: 5rem;
}

.username {
  width: 100%;
  height: 3rem;
  border: none;
  border-bottom: 1px solid #FF5000;
  padding: 0 1rem;
  outline: none;
  margin-bottom: 3rem;
  border-radius: 0;
  font-size: 16px;
}
.password{
  border: none;
  width: 100%;
  height: 3rem;
  outline: none;
  border-bottom: 1px solid #FF5000;
  padding: 0 1rem;
  margin-bottom: 3rem;
  border-radius: 0;
  font-size: 16px;
}

.loginBto {
  height: 3.5rem;
  border-radius: 4rem;
  color: #fff;
  background: #FF5000;
  font-size: 1.6rem;
  padding: 0 2rem;
  outline: none;
  border: none;
  width: 100%;
  height: 4.5rem;
  display: block;
  opacity: 0.5;
  cursor: pointer;
}

.error {
  font-size: 16px;
  color: red;
}
</style>