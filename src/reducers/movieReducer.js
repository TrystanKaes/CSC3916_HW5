import constants from '../constants/actionTypes'

var initialState = {
    movies: [],
    selectedMovie: null
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.FETCH_MOVIES:
            updated['movies'] = action.movies;
            updated['selectedMovie'] = action.movies[0];
            return updated;
        case constants.SET_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        case constants.FETCH_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        default:
            return state;
    }
}