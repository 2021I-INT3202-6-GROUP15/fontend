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
const PUBLISHER_BY_ID = gql`
      query publisher_by_id($publisherUuid:UUID!){
        publisherByUuid(publisherUuid:$publisherUuid){
          name
          description
        }
      }`

const DOCUMENTS_OF_PUBLISHER = gql`
      query author_get_documents($publisherUuid:UUID!){
        publisherGetDocuments(publisherUuid:$publisherUuid){
          documentUuid
          title
          description
        }
      }`

class DocumentPublisher extends React.Component {
    constructor(props) {
        super(props)
    }

    publisher_infor(uuid) {
        return (
            <Query query={PUBLISHER_BY_ID} variables={{ publisherUuid: uuid }}>
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
                                <Card title={data.publisherByUuid.name} style={{ textAlign: "center", border:"2px solid silver" }}></Card>
                            </div>
                        </div>

                    )
                }}
            </Query>
        )
    }
    publisher_document(uuid) {
        return (
            <Query query={DOCUMENTS_OF_PUBLISHER} variables={{ publisherUuid: uuid }}>
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
                                        data.publisherGetDocuments.map((doc) => {
                                            console.log(doc)
                                            return (
                                                <Link to={`/${doc.documentUuid}`}>
                                                    <Card style={{ marginTop: 16, border: "1px solid silver" }} 
                                                    hoverable={true} type="inner" 
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
        return (
            <div>
                <AppHeaderLogin username={this.props.username} />
                <Slogan />
                {this.publisher_infor(this.props.uuid)}
                {this.publisher_document(this.props.uuid)}
            </div>
        )
    }
}
export default DocumentPublisher