"use client"

import styles from "./user_info.module.scss";
import Image from "next/image";

import { MdAccountCircle,MdOutlinePhone,MdOutlineEmail, MdOutlinePassword  } from "react-icons/md";
import { BsGenderTrans } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaPen } from "react-icons/fa6";
import { FaRegWindowClose } from "react-icons/fa";

import { useState } from "react";

export default function UserInfo () {

    const [formDisplay, setForm] = useState(false);


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
                    <button onClick={() => setForm(true)}><FaPen/>Chỉnh sửa</button>

                
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
                                    <td className="border p-2 w-200">Nguyễn Hữu Luân</td>
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
                                    <td className="border p-2">Số 123, Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</td>
                                </tr>
                                

                            </tbody>
                        </table>
                    </div>




                </div>   
                <div className={styles.changepass}>
                    <h5>Bảo mật</h5>
                        <div className={styles.btn_mk}>
                            <MdOutlinePassword/>
                                <span style={{fontSize: '10pt'}}>Thay đổi mật khẩu</span>
                        </div>

                </div>   
            
            </div> 

            <div className={`${styles.form_container} ${formDisplay===true ? styles.form_display : ""}`}> {/*form*/}
                        
                        
                        <form>
                            <div style={{}} className={styles.closeIcon} onClick={()=>setForm(false)}><FaRegWindowClose/></div>
                            <h2>CẬP NHẬT THÔNG TIN CÁ NHÂN</h2>
                           <label>Họ và tên: </label>
                           <input 
                                type="email" 
                                className="form-control"  
                                id="exampleFormControlInput1" 
                                placeholder="Nhập địa chỉ email của bạn..."
                                style={{borderColor: 'black'}}
                                value={""}
                                // onChange={(e) => setEmail(e.target.value)}
                            />


                            <label>Số điện thoại: </label>
                           <input 
                                type="email" 
                                className="form-control"  
                                id="exampleFormControlInput1" 
                                placeholder="Nhập số điện thoại của bạn..."
                                style={{borderColor: 'black'}}
                                value={""}
                                // onChange={(e) => setEmail(e.target.value)}
                            />

                            <label>Email: </label>
                           <input 
                                type="email" 
                                className="form-control"  
                                id="exampleFormControlInput1" 
                                placeholder="Nhập địa chỉ email của bạn..."
                                style={{borderColor: 'black'}}
                                value={""}
                                // onChange={(e) => setEmail(e.target.value)}
                            />

                            <label>Giới tính: </label>
                           <select
                                name="gender"
                                // value={info.gender}
                                // onChange={handleChange}
                                className="border rounded p-1 w-full"
                            >
                                <option>Nam</option>
                                <option>Nữ</option>
                                <option>Khác</option>
                            </select>

                            <label>Địa chỉ: </label>
                           <input 
                                type="email" 
                                className="form-control"  
                                id="exampleFormControlInput1" 
                                placeholder="Nhập địa chỉ nhà của bạn..."
                                style={{borderColor: 'black'}}
                                value={""}
                                // onChange={(e) => setEmail(e.target.value)}
                            />

                            <button>Cập nhật</button>
                        </form>
            </div>

        </section>
        
    )
}