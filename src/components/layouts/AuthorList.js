import React from 'react'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import Slogan from '../small_components/Slogan'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Menu, Card, Form, Input, Button } from 'antd';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";


const AUTHOR_GET_ALL = gql`
      query author_get_all{
        authorGetAll{
          id
          name
        }
      }`


class AuthorList extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            passLink:""
        }
    }

    render() {
        console.log("authorList")
        return (
            <div>
                <AppHeaderLogin username={this.props.username} />
                <Slogan />
                <Query query={AUTHOR_GET_ALL}>
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
                                    <Card title="Author" style={{ border: "2px solid silver", borderRadius: "10px", textAlign:"center" }}>
                                        {
                                            data.authorGetAll.map((doc) => {
                                                console.log(doc)
                                                return (
                                                    <Link to={`/${doc.id}`}>
                                                        <Card style={{ marginTop: 16, border: "1px solid silver", textAlign:"left" }} 
                                                        hoverable={true} type="inner" 
                                                        title={doc.name} 
                                                        onClick={(e)=>{this.props.passLink(doc.id)}}
                                                        extra={<a href="#">More</a>}>
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
            </div>
        )
    }
}
export default AuthorList