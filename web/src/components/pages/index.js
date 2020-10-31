import React from "react";
import { Button, Container, Row, Col, Progress  } from "shards-react";
import LoadBar from '../loadbar';

function Home() {
  return ( 
      <Container style={{width:"100vv", margin:"0 !important"}}>
        <div>
        
        
          <div className="home-block">
            kapitola 2.2
            <div className="home-button">
                <Button pill theme="secondary">pokračovat</Button>
            </div>
            
       </div>


        <Row>
        <Col sm="12" lg="6">
        <div className="home-kap">
        přehled kapitol 
        </div>
          </Col>

          <Col sm="12" lg="6">
          <div className="home-text">
          postup kurzem
          </div>
          </Col>
        </Row>


    <Row>
        <Col sm="12" lg="6">
       
            <div >
                <div className="home-kapitoly">
                1. hello world
                </div >
                <div className="home-kapitoly">
                2.1 proměnné
                </div>
                <div className="home-kapitoly">
                2.2 proměnné - operátory
                </div>
            </div>

            </Col>

        <Col sm="12" lg="6">
        
            <LoadBar value="60" className='loadBar' bgcolor="#5a6169"></LoadBar> 
         
        </Col>
    </Row>
            </div>
            </Container>
  );
}

export default Home;