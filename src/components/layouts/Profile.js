import React from 'react'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import { from, gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { useQuery } from '@apollo/client'
import { Card } from 'antd'

const PROFILE = gql`
      query profile($username:String!){
        userByUsername(username:$username){
          username
          joinDate
        }
      }`

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    render() {
        return (
            <div>
                <AppHeaderLogin username={this.props.username} />
                <br/>
                <br/>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Query query={PROFILE} variables={{ username: this.props.username }} >
                        {({ loading, error, data }) => {
                            if (loading) return "Loading"
                            if (error) return `Error! ${error.message}`
                            return (
                                <div style={{ width: "1000px", margin: "20px 70px" }}>
                                    <Card title="User Information" style={{ border: "1px solid silver", borderRadius: "10px" }}>
                                        <div>
                                            <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title="User name">
                                                {data.userByUsername.username}
                                            </Card>
                                            <Card style={{ marginTop: 16, border: "1px solid silver" }} type="inner" title="Join Date">
                                                {data.userByUsername.joinDate}
                                            </Card>
                                        </div>

                                    </Card>
                                </div>
                            )
                        }}
                    </Query>
                </div>
            </div>
        )
    }
}
export default Profile
