"use client"

import { useState, useEffect } from "react";
import styles from './product_by_brand.module.scss';

export default function product_by_brand (){



    return(
        <section className={styles.product_by_brand}>

            <div className={styles.container}>

                <div className={styles.title}>

                    <h1>IPHONE</h1>
                    <p>Khám phá dòng sản phẩm iPhone với công nghệ tiên tiến, thiết kế sang trọng và hiệu năng vượt trội.</p>
                </div>

                <div className={styles.content}>

                    <div className={styles.gridContainer}>

                        <div className={`${styles.item} ${styles.filter}`}></div>
                        <div className={`${styles.item} ${styles.product}`}></div>

                    </div>

                </div>

            </div>


        </section>
    )
};
