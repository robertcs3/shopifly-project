import React, { useState } from 'react'
import { Tabs, Tab, Row, Container, Col } from 'react-bootstrap'
import Login from './Login'
import Register from './Register'

export default function Entry() {
  const [key, setKey] = useState<string>("login")
  return (
    <>
      
        <Row className='d-flex justify-content-center'>
          <Col lg={6} md={6} xs={6}>
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k!)}
            className="mb-3 d-flex justify-content-center gap-5"
            >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Register />
            </Tab>
                </Tabs>
          </Col>
        </Row>
      
      
    </>
  )
}