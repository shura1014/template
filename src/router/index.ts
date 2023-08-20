import {createRouter, createWebHashHistory} from 'vue-router';
import Home from "@/views/Home.vue";
import {text} from "@/utils/i18n";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: "sidebar.dashboard"
                },
                component: () => import ("../views/Dashboard.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import ('../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import ('../views/403.vue')
            }, {
                path: '/search',
                name: 'search',
                meta: {
                    title: "sidebar.search"
                },
                component: () => import ('../views/Search.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( "../views/Login.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    console.log(routes)
    // @ts-ignore
    document.title = `template ｜ ${text(to.meta.title)}`;
    if (to.path === '/login') {
        next();
    } else {
        let userId = localStorage.getItem("user")
        if (userId) {
            next();
        } else {
            next("/login");
        }
    }

});

export default router;