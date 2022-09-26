import PictogramsActionTypes from './pictograms.types';

export const addItem = item => ({
    type: PictogramsActionTypes.ADD_PICTOGRAM,
    payload: item
});

export const searchPictograms = item => ({
    type: PictogramsActionTypes.SEARCH_PICTOGRAMS,
    payload: item
});

export const fetchPictogramsSuccess = resultList => ({
    type: PictogramsActionTypes.FETCH_PICTOGRAMS_SUCCESS,
    payload: resultList
  });

export const openPictogramFinder = () => ({
    type: PictogramsActionTypes.OPEN_PICTOGRAMS_MODAL
});

export const closePictogramFinder = () => ({
    type: PictogramsActionTypes.CLOSE_PICTOGRAMS_MODAL
});

export const insertPictogramIntoEditor = item => ({
    type: PictogramsActionTypes.INSERT_PICTOGRAM,
    payload: item
});

export const fetchPictograms = (searchInput) => {
    return dispatch => {
        fetch(`https://api.arasaac.org/api/pictograms/es/search/${searchInput}`)
        .then((response) => response.json())
        .then(data => {
            let items = [];
            for(let i = 0; i < data.length && i < 20; i++){
                items.push(`https://static.arasaac.org/pictograms/${data[i]._id}/${data[i]._id}_500.png`)
            }
            dispatch(fetchPictogramsSuccess(items));
        });
        
    }
}