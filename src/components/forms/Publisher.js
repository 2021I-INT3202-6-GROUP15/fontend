import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import '../../stylesheets/Form.css'

const layout = {
    labelCol: {
        span: 4,
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
    
function PublisherForm(){
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div className='container' style={{width:'600px'}}>
            <Form 
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item {...tailLayout}>
                <br/>
                <h3>Create new publisher</h3>
            </Form.Item>
            <Form.Item
                label="Publisher"
                name="publisher"
                rules={[
                {
                    required: true,
                    message: 'Please input publisher!',
                },
                ]}
            >
                <Input />
            </Form.Item>
        
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
        </div>
    );
};
export default PublisherForm;