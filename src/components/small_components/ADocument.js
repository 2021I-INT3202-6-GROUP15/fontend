import React from 'react'
import { Row, Col, Button, List, Rate } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Slogan from './Slogan';
import AppHeaderLogin from './AppHeaderLogin';

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
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
        }
      }`

const DOCUMENT_AUTHOR = gql`
        query DOC_AUTHOR($uuid: UUID!){
        documentGetAuthors(documentUuid:$uuid){
            id
            name
        }
        }`
const DOCUMENT_PUBLISHER = gql`
        query DOC_PUBLISHER($uuid: UUID!){
        documentGetPublishers(documentUuid:$uuid){
            id
            name
        }
        }`

class ADocument extends React.Component {
    constructor(props) {
        super(props)
    }
    get_author(uuid) {
        console.log(uuid)
        return (
            <Query query={DOCUMENT_AUTHOR} variables={{ documentUuid: uuid }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    console.log(data)
                    
                    return (
                        <div>
                            <div>Author:</div>
                            {
                                data.documentGetAuthors.map((doc) => {
                                    console.log(doc)
                                    return (
                                        <Link to={`/${doc.id}`}>
                                            {doc.name}
                                        </Link>)
                                })
                            }
                        </div>

                    )
                }}

            </Query>
        )
    }

    get_doc(uuid) {
        return (
            <Query query={DOCUMENT_INFORMATION} variables={{ uuid: uuid }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    console.log(data)
                    return (
                        <List>
                            <List.Item style={{ paddingLeft: '20px' }}>
                                <div>Title: {data.documentByUuid.title}</div>
                                <BookmarkComponent uuid={uuid}/>

                            </List.Item>
                            <List.Item style={{ paddingLeft: '20px' }}>
                                <div>Author:</div>
                                <Rate allowHalf defaultValue={3} style={{ marginRight: '20px' }}></Rate>

                            </List.Item>
                            <List.Item style={{ paddingLeft: '20px' }}>
                                <div>Release Year: {data.documentByUuid.releaseYear}</div>
                                <Button style={{ marginRight: '20px' }} type="primary" icon={<DownloadOutlined />}>Down Load</Button>
                            </List.Item>
                            <List.Item style={{ paddingLeft: '20px' }}>Language: {data.documentByUuid.language}</List.Item>
                            <List.Item style={{ paddingLeft: '20px' }}>Category: {data.documentByUuid.category}</List.Item>
                            <List.Item style={{ paddingLeft: '20px' }}>Last Updated: {data.documentByUuid.lastUpdate}</List.Item>
                            <List.Item style={{ paddingLeft: '20px' }}>Description: {data.documentByUuid.description}</List.Item>
                            <List.Item></List.Item>
                        </List>
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
                <div style={{ border: "1px solid silver", margin: "100px", borderRadius: "10px" }}>
                    {this.get_doc(this.props.uuid)}
                    {this.get_author(this.props.uuid)}
                </div>
            </div>
        )
    }
}
export default ADocument;