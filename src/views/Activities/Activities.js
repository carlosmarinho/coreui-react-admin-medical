import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchActivities } from '../../actions/activities';


class Activities extends Component {
  
  componentDidMount(){
    this.props.fetchActivities();
  }

  showActivities(activities){
    if(activities.length > 0){
      return (
        activities.map((activity, index) => {
          return (
            <tr key={activity.id.toString()}>
              <td><Link to={`/especialidades/visualizar/${activity.id}`}>{activity.name}</Link></td>
              <td>{activity.description}</td>
              <td>
                <Link to={`/especialidades/visualizar/${activity.id}`}>
                  <Badge color={'warning'}>Visualizar</Badge>&nbsp;
                </Link>
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
        if(this.props.message.error && this.props.message.error.activity){
            return(
                <p className="text-danger">{this.props.message.error.activity.msg}</p>
            )
        }
        else if(this.props.message.success && this.props.message.success.activity){
            return(
                <p className="text-success">{this.props.message.success.activity.msg} </p>
            )
        }
    }
  }


  render() {

    let activities = [];
    if(this.props.activities){
      console.log("this.props activities: ", this.props.activities);
      activities = this.props.activities;
    }

    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" >
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Especialidades <small className="text-muted">listagem</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.showActivities(activities)}
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
      activities: state.activities,
      message: state.message
  })
}


export default connect(mapStateToProps, {fetchActivities})(Activities)
