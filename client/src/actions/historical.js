import * as api from '../api'

export const fetchHistoricalTime = (name) => async (dispatch) =>{
    try{
        let {data} = await api.fetchHistoricalTime(name);
        dispatch({type: 'FETCH_HISTORICAL_HOURS',payload : data});
    }catch(error){
        console.log(error);
    }
}

export const fetchHistoricalDays = (name) => async (dispatch) =>{
    try{
        console.log(name)
        let {data} = await api.fetchHistoricalDays(name);
        console.log(data);
        dispatch({type: 'FETCH_HISTORICAL_DAYS',payload : data});
    }catch(error){
        console.log(error);
    }
}