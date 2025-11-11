"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./signup.module.scss";
import Image from 'next/image';
import icon_gg from "./media/icon_google.png";
import { sendOtp, verifyOtp, loginWithGoogle } from './api/auth';
import PopUp from '../components/Popup/Popup';

// Google sign-in: we'll initialize the Google Identity Services client on the client
// and prompt it when the user clicks the "Continue with Google" area.

export default function signup () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<{ 
        name?: string[], 
        email?: string[], 
        password?: string[], 
        confirmPassword?: string[],
        agreed?: string[]
    }>({});

    const [success, setSuccess] = useState('');

   


    const [popup, setPopup] = useState<{
  visible: boolean;
  message: string;
  type: "success" | "error" | "";
}>({
  visible: false,
  message: "",
  type: "",
});

const [otpPopup, setOtpPopup] = useState({
  visible: false,
  otp: "",
});

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

        const handleGoogleClick = () => {
            if (!(window as any).google || !(window as any).google.accounts || !gsiReady) {
                setPopup({ visible: true, message: 'Google Sign-In chưa sẵn sàng. Vui lòng thử lại sau.', type: 'error' });
                return;
            }
            // Show the credential chooser/prompt
            (window as any).google.accounts.id.prompt();
        };

     
    const handleRegister = async () => {
        const newErrors: {
            name?: string[];
            email?: string[];
            password?: string[];
            confirmPassword?: string[];
            agreed?: string[];
        } = {};

        // Validate name
        if (!name) newErrors.name = ["Tên tài khoản không được để trống"];
        else if (name.length < 3 || name.length > 30) newErrors.name = ["Tên phải từ 3 đến 30 ký tự"];
        else if (!/^[A-Za-z0-9_]+$/.test(name)) newErrors.name = ["Tên không được chứa khoảng trắng hoặc ký tự đặc biệt"];

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

            // Validate confirmPassword
            if (!confirm) newErrors.confirmPassword = ["Vui lòng nhập lại mật khẩu"];
            else if (confirm !== password) newErrors.confirmPassword = ["Mật khẩu xác nhận không khớp"];
        }

         // Validate checkbox
        if (!agreed) newErrors.agreed = ["Bạn phải đồng ý với điều khoản sử dụng"];
        

        // Nếu có lỗi thì setErrors và dừng
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setErrors({});
            const result = await sendOtp({ name, email, password });
            setPopup({ visible: true, message: result.message || "Đã gửi mã OTP!", type: "success" });
            handleOpenOtpPopup(); // Open OTP input popup after sending OTP
            // Note: do NOT clear name/email/password here — keep them until OTP is verified
        } catch (err:any) {
            if (err.error) setErrors(err.error);
            else setPopup({ visible: true, message: err.message || "Đăng ký thất bại", type: "error" });
        }
    };


    const validateConfirmPassword = () => {
    const newErrors = {};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleOpenOtpPopup = () => {
        setOtpPopup({ visible: true, otp: "" });
      };
    
      const handleCloseOtpPopup = () => {
        setOtpPopup({ visible: false, otp: "" });
      };
    
      const handleOtpSubmit = async () => {
  if (!name || !email || !password || !otpPopup.otp) {
    setPopup({ visible: true, message: "Vui lòng điền đầy đủ thông tin", type: "error" });
    return;
  }

  try {
    console.log("Dữ liệu gửi đi:", { name, email, password, otp: otpPopup.otp }); // Log kiểm tra
    const result = await verifyOtp({ name, email, password, otp: otpPopup.otp });
    setPopup({ visible: true, message: result.message || "Xác thực thành công!", type: "success" });
    handleCloseOtpPopup();

    // Reset các input sau khi đăng ký thành công
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setOtpPopup({ visible: false, otp: "" });
    setAgreed(false);
  } catch (err: any) {
    console.error("Lỗi xác thực OTP:", err.message);
    setPopup({ visible: true, message: err.message || "Xác thực OTP thất bại", type: "error" });
  }
};
    
    return(
        <>
            <section className={styles.signup}>
                
                <div className={styles.container}> {/*container */}

                    <div className={styles.title}> {/*title */}

                       <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
                    
                    </div>

                    <div className={styles.greeting_form}> {/*up left */}

                        <div className={styles.greeting}>
                            <span className={styles.greeting_title}>CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI <span style={{color:'#A70000'}}>SALESPHONE 🎉</span></span> 
                            <p>
                                Cập nhật công nghệ mới nhất, trải nghiệm mượt mà,
                                và sở hữu chiếc điện thoại mơ ước của bạn với mức giá  
                                tốt nhất trên thị trường!
                            </p>

                             
                        </div>
                        
                       
                        
                        <div className={styles.form_container}> {/*right */}

                           
                            <div className={styles.form}> {/*Đây là phần form đăng ký*/}
                    
                     <div className="mb-3">
                        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Tên tài khoản <span style = {{color: 'red'}}>*</span></label>
                        <div className="col-sm-12">
                            <input
                                type="text"
                                className="form-control"
                                id="staticEmail"
                                placeholder='Nhập tên tài khoản...'
                                style={{borderColor: 'black'}}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <small style={{ color: "red" }}>{errors.name[0]}</small>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email <span style = {{color: 'red'}}>*</span></label>
                        <div className="col-sm-12">
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

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Mật khẩu <span style = {{color: 'red'}}>*</span></label>
                        <div className="col-sm-12">
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

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="col-sm-8 col-form-label">Xác nhận mật khẩu <span style = {{color: 'red'}}>*</span></label>
                        <div className="col-sm-12">
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder='Nhập lại mật khẩu...'
                                style={{borderColor: 'black'}}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                             {errors.confirmPassword && (
                                <small className="text-danger">{errors.confirmPassword[0]}</small>
                                )}
                        </div>
                    </div>
    

                    <label>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        /> Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của salesphone
                    </label>
                    {errors.agreed && <small style={{ color: "red" }}>{errors.agreed[0]}</small>}

                    

                    <button type="button"  className={styles.btndk} onClick={handleRegister}>Đăng ký</button>
                

                </div> 

                            

                        </div>
                    </div>

                    <div className={styles.loginbtn_google}> {/*bottom left */}
                            <p><span style={{color: 'blue', fontWeight: 'bold', cursor: 'pointer'}}>Đăng nhập</span> hoặc tiếp tục với</p>

                            <div
                                className={styles.continue_with_gg}
                                onClick={handleGoogleClick}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGoogleClick(); }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Image src={icon_gg} style={{display:'inline-block'}} alt="Google icon" width={25} />
                                <span>Continue with Google</span>
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
            {otpPopup.visible && (
  <PopUp
    message={"Nhập mã OTP của bạn"}
    type={""}
    onClose={handleCloseOtpPopup}
    onSubmit={handleOtpSubmit} // Ensure this is passed correctly
    inputValue={otpPopup.otp}
    onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      setOtpPopup({ ...otpPopup, otp: e.target.value })
    }
        confirmDisabled={!otpPopup.otp}
    
  />
)}

            

        </>
    );
}