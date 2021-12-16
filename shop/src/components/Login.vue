<template>
  <div class="login_main">
  <div class="login_box">
     <!-- 登录表单区域 -->
     <div class="login_text">登录系统</div>
      <el-form   :model="loginForm" label-width="0px" class="login_form" ref="loginFormRef">
          <!-- 用户名 -->
          <el-form-item  prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
              <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>

            <el-form-item >
              <el-button @click="login" class="btn_log" type="primary" round>登录</el-button>
              <el-button @click="reset" class="btn_re" type="info" round>重置</el-button>
            </el-form-item>
         </el-form>
  </div>
  </div>
  </template>
  
  <script>
  export default {
      data(){
          return{
              loginForm:{
                username:'',
                password:''
              }
          }
      },
      methods: {
        reset(){
         this.$refs.loginFormRef.resetFields();
        },
    login(){
     this.axios({
       method:'post',
       url:'/api/console/user/login',
       data:{
         username:this.loginForm.username,
         password:this.loginForm.password,
       }
     }).then(res=>{
       console.log(res.data);
       if (res.data.stat==='OK'){
         this.$message.success('登陆成功');
         this.$router.push('/home');
       }
       else
       {
        return this.$message.error('用户名或密码错误');
       }
     })

    }
        }
  };
  </script>
  
  <style  scoped>
      .login_text{
          font-size: 18px;
          text-align: center;
          margin-top: 60px;
      }
  .login_main{
  /* flex布局实现登录盒子水平垂直居中  */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b4b6b;
  height: 100%;
  
  }
  .login_box{
      text-align: center;
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  
  }
  .login_form
  {   position: absolute;
      bottom: 10px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
  }
  .btn_log{ 
    position: relative;
    right: 50px;
  }
  .btn_re{
      position: relative;
    left: 50px;  
  }
  
  </style>