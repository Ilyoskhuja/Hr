import Vue from 'vue';
import Router from 'vue-router';
// import { Store } from 'vuex';

// import auth from '@/auth/authService'
Vue.use(Router);

const router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		
		{
			path: '/',
			name: 'dashboard',
			component: () => import('./components/Dashboard.vue')
		},

		{
			path: '/info/:id',
			name: 'info',
			component: () => import('./views/Info.vue')
		},
		{
			path: '/list',
			name: 'list',
			component: () => import('./views/Workers.vue')
		},
		{
			path: '/worker/:id',
			name: 'worker-details',
			component: () => import('./views/Worker.vue')
		},
		{
			path: '/add',
			name: 'add',
			component: () => import('./views/crud/Add.vue')
		},
		{
			path: '/edit/:id',
			name: 'edit',
			component: () => import('./views/crud/Edit.vue')
		},

		// Redirect to 404 page, if no match found
		{
			path: '*',
			redirect: '/pages/error-404'
		}
	]
});

router.afterEach(() => {
	// Remove initial loading
	const appLoading = document.getElementById('loading-bg');
	if (appLoading) {
		appLoading.style.display = 'none';
	}
});

export default router;
