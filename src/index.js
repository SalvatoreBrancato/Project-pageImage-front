import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import singleImage from './pages/singleImage.vue';

const router = createRouter({
history: createWebHistory(),
routes: [
{
path: '/',
name: 'Home',
component: Home
},
{
    path: '/Home/:id',
    name: 'singleImage',
    component: singleImage
}
]
});
export default router