import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectService';
import styles from './CreateProject.module.css'; // Assuming you have a CSS module for styling

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    abstract: '',
    description: '',
    images: [],
    techStack: '',
    link: '',
    githubLink: '',
    featured: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear errors
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleTechStackChange = (e) => {
    const techStackString = e.target.value;
    setFormData({
      ...formData,
      techStack: techStackString
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        setImagePreview([...previews]);
      };
      reader.readAsDataURL(file);
    });
    
    setFormData({
      ...formData,
      images: files
    });
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = '请输入项目标题';
    if (!formData.category) newErrors.category = '请选择项目类别';
    if (!formData.abstract) newErrors.abstract = '请输入项目概述';
    if (!formData.description) newErrors.description = '请输入项目详情';
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process tech stack - Convert comma-separated string to array
      const techStackArray = formData.techStack
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      // Process image upload - In real applications, you need to upload images to the server
      // Here we simply use local URLs
      const imageUrls = imagePreview;
      
      // Create project data
      await createProject({
        ...formData,
        techStack: techStackArray,
        images: imageUrls
      });
      
      alert('项目创建成功!');
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('创建项目失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={styles.projectForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">项目标题</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? styles.error : ''}
          />
          {errors.title && <span className={styles.errorText}>{errors.title}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="category">项目类别</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={errors.category ? styles.error : ''}
            placeholder="例如: Web开发, 移动应用, 数据分析"
          />
          {errors.category && <span className={styles.errorText}>{errors.category}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="abstract">项目概述</label>
          <textarea
            id="abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleInputChange}
            className={errors.abstract ? styles.error : ''}
            rows="3"
          />
          {errors.abstract && <span className={styles.errorText}>{errors.abstract}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">项目详情</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? styles.error : ''}
            rows="8"
          />
          {errors.description && <span className={styles.errorText}>{errors.description}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="techStack">技术栈 (以逗号分隔)</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleTechStackChange}
            placeholder="例如: React, Node.js, MongoDB"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="images">项目图片</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
          />
          <div className={styles.imagePreview}>
            {imagePreview.map((preview, index) => (
              <img 
                key={index} 
                src={preview} 
                alt={`Preview ${index}`} 
                className={styles.previewImage} 
              />
            ))}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="link">项目链接</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="https://..."
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="githubLink">GitHub 仓库</label>
          <input
            type="text"
            id="githubLink"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleInputChange}
            placeholder="https://github.com/..."
          />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
            />
            <label htmlFor="featured">设为精选项目</label>
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => navigate('/admin/projects')}
            disabled={isSubmitting}
          >
            取消
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? '保存中...' : '保存项目'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;