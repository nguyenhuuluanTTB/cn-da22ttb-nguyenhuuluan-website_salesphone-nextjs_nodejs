"use client"

import styles from './order.module.scss';

export default function Order () {

    return(
        <section className={styles.order}> {/*order */}

            <div className={styles.container}> {/*container */}

                <h1>Đây là container</h1>
                <div className={styles.gridContainer}>

                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>

                </div>


            </div>

        </section>
    )
}