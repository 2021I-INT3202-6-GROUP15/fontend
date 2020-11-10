import React, { Fragment } from 'react'
import { Button, List} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Slogan from './Slogan';
import AppHeaderLogin from './AppHeaderLogin';

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import BookmarkButton from './BookmarkButton';
import BookmarkComponent from './BookmarkComponent';

const DOCUMENT_INFORMATION = gql`
      query SINGLE_DOC($uuid: UUID!){
        documentByUuid(uuid:$uuid){
            title
            description
            releaseYear
            language
            category
            lastUpdate
            uploadBy
            pathToFile
        }
      }`

const DOCUMENT_AUTHOR = gql`
        query DOC_AUTHOR($documentUuid: UUID!){
        documentGetAuthors(documentUuid:$documentUuid){
            id
            name
        }
        }`
const DOCUMENT_PUBLISHER = gql`
        query DOC_PUBLISHER($documentUuid: UUID!){
        documentGetPublishers(documentUuid:$documentUuid){
            id
            name
        }
        }`

class ADocument extends React.Component {
    constructor(props) {
        super(props)
    }
    get_author(documentUuid) {
        return (
            <Query query={DOCUMENT_AUTHOR} variables={{ documentUuid: documentUuid }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    console.log(data)

                    return (
                        <div style={{ display: "inline" }}>
                            {
                                data.documentGetAuthors.map((doc) => {
                                    console.log(doc)
                                    return (
                                        <Link to={`/${doc.id}`}>
                                            {doc.name};
                                        </Link>)
                                })
                            }
                        </div>

                    )
                }}

            </Query>
        )
    }

    get_publisher(documentUuid) {
        return (
            <Query query={DOCUMENT_PUBLISHER} variables={{ documentUuid: documentUuid }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    console.log(data)
                    return (
                        <Fragment>
                            {
                                data.documentGetPublishers.map((doc) => {
                                    console.log(doc)
                                    return (
                                        <Link to={`/${doc.id}`}>
                                            {doc.name},
                                        </Link>)
                                })
                            }
                        </Fragment>
                    )
                }}

            </Query>
        )
    }

    get_doc(uuid) {
        return (
            <Query query={DOCUMENT_INFORMATION} variables={{ uuid: uuid }}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div style={{ width: "1000px", margin: "20px 70px", display: "flex", justifyContent: "center" }}>
                            <Button type="primary" loading style={{ width: "150px", height: "70px" }}>
                                Loading
                            </Button>
                        </div>
                    )
                    if (error) return `Error! ${error.message}`
                    console.log(data.documentByUuid.pathToFile)
                    return (
                        <div>
                            <List style={{ fontSize: "30px", textAlign: "center" }}>
                                <List.Item style={{ paddingLeft: '20px', display:"flex", justifyContent:"center" }}>
                                    <div style={{textAlign:"center"}}>{data.documentByUuid.title}</div>
                                    {/* <Button style={{ marginRight: '20px' }} type="primary" icon={<DownloadOutlined />}>Down Load</Button> */}
                                </List.Item>
                            </List>


                            <iframe name={data.documentByUuid.title} style={{ width: "100%", height: "1500px" }} src={data.documentByUuid.pathToFile}></iframe>
                            <List>
                                <List.Item style={{ paddingLeft: '20px', textAlign:"center" }}>
                                    Document Information
                                </List.Item>
                                <List.Item style={{ paddingLeft: '20px' }}>
                                    <div>Author:{this.get_author(uuid)}</div>
                                    {/* <Rate allowHalf defaultValue={3} style={{ marginRight: '20px' }}></Rate> */}
                                    <BookmarkComponent uuid={this.props.uuid}/>
                                </List.Item>

                                <List.Item style={{ paddingLeft: '20px' }}>
                                    <div>Publisher:{this.get_publisher(uuid)}</div>
                                </List.Item>


                                <List.Item style={{ paddingLeft: '20px' }}>
                                    <div>Release Year: {data.documentByUuid.releaseYear}</div>
                                    {/* <Button style={{ marginRight: '20px' }} type="primary" icon={<DownloadOutlined />}>Down Load</Button> */}
                                </List.Item>
                                <List.Item style={{ paddingLeft: '20px' }}>Language: {data.documentByUuid.language}</List.Item>
                                <List.Item style={{ paddingLeft: '20px' }}>Category: {data.documentByUuid.category}</List.Item>
                                <List.Item style={{ paddingLeft: '20px' }}>Last Updated: {data.documentByUuid.lastUpdate}</List.Item>
                                <List.Item style={{ paddingLeft: '20px' }}>Description: {data.documentByUuid.description}</List.Item>

                            </List>
                        </div>

                    )
                }}

            </Query>)
    }

    render() {
        console.log(this.props.uuid)
        return (
            <div>
                <AppHeaderLogin username={this.props.username} />
                <Slogan />
                <div style={{ margin: "100px", borderRadius: "10px" }}>
                    {this.get_doc(this.props.uuid)}
                </div>
            </div>
        )
    }
}
export default ADocument;