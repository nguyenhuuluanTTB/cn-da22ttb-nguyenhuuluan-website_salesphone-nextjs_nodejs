"use client"

import styles from "./user_info.module.scss";
import Image from "next/image";

import { MdAccountCircle,MdOutlinePhone,MdOutlineEmail  } from "react-icons/md";
import { BsGenderTrans } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

export default function UserInfo () {

    return(
        <section className={styles.userinf}>

            <div className={styles.container}>
                
                <div className={styles.account}>
                   
                    <div className={styles.avt_name}>

                        <MdAccountCircle style={{fontSize: '100pt'}}/>
                        <div>
                            <span style={{fontSize: '20pt', fontWeight: 'bold'}}>Nguyễn Văn An</span>
                            <span style={{color: '#939393ff'}}>nguyenvanan@example.com</span>
                            <span style={{color: '#015d15ff', padding: '2px', backgroundColor: '#9ff5b1ff', textAlign: 'center', width: '70%', borderRadius: '5px', fontSize: '10pt', fontWeight: 'bold'}}>Tài khoản đã xác thực</span>
                        </div>

                    </div>
                    <button>Chỉnh sửa</button>
                
                </div>   
                <div className={styles.info}>
                    <div className={styles.title}>
                        <span style={{fontSize:'16pt'}}>Thông tin cá nhân</span>
                        <span style={{fontSize:'10pt'}}>Quản lý thông tin tài khoản của bạn</span>
                    </div>

                    <div className={styles.table}>
                        <table>
                            <tbody >
                                <tr>
                                    <td className="border p-2 font-semibold w-80" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><MdAccountCircle/>Họ và tên</td>
                                    <td className="border p-2 w-80">Nguyễn Hữu Luân</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><MdOutlinePhone/> Số điện thoại</td>
                                    <td className="border p-2">0374057078</td>
                                </tr>
                                {/* <tr>
                                    <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ màn hình</td>
                                    <td className="border p-2">Dynamic AMOLED 2X</td>
                                </tr> */}
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><MdOutlineEmail />Email</td>
                                    <td className="border p-2">nguyenvanan@example.com</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><BsGenderTrans/>Giới tính</td>
                                    <td className="border p-2">Nam</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><CiLocationOn/>Địa chỉ</td>
                                    <td className="border p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Chipset</td>
                                    <td className="border p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Công nghệ NFC</td>
                                    <td className="border p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Dung lượng RAM</td>
                                    <td className="border p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Bộ nhớ trong</td>
                                    <td className="border p-2"></td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Pin</td>
                                    <td className="border p-2"></td>
                                </tr>
                                

                            </tbody>
                        </table>
                    </div>




                </div>   
                <div className={styles.changepass}>
                    changepass
                </div>   
            
            </div> 

        </section>
    )
}