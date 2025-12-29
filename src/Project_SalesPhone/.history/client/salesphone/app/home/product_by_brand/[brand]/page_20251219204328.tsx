"use client"
import React from "react";
import { useState, useEffect } from "react";
import styles from './product_by_brand.module.scss';
import iphone from './media/iphone_bg.jpg';

import { VscSettings } from "react-icons/vsc";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export default function product_by_brand ({ params }: PageProps){

    const { brand } = React.use(params);

    return(
        <section className={styles.product_by_brand}>

            <div className={styles.container}>

                <div className={styles.title}>
                    <h1>{brand}</h1>
                    <p>Khám phá dòng sản phẩm iPhone với công nghệ tiên tiến, thiết kế sang trọng và hiệu năng vượt trội.</p>
                </div>

                <div className={styles.content}>

                    <div className={styles.gridContainer}>

                        <div className={`${styles.item} ${styles.filter}`}>

                            <div className={styles.filter_container}>
                            <span className={styles.title_filter_box} ><VscSettings/>Bộ lọc</span>

                                <br/>
                                <select name="" id="">

                                    <option value="">Giá giảm dần</option>
                                    <option value="">Giá tăng dần</option>

                                </select>

                                <span>8 sản phẩm </span>

                            </div>


                        </div>
                        
                        <div className={`${styles.item} ${styles.product}`}>

                            sản phẩm

                        </div>

                    </div>

                </div>

            </div>


        </section>
    )
};
