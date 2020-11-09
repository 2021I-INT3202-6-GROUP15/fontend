import React from 'react'
import { Form, Input, Button, message } from 'antd';
import {gql} from 'apollo-boost'
import { Mutation } from 'react-apollo'
import '../../stylesheets/UserForm.css'
import {BrowserRouter as Router, Redirect} from "react-router-dom";
import LeftMenu from '../small_components/LeftMenu';
import AppHeaderLogin from '../small_components/AppHeaderLogin';

const USER_CREATE = gql`
        mutation userCreate($username: String!, $email:String!, $password:String!){
            userCreate(
                username:$username
                email:$email
                password:$password
            ){
                ok
            }
        }`

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 24,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class UserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            registered: false
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if (this.state.registered) {
            return (<Redirect to='/login' />)
        }
        return (
            <Mutation mutation={USER_CREATE}>
                {(user_create, { data }) => (
                <div>
                    <AppHeaderLogin/>
                    <br/>
                    <br/>
                    <div className='register' >
                        <Form {...layout} name="basic" 
                        style={{border:'solid 1px silver', width:'500px'}}
                        onFinish={
                            (e)=>{
                                if(this.state.password==this.state.confirmPassword){
                                    user_create({variables:{username:this.state.username, password:this.state.password, email:this.state.email}})
                                    .then(response =>{
                                        if(response.data.userCreate["ok"]){
                                            this.setState({
                                                registered:true
                                            })
                                        }
                                    })
                                }
                                else{
                                    message.error("Confirm password error")
                                }
                            }
                        }>
                            <Form.Item {...tailLayout}>
                                <br />
                                <h2>Register</h2>
                            </Form.Item>

                            <Form.Item label="Username" name="username"rules={[{required: true,message: 'Please input your username!',},]}>
                                <Input name='username' value={this.state.username} onChange={this.changeHandler} />
                            </Form.Item>

                            <Form.Item label="Email" name="email"rules={[{required: true,message: 'Please input your email!',},]}>
                                <Input type='email' name='email' value={this.state.email} onChange={this.changeHandler} />
                            </Form.Item>

                            <Form.Item label="Password" name="password"rules={[{required: true,message: 'Please input your password!',},]}>
                                <Input.Password name='password' value={this.state.password} onChange={this.changeHandler} />
                            </Form.Item>

                            <Form.Item label="Confirm password" name="confirmPassword"rules={[{required: true,message: 'Please confirm your password!',},]}>
                                <Input.Password name="confirmPassword" value={this.state.confirmPassword} onChange={this.changeHandler} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">Sign Up</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                )}
            </Mutation>
        )
    };
};
export default UserForm;
