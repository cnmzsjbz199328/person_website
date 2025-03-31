import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProjectById, updateProject } from '../../services/projectService'
import styles from './ProjectForm.module.css' // 需要创建这个CSS文件

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    techStack: [],
    abstract: '',
    description: '',
    featured: false,
    link: '',
    githubLink: '',
    images: []
  });
  const [currentImages, setCurrentImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 获取项目详情
    getProjectById(id)
      .then(projectData => {
        if (!projectData) {
          throw new Error('Project not found');
        }
        
        // 将技术栈数组转为字符串，方便编辑
        const techStackStr = projectData.techStack ? projectData.techStack.join(', ') : '';
        
        setFormData({
          title: projectData.title || '',
          category: projectData.category || '',
          techStack: techStackStr,
          abstract: projectData.abstract || '',
          description: projectData.description || '',
          featured: projectData.featured || false,
          link: projectData.link || '',
          githubLink: projectData.githubLink || ''
        });
        
        setCurrentImages(projectData.images || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching project details:', error);
        alert('Failed to retrieve project information');
        navigate('/admin/projects');
      });
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // 清除输入时的错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleFileChange = (e) => {
    // 实际项目中，这里应该处理多图片上传逻辑
    // 简化版本只是设置了文件引用
    setFormData({
      ...formData,
      newImages: Array.from(e.target.files)
    });
  };

  const validate = () => {
    const newErrors = {};

    // 必填字段验证
    if (!formData.title) newErrors.title = '项目名称必填';
    if (!formData.category) newErrors.category = '项目类别必填';
    if (!formData.abstract) newErrors.abstract = '项目概述必填';
    if (!formData.description) newErrors.description = '项目详情必填';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证表单
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // 处理技术栈，从字符串转回数组
    const techStackArray = formData.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== '');
    
    try {
      // 调用API更新项目
      await updateProject(id, {
        ...formData,
        techStack: techStackArray
      });
      
      alert('项目更新成功！');
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('更新项目失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="title">项目名称</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? styles.inputError : ''}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">项目类别</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? styles.inputError : ''}
            />
            {errors.category && <span className={styles.error}>{errors.category}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="techStack">技术栈 (用逗号分隔)</label>
            <input
              id="techStack"
              name="techStack"
              type="text"
              placeholder="React, Node.js, MongoDB"
              value={formData.techStack}
              onChange={handleInputChange}
              className={errors.techStack ? styles.inputError : ''}
            />
            {errors.techStack && <span className={styles.error}>{errors.techStack}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="link">项目链接</label>
            <input
              id="link"
              name="link"
              type="text"
              value={formData.link}
              onChange={handleInputChange}
              className={errors.link ? styles.inputError : ''}
            />
            {errors.link && <span className={styles.error}>{errors.link}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="githubLink">GitHub链接</label>
            <input
              id="githubLink"
              name="githubLink"
              type="text"
              value={formData.githubLink}
              onChange={handleInputChange}
              className={errors.githubLink ? styles.inputError : ''}
            />
            {errors.githubLink && <span className={styles.error}>{errors.githubLink}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              精选项目
            </label>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="images">项目图片</label>
            {currentImages && currentImages.length > 0 && (
              <div className={styles.currentImages}>
                {currentImages.map((img, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <img 
                      src={img} 
                      alt={`Project ${index+1}`} 
                    />
                  </div>
                ))}
                <p>当前图片</p>
              </div>
            )}
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <small>可选择多张图片</small>
          </div>

          <div className={styles.formGroupFull}>
            <label htmlFor="abstract">项目概述</label>
            <textarea
              id="abstract"
              name="abstract"
              rows="3"
              value={formData.abstract}
              onChange={handleInputChange}
              className={errors.abstract ? styles.inputError : ''}
            />
            {errors.abstract && <span className={styles.error}>{errors.abstract}</span>}
          </div>

          <div className={styles.formGroupFull}>
            <label htmlFor="description">项目详情</label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? styles.inputError : ''}
            />
            {errors.description && <span className={styles.error}>{errors.description}</span>}
            <small>支持HTML标签</small>
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => navigate('/admin/projects')}
            className={styles.cancelBtn}
            disabled={isSubmitting}
          >
            取消
          </button>
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? '提交中...' : '更新项目'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProject