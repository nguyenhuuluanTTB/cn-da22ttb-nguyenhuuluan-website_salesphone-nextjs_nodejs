//Khai báo sẽ chạy component này trên trình duyệt, đồng thời sử dụng hook useState và useEffect,...
"use client"

//file scss này sẽ chỉ được áp dụng riêng cho trang home
import styles from './home.module.scss';
import slideshow1 from './media/slideshow1.png';
import adleft1 from './media/adleft1.png';
import adleft2 from './media/adleft2.png';
import adleft3 from './media/adleft3.png';
import adright3 from './media/adright3.png';
import ad_large from './media/advertisement_large.png';
import Image from 'next/image';

import { useState,useEffect } from 'react';

// @ts-ignore: no declaration file for this bootstrap bundle path
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Home () {
    const [activeTab, setActiveTab] = useState("tab1");
    
    return(
        <section className={styles.home}> {/*sử dụng thẻ section sẽ tốt hơn cho seo */}
            
            <div className={styles.container}> {/*Đây là thẻ container chứa toàn bộ nội dung bên trong (hai bên mép thu lại)*/}
                
                <div className={styles.advertisement}> {/*advertisement */}

                    <div className={styles.adleft}>
                        <Image src={adleft1} alt='quang cao ben trai 1'/>
                        <Image src={adleft2} alt='quang cao ben trai 2'/>
                        <Image src={adleft3} alt='quang cao ben trai 3'/>
                    </div>
                    
                    <div className={styles.slideshow}>

                        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" >
                            <div className="carousel-inner" style = {{borderRadius: '10px'}} >
                                <div className="carousel-item active">
                                <Image src={slideshow1}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow1}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow1}  alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                    
                    <div className={styles.adright}>
                        <Image src={adleft1} alt='quang cao ben trai 1'/>
                        <Image src={adleft2} alt='quang cao ben trai 2'/>
                        <Image src={adright3} alt='quang cao ben trai 3'/>
                    </div>

                </div>

                <Image src={ad_large} style={{width: '95.5%', margin: '2rem auto'}} alt='quang cao to'/> {/*adlarge */}

                <div className={styles.tab_container}> {/*tab_container */}

                    <div className={styles.tab_header}> {/*tab_header */}
                        <button
                            className={activeTab === "tab1" ? styles.active : ""}
                            onClick={() => setActiveTab("tab1")}
                        >
                            SẢN PHẨM MỚI NHẤT
                        </button>
                        <button
                            className={activeTab === "tab2" ? styles.active : ""}
                            onClick={() => setActiveTab("tab2")}
                        >
                            DEAL SỐC HÔM NAY GIẢM ĐẾN 50%
                        </button>
                        <button
                            className={activeTab === "tab3" ? styles.active : ""}
                            onClick={() => setActiveTab("tab3")}
                        >
                            DEAL SỐC CUỐI TUẦN
                        </button>

                    </div>

                    <div className= {styles.tab_content}> {/*tab_content */}

                         {activeTab === "tab1" && (
                        <div className={styles.tab_item}>
                            <h3>Xiaomi 14T Pro 5G 512GB Chính Hãng</h3>
                            <p className={styles.price}>13.990.000 đ</p>
                            <p className={styles.old_price}>17.670.000 đ</p>
                        </div>
                        )}
                        {activeTab === "tab2" && (
                        <div className={styles.tab_item}>
                            <p>Danh sách deal sốc hôm nay...</p>
                        </div>
                        )}
                        {activeTab === "tab3" && (
                        <div className={styles.tab_item}>
                            <p>Danh sách deal cuối tuần...</p>
                        </div>
                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}



