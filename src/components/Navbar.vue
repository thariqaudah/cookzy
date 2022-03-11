<script setup>
import { RouterLink } from 'vue-router';
import IconHome from '@/components/icons/IconHome.vue';
import IconLove from '@/components/icons/IconLove.vue';
</script>

<template>
	<nav class="nav">
		<div class="container">
			<a class="logo" href="/"> Cookzy </a>

			<ul class="nav-list">
				<li class="nav-item">
					<RouterLink class="nav-link" to="/">
						<IconHome />
						<span>Home</span>
					</RouterLink>
				</li>
				<li class="nav-item">
					<RouterLink class="nav-link" :to="{ name: 'favorite' }">
						<IconLove />
						<span>Favorite</span>
					</RouterLink>
				</li>
			</ul>
		</div>
	</nav>
</template>

<style scoped lang="scss">
.nav {
	background-color: #fff;
	padding: 16px 0;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		color: #444;
		font-size: 25px;
		font-family: 'Lobster', cursive;
		text-transform: lowercase;
		letter-spacing: 1px;
	}

	.nav-list {
		display: flex;
		gap: 24px;
		list-style: none;

		.nav-link {
			display: inline-block;
			text-decoration: none;
			color: inherit;

			@media screen and (min-width: 768px) {
				display: flex;
				align-items: center;
				gap: 4px;
			}

			span {
				display: none;

				@media screen and (min-width: 768px) {
					display: inline-block;
				}
			}

			&:hover {
				color: var(--primary-color);
			}
		}
	}
}
</style>
