import React from 'react';
import {Pagination} from 'react-bootstrap';


const RecordPagination = ({totalRecords,recordPerPage,paginate}) =>{
    const records = [];
    for (let i = 0 ; i < Math.ceil(totalRecords/recordPerPage); i++){
        records.push(
            <Pagination.Item key={i} onClick={()=> paginate(i+1)}>
                {i+1}
            </Pagination.Item>
        )
    }
    return(
        <div>
            <Pagination className="my-3 ml-2">{records}</Pagination>
        </div>
    )
}


export default RecordPagination;