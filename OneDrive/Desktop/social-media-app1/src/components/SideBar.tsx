import React, { ReactNode } from 'react'
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import { useLocation, Link, Navigate } from 'react-router-dom'
import { Button } from 'antd'
import { useAuth } from '../components/Auth/AuthContext'

interface BasicLayoutProps {
  children: ReactNode
}

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
  return menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children as MenuDataItem[]) : [],
    }
    return localItem
  })
}

const CustomMenuLink: React.FC<{
  to: string
  icon: string
  children: React.ReactNode
}> = ({ to, icon, children }) => (
  <Link to={to}>
    <div className={`icon ${icon}`} style={{ marginRight: 8 }} />
    {children}
  </Link>
)

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const location = useLocation()
  const auth = useAuth()

  const menuData: MenuDataItem[] = [
    {
      path: '/',
      name: 'Home',
      icon: 'icon-home',
    },
    {
      path: '/my-likes',
      name: 'My Likes',
      icon: 'icon-heart',
    },
    {
      path: '/my-bookmarks',
      name: 'My Bookmarks',
      icon: 'icon-bookmark',
    },
    {
      path: '/my-posts',
      name: 'My Posts',
      icon: 'icon-edit',
    },
    {
      path: '/my-profile',
      name: 'My Profile',
      icon: 'icon-user',
      children: [
        {
          path: '/expandable-pro-table',
          name: 'Expandable Table',
          icon: 'icon-table',
          render: () => (
            <CustomMenuLink to="/expandable-pro-table" icon="icon-table">
              Expandable Table
            </CustomMenuLink>
          ),
        },
        {
          path: '/my-table',
          name: 'My Table',
          icon: 'icon-table',
          render: () => (
            <CustomMenuLink to="/my-table" icon="icon-table">
              My Table
            </CustomMenuLink>
          ),
        },
        // Add more menu items if needed
      ],
    },
  ]

  const route = () => {
    if (location.pathname === '/signup' || location.pathname === '/login') {
      return <Navigate to="/" replace={true} />
    }
    return children
  }

  return (
    <ProLayout
      location={location}
      title="SocialHub"
      menuDataRender={() => menuDataRender(menuData)}
      menuItemRender={(itemProps, defaultDom) => {
        if (itemProps.isUrl || !itemProps.path) {
          return defaultDom
        }
        return <Link to={itemProps.path as string}>{defaultDom}</Link>
      }}
      footerRender={() => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '50px',
            padding: '10px',
            background: '#f0f2f5',
          }}
        >
          <div>CopyRight</div>
          <div>
            {auth.isAuthenticated ? (
              <Button onClick={() => auth.logout()}>Logout</Button>
            ) : (
              <Button>
                <Link to="/login">Logout</Link>
              </Button>
            )}
          </div>
        </div>
      )}
      // Other props...
    >
      {route()}
    </ProLayout>
  )
}

export default BasicLayout
