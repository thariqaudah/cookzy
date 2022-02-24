<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
	<header>
		<Navbar />
	</header>

	<main>
		<RouterView />
	</main>
</template>

<style lang="scss">
@import '@/assets/base.css';

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 24px;
	.tag {
		display: inline-block;
		font-size: 14px;
		font-weight: 500;
		padding: 6px 12px;
		border-radius: 1000px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
	}

	.tag-primary {
		background-color: var(--primary-color);
		color: #fff;
		border: 3px solid var(--primary-color);
	}

	.tag-outline {
		background-color: transparent;
		color: inherit;
		border: 3px solid var(--primary-color);
	}

	.tag-secondary {
		border: 1px solid var(--light-grey);
		color: var(--light-grey);
	}
}
</style>
