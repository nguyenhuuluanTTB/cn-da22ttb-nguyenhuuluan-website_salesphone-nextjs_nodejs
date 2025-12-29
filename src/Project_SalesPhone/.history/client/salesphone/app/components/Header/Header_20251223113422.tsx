"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaPhoneAlt, FaStore, FaBoxOpen, FaUser, FaShoppingCart, FaSearch, FaRegQuestionCircle } from "react-icons/fa";
import styles from "./Header.module.scss";
import logo from "./asset/logo.png";

export default function Header () {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => {
      if (!query) { setSuggestions([]); setShowDropdown(false); return; }
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/product/search?q=${encodeURIComponent(query)}`);
          if (!res.ok) return;
          const data = await res.json();
          setSuggestions(data.data || []);
          setShowDropdown(true);
        } catch (err) {
          console.error('Search error', err);
        }
      }, 300);
    }, [query]);

    function handleSelect(item){
      setQuery("");
      setShowDropdown(false);
      // navigate to product detail page
      // product detail route expects product_code in URL
      window.location.href = `/home/detail_product/${item.product_code}`;
    }

    return(
        <header className={styles.header}>

        <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo_category}>
            
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
        <div className={styles.searchBox} style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="bạn muốn tìm gì..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (suggestions.length) setShowDropdown(true); }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          <button className={styles.searchBtn} onClick={() => { if(query) window.location.href = `/search?q=${encodeURIComponent(query)}` }}> 
            <FaSearch />
          </button>

          {showDropdown && (
            <div className={styles.searchDropdown}>
              {suggestions.length === 0 && <div className={styles.noResults}>Không có kết quả</div>}
              {suggestions.map((item) => (
                <div key={item.id_product} onMouseDown={() => handleSelect(item)} className={styles.suggestionItem}>
                  <Image src={item.image_url || '/logo.png'} alt={item.name_product} width={50} height={50} />
                  <div className={styles.suggestionText}>
                    <div className={styles.suggestionTitle}>{item.name_product}</div>
                    <div className={styles.suggestionMeta}>{item.brand} • {Number(item.price).toLocaleString('vi-VN')}₫</div>
                  </div>
                </div>
              ))}
              <div className={styles.dropdownFooter}>
                <a href={`/search?q=${encodeURIComponent(query)}`}>Xem tất cả kết quả cho "{query}"</a>
              </div>
            </div>
          )}

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
          <Link href="/order" className={`${styles.navItem} ${styles.tracuudonhang}`}>
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
          <Link href="/policy" className={`${styles.navItem} ${styles.chinhsach}`}>
            <FaRegQuestionCircle />
            <span>Chính sách</span>
          </Link>
        </nav>
      </div>

        </header>
    );
}