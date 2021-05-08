import React from 'react';
import useWindowDimensions from '../hook/useWindowDimensions';
import {HiEmojiSad} from 'react-icons/hi'

const NoMatch = () =>{
    const {height} = useWindowDimensions();

    return(
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:height}} >
            <h3 className="font-weight-bold">Page Not Found</h3>
            <HiEmojiSad color="orange" size='50' />
        </div>
    )

}

export default NoMatch