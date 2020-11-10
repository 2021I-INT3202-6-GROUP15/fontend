import { Menu, Card, Form, Input, Button } from 'antd';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

import {
    AppstoreOutlined, SearchOutlined
} from '@ant-design/icons';
import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Slogan from './Slogan';


const { SubMenu } = Menu;

const DOCUMENT_FILTER_BY_LANGUAGE = gql`
query document_filter_by_language($language: String!) {
    filterDocumentByLanguage(language: $language) {
      hasNext
      documents {
        documentUuid
        title
        description
        coverUrl
      }
    }
  }`

const DOCUMENT_FILTER_BY_CATEGORY = gql`
query document_filter_by_category($category: String!) {
    documentFilter(category: $category) {
      hasNext
      documents {
        documentUuid
        title
        description
        coverUrl
      }
    }
  }`

const DOCUMENT_FILTER_BY_TITLE = gql`
query document_filter_by_title($title:String!){
    searchByDocumentTitle(title:$title){
        hasNext
        documents {
          documentUuid
          title
          description
          coverUrl
        }
      }
  }`


class LeftMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            language: "",
            category: "",
            choice: 0,
            posts: [],
            title: "",
            linkPass: ""
        };
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler = (e) => {
        this.setState({ title: e.target.value, choice: 1 })
    }

    search = (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form>
                <Form.Item name="title" >
                    <Input name='title' allowClear placeholder="Search by title" style={{ width: "600px", borderRadius: "20px", border: "solid 1px silver", height: "35px" }} onChange={this.changeHandler} suffix={<SearchOutlined onClick={(e) => { this.setState({ choice: 1 }) }} />} />
                </Form.Item>
            </Form>
        </div>
    )

    menu = (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            theme="dark"
            style={{ height: "3500px", flex: "3", border:"1px solid aqua"}}
        >
            <Menu.Item icon={<AppstoreOutlined />}>
                <Link to='/Authors'>Authors</Link>
            </Menu.Item>
            <Menu.Item icon={<AppstoreOutlined />}>
                <Link to='/Publisher'>Publisher</Link>
            </Menu.Item>
            <Menu.Item icon={<AppstoreOutlined />}>
                <Link to='/Subject'>Subject</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Category">
                <Menu.Item onClick={(e) => { this.setState({ category: "book", choice: 0 }) }}>Book</Menu.Item>
                <Menu.Item onClick={(e) => { this.setState({ category: "article", choice: 0 }) }}>Article</Menu.Item>
                <Menu.Item onClick={(e) => { this.setState({ category: "slide", choice: 0 }) }}>Slide</Menu.Item>
                <Menu.Item onClick={(e) => { this.setState({ category: "test", choice: 0 }) }}>Test</Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Languages">
                <Menu.Item onClick={(e) => { this.setState({ language: "vietnamese", choice: 2 }) }}>Vietnamese</Menu.Item>
                <Menu.Item onClick={(e) => { this.setState({ language: "english", choice: 2 }) }}>English</Menu.Item>
                <Menu.Item onClick={(e) => { this.setState({ language: "other", choice: 2 }) }}>Other</Menu.Item>
            </SubMenu>

        </Menu>
    )

    lang(lang) {
        console.log("lang")
        return (
            <Query query={DOCUMENT_FILTER_BY_LANGUAGE} variables={{ language: lang }}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div style={{ width: "80%%", margin: "20px 70px", display: "flex", justifyContent: "center" }}>
                            <Button type="primary" loading style={{ width: "120px", height: "50px" }}>
                                Loading
                            </Button>
                        </div>
                    )
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ width: "80%%", margin: "20px 70px" }}>
                            <Card title="Document" style={{ border: "2px solid silver", borderRadius: "10px", textAlign: "center" }}>
                                {
                                    data.filterDocumentByLanguage.documents.map((doc) => {
                                        return (
                                            <Link to={`/${doc.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver", textAlign: "left" }}
                                                    type="inner" title={doc.title}
                                                    hoverable={true} extra={<a href="#">More</a>}
                                                    onClick={(e) => { this.props.pass(doc.documentUuid) }}
                                                    // cover={<img alt="example" src={doc.coverUrl} />}
                                                    >
                                                    {doc.description}
                                                </Card>
                                            </Link>)
                                    }
                                    )
                                }
                            </Card>
                        </div>
                    )
                }}
            </Query>
        )
    }

    title(title) {
        console.log("title")
        return (
            <Query query={DOCUMENT_FILTER_BY_TITLE} variables={{ title: title }}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div style={{ width: "80%%", margin: "20px 70px", display: "flex", justifyContent: "center" }}>
                            <Button type="primary" loading style={{ width: "120px", height: "50px" }}>
                                Loading
                            </Button>
                        </div>
                    )
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ width: "80%%", margin: "20px 70px" }}>
                            <Card title="Document" style={{ border: "2px solid silver", borderRadius: "10px", textAlign: "center" }}>
                                {
                                    data.searchByDocumentTitle.documents.map((doc) => {
                                        return (
                                            <Link to={`/${doc.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver", textAlign: "left" }}
                                                    hoverable={true} type="inner"
                                                    title={doc.title}
                                                    onClick={(e) => { this.props.pass(doc.documentUuid) }}
                                                    extra={<a href="#">More</a>}
                                                    // cover={<img alt="example" src={doc.coverUrl} />}
                                                    >
                                                    {doc.description}
                                                </Card>
                                            </Link>)
                                    }
                                    )
                                }
                            </Card>
                        </div>
                    )
                }}
            </Query>
        )
    }


    cate(cate) {
        console.log("category")
        return (
            <Query query={DOCUMENT_FILTER_BY_CATEGORY} variables={{ category: cate }}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div style={{ width: "80%%", margin: "20px 70px", display: "flex", justifyContent: "center" }}>
                            <Button type="primary" loading style={{ width: "120px", height: "50px" }}>
                                Loading
                            </Button>
                        </div>
                    )
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ width: "80%", margin: "20px 70px" }}>
                            <Card title="Document" style={{ border: "2px solid silver", borderRadius: "10px", textAlign: "center" }}>
                                {
                                    data.documentFilter.documents.map((doc) => {
                                        return (
                                            <Link to={`/${doc.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver", textAlign: "left" }}
                                                    hoverable={true} type="inner"
                                                    title={doc.title}
                                                    onClick={(e) => { this.props.pass(doc.documentUuid) }}
                                                    extra={<a href="#">More</a>}
                                                    // cover={<img alt="example" src={doc.coverUrl} />}
                                                    >
                                                    {doc.description}
                                                </Card>
                                            </Link>)
                                    }
                                    )
                                }
                            </Card>
                        </div>
                    )
                }}
            </Query>
        )
    }

    render() {
        let body = (<div></div>)
        if (this.state.choice == 0) {
            body = this.cate(this.state.category)

        }
        else if (this.state.choice == 2) {
            body = this.lang(this.state.language)
        }
        else {
            body = this.title(this.state.title)
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between',height:"100%", flex: "18", border:"1px solid blue" }}>
                {this.menu}
                <div style={{ flex: "15", display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid silver", height:"100%" }}>
                    <Slogan />
                    {this.search}
                    <div style={{ width: "100%" }}>
                        {body}
                    </div>
                </div>

            </div>
        );
    }
}
export default LeftMenu;