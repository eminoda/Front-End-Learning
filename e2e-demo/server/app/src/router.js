import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

Vue.use(VueRouter);
const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Home },
];

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

export default router;
