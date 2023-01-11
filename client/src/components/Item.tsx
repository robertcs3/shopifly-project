import React, { useContext, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ItemContext } from '../contexts/ItemContext';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { UserContext } from '../contexts/UserContext';
import { ItemInterface } from '../interfaces/ItemInterface';
import { formatCurrency } from '../utility/formatCurrency';
import EditItem from './EditItem';

export default function Item() {
  const itemContext = useContext(ItemContext);
  const shoppingCartContext = useContext(ShoppingCartContext);
  const userContext = useContext(UserContext);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ItemInterface>();
  return (
    <>
      <Container className='mt-5'>
        <Row md={2} xs={1} lg={3} className='g-3'>
          <>
            {itemContext.items.map(item => {
              return (
                <div key={item._id}>

                  <Col className='mx-5 mt-2 d-flex justify-content-center'>
                    <Card className="h-100 border border-light shadow-lg" style={{ width: "18rem" }}>
                      <Card.Img
                        variant='top'
                        src={item.imageUrl}
                        height="400px"
                        style={{ objectFit: "cover" }} />
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
                          <span className="fs-4">{item.name}</span>
                          <span className="ms-2 text-muted">{formatCurrency(item.price)}</span>
                        </Card.Title>

                        {/* display out of stock msg if stock === 0 */}
                        {item.stock === 0 ? (
                          <>
                            <Card.Text>
                              <span className='fs-5 text-muted mb-5'>Out of stock</span>
                            </Card.Text>
                          </>
                        ) : (
                          <Card.Text className='d-flex'>
                            <span className="fs-5">{item.stock} in stock</span>
                          </Card.Text>
                        )}

                        {/* display item functionalities if user is logged in */}
                        {userContext.user ? (
                          <>
                            <div className='mt-auto'>
                              <div
                                className="d-flex align-items-center flex-column"
                                style={{ gap: ".5rem" }}
                              >
                                {/* if item quantity is 0,  then display addToCart only */}
                                {shoppingCartContext.getItemQuantity(item._id) === 0 ? (
                                  <>

                                    {item.stock === 0 ? (
                                      <div className='d-flex align-items-baseline justify-content-center'>
                                        <Button disabled className="mb-2" variant='primary' onClick={() => shoppingCartContext.increaseCartQuantity(item._id)} >
                                          + Add To Cart
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className='d-flex align-items-baseline justify-content-center'>
                                        <Button className="mb-2" variant='primary' onClick={() => shoppingCartContext.increaseCartQuantity(item._id)} >
                                          + Add To Cart
                                        </Button>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="d-flex align-items-center justify-content-center"
                                      style={{ gap: ".5rem" }}
                                    >
                                      <Button onClick={() => shoppingCartContext.decreaseCartQuantity(item._id)}>-</Button>
                                      <div>
                                        <span className="fs-3">{shoppingCartContext.getItemQuantity(item._id)}</span> in cart
                                      </div>

                                      {/* disable add button if cart amount > stock number */}
                                      {item.stock === shoppingCartContext.getItemQuantity(item._id) ? (
                                        <>
                                          <Button disabled>+</Button>
                                        </>
                                      ) : (
                                        <Button onClick={() => shoppingCartContext.increaseCartQuantity(item._id)} >+</Button>
                                      )}

                                    </div>
                                  </>
                                )}

                                {/* display admin functionalities if user is admin */}
                                {userContext.user.isAdmin ? (
                                  <>
                                    <div className="d-flex justify-content-between align-items-baseline gap-3">
                                      <Button
                                        onClick={() => {
                                          setModalShow(true);
                                          setCurrentItem(item);
                                        }}
                                        variant="secondary"
                                        size="sm"
                                      >
                                        Edit
                                      </Button>

                                      {item.stock === 0 ? (
                                        <Button
                                        disabled
                                        onClick={() => shoppingCartContext.removeFromCart(item._id)}
                                        variant="danger"
                                        size="sm"
                                      >
                                        Remove
                                      </Button>
                                      ) : (
                                        <Button
                                        onClick={() => shoppingCartContext.removeFromCart(item._id)}
                                        variant="danger"
                                        size="sm"
                                      >
                                        Remove
                                      </Button>
                                      )}
                                      
                                      <Button
                                        onClick={() => itemContext.deleteItem(item._id)}
                                        variant='danger'
                                        size='sm'
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <Button
                                    onClick={() => shoppingCartContext.removeFromCart(item._id)}
                                    variant="danger"
                                    size="sm"
                                  >
                                    Remove
                                  </Button>
                                )}

                              </div>
                            </div>
                          </>
                        ) : null}

                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              )
            })}
          </>
        </Row>

        {currentItem !== undefined && (
          <EditItem show={modalShow} onHide={() => setModalShow(false)} item={currentItem} />
        )}
      </Container>
    </>
  )
}