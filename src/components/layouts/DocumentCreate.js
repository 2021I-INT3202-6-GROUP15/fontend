import React from 'react'
import DocumentForm from '../forms/Document'
import AppHeaderLogin from '../small_components/AppHeaderLogin'
import LeftMenu from '../small_components/LeftMenu'
import RightMenu from '../small_components/RightMenu'

class DocumentCreate extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount= () =>{
        console.log(this.props.token)
    }
    render(){
        return(
            <div>
                {this.props.token}
                <AppHeaderLogin username={this.props.username}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    {/* <LeftMenu></LeftMenu> */}
                    <DocumentForm token ={this.props.token}/>
                    {/* <RightMenu/> */}
                </div>
            </div>
        )
    }
}
export default DocumentCreate