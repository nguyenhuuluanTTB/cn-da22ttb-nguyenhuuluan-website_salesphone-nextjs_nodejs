import Link from "next/link";
import Image from "next/image";
import { FaBars, FaPhoneAlt, FaStore, FaBoxOpen, FaUser, FaShoppingCart, FaSearch, FaRegQuestionCircle } from "react-icons/fa";
import styles from "./Header.module.scss";
import logo from "./asset/logo.png";

export default function Header () {
    return(
        <header className={styles.header}>

        <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo_category}>
            
            {/* Danh mục */}
            {/* <button className={styles.categoryBtn}>
                <FaBars />
                <span>Danh mục</span>
            </button> */}

            <Link href="/home" className={styles.logo}>
             
                <Image src={logo} alt="SalesPhone Logo" width={40} height={40} />
                <div className={styles.logoText}>
                    <span className={styles.brand}>SalesPhone</span>
                    <span className={styles.slogan}>nâng tầm giá trị</span>
                </div>
              
            </Link>

             <Link href="#" className={`${styles.navItem} ${styles.giohang}`}>
                  <FaShoppingCart />
            </Link>

        </div>
        

       

        {/* Ô tìm kiếm */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="bạn muốn tìm gì..." />
          <button className={styles.searchBtn}>
            <FaSearch />
          </button>
        </div>

        {/* Liên hệ */}
        <div className={styles.contact}>
          <FaPhoneAlt />
          <div>
            <span>Liên hệ</span> <br/>
            <strong>1800 6018</strong>
          </div>
        </div>

        

        {/* Các icon chức năng */}
        <nav className={styles.nav}>
          <Link href="/store" className={`${styles.navItem} ${styles.cuahangganban}`}>
            <FaStore />
            <span>Cửa hàng gần bạn</span>
          </Link>
          <Link href="#" className={`${styles.navItem} ${styles.tracuudonhang}`}>
            <FaBoxOpen />
            <span>Tra cứu đơn hàng</span>
          </Link>
          <Link href="/user_info" className={`${styles.navItem} ${styles.taikhoan}`}>
            <FaUser />
            <span>Tài khoản</span>
          </Link>
          <Link href="/cart" className={`${styles.navItem} `}>
            <FaShoppingCart />
            <span>Giỏ hàng</span>
          </Link>
          <Link href="#" className={`${styles.navItem} ${styles.chinhsach}`}>
            <FaRegQuestionCircle />
            <span>Chính sách</span>
          </Link>
        </nav>
      </div>

   

        </header>

        
        
    );
}