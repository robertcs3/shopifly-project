import { useContext, useState } from 'react'
import { Button, Col, Offcanvas, Row, Stack } from 'react-bootstrap'
import { ShoppingCartContext } from '../contexts/ShoppingCartContext'
import { formatCurrency } from '../utility/formatCurrency';
import Payment from './payment/Payment';

export default function ShoppingCart({ show, onHide }: any) {
    const shoppingCartContext = useContext(ShoppingCartContext);
    const [modalShow, setModalShow] = useState<boolean>(false);

    const option = {
        scroll: true,
        backdrop: true,
    }
    return (
        <>
            <Offcanvas show={show} onHide={onHide} {...option} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h4>My Shopping Cart</h4></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack gap={3}>
                        <>
                            {shoppingCartContext.checkOutItems.length === 0 ? (
                                <h5 className='d-flex justify-content-center text-muted'>Cart Is Empty</h5>
                            ) : (
                                <>
                                    {shoppingCartContext.checkOutItems.map(item => {
                                        return (
                                            <div key={item.id}>
                                                <Row className='border-bottom  pt-2 pb-2'>
                                                    <Col>
                                                        <div>
                                                            <img src={item.imageUrl} className="rounded" height="100px" width="150px" style={{ objectFit: "cover" }} alt="" />
                                                            <h5 className='mt-1'>{item.name}</h5>
                                                            <div>{formatCurrency(item.price)}</div>
                                                        </div>
                                                    </Col>
                                                    <Col className='d-flex flex-column justify-content-between'>
                                                        <div className='d-flex align-items-baseline gap-2 pt-3'>
                                                            <p className='text-muted align-self-end'>Quantity :</p><h1>{item.quantity}</h1>
                                                        </div>
                                                        <Button variant='danger' onClick={() => {
                                                            shoppingCartContext.removeFromCart(item.id);
                                                        }}>Remove</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </>
                        {shoppingCartContext.checkOutItems.length !== 0 && (
                            <>
                                <h5>Total: {formatCurrency(shoppingCartContext.getCheckOutTotal())}</h5>
                                <Button variant='primary' onClick={() => {
                                    setModalShow(true);
                                }}>Check-out</Button>
                            </>
                        )}
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
            <Payment show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}