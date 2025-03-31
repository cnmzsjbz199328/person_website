import React, { useState, useEffect } from 'react'
import ProjectList from '../utils/ProjectList'
import { getAllProjects } from '../services/projectService'
import styles from './ProjectsPage.module.css'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) return <div className={styles.loading}>加载中...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  
  return (
    <div className={styles.projectsPage}>
      <header className={styles.header}>
        <h1>我的项目</h1>
        <p>这是我过去几年中完成的一些项目。每个项目都展示了我的技能和专业知识的不同方面。</p>
      </header>
      
      <ProjectList projects={projects} title="" />
    </div>
  );
};

export default ProjectsPage;