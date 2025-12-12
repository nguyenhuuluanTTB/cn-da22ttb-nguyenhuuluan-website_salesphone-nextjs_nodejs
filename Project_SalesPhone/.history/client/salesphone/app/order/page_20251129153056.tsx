"use client"

import styles from './order.module.scss';

export default function Order () {

    return(
        <section> {/*order */}

            <div> {/*container */}

                
                <div className={styles.gridContainer}>

                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>

                </div>


            </div>

        </section>
    )
}