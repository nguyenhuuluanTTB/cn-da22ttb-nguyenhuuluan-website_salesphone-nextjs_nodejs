import Link from "next/link";
import Image from "next/image";
import { FaBars, FaPhoneAlt, FaStore, FaBoxOpen, FaUser, FaShoppingCart, FaSearch, FaRegQuestionCircle } from "react-icons/fa";
import styles from "./Header.module.scss";
import logo from "./asset/logo.png";

export default function Header () {
    return(
        <header className={styles.header}>
      {/* Hàng trên */}
      <div className={styles.topBar}>
        <div className={styles.menuIcon}>
          <FaBars />
        </div>

        <div className={styles.logo}>
          <Image src={logo} alt="SalesPhone Logo" width={36} height={36} />
          <div className={styles.text}>
            <span className={styles.brand}>SalesPhone</span>
            <span className={styles.slogan}>nâng tầm giá trị</span>
          </div>
        </div>

        <div className={styles.cartIcon}>
          <FaShoppingCart />
        </div>
      </div>

      {/* Hàng dưới: ô tìm kiếm */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="bạn muốn tìm gì..." />
        <button>
          <FaSearch />
        </button>
      </div>
    </header>

        
        
    );
}