export const CHANGE_FILTER = "CHANGE_FILTER";

export const updateFilter = ({bounds, location}) => ({
    type: CHANGE_FILTER,
    filters: {
        bounds,
        location
    }
})