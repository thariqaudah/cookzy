import { ref } from 'vue';
import axios from 'axios';

const useFetch = () => {
	const recipes = ref([]);
	const recipe = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const fetchRecipes = async queries => {
		try {
			loading.value = true;

			let query = `${import.meta.env.VITE_API_URL}?type=public&app_id=${
				import.meta.env.VITE_API_ID
			}&app_key=${import.meta.env.VITE_API_KEY}&q=${
				queries.q
			}&health=alcohol-free`;

			// Diets filtering
			if (queries.diets) {
				queries.diets.forEach(dietLabel => (query += `&diet=${dietLabel}`));
			}

			// Cuisines type filtering
			if (queries.cuisines) {
				queries.cuisines.forEach(
					cuisineType => (query += `&cuisineType=${cuisineType}`)
				);
			}

			// Meals type filtering
			if (queries.meals) {
				queries.meals.forEach(mealType => (query += `&mealType=${mealType}`));
			}

			const res = await axios.get(query);
			recipes.value = res.data;
			loading.value = false;
			return res;
		} catch (err) {
			console.log(err);
			error.value = err;
			loading.value = false;
		}
	};

	const fetchRecipe = async id => {
		try {
			loading.value = true;

			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/${id}?type=public&app_id=${
					import.meta.env.VITE_API_ID
				}&app_key=${import.meta.env.VITE_API_KEY}`
			);
			recipe.value = res.data;
			loading.value = false;
			return res;
		} catch (err) {
			console.log(err);
			error.value = err;
			loading.value = false;
		}
	};

	const nextRecipes = async link => {
		try {
			loading.value = true;
			const res = await axios.get(link);
			console.log(res, recipes);
			recipes.value = {
				...res.data,
				hits: [...recipes.value.hits, ...res.data.hits],
			};
			loading.value = false;
			return res;
		} catch (err) {
			console.log(err);
			error.value = err;
			loading.value = false;
		}
	};

	return {
		recipes,
		recipe,
		error,
		loading,
		fetchRecipes,
		nextRecipes,
		fetchRecipe,
	};
};

export default useFetch;
