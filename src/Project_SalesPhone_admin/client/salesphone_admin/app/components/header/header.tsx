import styles from './header.module.scss';
import Link from 'next/link';

import { RiAccountCircle2Fill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { LuBadgePercent } from "react-icons/lu";
import { FaShoppingBag } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import logo from './media/logo.png';
import Image from 'next/image';
export default function Header(){

    return(
        <header className={styles.header}>

            <div className={styles.container}> 

                <div className={styles.logo_category}>

                    <Link href='/home' className={styles.logo}>
                        <Image src={logo} alt='logo' width={40} height={40}/>
                            <div className={styles.logoText}>
                                <span className={styles.brand}>SalesPhone</span>
                                <span className={styles.slogan}>nâng tầm giá trị</span>
                            </div>
                        
                    </Link>

                </div>

                <nav className={styles.nav}>

                    <Link href='/manage_account' className={styles.navItem}>
                        <RiAccountCircle2Fill  style={{fontSize:'25pt'}}/>
                        <span>Tài khoản</span>
                    </Link>
                    <Link href='/manage_product' className={styles.navItem}>
                        <AiFillProduct style={{fontSize: '23pt'}}/>
                        <span>Sản phẩm</span>
                    </Link>
                    <Link href='/manage_promotion' className={styles.navItem}>
                        <LuBadgePercent style={{fontSize: '23pt'}}/>
                        <span>Khuyến mãi</span>
                    </Link>
                    <Link href='/manage_order' className={styles.navItem}>
                        <FaShoppingBag style={{fontSize: '19pt'}}/>
                        <span>Đơn hàng</span>
                    </Link>
                    <Link href='/statistics' className={styles.navItem}>
                        <FcStatistics style={{fontSize: '23pt'}}/>
                        <span>Thống kê</span>
                    </Link>
                    <div className={styles.account}>

                    </div>

                </nav>

            </div>


        </header>
    )
}