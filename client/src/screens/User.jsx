import React from 'react';
import {ListGroup, Row, Col, Tab} from 'react-bootstrap';
import useWindowDimensions from '../hook/useWindowDimensions';
import MyFavourite from './MyFavourite';

const User = () =>{
    const {width} = useWindowDimensions();
    return(
        <div className="ml-5 my-5" style={{width : width*0.5}}>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={4}>
                <ListGroup>
                    <ListGroup.Item action href="#link1">
                      Profile
                    </ListGroup.Item>
                    <ListGroup.Item  action href="#link2">
                      Favourite Places
                    </ListGroup.Item>
                    <ListGroup.Item action href="#link3">
                        Comments
                    </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col sm={8}>
                <Tab.Content className="ml-5">
                <Tab.Pane eventKey="#link1">
                        
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link2">
                      <MyFavourite />
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link3">
              
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
      </div>
    )
}

export default User;