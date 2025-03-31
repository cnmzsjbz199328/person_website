import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { logout } from '../../services/authService'
import { getCurrentUser } from '../../services/authService'
import styles from './AdminLayout.module.css'

const AdminLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const user = getCurrentUser();
  
  const handleLogout = () => {
    logout().then(() => {
      window.location.href = '/';
    });
  };
  
  return (
    <div className={styles.adminLayout}>
      <header className={styles.adminHeader}>
        <div className={styles.headerContainer}>         
          <nav className={styles.adminNav}>
            <ul>
              <li>
                <Link 
                  to="/admin" 
                  className={pathname === '/admin' ? styles.active : ''}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/projects" 
                  className={pathname.includes('/admin/projects') && !pathname.includes('/create') && !pathname.includes('/edit') ? styles.active : ''}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/projects/create" 
                  className={pathname === '/admin/projects/create' ? styles.active : ''}
                >
                  Create Project
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className={styles.headerRight}>
            <div className={styles.actionButtons}>
              <Link to="/" className={styles.backToSite}>
                Back to Site
              </Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className={styles.content}>
        <div className={styles.contentHeader}>
          <h1>
            {pathname === '/admin' && 'Admin Dashboard'}
            {pathname === '/admin/projects' && 'Project Management'}
            {pathname === '/admin/projects/create' && 'Create New Project'}
            {pathname.includes('/admin/projects/edit') && 'Edit Project'}
          </h1>
        </div>
        <div className={styles.contentBody}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout