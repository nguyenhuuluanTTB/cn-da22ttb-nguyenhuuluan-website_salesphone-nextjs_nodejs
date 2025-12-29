"use client"

import styles from "./user_info.module.scss";
import Image from "next/image";

import { MdAccountCircle } from "react-icons/md";

export default function UserInfo () {

    return(
        <section className={styles.userinf}>

            <div className={styles.container}>
                
                <div className={styles.account}>
                   
                    <div className={styles.avt_name}>

                        <MdAccountCircle style={{fontSize: '100pt'}}/>
                        <div>
                            <span>Nguyễn Văn An</span>
                            <span>nguyenvanan@example.com</span>
                            <span>Tài khoản đã xác thực</span>
                        </div>

                    </div>
                    <button>Chỉnh sửa</button>
                
                </div>   
                <div className={styles.info}>
                    info
                </div>   
                <div className={styles.changepass}>
                    changepass
                </div>   
            
            </div> 

        </section>
    )
}