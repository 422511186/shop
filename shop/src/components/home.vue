<template>
  <!-- 主页布局 -->
  <el-container class="home-container">
    <!-- header部分 -->
    <el-header>
      <div class="header-title">商城管理系统</div>

      <!-- 退出部分 -->
      <el-popover placement="bottom" width="20px" trigger="hover" popper-class="popover">
        <button class="logoutBtn" @click="logout" >退出</button>
       <div class="user" slot="reference">
          <el-avatar  slot="reference" >
            <img :src='usersrc' alt="">
          </el-avatar>
      </div>
    </el-popover>
      <div class="user-text">{{ username }}</div>
    </el-header>
    <!-- container部分 -->
    <el-container>
      <!-- aside部分 -->
      <el-aside width="200px" height="100px">
        <div class="management">
          <span class="managementTitle"> <i class="el-icon-present"></i> 商品管理</span>
        </div>
      </el-aside>
      <!-- main部分 -->
      <el-main>
        <!-- 添加 搜索 重置 -->
        <div main-control>
          <el-button type="primary" @click="formVisible">＋添加商品</el-button>
          <el-form ref="searchFormRef" class="searchForm">
            <el-form-item prop="input">
              <el-input v-model="input" placeholder="请输入内容" clearable size="100px"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="search(input)">搜索</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </div>
         <!-- 商品表格 -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="cover" label="封面" width="185">
            <!-- 封面图片 -->
            <template slot-scope="scope">
              <img :src="scope.row.cover" width="150" height="150"/>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="650"> </el-table-column>
          <el-table-column prop="price" label="价格" width="100"> </el-table-column>
          <el-table-column prop="stock" label="库存" width="100"> </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
             <!-- 商品状态按钮 -->
            <template slot-scope="scope">
                <el-button size="mini" type="success" plain>{{ scope.row.status==1?"上架":"下架"}}</el-button>
              </template>
          </el-table-column>
          <!-- 商品操作按钮 -->
          <el-table-column prop="control" label="操作" width="100">
            <template slot-scope="scope">
              <el-popover popper-class="pop" placement="bottom" width="40" trigger="hover">
                <button class="control-btn"@click="formVisibleSet(scope)" >编辑</button>
                <button class="control-btn" @click="delshop(scope.row.id)">删除</button>
                <i class="el-icon-setting" slot="reference" ></i>
                 </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑商品表单 -->
        <el-dialog title="编辑商品" :visible.sync="showFormSet" width="50%">
          <el-form  :rules="rules" label-width="100px" >
            <el-form-item label="标题" prop="tableData.title">
              <el-input v-model="atitle"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="tableData.status">
              <el-select v-model="astatus">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="库存" prop="tableData.stock">
              <el-input v-model="astock"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="tableData.price">
              <el-input v-model="aprice"></el-input>
            </el-form-item>
            <el-form-item label="封面图" prop="tableData.cover">
              <el-input v-model="acover"></el-input>
            </el-form-item>
            <el-form-item label="头图" prop="tableData.gallery">
              <el-input v-model="agallery" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="详情图" prop="tableData.detail">
              <el-input v-model="adetail"  type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showFormSet=false">取 消</el-button>
            <el-button type="primary" @click="updateList">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 添加商品表单 -->
        <el-dialog title="添加商品" :visible.sync="showForm" width="50%">
          <el-form  :rules="rules" label-width="100px" >
            <el-form-item label="标题" prop="title">
              <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="status">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="库存" prop="stock">
              <el-input v-model="stock"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="price"></el-input>
            </el-form-item>
            <el-form-item label="封面图" prop="cover">
              <el-input v-model="cover"></el-input>
            </el-form-item>
            <el-form-item label="头图" prop="gallery">
              <el-input v-model="gallery" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="详情图" prop="detail">
              <el-input v-model="detail"  type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showForm =false">取 消</el-button>
            <el-button type="primary" @click="addshop">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        usersrc:'',
        username:'',
        // 控制表单显示
        showFormSet:false,//编辑表单
        showForm: false,//添加商品表单
        //搜索元素
        input: '',
        //添加商品表单元素
        title: '',
        stock: '',
        price: '',
        status: '',
        cover: '',
        gallery: [],
        detail: [],
        //编辑商品表单元素
        aid:'',
        atitle: '',
        astock: '',
        aprice: '',
        astatus: '',
        acover: '',
        agallery: "",
        adetail: "",
      //商品列表
        tableData:[],
        rules:{
          title: [{required: true,trigger: 'blur'}
        ],
        stock: [{required: true,}
        ],
        price: [{required: true,}
        ],
        status: [{required: true,}
        ],
        cover: [{required: true,}
        ],
        gallery: [{required: true,}
        ],
        detail: [{required: true,}
        ],
        }
      }
    },
    mounted() {
      this.axios({
        method: 'post',
        url: '/api/user/info',
      }).then(res=>{
        if (res.data.stat ==='OK') {
          // console.log(res.data);
          this.usersrc=res.data.data.avatar;
          this.username=res.data.data.nickname;
        }else {
          this.$router.push('/login');
        }
      });
      this.getShopList();
    },
    methods: {
      logout() {
        this.$router.push("/Login");
      },
      clear(){
        this.title= ''
        this.stock= ''
        this.price= ''
        this.status= ''
        this.cover=''
        this.gallery= []
        this. detail= []
      },
      //让添加商品的组件在页面显示出来
      formVisible() {
        this.showForm = true;
      },
      formVisibleSet: function (args) {
        this.showFormSet = true;
        this.aid = args.row.id;
        this.atitle = args.row.title;
        this.astock = args.row.stock;
        this.aprice = args.row.price;
        this.astatus = '';
        this.acover = args.row.cover;
        this.agallery = args.row.gallery.toString();
        this.adetail = args.row.detail.toString();

      },
      reset() {
        this.$refs.searchFormRef.resetFields();
        this.getShopList();
        this.input='';
      },


      //添加商品信息
      //test
      addshop(){
        let gall = this.gallery.split('\n');
        let det = this.detail.split('\n');

        this.axios({
          method:"post",
          url:"/api/user/info",
        }).then(res=>{
          if (res.data.stat!=='OK'){
            alert("当前为离线状态，请先登录！");
            this.$router.push('/login')
          }
          else{
            this.axios({
              method:'post',
              url:'/api/admin/sku/add',
              data:{
                title:this.title,
                stock:this.stock,
                price:this.price,
                status:this.status,
                cover:this.cover,
                gallery: gall,
                detail:det,
              }
            }).then(res=>{
              if (res.data.stat==='OK'){
                console.log("addshop.stat :"+res.data.stat);
                this.getShopList();
                this.showForm=false;
                this.clear();
              }else {
                alert(res.data.stat)
                this.showForm=false;
                this.clear();
              }
            })
          }
        })
      },
      //删除商品信息
      //test
      delshop(id){
        this.axios({
          method:"post",
          url:"/api/user/info",
        }).then(res=>{
          if (res.data.stat!=='OK'){
            this.$router.push('/login')
          }else {
            this.axios({
              method:'post',
              url:'/api/admin/sku/remove',
              data:{
                id:id,
              }
            }).then(res=>{
              if (res.data.stat==='OK'){
                console.log(res.data.stat);
                this.getShopList();
              }else {
                console.log("添加商品信息:"+res.data.stat);
              }
            })
          }
        })
      },
    //  获得商品列表
      getShopList(){
        this.axios({
          method:"post",
          url:"/api/user/info",
        }).then(res=>{
          if (res.data.stat!=='OK'){
            this.$router.push('/login')
          }else {
            this.axios({
              method:'post',
              url:'/api/admin/sku/list',
            }).then(res=>{
              if (res.data.stat==='OK'){
                this.tableData=res.data.rows;
                console.log(this.tableData);
              }else {
                alert(res.data.stat)
              }
            })
          }
        })
      },
      //  更新商品信息
      updateList() {
        // alert(this.astatus);
        let gall = this.agallery.toString().split(',');
        let det = this.adetail.toString().split(',');
        this.axios({
          method:"post",
          url:"/api/user/info",
        }).then(res=>{
          if (res.data.stat!=='OK'){
            this.$router.push('/login');
          }else{
            this.axios({
              method:"post",
              url:"/api/admin/sku/update",
              data:{
                id:this.aid,
                title:this.atitle,
                stock:this.astock,
                price:this.aprice,
                status:this.astatus,
                cover:this.acover,
                gallery:gall,
                detail:det,
              }
            }).then(res=>{
              console.log("更新商品信息状态:"+res.data.stat);
              console.log(this.newstu);
              if (res.data.stat==="OK") {
                this.getShopList();
                this.showFormSet=false;
              }
            })
          }
        })
      },

      //  搜索功能
      search(name){
        let str = new RegExp(""+name+"");
        let list =[];
        for (let i = 0; i < this.tableData.length; i++) {
          if (str.test(this.tableData[i].title)){
            list.push(this.tableData[i]);
          }
        }
        this.tableData=list;
        console.log(this.tableData);
      }
    }

  }

