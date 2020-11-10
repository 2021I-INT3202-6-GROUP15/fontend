import React, {useState} from 'react'
import {
    HeartOutlined, HeartFilled
} from '@ant-design/icons';
import { gql } from 'apollo-boost'
import { Form, Input, Button, Radio, Select, InputNumber, message } from 'antd';
import { useQuery, Mutation, useMutation } from 'react-apollo'

const RATE_ADD = gql`
      mutation rateAdd($documentUuid:UUID!, $rateValue:Int!, $comment:String!){
          rateAdd(
              documentUuid:$documentUuid
              rateValue:$rateValue
              comment:$comment
          ){
              ok
          }
      }
      `
const RATE_DELETE = gql`
      mutation rateDelete($documentUuid:UUID!){
          rateDelete(
              documentUuid:$documentUuid
          ){
              ok
          }
      }
      `

class RateComponent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<div></div>)
    }
}