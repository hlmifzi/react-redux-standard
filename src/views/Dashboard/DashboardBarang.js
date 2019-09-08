import React, { Component } from 'react';
import Widget02 from '../Widgets/Widget02';
import Widget04 from '../Widgets/Widget04';
import {
  CardGroup,
  Col,
  Row,
} from 'reactstrap';
import { GetDashboardProduct } from './ZActionDashboard'
import { connect } from 'react-redux'


class Dashboard extends Component {
  componentWillMount() {
    try {
      if (this.props.AllDashboardReducer.DashboardProduct == null) {
        this.props.GetDashboardProduct()
      }
    } catch (e) {
      alert(e.massage)
    }
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="spinner-grow text-primary animated fadeIn pt-1 d-flex justify-content-center"></div>

  render() {
    let { barang, stok_br, stok_br_normal, stok_br_ob } = this.props.AllDashboardReducer
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="12">
            <Widget02 header={barang} mainText="Type Product" icon="fa fa-bookmark-o" color="primary" />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <Widget04 icon="fa fa-dropbox" color="info" header={stok_br} value="25" invert>Stock All Product</Widget04>
          </Col>
        </Row>
        <CardGroup className="mb-4">
          <Widget04 icon="icon-basket-loaded" color="warning" header={stok_br_normal} value="25">Stock Normal Product</Widget04>
          <Widget04 icon="fa fa-shopping-bag" color="success" header={stok_br_ob} value="25">Stock OB Product</Widget04>
        </CardGroup>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  AllDashboardReducer: state.AllDashboardReducer.DashboardProduct
})

const mapDispatchToProps = { GetDashboardProduct }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default connectRedux;
