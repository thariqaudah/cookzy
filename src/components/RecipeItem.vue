<script setup>
import { computed, inject, ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
	recipe: Object,
});

const showBookmarkIcon = ref(false);

const savedRecipes = inject('savedRecipes');
const savingRecipe = inject('savingRecipe');
const removeRecipe = inject('removeRecipe');

// Get recipe id from the url
const recipeId = computed(() => props.recipe._links.self.href.substr(38, 32));

// Check bookmarked recipe
const isBookmarked = computed(() =>
	savedRecipes.value.some(recipe => recipe.recipe.id === recipeId.value)
);

// Bookmark recipe
const bookmarkRecipe = () => {
	if (isBookmarked.value) {
		removeRecipe(recipeId.value);
		return;
	}

	savingRecipe({
		recipe: {
			...props.recipe.recipe,
			id: recipeId.value,
		},
		_links: { ...props.recipe._links },
	});
};
</script>

<template>
	<div
		class="recipe-item"
		v-if="recipe"
		@mouseenter="showBookmarkIcon = true"
		@mouseleave="showBookmarkIcon = false"
	>
		<div class="recipe-thumbnail">
			<router-link
				:to="{ name: 'details', params: { id: recipeId } }"
				class="recipe-link"
			>
				<img
					:src="props.recipe.recipe.images.SMALL.url"
					:alt="props.recipe.recipe.label"
				/>
			</router-link>
			<Transition name="fadeBookmark">
				<button
					class="btn-bookmark"
					:class="{ bookmarked: isBookmarked }"
					@click="bookmarkRecipe"
					v-if="showBookmarkIcon || isBookmarked"
				>
					<font-awesome-icon icon="heart" class="icon-love" />
				</button>
			</Transition>
		</div>
		<div class="item-body">
			<div class="tags">
				<span class="tag tag-primary" v-if="props.recipe.recipe.dishType">{{
					$filters.capitalizeString(props.recipe.recipe.dishType[0])
				}}</span>
				<span class="tag tag-outline" v-if="props.recipe.recipe.cuisineType">{{
					$filters.capitalizeString(props.recipe.recipe.cuisineType[0])
				}}</span>
			</div>
			<p class="recipe-title">
				<router-link :to="{ name: 'details', params: { id: recipeId } }">
					{{ props.recipe.recipe.label }}
				</router-link>
			</p>
			<div class="recipe-details">
				<ul class="details-list">
					<li class="details-item">
						<font-awesome-icon class="details-icon" icon="clock" />
						<span
							>{{
								props.recipe.recipe.totalTime !== 0
									? `${props.recipe.recipe.totalTime} min`
									: 'No description'
							}}
						</span>
					</li>
					<li class="details-item">
						<font-awesome-icon class="details-icon" icon="utensils" />
						<span>{{ props.recipe.recipe.yield }} servings</span>
					</li>
					<li class="details-item">
						<font-awesome-icon class="details-icon" icon="fire-flame-curved" />
						<span
							>{{
								$filters.roundedNumber(props.recipe.recipe.calories)
							}}
							kcal</span
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
	position: relative;

	&:hover {
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
	}

	.recipe-thumbnail {
		.recipe-link {
			width: 100%;
			height: auto;

			img {
				width: 100%;
				height: 200px;
				object-fit: cover;
				border-radius: 9px;
			}
		}

		.btn-bookmark {
			display: inline-block;
			position: absolute;
			top: 1%;
			right: 2%;
			padding: 8px;
			border: none;
			outline: none;
			background-color: #fff;
			border-radius: 7px;
			cursor: pointer;

			&:hover,
			&.bookmarked {
				.icon-love {
					color: var(--primary-color);
				}
			}

			&.fadeBookmark-enter-active,
			&.fadeBookmark-leave-active {
				transition: all 0.15s ease-in;
			}

			&.fadeBookmark-enter-from,
			&.fadeBookmark-leave-to {
				opacity: 0;
			}

			.icon-love {
				font-size: 24px;
				color: #ccc;
			}
		}
	}

	.item-body {
		padding: 16px;

		@media screen and (min-width: 768px) {
			padding: 24px 32px;
		}

		.recipe-title {
			a {
				font-size: 24px;
				color: var(--dark-grey);
				line-height: 1.4;
				letter-spacing: -0.5px;

				&:hover {
					text-decoration: underline;
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
