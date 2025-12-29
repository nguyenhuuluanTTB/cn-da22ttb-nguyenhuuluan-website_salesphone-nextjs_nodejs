import Link from "next/link";
import styles from "./signup.module.scss";

export default function signup () {
    return(
        <>
            <section className={styles.signup}>
                
                <div className={styles.container}> {/*container */}

                    <div className={styles.title}> {/*title */}

                       <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
                    
                    </div>

                    <div className={styles.greeting_form}> {/*up left */}

                        <div className={styles.greeting}>
                            <h2>ĐÂY LÀ TRÊN BÊN TRÁI</h2>
                        </div>
                        
                        
                        <div className={styles.form}> {/*right */}

                            <h2>ĐÂY LÀ BÊN PHẢI</h2>
                            <form>
                                <label>Tên tài khoản*</label>
                                <input type="text" placeholder="Nhập tên tài khoản" />
                                <label>Email*</label>
                                <input type="email" placeholder="Nhập địa chỉ email của bạn" />
                                <label>Mật khẩu*</label>
                                <input type="password" placeholder="Nhập mật khẩu" />
                                <label>Xác nhận mật khẩu*</label>
                                <input type="password" placeholder="Nhập lại mật khẩu" />
                                <div className="terms">
                                    <input type="checkbox" />
                                    <label>Tôi đồng ý với điều khoản sử dụng...</label>
                                </div>
                                
                            </form>

                            <button type="submit" className="register-btn">
                                    Đăng ký
                            </button>

                        </div>
                    </div>

                    <div className={styles.loginbtn_google}> {/*bottom left */}

                            <h2>ĐÂY LÀ DƯỚI BÊN TRÁI</h2>

                    </div>

                    

                </div>

            </section>
        </>
    );
}