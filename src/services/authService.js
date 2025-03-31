// 简化的认证服务，只支持管理员登录

// 模拟管理员用户数据
const adminUser = {
  id: "admin1",
  email: "admin@example.com",
  name: "管理员",
  role: "admin"
};

// 存储令牌的键名
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'current_user';

// 检查用户是否已认证
export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

// 获取当前登录用户
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

// 登录函数
export const login = async (credentials) => {
  const { email, password } = credentials;
  
  // 这里只允许管理员账号登录
  if (email === "admin@example.com" && password === "admin123") {
    // 创建一个简单的令牌 (在实际应用中应该使用JWT)
    const token = `admin-token-${Date.now()}`;
    
    // 存储令牌和用户信息
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(adminUser));
    
    return adminUser;
  } else {
    throw new Error("无效的凭据");
  }
};

// 注销函数
export const logout = async () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  return true;
};