import React,{useEffect,useMemo,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Card,Row,Col} from 'react-bootstrap';
import {adminGetUsers,adminDeleteUser} from '../actions/user';
import {IoTrashBinSharp} from 'react-icons/io5';
import {GrUpdate} from 'react-icons/gr';
import {MdAddCircle} from 'react-icons/md'
import useWindowDimensions from '../hook/useWindowDimensions'
import UserForm from './UserForm'
import UserUpdate from './UserUpdate'

const UserManage = () =>{
    const [currentId,setCurrentId] = useState(null);
    const {width} = useWindowDimensions();
    const [visible,setVisible] = useState(false)
    const dispatch = useDispatch();
    const users = useSelector((state)=> state.users);

    useEffect(()=>{
        dispatch(adminGetUsers());
    },[dispatch])


    const getUserTable = () =>{
        return users.map((user)=>(
            <Card className="p-3" style={{minWidth:width*0.25}} key={user._id}>
                <Card.Title className="font-weight-bold">
                    {user.username}
                </Card.Title>
                <Card.Body>
                    <Row>
                        <Col className="font-weight-bold" sm={5}>
                            full Name
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}>
                        {user.fullName}
                        </Col>
                    </Row>
                    <Row>
                        <Col  className="font-weight-bold" sm={5}>
                            Identity
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}>
                        {user.isAdmin? 'Admin': 'User'}
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end mr-2" >
                       <GrUpdate className="logoButton mr-3" onClick={()=>setCurrentId(user._id)} size={24}  />
                       <IoTrashBinSharp className="logoButton" onClick={()=>dispatch(adminDeleteUser(user._id))} size={24} color='orange' />
                    </Row>
                </Card.Body>
            </Card>
        ))
    }

    const userTable = useMemo(()=> getUserTable(),[users]);

    return(
        <>
        <div style={{width:width*0.65}} className="d-flex justify-content-around">
        <div>
        <MdAddCircle color='rgb(241, 196, 15)' size={30} className="logoButton mb-3" onClick={()=> setVisible(!visible)}/>
       {userTable}
       </div>
             <div className="d-flex flex-column">
                {visible ? <UserForm /> : null}
                {currentId && <UserUpdate  currentId={currentId} />}
            </div>
       </div>
       </>
    )
}

export default UserManage