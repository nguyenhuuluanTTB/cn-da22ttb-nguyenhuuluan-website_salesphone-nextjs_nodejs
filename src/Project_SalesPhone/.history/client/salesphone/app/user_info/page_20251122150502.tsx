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
                            <span style={{fontSize: '20pt', fontWeight: 'bold'}}>Nguyễn Văn An</span>
                            <span style={{color: '#939393ff'}}>nguyenvanan@example.com</span>
                            <span style={{color: 'white', padding: '2px', backgroundColor: 'green', textAlign: 'center'}}>Tài khoản đã xác thực</span>
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