</script>
<style scoped>
  .el-header .el-button {
    float: right;
    margin-top: 10px;
  }
  .user{

    float: right;
    margin-top: 10px;
    vertical-align: middle;
    color:white;
  }
  .user-text{
   float:right;
   color: aliceblue;
   margin-top: 20px;
   margin-right: 15px;
  }
  .logoutBtn{
    cursor:pointer;
   border: none;
    background-color:white;
  }

  .el-header {
    background-color: #373c41;

  }

  .header-title {
    margin-top: 10px;
    color: white;
    display: inline-block;
    font-size: 18px;
  }

  .el-aside {
    background-color: #323744;

  }

  .management {
    color: white;
    height: 40px;
    background-color: #1890ff;
    line-height: 40px;
    font-size: 14px;
  }

  .managementTitle {
    margin-left: 10px;
  }

  .el-main {
    background-color: #eaedf2;
  }
  .control-btn{
    display: block;
    cursor:pointer;
   border: none;
    background-color:white;

  }

  .main-control {

    height: 90px;
  }

  .searchForm {
    box-sizing: border-box;
  }

  .home-container {
    position: relative;
    height: 100%;
  }

  .home-container .el-input {
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
    width: 200px;
  }

  .home-container .el-form {

    display: inline-block;
  }

</style>
