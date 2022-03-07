<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useFetch from '@/composables/useFetch';
import RecipeItem from '@/components/RecipeItem.vue';

const route = useRoute();

const routeQueries = {
	...route.query,
};

const { recipes, error, loading, fetchRecipes, nextRecipes } = useFetch();

const dietsDropdown = ref(false);
const cuisineDropdown = ref(false);
const mealDropdown = ref(false);

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

const mealTypes = reactive({
	breakfast: false,
	dinner: false,
	lunch: false,
	snack: false,
	teatime: false,
});

const openDietsDropdown = () => {
	cuisineDropdown.value = false;
	mealDropdown.value = false;
	dietsDropdown.value = !dietsDropdown.value;
};

const openCuisineDropdown = () => {
	dietsDropdown.value = false;
	mealDropdown.value = false;
	cuisineDropdown.value = !cuisineDropdown.value;
};

const openMealDropdown = () => {
	dietsDropdown.value = false;
	cuisineDropdown.value = false;
	mealDropdown.value = !mealDropdown.value;
};

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

const filterCuisine = async () => {
	cuisineDropdown.value = false;

	routeQueries.cuisines = [];
	const types = Object.keys(cuisineTypes);
	types.forEach(type => {
		cuisineTypes[type] && routeQueries.cuisines.push(cuisineTypes[type]);
	});
	console.log(routeQueries);
	const res = await fetchRecipes(routeQueries);
	console.log(res);
};

const filterMeal = async () => {
	mealDropdown.value = false;

	routeQueries.meals = [];
	const types = Object.keys(mealTypes);
	types.forEach(type => {
		mealTypes[type] && routeQueries.meals.push(mealTypes[type]);
	});
	console.log(routeQueries);
	const res = await fetchRecipes(routeQueries);
	console.log(res);
};

const removeDietFilter = async filter => {
	const labels = Object.keys(dietLabels);
	labels.forEach(label => {
		// Remove from diet labels state
		if (dietLabels[label] === filter) {
			dietLabels[label] = false;
		}

		// Remove from queries
		routeQueries.diets = routeQueries.diets.filter(
			dietLabel => dietLabel !== filter
		);
	});
	const res = await fetchRecipes(routeQueries);
	console.log(res);
};

const removeCuisineFilter = async filter => {
	const types = Object.keys(cuisineTypes);
	types.forEach(type => {
		// Remove from diet labels state
		if (cuisineTypes[type] === filter) {
			cuisineTypes[type] = false;
		}

		// Remove from queries
		routeQueries.cuisines = routeQueries.cuisines.filter(
			cuisineType => cuisineType !== filter
		);
	});
	const res = await fetchRecipes(routeQueries);
	console.log(res);
};

const removeMealFilter = async filter => {
	const types = Object.keys(mealTypes);
	types.forEach(type => {
		// Remove from diet labels state
		if (mealTypes[type] === filter) {
			mealTypes[type] = false;
		}

		// Remove from queries
		routeQueries.meals = routeQueries.meals.filter(
			mealType => mealType !== filter
		);
	});
	const res = await fetchRecipes(routeQueries);
	console.log(res);
};

