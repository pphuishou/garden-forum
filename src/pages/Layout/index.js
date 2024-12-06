import { Layout, Menu, Popconfirm, message } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { fetchUserInfo, clearToken } from '@/store/modules/user';
import { useDispatch, useSelector } from 'react-redux';


const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />
  },
]

const GeekLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // 这里解构时要加上模块名.属性名
  const userInfo = useSelector((state) => state.user.userInfo);

  const selectedKey = location.pathname;
  const changeMenu = (item) => {
    navigate(item.key)
  }
  const logOut = () => {
    dispatch(clearToken())
    message.success('退出登录成功')
    navigate('/login');
  }
  useEffect(() => {
    dispatch(fetchUserInfo());
    
  }, [dispatch])
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{ userInfo.mobile }</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logOut}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={changeMenu}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout;