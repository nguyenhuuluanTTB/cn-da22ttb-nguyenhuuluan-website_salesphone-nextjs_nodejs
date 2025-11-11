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
    console.log('Sending OTP verification:', { name, email, password, otp });
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, otp: otp.toString() }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.get('content-type'));

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) throw new Error(data.message || 'Xác thực OTP thất bại');
    return data;
  } catch (error) {
    console.error('Frontend verifyOtp error:', error);
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