import React, { ReactElement } from 'react';
import './index.css';
import logoImg from '../../../public/QQ图片20220630114950.png';
import headImg from '../../../public/QQ图片20220630134240.png';
import {
    AndroidOutlined,
    AppleOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {useNavigate, useRoutes} from 'react-router-dom';
import routes from '../../routes';
import Register from '../../components/Register';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
    {icon: AndroidOutlined, name: '安卓'},
    {icon: AppleOutlined, name: '苹果'},
    {icon: WindowsOutlined, name: '微软'}
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.name,
}));

interface RouteItem {
    key: string
}

const MainLayout: React.FC = (): ReactElement => {
    const Element = () => useRoutes(routes);
    const navigate = useNavigate();

    return (
        <>
            <Layout hasSider>
                {/* 左侧 */}
                <Sider
                  style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                    <div
                        className="logo"
                        onClick={(e: React.MouseEvent<Element>): void => navigate('/')}
                    >
                        <img src={logoImg} alt="logo" style={{width: '100%'}} />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['4']}
                        items={items}
                        style={{backgroundColor: '#ffc500'}}
                        onClick={(e: RouteItem): void => {
                            let point: string = '';
                            switch(e.key) {
                                case '1':
                                    point = '/android';
                                    break;
                                case '2':
                                    point = '/apple';
                                    break;
                                case '3':
                                    point = '/windows';
                                    break;
                                default:
                                    point = '/android';
                            }
                            navigate(point);
                        }}
                    />
                </Sider>
                {/* 右侧 */}
                <Layout className="site-layout" style={{ height: '100vh',  marginLeft: 200 }}>
                    {/* 上 */}
                    <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                        <img src={headImg} alt="es-lint want to get" style={{height: '100%'}} />
                    </Header>
                    {/* 中 */}
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ height: '100%', padding: 24, textAlign: 'center' }}>
                            <Element />
                        </div>
                    </Content>
                    {/* 下 */}
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
            <Register />
        </>
    )
}

export default MainLayout;