import * as api from '../api';

export const getComment = (id) => async(dispatch)=> {
    try{
        let {data} = await api.getComment(id);
        dispatch({type:'FETCH_ALL_COMMENT',payload:data});
    }catch(err){
        console.log(err);
    }
}   

export const getUserComment = (id) => async(dispatch)=> {
    try{
        let {data} = await api.getUserComment(id);
        dispatch({type:'FETCH_ALL_COMMENT',payload:data});
    }catch(err){
        console.log(err);
    }
}   

export const addComment = (comment) => async(dispatch) =>{
    try{
        dispatch({type:'COMMENT_LOADING'});
        let {data} = await api.addComment(comment);
        dispatch({type:'ADD_COMMENT',payload:data});
    }catch(err){
        console.log(err)
    }
}