import { combineReducers } from 'redux';

import itemsState from './roomsState';
import itemVariances from './roomVariances';

export default combineReducers({
	itemsState,
	itemVariances
})