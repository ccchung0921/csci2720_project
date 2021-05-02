import * as api from '../api';

export const getUserInfo = (id) => async(dispatch) =>{
    try{
        const {data} = await api.getUserinfo(id);
        dispatch({type: 'GET_INFO', payload:data})
    }catch(error){
        console.log(error);
    }
}

export const signUp = (formData,history) => async(dispatch) =>{
    await api.signUp(formData).then(({data})=>{
        console.log(data)
        dispatch({type:'AUTH',payload:data});
        history.push('/');
    }).catch((error)=> dispatch({type:'AUTH_FAIL',payload: error.response.data.message}))
}

export const signIn = (formData,history) => async(dispatch) =>{
    await api.signIn(formData).then(({data})=>{
        dispatch({type:'AUTH', payload: data});
        history.push('/');
    }).catch((error)=> dispatch({type:'AUTH_FAIL',payload: error.response.data.message }))
}