import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import doctorsData from './DoctorsData'

function DoctorRow(props) {
  const doctor = props.doctor
  const doctorLink = `/doctors/${doctor.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={doctor.id.toString()}>
      <th scope="row"><Link to={doctorLink}>{doctor.id}</Link></th>
      <td><Link to={doctorLink}>{doctor.name}</Link></td>
      <td>{doctor.registered}</td>
      <td>{doctor.role}</td>
      <td><Link to={doctorLink}><Badge color={getBadge(doctor.status)}>{doctor.status}</Badge></Link></td>
    </tr>
  )
}

class Doctors extends Component {

  render() {

    const doctorList = doctorsData.filter((doctor) => doctor.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" >
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Médicos <small className="text-muted">listagem</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorList.map((doctor, index) =>
                      <DoctorRow key={index} doctor={doctor}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Doctors;
