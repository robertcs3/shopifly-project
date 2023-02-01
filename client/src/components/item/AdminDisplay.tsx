import { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap'
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { ItemContext } from '../../contexts/ItemContext';
import { ItemInterface } from '../../interfaces/ItemInterface';
import { formatCurrency } from '../../utility/formatCurrency';
import EditItem from './EditItem';

export default function AdminDisplay(item: ItemInterface) {
  const shoppingCartContext = useContext(ShoppingCartContext);
  const itemContext = useContext(ItemContext);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ItemInterface>();
  return (
    <>
      <Card className="h-100 border border-light shadow-lg" style={{ width: "18rem" }}>
        <Card.Img
          variant='top'
          src={item.imageUrl}
          height="250px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
            <span className="fs-4">{item.name}</span>
            <span className="ms-2 text-muted">{formatCurrency(item.price)}</span>
          </Card.Title>

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

          <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>

            {/* Only show add to cart button if item quantity in shopping cart is 0 */}
            {shoppingCartContext.getItemQuantity(item._id) === 0 ? (
              <>

                {item.stock === 0 ? (
                  <div className='d-flex align-items-baseline justify-content-center' >
                    <Button disabled variant='primary' style={{ width: "11rem" }} onClick={() => shoppingCartContext.increaseCartQuantity(item._id)} >
                      + Add To Cart
                    </Button>
                  </div>
                ) : (
                  <div className='d-flex align-items-baseline justify-content-center' style={{ width: "175px" }}>
                    <Button variant='primary' style={{ width: "11rem" }} onClick={() => shoppingCartContext.increaseCartQuantity(item._id)} >
                      + Add To Cart
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  className="d-flex align-items-baseline justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => shoppingCartContext.decreaseCartQuantity(item._id)}>-</Button>

                  <div className='d-flex justify-content-center' style={{ width: "90px" }}>
                    <span className="fs-5">{shoppingCartContext.getItemQuantity(item._id)} in cart</span>
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

            <div className="d-flex justify-content-between align-items-baseline mt-2 gap-3">
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

              {shoppingCartContext.getItemQuantity(item._id) === 0 || item.stock === 0 ? (
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

          </div>
        </Card.Body>
      </Card>

      {currentItem !== undefined && (
        <EditItem show={modalShow} onHide={() => setModalShow(false)} item={currentItem} />
      )}
    </>
  )
}
