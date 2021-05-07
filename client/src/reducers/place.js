export default  (places = [], action) => {
    switch (action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'ADD_PLACE':
            return [...places,action.payload];
        case 'UPDATE_PLACE':
            return places.map((place)=> place._id === action.payload._id ? action.payload: place);
        case 'DELETE_PLACE':
            return places.filter((place)=> place._id !== action.payload);
        case 'GET_ASC':
            let ascResult = places.sort((a,b)=>{ 
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0;
                });
            return ascResult;
        case 'GET_DESC':
            let descResult = places.sort((a,b)=>{ 
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA < nameB)return 1;
                if (nameA > nameB)return -1;
                return 0;
            });
            return descResult;
        case 'GET_FILTER':
            let filterResult = places.filter((place)=>
                place.name.toLowerCase().includes(action.payload.toLowerCase())
            )
            return filterResult;
        default:
            return places;
    }   
}