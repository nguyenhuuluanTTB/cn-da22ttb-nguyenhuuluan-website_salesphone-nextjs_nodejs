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
    //State để lưu trữ option giá tăng dần hay giảm dần trong thẻ select
    const [priceState, set_priceState] = useState('up');

    console.log('Đang chọn: ', priceState);

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

                                
                                <select
                                    value={priceState}
                                    onChange={(e) => set_priceState(e.target.value as 'up' | 'down')}
                                    >
                                    <option value="down">Giá giảm dần</option>
                                    <option value="up">Giá tăng dần</option>
                                </select>


                                

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
