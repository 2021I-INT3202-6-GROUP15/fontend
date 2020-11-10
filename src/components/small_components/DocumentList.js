import React from 'react'
import { List, Avatar, Rate, Card } from 'antd';
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch
} from "react-router-dom";
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'


const DOCUMENT_FILTER_BY_LANGUAGE = gql`
      query document_filter_by_language($language:String!){
        documentFilter(language:$language){
          documentUuid
          title
          description
        }
      }`

const DOCUMENT_FILTER_BY_CATEGORY = gql`
      query document_filter_by_category($category:String!){
        documentFilter(category:$category){
          documentUuid
          title
          description
        }
      }`

const DOCUMENT_FILTER_BY_TITLE = gql`
      query document_filter_by_title($title:String!){
        documentFilter(title:$title){
          documentUuid
          title
          description
        }
      }`

class DocumentList extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            posts:[]
        }
    }
    
    lang(lang) {
        return (
            <Query query={DOCUMENT_FILTER_BY_LANGUAGE} variables={{ language: lang }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ width: "1000px", margin: "20px 70px" }}>
                            <Card title="Document" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                {
                                    data.documentFilter.map((doc) => {
                                        console.log(doc)
                                        return (
                                            <Link to={`/${doc.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title={doc.title} extra={<a href="#">More</a>}>
                                                    this is a good book
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
        return (
            <Query query={DOCUMENT_FILTER_BY_TITLE} variables={{ title: title }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ width: "1000px", margin: "20px 70px" }}>
                            <Card title="Document" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                {
                                    data.documentFilter.map((doc) => {
                                        console.log(doc)
                                        return (
                                            <Link to={`/${doc.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title={doc.title} extra={<a href="#">More</a>}>
                                                    this is a good book
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
        return (
            <Query query={DOCUMENT_FILTER_BY_CATEGORY} variables={{ category: cate }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ width: "1000px", margin: "20px 70px" }}>
                            <Card title="Document" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                {
                                    data.documentFilter.map((doc) => {
                                        console.log(doc)
                                        return (
                                            <Link to={`/${doc.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title={doc.title} extra={<a href="#">More</a>}>
                                                    this is a good book
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
        console.log(this.props.title)
        if(this.props.by=="title"){
            return(
                <div>
                    {this.title(this.props.title)}
                </div>
            )
        }
        if(this.props.by=="language"){
            return(
                <div>
                    {this.lang(this.props.language)}
                </div>
            )
        }
        return(
            <div>
                {this.cate(this.props.category)}
            </div>
        )
    }
}
export default DocumentList