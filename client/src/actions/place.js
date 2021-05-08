import * as api from '../api'

export const getPlaces = () => async (dispatch) =>{
    try{
        let {data} = await api.fetchPlaces()
        const result = await api.fetchWaitingTime();
        let updateTime = result.data.updateTime
        let waitTimes = result.data.waitTime;
        data.map((e,i)=>{
        let result = waitTimes.filter((time)=>time.hospName === e.name).map(({topWait})=> topWait)[0];
        data[i] = {...data[i],waiting_time: result,updateTime}
        });
        dispatch({type: 'FETCH_ALL',payload : data})
    }catch(error){
        console.log(error);
    }
}

export const adminGetPlaces = () => async (dispatch) =>{
    try{
        let {data} = await api.fetchPlaces()
        dispatch({type: 'FETCH_ALL',payload : data})
    }catch(error){
        console.log(error);
    }
}

export const adminAddPlaces = (place) => async(dispatch) =>{
    try{
        let {data} = await api.addPlaces(place);
        dispatch({type:'ADD_PLACE',payload:data});
    }catch(err){
        console.log(err)
    }
}

export const adminDeletePlace = (id) => async(dispatch) =>{
    try{
        await api.deletePlace(id);
        dispatch({type:'DELETE_PLACE',payload:id});
    }catch(err){
        console.log(err);
    }
}

export const adminUpdatePlace = (id,updated) => async(dispatch) =>{
    try{
        const {data} = await api.updatePlace(id,updated);
        dispatch({type:'UPDATE_PLACE',payload:data});
    }catch(err){
        console.log(err);
    }
}

export const getAsc = () => async(dispatch) => dispatch({type: 'GET_ASC'})
export const getDesc = () => async(dispatch) => dispatch({type: 'GET_DESC'})
export const getFilter = (field,filter) => async(dispatch) => dispatch({type: 'GET_FILTER',payload:filter, data:field})
