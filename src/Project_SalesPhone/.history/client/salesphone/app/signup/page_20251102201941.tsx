import Link from "next/link";
import styles from "./signup.module.scss";
import Image from 'next/image';
import icon_gg from "./media/icon_google.png";

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
                            <span className={styles.greeting_title}>CHÀO MỪNG QUÝ KHÁCH <br/> ĐẾN VỚI <span style={{color:'#A70000'}}>SALESPHONE 🎉</span></span> 
                            <p>
                                Cập nhật công nghệ mới nhất, trải nghiệm mượt mà,<br/> 
                                và sở hữu chiếc điện thoại mơ ước của bạn với mức giá <br/> 
                                tốt nhất trên thị trường!
                            </p>

                             
                        </div>
                        
                       
                        
                        <div className={styles.form_container}> {/*right */}

                            <h2>ĐÂY LÀ BÊN PHẢI</h2>
                            <form>
                                <label>Tên tài khoản*</label><br/>
                                <input type="text" placeholder="Nhập tên tài khoản" /><br/>
                                <label>Email*</label><br/>
                                <input type="email" placeholder="Nhập địa chỉ email của bạn" /><br/>
                                <label>Mật khẩu*</label><br/>
                                <input type="password" placeholder="Nhập mật khẩu" /><br/>
                                <label>Xác nhận mật khẩu*</label><br/>
                                <input type="password" placeholder="Nhập lại mật khẩu" />
                                <div className="terms">
                                    <input type="checkbox" />
                                    <label>Tôi đồng ý với điều khoản sử dụng...</label>
                                </div>
                                
                            </form>

                            

                        </div>
                    </div>

                    <div className={styles.loginbtn_google}> {/*bottom left */}
                            <p><span style={{color: 'blue', fontWeight: 'bold'}}>Đăng nhập</span> hoặc tiếp tục với</p>

                            <div className={styles.continue_with_gg}>
                                <Image src={icon_gg} alt="Google icon" width={32} height={32} />

                            </div>

                    </div>

                    

                </div>

            </section>
        </>
    );
}