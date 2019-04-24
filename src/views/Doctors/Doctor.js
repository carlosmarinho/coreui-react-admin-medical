import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchDoctor } from '../../actions/doctors';

class Doctor extends Component {
  
  componentDidMount(){
    console.log("props aqui: ", this.props.match)
    this.props.fetchDoctor(this.props.match.params.id);
  }

  render() {

    //const doctor = doctorsData.find( doctor => doctor.id.toString() === this.props.match.params.id)
    
    let doctorDetails = [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]];
    if(this.props.doctor){
      doctorDetails = this.props.doctor ? this.props.doctor : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    }

    console.log("detalhes: ", doctorDetails);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-user pr-1"></i>Medico id: {this.props.match.params.id} </strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        _.map(doctorDetails, (value, key) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
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
      doctor: state.doctors,
      message: state.message
  })
}


export default connect(mapStateToProps, {fetchDoctor})(Doctor)