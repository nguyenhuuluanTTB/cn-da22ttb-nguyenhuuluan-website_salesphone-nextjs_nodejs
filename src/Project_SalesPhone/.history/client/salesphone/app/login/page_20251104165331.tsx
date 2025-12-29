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

                    <div> {/*form */}

                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email <span style = {{color: 'red'}}>*</span></label>
                        <div className="col-sm-5">
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

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">Mật khẩu <span style = {{color: 'red'}}>*</span></label>
                        <div className="col-sm-12">
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


                    </div>

                    <div> {/*loginbtn_google */}


                    </div>

                </div>

            </section>
        </>
    );
}