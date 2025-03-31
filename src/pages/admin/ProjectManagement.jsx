import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, deleteProject } from '../../services/projectService';
import styles from './ProjectManagement.module.css';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
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
  
  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(project => project.id !== id));
      } catch (err) {
        setError('Failed to delete project');
        console.error(err);
      }
    }
  };
  
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Loading projects...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.projectManagement}>
      <div className={styles.actions}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/admin/projects/create" className={styles.createButton}>
          Add New Project
        </Link>
      </div>

      <div className={styles.projectList}>
        <table className={styles.projectTable}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="5" className={styles.noProjects}>
                  No projects found
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>
                    {project.images && project.images.length > 0 && (
                      <img 
                        src={project.images[0]} 
                        alt={project.title}
                        className={styles.thumbnailImage}
                      />
                    )}
                  </td>
                  <td>{project.title}</td>
                  <td>{project.category}</td>
                  <td>{project.featured ? 'Yes' : 'No'}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link 
                        to={`/admin/projects/edit/${project.id}`}
                        className={styles.editButton}
                      >
                        Edit
                      </Link>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </button>
                      <Link 
                        to={`/projects/${project.id}`}
                        className={styles.viewButton}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;