import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { formatCurrency } from '../utility/formatCurrency';

export default function CheckOutHistory() {
  const shoppingCartContext = useContext(ShoppingCartContext);
  return (
      <Row md={2} xs={1} lg={3} className='g-5 mt-5'>
          {shoppingCartContext.checkOutHistory.map((item, index) => {
            return (
              <Col className='d-flex justify-content-center' key={index}>
                
                  <Card className='h-100 border border-light shadow-lg' style={{ width: "15rem" }}>
                      <Card.Img variant='top' src={item.imageUrl} alt={item.name} height="125px" style={{ objectFit: "cover" }} />
                      <Card.Body style={{height: "5rem"}}>
                        <Card.Title className="d-flex justify-content-between align-items-baseline">
                          <span className='fs-5'>{item.name}</span>
                          <small className='text-muted'>{formatCurrency(item.price)}</small>
                        </Card.Title>
                      </Card.Body>
                      <Card.Footer>
                        <div className="d-flex justify-content-between align-items-baseline">
                          <small><span className='text-muted'>Quantity :</span> {item.quantity}</small>
                        </div>
                      </Card.Footer>
                    </Card>
              </Col>
            )
          })}
        </Row>
  )
}