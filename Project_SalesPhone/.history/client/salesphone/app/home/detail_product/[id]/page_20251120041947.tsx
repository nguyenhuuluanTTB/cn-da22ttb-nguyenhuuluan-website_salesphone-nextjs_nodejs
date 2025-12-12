"use client"

import Link from "next/link";

import styles from './detail_product.module.scss';

import { useParams } from "next/navigation";

export default function detail_product () {

    const params = useParams();  // lấy dynamic param từ URL
    const id = params.id;

    return(

        <section>

            <div> {/*container */}
                <div className={styles.gridContainer}>
                    <div className={styles.item}>1</div>
                    <div className={styles.item}>2</div>
                    <div className={styles.item}>3</div>
                </div>
            </div>

        </section>

    );
    
}