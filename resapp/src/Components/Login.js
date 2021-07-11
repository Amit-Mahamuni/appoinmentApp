import React, { useEffect, useState } from 'react';
import { Container, Form, Card, Button, Row, Col, Badge } from "react-bootstrap";
import axios from 'axios';


function Login() {

    const [logmsg, setlogmsg] = useState();
    const [user, setuser] = useState();

    const usertype = ['Reception','Admin']

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setuser(JSON.parse(localStorage.getItem("user")));
        }
    }, [])

    function makelogin(event) {

        const formData = new FormData();

        formData.append("username", event.target[0].value);
        formData.append("password", event.target[1].value);

        axios.post("http://127.0.0.1:8000/checkuserinfo/", formData).then((response) => {
            console.log(response);
            if (response.status) {
                // alert("true");
                setlogmsg({ state: true, msg: "Login Sucessful" })
                localStorage.setItem("user", JSON.stringify(response.data));
                setuser(response.data);
            } else {
                // alert("false")
                setlogmsg({ state: false, msg: "Username or password is Wrong" });
            }
        });

        document.getElementById("loginfrm").reset();
        event.preventDefault();
    }

    function makeLogout() {
        setuser();
        localStorage.setItem("user", false);
    }

    return (
        <div>
            <Container>
                {
                    !user ?
                        <Row className="justify-content-center">
                            <Col md={6} sm={12}>
                                <Card className="border-0" >
                                    <Card.Body className="p-4">
                                        <h4>Login to Dashboard</h4>
                                        <br />
                                        {
                                            logmsg ?
                                                !logmsg.state ?
                                                    <span>
                                                        <h5>{logmsg.msg}</h5>
                                                        <br />
                                                    </span>
                                                    : null
                                                : null
                                        }
                                        <Form id="loginfrm" onSubmit={(event) => makelogin(event)}>
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
                            </Col>
                        </Row>
                        :
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md={4} sm={12}>
                                        <img src=""/>
                                    </Col>
                                    <Col md={8} sm={12}>
                                        <h4>{user.data.name}</h4>
                                        <h5>username : {user.data.username}</h5>
                                        <h5>contact : {user.data.phone + " | " + user.data.mail}</h5>
                                        <h5>Role :   <Badge pill variant="light">
                                            {usertype[user.data.type]}
                                        </Badge></h5>
                                        <Button variant="outline-dark"
                                            onClick={() => makeLogout()}
                                        >LogOut</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                }
            </Container>
        </div>
    )
}

export default Login;