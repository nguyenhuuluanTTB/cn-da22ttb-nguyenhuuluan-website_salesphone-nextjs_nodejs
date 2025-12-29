"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaPhoneAlt, FaStore, FaBoxOpen, FaUser, FaShoppingCart, FaSearch, FaRegQuestionCircle } from "react-icons/fa";
import styles from "./Header.module.scss";
import logo from "./asset/logo.png";

type Suggestion = {
  id_product: string;
  product_code: string;
  name_product: string;
  brand: string;
  price: number;
  image_url?: string;
};

export default function Header () {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Detect price-style query and return min/max in VND
    // Accepts inputs like: "22", "22 triệu", "22tr", "22000000", "1.5 triệu", "1-2 triệu", "1 đến 2tr"
    function detectPriceQuery(q: string): { min: number; max: number } | null {
      if (!q) return null;
      let s = q.trim().toLowerCase();
      // remove common prefix keywords
      s = s.replace(/^giá\s+|^gia\s+|^price\s+/, '').trim();

      // normalize common unit words to ascii
      s = s.replace(/triệu|trieu/g, 'tr');
      s = s.replace(/nghìn|nghin|k\b/g, 'k');
      s = s.replace(/vnd|đ|d\b/g, '').trim();

      // find all numbers
      const nums = s.match(/\d+(?:[\.,]\d+)?/g);

      const parseNum = (raw: string) => parseFloat(raw.replace(',', '.'));

      // helper to convert according to unit hints in the text
      const unitMultiplier = () => {
        if (/\btr\b/.test(s)) return 1_000_000;
        if (/\bk\b/.test(s)) return 1_000;
        return null; // unknown
      };

      const mulHint = unitMultiplier();

      if (nums && nums.length >= 2) {
        // range provided
        const a = parseNum(nums[0]);
        const b = parseNum(nums[1]);
        if (Number.isNaN(a) || Number.isNaN(b)) return null;
        const mul = mulHint ?? (a >= 1000 || b >= 1000 ? 1 : 1_000_000);
        const v1 = Math.round(a * mul);
        const v2 = Math.round(b * mul);
        return { min: Math.min(v1, v2), max: Math.max(v1, v2) };
      }

      if (nums && nums.length === 1) {
        const n = parseNum(nums[0]);
        if (Number.isNaN(n)) return null;
        // determine multiplier: explicit hint or heuristic
        const mul = mulHint ?? (n >= 1000 ? 1 : 1_000_000);
        const val = Math.round(n * mul);
        // return a band around value (±10%) so "22 triệu" finds similar products
        const delta = Math.max(Math.round(val * 0.1), mul === 1_000_000 ? 200_000 : 50_000);
        return { min: Math.max(0, val - delta), max: val + delta };
      }

      // fallback: if user typed words that include 'tr' or 'k' but no digit, ignore
      return null;
    }

    // Detect color query like "màu đỏ" or "mau do, den" -> returns comma-separated color list
    function detectColorQuery(q: string): string | null {
      if (!q) return null;
      let s = q.trim().toLowerCase();
      // allow prefixes: "màu", "mau", "color"
      const m = s.match(/^(màu|mau|color)\s+(.+)$/i);
      if (!m) return null;
      let rest = m[2].trim();
      // replace Vietnamese ' và ' with comma and normalize separators
      rest = rest.replace(/\s+và\s+/g, ',').replace(/\s*[,;]\s*/g, ',');
      // remove trailing words like 'những', 'các'
      rest = rest.replace(/\b(những|cac|các)\b/g, '').trim();
      const parts = rest.split(',').map(p => p.trim()).filter(Boolean);
      if (parts.length === 0) return null;
      // return comma-separated list compatible with backend handler
      return parts.join(',');
    }

    useEffect(() => {
      if (!query) { setSuggestions([]); setShowDropdown(false); return; }
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          // detect color queries first, then price queries
          const color = detectColorQuery(query);
          const price = detectPriceQuery(query);
          const params = new URLSearchParams();
          if (color) {
            params.append('color', color);
          } else if (price) {
            params.append('minPrice', String(price.min));
            params.append('maxPrice', String(price.max));
          } else {
            params.append('q', query);
          }
          const res = await fetch(`http://localhost:5000/api/product/search?${params.toString()}`);
          if (!res.ok) return;
          const data = await res.json();
          setSuggestions(data.data || []);
          setShowDropdown(true);
        } catch (err) {
          console.error('Search error', err);
        }
      }, 300);
    }, [query]);

    function handleSelect(item: Suggestion){
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
          <button className={styles.searchBtn} onClick={() => {
            if (!query) return;
            const color = detectColorQuery(query);
            const price = detectPriceQuery(query);
            const params = new URLSearchParams();
            if (color) {
              params.append('color', color);
            } else if (price) {
              params.append('minPrice', String(price.min));
              params.append('maxPrice', String(price.max));
            } else {
              params.append('q', query);
            }
            window.location.href = `/search?${params.toString()}`;
          }}> 
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