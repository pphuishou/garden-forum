import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { request } from '@/utils'
import { fetchToken } from '@/store/modules/user';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    await dispatch(fetchToken(value))
    message.success('登录成功');
    navigate('/')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish}>
          <Form.Item
            name="mobile"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '请核对手机号格式' }]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login