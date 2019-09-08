import React, { Component } from 'react';
import { Table, Input, Form, Divider , Icon} from 'antd';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux'
import Highlighter from 'react-highlight-words';

import { GetListAllTenants, AddAllTenants, EditAllTenants, SubmitDeleteTenants } from '../MasterDataAction'
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
    editing: false,
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

class Tenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    }
    
    this.columns = [
      {
        title: 'No',
        dataIndex: 'No',
        width: '5%',
      },
      {
        title: 'Tenant Code',
        dataIndex: 'TenantCode',
        width: '30%',
         ...this.getColumnSearchProps('TenantCode'),
      },

      {
        title: 'Tenant Name',
        dataIndex: 'TenantName',
        width: '50%',
         ...this.getColumnSearchProps('TenantName'),
      },
      {
        title: 'Action',
        width: '10%',
        dataIndex: 'operation',
        render: (text, record) =>
          this.props.MasterData.Tenants.dataSource.length >= 1 ? (
            <span>
              <button className="btn btn-sm btn-outline-warning" id={record.key} onClick={
                () => {
                  this.props.history.push("tenantManagement/edit/" + record.key)
                  this.props.EditAllTenants()
                }
              }><i className="fa fa-pencil"></i>
              </button>&nbsp;
              <button className="btn btn-sm btn-outline-danger" id={record.key} onClick={
                () => {
                  let data = ({
                    place_id: record.key
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
                      this.props.SubmitDeleteTenants(JSON.stringify(data))
                      Swal.fire(
                        'Deleted!',
                        'Success Deleted Data.',
                        'success'
                      )
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        'Cancelled',
                        'Canceled Delete Data',
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          color="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#f80' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#20a8e4', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={"" + text}
      />
    ),
  });

  componentDidMount() {
    try {
        this.props.GetListAllTenants()
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    const {
      dataSource,
      icon,
      modul } = this.props.MasterData.Tenants;
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
                        this.props.history.push("/dataMaster/tenantManagement/Add")
                        this.props.AddAllTenants()
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

const mapDispatchToProps = { GetListAllTenants, AddAllTenants, EditAllTenants, SubmitDeleteTenants }
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(Tenants)

export default connectRedux;