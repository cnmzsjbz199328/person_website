import React, { useState } from 'react';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: false, error: null });
    
    // 这里可以添加实际发送表单的逻辑
    // 模拟请求
    setTimeout(() => {
      // 模拟成功
      setFormStatus({ submitted: false, success: true, error: null });
      
      // 清空表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // 成功消息几秒后消失
      setTimeout(() => {
        setFormStatus({submitted: false, success: false, error: null});
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className={styles.contactPage}>
      <h1>联系我</h1>
      
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h2>联系方式</h2>
          <p>欢迎通过以下方式与我联系</p>
          
          <div className={styles.contactMethods}>
            <div className={styles.contactMethod}>
              <span className={styles.icon}>📧</span>
              <span>your.email@example.com</span>
            </div>
            <div className={styles.contactMethod}>
              <span className={styles.icon}>📞</span>
              <span>+86 123 4567 8910</span>
            </div>
          </div>
          
          <div className={styles.socialLinks}>
            <h3>社交媒体</h3>
            <div className={styles.socialIcons}>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                LinkedIn
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {formStatus.success && (
            <div className={styles.successMessage}>
              消息已成功发送！我会尽快回复您。
            </div>
          )}
          
          {formStatus.error && (
            <div className={styles.errorMessage}>
              {formStatus.error}
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">电子邮箱</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="subject">主题</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">消息</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={formStatus.submitted}
          >
            {formStatus.submitted ? '发送中...' : '发送消息'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;