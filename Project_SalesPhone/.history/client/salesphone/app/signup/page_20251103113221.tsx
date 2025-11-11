"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./signup.module.scss";
import Image from 'next/image';
import icon_gg from "./media/icon_google.png";
import { sendOtp } from './api/auth';
import PopUp from '../components/Popup/Popup';

export default function signup () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState<{ 
        name?: string[], 
        email?: string[], 
        password?: string[], 
        confirmPassword?: string[] 
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

     
    const handleRegister = async () => {
        const newErrors: {
            name?: string[];
            email?: string[];
            password?: string[];
            confirmPassword?: string[];
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

        

        // Nếu có lỗi thì setErrors và dừng
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setErrors({});
            const result = await sendOtp({ name, email, password });
            setPopup({ visible: true, message: result.message || "Đăng ký thành công!", type: "success" });

            setName("");
            setEmail("");
            setPassword("");
            setConfirm("");
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
                        <input type="checkbox" /> Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của salesphone
                    </label>

                    

                    <button type="button"  className={styles.btndk} onClick={handleRegister}>Đăng ký</button>
                

                </div> 

                            

                        </div>
                    </div>

                    <div className={styles.loginbtn_google}> {/*bottom left */}
                            <p><span style={{color: 'blue', fontWeight: 'bold', cursor: 'pointer'}}>Đăng nhập</span> hoặc tiếp tục với</p>

                            <div className={styles.continue_with_gg}>
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
        </>
    );
}