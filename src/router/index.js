import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('../views/SearchView.vue'),
		},
		{
			path: '/details/:id',
			name: 'details',
			component: () => import('../views/DetailsView.vue'),
			props: true,
		},
	],
});

export default router;
