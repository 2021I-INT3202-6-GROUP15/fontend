import React from 'react'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import Slogan from '../small_components/Slogan'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Menu, Card, Form, Input } from 'antd';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";


const SUBJECT_GET_ALL = gql`
      query subject_get_all{
        labelGetAll{
          id
          name
          description
        }
      }`


class SubjectList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <AppHeaderLogin username={this.props.username}/>
                <Slogan/>
                <Query query={SUBJECT_GET_ALL}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading"
                        if (error) return `Error! ${error.message}`
                        return (
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <div style={{ width: "1000px", margin: "20px 70px" }}>
                                    <Card title="Subject" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                        {
                                            data.labelGetAll.map((doc) => {
                                                console.log(doc)
                                                return (
                                                    <Link to={`/${doc.id}`}>
                                                        <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title={doc.name} extra={<a href="#">More</a>}>
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
            </div>
        )
    }
}
export default SubjectList