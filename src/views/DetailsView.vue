<script setup>
import { ref, watch } from 'vue';
import useFetch from '../composables/useFetch';

const { recipe, error, fetchRecipe } = useFetch();

const servings = ref(null);

const updateServings = () => {};

const props = defineProps({
	id: String,
});

// Watch route param of id and fetch the data
watch(
	() => props.id,
	async () => {
		const res = await fetchRecipe(props.id);
		servings.value = res.data.recipe.yield;
		console.log(res);
	},
	{ immediate: true }
);
</script>

<template>
	<div class="details-view">
		<div class="container">
			<div v-if="error">{{ error }}</div>

			<div class="recipe-container" v-else-if="recipe">
				<div class="recipe-img-box">
					<img
						class="recipe-img"
						:src="recipe.recipe.images.REGULAR.url"
						:alt="recipe.recipe.label"
					/>
				</div>
				<div class="recipe-text-box">
					<h2 class="h2">{{ recipe.recipe.label }}</h2>
					<p class="recipe-description">
						{{
							`${$filters.capitalizeString(recipe.recipe.cuisineType[0])} ${
								recipe.recipe.dishType[0]
							}`
						}}
						food
					</p>
					<!-- FORM SERVINGS -->
					<form class="form-servings">
						<div class="form-group">
							<button type="button">
								<font-awesome-icon icon="minus" />
							</button>
							<input type="number" v-model="servings" />
							<button type="button">
								<font-awesome-icon icon="plus" />
							</button>
						</div>
						Servings
					</form>
					<!-- SNAPSHOT -->
					<div class="details-snapshot">
						<div class="snap">
							<div class="snap-icon">
								<font-awesome-icon class="icon" icon="clock" />
							</div>
							<div class="snap-text">
								<span>Time</span>
								<span>{{ recipe.recipe.totalTime }} Min</span>
							</div>
						</div>
						<div class="snap">
							<div class="snap-icon">
								<font-awesome-icon class="icon" icon="spoon" />
							</div>
							<div class="snap-text">
								<span>Ingredients</span>
								<span>{{ recipe.recipe.ingredients.length }}</span>
							</div>
						</div>
						<div class="snap">
							<div class="snap-icon">
								<font-awesome-icon class="icon" icon="fire-flame-curved" />
							</div>
							<div class="snap-text">
								<span>Calories</span>
								<span
									>{{
										$filters.roundedNumber(recipe.recipe.calories)
									}}
									Kcal</span
								>
							</div>
						</div>
					</div>
					<div class="details-box">
						<p class="details-title">Diet Labels</p>
						<div class="tags">
							<span
								class="tag tag-secondary"
								v-for="dietLabel in recipe.recipe.dietLabels"
								:key="dietLabel"
							>
								{{ dietLabel }}
							</span>
						</div>
					</div>
					<div class="details-box">
						<p class="details-title">Health Labels</p>
						<div class="tags">
							<span
								class="tag tag-secondary"
								v-for="(healthLabel, index) in recipe.recipe.healthLabels"
								:key="healthLabel"
								v-show="index < 5"
							>
								{{ healthLabel }}
							</span>
						</div>
					</div>
				</div>

				<div class="recipe-ing">
					<div class="ing-header">
						<h3 class="h3">Ingredients</h3>
						<p class="ing-description">
							For {{ recipe.recipe.yield }} servings
						</p>
					</div>
					<ul class="ing-list">
						<li
							class="ing-item"
							v-for="ing in recipe.recipe.ingredients"
							:key="ing.foodId"
						>
							<div class="ing-img">
								<img :src="ing.image" :alt="ing.food" />
							</div>
							<div class="ing-text">
								<p class="text-title">
									{{ $filters.capitalizeString(ing.food) }}
								</p>
								<p class="text-detail">
									{{ `${ing.weight} ${ing.measure}` }}
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div v-else>Fetching recipe...</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.details-view {
	padding: 32px 0;

	.recipe-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32px;

		@media screen and (min-width: 992px) {
			grid-template-columns: 1fr 1fr;
			column-gap: 96px;
		}

		.recipe-img-box {
			.recipe-img {
				width: 100%;
				height: 400px;
				object-fit: cover;
				border-radius: 11px;
			}
		}

		.recipe-text-box {
			.h2 {
				margin-bottom: 16px;
			}
			.recipe-description {
				font-size: 18px;
				margin-bottom: 48px;
			}

			.form-servings {
				display: flex;
				align-items: center;
				gap: 16px;
				margin-bottom: 32px;
				.form-group {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 16px;
					width: 100px;
					padding: 12px;
					border-radius: 11px;
					background-color: #e0e0e0;
				}

				input[type='number']::-webkit-inner-spin-button,
				input[type='number']::-webkit-outer-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}

				input[type='number'] {
					-moz-appearance: textfield;
				}

				input[type='number'] {
					display: inline-block;
					width: 100%;
					border: none;
					outline: none;
					font-family: inherit;
					font-size: 16px;
					padding: 0;
					margin: 0;
					text-align: center;
					background-color: transparent;
					font-weight: 500;
					pointer-events: none;
				}

				button[type='button'] {
					display: inline-block;
					border: none;
					background-color: transparent;
					color: var(--light-grey);
					cursor: pointer;

					&:hover {
						color: var(--dark-grey);
					}
				}
			}

			.details-snapshot {
				display: flex;
				justify-content: space-between;
				margin-bottom: 32px;

				.snap {
					display: flex;
					flex-direction: column;
					text-align: center;
					gap: 16px;

					@media screen and (min-width: 1200px) {
						flex-direction: row;
						align-items: center;
						text-align: start;
					}

					.snap-icon {
						width: 60px;
						height: 60px;
						margin: 0 auto;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 9px;
						background-color: #e0e0e0;
						.icon {
							color: var(--secondary-color);
							font-size: 28px;
						}
					}

					.snap-text {
						span:first-child {
							font-size: 14px;
							color: var(--light-grey);
						}

						span:last-child {
							font-weight: 600;
						}
					}

					.snap-text {
						display: flex;
						flex-direction: column;
					}
				}
			}

			.details-box {
				margin-bottom: 32px;
				.details-title {
					font-size: 16px;
					font-weight: 600;
					margin-bottom: 16px;
				}
			}
		}

		.recipe-ing {
			.ing-header {
				// display: flex;
				// justify-content: space-between;
				// align-items: center;
				margin-bottom: 32px;

				.h3 {
					margin-bottom: 8px;
				}

				.ing-description {
					color: #777;
				}
			}
			.ing-list {
				display: flex;
				flex-direction: column;
				gap: 32px;
				.ing-item {
					display: flex;
					align-items: center;
					gap: 24px;

					.ing-img {
						width: 60px;
						height: 60px;
						border: 3px solid var(--light-grey);
						border-radius: 50%;

						img {
							width: 100%;
							border-radius: 50%;
							object-fit: cover;
						}
					}
					.ing-text {
						.text-title {
							font-size: 16px;
							font-weight: 500;
							color: var(--dark-grey);
						}

						.text-detail {
							font-size: 14px;
						}
					}
				}
			}
		}
	}
}
</style>
