import React from 'react'
import { Form, Input, Button, Checkbox, Select, InputNumber, message, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 4,
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

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authorsName: '',
            category: '',
            description: '',
            language: '',
            releaseYear: 2020,
            title: '',
            verify: '',
            value:1
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    selectHandler = (e) => {
        this.setState({ language: e.target.value })
    }
    resetHandler = (e) => {
        this.setState({
            authorsName: '',
            category: '',
            description: '',
            language: '',
            releaseYear: 2020,
            title: '',
            verify: ''
        })
    }
    componentDidMount = ()=>{
        console.log("to test page")
    }
    render() {
        return (
            <Rate value={this.state.value} disabled/>
        )
    };
};
export default Test;