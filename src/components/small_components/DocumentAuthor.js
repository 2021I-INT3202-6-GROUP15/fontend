import { Card } from 'antd'
import React from 'react'
import AppHeaderLogin from './AppHeaderLogin'
import Slogan from './Slogan'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
const AUTHOR_BY_ID = gql`
      query author_by_id($uuid:UUID!){
        authorByUuid(uuid:$uuid){
          name
          description
        }
      }`

const DOCUMENTS_OF_AUTHOR = gql`
      query author_get_documents($uuid:UUID!){
        authorGetDocuments(authorUuid:$uuid){
          documentUuid
          title
          description
        }
      }`

class DocumentAuthor extends React.Component {
    constructor(props) {
        super(props)
    }

    author_infor(uuid) {
        return (
            <Query query={AUTHOR_BY_ID} variables={{ uuid: uuid }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ width: "1000px", margin: "20px 70px" }}>
                                <Card title="Author Information" style={{ textAlign: "center" }}>
                                    <Card type="inner" style={{ marginTop: 16, border: "1px solid silver", borderRadius: "10px", textAlign: "left" }} title={data.authorByUuid.name} >
                                        {data.authorByUuid.description}
                                    </Card>
                                </Card>
                            </div>
                        </div>

                    )
                }}
            </Query>
        )
    }
    author_document(uuid){
        return(
        <Query query={DOCUMENTS_OF_AUTHOR} variables={{ authorUuid: uuid }}>
            {({ loading, error, data }) => {
                if (loading) return "Loading"
                if (error) return `Error! ${error.message}`
                return (
                    <div style={{ width: "1000px", margin: "20px 70px" }}>
                        <Card title="Document" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                            {
                                data.authorGetDocuments.map((doc) => {
                                    console.log(doc)
                                    return (
                                        <Link to={`/${doc.documentUuid}`}>
                                            <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title={doc.title} extra={<a href="#">More</a>}>
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
        return (
            <div>
                <AppHeaderLogin username={this.props.username} />
                <Slogan />
                {this.author_infor(this.props.uuid)}
                {this.author_document(this.props.uuid)}
            </div>
        )
    }
}
export default DocumentAuthor