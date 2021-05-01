export default (historical = {loading:true, hours:[], days:[]}, action) =>{
    switch(action.type){
        case 'FETCH_HISTORICAL_HOURS':
           return {...historical, loading:true, hours : action.payload}; 
        case 'FETCH_HISTORICAL_DAYS':
           return {...historical, loading:true, days : action.payload}; 
        default:
            return historical;
    }
}