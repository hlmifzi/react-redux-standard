import React from 'react';
import Widget04 from '../Widgets/Widget04';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  CardGroup,
  Col,
  Row,
} from 'reactstrap';
import { GetDashboardSelling } from './ZActionDashboard'
import { connect } from 'react-redux'

const StyleHighchart = {
  minWidth: '310px',
  maxWidth: '800px',
  height: '400px',
  margin: '0 auto',
  marginBottom: '20px'
}

class Dashboard extends React.Component {
  componentWillMount() {
    try {
      if (this.props.AllDashboardReducer.DashboardSelling == null) {
        this.props.GetDashboardSelling()
      }
    } catch (e) {
      console.log(e)
      alert(e.massage)
    }
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
    let { penj_yday,
      penj_cday,
      penj_cmonth,
    } = this.props.AllDashboardReducer


    const options = {
      title: {
        text: 'Sales Grafik 2019'
      },

      subtitle: {
        text: 'Displays a graph of sales of goods every month and this year'
      },

      yAxis: {
        title: {
          text: 'Sales Amount'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },

      series: [{
        name: 'Penjualan',
        data: this.props.AllDashboardReducer.penj_emonth
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <CardGroup className="mb-4">
            <Widget04 icon="icon-basket-loaded" color="danger" header={penj_yday} value="100">yesterday's sale</Widget04>
            <Widget04 icon="icon-basket-loaded" color="primary" header={penj_cday} value="100">Sales Today</Widget04>
            <Widget04 icon="icon-basket-loaded" color="success" header={penj_cmonth} value="100">Sales This Month</Widget04>
          </CardGroup>
        </div>
        <Row>
          <Col xs="12" sm="6" lg="12">
            <div style={StyleHighchart}>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  AllDashboardReducer: state.AllDashboardReducer.DashboardSelling
})

const mapDispatchToProps = { GetDashboardSelling }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default connectRedux;

