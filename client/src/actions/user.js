import * as api from '../api'

export const adminGetUsers = () => async (dispatch) =>{
    try{
        let {data} = await api.getUsers()
        dispatch({type: 'GET_ALL_USER',payload : data})
    }catch(error){
        console.log(error);
    }
}

export const adminAddUsers = (user) => async(dispatch) =>{
    try{
        let {data} = await api.addUser(user);
        dispatch({type:'ADD_USER',payload:data});
    }catch(err){
        console.log(err)
    }
}

export const adminDeleteUser = (id) => async(dispatch) =>{
    try{
        await api.deleteUser(id);
        dispatch({type:'DELETE_USER',payload:id});
    }catch(err){
        console.log(err);
    }
}

export const adminUpdateUser = (id,updated) => async(dispatch) =>{
    try{
        const {data} = await api.updateUser(id,updated);
        dispatch({type:'UPDATE_USER',payload:data});
    }catch(err){
        console.log(err);
    }
}

