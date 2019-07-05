import { OPEN_MODAL } from '../actions/session_actions';
import { CHANGE_FILTER } from '../actions/filter_actions';

export default function (state = { modal: null, filters: {bounds: null, location: null} }, action) {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_MODAL:
            return {
                modal: action.form
            };
        case CHANGE_FILTER:
            return {
                filters: action.filters
            }
        default:
            return state;
    }
}