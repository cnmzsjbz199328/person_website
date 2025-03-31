import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectById } from '../services/projectService'
import styles from './ProjectDetailPage.module.css'

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 获取项目详情
    getProjectById(id)
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        setError('无法加载项目详情');
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className={styles.loading}>加载中...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!project) return <div className={styles.error}>找不到项目</div>;

  return (
    <div className={styles.projectDetail}>
      <div className={styles.header}>
        <h1>{project.title}</h1>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.date}>{project.date}</span>
        </div>
      </div>

      <div className={styles.imageGallery}>
        {project.images && project.images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`${project.title} - 图片 ${index + 1}`} 
            className={styles.projectImage}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.overview}>
          <h2>项目概述</h2>
          <p>{project.abstract}</p>
        </div>

        <div className={styles.details}>
          <h2>项目详情</h2>
          <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
        </div>

        <div className={styles.techStack}>
          <h2>使用的技术</h2>
          <ul className={styles.techList}>
            {project.techStack && project.techStack.map((tech, index) => (
              <li key={index} className={styles.techItem}>{tech}</li>
            ))}
          </ul>
        </div>

        {project.link && (
          <div className={styles.projectLinks}>
            <h2>项目链接</h2>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              查看项目
            </a>
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                GitHub 仓库
              </a>
            )}
          </div>
        )}
      </div>

      <div className={styles.navigation}>
        <Link to="/projects" className={styles.backButton}>
          返回所有项目
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;