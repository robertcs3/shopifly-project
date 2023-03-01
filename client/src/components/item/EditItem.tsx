
import { useContext } from 'react'
import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import { cloudinary } from '../../utility/cloudinary'
import { ItemContext } from '../../contexts/ItemContext';
import { ButtonContext } from '../../contexts/ButtonContext';
import Spinner from 'react-bootstrap/Spinner';

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().min(1, 'Minimum of 1 dollar').max(10000, 'Maximum of 10000 dollars').required(),
  stock: yup.number().min(1, 'Minimum of 1 in stock').max(100000, 'Maximum of 100000 in stock').required(),
  imageFile: yup.mixed().required(), 
})

export default function CreateItem(props: any) {
  const itemContext = useContext(ItemContext);
  const buttonContext = useContext(ButtonContext);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        buttonContext.setIsLoading(true);
        let imageUrl = await cloudinary(values.imageFile);
        let response = await itemContext.editItem(props.item._id, values.name, values.price, values.stock, imageUrl)
        if (response === 'duplicate') {
          actions.setFieldError('name', 'Item already exists')
        } else {
          props.onHide();
        }
        buttonContext.setIsLoading(false);
      }}
      initialValues={{
        name: props.item.name,
        price: props.item.price,
        stock: props.item.stock,
        imageFile: '',
      }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue
        }) => (
          <Form noValidate onSubmit={handleSubmit}>

          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='string' name='name' onChange={handleChange} value={values.name}  isValid={touched.name && !errors.name}
             isInvalid={!!errors.name} placeholder="Name" required />
            <Form.Control.Feedback type='invalid'>{errors.name as string}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Price</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type='number' name='price' onChange={handleChange} value={values.price}  isValid={touched.price && !errors.price}
               isInvalid={!!errors.price} placeholder="Price" required />
            </InputGroup>
            <Form.Control.Feedback type='invalid'>{errors.price as string}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Stock</Form.Label>
            <Form.Control type='number' name='stock' onChange={handleChange} value={values.stock}  isValid={touched.stock && !errors.stock}
             isInvalid={!!errors.stock} placeholder="Stock" required />
            <Form.Control.Feedback type='invalid'>{errors.stock as string}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Image Upload</Form.Label>
            <Form.Control type='file' name='imageFile' onChange={(event) => setFieldValue("imageFile", (event.target as HTMLInputElement).files![0])} isValid={touched.imageFile && !errors.imageFile}
             isInvalid={!!errors.imageFile} placeholder="File" required />
            <Form.Control.Feedback type='invalid'>{errors.imageFile}</Form.Control.Feedback>
          </Form.Group>
              <Modal.Footer>
              {buttonContext.isLoading ? (
               <Button variant='primary'  disabled>
                 <Spinner
                 as="span"
                 animation="border"
                 role="status"
                 aria-hidden="true"
                              />
               </Button>
            ) : (
              <Button variant='primary' type="submit">
              Submit
            </Button>
            )}
              </Modal.Footer>
        </Form>
        )}
      </Formik>
      </Modal.Body>
      
    </Modal>
  )
}