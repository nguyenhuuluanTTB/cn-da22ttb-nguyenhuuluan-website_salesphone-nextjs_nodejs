//Khai báo sẽ chạy component này trên trình duyệt, đồng thời sử dụng hook useState và useEffect,...
"use client"

// import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useState, useEffect } from 'react';

import Link from "next/link";

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
import adright3 from './media/adright3.png';
import Image from 'next/image';

import { FaShieldAlt, FaExchangeAlt, FaTruck, FaGem, FaRegHeart , FaRegComment } from "react-icons/fa";
import { FiChevronRight, FiGift, FiArrowRight , FiTruck, FiStar} from "react-icons/fi";
import { GoPeople, GoTrophy  } from "react-icons/go";
import { TiTicket } from "react-icons/ti";

import Chatbot from '../components/Chatbot/Chatbot';
import { link } from 'fs';

import getHugeSales from './api/getHugeSales';
import { error } from 'console';



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

export default function Home () {
    const [activeTab, setActiveTab] = useState("tab1");
    const [phones, setPhones] = useState<Phone[]>([]);
    const [phonesHugeSales, setHugeSales] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);

    async function HugeSales(){
        const token = localStorage.getItem('token');
        console.log('Fetching API getHugeSales...');
        const result = await getHugeSales(token);

        if(!result){
            console.error('http error!');
        }
        
        const normalized: Phone[] = result.data.map((p: any) => ({
            phone_id: p.id_product,
            phone_name: p.name_product,
            phone_image: p.image_url,
            phone_describe: p.description_phone,
            price: Number(p.price), // convert string → number
            rate: Number(p.rate),     // convert string → number
            discount: Number(p.id_promotion),
            screen_size: p.screen_size,
            ram: p.ram,
            rom: p.rom,
            percent: Number(p.percent),
            product_code: p.product_code
        }));
        setHugeSales(normalized);
    }
    
    
    useEffect(() => {
        console.log("Fetching data from API...");
        fetch("http://localhost:5000/api/product/getnewproduct")
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
            phone_id: p.id_product,
            phone_name: p.name_product,
            phone_image: p.image_url,
            phone_describe: p.description_phone,
            price: Number(p.price), // convert string → number
            rate: Number(p.rate),     // convert string → number
            discount: Number(p.id_promotion),
            screen_size: p.screen_size,
            ram: p.ram,
            rom: p.rom,
            percent: Number(p.percent),
            product_code: p.product_code
            }));

            setPhones(normalized);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error while fetching data:", err);
            setLoading(false);
        });
        
    }, []);

    useEffect(()=> {
        HugeSales();
    }, []);

    

  
    const [activeTab_article, setActiveTab_article] = useState("all");

   

    const sidebarPosts = [
        { tag: "https://res.cloudinary.com/dnhyyioaf/image/upload/v1763025730/image_title_review_gultcd.png", type: "Đánh giá" , title: "Galaxy Z Fold 6 - Smartphone gập tốt nhất 2024", like: 95, cmt: 32, link: '/article/review/galaxy'},
        { tag: "https://res.cloudinary.com/dnhyyioaf/image/upload/v1763027377/TIP_2_rm7sjr.png", type: "Thủ thuật" , title: "10 mẹo tối ưu pin cho điện thoại Android", like: 156, cmt: 28, link: '/article/tips' },
        { tag: "https://res.cloudinary.com/dnhyyioaf/image/upload/v1763026662/ss_amkilv.png", type: "So sánh" , title: "So sánh iPhone 15 Pro Max vs Samsung S24 Ultra", like: 203, cmt: 67, link: '/article/compare' },
        { tag: "https://res.cloudinary.com/dnhyyioaf/image/upload/v1763025730/image_title_review_gultcd.png", type: "Đánh giá" , title: "Xiaomi 14 Ultra - Camera phone đỉnh cao", like: 87, cmt: 23, link: '/article/review/xiaomi' },
    ];



    if (loading) return <p className={styles.loading}>Đang tải dữ liệu...</p>;


    return(
        <section className={styles.home}>
            
            <div className={styles.wrapper_marquee}>
                <div className={styles.marquee_marquee}>
                    <div className={styles.item_marquee}> <FiGift className={styles.icon_marquee} /> <span>Giảm đến 50% tất cả sản phẩm</span> </div>
                    <div className={styles.dot_marquee}></div>
                    <div className={styles.item_marquee}> <FiGift className={styles.icon_marquee} /> <span>Tặng voucher 500K cho đơn hàng từ 10 triệu</span> </div>
                    <div className={styles.dot_marquee}></div>
                    <div className={styles.item_marquee}><FiTruck className={styles.icon_marquee} /><span>Miễn phí vận chuyển toàn quốc - Giao hàng nhanh 2h</span> </div>
                    <div className={styles.dot_marquee}></div>
                    <div className={styles.item_marquee}><FiStar className={styles.icon_marquee} /> <span>Trả góp 0% - Duyệt nhanh chỉ 5 phút</span> </div>

                    <div className={styles.item_marquee}> <FiGift className={styles.icon_marquee} /> <span>Giảm đến 50% tất cả sản phẩm</span> </div>
                    <div className={styles.dot_marquee}></div>
                    <div className={styles.item_marquee}> <FiGift className={styles.icon_marquee} /> <span>Tặng voucher 500K cho đơn hàng từ 10 triệu</span> </div>
                    <div className={styles.dot_marquee}></div>
                    <div className={styles.item_marquee}><FiTruck className={styles.icon_marquee} /><span>Miễn phí vận chuyển toàn quốc - Giao hàng nhanh 2h</span> </div>
                    <div className={styles.dot_marquee}></div>
                    <div className={styles.item_marquee}><FiStar className={styles.icon_marquee} /> <span>Trả góp 0% - Duyệt nhanh chỉ 5 phút</span> </div>
                </div>
            </div>
            
            
            <div className={styles.container}> {/*Đây là thẻ container chứa toàn bộ nội dung bên trong (hai bên mép thu lại)*/}

                <div className={styles.advertisement}> {/*advertisement */}
                    
                    <div className={styles.gridContainer}> {/*Grid */}
                        

                        <div className={styles.item}>
                            
                            <div className={styles.list_brand}>
                                {/* <Image src={adleft1} alt='quang cao ben trai 1'/>
                                <Image src={adleft2} alt='quang cao ben trai 2'/>
                                <Image src={adleft3} alt='quang cao ben trai 3'/> */}
                                <div className={styles.brand_list}>
                                        <h6 style={{textAlign: 'center', color: '#A70000', fontWeight: 'bold'}}>THƯƠNG HIỆU</h6>
                                        {/* href={`/home/detail_product/${phone.product_code}`} */}
                                        <Link href={`home/product_by_brand/IPHONE`}><div className={styles.brand_item}><span>IPHONE</span><span className={styles.arrow}><FiChevronRight/></span></div></Link>
                                        
                                        <Link href={`home/product_by_brand/SAMSUNG`}><div className={styles.brand_item}><span>SAMSUNG</span><span className={styles.arrow}><FiChevronRight/></span></div></Link>
                                        
                                        <Link href={`home/product_by_brand/OPPO`}><div className={styles.brand_item}><span>OPPO</span><span className={styles.arrow}><FiChevronRight/></span></div></Link>
                                        
                                        <Link href={`home/product_by_brand/REALME`}><div className={styles.brand_item}><span>REALME</span><span className={styles.arrow}><FiChevronRight/></span></div></Link>
                                        
                                        <Link href={`home/product_by_brand/HUAWEI`}><div className={styles.brand_item}><span>HUAWEI</span><span className={styles.arrow}><FiChevronRight/></span></div></Link>
                                        
                                        <Link href={`home/product_by_brand/XIAOMI`}><div className={styles.brand_item}><span>XIAOMI</span><span className={styles.arrow}><FiChevronRight/></span></div></Link>
                                       
                                        <Link href={`home/product_by_brand/SONY`}><div className={styles.brand_item}><span>SONY</span><span className={styles.arrow}><FiChevronRight/></span></div></Link>
                                </div>
                            
                            </div>

                        </div>


                        <div className={styles.item}>

                            <div className={styles.slideshow} style={{width: '100%'}} >

                                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" >
                                    <div  style = {{borderRadius: '10px'}} >
                                        <div className="carousel-item active" ><Image src={slideshow1}  alt="..." /></div>
                                        <div className="carousel-item"><Image src={slideshow2}  alt="..." /></div>                                       
                                        <div className="carousel-item"><Image src={slideshow3}   alt="..."/></div>                                       
                                        <div className="carousel-item"><Image src={slideshow4}  alt="..."/></div>                                       
                                        <div className="carousel-item"><Image src={slideshow5}   alt="..."/></div>                                       
                                        <div className="carousel-item"><Image src={slideshow6}  alt="..."/></div>                                       
                                        <div className="carousel-item"><Image src={slideshow7}   alt="..."/></div>                                        
                                        <div className="carousel-item"><Image src={slideshow8}  alt="..."/></div>
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

                        </div>


                        <div className={`${styles.item} ${styles.item3}`}>

                            <div className={styles.adright}>
                                <Image src={adleft1} alt='quang cao ben trai 1'/>
                                <Image src={adleft2} alt='quang cao ben trai 2'/>
                                <Image src={adright3} alt='quang cao ben trai 3'/>
                            </div>

                        </div>
                    
                    
                    
                    </div>
                </div>


                <div className={styles.containerMayMan}>
                    {/* Left icon */}
                    <div className={styles.iconWrapMayMan}><div className={styles.iconCircleMayMan}><FiGift size={36} color="#fff" /></div></div>

                    {/* Content */}
                    <div className={styles.contentMayMan}>
                        <h3 className={styles.titleMayMan}>Vòng Quay May Mắn 🎁</h3>
                        <p className={styles.descMayMan}>Nhận voucher lên đến <span className={styles.highlightMayMan}>5.000.000đ</span></p>
                        <div className={styles.benefitsMayMan}><span>✅ 100% trúng thưởng</span><span>🎯 Miễn phí</span></div>
                        {/* Button */}
                        <button className={styles.spinBtnMayMan}>Quay ngay <FiArrowRight size={16} /></button>
                    </div>

                    {/* Footer Info */}
                    <div className={styles.footerMayMan}>
                        <div className={styles.footerItemMayMan}>
                            <div style={ {display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center'}}>
                                <div style={{backgroundColor: '#c4dfffff', padding: '5px', borderRadius: '7px', fontSize: '18pt', color: '#6d6affff'}}>< GoPeople /></div>
                                <span style={{fontSize: '12pt', color: '#787878ff'}}>Người chơi hôm nay</span>
                            </div> 
                            <span style={{fontSize: '30pt'}}>12,458</span>
                        </div>
                        <div className={styles.dividerMayMan}></div>
                        
                        <div className={styles.footerItemMayMan}>
                            <div style={ {display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center'}}>
                                <div style={{backgroundColor: '#fff2c4ff', padding: '5px', borderRadius: '7px', fontSize: '18pt', color: '#ff5b5bff'}}>< GoTrophy /></div>
                                <span style={{fontSize: '12pt', color: '#787878ff'}}>Giải thưởng đã trao</span>
                            </div>
                            <span style={{fontSize: '30pt'}}>8,921</span>
                        </div>
                        
                        <div className={styles.dividerMayMan}></div>
                        <div className={styles.footerItemMayMan}>
                            <div style={ {display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center'}}>
                                <div style={{backgroundColor: '#c2ffc9ff', padding: '5px', borderRadius: '7px', fontSize: '18pt', color: '#fc7d2eff'}}>< TiTicket  /></div>
                                <span style={{fontSize: '12pt', color: '#787878ff'}}>Lượt quay còn lại</span>
                            </div>
                            <span className={styles.remainingMayMan} style={{fontSize: '30pt'}}>1</span>
                        </div>
                    </div>
                </div>
                



                {/* <Image src={ad_large} style={{width: '95.5%', margin: '2rem auto'}} alt='quang cao to'/> adlarge */}

                <div className={styles.tab_container} style={{backgroundColor: '#A70000'}}> {/*tab_container */}

                    <div className={styles.container_flashsales}>
                        <div className={styles.iconWrapper}>
                            <span role="img" aria-label="flash" className={styles.icon}>⚡</span>
                        </div>
                        <div className={styles.textWrapper}>
                            <div className={styles.title}>HUGE DISCOUNT</div>
                            <div className={styles.subtitle}>Giá sốc từng giờ - Nhanh tay mua những chiếc điện thoại được giảm giá mạnh nhất</div>
                        </div>
                        {/* <div className={styles.timerWrapper}>
                            <div className={styles.timeBox}>02</div><span className={styles.colon}>:</span><div className={styles.timeBox}>24</div><span className={styles.colon}>:</span><div className={styles.timeBox}>32</div>
                        </div> */}
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
                        )}
                        
                        {activeTab === "tab2" && (<div className={styles.tab_item}><p>Danh sách deal sốc hôm nay...</p></div>)}
                        
                        {activeTab === "tab3" && (<div className={styles.tab_item}><p>Danh sách deal cuối tuần...</p></div>)}

                    </div>

                </div>
                
                
                <div className={styles.tab_container}> {/*tab_container */}

                    <div className={styles.tab_header}> {/*tab_header */}
                        <button className={activeTab === "tab1" ? styles.active : ""} onClick={() => setActiveTab("tab1")}>SẢN PHẨM MỚI NHẤT</button>
                        
                        <button className={activeTab === "tab2" ? styles.active : ""} onClick={() => setActiveTab("tab2")}>DEAL SỐC HÔM NAY GIẢM ĐẾN 50%</button>
                        
                        <button className={activeTab === "tab3" ? styles.active : ""} onClick={() => setActiveTab("tab3")}>DEAL SỐC CUỐI TUẦN</button>
                    </div>

                    <div className= {styles.tab_content}> {/*tab_content */}

                         {activeTab === "tab1" && (
                        <div className={styles.tab_item}>
                            <div className={styles.grid}>
                                {phones.map((phone) => {
                                
                                const discountedPrice = phone.discount > 0 ? Math.round(phone.price * (1 - phone.discount / 100)) : phone.price;

                                return (
                                    <div key={phone.phone_id} className={styles.card}>
                                        <div className={styles.tragop_discount}> {/*cho phần giảm giá và trả góp */}
                                            <div className={styles.tragop}>Trả góp 0%</div>
                                             {phone.percent > 0 && (
                                                <div className={styles.discount_percent}>Giảm giá {phone.percent}%</div>
                                            )}
                                        </div>
                                        
                                        <img src={phone.phone_image} alt={phone.phone_name} className={styles.image}/>

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
                                                ) : (  
                                                    <span className={styles.newPrice}><br/>{phone.price.toLocaleString("vi-VN")} ₫</span>
                                                )}
                                           
                                            </div>

                                            <div className={styles.rate}>⭐ {phone.rate.toFixed(1)} / 5</div>

                                        </div>

                                        <div className={styles.thongso}><span>{phone.screen_size} iches</span><span>{phone.ram}</span><span>{phone.rom}</span></div>

                                    </div>
                                );
                                })}
                            </div>
                        </div>
                        )}
                        
                        {activeTab === "tab2" && (<div className={styles.tab_item}><p>Danh sách deal sốc hôm nay...</p></div>)}
                        
                        {activeTab === "tab3" && (<div className={styles.tab_item}><p>Danh sách deal cuối tuần...</p></div>)}

                    </div>

                </div>


                <section className={styles.wrapper_baiviet}>
                    <div className={styles.header_baiviet}>
                        
                        <div className={styles.container_baiviet}>
                           
                            <div className={styles.iconWrapper}><span role="img" aria-label="flash" className={styles.icon}>📝</span></div>
                            
                            <div className={styles.textWrapper}>
                                <div className={styles.title}>BÀI VIẾT</div>
                                <div className={styles.subtitle}>Cung cấp thông tin về công nghệ</div>
                            </div>

                            <a className={styles.viewAll} href="#">Xem tất cả →</a>
                             
                            
                        </div>
                        
                    </div>


                    

                    <div className={styles.content}>
                        
                        <div className={styles.sliderArea}>
                            <br/>
                            <div className={styles.tagFeatured}>🔥 Nổi bật</div>

                            <div className={styles.slider}>
                                
                                <Link href={'/article/noibac'}>
                                    <div className={styles.sliderCard}>
                                        <Image src={slideshow3} alt="news" width={830} height={200} />
                                        <div className={styles.sliderInfo}>
                                            <h3>iPhone 16 Pro ra mắt – quá nhiều nâng cấp đáng giá</h3>
                                            <p>Apple chính thức công bố dòng iPhone 16 Pro với chip A18 Pro mạnh mẽ...</p>

                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <div className={styles.meta}>
                                        
                                                    <span>12/11/2024</span>
                                                </div>

                                                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}} className={styles.social}>
                                                    <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><FaRegHeart />&nbsp; 120</span>&nbsp; <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><FaRegComment/>&nbsp;45</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                       
                        <div className={styles.sidebar}>
                            {sidebarPosts.map((post, i) => (
                                <Link href={post.link}>
                                    <div key={i} className={styles.sidebarCard}>
                                        <div className={styles.tag}> <Image src={post.tag} alt="Galaxy Z Fold 6" width={70} height={70}/> </div> 
                                        
                                        <div className={styles.sidebarContent}>
                                            <div style={{marginBottom: '5px'}}><span style={{padding: '3px 5px', backgroundColor: '#decdcdff', color: '#A70000', fontSize: '8pt', borderRadius: '3px'}}>{post.type}</span></div>
                                            <h4>{post.title}</h4>
                                            <p className={styles.iconLine}>< FaRegHeart /> {post.like}  <FaRegComment/> {post.cmt}</p>
                                        </div>
                                    

                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>


                {/*Bài viết */}
                {/* <div className={styles.container_article}>
                    <div className={styles.tab_header} style={{color: '#A70000', marginLeft:'2rem', fontSize: '13pt'}}> 
                            BÀI VIẾT CÔNG NGHỆ
                    </div>
                  <div className={styles.articles_wrapper}>
                    <div className={styles.articles_list}>

                     
                      <article className={styles.article_card} tabIndex={0} aria-label="Bài viết">
                        <figure className={styles.card_media}>
                          <Image src={slideshow1} alt="Bài viết" className={styles.card_img} />
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
                          <Image src={slideshow2} alt="Bài viết" className={styles.card_img} />
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
                          <Image src={slideshow3} alt="Bài viết" className={styles.card_img} />
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
                          <Image src={slideshow5} alt="Bài viết" className={styles.card_img} />
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

                    

                    </div>
                  </div>
                </div> */}

                <section className={styles.section}>
                    <div className={styles.quansang}></div>
                    
                    <div className={styles.badge}><span>⚡ Công nghệ hiện đại • Uy tín hàng đầu</span></div>
                    
                    <h1 className={styles.title}>
                        <span style={{fontSize: '40pt'}}>Bạn muốn tìm hiểu thêm về</span> <br />

                        <span className={styles.highlight} style={{fontSize: '40pt'}}>SalesPhone?</span>
                    </h1>

                    <p className={styles.description}>
                        Khám phá những sản phẩm công nghệ hàng đầu với dịch vụ tư vấn chuyên nghiệp và tận tâm.
                        Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho khách hàng.
                    </p>

                    <div className={styles.buttons}>
                        <a href="/ve-chung-toi" className={styles.btnPrimary}>Tìm hiểu ngay →</a>
                        <a href="/lien-he" className={styles.btnSecondary}>Liên hệ tư vấn</a>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>10,000+</div>
                            <div className={styles.statLabel}>Khách hàng tin tưởng</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>98%</div>
                            <div className={styles.statLabel}>Cuộn xuống đánh giá hài lòng</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>24/7</div>
                            <div className={styles.statLabel}>Hỗ trợ liên tục</div>
                        </div>
                    </div>
                </section>

                <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Tại sao chọn chúng tôi?</h1>
                
                <p style={{textAlign: 'center', color: '#555', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>Chúng tôi mang đến những giá trị vượt trội cho khách hàng</p>


                <div className={styles.features}>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FaShieldAlt /></div>
                        <div className={styles.featureTitle}>Thương hiệu đảm bảo</div>
                        <div className={styles.featureDesc}>Nhập khẩu, bảo hành chính hãng</div>
                    </div>

                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FaExchangeAlt /></div>
                        <div className={styles.featureTitle}>Đổi trả dễ dàng</div>
                        <div className={styles.featureDesc}>Theo chính sách đổi trả tại SalesPhone</div>
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

                
            </div>

            {/* Chatbot */}
            <Chatbot />
        </section>
    );
}



