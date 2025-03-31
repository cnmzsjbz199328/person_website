import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProjectList from '../utils/ProjectList'
import { getFeaturedProjects } from '../services/projectService'
import styles from './HomePage.module.css'

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取精选项目
    getFeaturedProjects()
      .then(data => {
        setFeaturedProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching featured projects:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>欢迎来到我的个人网站</h1>
          <h2>软件开发工程师 & 设计师</h2>
          <p>我致力于构建创新的网络应用程序和创造出色的用户体验。</p>
          <div className={styles.actionButtons}>
            <Link to="/projects" className={styles.primaryButton}>
              查看我的项目
            </Link>
            <Link to="/about" className={styles.secondaryButton}>
              了解更多
            </Link>
          </div>
        </div>
      </section>
      
      <section className={styles.featuredProjects}>
        <h2>精选项目</h2>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : (
          <ProjectList projects={featuredProjects} title="" />
        )}
        <div className={styles.viewAllContainer}>
          <Link to="/projects" className={styles.viewAllButton}>
            查看所有项目
          </Link>
        </div>
      </section>
      
      <section className={styles.skills}>
        <h2>技能 & 技术</h2>
        <div className={styles.skillCategories}>
          <div className={styles.skillCategory}>
            <h3>前端</h3>
            <ul>
              <li>React</li>
              <li>JavaScript/TypeScript</li>
              <li>HTML/CSS</li>
              <li>响应式设计</li>
            </ul>
          </div>
          <div className={styles.skillCategory}>
            <h3>后端</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>RESTful APIs</li>
              <li>数据库设计</li>
            </ul>
          </div>
          <div className={styles.skillCategory}>
            <h3>其他</h3>
            <ul>
              <li>Git/GitHub</li>
              <li>UI/UX 设计</li>
              <li>测试</li>
              <li>部署</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;