import React from 'react';
import { Container, Form, Card, Button } from "react-bootstrap";
import axios from 'axios';

function Register() {
    return (
        <div>
            <Container>
                <Card className="border-0" >
                    <Card.Body>
                        <h4>Register</h4>
                        <br />
                        <Form onSubmit={(event) => makelogin(event)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Register;