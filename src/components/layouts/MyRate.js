import React from 'react'
import DocumentForm from '../forms/Document'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import LeftMenu from '../small_components/LeftMenu'
import RightMenu from '../small_components/RightMenu'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Slogan from '../small_components/Slogan'
import ADocument from '../small_components/ADocument'
import { Menu, Card, Rate } from 'antd';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";


const RATE_GET_MINES = gql`
      query rate_get_mines{
        rateGetMines{
          document{documentUuid, title}
          rateValue
          user{username}
        }
      }`


class RateDocument extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        console.log(this.props.token)
    }

    rate() {
        return (
            <Query query={RATE_GET_MINES}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    console.log(data)
                    if (data.rateGetMines.length==0) {
                        return (
                            <div style={{ width: "1000px", margin: "20px 70px" }}>
                                <Card title="Rate" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                    Rate list is empty
                                </Card>
                            </div>
                        )
                    }
                    return (
                        <div style={{ width: "1000px", margin: "20px 70px" }}>
                            <Card title="Rate" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                {
                                    data.rateGetMines.map((doc) => {
                                        console.log(doc)
                                        return (
                                            <Link to={`/${doc.document.documentUuid}`}>
                                                <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title={doc.document.title} extra={<a href="#">More</a>}>
                                                    <div>
                                                        <Rate disabled value={doc.rateValue}/>
                                                    </div>
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
                {this.props.token}
                <AppHeaderLogin username={this.props.username} />
                <Slogan />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {this.rate()}
                </div>
            </div>
        )
    }
}
export default RateDocument