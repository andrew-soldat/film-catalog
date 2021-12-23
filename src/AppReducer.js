const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_MOVIE_TO_WATCH_LIST':
			return {
				...state,
				watchList: [...state.watchList, action.payload]
			}
		case 'REMOVE_MOVIE_FROM_WATCH_LIST':
			return {
				...state,
				watchList: state.watchList.filter(watch => watch.id !== action.payload.id)
			}
		case 'ADD_MOVIE_TO_WATCHED':
			return {
				...state,
				watchList: state.watchList.filter(watch => watch.id !== action.payload.id),
				watched: [...state.watched, action.payload]
			}
		case 'REMOVE_MOVIE_FROM_WATCHED':
			return {
				...state,
				watchList: [...state.watchList, action.payload],
				watched: state.watched.filter(watch => watch.id !== action.payload.id)
			}
		case 'TOGGLE_LANGUAGE':
			return {
				...state,
				language: action.payload
			}
		default:
			return state
	}
}
export default AppReducer