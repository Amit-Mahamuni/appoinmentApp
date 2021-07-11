import React, { useState, useEffect } from 'react';
import { Container, Form, Card, Button, Col, Row, ListGroup, Badge, Spinner, Modal } from "react-bootstrap";
import axios from 'axios';

function Appoinment() {

    const [appoList, setappoList] = useState();
    const [filterappoList, setfilterappoList] = useState();
    const [selectAppo, setselectAppo] = useState();
    const [progess, setprogress] = useState(false);

    const pv = ["High", "Medium", "Low"];

    useEffect(() => {
        getDataList();
    }, []);

    function getDataList() {
        axios.get("http://127.0.0.1:8000/getlist/").then((response) => {
            console.log(response);
            if (response.status)
                setappoList(response.data);
            else
                setappoList(response.data);
        });
    }

    function addnewApponment(event) {
        console.log(event.target);
        setprogress(true);
        const formData = new FormData();
        formData.append("name", event.target[0].value);
        formData.append("priorty", event.target[1].value);
        formData.append("mail", event.target[2].value);
        formData.append("phone", event.target[3].value);
        formData.append("reason", event.target[4].value);
        formData.append("date", event.target[5].value);
        formData.append("time", event.target[6].value);
        formData.append("note", event.target[7].value);
        if (selectAppo) {
            formData.append("id", selectAppo.id);
            axios.post("http://127.0.0.1:8000/updateAppoinment/", formData).then((response) => {
                console.log(response);
                if (response.status) {
                    console.log("sucess");
                    getDataList();
                }
                else {
                    console.log("fail") 
                }
            });
        } else {
            axios.post("http://127.0.0.1:8000/addAppoinment/", formData).then((response) => {
                console.log(response);
                if (response.status)
                    console.log("sucess")
                else
                    console.log("fail")
            });
        }

        event.preventDefault();
        getDataList();
        document.getElementById("addAppFrm").reset();
        setselectAppo();
        setprogress(false);        
    }

    function selectApp(selID) {

        let temp = appoList.filter(x => x.id == selID)[0];

        document.getElementById("appName").value = temp.name;
        document.getElementById("appPriorty").value = temp.priorty;
        document.getElementById("appEmail").value = temp.mail;
        document.getElementById("appPhone").value = temp.phone;
        document.getElementById("appReason").value = temp.reason;
        document.getElementById("appDate").value = temp.date;
        document.getElementById("appTime").value = temp.time;
        document.getElementById("appNote").value = temp.note;

        setselectAppo(temp)
    }

    function deleteApp(delId) {

        const formData = new FormData();

        formData.append("id", delId);
        setprogress(true);
        axios.post("http://127.0.0.1:8000/deleteAppoinment/", formData).then((response) => {
            console.log(response);
            if (response.status)
                alert("sucess")
            else
                alert("fail")
        });

        getDataList();
        document.getElementById("addAppFrm").reset();
        setselectAppo();
        setprogress(false);
    }

    function searchList(event) {
        console.log(event.target.value)
        let temp = appoList;
        temp = temp.filter(x => x.name.toLowerCase().includes((event.target.value).toLowerCase()));
        setfilterappoList(temp);
    }

    function AppoinmentList(props) {
        return (
            props.data.map(x =>
                <ListGroup.Item action href={"#link" + x.id}
                    onClick={() => selectApp(x.id)}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5><strong>{x.name}</strong></h5>
                            <h6>{x.date + " | " + x.time}</h6>
                        </div>
                        <div>
                            <Badge variant={x.priorty == 0 ? "primary" : "light"} >{pv[x.priorty]}</Badge>
                        </div>
                    </div>
                </ListGroup.Item>
            )
        )
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control type="text" placeholder="Search | Enter Name, Phone No." required
                                        onChange={(event) => searchList(event)} autocomplete="off" />
                                </Form.Group>
                                <ListGroup >
                                    {
                                        filterappoList ?
                                            <AppoinmentList data={filterappoList} />
                                            : appoList ?
                                                <AppoinmentList data={appoList} />
                                                : null
                                    }

                                </ListGroup>,
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <h5>Add New Visitor |<small> Enter Visitor Detail</small></h5>

                                <Form id="addAppFrm" onSubmit={(event) => addnewApponment(event)}>

                                    <Form.Row>
                                        <Form.Group as={Col} md={9} sm={12} controlId="formGridAddress1">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" id="appName" placeholder="Enter Name" required />
                                        </Form.Group>

                                        <Form.Group as={Col} md={3} sm={12} controlId="formGridPassword">
                                            <Form.Label>Priorty</Form.Label>
                                            <Form.Control as="select" id="appPriorty" defaultValue="High" required>
                                                <option value="0">High</option>
                                                <option value="1">Medium</option>
                                                <option value="2">Low</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md={6} sm={12} controlId="formGridEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" id="appEmail" placeholder="Enter email" required />
                                        </Form.Group>

                                        <Form.Group as={Col} md={6} sm={12} controlId="formGridPassword">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="tel" id="appPhone" placeholder="Enter Phone" required />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Reason</Form.Label>
                                            <Form.Control as="select" id="appReason" defaultValue="Business" required>
                                                <option>Business</option>
                                                <option>Family</option>
                                                <option>Other</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>Appoinment Date</Form.Label>
                                            <Form.Control type="date" id="appDate" required />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Appoinment Time</Form.Label>
                                            <Form.Control type="time" id="appTime" required />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Note</Form.Label>
                                        <Form.Control as="textarea" rows={3} id="appNote" placeholder="Enter Note" required />
                                    </Form.Group>

                                    {
                                        !selectAppo ?
                                            <div>
                                                <Button variant="outline-dark" type="button" className="mr-2">
                                                    Cancle
                                                </Button>

                                                <Button variant="primary" type="submit">
                                                    Add Apoinment
                                                </Button>
                                            </div>
                                            :
                                            <div>
                                                <Button variant="outline-dark" type="button" className="mr-2"
                                                    onClick={() => deleteApp(selectAppo.id)}>
                                                    Delete Apoinment
                                                </Button>

                                                <Button variant="primary" type="submit">
                                                    Update Apoinment
                                                </Button>
                                            </div>
                                    }
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Modal
                    size="sm" show={progess}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered className="spinnerModel"
                >
                    <Modal.Body>
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status" variant="dark">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    </Modal.Body>
                </Modal>

            </Container>
        </div>

    )
}

export default Appoinment;