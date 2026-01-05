const API_BASE_URL = 'http://localhost:5000/api/auth';

export const loginWithGoogle = async (idToken) => {
  const res = await fetch(`${API_BASE_URL}/login-google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const err = (data && typeof data === 'object') ? data : {};
    throw { status: res.status, ...err };
  }
  else {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }
};

export const login = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const err = (data && typeof data === 'object') ? data : {};
    throw { status: res.status, ...err };
  }
  else {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

};

export const forgotPassword = async (email) => {
  const res = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const verifyForgotOtp = async (email, otp) => {
  const res = await fetch(`${API_BASE_URL}/verify-forgot-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const resetPassword = async (resetToken, newPassword) => {
  const res = await fetch(`${API_BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetToken, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};