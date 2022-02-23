<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
	recipe: Object,
});
</script>

<template>
	<div class="recipe-item" v-if="recipe">
		<div class="recipe-thumbnail">
			<img
				:src="recipe.recipe.images.REGULAR.url"
				alt="Recipe food image thumbnail"
			/>
			<button class="btn-bookmark">
				<font-awesome-icon icon="heart" class="icon-love" />
			</button>
		</div>
		<div class="item-body">
			<div class="tags">
				<span class="dish-type">{{
					$filters.capitalizeString(recipe.recipe.dishType[0])
				}}</span>
				<span class="cuisine-type">{{
					$filters.capitalizeString(recipe.recipe.cuisineType[0])
				}}</span>
			</div>
			<p class="recipe-title">
				<router-link to="#">
					{{ recipe.recipe.label }}
				</router-link>
			</p>
			<div class="recipe-details">
				<ul class="details-list">
					<li class="details-item">
						<font-awesome-icon class="details-icon" icon="clock" />
						<span
							>{{
								recipe.recipe.totalTime !== 0
									? `${recipe.recipe.totalTime} min`
									: 'No description'
							}}
						</span>
					</li>
					<li class="details-item">
						<font-awesome-icon class="details-icon" icon="utensils" />
						<span>{{ recipe.recipe.yield }} servings</span>
					</li>
					<li class="details-item">
						<font-awesome-icon class="details-icon" icon="fire-flame-curved" />
						<span
							>{{ $filters.roundedNumber(recipe.recipe.calories) }} kcal</span
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.recipe-item {
	height: 100%;
	background-color: #fff;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
	border-radius: 9px;
	overflow: hidden;

	.recipe-thumbnail {
		position: relative;

		img {
			width: 100%;
			height: 250px;
			object-fit: cover;
			border-radius: 9px;
		}

		.btn-bookmark {
			display: inline-block;
			position: absolute;
			top: 3%;
			right: 3%;
			border: none;
			outline: none;
			background-color: transparent;
			cursor: pointer;

			&:hover {
				.icon-love {
					color: var(--primary-color);
				}
			}
			.icon-love {
				font-size: 32px;
				color: #ddd;
			}
		}
	}

	.item-body {
		padding: 24px 32px;

		.tags {
			display: flex;
			gap: 8px;
			margin-bottom: 16px;
			.dish-type,
			.cuisine-type {
				display: inline-block;
				font-size: 14px;
				font-weight: 500;
				padding: 6px 12px;
				border: 3px solid var(--primary-color);
				border-radius: 1000px;
				box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
			}

			.dish-type {
				background-color: var(--primary-color);
				color: #fff;
			}

			.cuisine-type {
				background-color: transparent;
				color: inherit;
			}
		}

		.recipe-title {
			a {
				font-size: 24px;
				color: var(--dark-grey);
				line-height: 1.4;
				letter-spacing: -0.5px;

				&:hover {
					color: var(--primary-color);
				}
			}
		}

		.recipe-details {
			padding-top: 24px;

			.details-list {
				list-style: none;
				display: flex;
				flex-direction: column;
				gap: 12px;

				.details-item {
					font-size: 16px;

					.details-icon {
						color: var(--secondary-color);
					}

					span {
						margin-left: 8px;
					}
				}
			}
		}
	}
}
</style>
