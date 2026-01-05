type LoginPayload = { username: string; password: string };

const handleResponse = async (res: Response) => {
  const ct = res.headers.get('content-type') || '';
  if (!res.ok) {
    try { return Promise.reject(ct.includes('application/json') ? await res.json() : await res.text()); }
    catch { return Promise.reject({ message: 'Request failed' }); }
  }
  return ct.includes('application/json') ? res.json() : res.text();
};

export const login = async (payload: LoginPayload) => {
  const res = await fetch('http://localhost:8000/account/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  return handleResponse(res);
};

export default { login };
