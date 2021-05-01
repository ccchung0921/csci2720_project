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

export const getAsc = () => async(dispatch) => dispatch({type: 'GET_ASC'})
export const getDesc = () => async(dispatch) => dispatch({type: 'GET_DESC'})
export const getFilter = (filter) => async(dispatch) => dispatch({type: 'GET_FILTER',payload:filter})
