import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, FormGroup, Label, CardFooter, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { ProductSubmitAdd, ProductSubmitEdit, ProductSubmitDelete } from './TransactionAction'

import Toast from '../../MyComponent/notification/Toast'
import ROOT_API from '../../MyServices/api/URLApi'


class ManageAllProduct extends Component {
  state={
    artikel:'',
    product_name:'',
    size:'',
    warna:'',
    normal_price:'',
    ob_price:''
  }

  handleSave = async (e) => {
    let data = {
      artikel: this.state.artikel,
      nama_barang: this.state.product_name,
      size: this.state.size,
      warna: this.state.warna,
      harga_normal: this.state.normal_price,
      harga_ob: this.state.ob_price
    }

    const tipe = this.props.TransactionReducer.ManageAllProduct.Action === "ADD" ? "ADD" : "UPDATE"
    try {
      let insertAction = "";
      if (tipe === "ADD") {
        insertAction = await this.props.ProductSubmitAdd(JSON.stringify(data))
      } else {
        data = {
          ...data,
          barang_id: this.props.match.params.id
        }
        insertAction = await this.props.ProductSubmitEdit(JSON.stringify(data))
      }

      if (insertAction.status >= 200) {
        Toast.success(`Success ${tipe} Data`)
        this.props.history.push('/productManagement/ManageProduct')
      } else {
        Toast.failed(`Failed ${tipe} data`)
      }
    } catch (e) {
      alert(e.message)
    }
  };

  async componentWillMount() {
    try {
      
    } catch (e) {
      alert(e.massage)
    } 

    this.setState({tipe:this.props.match.params.tipe})
  }

  async componentDidMount() {
    try {

      if (this.props.TransactionReducer.ManageAllProduct.Action !== "ADD" ) {
        let param = this.props.match.params.id
        let dataEdit = await ROOT_API.get(`barang/${param}`)

        this.setState({
          artikel: dataEdit.data.data.artikel,
          product_name: dataEdit.data.data.product_name,
          size: dataEdit.data.data.size,
          warna: dataEdit.data.data.warna,
          normal_price: dataEdit.data.data.normal_price,
          ob_price: dataEdit.data.data.ob_price
        })
      }

    } catch (error) {
      alert(error.massage)
    }
  }


  render() {
    let {tipe} = this.state
    let AddorEdit = tipe === 1 ? 'Add' : 'Edit'

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className={this.props.TransactionReducer.ManageAllProduct.icon}></i> {AddorEdit} Product
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="name">Artikel</Label>
                      <Input type="text" onChange={(e)=>this.setState({artikel:e.target.value})} value={this.state.artikel} id="name" placeholder="Input Your Artikel" required />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="name">Product Name</Label>
                      <Input type="text" onChange={(e)=>this.setState({product_name:e.target.value})} value={this.state.product_name} id="name" placeholder="Input Product Name" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="name">Size</Label>
                      <Input type="text" onChange={(e)=>this.setState({size:e.target.value})} value={this.state.size} placeholder="XS,S,M,L,XL,XXL" id="name"required />
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="name">Color</Label>
                      <Input type="text" onChange={(e)=>this.setState({warna:e.target.value})} value={this.state.warna} placeholder="Putih" id="name" required />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="name">Normal Price</Label>
                        <Input type="number" onChange={(e)=>this.setState({normal_price:e.target.value})} value={this.state.normal_price} id="name" required />
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="name">OB Price</Label>
                        <Input type="number" onChange={(e)=>this.setState({ob_price:e.target.value})} value={this.state.ob_price} id="name" required />
                      </FormGroup>
                    </Col>
                  </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="secondary" onClick={()=>(this.props.history.goBack())}><i className="fa fa-dot-circle-onav-icon icon-action-undo" ></i> Back</Button> &nbsp;
                <Button type="submit" size="sm" color="success" onClick={this.handleSave}><i className="fa fa-dot-circle-o" ></i> Submit</Button> &nbsp;
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  TransactionReducer: state.TransactionReducer
})
const mapDispatchToProps = {
  ProductSubmitAdd,
  ProductSubmitEdit,
  ProductSubmitDelete
}
const connectRedux = connect(mapStateToProps, mapDispatchToProps)(ManageAllProduct)

export default connectRedux;