"use client"

import styles from "./user_info.module.scss";
import Image from "next/image";

import { MdAccountCircle,MdOutlinePhone } from "react-icons/md";

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

                    <div className={styles.name}>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', fontSize: '12pt'}}>
                            <MdAccountCircle/>
                            <span>Họ và tên</span>
                        </div>
                        <span>Nguyễn Văn An</span>
                        
                    </div>

                    

                     <div className={styles.phonenumber}>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', fontSize: '12pt'}}>
                            <MdOutlinePhone/>
                            <span>Số điện thoại</span>
                        </div>
                        <span>0374057078</span>

                    </div>

                     <div className={styles.email}>

                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', fontSize: '12pt'}}>
                            <MdOutlinePhone/>
                            <span>Địa chỉ email</span>
                        </div>
                        <span>nguyenvanan@example.com</span>

                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                    <table >
                        <tbody>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Kích thước màn hình</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Thương hiệu</td>
                                <td className="border p-2"></td>
                            </tr>
                            {/* <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ màn hình</td>
                                <td className="border p-2">Dynamic AMOLED 2X</td>
                            </tr> */}
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Màu sắc</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Camera sau</td>
                                <td className="border p-2">
                                   
                                </td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Camera trước</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Chipset</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ NFC</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Dung lượng RAM</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Bộ nhớ trong</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Pin</td>
                                <td className="border p-2"></td>
                            </tr>
                            

                        </tbody>
                    </table>



                </div>   
                <div className={styles.changepass}>
                    changepass
                </div>   
            
            </div> 

        </section>
    )
}