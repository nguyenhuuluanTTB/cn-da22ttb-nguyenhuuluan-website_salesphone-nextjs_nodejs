"use client"

import { useState, useEffect } from 'react';
import styles from './login.module.scss';

//import phần login 

export default function Login () {
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
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* {errors.email && <small style={{ color: "red" }}>{errors.email[0]}</small>} */}
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
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* {errors.password && <small style={{ color: "red" }}>{errors.password[0]}</small>} */}
                        </div>
                    </div>

                    <button type="button"  className={styles.btndk} >Đăng ký</button>

                    </div>

                    <div> {/*loginbtn_google */}

                        <p><span style={{color: 'blue', fontWeight: 'bold', cursor: 'pointer'}}>Đăng nhập</span> hoặc tiếp tục với</p>

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
        </>
    );
}