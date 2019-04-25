import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Button, CardFooter, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchDoctor, editDoctor } from '../../actions/doctors';
import { fetchActivities} from '../../actions/activities';


const required = value => value ? undefined : 'Campo Obrigatório'

class DoctorEdit extends Component {
  
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentDidMount(){
    this.props.fetchDoctor(this.props.match.params.id);
    this.props.fetchActivities();
  }

  handleSubmit(values){
    console.log("values", values);
    this.props.editDoctor(this.props.match.params.id, values);
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
                  <p className="text-success">Médico editado com sucesso!</p>
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
            {(!field.multiple)?<option>{field.placeholder}</option>:''}
            {(field.options)?field.options.map((option, key) => {
              if(_.isObject(option)){
                if(option.id && option.name){
                  return(
                    <option key={`key-${label}-${option.id}`} value={option.id}>{option.name}</option>
                  )
                }
                else{
                  return(
                    <option key={`key-${label}-${Object.keys(option)[0]}`} value={Object.keys(option)[0]}>{Object.values(option)[0]}</option>
                  )
                }
              }
              else{
                return(
                  <option key={`key-${option}`} value={key}>{option}</option>
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

    let activities = [];
    if(this.props.activities){
      activities = this.props.activities
    }

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
                  {this.showMessage()}
                    
                    <Field
                        name="name"
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
                    {/*@todo buscar da api de especialidade*/}
                    <Field
													name="activity_id"
													component={this.renderSelect}
                          options={activities}
                          label="Especialidade"
                          placeholder="Escolha a especialidade..."
													validate={[ required ]}
										/>

                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  {/*<Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>*/}
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
      message: state.message,
      activities: state.activities,
      initialValues: (state.doctors)?state.doctors:[]
  })
}


const myForm = reduxForm ({
  form: 'editar-medico',
  enableReinitialize: true
})(DoctorEdit);

export default connect(mapStateToProps, {fetchDoctor, editDoctor, fetchActivities})(myForm);