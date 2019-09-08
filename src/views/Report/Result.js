import React, { Fragment } from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { Table } from 'antd';
import Download from './Download'

const Result = ({ components, dataSource, columns }) => {
  if (dataSource !== null) {
    return (
      <Fragment>
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <div className="row">
                  <div className="col-sm-2 mb-form">
                    <Button onClick={Download} block color="danger" size="sm"> <i className="fa fa-file-pdf-o"></i>&nbsp; Export</Button>
                  </div>
                </div>
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
      </Fragment>
    )
  } else {
    return <div></div>
  }
}

export default Result