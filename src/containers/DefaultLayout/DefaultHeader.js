import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import cookie from 'react-cookies'

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
import logo from '../../assets/img/brand/logo2.png'
// import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state={
    jam:null
  }
  componentDidMount() {
    const d = new Date(); 
    const currenttime = d.toLocaleString()
    const montharray  = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const serverdate  = new Date(currenttime)

    function padlength(what){
      var output=(what.toString().length===1)? "0"+what : what
      return output
    }
    const displaytime = () => {
      serverdate.setSeconds(serverdate.getSeconds()+1)
      var datestring=padlength(serverdate.getDate())+" "+montharray[serverdate.getMonth()]+" "+serverdate.getFullYear()+" - "
      var timestring=padlength(serverdate.getHours())+":"+padlength(serverdate.getMinutes())+":"+padlength(serverdate.getSeconds())
      this.setState({jam:datestring+" "+timestring+" WIB"})
    }
    setInterval(displaytime, 1000)
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 200, height: 60, alt: 'Logo SIPP' }}
          minimized={{ src: logo, width: 100, height: 30, alt: 'Logo SIPP' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">{this.state.jam}</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
            <DropdownItem header tag="div" className="text-center"><strong>Role</strong></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> {cookie.load('role')}</DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem onClick={this.props.onLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
