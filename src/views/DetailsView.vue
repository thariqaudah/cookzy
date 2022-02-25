<script setup>
import { watch } from 'vue';
import useFetch from '../composables/useFetch';

const { recipe, error, fetchRecipe } = useFetch();

const props = defineProps({
	id: String,
});

// Watch route param of id and fetch the data
watch(
	() => props.id,
	async () => {
		const res = await fetchRecipe(props.id);
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
							`${$filters.capitalizeString(
								recipe.recipe.cuisineType[0]
							)} ${recipe.recipe.dishType[0]}`
						}}
						food
					</p>
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
								<span>{{
									recipe.recipe.ingredients.length
								}}</span>
							</div>
						</div>
						<div class="snap">
							<div class="snap-icon">
								<font-awesome-icon
									class="icon"
									icon="fire-flame-curved"
								/>
							</div>
							<div class="snap-text">
								<span>Calories</span>
								<span
									>{{
										$filters.roundedNumber(
											recipe.recipe.calories
										)
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
								v-for="(healthLabel, index) in recipe.recipe
									.healthLabels"
								:key="healthLabel"
								v-show="index < 5"
							>
								{{ healthLabel }}
							</span>
						</div>
					</div>
				</div>

				<div class="recipe-ing">
					<h3 class="h3">Ingredients</h3>
					<ul class="ing-list">
						<li
							class="ing-item"
							v-for="ing in recipe.recipe.ingredients"
							:key="ing.foodId"
						>
							<div class="ing-main">
								<img
									class="ing-img"
									:src="ing.image"
									:alt="ing.food"
								/>
								<p class="ing-text">
									{{ $filters.capitalizeString(ing.food) }}
								</p>
							</div>
							<p class="ing-detail">
								{{ `${ing.quantity} ${ing.measure}` }}
							</p>
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
		gap: 32px;

		.recipe-img-box {
			.recipe-img {
				width: 100%;
				height: 400px;
				object-fit: cover;
				border-radius: 11px;
			}
		}

		.recipe-text-box {
			.recipe-description {
				font-size: 18px;
				margin-bottom: 48px;
			}

			.details-snapshot {
				display: flex;
				justify-content: space-between;
				margin-bottom: 48px;

				.snap {
					display: flex;
					flex-direction: column;
					text-align: center;
					gap: 16px;

					@media screen and (min-width: 576px) {
						flex-direction: row;
						align-items: center;
						text-align: start;
					}

					.snap-icon {
						width: 60px;
						height: 60px;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 9px;
						background-color: #ddd;
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
			.ing-list {
				.ing-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.ing-main {
						display: flex;
						align-items: center;
						.ing-img {
							width: 50px;
							height: 50px;
							border-radius: 50%;
							object-fit: cover;
						}
					}
				}
			}
		}
	}
}
</style>
