<script setup>
import { inject } from 'vue';
// import RecipeItem from '@/components/RecipeItem.vue';

const savedRecipes = inject('savedRecipes');

console.log(savedRecipes.value);
</script>

<template>
	<div class="favorite-view">
		<div class="container">
			<h2 class="h2">Favorite's Recipes</h2>

			<ul class="recipes-list" v-if="savedRecipes.length">
				<li v-for="recipe in savedRecipes" :key="recipe.id">
					{{ recipe.recipe.label }}
				</li>
			</ul>

			<div class="no-favorite" v-else>
				<p>You have no any favorite recipes. Let's find one.</p>
				<RouterLink :to="{ name: 'home' }" class="btn btn-sm btn-primary"
					>Find Recipes</RouterLink
				>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.favorite-view {
	padding: 48px 0;

	.no-favorite {
		p {
			font-size: 18px;
			line-height: 1.6;
			margin-bottom: 16px;
		}
	}
}
</style>
