import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchDoctors } from '../../actions/doctors';


import doctorsData from './DoctorsData'

function DoctorRow(props) {

  console.log("props aqui: ", props);
  const doctor = props.doctor
  const doctorLink = `/doctors/${doctor.id}`


  return (
    <tr key={doctor.id.toString()}>
      <td><Link to={doctorLink}>{doctor.name}</Link></td>
      <td>{doctor.crm}</td>
      <td>{doctor.telefone}</td>
      <td>{doctor.activity.name}</td>
    </tr>
  )
}

class Doctors extends Component {

  componentDidMount(){
    this.props.fetchDoctors();
  }

  render() {


    let doctors = [];
    if(this.props.doctors){
      doctors = this.props.doctors;
    }

    console.log("Doctors aqui no render: ", this.props, " --- ", doctors);

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
                      <th scope="col">Nome</th>
                      <th scope="col">CRM</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Especialidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor, index) =>
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

function mapStateToProps(state){
  return({
      doctors: state.doctors,
      message: state.message
  })
}


export default connect(mapStateToProps, {fetchDoctors})(Doctors)
