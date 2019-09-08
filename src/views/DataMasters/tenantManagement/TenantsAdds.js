import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, FormGroup, Label, CardFooter, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { SubmitAddTenants, SubmitEditTenants } from '../MasterDataAction'
import Toast from '../../../MyComponent/notification/Toast'
import ROOT_API from '../../../MyServices/api/URLApi'


class UserAdd extends Component {
  state = {
    code: '',
    name: ''
  }

  handleSave = async (e) => {
    let data = {
      place_id: 0,
      code: this.state.code,
      name: this.state.name
    }

    const tipe = this.props.MasterDataReducer.Tenants.Action === "ADD" ? "ADD" : "UPDATE"
    try {
      let insertAction = "";
      if (tipe === "ADD") {
        insertAction = await this.props.SubmitAddTenants(JSON.stringify(data))
      } else {
        data = {
          ...data,
          place_id: this.props.match.params.id
        }
        insertAction = await this.props.SubmitEditTenants(JSON.stringify(data))
      }

      if (insertAction.status >= 200) {
        Toast.success(`Success ${tipe} Data`)
        this.props.history.push('/dataMaster/tenantManagement')
      } else {
        Toast.failed(`Failed ${tipe} data`)
      }
    } catch (e) {
      alert(e.message)
    }
  };

  async componentDidMount() {
    try {

      if (this.props.MasterDataReducer.Tenants.Action !== "ADD" ) {
        let param = this.props.match.params.id
        let dataEdit = await ROOT_API.get(`place/${param}`)

        this.setState({
          code: dataEdit.data.data.code,
          name: dataEdit.data.data.name
        })
      }

    } catch (error) {
      alert(error.massage)
    }
  }


  render() {
    let tipe = this.props.MasterDataReducer.Tenants.Action
    let AddorEdit = (tipe === "ADD") ? 'Add' : 'Edit'

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className={this.props.MasterDataReducer.Tenants.icon}></i> {AddorEdit} Tenant
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="name">Tenant Code </Label>
                      <Input type="text" onChange={(e)=>this.setState({code:e.target.value})} value={this.state.code} id="name" placeholder="Input Tenant Code" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="name">Tenant Name </Label>
                      <Input type="text" onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name} id="name" placeholder="Input Tenant Name" required />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="secondary" onClick={()=>(this.props.history.goBack())}><i className="fa fa-dot-circle-onav-icon icon-action-undo" ></i> Back</Button> &nbsp;
                <Button type="submit" onClick={this.handleSave} size="sm" color="success"><i className="fa fa-dot-circle-o" ></i> Submit</Button> &nbsp;
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  MasterDataReducer: state.MasterDataReducer
})

const mapDispatchToProps = {SubmitAddTenants, SubmitEditTenants }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(UserAdd)

export default connectRedux;