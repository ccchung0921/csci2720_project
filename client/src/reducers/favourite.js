export default  (favourite= {loading:false ,places: []}, action) =>{
    switch (action.type){
        case 'FAVOURITE_LOADING':
            return {...favourite,loading:true};
        case 'FETCH_ALL_FAVOURIE':
            return {...favourite,loading:false,places: action.payload};
        case 'ADD_TO_FAVOURIE':
            return {...favourite,places: action.payload,loading:false};
        case 'REMOVE_FROM_FAVOURIE':
            return {...favourite,places :action.payload,loading:false};
        default:
            return favourite;
    }   
}