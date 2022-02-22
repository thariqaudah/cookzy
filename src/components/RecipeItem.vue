<script setup>
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
		</div>
		<div class="item-body">
			<div class="dish-types">
				<span
					class="dish-type"
					v-for="type in recipe.recipe.dishType"
					:key="type"
					>{{ type }}</span
				>
			</div>
			<p class="recipe-title">{{ recipe.recipe.label }}</p>
			<div class="recipe-details">
				<ul class="detail-list">
					<li class="detail-item">
						<font-awesome-icon icon="clock" />
						<span>{{ recipe.recipe.totalTime }} minutes</span>
					</li>
					<li class="detail-item">
						<font-awesome-icon icon="clock" />
						<span>{{ recipe.recipe.yield }} servings</span>
					</li>
					<li class="detail-item">
						<font-awesome-icon icon="clock" />
						<span>{{ recipe.recipe.calories }} kcal</span>
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
		img {
			width: 100%;
			height: 250px;
			object-fit: cover;
			border-radius: 9px;
		}
	}

	.item-body {
		padding: 16px 24px;

		.dish-types {
			display: flex;
			gap: 8px;
			margin-bottom: 16px;
			.dish-type {
				display: inline-block;
				font-size: 14px;
				padding: 6px 12px;
				background-color: var(--primary-color);
				color: #fff;
				border-radius: 100px;
				box-shadow: 0 10px 30px rgba(236, 88, 75, 0.1);
			}
		}

		.recipe-title {
			font-size: 20px;
			font-weight: 600;
			color: var(--dark-grey);

			@media screen and (min-width: 768px) {
				font-size: 24px;
			}
		}
	}
}
</style>
