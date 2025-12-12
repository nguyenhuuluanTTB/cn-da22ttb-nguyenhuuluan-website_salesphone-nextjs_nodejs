"use client"

import Link from "next/link";

import styles from './detail_product.module.scss';

import { useParams } from "next/navigation";

import mota_S25 from "./media/anhmota_Samsung Galaxy S25 Ultra 12GB 256GB.png";

import Image from "next/image";

export default function detail_product () {

    const params = useParams();  // lấy dynamic param từ URL
    const id = params.id;

    return(

        <section className={styles.detail_product}>

            <div className={styles.container}> {/*container */}
                <div className={styles.gridContainer}>
                    
                    <div className={`${styles.item} ${styles.column_left}`}>
                        <h2>Samsung Galaxy S25 Ultra 12GB 256GB</h2>
                        <div>
                            ⭐<span>4.7</span> (39 đánh giá)
                        </div>

                        <Image src={mota_S25} alt="abc"/>

                        <div> {/*hình ảnh mô tả*/}

                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>

                        </div>
                    </div>

                    <div className={styles.item}>

                    </div>

                    <div className={`${styles.item} ${styles.videoads}`}>

                            <iframe width="760" height="415" 
                                src="https://www.youtube.com/embed/3i1OB6wKYms?si=AcCdMug-DLs93t_8" 
                                title="YouTube video player" frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                            </iframe>

                    </div>
                
                </div>
            
            </div>

        </section>

    );
    
}