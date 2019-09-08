import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, FormGroup, Label, CardFooter, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { AddAll, SubmitAdd, SubmitEdit } from '../MasterDataAction'
import Toast from '../../../MyComponent/notification/Toast'
import ROOT_API from '../../../MyServices/api/URLApi'


class UserAdd extends Component {
  state = {
    role: '',
    tenant: '',
    username: '',
    password: '',
    place_dropdown: [],
  }

  handleSave = async (e) => {
    let data = {
      role_id: this.state.role,
      place_id: this.state.tenant,
      username: this.state.username,
      fullname: this.state.username,
      password: this.state.password
    }

    const tipe = this.props.MasterDataReducer.Users.Action === "ADD" ? "ADD" : "UPDATE"
    try {
      let insertAction = "";
      if (tipe === "ADD") {
        insertAction = await this.props.SubmitAdd(JSON.stringify(data))
      } else {
        data = {
          ...data,
          user_id: this.props.match.params.id
        }
        insertAction = await this.props.SubmitEdit(JSON.stringify(data))
      }
      if (insertAction.status >= 200) {
        Toast.success(`Success ${tipe} Data`)
        this.props.history.push('/dataMaster/userManagement')
      } else {
        Toast.failed(`Failed ${tipe} data`)
      }
    } catch (e) {
      alert(e.message)
    }
  };

  async componentDidMount() {
    try {
      let place = await ROOT_API.get('place')

      if (this.props.MasterDataReducer.Users.Action !== "ADD" ) {
        let param = this.props.match.params.id
        let dataEdit = await ROOT_API.get(`user/${param}`)

        this.setState({
          role: dataEdit.data.data.role_id,
          tenant: dataEdit.data.data.place_id,
          username: dataEdit.data.data.username,
          password:  dataEdit.data.data.hashpass
        })
      }

      this.setState({
        place_dropdown: place.data.data

      })
    } catch (error) {
      alert(error.massage)
    }
  }


  render() {
    let tipe = this.props.MasterDataReducer.Users.Action
    let AddorEdit = (tipe === "ADD") ? 'Add' : 'Edit'
    let place_id = this.state.tenant
    let place_dropsown = this.state.place_dropdown.map((v, i) => {

      if (AddorEdit === "ADD") {
        return <option 
        key={i} 
        value={v.place_id}
      >{v.name}</option>
      } else {
        return <option 
        key={i} 
        value={v.place_id} 
        selected={(place_id === v.place_id) ? 'selected' : ''}
      >{v.name}</option>
      } 
  
    })

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className={this.props.MasterDataReducer.Users.icon}></i> {AddorEdit} User
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="Role">Role</Label>
                      <Input type="select" onChange={(e) => (this.setState({ role: e.target.value }))} name="ccmonth" id="Role">
                        <option value="">Choose Role</option>
                        <option value="1" selected = { this.state.role === 1 ? 'selected' : ''}>Admin</option>
                        <option value="2" selected = {this.state.role === 2 ? 'selected' : ''}>Tenant</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="Tenant">Tenant</Label>
                      <Input type="select" onChange={(e) => (this.setState({ tenant: e.target.value }))} name="ccmonth" id="Tenant">
                        <option value="">Choose Place</option>
                        {place_dropsown}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="Username">Username</Label>
                      <Input type="text" onChange={(e) => (this.setState({ username: e.target.value }))} value={this.state.username} id="name" placeholder="Username" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="Password">Password</Label>
                      <Input type="password" onChange={(e) => (this.setState({ password: e.target.value }))} value={this.state.password} id="password" placeholder="Password" required />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="secondary" onClick={() => (this.props.history.goBack())}><i className="fa fa-dot-circle-onav-icon icon-action-undo" ></i> Back</Button> &nbsp;
                <Button type="submit" onClick={this.handleSave} size="sm" color="success"><i className="fa fa-dot-circle-o" ></i> {(tipe === "ADD") ? 'Submit' : 'Update'}</Button> &nbsp;
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

const mapDispatchToProps = { AddAll, SubmitAdd, SubmitEdit }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(UserAdd)

export default connectRedux;