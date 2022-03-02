<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '@/composables/useFetch';
import RecipeItem from '@/components/RecipeItem.vue';

const route = useRoute();

const routeQueries = {
	...route.query,
};

const { recipes, error, fetchRecipes } = useFetch();

const dietsDropdown = ref(false);
const cuisineDropdown = ref(false);

const dietLabels = reactive({
	balanced: false,
	highFiber: false,
	highProtein: false,
	lowCarb: false,
	lowFat: false,
	lowSodium: false,
});

const cuisineTypes = reactive({
	american: false,
	asian: false,
	chinese: false,
	italian: false,
	japanese: false,
});

const filterDiets = async () => {
	dietsDropdown.value = false;

	routeQueries.diets = [];
	const labels = Object.keys(dietLabels);
	labels.forEach(label => {
		dietLabels[label] && routeQueries.diets.push(dietLabels[label]);
	});
	console.log(routeQueries);
	const res = await fetchRecipes(routeQueries);
	console.log(res);
};

const filterCuisine = () => {};

// watch(
// 	() => route.query.q,
// 	async () => {
// 		const res = await fetchRecipes(routeQueries);
// 		console.log(res);
// 	},
// 	{ immediate: true }
// );
</script>

<template>
	<div class="search-view">
		<div class="container">
			<div v-if="error">
				<p>Error: {{ error.message }}</p>
			</div>
			<!-- v-else-if="recipes.hits" -->
			<div v-if="true">
				<header class="recipes-header">
					<h2 class="h2">Results for "{{ routeQueries.q }}"</h2>
					<div class="recipe-filtering">
						<!-- Diet Labels filter -->
						<div class="filter-dropdown">
							<div
								class="dropdown-header"
								@click="dietsDropdown = !dietsDropdown"
							>
								<span>Diet Labels</span>
								<font-awesome-icon
									icon="chevron-down"
									class="icon-chevron"
									:class="{ rotate: dietsDropdown === true }"
								/>
							</div>
							<Transition name="dropdown">
								<div class="dropdown-content" v-show="dietsDropdown">
									<form class="dropdown-form" @submit.prevent="filterDiets">
										<div class="form-group">
											<input
												id="balanced"
												type="checkbox"
												v-model="dietLabels.balanced"
												true-value="balanced"
											/>
											<label for="balanced">Balanced</label>
										</div>
										<div class="form-group">
											<input
												id="high-fiber"
												type="checkbox"
												v-model="dietLabels.highFiber"
												true-value="high-fiber"
											/>
											<label for="high-fiber">High Fiber</label>
										</div>
										<div class="form-group">
											<input
												id="high-protein"
												type="checkbox"
												v-model="dietLabels.highProtein"
												true-value="high-protein"
											/>
											<label for="high-protein">High Protein</label>
										</div>
										<div class="form-group">
											<input
												id="low-carb"
												type="checkbox"
												v-model="dietLabels.lowCarb"
												true-value="low-carb"
											/>
											<label for="low-carb">Low Carb</label>
										</div>
										<div class="form-group">
											<input
												id="low-fat"
												type="checkbox"
												v-model="dietLabels.lowFat"
												true-value="low-fat"
											/>
											<label for="low-fat">Low Fat</label>
										</div>
										<div class="form-group">
											<input
												id="low-sodium"
												type="checkbox"
												v-model="dietLabels.lowSodium"
												true-value="low-sodium"
											/>
											<label for="low-sodium">Low Sodium</label>
										</div>
										<div class="form-group">
											<button type="submit" class="btn dropdown-btn">
												Apply
											</button>
										</div>
									</form>
								</div>
							</Transition>
						</div>

						<!-- Cuisine type -->
						<div class="filter-dropdown">
							<div
								class="dropdown-header"
								@click="cuisineDropdown = !cuisineDropdown"
							>
								<span>Cuisine Type</span>
								<font-awesome-icon
									icon="chevron-down"
									class="icon-chevron"
									:class="{ rotate: cuisineDropdown === true }"
								/>
							</div>
							<Transition name="dropdown">
								<div class="dropdown-content" v-show="cuisineDropdown">
									<form class="dropdown-form" @submit.prevent="filterCuisine">
										<div class="form-group">
											<input
												id="balanced"
												type="checkbox"
												v-model="cuisineTypes.american"
												true-value="American"
											/>
											<label for="balanced">American</label>
										</div>
										<div class="form-group">
											<input
												id="balanced"
												type="checkbox"
												v-model="cuisineTypes.asian"
												true-value="Asian"
											/>
											<label for="balanced">Asian</label>
										</div>
										<div class="form-group">
											<input
												id="balanced"
												type="checkbox"
												v-model="cuisineTypes.chinese"
												true-value="Chinese"
											/>
											<label for="balanced">Chinese</label>
										</div>
										<div class="form-group">
											<input
												id="balanced"
												type="checkbox"
												v-model="cuisineTypes.italian"
												true-value="Italian"
											/>
											<label for="balanced">Italian</label>
										</div>
										<div class="form-group">
											<input
												id="balanced"
												type="checkbox"
												v-model="cuisineTypes.japanese"
												true-value="Japanese"
											/>
											<label for="balanced">Japanese</label>
										</div>
										<div class="form-group">
											<button type="submit" class="btn dropdown-btn">
												Apply
											</button>
										</div>
									</form>
								</div>
							</Transition>
						</div>
					</div>
					<p class="subtitle">
						Found {{ $filters.roundedNumber(recipes.count) }} recipes
					</p>
				</header>

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

	.recipes-header {
		margin-bottom: 32px;

		.h2 {
			margin-bottom: 32px;
		}

		.recipe-filtering {
			margin-bottom: 16px;
			display: flex;
			flex-direction: column;
			gap: 24px;

			@media screen and (min-width: 768px) {
				flex-direction: row;
			}

			.filter-dropdown {
				position: relative;
				background-color: #fff;
				padding: 8px 16px;
				border-radius: 9px;
				border: 1px solid #ddd;

				&:hover {
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
				}

				.dropdown-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 16px;
					cursor: pointer;

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
								cursor: pointer;
							}

							.dropdown-btn {
								padding: 8px 16px;
								margin-top: 16px;
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
