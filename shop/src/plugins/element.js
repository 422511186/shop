import Vue from 'vue'
import { Button } from 'element-ui'
import{Form,FormItem,Input,Select} from 'element-ui'
import {Message,Container,Header,Aside,Main} from 'element-ui'
import{Card,Row,Col} from 'element-ui'
import{Dialog}from 'element-ui'
import{Option} from 'element-ui'
import{Popover} from 'element-ui'
import{Avatar}from 'element-ui'
import{Table,TableColumn} from 'element-ui'
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Option)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Col) 
Vue.use(Row) 
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.prototype.$message=Message;