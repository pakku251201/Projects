import React, {useState} from 'react'
import { Form, FormControl, FormGroup, FormLabel, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { motion } from 'framer-motion';


const Contact = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <div className='contact'>
      <h2>Contact</h2>
      <Row>
        <Col>
        <motion.div className='contact-form'
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FormGroup className='mb-3' controlId='validateCustom01'>
              <FormLabel>Name</FormLabel>
              <FormControl required type='text' placeholder='name' />
            </FormGroup>
            <FormGroup className='mb-3' controlId='validateCustom02'>
              <FormLabel>Email</FormLabel>
              <FormControl required type='email' placeholder='email' />
            </FormGroup>
            <FormGroup className='mb-3' controlId='validateCustom01'>
              <FormLabel>Message</FormLabel>
              <FormControl required as='textarea' placeholder='type your message here' />
            </FormGroup>
            <Button type='submit'>Submit Form</Button>
          </Form>
        </motion.div>
        </Col>
        <Col>
        <div className='contact-data'>
          <p>If you want to chat about a project — email me on pratheekprao@gmail.com.
          </p>
          <p>
            <ListGroup horizontal>
              <ListGroupItem><a href='https://www.linkedin.com/in/pratheekprao/'>LinkedIn</a></ListGroupItem>
              <ListGroupItem><a href='https://github.com/pakku251201'>Github</a></ListGroupItem>
            </ListGroup>
          </p>
        </div>
        </Col>
      </Row>
    </div>
  )
}

export default Contact