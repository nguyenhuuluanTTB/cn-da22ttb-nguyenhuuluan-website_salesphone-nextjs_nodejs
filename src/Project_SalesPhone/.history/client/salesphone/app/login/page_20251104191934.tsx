"use client"

import { useState, useEffect, useRef } from 'react';
import styles from './login.module.scss';
import { loginWithGoogle } from './api/login';
import PopUp from '../components/Popup/Popup';

//import phần login 

export default function Login () {

    const [popup, setPopup] = useState<{
        visible: boolean;
        message: string;
        type: "success" | "error" | "";
    }>({
        visible: false,
        message: "",
        type: "",
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{  
        email?: string[], 
        password?: string[], 
    }>({});

    //Phần cho GG <

    const [gsiReady, setGsiReady] = useState(false);
    const gsiInitedRef = useRef(false);

    useEffect(() => {
        // callback that receives the credential from Google
        (window as any).handleCredentialResponse = async (response: any) => {
            console.log('Google credential response (signup):', response);
            try {
                // Use centralized helper to send idToken to backend
                const data = await loginWithGoogle(response.credential);
                console.log('Backend response login-google:', data);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setPopup({ visible: true, message: 'Đăng nhập bằng Google thành công', type: 'success' });
                    window.location.href = '/';
                } else {
                    setPopup({ visible: true, message: data.message || 'Đăng nhập Google thất bại', type: 'error' });
                }
            } catch (err: any) {
                console.error('Error sending credential to backend (loginWithGoogle):', err);
                const message = err?.message || (err && err.message) || 'Đăng nhập Google thất bại';
                setPopup({ visible: true, message, type: 'error' });
            }
        };

                // Prefer Next.js public env, but accept REACT_APP fallback if present (helps local debugging)
                const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || (process.env.REACT_APP_GOOGLE_CLIENT_ID as string) || '';
                console.log('signup: GSI clientId=', clientId);
                try {
                    console.log('signup: window.location.origin=', window.location.origin);
                } catch (e) {
                    console.warn('signup: cannot read window.location.origin', e);
                }
                if (!clientId) {
                    console.warn('Google client id not set (NEXT_PUBLIC_GOOGLE_CLIENT_ID or REACT_APP_GOOGLE_CLIENT_ID)');
                    return;
                }

                const tryInit = () => {
                    if (gsiInitedRef.current) return;
                    if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
                            (window as any).google.accounts.id.initialize({
                                client_id: clientId,
                                callback: (window as any).handleCredentialResponse,
                            });
                            gsiInitedRef.current = true;
                            setGsiReady(true);

                            // If there's a button target in the DOM, render the official Google button
                            try {
                                const btn = document.getElementById('gsi_btn');
                                if (btn && !(btn as any).dataset?.gsiRendered) {
                                    (window as any).google.accounts.id.renderButton(btn, { theme: 'outline', size: 'large' });
                                    (btn as any).dataset.gsiRendered = '1';
                                }
                            } catch (e) {
                                console.warn('Failed to render GSI button automatically', e);
                            }
                        } else {
                        // try again shortly if SDK not yet loaded
                        setTimeout(tryInit, 200);
                    }
                };

                // Load Google Identity Services script if not already present
                if (!(window as any).google) {
                    const scriptId = 'google-identity-script';
                    if (!document.getElementById(scriptId)) {
                        const s = document.createElement('script');
                        s.src = 'https://accounts.google.com/gsi/client';
                        s.async = true;
                        s.defer = true;
                        s.id = scriptId;
                        s.onload = tryInit;
                        document.head.appendChild(s);
                    } else {
                        // if script already exists, still attempt init
                        tryInit();
                    }
                } else {
                    tryInit();
                }
    }, []);

    //Phần cho GG >


    // Phần cho validate<
    const handleRegister = async () => {
        const newErrors: {
            email?: string[];
            password?: string[];
        } = {};

        // Validate email
        if (!email) newErrors.email = ["Email không được để trống"];
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = ["Email không hợp lệ"];

        // Validate password
        if (!password) newErrors.password = ["Mật khẩu không được để trống"];
        else if (password.length !== 8) newErrors.password = ["Mật khẩu phải có 8 ký tự"];
        else {
            if (!/[a-z]/.test(password)) newErrors.password = ["Mật khẩu phải chứa ít nhất một chữ thường"];
            if (!/[A-Z]/.test(password)) newErrors.password = ["Mật khẩu phải chứa ít nhất một chữ in hoa"];
            if (!/[0-9]/.test(password)) newErrors.password = ["Mật khẩu phải chứa ít nhất một chữ số"];
            if (!/[^A-Za-z0-9\s]/.test(password)) newErrors.password = ["Mật khẩu phải chứa ít nhất một ký tự đặc biệt"];

        }


        // Nếu có lỗi thì setErrors và dừng
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setErrors({});
        } catch (err:any) {
            if (err.error) setErrors(err.error);
            else setPopup({ visible: true, message: err.message || "Đăng ký thất bại", type: "error" });
        }
    };
    // Phần cho validate>




    return(
        <>
            <section className={styles.login}>

                <div className={styles.container}> {/*container */}

                    <div className={styles.title}> {/*title */}

                        <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>

                    </div>

                    <div className={styles.form}> {/*form */}

                        <div className={styles.form_email}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email <span style = {{color: 'red'}}>*</span></label>
                        <div >
                            <input 
                                type="email" 
                                className="form-control"  
                                id="exampleFormControlInput1" 
                                placeholder="Nhập địa chỉ email của bạn..."
                                style={{borderColor: 'black'}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <small style={{ color: "red" }}>{errors.email[0]}</small>}
                        </div>
                    </div>

                    <div className={styles.form_password}>
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Mật khẩu <span style = {{color: 'red'}}>*</span></label>
                        <div >
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder='Nhập mật khẩu...'
                                style={{borderColor: 'black'}}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <small style={{ color: "red" }}>{errors.password[0]}</small>}
                        </div>
                    </div>

                    <button type="button"  className={styles.btndk} >Đăng ký</button>

                    </div>

                    <div className={styles.loginbtn_google}> {/*loginbtn_google */}

                        <p><span style={{color: 'gray', fontWeight: 'bold', cursor: 'pointer'}}>Hoặc tiếp tục với</span> </p>

                            <div className={styles.continue_with_gg}>
                                {/* Official GSI button target. The SDK will render a button into this element when initialized. */}
                                <div id="gsi_btn" style={{ display: 'inline-block' }} />

                                {/* Fallback clickable area (kept for older browsers or if GSI fails). */}
                                <div
                                    id="gsi_fallback"
                                    // onClick={handleGoogleClick}
                                    role="button"
                                    tabIndex={0}
                                    // onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGoogleClick(); }}
                                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center'}}
                                >
                                </div>
                            </div>

                    </div>

                </div>

            </section>

            {popup.visible && (
            <PopUp
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ visible: false, message: "", type: "" })}
            />
            )}
        </>
    );
}