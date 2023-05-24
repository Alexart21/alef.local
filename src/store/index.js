import { createStore } from 'vuex'

import app from './app'

const store = {
	state: {
	},
	modules: {
		app,
	},
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);
