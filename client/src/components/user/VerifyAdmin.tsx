import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/esm/Form'
import { Formik } from 'formik';
import * as yup from 'yup';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


const schema = yup.object().shape({
    secret: yup.number().required(),
})

export default function MyVerticallyCenteredModal(props: any) {
    const userContext = useContext(UserContext);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Verify Admin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        let response = await userContext.verifyAdmin(values.secret, userContext.user!.id);
                        if (response === false) {
                            actions.setFieldError('secret', 'Incorrect secret code');
                        } else {
                            window.location.href = 'profile';
                        }
                    }}
                    initialValues={{
                        secret: 0,
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Control type='number' name='secret' onChange={handleChange} value={values.secret} isValid={touched.secret && !errors.secret}
                                    isInvalid={!!errors.secret} placeholder="Secret number" required />
                                <Form.Control.Feedback type='invalid'>{errors.secret}</Form.Control.Feedback>
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant='primary' type="submit">
                                    Verify
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>

        </Modal>
    );
}