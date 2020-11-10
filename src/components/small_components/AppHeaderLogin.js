import { Layout, Menu, Button, Dropdown, message } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React, { Profiler } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Link,
} from "react-router-dom";
import '../../stylesheets/AppHeader.css'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { useQuery } from '@apollo/client'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const PROFILE = gql`
      query profile($username:String!){
        userByUsername(username:$username){
          username
          joinDate
        }
      }`

class AppHeaderLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logout: false,
    }
  }

  handleMenuClick = (e) => {
    this.setState({
      logout: true
    })
    localStorage.removeItem("auth")
    console.log(localStorage.getItem("auth"))
  }

  menu = (
    <Menu >
      <Menu.Item key="1" icon={<UserOutlined />} onClick={this.handleProfile}>
        <Link to="/profile">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />} onClick={this.handleMenuClick}>
        Sign out
      </Menu.Item>
    </Menu>
  );

  render() {
    if (localStorage.getItem("auth") != null && this.props.username != "") {
      return (

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className='menu'>
          <Link to='/' className='home'>
            <HomeOutlined style={{ fontSize: "40px", color: "silver", paddingTop: "10px" }} />
          </Link>
          <Link to='/' className='page_title' style={{ color: "silver", fontSize: '40px', fontWeight: "bold", paddingTop: "10px" }}>
            Share Document
          </Link>
          <div style={{paddingTop:"10px"}}>
            <Dropdown.Button  icon={<UserOutlined />} overlay={this.menu}>{this.props.username}</Dropdown.Button>
          </div>
        </Menu>
      )
    }
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className='menu'>
        <Link to='/' className='home'>
          <HomeOutlined style={{ fontSize: "40px", color: "silver", paddingTop: "10px" }} />
        </Link>
        <Link to='/' className='page_title' style={{ color: "silver", fontSize: '40px', fontWeight: "bold", paddingTop: "10px" }}>
          Share Document
        </Link>
        <div style={{ paddingTop: "10px" }}>
          <Link to='/login' >
            <Button>Login</Button>
          </Link>
          <Link to='/register'>
            <Button>Register</Button>
          </Link>
        </div>
      </Menu>

    )
  }
}

export default AppHeaderLogin;