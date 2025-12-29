const API_BASE_URL = 'http://localhost:5000/api/auth';


export const sendOtp = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const verifyOtp = async ({ name, email, password, otp }) => {
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, otp }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Xác thực OTP thất bại');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async (idToken) => {
  const res = await fetch(`${API_BASE_URL}/login-google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};