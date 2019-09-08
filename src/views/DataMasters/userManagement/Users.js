import React, { Component } from 'react';
import { Table, Input, Form, Divider } from 'antd';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux'
import { GetListAll, AddAll, EditAll, SubmitDelete } from '../MasterDataAction'
import Swal from 'sweetalert2'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false
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

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'No',
        dataIndex: 'No',
        width: '5%',
      },
      {
        title: 'Role',
        dataIndex: 'Role',
        width: '15%',
      },

      {
        title: 'Tenant',
        dataIndex: 'Tenant',
        width: '15%',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        width: '30%',
      },
      {
        title: 'Action',
        width: '10%',
        dataIndex: 'operation',
        render: (text, record) =>
          this.props.MasterData.Users.dataSource.length >= 1 ? (
            <span>
              <button className="btn btn-sm btn-outline-warning" id={record.key} onClick={
                () => {
                  this.props.history.push("userManagement/edit/" + record.key)
                  this.props.EditAll()
                }
              }><i className="fa fa-pencil"></i>
              </button>&nbsp;
              <button className="btn btn-sm btn-outline-danger" id={record.key} onClick={
                () => {
                  let data = ({
                    user_id: record.key
                  })

                  Swal.fire({
                    title: 'Are you sure?',
                    text: 'You Will Not Get Back The Data After Deleted',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, keep it'
                  }).then((result) => {
                    if (result.value) {
                      this.props.SubmitDelete(JSON.stringify(data))
                      Swal.fire(
                        'Deleted!',
                        'Success Deleted User.',
                        'success'
                      )
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        'Cancelled',
                        'Canceled Delete User',
                        'error'
                      )
                    }
                  })
                }
              }><i className="fa fa-trash"></i>
              </button>
              <Divider type="vertical" />
            </span>
          ) : null,
      },
    ];
  }

  componentDidMount() {
    try {
      this.props.GetListAll('user')
    } catch (error) {
      alert(error.message)
    }
  }



  render() {
    const {
      dataSource,
      icon,
      modul } = this.props.MasterData.Users;
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
                <i className={icon}></i> {modul}
              </CardHeader>
              <CardBody>
                <Col col="2" sm="4" md="2" xl="2" className="mb-3 mb-xl-0">
                  <Button
                    onClick={
                      () => {
                        this.props.history.push("/dataMaster/userManagement/Add")
                        this.props.AddAll()
                      }
                    } color="success" style={{ marginBottom: 16 }}>
                    <i className="fa fa-plus"></i>&nbsp;&nbsp;Add
                  </Button>
                </Col>
                <Table
                  components={components}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={dataSource}
                  columns={columns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  MasterData: state.MasterDataReducer
})

const mapDispatchToProps = { GetListAll, AddAll, EditAll, SubmitDelete }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(Users)

export default connectRedux;