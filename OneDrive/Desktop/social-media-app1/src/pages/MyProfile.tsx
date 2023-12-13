import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd'
import AuthContext from '../components/Auth/AuthContext'

const MyProfile: React.FC = () => {
  const authContext = useContext(AuthContext) as { user?: { email?: string } }

  const onFinish = (values: any) => {
    // Handle form submission
    console.log('Received values:', values)
  }

  return (
    <div>
      <h1>My Profile</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Email ID" name="email">
          <Input readOnly defaultValue={authContext?.user?.email || ''} />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Profile Photo" name="profilePhoto">
          <Input />
        </Form.Item>
        {/*We Can Add more form fields as needed */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default MyProfile
