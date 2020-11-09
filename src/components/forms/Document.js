import React from 'react'
import { Form, Input, Button, Radio, Select, InputNumber, message } from 'antd';
import '../../stylesheets/UserForm.css'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import TextArea from 'antd/lib/input/TextArea';


const RadioGroup = Radio.Group;
const { Option } = Select;

const DOCUMENT_UPLOAD = gql`
        mutation documentUpload($title: String!, $authorsName:String!, $category:String!, $description:String!, $language:String!, $releaseYear:Int!, $publishers:String!, $labels:String!, $file:Upload!){
            documentUpload(
                title:$title
                authorsName:$authorsName
                category:$category
                description:$description
                language:$language
                releaseYear:$releaseYear
                labels:$labels
                publishers:$publishers
                file:$file

            ){
                ok
            }
        }
        `

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

class DocumentForm extends React.Component {
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
            labels:'',
            publishers:'',
            file:null

        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    selectHandler = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({ language: e.target.value })
        console.log(this.state.language)
    }
    resetHandler = (e) => {
        this.setState({
            authorsName: '',
            category: '',
            description: '',
            language: '',
            releaseYear: 2020,
            title: '',
            verify: '',
        })
    }

    onFileChange = (e)=>{
        this.setState({file:e.target.files[0]})
    }

    render() {
        return (
            <Mutation mutation={DOCUMENT_UPLOAD}>
                {(document_upload, { data }) => (
                    <div>
                        <br />
                        <br />
                        <div className='register' >
                            <Form {...layout} name="basic"
                                onReset={this.resetHandler}
                                style={{ border: 'solid 1px silver', width: '1000px' }}
                                onFinish={
                                    (e) => {
                                        console.log(this.state.file.name)
                                        document_upload({ variables: { title: this.state.title, authorsName: this.state.authorsName, description: this.state.description,publishers:this.state.publishers, language: this.state.language, releaseYear: this.state.releaseYear, category: this.state.category,  labels:this.state.labels, file:this.state.file } })
                                            .then(response => {
                                                if (response.data.documentUpload['ok']) {
                                                    message.success("sucessfully create")
                                                }
                                                else {
                                                    message.error("invalid date")
                                                }
                                            })
                                            .catch(
                                                error => {
                                                    console.log(error)
                                                    message.error("Login to upload document")
                                                }
                                            )
                                    }
                                }>
                                <Form.Item {...tailLayout}>
                                    <br />
                                    <h2>Upload New Document</h2>
                                </Form.Item>

                                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input document title!', },]} >
                                    <Input name='title' value={this.state.title} onChange={this.changeHandler} onResetCapture={this.resetHandler} />
                                </Form.Item>

                                <Form.Item label="Authors" name="authorsName" rules={[{ required: true, message: 'Please input authors name!', },]}>
                                    <Input.TextArea name='authorsName' value={this.state.authorsName} onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Subject" name="labels" >
                                    <Input name='labels' value={this.state.labels} onChange={this.changeHandler} />
                                </Form.Item>
                                <Form.Item label="Publisher" name="publisher">
                                    <Input name='publisher' value={this.state.publisher} onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Description" name="description">
                                    <TextArea name='description' value={this.state.description} onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Released Year" name="releaseYear" rules={[{ type: 'number', max: 2020, message: "Please input a valid number" }]} value={this.state.releaseYear}>
                                    <InputNumber />
                                </Form.Item>


                                <Form.Item label="Category" name="category" rules={[{ required: true, },]}>
                                    <RadioGroup name ="category" onChange={this.changeHandler} value={this.state.category}>
                                        <Radio value="book">Book</Radio>
                                        <Radio value="article">Article</Radio>
                                        <Radio value="slide">Slide</Radio>
                                        <Radio value="test">Test</Radio>
                                    </RadioGroup>
                                </Form.Item>

                                <Form.Item label="File" name="file" rules={[{ required: true, message: 'Please choose a file!', },]}>
                                    <Input type="file" name="file" onChange={this.onFileChange}/>
                                </Form.Item>

                                <Form.Item label="Language" name="language" rules={[{ required: true, },]}>
                                    <RadioGroup name ="language" onChange={this.selectHandler} value={this.state.language}>
                                        <Radio value="vietnamese">Vietnamese</Radio>
                                        <Radio value="english">English</Radio>
                                        <Radio value="other">Other</Radio>
                                    </RadioGroup>
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                    <Button type="primary" htmlType="reset" onClick={this.resetHandler}>Reset</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                )}
            </Mutation>
        )
    };
};
export default DocumentForm;