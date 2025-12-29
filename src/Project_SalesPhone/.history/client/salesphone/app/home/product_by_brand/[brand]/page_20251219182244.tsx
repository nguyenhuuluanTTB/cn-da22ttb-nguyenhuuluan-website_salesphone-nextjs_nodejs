"use client"

import { useState, useEffect } from "react";
import styles from './product_by_brand.module.scss';

export default function product_by_brand (){



    return(
        <section className={styles.product_by_brand}>

            <div className={styles.container}>

                <div className={styles.title}>



                </div>

                <div className={styles.content}>

                    <div className={styles.gridContainer}>

                        <div className={styles.item}></div>
                        <div className={styles.item}></div>

                    </div>

                </div>

            </div>


        </section>
    )
};
