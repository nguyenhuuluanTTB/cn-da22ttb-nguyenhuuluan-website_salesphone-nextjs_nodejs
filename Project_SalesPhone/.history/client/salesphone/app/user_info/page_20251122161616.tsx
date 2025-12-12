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


                    <table>
                        <tbody >
                            <tr>
                                <td className="border p-2 font-semibold w-40">Họ và tên</td>
                                <td className="border p-2 w-40">Nguyễn Hữu Luân</td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold" >Thương hiệu</td>
                                <td className="border p-2"></td>
                            </tr>
                            {/* <tr>
                                <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ màn hình</td>
                                <td className="border p-2">Dynamic AMOLED 2X</td>
                            </tr> */}
                            <tr>
                                <td className="border p-2 font-semibold">Màu sắc</td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold">Camera sau</td>
                                <td className="border p-2">
                                   
                                </td>
                            </tr>
                            <tr>
                                <td className="border p-2 font-semibold">Camera trước</td>
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
                <div className={styles.changepass}>
                    changepass
                </div>   
            
            </div> 

        </section>
    )
}