import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchDoctors } from '../../actions/doctors';



function DoctorRow(props) {

  console.log("props aqui: ", props);
  const doctor = props.doctor
  const doctorLink = `/medicos/${doctor.id}`


  return (
    <tr key={doctor.id.toString()}>
      <td><Link to={doctorLink}>{doctor.name}</Link></td>
      <td>{doctor.crm}</td>
      <td>{doctor.telefone}</td>
      <td>{(doctor.activity)?doctor.activity.name:''}</td>
      <td>
        <Link to={`/medicos/visualizar/${doctor.id}`}>
          <Badge color={'warning'}>Visualizar</Badge>&nbsp;
        </Link>
        <Link to={`/medicos/editar/${doctor.id}`}>
          <Badge color={'success'}>Editar</Badge>&nbsp;
        </Link>
        <Link to={`/medicos/excluir/${doctor.id}`}>
          <Badge color={'danger'}>Excluir</Badge>
        </Link>
      </td>
    </tr>
  )
}

class Doctors extends Component {

  componentDidMount(){
    this.props.fetchDoctors();
  }

  showDoctors(doctors){
    if(doctors.length > 0){
      console.log("Caiu aqui dentro do show doctors");
      return (
        doctors.map((doctor, index) =>
          <DoctorRow key={index} doctor={doctor}/>
        )
      )
    }
  }

  render() {

    let doctors = [];
    if(this.props.doctors){
      console.log("this.props doctors: ", this.props.doctors);
      doctors = this.props.doctors;
    }

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
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.showDoctors(doctors)}
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
