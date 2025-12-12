"use client"

import styles from "./user_info.module.scss";

export default function UserInfo () {

    return(
        <section className={styles.userinf}>

            <div className={styles.container}>
                container
                <div className={styles.account}>
                    account
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