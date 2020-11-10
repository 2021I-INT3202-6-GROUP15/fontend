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

const SUBJECT_BY_ID = gql`
      query subject_by_id($uuid:UUID!){
        labelByUuid(uuid:$uuid){
          name
          description
        }
      }`

const DOCUMENTS_OF_SUBJECT = gql`
      query subject_get_documents($labelUuid:UUID!){
        labelGetDocuments(labelUuid:$labelUuid){
          documentUuid
          title
          description
        }
      }`

class DocumentSubject extends React.Component {
    constructor(props) {
        super(props)
    }

    subject_infor(uuid) {
        return (
            <Query query={SUBJECT_BY_ID} variables={{ uuid: uuid }}>
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
                                <Card title={data.labelByUuid.name} style={{ textAlign: "center", border: "1px solid silver" }}></Card>
                            </div>
                        </div>

                    )
                }}
            </Query>
        )
    }
    subject_document(uuid) {
        return (
            <Query query={DOCUMENTS_OF_SUBJECT} variables={{labelUuid: uuid }}>
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
                                <Card title="Document" style={{ border: "2px solid silver", borderRadius: "10px" }}>
                                    {
                                        data.labelGetDocuments.map((doc) => {
                                            console.log(doc)
                                            return (
                                                <Link to={`/${doc.documentUuid}`}>
                                                    <Card style={{ marginTop: 16, border: "1px solid silver" }} 
                                                    type="inner" 
                                                    hoverable={true} 
                                                    title={doc.title}
                                                    onClick={(e)=>{this.props.pass(doc.documentUuid)}}
                                                    extra={<a href="#">More</a>}>
                                                        {doc.description}
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
        console.log(this.props.uuid)
        return (
            <div>
                <AppHeaderLogin username={this.props.username} />
                <Slogan />
                {this.subject_infor(this.props.uuid)}
                {this.subject_document(this.props.uuid)}
            </div>
        )
    }
}
export default DocumentSubject