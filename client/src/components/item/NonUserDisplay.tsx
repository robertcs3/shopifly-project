import { Card } from 'react-bootstrap'
import { ItemInterface } from '../../interfaces/ItemInterface';
import { formatCurrency } from '../../utility/formatCurrency';

export default function NonUserDisplay(item: ItemInterface) {

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
        </Card.Body>
      </Card>
    </>
  )
}
