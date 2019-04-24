import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Button, CardFooter, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchDoctor, createDoctor } from '../../actions/doctors';

const required = value => value ? undefined : 'Campo Obrigatório'

class DoctorNew extends Component {
  
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentDidMount(){
    console.log("props aqui: ", this.props.match)
    this.props.fetchDoctor(this.props.match.params.id);
  }

  handleSubmit(values){
    console.log("values", values);
    this.props.createDoctor(values);
  }

  showMessage(){
      console.log("mensagem: ", this.props.message);
      if(this.props.message){
          if(this.props.message.error && this.props.message.error.user){
              return(
                  <p className="text-danger">{this.props.message.error.user.msg}</p>
              )
          }
          else if(this.props.message.success && this.props.message.success.user){
              return(
                  <p className="text-success">Usuário cadastrado com sucesso! Valide o seu cadastro através do email que foi enviado.</p>
              )
          }
      }
  }

  renderField(field){
      const {input, label, type, meta: {touched, error, warning} } = field;

      return(
        <FormGroup row>
          <Col md="3">
            <Label htmlFor={field.id}>{label}</Label>
          </Col>
          <Col xs="12" md="9">
            <input {...input} id={field.id} type={type} placeholder={field.placeholder} className="form-control"/>
            <FormText className="help-block">
              {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
            </FormText>
          </Col>
        </FormGroup>
      )
  }

  renderSelect(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		return(
			<FormGroup row>
        <Col md="3">
          <Label htmlFor="select">{label}</Label>
        </Col>
        <Col xs="12" md="9">
          <Field {...input}  component="select" className="native" className="form-control">
            {(!field.multiple)?<option>{label}</option>:''}
            {(field.options)?field.options.map((option, key) => {
                if(option._id && option.nome){
                  return(
                    <option key={`key-${label}-${option._id}`} value={option._id}>{option.nome}</option>
                  )
                }
            }):''}
          </Field>
				  {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))} 
        </Col>
      </FormGroup>
    )
	}

  render() {

    const { pristine, reset, submitting, handleSubmit } = this.props

    
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
              <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <CardHeader>
                  <strong><i className="icon-user pr-1"></i>Medico id: {this.props.match.params.id} </strong>
                </CardHeader>
                <CardBody>
                    
                    <Field
                        name="nome"
                        component={this.renderField}
                        type="text"
                        label="Nome"
                        id="fd-nome"
                        validate={[ required ]}
                        placeholder="Informe o nome..."
                    />

                    <Field
                        name="crm"
                        component={this.renderField}
                        type="text"
                        label="CRM"
                        id="fd-crm"
                        validate={[ required ]}
                        placeholder="Informe o CRM..."
                    />

                    <Field
                        name="telefone"
                        component={this.renderField}
                        type="text"
                        label="Telefone"
                        id="fd-telefone"
                        validate={[ required ]}
                        placeholder="Informe o nome..."
                    />

                    <Field
													name="activities"
													component={this.renderSelect}
													options={[{'1':'Pediatra'}]}
													label="Especialidade"
													validate={[ required ]}
										/>

                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter>
              </Form>
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

const Connect = connect(mapStateToProps, {fetchDoctor})(DoctorNew)

export default reduxForm ({
    form: 'cadastro-medico'
})(Connect);