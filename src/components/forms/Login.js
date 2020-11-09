import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios'
import '../../stylesheets/UserForm.css'
import {
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";
import {gql} from 'apollo-boost'
import { Mutation } from 'react-apollo'
import AppHeaderLogin from '../small_components/AppHeaderLogin';
const USER_LOGIN = gql`
        mutation tokenAuth($username: String!, $password:String!){
            tokenAuth(
                username:$username
                password:$password
            ){
                token
            }
        }`


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            token:''
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentWillMount=()=>{
        localStorage.removeItem("auth")
    }
    render() {
        if (this.state.token!='') {
            return <Redirect to='/' username={this.state.username} />
        }
        return (
            <Mutation mutation={USER_LOGIN}>
                {(user_login, { data }) => (
                <div>
                    <AppHeaderLogin />
                    <br/>
                    <br/>
                    <div className='register' >
                        <Form {...layout} name="basic" 
                        style={{border:'solid 1px silver', width:'500px'}}
                        onFinish={
                            (e)=>{
                                user_login({variables:{username:this.state.username, password:this.state.password}})
                                .then(response =>{
                                    this.setState({token:response.data.tokenAuth["token"]})
                                    this.props.userLogin(response.data.tokenAuth["token"])
                                    this.props.userName(this.state.username)
                                })
                                .catch(error=>{
                                    message.error("username or password not correct")
                                })
                            }
                        }>
                            <Form.Item {...tailLayout}>
                                <br />
                                <h2>Login</h2>
                            </Form.Item>

                            <Form.Item label="Username" name="username"rules={[{required: true,message: 'Please input your username!',},]}>
                                <Input name='username' value={this.state.username} onChange={this.changeHandler} />
                            </Form.Item>


                            <Form.Item label="Password" name="password"rules={[{required: true,message: 'Please input your password!',},]}>
                                <Input.Password name='password' value={this.state.password} onChange={this.changeHandler} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">Login</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                )}
            </Mutation>
        )
    }

}
export default Login
