import React, {useState} from 'react'
import {
    HeartOutlined, HeartFilled
} from '@ant-design/icons';
import { gql } from 'apollo-boost'
import { Form, Input, Button, Radio, Select, InputNumber, message } from 'antd';
import { useQuery, Mutation, useMutation } from 'react-apollo'

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

function BookmarkButton({uuid}) {

    const [mark,setMark] =useState(0);
    // async getBookMark = ()=>{
    //     const { loading, error, getData } = useQuery(BOOKMARK_CHECK, { variables:{documentUuid:uuid } });
    // }
    const { loading, error, getData } = useQuery(BOOKMARK_CHECK, { variables:{documentUuid:uuid } });
    const [addBookmark, {addData}]= useMutation(BOOKMARK_ADD)
    const [deleteBookmark, {deleteData}]= useMutation(BOOKMARK_DELETE)
    console.log(loading)
    console.log(error)
    console.log(getData)
    if(getData){
        console.log("data")
        return(
            <HeartFilled style={{color:"red", fontSize:"30px", paddingRight:"30px"}} onClick={(e)=>{deleteBookmark({variables:{documentUuid:uuid}}); setMark(0)}}/>
        )
    }
    else{
        return(
            <HeartOutlined style={{color:"red", fontSize:"30px", paddingRight:"30px"}} onClick={(e)=>{addBookmark({variables:{documentUuid:uuid}}); setMark(1)}}/>
        )
    }
    
    // if (error) {
    //     return (
    //         <Mutation mutation={BOOKMARK_ADD}>
    //             {(bookmarkAdd, { data }) => (
    //                 <HeartOutlined
    //                     style={{ color: "red", fontSize: "30px", paddingRight: "30px" }}
    //                     onClick=
    //                     {
    //                         (e) => {
    //                             console.log('add')
    //                             bookmarkAdd({ variables: { documentUuid: this.props.uuid } })
    //                         }
    //                     } />
    //             )}
    //         </Mutation>
    //     )
    // }
    // if (data) {
    //     return (
    //         <Mutation mutation={BOOKMARK_DELETE}>
    //             {(bookmarkDelete, { data }) => (
    //                 <HeartFilled
    //                     style={{ color: "red", fontSize: "30px", paddingRight: "30px" }}
    //                     onClick=
    //                     {
    //                         (e) => {
    //                             console.log("delete")
    //                             bookmarkDelete({ variables: { documentUuid: this.props.uuid } })
    //                         }
    //                     } />
    //             )}
    //         </Mutation>
    //     )
    // }

}

export default BookmarkButton