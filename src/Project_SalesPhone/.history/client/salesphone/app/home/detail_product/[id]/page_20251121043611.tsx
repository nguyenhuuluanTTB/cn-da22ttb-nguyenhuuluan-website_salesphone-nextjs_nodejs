"use client"

import Link from "next/link";

import styles from './detail_product.module.scss';

import { useParams } from "next/navigation";

import mota_S25 from "./media/anhmota_Samsung Galaxy S25 Ultra 12GB 256GB.png";

import Image from "next/image";


import { MdOutlinePhoneIphone, MdDiscount  } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { FaMicrochip } from "react-icons/fa6";

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

                        <div className={styles.container_4content}> {/*hình ảnh mô tả*/}

                            <div className={styles.content}><MdOutlinePhoneIphone style={{border:'2px solid red', padding:'3px', fontSize: '40px', borderRadius:'8px'}}/><span>Nơi cung cấp những điện thoại mới và hot nhất trên thị trường</span></div>
                            <div className={styles.content}><HiShieldCheck style={{border:'2px solid red', padding:'3px', fontSize: '40px', borderRadius:'8px'}}/>
                                <span>Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.</span>
                            </div>
                            <div className={styles.content}><FaMicrochip style={{border:'2px solid red', padding:'3px', fontSize: '40px', borderRadius:'8px'}}/><span>Cung cấp thông số để quý khách hàng tham khảo</span></div>
                            <div className={styles.content}><MdDiscount  style={{border:'2px solid red', padding:'3px', fontSize: '40px', borderRadius:'8px'}}/><span>Nơi cung cấp những điện thoại mới và hot nhất trên thị trường</span></div>
                            

                        </div>

                        <div className={styles.table}> {/*table thông số */}

                            <table >
                                <tbody>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Kích thước màn hình</td>
                                        <td className="border p-2">6.9 inches</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ màn hình</td>
                                        <td className="border p-2">Dynamic AMOLED 2X</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Camera sau</td>
                                        <td className="border p-2">
                                            Camera siêu rộng 50MP<br />
                                            Camera góc rộng 200MP<br />
                                            Camera Tele (5x) 50MP<br />
                                            Camera Tele (3x) 10MP
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Camera trước</td>
                                        <td className="border p-2">12 MP</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Chipset</td>
                                        <td className="border p-2">Snapdragon 8 Elite dành cho Galaxy (3nm)</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ NFC</td>
                                        <td className="border p-2">Có</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Dung lượng RAM</td>
                                        <td className="border p-2">12 GB</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Bộ nhớ trong</td>
                                        <td className="border p-2">256 GB</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Pin</td>
                                        <td className="border p-2">5000 mAh</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Thẻ SIM</td>
                                        <td className="border p-2">2 Nano-SIM + eSIM</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Hệ điều hành</td>
                                        <td className="border p-2">Android 15</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Độ phân giải màn hình</td>
                                        <td className="border p-2">3120 x 1440 pixels (Quad HD+)</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Tính năng màn hình</td>
                                        <td className="border p-2">
                                            120Hz<br />
                                            2600 nits<br />
                                            Corning® Gorilla® Armor 2
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                    </div>

                    <div className={styles.item}>

                        <div className={styles.price}> {/*giá sản phẩm*/}

                            <div className={styles.gia}>
                                <span style={{color: '#A70000', fontWeight: 'bold'}}>Giá sản phẩm</span>
                                <span style={{fontSize: '30pt', fontWeight: 'bold'}}>27.280.000đ</span>
                                <span style={{color: '#919090', fontWeight: 'bold', fontSize: '20pt', textDecoration: 'line-through'}}>33.380.000đ</span>
                            </div>
                            <div className={styles.line}></div>
                            <div>
                                <span style={{color: '#A70000', fontWeight: 'bold'}}>Thu cũ lên đời trợ giá lên đến 20%</span>
                                <ul style={{listStyle: 'disc', display: 'flex', gap: '1rem', flexDirection: 'column'}}>
                                    <li>Liên hệ với hotline cửa hàng</li>
                                    <li>Đến trực tiếp cửa hàng để đội ngũ kỹ thuật kiểm tra và hỗ trợ lên đời</li>
                                </ul>
                            </div>

                        </div>


                        <div className={styles.discount}>

                            <div>
                                <span  style={{color: '#A70000', fontWeight: 'bold'}}>
                                    Ưu đãi Đầu Mùa (New Season Offer)
                                </span>
                                <p>
                                    Khởi động phong cách mới với Ưu đãi Đầu Mùa! Sở hữu ngay các sản phẩm mới nhất, hot nhất  với mức giảm 20% đặc biệt. Đừng bỏ lỡ cơ hội làm mới tủ đồ của bạn ngay hôm nay!
                                </p>
                            </div>
                            <div style={{fontSize: '50pt', fontWeight: 'bold', color: '#A70000'}}>20%</div>

                        </div>

                        <div> {/*nút đặt + nút thêm vào giỏ hàng */}

                            <button></button>
                            <button></button>

                        </div>

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