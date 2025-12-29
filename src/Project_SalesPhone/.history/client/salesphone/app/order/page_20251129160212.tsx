"use client"

import styles from './order.module.scss';

export default function Order () {

    return(
        <section className={styles.order}> {/*order */}

            <div className={styles.container}> {/*container */}

                <h1>Đây là container</h1>
                <div className={styles.gridContainer}>

                    <div className={styles.item}>
                        
                        <div> {/*Địa chỉ giao hàng */}
                            <h5>Địa chỉ giao hàng</h5>
                            <div>
                                <span>Tỉnh/Thành phố *</span>
                                <div>
                                    <select>

                                        <option>Chọn tỉnh/thành</option>
                                        <option></option>
                                        <option></option>

                                    </select>
                                </div>
                            </div>
                            <div>
                                <div>

                                </div>
                            </div>
                            <div>
                                <div>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.item}>

                    </div>

                </div>


            </div>

        </section>
    )
}