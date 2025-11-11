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

                    <div> {/*up left */}

                        <h2>ĐÂY LÀ TRÊN BÊN TRÁI</h2>
                        
                        <div> {/*right */}

                            <h2>ĐÂY LÀ BÊN PHẢI</h2>

                        </div>
                    </div>

                    <div> {/*bottom left */}

                            <h2>ĐÂY LÀ DƯỚI BÊN TRÁI</h2>

                    </div>

                    

                </div>

            </section>
        </>
    );
}