import React from 'react'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import DocumentList from '../small_components/DocumentList'
import LeftMenu from '../small_components/LeftMenu'
import RightMenu from '../small_components/RightMenu'
import Slogan from '../small_components/Slogan'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const PROFILE = gql`
      query profile($username:String!){
        userByUsername(username:$username){
          username
          joinDate
        }
      }
`
class HomeLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogOut: false,
            category: '',
            language: ''
        }
    }

    render() {
        if (localStorage.getItem("auth") == null ||this.props.username=="") {
            console.log("not")
            return (
                <div >
                    <AppHeaderLogin username=""/>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}} >
                        <LeftMenu/>
                        {/* <div style={{ marginRight: '100px' }}>
                            <Slogan />
                            <DocumentList/>
                        </div> */}
                        {/* <RightMenu /> */}
                    </div>

                </div>
            )
        }
        return (
            <div>
                <AppHeaderLogin username={this.props.username} />
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <LeftMenu/>
                    {/* <div >
                        <Slogan />
                        <DocumentList/>
                    </div> */}
                    <RightMenu />
                </div>
            </div>
        )
    }
}
export default HomeLogin