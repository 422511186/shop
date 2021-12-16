import Vue from 'vue'
import Router from 'vue-router'
import Login from'../components/Login.vue'
import Home from'../components/home.vue'
import axios from 'axios'

Vue.prototype.$http=axios

Vue.use(Router)
export default new  Router({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/Login'
        },
        {
            path:'/Login',
            component: Login
        },
        {
            path:'/home',
            component:Home
        },

    ]

})
