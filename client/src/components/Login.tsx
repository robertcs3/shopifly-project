import React, { FormEvent, useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/esm/Form'
import { Formik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})


export default function Login() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      <Formik
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        let response = await userContext.login(values.username, values.password);
        console.log(response);
        if (response === "failure") {
          actions.setFieldError('username', 'Login credentials incorrect')
          actions.setFieldError('password', 'Login credentials incorrect')
        } else {
        }
      }}
      initialValues={{
        username: '',
        password: '',
      }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
      
        }) => (
          <Form noValidate onSubmit={handleSubmit}>

          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' name='username' onChange={handleChange} value={values.username} onBlur={handleBlur} isValid={touched.username && !errors.username}
             isInvalid={!!errors.username} placeholder="Username"  required />
            <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' onChange={handleChange} value={values.password} onBlur={handleBlur} isValid={touched.password && !errors.password} 
            isInvalid={!!errors.password} placeholder="Password" required />
          </Form.Group>
          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
          <Button variant='primary' type="submit">
            Login
          </Button>
        </Form>
        )}
      </Formik>
    </>
  )
}