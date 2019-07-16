import { updateFilter } from "./filter_actions";
import * as APIUtil from '../util/produce_api_util';

export const fetchProduce = (bounds) => (dispatch) => {
    return APIUtil.fetchProduce(bounds)
        .then(dispatch(updateFilter(bounds)), err => console.log(err))
}