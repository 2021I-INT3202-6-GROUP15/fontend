import React from 'react'
import DocumentForm from '../forms/Document'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import LeftMenu from '../small_components/LeftMenu'
import RightMenu from '../small_components/RightMenu'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Slogan from '../small_components/Slogan'
import ADocument from '../small_components/ADocument'
import { Menu, Card } from 'antd';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";


const BOOKMARK_GET = gql`
      query bookmark_get{
        bookmarkGet{
          documentUuid
          title
        }
      }`


class Bookmark extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        console.log(this.props.token)
    }

    bookmark() {
        return (
            <Query query={BOOKMARK_GET}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    if (data.bookmarkGet.length==0) {
                        return (
                            <div style={{ width: "1000px", margin: "20px 70px" }}>
                                <Card title="Bookmark" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                    Bookmark is empty
                                </Card>
                            </div>
                        )
                    }
                    return (
                        <div style={{ width: "1000px", margin: "20px 70px" }}>
                            <Card title="Bookmark" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                {
                                    data.bookmarkGet.map((doc) => {
                                        console.log(doc)
                                        return (
                                            <Link to={`/${doc.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title={doc.title} extra={<a href="#">More</a>}></Card>
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
                {this.props.token}
                <AppHeaderLogin username={this.props.username} />
                <Slogan />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {this.bookmark()}
                </div>
            </div>
        )
    }
}
export default Bookmark