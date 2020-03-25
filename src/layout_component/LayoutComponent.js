import React, { useState, useEffect, useCallback } from 'react';
import './LayoutComponent.css';
import { Layout, Menu, Breadcrumb, Badge, Avatar, Row, Col } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import GameComponent from '../game_component/GameComponent';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



class LayoutComponent extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <PieChartOutlined />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <DesktopOutlined />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <UserOutlined />
                                    <span>User</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <TeamOutlined />
                                    <span>Team</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <FileOutlined />
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <Row>
                            <Col span={20}></Col>
                            <Col span={4}>
                                <Row justify="end" style={{marginLeft:20,marginRight:20}}>
                                    <Col span={8}>
                                    <span className="avatar-item">
                                        <Badge count={1}>
                                            <Avatar shape="square" icon={<UserOutlined />} />
                                        </Badge>
                                    </span>
                                    </Col>
                                    <Col span={16}>
                                        Oktay Sadoglu
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Header>
                    <Content>
                        <GameComponent></GameComponent>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutComponent;