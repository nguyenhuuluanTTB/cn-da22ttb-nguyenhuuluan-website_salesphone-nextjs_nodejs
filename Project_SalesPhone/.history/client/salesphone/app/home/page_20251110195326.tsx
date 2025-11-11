//Khai báo sẽ chạy component này trên trình duyệt, đồng thời sử dụng hook useState và useEffect,...
"use client"

//file scss này sẽ chỉ được áp dụng riêng cho trang home
import styles from './home.module.scss';
import slideshow1 from './media/abc.jpg';
import slideshow2 from './media/xyz.jpg';
import slideshow3 from './media/eee.jpg';
import slideshow4 from './media/aaa.jpg';
import slideshow5 from './media/bbb.png';
import slideshow6 from './media/ccc.jpg';
import slideshow7 from './media/ddd.jpg';
import slideshow8 from './media/fff.jpg';
import adleft1 from './media/adleft1.png';
import adleft2 from './media/adleft2.png';
import adleft3 from './media/adleft3.png';
import adright3 from './media/adright3.png';
import ad_large from './media/advertisement_large.png';
import Image from 'next/image';

import ChiNhanh1 from './media/Chi nhánh TPHCM.png';
import ChiNhanh2 from './media/Chi nhánh Hà Nội.png';

import { FaShieldAlt, FaExchangeAlt, FaTruck, FaGem } from "react-icons/fa";

import { useState,useEffect } from 'react';

// @ts-ignore: no declaration file for this bootstrap bundle path
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface Phone {
  phone_id: number;
  phone_name: string;
  phone_image: string;
  phone_describe: string;
  price: number;
  rate: number;
  discount: number;
}

