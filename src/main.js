import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faClock,
	faUtensils,
	faFireFlameCurved,
	faHeart,
	faSpoon,
	faPlus,
	faMinus,
	faArrowRight,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);

// Fontawesome libarary
library.add(
	faClock,
	faUtensils,
	faFireFlameCurved,
	faHeart,
	faSpoon,
	faPlus,
	faMinus,
	faArrowRight,
	faChevronDown
);
app.component('font-awesome-icon', FontAwesomeIcon);

// Global filters
app.config.globalProperties.$filters = {
	capitalizeString(str) {
		return `${str[0].toUpperCase()}${str.slice(1)}`;
	},
	roundedNumber(num) {
		const roundedNum = Math.round(num);
		return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},
};

app.use(router);

app.mount('#app');
