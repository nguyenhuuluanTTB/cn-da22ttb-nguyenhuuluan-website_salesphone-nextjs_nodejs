"use client"

import Link from "next/link";

import styles from './detail_product.module.scss';

import { useParams } from "next/navigation";

import { useState, useEffect } from "react";

import mota_S25 from "./media/anhmota_Samsung Galaxy S25 Ultra 12GB 256GB.png";

import Image from "next/image";


import { MdOutlinePhoneIphone, MdDiscount, MdAccountCircle   } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { FaMicrochip, FaCartPlus  } from "react-icons/fa6";


interface OnePhone {
    name_product : string;
    rate : number;
    price: number;
    color: string;
    image_des: string;
    screen_size: number;
    front_camera: string;
    rear_camera: string;
    cpu_detail: string;
    operating_system: string;
    chip_nfc: string;
    rom: string;
    ram: string;
    battery: string;
    resolution: string;
    screen_frequency: string;
    percent: number;
    name_promotion: string;
    describe_promotion: string;
}


export default function detail_product () {

    const params = useParams();  // lấy dynamic param từ URL
    const id = params.id;

    const [phone, setPhone] = useState<OnePhone | null>(null);


    const [rating, setRating] = useState(5);

    const labels: Record<number, string> = {
        1: "Tệ",
        2: "Không tốt",
        3: "Ổn",
        4: "Tốt",
        5: "Tuyệt vời"
    };

    const increase = () => {
        setRating((r) => Math.min(5, r + 1));
    };

    const decrease = () => {
        setRating((r) => Math.max(1, r - 1));
    };

    //Phần dữ liệu ảo cho comment
    const reviews = [
    {
      name: "Nguyễn Hữu Luân",
      color: "#7B00FF",
      rating: 3,
      label: "Bình thường",
      comment: "Điện thoại đẹp nhiều tính năng hay",
      date: "16/11/2025"
    },
    {
      name: "Nguyễn Hữu A",
      color: "#FF0000",
      rating: 5,
      label: "Tuyệt vời",
      comment: "Chất lượng dịch vụ tốt, mọi người nên ủng hộ",
      date: "16/11/2025"
    },
    {
      name: "Nguyễn Hữu B",
      color: "#FFD000",
      rating: 5,
      label: "Tuyệt vời",
      comment: "Cảm ơn SalesPhone, sản phẩm tốt, quà tặng đẹp",
      date: "16/11/2025"
    },
    {
      name: "Nguyễn Hữu C",
      color: "#9C6B00",
      rating: 4,
      label: "Tốt",
      comment: "Tốt",
      date: "16/11/2025"
    }
  ];

  useEffect(() => {

    console.log("Fetching data from API for one product...");
    fetch(`http://localhost:5000/api/product/detail_product/${id}`)
    .then((res) => {
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        console.log("Data fetched successfully: ", data);
        //Chuẩn hóa dữ liệu từ API
        const p = data.data;
        const normalized : OnePhone = {
            name_product : p.name_product,
            rate : p.rate,
            price: Number(p.price),
            color: p.color,
            image_des: p.image_url,
            screen_size: p.screen_size,
            front_camera: p.front_camera,
            rear_camera: p.rear_camera,
            cpu_detail: p.cpu_detail,
            operating_system: p.operating_system,
            chip_nfc: p.chip_nfc,
            rom: p.rom,
            ram: p.ram,
            battery: p.battery,
            resolution: p.resolution,
            screen_frequency: p.screen_frequency,
            percent: Number(p.percent),
            name_promotion: p.name_promotion,
            describe_promotion: p.describe_promotion
        }

        setPhone(normalized);
    })
    .catch((err) => {
        console.error("Error while fetching data: ", err);
    });

  }, []);


    return(

        <section className={styles.detail_product}>

            <div className={styles.container}> {/*container */}
                <div className={styles.gridContainer}>
                    
                    <div className={`${styles.item} ${styles.column_left}`}>
                        <h2>{phone?.name_product ?? "Loading..."}</h2>
                        <div>
                            ⭐<span>{phone?.rate ?? "Loading..."}</span>/5 SAO
                        </div>

                        <Image src={phone?.image_des ?? mota_S25} width={500} height={500} alt="abc"/>

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
                                        <td className="border p-2">{phone?.screen_size ?? "Loading..."} iches</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ màn hình</td>
                                        <td className="border p-2">Dynamic AMOLED 2X</td>
                                    </tr> */}
                                    <tr>
                                        <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Camera sau</td>
                                        <td className="border p-2">
                                            {phone?.rear_camera ?? "Loading"}
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

                        <div className={styles.button}> {/*nút đặt + nút thêm vào giỏ hàng */}

                            <button className={styles.buy}>
                                <span>MUA NGAY</span>
                                <span style={{fontSize: '12pt'}}>Có thể chọn giao hàng hoặc đến nhận tại cửa hàng (có quà tại cửa hàng)</span>
                            </button>
                            <button className={styles.addtocart}>
                                <FaCartPlus style={{fontSize: '50pt'}}/> 
                                <span style={{fontWeight:'bold'}}>THÊM VÀO <br/> GIỎ HÀNG</span>
                            </button>

                        </div>

                        <div className={styles.comment_field}> {/* container comment */}
                            <input placeholder="Viết gì đó cho SalesPhone, rất cảm ơn đánh giá của bạn, sẽ giúp SalesPhone tốt hơn..."></input>
                            <div className={styles.rate}> 
                                
                                    {/* Stars */}
                                    <div className={styles.rate_star}>
                                        <div className={styles.stars}>
                                            {Array.from({ length: rating }).map((_, i) => (
                                            <span key={i} className={styles.star}>★</span>
                                            ))}
                                        </div>

                                        {/* Text */}
                                        <div className={styles.text}>{labels[rating]}</div>
                                    </div>

                                    {/* Arrows */}
                                    <div className={styles.arrows}>
                                        <div className={styles.arrow} onClick={increase}>▲</div>
                                        <div className={styles.arrow} onClick={decrease}>▼</div>
                                    </div>

                            </div>

                             <button>Gửi đánh giá</button>
                        </div>


                        <div> {/*comment */}
                                <div style={{ padding: 20 }}>
                                    {reviews.map((item, index) => (
                                        <div key={index} className={styles.cardcmt}>
                                        
                                        {/* Hàng đầu: Avatar + Thông tin */}
                                        <div className={styles.headercmt}>
                                            <div
                                            style={{
                                                width: 45,
                                                height: 45,
                                                borderRadius: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#A70000",
                                                fontWeight: "bold",
                                                fontSize: "2rem",
                                                
                                            }}
                                            >
                                             <MdAccountCircle/>
                                            </div>

                                            <div className={styles.infocmt}>
                                            <div className={styles.topRowcmt}>
                                                <span className={styles.namecmt}>{item.name}</span>

                                                {/* Stars */}
                                                <div className={styles.starscmt}>
                                                {Array.from({ length: item.rating }).map((_, i) => (
                                                    <span key={i} className={styles.starcmt}>★</span>
                                                ))}
                                                </div>

                                                <span className={styles.labelcmt}>{item.label}</span>
                                            </div>
                                            </div>
                                        </div>

                                        {/* Nội dung */}
                                        <div className={styles.commentcmt}>{item.comment}</div>

                                        {/* Ngày */}
                                        <div className={styles.datecmt}>{item.date}</div>
                                        </div>
                                    ))}
                                    </div>
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