"use client"

import styles from "./user_info.module.scss";
import Image from "next/image";

import { MdAccountCircle,MdOutlinePhone,MdOutlineEmail, MdOutlinePassword  } from "react-icons/md";
import { BsGenderTrans } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaPen } from "react-icons/fa6";
import { FaRegWindowClose } from "react-icons/fa";

import { useState, useEffect } from "react";

import {updateUserInformation} from './api/update.js';


interface UserInformation {
    fullname: string;
    phonenumber: string;
    gender: string;
    address: string;
    name: string;
    email: string;
}


export default function UserInfo () {

    const [formDisplay, setForm] = useState(false);

    const [user_inf, setUser_inf] = useState<UserInformation | null>(null);


    //Lưu trữ dữ liệu cho phần cập nhật
    const [fullname, setfullname] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [gender, setgender] = useState('');
    const [address, setaddress] = useState('');


    useEffect(() => {
    const fetchUserInfo = async () => {
        console.log("Fetching data from API for user information");

        try {
            const token = localStorage.getItem('token'); // lấy token từ localStorage
            if (!token) {
                console.error("No token found. Please login first.");
                return;
            }

            const res = await fetch('http://localhost:5000/api/user_info', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Data fetched successfully: ", data);

            const p = data.data ?? {}; // tránh crash nếu data.data undefined
            const normalized: UserInformation = {
                fullname: p.fullname ?? 'Chưa có dữ liệu',
                phonenumber: p.phonenumber ?? 'Chưa có dữ liệu',
                gender: p.gender ?? 'Chưa có dữ liệu',
                address: p.address ?? 'Chưa có dữ liệu',
                name: p.name ?? 'Chưa có dữ liệu',
                email: p.email ?? 'Chưa có dữ liệu'
            };

            setUser_inf(normalized);

        } catch (err: any) {
            console.error("Error while fetching data: ", err);
        }
    };

    fetchUserInfo();
}, []);


    //Hàm để cập nhật thông tin người dùng
    const handleUpdate = async () => {
        try{
            const token = localStorage.getItem('token');
            const result = await updateUserInformation({token, fullname, phonenumber, gender, address});
            window.location.reload();
        }
        catch(err){
            console.error(err);
        }
    }


    return(
        <section className={styles.userinf}>

            <div className={styles.container}>
                
                <div className={styles.account}>
                   
                    <div className={styles.avt_name}>

                        <MdAccountCircle style={{fontSize: '100pt'}}/>
                        <div>
                            <span style={{fontSize: '20pt', fontWeight: 'bold'}}>{user_inf?.name}</span>
                            <span style={{color: '#939393ff'}}>{user_inf?.email}</span>
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
                                    <td className="border p-2 w-200">{user_inf?.fullname == '' ? "Chưa có dữ liệu" : user_inf?.fullname}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><MdOutlinePhone/> Số điện thoại</td>
                                    <td className="border p-2">{user_inf?.phonenumber == '' ? "Chưa có dữ liệu" : user_inf?.phonenumber}</td>
                                </tr>
                                {/* <tr>
                                    <td className="border p-2 font-semibold" style={{backgroundColor:'#d0d0d0ff'}}>Công nghệ màn hình</td>
                                    <td className="border p-2">Dynamic AMOLED 2X</td>
                                </tr> */}
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><MdOutlineEmail />Email</td>
                                    <td className="border p-2">{user_inf?.email == '' ? "Chưa có dữ liệu" : user_inf?.email}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><BsGenderTrans/>Giới tính</td>
                                    <td className="border p-2">{user_inf?.gender == '' ? "Chưa có dữ liệu" : user_inf?.gender}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}><CiLocationOn/>Địa chỉ</td>
                                    <td className="border p-2">{user_inf?.address == '' ? "Chưa có dữ liệu" : user_inf?.address}</td>
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
                                type="" 
                                className="form-control"  
                                id="exampleFormControlInput1" 
                                placeholder="Nhập họ và tên của bạn..."
                                style={{borderColor: 'black'}}
                                value=""
                                // onChange={(e) => setEmail(e.target.value)}
                                onChange={(e) => setfullname(e.target.value)}
                            />


                            <label>Số điện thoại: </label>
                           <input 
                                type="" 
                                className="form-control"  
                                id="exampleFormControlInput1" 
                                placeholder="Nhập số điện thoại của bạn..."
                                style={{borderColor: 'black'}}
                                value=""
                                // onChange={(e) => setEmail(e.target.value)}
                                onChange={(e) => setphonenumber(e.target.value)}
                            />

                            

                            <label>Giới tính: </label>
                           <select
                                name="gender"
                                // value={info.gender}
                                // onChange={handleChange}
                                onChange={(e) => setgender(e.target.value)}
                                className="border rounded p-1 w-full"
                            >
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
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
                                onChange={(e) => setaddress(e.target.value)}
                            />

                            <button onClick={handleUpdate} >Cập nhật</button>
                        </form>
            </div>

        </section>
        
    )
}