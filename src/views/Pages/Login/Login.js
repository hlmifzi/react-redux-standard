import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux'
import { SignInAction } from './AuthAction'
import NotifSwal from '../../../MyComponent/notification/Swal'
import Toast from '../../../MyComponent/notification/Toast'
import cookie from 'react-cookies'



const Background = {
  backgroundImage:
    `url(assets/img/backgroundLogin.jpg)`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  margin: 'auto'
}

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: null,
      password: null
    }
  }

  SignInHandler = async e => {
    try {
      let data = this.state
      await this.props.SignInAction(JSON.stringify(data))

      if (this.props.AuthReducer.Auth) {
        Toast.info(`Welcome to SIPP Apps ${cookie.load('username')}`)
        window.location.href = (cookie.load('role') === 'Admin') ? "#/dashboard" : "#dashboardBarang"
      } else {
        NotifSwal.failed()
        this.props.history.push("/");
      }
    } catch (e) {
      alert(e.message);
    }
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.SignInHandler()
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center" style={Background}>
        <div id="servertime" style={{ display: 'none' }}></div>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onChange={(e) => this.setState({ username: e.target.value })} placeholder="Username" autoComplete="username" onKeyDown={this._handleKeyDown} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password" autoComplete="current-password" onKeyDown={this._handleKeyDown} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.SignInHandler}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <img src={'https://i.ibb.co/RQH7bws/logo2-white.png'} className="img-avatar" alt="Logo SIPP" />
                      <p><b>Sistem Informasi Penjualan & Pengadaan Barang</b>, sebagai pendukung berjalannya operasional sesuai dengan kebutuhan perusahaan anda .</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  AuthReducer: state.AuthReducer
})

const mapDispatchToProps = { SignInAction }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectRedux;
