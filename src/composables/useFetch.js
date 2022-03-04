import { ref } from 'vue';
import axios from 'axios';

const useFetch = () => {
	const recipes = ref([]);
	const recipe = ref(null);
	const error = ref(null);

	const fetchRecipes = async queries => {
		try {
			let query = `${import.meta.env.VITE_API_URL}?type=public&app_id=${
				import.meta.env.VITE_API_ID
			}&app_key=${import.meta.env.VITE_API_KEY}&q=${queries.q}`;

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

			console.log(query);

			const res = await axios.get(query);
			recipes.value = res.data;
			return res;
		} catch (err) {
			console.log(err);
			error.value = err;
		}
	};

	const fetchRecipe = async id => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/${id}?type=public&app_id=${
					import.meta.env.VITE_API_ID
				}&app_key=${import.meta.env.VITE_API_KEY}`
			);
			recipe.value = res.data;
			return res;
		} catch (err) {
			console.log(err);
			error.value = err;
		}
	};

	return { recipes, recipe, error, fetchRecipes, fetchRecipe };
};

export default useFetch;
