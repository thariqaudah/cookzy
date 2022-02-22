<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '@/composables/useFetch';
import RecipeItem from '@/components/RecipeItem.vue';

const route = useRoute();

const { data: recipes, error, fetch } = useFetch();

const routeQueries = route.query;

watch(
	() => route.query.q,
	async () => {
		const res = await fetch(routeQueries);
		console.log(res);
	},
	{ immediate: true }
);
</script>

<template>
	<div class="search-view">
		<div class="container">
			<h1 class="h2">Menu "{{ route.query.q }}"</h1>

			<div v-if="error">
				<p>Error: {{ error.message }}</p>
			</div>

			<ul class="recipes-list" v-else-if="recipes">
				<li
					v-for="recipe in recipes.hits"
					:key="recipe._links.self.href"
				>
					<RecipeItem :recipe="recipe" />
				</li>
			</ul>

			<div v-else>
				<p>Loading...</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.search-view {
	padding: 48px 0;
}
</style>
