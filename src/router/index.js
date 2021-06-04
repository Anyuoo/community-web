import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout/layout'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Layout',
    children: [{
        path: '/index',
        name: 'Index',
        component: () =>
            import('@/views/index/index'),
    },
    {
        path: '/discovery',
        name: 'Discovery',
        component: () =>
            import('@/views/discovery/discovery'),
    },
    {
        path: '/circle',
        name: 'Circle',
        component: () =>
            import('@/views/circle/circle'),
    },
    {
        path: '/learn',
        name: 'Learn',
        component: () =>
            import('@/views/learn/learn'),
    },
    {
        path: '/profile/:account',
        name: 'UserProfile',
        component: () =>
            import('@/views/profile/profile'),
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () =>
            import('@/views/upload/upload'),
    },
    {
        path: '/resource',
        name: 'Resource',
        component: () =>
            import('@/views/resource/resource'),
    },
    ]
},
{
    path: '/login',
    name: 'Login',
    component: () =>
        import('@/views/login/login'),
},
{
    path: '/register',
    name: 'Register',
    component: () =>
        import('@/views/register/register'),

},
]

const router = new VueRouter({
    routes
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router