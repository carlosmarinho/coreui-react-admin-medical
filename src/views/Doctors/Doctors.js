import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchDoctors, removeDoctor } from '../../actions/doctors';


class Doctors extends Component {
  
  componentDidMount(){
    this.props.fetchDoctors();
  }


  removeToCollection(item, e) {
    console.log("item: ", item);
    this.props.removeDoctor(item);
  }

  showDoctors(doctors){
    if(doctors.length > 0){
      return (
        doctors.map((doctor, index) => {
          return (
            <tr key={doctor.id.toString()}>
              <td><Link to={`/medicos/visualizar/${doctor.id}`}>{doctor.name}</Link></td>
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
                         
                  <a href="#"><Badge onClick={() => {if(window.confirm('Delete the item?')){this.removeToCollection(doctor.id)};}} color={'danger'}>Excluir</Badge></a>
                
              </td>
            </tr>
          )
        }
        )
      )
    }
  }

  showMessage(){
    console.log("mensagem: ", this.props.message);
    if(this.props.message){
        if(this.props.message.error && this.props.message.error.doctor){
            return(
                <p className="text-danger">{this.props.message.error.doctor.msg}</p>
            )
        }
        else if(this.props.message.success && this.props.message.success.doctor){
            return(
                <p className="text-success">{this.props.message.success.doctor.msg} </p>
            )
        }
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
                {this.showMessage()}
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
                <div className="container">
                
        
      </div>
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


export default connect(mapStateToProps, {fetchDoctors, removeDoctor})(Doctors)
