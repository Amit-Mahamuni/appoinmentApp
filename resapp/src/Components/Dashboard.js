import React, { useState, useEffect } from 'react';
import { Container, Card, Col, Row } from "react-bootstrap";
import axios from 'axios';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

function Dashboard() {

    const [appoList, setappoList] = useState();
    const [dataset, setdataset] = useState();

    const pv = ["High", "Medium", "Low"];

    useEffect(() => {
        getDataList();
    }, []);

    function getDataList() {
        axios.get("http://127.0.0.1:8000/getlist/").then((response) => {
            console.log(response.data);
            if (response.status) {

                setappoList(response.data);

                let tempset = { label: [], total: [] }

                let temp = { trf: {}, res: {}, pri: {} }

                response.data.map(x => {
                    tempset.label.push(x['reason'])
                    tempset.total.push(x['id'])
                    temp.res[x['reason']] = parseInt(temp.res[x['reason']]) ? parseInt(temp.res[x['reason']]) + 1 : 1
                    temp.trf[x['date']] = parseInt(temp.trf[x['date']]) ? parseInt(temp.res[x['date']]) + 1 : 1
                    temp.pri[pv[x['priorty']]] = parseInt(temp.pri[pv[x['priorty']]]) ? parseInt(temp.pri[pv[x['priorty']]]) + 1 : 1
                });
                console.log(temp);
                setdataset(temp);

            } else {
                setappoList(response.data);
            }
        });
    }

    function splitObject(data) {
        let key = []
        let value = []
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                key.push(i);
                value.push(data[i]);
            }
        }
        return { label: key, total: value }
    }

    return (
        <div>
            <Container>
                <Card>
                    {
                        dataset ?
                            <Card.Body>
                                <h4>Dashboard</h4>
                                <Row>
                                    <Col md={4} sm={12}>
                                        <Card>
                                            <Card.Body>
                                                <h5>Appoinment Reason</h5>
                                                <Doughnut
                                                    data={{
                                                        labels: splitObject(dataset.res).label,
                                                        datasets: [{
                                                            label: 'Total Appoinment Reason',
                                                            data: splitObject(dataset.res).total,
                                                            borderColor: "#ffff",
                                                            // backgroundColor: "#dc3545"
                                                            backgroundColor: [
                                                                '#dc3545',
                                                                '#0048BA',
                                                                '#B0BF1A',
                                                                '#7CB9E8',
                                                            ],
                                                            hoverOffset: 4
                                                        }]
                                                    }}
                                                    height={400}
                                                    width={1000}
                                                    options={{
                                                        maintainAspectRatio: true,
                                                        responsive: true,
                                                        legend: {
                                                            Position: 'bottom',
                                                            align: 'start',
                                                            fontsize: '2'
                                                        }
                                                    }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={8} sm={12}>
                                        <Card>
                                            <Card.Body>
                                                <h5>Appoinment Priorty</h5>
                                                <Bar
                                                    data={{
                                                        labels: splitObject(dataset.pri).label,
                                                        datasets: [{
                                                            label: 'Total Appoinment Priorty',
                                                            data: splitObject(dataset.pri).total,
                                                            borderColor: "#ffff",
                                                            // backgroundColor: "#dc3545"
                                                            backgroundColor: [
                                                                '#dc3545',
                                                                '#0048BA',
                                                                '#B0BF1A',
                                                                '#7CB9E8',
                                                            ],
                                                            hoverOffset: 4
                                                        }]
                                                    }}
                                                    height={400}
                                                    width={1000}
                                                    options={{
                                                        maintainAspectRatio: true,
                                                        responsive: true,
                                                        legend: {
                                                            Position: 'bottom',
                                                            align: 'start',
                                                            fontsize: '2'
                                                        }
                                                    }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <br />
                                <hr />
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <h5>Appoinment Traffic</h5>
                                                <Line
                                                    data={{
                                                        labels: splitObject(dataset.trf).label,
                                                        datasets: [{
                                                            label: 'Total Appoinment Traffic',
                                                            data: splitObject(dataset.trf).total,
                                                            fill: "false",
                                                            tension: "0.1",
                                                            borderColor: "#dc3545",
                                                            backgroundColor: "#dc3545"
                                                        }]
                                                    }}

                                                    height={400}
                                                    width={1000}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                            : null
                    }
                </Card>
            </Container>
        </div>
    )
}

export default Dashboard;