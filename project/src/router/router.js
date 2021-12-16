//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}



//定义routes路由的集合，数组类型
const routes=[
    // 单个路由均为对象类型，path代表的是路径，component代表组件
    {
      path: '/',
      component:()=>import('../components/index/index'),
    }
    ,
    {
        path:'/login',
        component:()=>import('../components/Login/Login')
    },
    {
        path:'/index',
        component:()=>import('../components/index/index'),
        children:[

            {
                path:'/main',
                component:()=>import('../components/index/main'),
            },
            {
                path:'/Cart',
                component:()=>import('../components/Cart/Cart'),
            },
            {
                path:'/me',
                component:()=>import('../components/me/me'),
            }
        ]

    },
    {
        path:'/details',
        component:()=>import('../components/Product_details/Details')
    },

]

const router=new VueRouter({
    mode:'history',
    routes,
});

//抛出这个这个实例对象方便外部读取以及访问
export default router
