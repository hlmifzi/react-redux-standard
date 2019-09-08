import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Widget02 from '../Widgets/Widget02';
import {
  Col,
  Row,
} from 'reactstrap';
import { GetDashboardDataMaster } from './ZActionDashboard'
import { connect } from 'react-redux'



// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}


class Dashboard extends Component {

  componentWillMount() {
    try {
      if (this.props.AllDashboardReducer.DashboardDatamaster.user == null) {
        this.props.GetDashboardDataMaster()
      }
    } catch (e) {
      alert(e.massage)
    }
  }


  loading = () => <div className="spinner-grow text-primary animated fadeIn pt-1 d-flex justify-content-center"></div>

  render() {
    let { user, place } = this.props.AllDashboardReducer.DashboardDatamaster

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="6">
            <Link to="/dataMaster/userManagement">
              <Widget02 header={user} mainText="Total User" icon="fa fa-users" color="info" footer />
            </Link>
          </Col>
          <Col xs="12" sm="6" lg="6">
            <Link to="/dataMaster/tenantManagement">
              <Widget02 header={place} mainText="Total Place" icon="fa fa-moon-o" color="warning" footer />
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  AllDashboardReducer: state.AllDashboardReducer
})

const mapDispatchToProps = { GetDashboardDataMaster }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default connectRedux;