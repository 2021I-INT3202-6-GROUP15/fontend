import { Menu, Button, Layout } from 'antd';
import axios from 'axios'
import {
    MailOutlined,
} from '@ant-design/icons';
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

const { SubMenu } = Menu;
class RightMenu extends React.Component {

    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div >
                <Menu
                    // defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub3']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="sub1" icon={<MailOutlined />} title="Bookmarks">
                        <Link to='/Bookmark'>
                            Bookmarks
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub2" icon={<MailOutlined />} title="Rate">
                        <Link to='/Rate'>
                            Rate
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub3" icon={<MailOutlined />} title="Add New">
                        <Menu.Item>
                            <Link to='/PublisherCreate'>Publisher</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/MajorCreate'>Major</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/AuthorCreate'>Author</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/DocumentCreate'>Document</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}
export default RightMenu;