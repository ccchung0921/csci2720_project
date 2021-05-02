const authReducer = (state = { authData: null,userInfo:null,errors:null}, action) => {
    switch (action.type) {
      case 'AUTH':
        localStorage.setItem('auth',JSON.stringify({ ...action?.payload }));
        return {...state, authData: action.payload, errors: null};
      case 'LOGOUT':
        localStorage.clear();
        return {...state, authData: null, errors: null };
      case 'AUTH_FAIL':
        return {...state, errors: action.payload};
      case 'GET_INFO':
        return {...state,userInfo:action.payload};
      default:
        return state;
    }
  };
  
  export default authReducer;