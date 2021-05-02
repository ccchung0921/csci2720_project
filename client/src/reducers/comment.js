export default  (comment= {loading:false ,comments: []}, action) =>{
    switch (action.type){
        case 'COMMENT_LOADING':
            return {...comment,loading:true};
        case 'FETCH_ALL_COMMENT':
            return {...comment,loading:false,comments: action.payload};
        case 'ADD_COMMENT':
            return {...comment, comments: [action.payload,...comment.comments],loading:false};
        case 'REMOVE_COMMENT':
            return {...comment, comments :action.payload,loading:false};
        default:
            return comment;
    }   
}