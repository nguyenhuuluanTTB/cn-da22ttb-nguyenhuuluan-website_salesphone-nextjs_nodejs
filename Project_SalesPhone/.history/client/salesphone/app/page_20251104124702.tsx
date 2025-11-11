'use client';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>🔑 Google Login Test</h1>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log('Success:', credentialResponse);
            setUser(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>

      {user && (
        <pre
          style={{
            marginTop: 20,
            padding: 10,
            background: '#eee',
            borderRadius: 5,
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </main>
  );
}
