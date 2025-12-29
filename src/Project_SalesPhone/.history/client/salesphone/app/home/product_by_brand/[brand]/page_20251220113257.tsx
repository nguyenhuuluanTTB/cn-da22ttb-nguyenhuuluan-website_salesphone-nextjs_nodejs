"use client"
import React from "react";
import { useState, useEffect } from "react";
import styles from './product_by_brand.module.scss';
import iphone from './media/iphone_bg.jpg';

import { VscSettings } from "react-icons/vsc";
import Link from "next/link";
import callAPI from './api/callAPI.js';

interface PageProps {
  params: Promise<{ brand: string }>;
}

interface Phone {
  phone_id: number;
  phone_name: string;
  phone_image: string;
  phone_describe: string;
  price: number;
  rate: number;
  discount: number;
  screen_size: string;
  ram: string;
  rom: string;
  percent: number;
  product_code : string;
}


export default function product_by_brand ({ params }: PageProps){

    const { brand } = React.use(params);
    
    //State để lưu trữ option giá tăng dần hay giảm dần trong thẻ select
    const [priceState, set_priceState] = useState('up');
    const [phones, setPhones] = useState<Phone[]>([]);

    async function getProductByBrand (brand:any){
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Không có token');
            return;
        }

        try {
            const res = await callAPI(token, brand);
            
            console.log('DATA:', res);
        } catch (err) {
            console.error('API ERROR:', err);
        }
    }
    
    useEffect(() => {
       getProductByBrand(brand);
    }, []);


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
                            <div className= {styles.tab_content}> {/*tab_content */}

                                    
                                    <div className={styles.tab_item}>
                                        <div className={styles.grid}>
                                            {phones.map((phone) => {
                                            const discountedPrice =
                                                phone.discount > 0
                                                ? Math.round(phone.price * (1 - phone.discount / 100))
                                                : phone.price;

                                            return (
                                                <Link  key={phone.phone_id} href={`/home/detail_product/${phone.product_code}`} style={{textDecoration: 'none'}}>
                                                    <div  className={styles.card}>
                                                        <div className={styles.tragop_discount}> {/*cho phần giảm giá và trả góp */}
                                                            <div className={styles.tragop}>Trả góp 0%</div>
                                                            
                                                            {phone.percent > 0 && (
                                                                <div className={styles.discount_percent}>Giảm giá {phone.percent}%</div>
                                                            )}
                                                        
                                                        </div>
                                                        
                                                        <img src={phone.phone_image} alt={phone.phone_name} className={styles.image} />

                                                        <h2 className={styles.name}>{phone.phone_name}</h2>
                                                        <div className={styles.desc}>{phone.phone_describe}</div>

                                                        <div className={styles.price_star}> {/*price and star */}

                                                            <div className={styles.priceSection}>
                                                                {phone.discount > 0 ? (
                                                                
                                                                    <>
                                                                        <span className={styles.newPrice}>{discountedPrice.toLocaleString("vi-VN")} ₫</span>
                                                                        <br/>
                                                                        
                                                                        <span className={styles.oldPrice}>{phone.price.toLocaleString("vi-VN")} ₫</span>
                                                                        {/* <span className={styles.discount}>-{phone.discount}%</span> */}
                                                                    </>

                                                                ) : ( <span className={styles.newPrice}><br/>{phone.price.toLocaleString("vi-VN")} ₫</span>)
                                                                
                                                                }

                                                            
                                                            </div>

                                                            <div className={styles.rate}>⭐ {phone.rate.toFixed(1)} / 5</div>

                                                        </div>

                                                        <div className={styles.thongso}><span>{phone.screen_size} iches</span><span>{phone.ram}</span><span>{phone.rom}</span></div>
                                                        
                                                    </div>
                                                </Link>
                                            );
                                            })}
                                        </div>
                                    </div>
                                    
                                    
                                   

                                </div>

                        </div>

                    </div>

                </div>

            </div>


        </section>
    )
};
