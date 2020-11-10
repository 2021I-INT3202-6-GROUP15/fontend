import React from 'react'
import { Menu, Card, Form, Input } from 'antd';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

import {
    AppstoreOutlined, SearchOutlined
} from '@ant-design/icons';

class SearchTitle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
        }
    }
    changeHandler = (e) => {
        this.setState({ title: e.target.value })
        this.props.selectTitle(this.state.title)
        
    }
    render() {
        
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Form>
                    <Form.Item name="title" >
                        <Input name='title' placeholder="Search by title" style={{ width: "600px", borderRadius: "20px", border: "solid 1px silver" }} onChange={this.changeHandler} suffix={<SearchOutlined onClick={(e) => { this.setState({ choice: 1 }) }} />}/>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default SearchTitle
