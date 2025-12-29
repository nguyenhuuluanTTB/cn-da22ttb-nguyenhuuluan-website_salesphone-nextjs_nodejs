const API_BASE_URL = 'http://localhost:5000/api/auth';

export const loginWithGoogle = async (idToken) => {
  const res = await fetch(`${API_BASE_URL}/login-google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  const data = await res.json();
  if(!res.ok){
      if (data.token) {
        localStorage.setItem('token', data.token);
        throw data;
      }
      return data;
  } 
};

export const login = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(!res.ok){
      if (data.token) {
        localStorage.setItem('token', data.token);
        throw data;
      }
      return data;
    } 
    
};