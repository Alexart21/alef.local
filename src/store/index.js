import { createStore } from 'vuex'

import user from './user'

const store = {
	state: {
	},
	modules: {
		user,
	},
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);
