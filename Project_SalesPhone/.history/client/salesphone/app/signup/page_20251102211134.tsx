"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./signup.module.scss";
import Image from 'next/image';
import icon_gg from "./media/icon_google.png";


export default function signup () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState({});

    const handleRegister = () => {
        // TODO: viết logic đăng ký tại đây
        console.log("Register clicked");
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
                            <span className={styles.greeting_title}>CHÀO MỪNG QUÝ KHÁCH <br/> ĐẾN VỚI <span style={{color:'#A70000'}}>SALESPHONE 🎉</span></span> 
                            <p>
                                Cập nhật công nghệ mới nhất, trải nghiệm mượt mà,
                                và sở hữu chiếc điện thoại mơ ước của bạn với mức giá  
                                tốt nhất trên thị trường!
                            </p>

                             
                        </div>
                        
                       
                        
                        <div className={styles.form_container}> {/*right */}

                            <h2>ĐÂY LÀ BÊN PHẢI</h2>
                            <div className={styles.form}> {/*Đây là phần form đăng ký*/}
                    <h2>
                        ĐĂNG KÝ TÀI KHOẢN
                    </h2> <br/>
                     <div className="mb-3">
                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Tên tài khoản <font style = {{color: 'red'}}>*</font></label>
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
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email <font style = {{color: 'red'}}>*</font></label>
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
                        <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Mật khẩu <font style = {{color: 'red'}}>*</font></label>
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
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Xác nhận mật khẩu <font style = {{color: 'red'}}>*</font></label>
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
                            <small className="text-danger">{errors.confirmPassword}</small>
                            )}
                        </div>
                    </div>
                    <br/>

                    <button type="button"  className={styles.btndk} onClick={handleRegister}  >Đăng ký</button>
                

                </div> 

                            

                        </div>
                    </div>

                    <div className={styles.loginbtn_google}> {/*bottom left */}
                            <p><span style={{color: 'blue', fontWeight: 'bold'}}>Đăng nhập</span> hoặc tiếp tục với</p>

                            <div className={styles.continue_with_gg}>
                                <Image src={icon_gg} style={{display:'inline-block'}} alt="Google icon" width={25} />
                                <span>Continue with Google</span>
                            </div>

                    </div>

                    

                </div>

            </section>
        </>
    );
}