import React from 'react'
import { Form, Input, Button, Checkbox, Select, InputNumber, message, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import SearchTitle from '../small_components/Search';

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
        }
    }
    render() {
        return (
            <div>
                <SearchTitle/>
            </div>
            
        )
    };
};
export default Test;