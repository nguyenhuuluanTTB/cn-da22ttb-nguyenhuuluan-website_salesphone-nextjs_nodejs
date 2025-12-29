"use client"

import Link from "next/link";

import styles from './detail_product.module.scss';

import { useParams } from "next/navigation";

export default function detail_product () {

    const params = useParams();  // lấy dynamic param từ URL
    const id = params.id;

    return(

        <section className={styles.detail_product}>

            <div className={styles.container}> {/*container */}
                <div className={styles.gridContainer}>
                    
                    <div className={styles.item}>
                        <h2>Samsung Galaxy S25 Ultra 12GB 256GB</h2>
                    </div>

                    <div className={styles.item}>

                    </div>

                    <div className={styles.item}>

                            <iframe width="560" height="315" 
                                src="https://www.youtube.com/embed/3i1OB6wKYms?si=AcCdMug-DLs93t_8" 
                                title="YouTube video player" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>

                    </div>
                
                </div>
            
            </div>

        </section>

    );
    
}