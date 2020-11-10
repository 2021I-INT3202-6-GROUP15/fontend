import React from 'react'
import {
    HeartOutlined, HeartFilled
} from '@ant-design/icons';
import { gql } from 'apollo-boost'
import { Form, Input, Button, Radio, Select, InputNumber, message } from 'antd';
import { Query, Mutation } from 'react-apollo'

const BOOKMARK_CHECK = gql`
      query bookmark_check($documentUuid:UUID!){
        bookmarkCheck(documentUuid:$documentUuid)
      }`

const BOOKMARK_ADD = gql`
      mutation bookmarkAdd($documentUuid:UUID!){
          bookmarkAdd(
              documentUuid:$documentUuid
          ){
              ok
          }
      }
      `
const BOOKMARK_DELETE = gql`
      mutation bookmarkDelete($documentUuid:UUID!){
          bookmarkDelete(
              documentUuid:$documentUuid
          ){
              ok
          }
      }
      `

class BookmarkComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookmark: 0,
            begin: false,
        }
    }

    clickHandler = (e) => {
        this.setState({ bookmark: true })
    }

    render() {
        if (this.props.username == "") {
            return (<div></div>)
        }
        return(
            <Query asyncMode query={BOOKMARK_CHECK} variables={{ documentUuid: this.props.uuid }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading"
                    if (!data.bookmarkCheck) {
                        return (
                            // <HeartOutlined style={{ color: "red", fontSize: "30px", paddingRight: "30px" }}/>
                            <Mutation mutation={BOOKMARK_ADD}>
                                {(bookmarkAdd, { data }) => (
                                    <HeartOutlined
                                        style={{ color: "red", fontSize: "30px", paddingRight: "30px" }}
                                        onClick=
                                        {
                                            (e) => {
                                                console.log('add')
                                                bookmarkAdd({ variables: { documentUuid: this.props.uuid } })
                                                this.setState({ bookmark: 1 })
                                            }
                                        } />
                                )}
                            </Mutation>
                        )
                    }
                    if (data.bookmarkCheck) {
                        return (
                            <Mutation mutation={BOOKMARK_DELETE}>
                                {(bookmarkDelete, { data }) => (
                                    <HeartFilled
                                        style={{ color: "red", fontSize: "30px", paddingRight: "30px" }}
                                        onClick=
                                        {
                                            (e) => {
                                                console.log("delete")
                                                bookmarkDelete({ variables: { documentUuid: this.props.uuid } })
                                                this.setState({ bookmark: 2 })
                                            }
                                        } />
                                )}
                            </Mutation>
                        )
                    }
                }}
            </Query>
        )
    }
}
export default BookmarkComponent