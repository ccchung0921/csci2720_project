import React from 'react';
import {ListGroup, Row, Col, Tab} from 'react-bootstrap';
import useWindowDimensions from '../hook/useWindowDimensions';
import PlaceManage from './PlaceManage';
import UserManage from './UserManage';

const Manage = () =>{
    const {width} = useWindowDimensions();
    return(
        <div className="ml-5 my-5" style={{width : width*0.5}}>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={4}>
                <ListGroup>
                    <ListGroup.Item action href="#link1">
                      Places
                    </ListGroup.Item>
                    <ListGroup.Item  action href="#link2">
                      Users
                    </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col sm={8}>
                <Tab.Content className="ml-5">
                <Tab.Pane eventKey="#link1">
                        <PlaceManage />
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link2">
                        <UserManage />
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
      </div>
    )
}

export default Manage;