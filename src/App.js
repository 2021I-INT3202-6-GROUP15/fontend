import React, { Fragment } from 'react'
import './App.css';
import Login from './components/forms/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import UserForm from './components/forms/User'
import DocumentCreate from './components/layouts/DocumentCreate';
import HomeLogin from './components/layouts/HomeLogin';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Profile from './components/layouts/Profile';
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import ADocument from './components/small_components/ADocument';
import Test from './components/layouts/Test';
import Bookmark from './components/layouts/Bookmark';
import RateDocument from './components/layouts/MyRate';
import BookmarkComponent from './components/small_components/BookmarkComponent';
import AuthorList from './components/layouts/AuthorList';
import PublisherList from './components/layouts/PublisherList';
import SubjectList from './components/layouts/SubjectList';
import DocumentAuthor from './components/small_components/DocumentAuthor';
import DocumentPublisher from './components/small_components/DocumentPublisher';


const DOCUMENT = gql`
      query ALL{
        documentFilter{
          documentUuid
        }
      }`
const AUTHOR_GET_ALL = gql`
      query author_get_all{
        authorGetAll{
          id
        }
      }`

const PUBLISHER_GET_ALL = gql`
      query publisher_get_all{
        publisherGetAll{
          id
        }
      }`

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      token: '',
      username: ''
    }
  }

  httpLink = createHttpLink({
    uri: "http://localhost:8001/graphql",
  });

  authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("auth");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
      }
    }
  });

  client = new ApolloClient({
    link: this.authLink.concat(this.httpLink),
    cache: new InMemoryCache()
  });

  userLogin = (tok) => {
    this.setState({
      token: tok
    })
    localStorage.setItem("auth", this.state.token)
    console.log(this.state.token)
  }
  userName = (username) => {
    this.setState({
      username: username
    })
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <div>
          <Router>
            <Route exact path='/register'><UserForm /></Route>
            <Route exact path='/DocumentCreate'><DocumentCreate token={this.state.token} username={this.state.username} /></Route>
            <Route exact path='/login'><Login userLogin={this.userLogin} userName={this.userName} /></Route>
            <Route exact path='/'><HomeLogin username={this.state.username} /></Route>
            <Route exact path='/profile'><Profile username={this.state.username} /></Route>
            <Route exact path='/Bookmark'><Bookmark username={this.state.username} /></Route>
            <Route exact path='/Rate'><RateDocument username={this.state.username} /></Route>
            <Route exact path='/Authors'><AuthorList username={this.state.username} /></Route>
            <Route exact path='/Publisher'><PublisherList username={this.state.username} /></Route>
            <Route exact path='/Subject'><SubjectList username={this.state.username} /></Route>

            <Route exact path='/Test'><BookmarkComponent /></Route>

            <Query query={AUTHOR_GET_ALL}>
              {({ loading, error, data }) => {
                console.log("app")
                console.log(data)
                if (loading) return "Loading"
                if (error) return `Error! ${error.message}`
                return (
                  <Fragment>
                    {
                      data.authorGetAll.map((doc, index) => {
                        return (<Route key={index} exact path={`/${doc.id}`}><DocumentAuthor uuid={doc.id} username={this.state.username}/></Route>)
                      }
                      )
                    }
                  </Fragment>
                )
              }}
            </Query>

            <Query query={PUBLISHER_GET_ALL}>
              {({ loading, error, data }) => {
                console.log("app")
                console.log(data)
                if (loading) return "Loading"
                if (error) return `Error! ${error.message}`
                return (
                  <Fragment>
                    {
                      data.publisherGetAll.map((doc, index) => {
                        return (<Route key={index} exact path={`/${doc.id}`}><DocumentPublisher username={this.state.username} uuid={doc.id}/></Route>)
                      }
                      )
                    }
                  </Fragment>
                )
              }}
            </Query>

            <Query query={DOCUMENT}>
              {({ loading, error, data }) => {
                console.log("app")
                console.log(data)
                if (loading) return "Loading"
                if (error) return `Error! ${error.message}`
                return (
                  <Fragment>
                    {
                      data.documentFilter.map((doc, index) => {
                        return (<Route key={index} exact path={`/${doc.documentUuid}`}><ADocument uuid={doc.documentUuid} username={this.state.username} /></Route>)
                      }
                      )
                    }
                  </Fragment>
                )
              }}
            </Query>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
