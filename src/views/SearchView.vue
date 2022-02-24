<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '@/composables/useFetch';
import RecipeItem from '@/components/RecipeItem.vue';

const route = useRoute();

const { recipes, error, fetchRecipes } = useFetch();

const routeQueries = route.query;

watch(
	() => route.query.q,
	async () => {
		const res = await fetchRecipes(routeQueries);
		console.log(res);
	},
	{ immediate: true }
);
</script>

<template>
	<div class="search-view">
		<div class="container">
			<div v-if="error">
				<p>Error: {{ error.message }}</p>
			</div>

			<div v-else-if="recipes.hits">
				<h2 class="h2">Result for "{{ routeQueries.q }}"</h2>

				<ul class="recipes-list">
					<li v-for="recipe in recipes.hits" :key="recipe._links.self.href">
						<RecipeItem :recipe="recipe" />
					</li>
				</ul>
			</div>

			<div v-else>
				<p>Find recipes...</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.search-view {
	padding: 48px 0;

	.recipes-list {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;

		@media screen and (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 32px;
			row-gap: 48px;
		}

		@media screen and (min-width: 992px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
