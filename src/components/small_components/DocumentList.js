import React from 'react'
import { List, Avatar, Rate, Card } from 'antd';
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch
} from "react-router-dom";

class DocumentList extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            posts:[]
        }
    }
    
    render() {

        return (
            <div>
                <div style={{ margin: '30px', border: '3px solid silver', borderRadius: '10px', width: '800px' }} >
                    <Card title="Document">
                        {
                            this.state.posts.map((post) => {
                                return(
                                <Link to={post.title}>
                                    <Card
                                        style={{ marginTop: 16 }}
                                        type="inner"
                                        title={post.title}
                                        extra={<a href="#">More</a>}
                                    >
                                        {post.description}
                                    </Card>
                                </Link>)
                            })
                        }
                    </Card>
                </div>
            </div>
        )
    }
}
export default DocumentList