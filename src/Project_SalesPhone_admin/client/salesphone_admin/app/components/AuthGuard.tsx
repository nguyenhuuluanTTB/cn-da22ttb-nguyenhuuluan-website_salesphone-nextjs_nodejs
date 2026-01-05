"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Các route không cần kiểm tra đăng nhập
    const publicRoutes = ['/', '/login'];
    
    if (publicRoutes.includes(pathname)) {
      setIsAuthenticated(true);
      setIsChecking(false);
      return;
    }

    // Kiểm tra token trong localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      setIsChecking(false);
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [pathname, router]);

  // Hiển thị loading khi đang kiểm tra
  if (isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Đang kiểm tra đăng nhập...
      </div>
    );
  }

  // Nếu đã authenticated hoặc là public route, hiển thị children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}
