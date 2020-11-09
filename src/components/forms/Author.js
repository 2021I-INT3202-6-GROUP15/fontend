import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
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
    
function AuthorForm(){
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
                <h3>Create new author</h3>
            </Form.Item>
            <Form.Item
                label="Author"
                name="author"
                rules={[
                {
                    required: true,
                    message: 'Please input authorsname!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
            >
                <Input.TextArea />
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
export default AuthorForm;