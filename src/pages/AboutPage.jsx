import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.intro}>
        <h1>关于我</h1>
        <div className={styles.bioContent}>
          <div className={styles.bioImage}>
            <img src="/images/profile-photo.jpg" alt="个人照片" />
          </div>
          <div className={styles.bioText}>
            <p>在这里介绍您自己，包括您的背景、专业领域和兴趣。</p>
            <p>可以添加您的教育背景和职业经历的更多详细信息。</p>
          </div>
        </div>
      </section>
      
      <section className={styles.skills}>
        <h2>技能与专长</h2>
        <div className={styles.skillCategories}>
          <div className={styles.skillCategory}>
            <h3>前端开发</h3>
            <ul>
              <li>React</li>
              <li>JavaScript/TypeScript</li>
              <li>HTML/CSS</li>
              <li>响应式设计</li>
            </ul>
          </div>
          <div className={styles.skillCategory}>
            <h3>后端开发</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>RESTful API</li>
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
      
      <section className={styles.experience}>
        <h2>工作经验</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2022 - 至今</div>
            <div className={styles.timelineContent}>
              <h3>高级开发工程师</h3>
              <p>公司名称</p>
              <p>工作职责和成就的简要描述。</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2019 - 2022</div>
            <div className={styles.timelineContent}>
              <h3>软件开发工程师</h3>
              <p>公司名称</p>
              <p>工作职责和成就的简要描述。</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.education}>
        <h2>教育背景</h2>
        <div className={styles.educationItem}>
          <h3>计算机科学学士</h3>
          <p>大学名称 | 2015 - 2019</p>
          <p>相关课程和成就的简要描述。</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;