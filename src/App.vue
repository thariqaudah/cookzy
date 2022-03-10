<script setup>
import { onMounted, provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const savedRecipes = ref([]);

const savingRecipe = recipe => {
	savedRecipes.value.unshift(recipe);

	window.localStorage.setItem(
		'savedRecipes',
		JSON.stringify(savedRecipes.value)
	);
};

const removeRecipe = recipeId => {
	savedRecipes.value = savedRecipes.value.filter(
		recipe => recipe.recipe.id !== recipeId
	);

	window.localStorage.setItem(
		'savedRecipes',
		JSON.stringify(savedRecipes.value)
	);
};

onMounted(() => {
	const res = JSON.parse(window.localStorage.getItem('savedRecipes'));
	if (res) {
		savedRecipes.value = [...res];
	}
});

provide('savedRecipes', savedRecipes);
provide('savingRecipe', savingRecipe);
provide('removeRecipe', removeRecipe);
</script>

<template>
	<header>
		<Navbar />
	</header>

	<main>
		<RouterView />
	</main>
</template>

<style lang="scss">
@import '@/assets/base.css';

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 24px;
	.tag {
		display: inline-block;
		font-size: 14px;
		font-weight: 500;
		padding: 6px 12px;
		border-radius: 1000px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
	}

	.tag-primary {
		background-color: var(--primary-color);
		color: #fff;
		border: 3px solid var(--primary-color);
	}

	.tag-outline {
		background-color: transparent;
		color: inherit;
		border: 3px solid var(--primary-color);
	}

	.tag-secondary {
		border: 1px solid var(--light-grey);
		color: var(--light-grey);
	}
}
</style>
