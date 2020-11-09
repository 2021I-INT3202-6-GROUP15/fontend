import React from 'react'
import {
    HeartOutlined, HeartFilled
} from '@ant-design/icons';
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const BOOKMARK_CHECK = gql`
      query bookmark_check($documentUuid:UUID!){
        bookmarkCheck(documentUuid:$documentUuid)
      }`

class BookmarkComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookmark: false
        }
    }

    clickHandler = (e) => {
        this.setState({ bookmark: true })
    }


    render() {
        // if (!this.state.bookmark) {
        //     return (
        //         <HeartOutlined style={{ color: "red", fontSize: "30px", paddingRight: "30px" }} onClick={this.clickHandler} />
        //     )
        // }
        // return (
        //     <HeartFilled style={{ color: "red", fontSize: "30px", paddingRight: "30px" }} onClick={this.clickHandler} />
        // )
        return (
            <Query query={BOOKMARK_CHECK} variables={{ documentUuid: this.props.uuid }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (error) return `Error! ${error.message}`
                    console.log(data)
                    if (data) {
                        return (
                            <HeartFilled style={{ color: "red", fontSize: "30px" }} />
                        )
                    }
                    return (
                        <HeartOutlined style={{ color: "red", fontSize: "30px" }} />
                    )
                }}
            </Query>
            // <HeartOutlined style={{color:"red", fontSize:"30px"}}/>
        )
    }

}
export default BookmarkComponent