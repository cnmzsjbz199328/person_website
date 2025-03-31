import React from 'react'
import ProjectCard from './ProjectCard'
import styles from './ProjectList.module.css'

const ProjectList = ({ projects, title = "项目列表" }) => {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.grid}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectList