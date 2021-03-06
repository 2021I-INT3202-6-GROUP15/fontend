import { Card, Button } from 'antd'
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
        }
      }`

const DOCUMENTS_OF_AUTHOR = gql`
      query author_get_documents($authorUuid:UUID!){
        authorGetDocuments(authorUuid:$authorUuid){
          documentUuid
          title
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
                    if (loading) return (
                        <div style={{ width: "1000px", margin: "20px 70px", display:"flex", justifyContent:"center" }}>
                            <Button type="primary" loading style={{width:"120px", height:"50px"}}>
                                Loading
                            </Button>
                        </div>
                    )
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ width: "1000px", margin: "20px 70px" }}>
                                <Card title={data.authorByUuid.name} style={{ textAlign: "center", border:"2px solid silver" }}></Card>
                            </div>
                        </div>

                    )
                }}
            </Query>
        )
    }
    author_document(uuid) {
        return (
            <Query query={DOCUMENTS_OF_AUTHOR} variables={{ authorUuid: uuid }}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div style={{ width: "1000px", margin: "20px 70px", display:"flex", justifyContent:"center" }}>
                            <Button type="primary" loading style={{width:"120px", height:"50px"}}>
                                Loading
                            </Button>
                        </div>
                    )
                    if (error) return `Error! ${error.message}`
                    return (
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <div style={{ width: "1000px", margin: "20px 70px" }}>
                                <Card title="Document" style={{ border: "2px solid silver", borderRadius: "10px", textAlign:"center" }}>
                                    {
                                        data.authorGetDocuments.map((doc) => {
                                            console.log(doc)
                                            return (
                                                <Link to={`/${doc.documentUuid}`}>
                                                    <Card style={{ marginTop: 16, border: "1px solid silver", textAlign:"left" }} 
                                                    hoverable={true} type="inner" 
                                                    title={doc.title} 
                                                    onClick={(e)=>{this.props.pass(doc.documentUuid)}}
                                                    extra={<a href="#">More</a>}>
                                                        {/* {doc.description} */}
                                                    </Card>
                                                </Link>)
                                        }
                                        )
                                    }
                                </Card>
                            </div>
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
                {/* {this.author_document(this.props.uuid)} */}
            </div>
        )
    }
}
export default DocumentAuthor