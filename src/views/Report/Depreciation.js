import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Input, Form, DatePicker } from 'antd';
import { connect } from 'react-redux'

import Result from './Result'


import { GetReporPenyusutan, EmptyDataSourceAction } from './ZActionReport'
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}


class Depreciation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeDate:[]
    }
    this.columns = [
      {
        title: 'No',
        dataIndex: 'No',
        width: '7%',
        editable: true,
      },
      {
        title: 'Product Code',
        dataIndex: 'artikel',
        width: '30%',
        editable: true,
      },
      {
        title: 'Product Name',
        dataIndex: 'nama_barang',
        width: '30%',
        editable: true,
      },
      {
        title: 'Barang Type',
        dataIndex: 'type',
        width: '30%',
        editable: true,
      },
      {
        title: 'Place From',
        dataIndex: 'place_from',
        editable: true,
      },
      {
        title: 'Jumlah',
        dataIndex: 'jumlah',
        editable: true,
      }
    ];
  }

  handleSave = async (date,dateString) => {
    let params = new URLSearchParams()
    params.append("date_from", dateString[0])
    params.append("date_to", dateString[1])
    let request = {
      params: params
    };

    try {
      await this.props.GetReporPenyusutan(request,'laporan/penyusutan')
    } catch (error) {
      alert(error.message)
    }
  };

  
  componentWillUnmount(){
    this.props.EmptyDataSourceAction()
  }


  render() {
    let { dataSource } = this.props.reportGeneral;
    dataSource = dataSource.length > 0 ? dataSource : null
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="nav-icon icon-arrow-down"></i> Report Depreciation
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-sm-12 mb-form">
                    Pilih Tanggal :
                  </div>
                  <div className="col-sm-4 mb-form">
                    <RangePicker
                      onChange={this.handleSave}
                      format={dateFormat}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Result components={components} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reportGeneral: state.ZReportReducer.reportGeneral
})
const mapDispatchToProps = { GetReporPenyusutan, EmptyDataSourceAction }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(Depreciation)

export default connectRedux 