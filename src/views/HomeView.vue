<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IconHero from '@/components/icons/IconHero.vue';
import Footer from '@/components/Footer.vue';

const searchKeyword = ref(null);

const router = useRouter();

const searchRecipes = () => {
	const routeQueries = {
		q: searchKeyword.value,
	};

	router.push({ name: 'search', query: routeQueries });
};
</script>

<template>
	<div class="home-view">
		<div class="container">
			<div class="home-text-box">
				<h1 class="h1">What do you want to cook?</h1>
				<p class="text-description">
					You can find any food recipe here. Set some options that
					match your preference. Then, you can bookmark your favorite
					food recipe with single click. Let's cook!
				</p>
				<div class="form-container">
					<form class="search-form" @submit.prevent="searchRecipes">
						<label class="form-header" for="recipe"
							>Find favorite recipe</label
						>
						<div class="form-group">
							<input
								id="recipe"
								type="text"
								placeholder="Type something..."
								v-model="searchKeyword"
							/>
							<button type="submit" class="btn search-btn">
								Search!
							</button>
						</div>
					</form>
				</div>
			</div>
			<div class="home-img-box">
				<div class="home-img">
					<IconHero />
				</div>
				<div class="img-text">
					<p>Waiting for search.</p>
				</div>
			</div>
		</div>
	</div>

	<Footer />
</template>

<style scoped lang="scss">
.home-view {
	padding: 112px 0;

	.container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 96px;
		align-items: center;

		@media screen and (min-width: 1200px) {
			grid-template-columns: 2fr 1fr;
			align-items: center;
			gap: 120px;
		}
	}

	.home-text-box {
		text-align: center;

		@media screen and (min-width: 1200px) {
			text-align: start;
		}
		.text-description {
			font-size: 18px;
			margin-bottom: 32px;

			@media screen and (min-width: 992px) {
				margin-bottom: 64px;
			}
		}

		.form-container {
			padding: 48px 32px;
			background-color: var(--primary-color);
			border-radius: 11px;
			box-shadow: 0 10px 30px rgba(236, 88, 75, 0.3);
			.search-form {
				width: 100%;
				margin: 0 auto;
				text-align: start;

				.form-header {
					display: inline-block;
					font-size: 18px;
					font-weight: 700;
					color: #fff;
					margin-bottom: 8px;
				}

				.form-group {
					display: flex;
					justify-content: center;
					gap: 8px;
				}

				input[type='text'],
				.search-btn {
					display: inline-block;
					border: none;
					outline: none;
					font-size: 15px;
					font-family: inherit;
				}

				input[type='text'] {
					padding: 16px 18px;
					width: 100%;
					background-color: #fff;
					border: 1px solid #ddd;
					border-radius: 9px;

					&::placeholder {
						color: #999;
					}

					&:focus {
						color: var(--medium-grey);
					}
				}

				.search-btn {
					display: inline-block;
					padding: 16px 32px;
					background-color: var(--dark-grey);
					color: #fff;
					font-weight: 500;
					border-radius: 5px;
					cursor: pointer;
				}
			}
		}
	}

	.home-img-box {
		width: 100%;

		.home-img {
			width: 50%;
			margin: 0 auto 24px;

			@media screen and (min-width: 992px) {
				width: 75%;
			}

			@media screen and (min-width: 1200px) {
				width: 100%;
			}
		}

		.img-text {
			text-align: center;

			p {
				font-size: 14px;
			}
		}
	}
}
</style>
