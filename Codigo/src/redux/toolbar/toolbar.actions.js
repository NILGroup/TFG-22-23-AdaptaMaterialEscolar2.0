import ToolbarActionTypes from "./toolbar.types";

export const updateLastOpened = (last) => ({
    type: ToolbarActionTypes.UPDATE_LAST_OPENED,
    payload: last
});