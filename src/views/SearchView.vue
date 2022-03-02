<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '@/composables/useFetch';
import RecipeItem from '@/components/RecipeItem.vue';

const filterDiets = ref(false);

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
				<header class="recipes-header">
					<h2 class="h2">Results for "{{ routeQueries.q }}"</h2>
					<div class="recipe-filtering">
						<div
							class="filter-dropdown"
							@click="filterDiets = !filterDiets"
						>
							<div class="dropdown-header">
								<span>Diets Label</span>
								<font-awesome-icon
									icon="chevron-down"
									class="icon-chevron"
									:class="{ rotate: filterDiets === true }"
								/>
							</div>
							<Transition name="dropdown">
								<div
									class="dropdown-content"
									v-show="filterDiets"
								>
									<form class="dropdown-form">
										<div class="form-group">
											<input
												id="balanced"
												type="checkbox"
											/>
											<label for="balanced"
												>Balanced</label
											>
										</div>
										<div class="form-group">
											<input
												id="high-fiber"
												type="checkbox"
											/>
											<label for="high-fiber"
												>high-fiber</label
											>
										</div>
										<div class="form-group">
											<input
												id="high-protein"
												type="checkbox"
											/>
											<label for="high-protein"
												>high-protein</label
											>
										</div>
										<div class="form-group">
											<input
												id="low-carb"
												type="checkbox"
											/>
											<label for="low-carb"
												>low-carb</label
											>
										</div>
										<div class="form-group">
											<input
												id="low-fat"
												type="checkbox"
											/>
											<label for="low-fat">low-fat</label>
										</div>
										<div class="form-group">
											<input
												id="low-sodium"
												type="checkbox"
											/>
											<label for="low-sodium"
												>low-sodium</label
											>
										</div>
									</form>
								</div>
							</Transition>
						</div>
					</div>
					<p class="subtitle">Found {{ recipes.count }} recipes</p>
				</header>

				<ul class="recipes-list">
					<li
						v-for="recipe in recipes.hits"
						:key="recipe._links.self.href"
					>
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

	.recipes-header {
		margin-bottom: 32px;

		.h2 {
			margin-bottom: 32px;
		}

		.recipe-filtering {
			margin-bottom: 16px;
			display: flex;
			flex-wrap: wrap;
			gap: 24px;

			.filter-dropdown {
				position: relative;
				background-color: #fff;
				padding: 8px 16px;
				border-radius: 9px;
				border: 1px solid #ddd;
				cursor: pointer;

				&:hover {
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.dropdown-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 16px;

					.icon-chevron {
						font-size: 12px;
						color: #999;
						transition: all 0.2s ease-in;

						&.rotate {
							transform: rotate(180deg);
						}
					}
				}

				.dropdown-content {
					position: absolute;
					top: 110%;
					left: 0;
					min-width: 300px;
					padding: 24px 32px;
					background-color: #fff;
					border: 1px solid #ddd;
					border-radius: 9px;
					box-shadow: 0 5px 10px rgba(0, 0, 0, 0.075);
					z-index: 1000;

					.dropdown-form {
						width: 100%;
						display: grid;
						grid-template-columns: 1fr;
						gap: 12px;

						.form-group {
							input[type='checkbox'] {
								margin-right: 8px;
							}
						}
					}
				}
			}
		}
	}

	.recipes-list {
		padding: 32px 0;
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

	// Transition class
	.dropdown-enter-active,
	.dropdown-leave-active {
		transition: all 0.2s ease-in;
	}

	.dropdown-enter-from,
	.dropdown-leave-to {
		opacity: 0;
	}

	.dropdown-enter-to {
		opacity: 1;
	}
}
</style>
