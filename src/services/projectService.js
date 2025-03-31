// 项目数据可以暂时存储在这个文件中
// 在实际应用中，这些数据可能来自API

const projects = [
  {
    id: "1",
    title: "个人作品集网站",
    category: "Web开发",
    techStack: ["React", "CSS Modules", "Vite"],
    abstract: "一个响应式个人作品集网站，展示我的项目和技能。",
    description: "<p>这个作品集网站使用React和CSS模块从零开始构建。它具有响应式设计、项目详情页面。</p><p>该网站针对性能和可访问性进行了优化，确保在所有设备上提供流畅的用户体验。</p>",
    images: ["/images/portfolio-1.jpg", "/images/portfolio-2.jpg"],
    featured: true,
    date: "2023",
    link: "https://example.com",
    githubLink: "https://github.com/yourusername/portfolio"
  },
  {
    id: "2",
    title: "电子商务仪表板",
    category: "Web应用程序",
    techStack: ["React", "Redux", "Node.js", "MongoDB"],
    abstract: "一个电子商务平台的管理仪表板，用于管理产品、订单和客户。",
    description: "<p>为电子商务企业创建了一个全功能的管理仪表板，用于管理库存、跟踪订单和分析销售数据。</p><p>该应用程序包括身份验证、基于角色的访问控制和实时通知。</p>",
    images: ["/images/ecommerce-1.jpg", "/images/ecommerce-2.jpg"],
    featured: true,
    date: "2022",
    link: "https://example.com/dashboard",
    githubLink: "https://github.com/yourusername/ecommerce-dashboard"
  },
  // 添加更多项目
];

export const getAllProjects = () => {
  return Promise.resolve(projects);
};

export const getProjectById = (id) => {
  const project = projects.find(p => p.id === id);
  return Promise.resolve(project || null);
};

export const getFeaturedProjects = () => {
  const featured = projects.filter(project => project.featured);
  return Promise.resolve(featured);
};

export const getProjectsByCategory = (category) => {
  const filtered = projects.filter(project => project.category === category);
  return Promise.resolve(filtered);
};

// 管理功能
export const createProject = (projectData) => {
  const newProject = {
    id: (projects.length + 1).toString(),
    ...projectData,
    date: new Date().toISOString().split('T')[0]
  };
  projects.push(newProject);
  return Promise.resolve(newProject);
};

export const updateProject = (id, projectData) => {
  const index = projects.findIndex(project => project.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...projectData };
    return Promise.resolve(projects[index]);
  }
  return Promise.reject(new Error('Project not found'));
};

export const deleteProject = (id) => {
  const index = projects.findIndex(project => project.id === id);
  if (index !== -1) {
    projects.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.reject(new Error('Project not found'));
};