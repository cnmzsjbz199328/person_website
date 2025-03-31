import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {project.images && project.images.length > 0 && (
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.date}>{project.date}</span>
        </div>
        <p className={styles.abstract}>{project.abstract}</p>
        <Link to={`/projects/${project.id}`} className={styles.moreLink}>
          查看详情
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard