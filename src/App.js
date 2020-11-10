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
import Bookmark from './components/layouts/Bookmark';
import RateDocument from './components/layouts/MyRate';
import AuthorList from './components/layouts/AuthorList';
import PublisherList from './components/layouts/PublisherList';
import SubjectList from './components/layouts/SubjectList';
import DocumentAuthor from './components/small_components/DocumentAuthor';
import DocumentPublisher from './components/small_components/DocumentPublisher';
import DocumentSubject from './components/small_components/DocumentSubject';
import Test from './components/layouts/Test'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      token: '',
      username: '',
      authorLink:null,
      publisherLink:null,
      subjectLink:null,
      docLink:null
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

  getAuthorLink=(passLink)=>{
    this.setState({authorLink:passLink})
  }
  
  getPublisherLink=(passLink)=>{
    this.setState({publisherLink:passLink})
  }

  getSubjectLink=(passLink)=>{
    this.setState({subjectLink:passLink})
  }
  getDocLink=(docLink)=>{
    this.setState({docLink:docLink})
  }
  


  render() {
    return (
      <ApolloProvider client={this.client}>
        <div>
          <Router>
            <Route exact path='/register'><UserForm /></Route>
            <Route exact path='/DocumentCreate'><DocumentCreate token={this.state.token} username={this.state.username} /></Route>
            <Route exact path='/login'><Login userLogin={this.userLogin} userName={this.userName} /></Route>

            <Route exact path='/'><HomeLogin username={this.state.username} documentLink={this.getDocLink}/></Route>
            <Route exact path='/profile'><Profile username={this.state.username} /></Route>
            <Route exact path='/Bookmark'><Bookmark username={this.state.username} /></Route>
            <Route exact path='/Rate'><RateDocument username={this.state.username} /></Route>

            <Route exact path='/Authors'><AuthorList username={this.state.username} passLink={this.getAuthorLink}/></Route>
            <Route exact path='/Publisher'><PublisherList username={this.state.username} passPublisherLink={this.getPublisherLink}/></Route>
            <Route exact path='/Subject'><SubjectList username={this.state.username} passSubjectLink={this.getSubjectLink} /></Route>

            <Route exact path={`/${this.state.authorLink}`}><DocumentAuthor uuid={this.state.authorLink} username={this.state.username} pass={this.getDocLink}/></Route>
            <Route exact path={`/${this.state.publisherLink}`}><DocumentPublisher uuid={this.state.publisherLink} username={this.state.username} pass={this.getDocLink} /></Route>
            <Route exact path={`/${this.state.subjectLink}`}><DocumentSubject uuid={this.state.subjectLink} username={this.state.username} pass={this.getDocLink}/></Route>


            <Route exact path={`/${this.state.docLink}`}><ADocument uuid={this.state.docLink} username={this.state.username} /></Route>


            <Route exact path='/Test'><Test/></Route>

          </Router>
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
