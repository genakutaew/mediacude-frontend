import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Departments from '@/views/Departments.vue'
import Employees from '@/views/Employees.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/departments',
        name: 'Departments',
        component: Departments
    },
    {
        path: '/employees',
        name: 'Employees',
        component: Employees
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
