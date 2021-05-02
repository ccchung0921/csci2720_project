import * as api from '../api'

export const getFavouritePlaces = (id) => async (dispatch) =>{
    try{
        dispatch({type:'FAVOURITE_LOADING'})
        const {data} = await api.fetchFavourite(id);
        dispatch({type: 'FETCH_ALL_FAVOURIE',payload : data.favourite_places})
    }catch(error){
        console.log(error);
    }
}

export const AddToFavourite= (id,place) => async(dispatch) =>{
    try{
        dispatch({type:'FAVOURITE_LOADING'})
        const {data} = await api.addFavourite(id,place);
        console.log(data);
        dispatch({type:'ADD_TO_FAVOURIE',payload :data.favourite_places});
    }catch(err){
        console.log(err);
    }
} 


export const RemoveFromFavourite = (id,place) => async(dispatch) =>{
    try{
        dispatch({type:'FAVOURITE_LOADING'})
        const {data} = await api.removeFavourite(id,place);
        dispatch({type:'REMOVE_FROM_FAVOURIE',payload :data.favourite_places});
    }catch(err){
        console.log(err);
    }
} 