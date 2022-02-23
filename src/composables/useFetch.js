import { ref } from 'vue';
import axios from 'axios';

const useFetch = () => {
	const data = ref(null);
	const error = ref(null);

	const fetch = async queries => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}?type=public&app_id=${
					import.meta.env.VITE_API_ID
				}&app_key=${import.meta.env.VITE_API_KEY}&q=${queries.q}&random=true`
			);
			data.value = res.data;
			return res;
		} catch (err) {
			console.log(err);
			error.value = err;
		}
	};

	return { data, error, fetch };
};

export default useFetch;
