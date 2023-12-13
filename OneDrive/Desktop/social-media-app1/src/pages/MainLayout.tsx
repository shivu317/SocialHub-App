// MainLayout.tsx

import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/expandable-table">Expandable Table</Link>
          </li>
          <li>
            <Link to="/my-table">My Table</Link>
          </li>
          <li>
            <Link to="/my-profile">My Profile</Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