// Pagination
const loadMoreRecipes = async link => {
	console.log(link);
	const res = await nextRecipes(link);
	console.log(res);
};

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
						<!-- Diet Labels filter -->
						<div
							class="filter-dropdown"
							:class="{
								active: routeQueries.diets && routeQueries.diets.length > 0,
							}"
						>
							<div class="dropdown-header" @click="openDietsDropdown">
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
										<div class="form-button">
											<button type="submit" class="btn btn-sm">Apply</button>
											<button
												type="button"
												class="btn btn-outline btn-sm"
												@click="dietsDropdown = false"
											>
												Cancel
											</button>
										</div>
									</form>
								</div>
							</Transition>
						</div>

						<!-- Cuisine type -->
						<div
							class="filter-dropdown"
							:class="{
								active:
									routeQueries.cuisines && routeQueries.cuisines.length > 0,
							}"
						>
							<div class="dropdown-header" @click="openCuisineDropdown">
								<span>Cuisine Type</span>
								<font-awesome-icon
									icon="chevron-down"
									class="icon-chevron"
									:class="{
										rotate: cuisineDropdown === true,
									}"
								/>
							</div>
							<Transition name="dropdown">
								<div class="dropdown-content" v-show="cuisineDropdown">
									<form class="dropdown-form" @submit.prevent="filterCuisine">
										<div class="form-group">
											<input
												id="american"
												type="checkbox"
												v-model="cuisineTypes.american"
												true-value="American"
											/>
											<label for="american">American</label>
										</div>
										<div class="form-group">
											<input
												id="asian"
												type="checkbox"
												v-model="cuisineTypes.asian"
												true-value="Asian"
											/>
											<label for="asian">Asian</label>
										</div>
										<div class="form-group">
											<input
												id="chinese"
												type="checkbox"
												v-model="cuisineTypes.chinese"
												true-value="Chinese"
											/>
											<label for="chinese">Chinese</label>
										</div>
										<div class="form-group">
											<input
												id="italian"
												type="checkbox"
												v-model="cuisineTypes.italian"
												true-value="Italian"
											/>
											<label for="italian">Italian</label>
										</div>
										<div class="form-group">
											<input
												id="japanse"
												type="checkbox"
												v-model="cuisineTypes.japanese"
												true-value="Japanese"
											/>
											<label for="japanse">Japanese</label>
										</div>
										<div class="form-button">
											<button type="submit" class="btn btn-sm">Apply</button>
											<button
												type="button"
												class="btn btn-outline btn-sm"
												@click="cuisineDropdown = false"
											>
												Cancel
											</button>
										</div>
									</form>
								</div>
							</Transition>
						</div>

						<!-- Meal type -->
						<div
							class="filter-dropdown"
							:class="{
								active: routeQueries.meals && routeQueries.meals.length > 0,
							}"
						>
							<div class="dropdown-header" @click="openMealDropdown">
								<span>Meal Type</span>
								<font-awesome-icon
									icon="chevron-down"
									class="icon-chevron"
									:class="{
										rotate: mealDropdown === true,
									}"
								/>
							</div>
							<Transition name="dropdown">
								<div class="dropdown-content" v-show="mealDropdown">
									<form class="dropdown-form" @submit.prevent="filterMeal">
										<div class="form-group">
											<input
												id="breakfast"
												type="checkbox"
												v-model="mealTypes.breakfast"
												true-value="Breakfast"
											/>
											<label for="breakfast">Breakfast</label>
										</div>
										<div class="form-group">
											<input
												id="dinner"
												type="checkbox"
												v-model="mealTypes.dinner"
												true-value="Dinner"
											/>
											<label for="dinner">Dinner</label>
										</div>
										<div class="form-group">
											<input
												id="lunch"
												type="checkbox"
												v-model="mealTypes.lunch"
												true-value="Lunch"
											/>
											<label for="lunch">Lunch</label>
										</div>
										<div class="form-group">
											<input
												id="snack"
												type="checkbox"
												v-model="mealTypes.snack"
												true-value="Snack"
											/>
											<label for="snack">Snack</label>
										</div>
										<div class="form-group">
											<input
												id="teatime"
												type="checkbox"
												v-model="mealTypes.teatime"
												true-value="Teatime"
											/>
											<label for="teatime">Teatime</label>
										</div>
										<div class="form-button">
											<button type="submit" class="btn btn-sm">Apply</button>
											<button
												type="button"
												class="btn btn-outline btn-sm"
												@click="mealDropdown = false"
											>
												Cancel
											</button>
										</div>
									</form>
								</div>
							</Transition>
						</div>
					</div>

					<!-- Filters label -->
					<div
						class="filters-label"
						v-if="
							routeQueries.diets || routeQueries.cuisines || routeQueries.meals
						"
					>
						<span
							class="label"
							v-for="query in routeQueries.diets"
							:key="query"
						>
							{{ query }}
							<font-awesome-icon
								icon="xmark"
								class="icon-clear"
								@click="removeDietFilter(query)"
							/>
						</span>
						<span
							class="label"
							v-for="query in routeQueries.cuisines"
							:key="query"
						>
							{{ query }}
							<font-awesome-icon
								icon="xmark"
								class="icon-clear"
								@click="removeCuisineFilter(query)"
							/>
						</span>
						<span
							class="label"
							v-for="query in routeQueries.meals"
							:key="query"
						>
							{{ query }}
							<font-awesome-icon
								icon="xmark"
								class="icon-clear"
								@click="removeMealFilter(query)"
							/>
						</span>
					</div>

					<div class="subtitle">
						<p v-if="!loading">
							Found
							{{ $filters.roundedNumber(recipes.count) }} recipes
						</p>
						<p v-else>Filtering recipes...</p>
					</div>
				</header>

				<ul class="recipes-list">
					<li v-for="recipe in recipes.hits" :key="recipe._links.self.href">
						<RecipeItem :recipe="recipe" />
					</li>
				</ul>

				<div class="pagination" v-if="recipes._links.next">
					<button
						class="btn btn-primary"
						@click="loadMoreRecipes(recipes._links.next.href)"
						v-if="!loading"
					>
						Load more
					</button>
					<button type="button" disabled class="btn btn-mute" v-else>
						Loading...
					</button>
				</div>
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
			gap: 16px;

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

				&.active {
					border: 1px solid var(--primary-color);
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
						}

						.form-button {
							display: flex;
							gap: 8px;
							margin-top: 16px;
						}
					}
				}
			}
		}

		.filters-label {
			display: flex;
			gap: 8px;
			flex-wrap: wrap;
			margin-bottom: 16px;

			.label {
				display: inline-block;
				background-color: #e0e0e0;
				font-size: 14px;
				font-weight: 500;
				padding: 6px 12px;
				border-radius: 1000px;

				.icon-clear {
					font-size: 12px;
					font-weight: 400;
					margin-left: 4px;
					color: #666;
					cursor: pointer;

					&:hover {
						color: var(--dark-grey);
					}
				}
			}
		}

		.subtitle p {
			font-weight: 500;
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

	.pagination {
		margin-top: 48px;
		text-align: center;
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
