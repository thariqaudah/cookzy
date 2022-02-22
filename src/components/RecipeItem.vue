<script setup>
const props = defineProps({
	recipe: Object,
});
</script>

<template>
	<div class="recipe-item">
		{{ props.recipe.recipe.label }}
	</div>
</template>
