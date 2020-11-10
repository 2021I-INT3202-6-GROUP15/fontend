import React from 'react'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import DocumentList from '../small_components/DocumentList'
import LeftMenu from '../small_components/LeftMenu'
import RightMenu from '../small_components/RightMenu'
import Slogan from '../small_components/Slogan'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import SearchTitle from '../small_components/Search'

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
            category: "book",
            language: '', 
            title:"",
            by:"category",
            linkpass:""
        }
    } 
    // selectTitle=(title)=>{
    //     this.setState({title:title, by:"title"})
    // }
    // selectCategory=(category)=>{
    //     this.setState({category:category, by:"category"})
    // }

    // selectLanguage=(language)=>{
    //     this.setState({language:language, by:"language"})
    // }

    passLink =(passLink)=>{
        this.setState({linkpass:passLink})
        this.props.documentLink(passLink)
    }

    render() {
        console.log("home")
        if (localStorage.getItem("auth") == null ||this.props.username=="") {
            return (
                <div style={{height:"100%"}}>
                    <AppHeaderLogin username=""/>
                    <div style={{height:"100%"}}>
                        <LeftMenu  pass={this.passLink} />
                    </div>

                </div>
            )
        }
        return (
            <div style={{height:"100%"}}>
                <AppHeaderLogin username={this.props.username} />
                <div style={{ display: 'flex', justifyContent: 'space-between', height:"100%"}}>
                    <LeftMenu pass={this.passLink}/>
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