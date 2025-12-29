"use client"

import styles from './order.module.scss';
import { IoLocation } from "react-icons/io5";
import { SiCashapp } from "react-icons/si";
import { MdEventNote,MdLoop  } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineFileProtect } from "react-icons/ai";

export default function Order () {

    return(
        <section className={styles.order}> {/*order */}

            <div className={styles.container}> {/*container */}

                
                <div className={styles.gridContainer}>

                    <div className={`${styles.item} ${styles.item1}`}>
                        
                        <div className={styles.thongtindiachi}>

                            <div className={styles.title_location}><IoLocation style={{color:'green', fontWeight: 'bold'}}/><span>Địa chỉ giao hàng</span></div>
                            <div className={styles.diachigiaohang}> {/*Địa chỉ giao hàng */}
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Tỉnh/Thành phố *</span>
                                    <div className={styles.tinh}>
                                        <select>

                                            <option>Chọn tỉnh/thành</option>
                                            <option>TP.Hồ Chính Minh</option>
                                            <option>Hà Nội</option>
                                            <option>Hải Phòng</option>
                                            <option>Đà Nẵng</option>
                                            <option>Cần Thơ</option>

                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Quận/Huyện *</span>
                                    <div className={styles.quan}>
                                        <select>

                                            <option>Chọn tỉnh/thành</option>
                                            <option>TP.Hồ Chính Minh</option>
                                            <option>Hà Nội</option>
                                            <option>Hải Phòng</option>
                                            <option>Đà Nẵng</option>
                                            <option>Cần Thơ</option>

                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Phường/Xã *</span>
                                    <div className={styles.phuong}>
                                        <select>

                                            <option>Chọn tỉnh/thành</option>
                                            <option>TP.Hồ Chính Minh</option>
                                            <option>Hà Nội</option>
                                            <option>Hải Phòng</option>
                                            <option>Đà Nẵng</option>
                                            <option>Cần Thơ</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <span style={{fontSize: '12pt', color: 'rgb(94, 94, 94)'}}>Địa chỉ cụ thể</span>
                            <input className={styles.diachicuthe} placeholder='Nhập địa chỉ cụ thể...' type='text'/>
                        
                        </div>


                        {/*Phương thức thanh toán */}
                        <div className={styles.thongtindiachi}>
                                <div className={styles.title_location}><SiCashapp style={{color:'green', fontWeight: 'bold'}}/><span>Phương thức thanh toán</span></div>
                            <div className={styles.luachonthanhtoan}>

                                <div className={styles.typecash}>
                                    <input type="radio" name="cash"/><span>Thanh toán khi nhận hàng (OCD)</span>
                                </div>

                                <div className={styles.typecash}>
                                    <input type="radio" name="cash" /><span>Chuyển khoản ngân hàng</span>
                                </div>
                            </div>
                            
                        </div>

                        {/*Ghi chú */}
                        <div className={styles.thongtindiachi}>
                            <div className={styles.title_location}><MdEventNote style={{color:'green', fontWeight: 'bold'}}/><span>Ghi chú đơn hàng</span></div>
                            <input style={{width: '100%', border: 'none'}} type="text" placeholder='Ghi chú thêm (tùy chọn)' />
                        </div>


                    </div>

                    <div className={styles.item}>
                        <div className={styles.donhang}>
                            
                            <div className={styles.title_location}><FaShoppingBag style={{color:'green', fontWeight: 'bold'}}/><span>Tóm tắt đơn hàng</span></div>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12pt', marginTop: '1rem', marginBottom: '0.5rem'}}>
                                <span style={{color: 'rgb(94, 94, 94)'}}>Giá tiền (2 sản phẩm):</span><span>56.980.000đ</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12pt'}}>
                                <span style={{color: 'rgb(94, 94, 94)'}}>Phí vận chuyển:</span><span style={{color: 'green'}}>Miễn phí</span>
                            </div>
                            <hr/>
                            <div className={styles.tien}>
                                <span>Tổng cộng</span>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                                    <span style={{fontSize: '20pt', color:'#A70000'}}>56.980.000đ</span>
                                    <span style={{display: 'flex', justifyContent: 'space-between', fontSize: '10pt',color: 'rgb(94, 94, 94)'}}>(Đã bao gồm VAT)</span>
                                </div>
                            </div>

                            <button>Thanh toán ngay</button>
                            <hr/>

                            <div className={styles.baohanh}>
                                <div className={styles.baohanh_icon}>
                                    <FaCheck />
                                </div>
                                <div className={styles.baohanh_content}>
                                    <span>Bảo hành chính hãng</span>
                                    <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>12 tháng toàn quốc</span>
                                </div>
                            </div>
                            <div className={styles.ttat}>
                                <div className={styles.ttat_icon}>
                                    <AiOutlineFileProtect />
                                </div>
                                <div className={styles.baohanh_content}>
                                    <span>Thanh toán an toàn</span>
                                    <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Bảo mật thông tin 100%</span>
                                </div>
                            </div>
                            <div className={styles.doitra}>
                                <div className={styles.doitra_icon}>
                                    <MdLoop  />
                                </div>
                                <div className={styles.baohanh_content}>
                                    <span>Đổi trả dễ dàng</span>
                                    <span style={{fontSize: '10pt', color: 'rgb(94, 94, 94)'}}>Trong vòng 7 ngày</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </section>
    )
}