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
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                </div>
            </div>

        </section>

    );
    
}