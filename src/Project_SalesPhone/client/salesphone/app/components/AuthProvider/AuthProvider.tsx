"use client";

import { useState, useEffect } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      console.log('AuthProvider: Checking token', token ? 'exists' : 'not found');
      
      if (token) {
        setIsAuthenticated(true);
        setShowAuthPopup(false);
      } else {
        setIsAuthenticated(false);
        // Show popup if not authenticated and user hasn't closed it in this session
        const hasClosedPopup = sessionStorage.getItem('authPopupClosed');
        if (!hasClosedPopup) {
          console.log('AuthProvider: No token, showing popup');
          setShowAuthPopup(true);
        }
      }
      setHasCheckedAuth(true);
    };

    // Delay slightly to ensure window is available
    if (typeof window !== 'undefined') {
      checkAuth();
    }

    // Listen for storage changes (e.g., when user logs in from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkAuth();
      }
    };

    // Listen for custom event to show auth popup when protected features are accessed
    const handleShowAuth = () => {
      if (!localStorage.getItem('token')) {
        console.log('AuthProvider: showAuthPopup event received - showing popup');
        // Always show popup when event is triggered, even if user closed it before
        setShowAuthPopup(true);
        // Clear the closed flag so popup can show
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('authPopupClosed');
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('showAuthPopup', handleShowAuth);
      
      // Also check periodically (in case token was set in same tab)
      const interval = setInterval(checkAuth, 2000);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('showAuthPopup', handleShowAuth);
        clearInterval(interval);
      };
    }
  }, []);

  const handleAuthSuccess = () => {
    console.log('AuthProvider: Auth success, hiding popup');
    setIsAuthenticated(true);
    setShowAuthPopup(false);
  };

  const handleClose = () => {
    console.log('AuthProvider: Popup closed by user');
    // Allow closing - user can browse as guest
    setShowAuthPopup(false);
    // Remember that user closed popup in this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('authPopupClosed', 'true');
    }
  };

  // Show loading state briefly
  if (!hasCheckedAuth) {
    return <>{children}</>;
  }

  console.log('AuthProvider: Rendering, showAuthPopup:', showAuthPopup, 'isAuthenticated:', isAuthenticated);

  return (
    <>
      {children}
      {showAuthPopup && !isAuthenticated && (
        <AuthPopup
          onClose={handleClose}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}