export default function Home () {
    const [activeTab, setActiveTab] = useState("tab1");
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("Fetching data from API...");
        fetch("http://localhost:5000/api/phones")
        .then((res) => {
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Data fetched successfully:", data);

            // Chuẩn hóa dữ liệu từ API
            const normalized: Phone[] = data.data.map((p: any) => ({
            phone_id: p.phone_id,
            phone_name: p.phone_name,
            phone_image: p.phone_image,
            phone_describe: p.phone_describe,
            price: Number(p.pricce), // convert string → number
            rate: Number(p.rate),     // convert string → number
            discount: Number(p.discount),
            }));

            setPhones(normalized);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error while fetching data:", err);
            setLoading(false);
        });
    }, []);
    if (loading) return <p className={styles.loading}>Đang tải dữ liệu...</p>;
    return(
        <section className={styles.home}> {/*sử dụng thẻ section sẽ tốt hơn cho seo */}
            
            <div className={styles.container}> {/*Đây là thẻ container chứa toàn bộ nội dung bên trong (hai bên mép thu lại)*/}
                
                <div className={styles.advertisement}> {/*advertisement */}

                    <div className={styles.list_brand}>
                        {/* <Image src={adleft1} alt='quang cao ben trai 1'/>
                        <Image src={adleft2} alt='quang cao ben trai 2'/>
                        <Image src={adleft3} alt='quang cao ben trai 3'/> */}
                        <div className={styles.brand_list}>
                            <div className={styles.brand_item}>
                                <span>IPHONE</span>
                                <span className={styles.arrow}>▶</span>
                            </div>
                            <div className={styles.brand_item}>
                                <span>SAMSUNG</span>
                                <span className={styles.arrow}>▶</span>
                            </div>
                            <div className={styles.brand_item}>
                                <span>OPPO</span>
                                <span className={styles.arrow}>▶</span>
                            </div>
                            <div className={styles.brand_item}>
                                <span>REALME</span>
                                <span className={styles.arrow}>▶</span>
                            </div>
                            <div className={styles.brand_item}>
                                <span>HUAWEI</span>
                                <span className={styles.arrow}>▶</span>
                            </div>
                            <div className={styles.brand_item}>
                                <span>XIAOMI</span>
                                <span className={styles.arrow}>▶</span>
                            </div>
                            <div className={styles.brand_item}>
                                <span>SONY</span>
                                <span className={styles.arrow}>▶</span>
                            </div>
                            </div>

                    </div>
                    
                    <div className={styles.slideshow}>

                        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" >
                            <div className="carousel-inner" style = {{borderRadius: '10px'}} >
                                <div className="carousel-item active">
                                <Image src={slideshow1} style={{width: '900px'}}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow2}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow3}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow4}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow5}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow6}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow7}  alt="..."/>
                                </div>
                                <div className="carousel-item">
                                <Image src={slideshow8}  alt="..."/>
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
                    
                    {/* <div className={styles.adright}>
                        <Image src={adleft1} alt='quang cao ben trai 1'/>
                        <Image src={adleft2} alt='quang cao ben trai 2'/>
                        <Image src={adright3} alt='quang cao ben trai 3'/>
                    </div> */}

                </div>

                {/* <Image src={ad_large} style={{width: '95.5%', margin: '2rem auto'}} alt='quang cao to'/> adlarge */}

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
                            <div className={styles.grid}>
                                {phones.map((phone) => {
                                const discountedPrice =
                                    phone.discount > 0
                                    ? Math.round(phone.price * (1 - phone.discount / 100))
                                    : phone.price;

                                return (
                                    <div key={phone.phone_id} className={styles.card}>
                                        <div className={styles.tragop_discount}> {/*cho phần giảm giá và trả góp */}
                                            <div className={styles.tragop}>Trả góp 0%</div>
                                            <div className={styles.discount_percent}>Giảm giá 16%</div>
                                        </div>
                                        <img
                                            src={phone.phone_image}
                                            alt={phone.phone_name}
                                            className={styles.image}
                                        />

                                        <h2 className={styles.name}>{phone.phone_name}</h2>
                                        <div className={styles.desc}>{phone.phone_describe}</div>

                                        <div className={styles.price_star}> {/*price and star */}

                                            <div className={styles.priceSection}>
                                                {phone.discount > 0 ? (
                                                <>
                                                    <span className={styles.newPrice}>
                                                    {discountedPrice.toLocaleString("vi-VN")} ₫
                                                   
                                                    </span>
                                                    <br/>
                                                    <span className={styles.oldPrice}>
                                                    {phone.price.toLocaleString("vi-VN")} ₫
                                                    </span>
                                                    {/* <span className={styles.discount}>-{phone.discount}%</span> */}
                                                </>
                                                ) : ( 
                                                    
                                                <span className={styles.newPrice}>
                                                    <br/>
                                                    {phone.price.toLocaleString("vi-VN")} ₫
                                                </span>
                                                )}

                                            
                                            </div>

                                            <div className={styles.rate}>
                                                ⭐ {phone.rate.toFixed(1)} / 5
                                            </div>

                                        </div>

                                        <div className={styles.thongso}> 
                                                <span>6.9 iches</span>
                                                <span>12 GB</span>
                                                <span>512 GB</span>
                                        </div>

                                            

                                        
                                    </div>
                                );
                                })}
                            </div>
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


                {/*Bài viết */}
                <div className={styles.container_article}>
                    <h2>Góc bài viết</h2>
                  <div className={styles.articles_wrapper}>
                    <div className={styles.articles_list}>

                      {/* Card template - copy/loop cho các bài */}
                      <article className={styles.article_card} tabIndex={0} aria-label="Bài viết">
                        <figure className={styles.card_media}>
                          <Image src={slideshow4} alt="Bài viết" className={styles.card_img} />
                        </figure>
                        <div className={styles.card_body}>
                          <h3 className={styles.card_title}>iPhone 16 Pro ra mắt — quá nhiều nâng cấp!</h3>
                          <p className={styles.card_excerpt}>Apple chính thức công bố dòng iPhone 16 Pro với chipset mạnh nhất, camera cải tiến và pin lâu hơn — điểm nhấn cho người dùng cao cấp.</p>
                          <div className={styles.card_meta}>
                            <span className={styles.meta_stat}>❤️ 120</span>
                            <span className={styles.meta_stat}>💬 45</span>
                          </div>
                        </div>
                        
                      </article>

                      <article className={styles.article_card} tabIndex={0} aria-label="Bài viết">
                        <figure className={styles.card_media}>
                          <Image src={slideshow4} alt="Bài viết" className={styles.card_img} />
                        </figure>
                        <div className={styles.card_body}>
                          <h3 className={styles.card_title}>iPhone 16 Pro ra mắt — quá nhiều nâng cấp!</h3>
                          <p className={styles.card_excerpt}>Apple chính thức công bố dòng iPhone 16 Pro với chipset mạnh nhất, camera cải tiến và pin lâu hơn — điểm nhấn cho người dùng cao cấp.</p>
                          <div className={styles.card_meta}>
                            <span className={styles.meta_stat}>❤️ 120</span>
                            <span className={styles.meta_stat}>💬 45</span>
                          </div>
                        </div>
                        
                      </article>

                      <article className={styles.article_card} tabIndex={0} aria-label="Bài viết">
                        <figure className={styles.card_media}>
                          <Image src={slideshow4} alt="Bài viết" className={styles.card_img} />
                        </figure>
                        <div className={styles.card_body}>
                          <h3 className={styles.card_title}>iPhone 16 Pro ra mắt — quá nhiều nâng cấp!</h3>
                          <p className={styles.card_excerpt}>Apple chính thức công bố dòng iPhone 16 Pro với chipset mạnh nhất, camera cải tiến và pin lâu hơn — điểm nhấn cho người dùng cao cấp.</p>
                          <div className={styles.card_meta}>
                            <span className={styles.meta_stat}>❤️ 120</span>
                            <span className={styles.meta_stat}>💬 45</span>
                          </div>
                        </div>
                        
                      </article>

                      <article className={styles.article_card} tabIndex={0} aria-label="Bài viết">
                        <figure className={styles.card_media}>
                          <Image src={slideshow4} alt="Bài viết" className={styles.card_img} />
                        </figure>
                        <div className={styles.card_body}>
                          <h3 className={styles.card_title}>iPhone 16 Pro ra mắt — quá nhiều nâng cấp!</h3>
                          <p className={styles.card_excerpt}>Apple chính thức công bố dòng iPhone 16 Pro với chipset mạnh nhất, camera cải tiến và pin lâu hơn — điểm nhấn cho người dùng cao cấp.</p>
                          <div className={styles.card_meta}>
                            <span className={styles.meta_stat}>❤️ 120</span>
                            <span className={styles.meta_stat}>💬 45</span>
                          </div>
                        </div>
                        
                      </article>

                      <article className={styles.article_card} tabIndex={0} aria-label="Bài viết">
                        <figure className={styles.card_media}>
                          <Image src={slideshow4} alt="Bài viết" className={styles.card_img} />
                        </figure>
                        <div className={styles.card_body}>
                          <h3 className={styles.card_title}>iPhone 16 Pro ra mắt — quá nhiều nâng cấp!</h3>
                          <p className={styles.card_excerpt}>Apple chính thức công bố dòng iPhone 16 Pro với chipset mạnh nhất, camera cải tiến và pin lâu hơn — điểm nhấn cho người dùng cao cấp.</p>
                          <div className={styles.card_meta}>
                            <span className={styles.meta_stat}>❤️ 120</span>
                            <span className={styles.meta_stat}>💬 45</span>
                          </div>
                        </div>
                        
                      </article>

                      {/* Duplicate cards hoặc render từ data */}
                      {/* ...existing cards ... */}

                    </div>
                  </div>
                </div>

                <div className={styles.features}>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FaShieldAlt /></div>
                        <div className={styles.featureTitle}>Thương hiệu đảm bảo</div>
                        <div className={styles.featureDesc}>Nhập khẩu, bảo hành chính hãng</div>
                    </div>

                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FaExchangeAlt /></div>
                        <div className={styles.featureTitle}>Đổi trả dễ dàng</div>
                        <div className={styles.featureDesc}>Theo chính sách đổi trả tại FPT Shop</div>
                    </div>

                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FaTruck /></div>
                        <div className={styles.featureTitle}>Giao hàng tận nơi</div>
                        <div className={styles.featureDesc}>Sẵn sàng giao sản phẩm trên phạm vi toàn quốc</div>
                    </div>

                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FaGem /></div>
                        <div className={styles.featureTitle}>Sản phẩm chất lượng</div>
                        <div className={styles.featureDesc}>Đảm bảo tương thích và độ bền cao</div>
                    </div>
                </div>

                <div className={styles.chinhanh}>
                        <div id="carouselExampleFade" className="carousel slide carousel-fade">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className={styles.chinhanh1}>
                                        <div className={styles.nd_chinhanh1}>
                                            <span>Địa chỉ: 350-352 Võ Văn Kiệt, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh.</span>  <br/>
                                            <span>Điện thoại: 028 7108 9666</span>  <br/>
                                            <span>Giờ làm việc : 06:30 - 23:30 hằng ngày.</span>  <br/> 
                                            <span>Liên hệ: 028 7108 9666</span> <br/> <br/>
                                            <span style={{color: '#A70000', fontWeight: 'bold'}}>Nhân viên tận tình, chu đáo, sẵn sàng hỗ trợ khách hàng</span>
                                        </div>
                                        <div className={styles.mapHoverContainer}>
                                            <Image
                                                src={ChiNhanh2}
                                                style={{width: '320px'}}
                                                alt="Chi nhánh 2"
                                                className={styles.chiNhanhImg}
                                            />
                                            
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.4095197901495!2d106.69476190265584!3d10.760342259421886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f13db319cf5%3A0xa7f32d0188629498!2zMzUwIFbDtSBWxINuIEtp4buHdCwgUGjGsOG7nW5nIEPDtCBHaWFuZywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e1!3m2!1sen!2s!4v1762705079419!5m2!1sen!2s"
                                                className={styles.chiNhanhMap}
                                                loading="lazy"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className={styles.chinhanh2}>
                                        <div className={styles.nd_chinhanh2}>
                                            <span>Địa chỉ: 350-352 Võ Văn Kiệt, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh.</span>  <br/>
                                            <span>Điện thoại: 028 7108 9666</span>  <br/>
                                            <span>Giờ làm việc : 06:30 - 23:30 hằng ngày.</span>  <br/> 
                                            <span>Liên hệ: 028 7108 9777</span> <br/> <br/>
                                            <span style={{color: '#A70000', fontWeight: 'bold'}}>Nhân viên tận tình, chu đáo, sẵn sàng hỗ trợ khách hàng</span>
                                        </div>
                                        <div className={styles.mapHoverContainer}>
                                            <Image
                                                src={ChiNhanh2}
                                                style={{width: '320px'}}
                                                alt="Chi nhánh 2"
                                                className={styles.chiNhanhImg}
                                            />
                                            
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.4095197901495!2d106.69476190265584!3d10.760342259421886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f13db319cf5%3A0xa7f32d0188629498!2zMzUwIFbDtSBWxINuIEtp4buHdCwgUGjGsOG7nW5nIEPDtCBHaWFuZywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e1!3m2!1sen!2s!4v1762705079419!5m2!1sen!2s"
                                                className={styles.chiNhanhMap}
                                                loading="lazy"
                                            ></iframe>
                                        </div>

                                    </div>
                                </div>
                                
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className={styles.carousel_control_previous_icon} aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className={styles.carousel_control_next_icon} aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                </div>
                
                

            </div>

            

        </section>
    );
}



