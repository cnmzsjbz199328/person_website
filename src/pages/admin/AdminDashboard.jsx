import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../../services/projectService'
import styles from './AdminDashboard.module.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    categories: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取项目数据以计算统计信息
    getAllProjects()
      .then(projects => {
        const featuredProjects = projects.filter(project => project.featured);
        const categories = new Set(projects.map(project => project.category));
        
        setStats({
          totalProjects: projects.length,
          featuredProjects: featuredProjects.length,
          categories: categories.size
        });
        
        // 获取最近创建的项目（这里简单地取前3个）
        setRecentProjects(projects.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.dashboard}>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>总项目数</h3>
              <div className={styles.statValue}>{stats.totalProjects}</div>
            </div>
            <div className={styles.statCard}>
              <h3>精选项目</h3>
              <div className={styles.statValue}>{stats.featuredProjects}</div>
            </div>
            <div className={styles.statCard}>
              <h3>项目类别</h3>
              <div className={styles.statValue}>{stats.categories}</div>
            </div>
          </div>

          <div className={styles.quickActions}>
            <h2>快捷操作</h2>
            <div className={styles.actionButtons}>
              <Link to="/admin/projects/create" className={styles.actionButton}>
                创建新项目
              </Link>
              <Link to="/admin/projects" className={styles.actionButton}>
                管理项目
              </Link>
            </div>
          </div>

          <div className={styles.recentProjects}>
            <h2>最近的项目</h2>
            <div className={styles.recentProjectsList}>
              {recentProjects.length === 0 ? (
                <p>暂无项目</p>
              ) : (
                recentProjects.map((project) => (
                  <div key={project.id} className={styles.recentProjectCard}>
                    {project.images && project.images.length > 0 && (
                      <img 
                        src={project.images[0]} 
                        alt={project.title}
                        className={styles.projectThumbnail}
                      />
                    )}
                    <div className={styles.projectInfo}>
                      <h3>{project.title}</h3>
                      <p className={styles.category}>{project.category}</p>
                      <div className={styles.projectActions}>
                        <Link to={`/admin/projects/edit/${project.id}`}>
                          编辑
                        </Link>
                        <Link to={`/projects/${project.id}`} target="_blank">
                          查看
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;