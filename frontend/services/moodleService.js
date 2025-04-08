const API_BASE = 'http://localhost:3000/api';

export const moodleService = {
  async login(username, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  async getUserInfo() {
    const response = await fetch(`${API_BASE}/user/info`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    
    return response.json();
  },

  async getUserCourses() {
    const response = await fetch(`${API_BASE}/user/courses`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    
    return response.json();
  },

  async completeActivity(courseid, cmid) {
    const response = await fetch(`${API_BASE}/progress/complete-activity`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseid,
        cmid,
        completed: 1
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark activity as complete');
    }
    
    return response.json();
  },

  async updateGrade(courseid, itemname, grade) {
    const response = await fetch(`${API_BASE}/grades/update`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseid,
        itemname,
        grade
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update grade');
    }
    
    return response.json();
  }
}; 