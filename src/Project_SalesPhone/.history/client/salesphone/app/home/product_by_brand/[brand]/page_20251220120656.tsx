"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./product_by_brand.module.scss";
import { VscSettings } from "react-icons/vsc";
import Link from "next/link";
import callAPI from "./api/callAPI.js";

interface PageProps {
  params: Promise<{ brand: string }>;
}

interface Phone {
  phone_id: number;
  phone_name: string;
  phone_image: string;
  phone_describe: string;
  price: number;
  rate: number;
  discount: number;
  screen_size: string;
  ram: string;
  rom: string;
  percent: number;
  product_code: string;
}

export default function ProductByBrand({ params }: PageProps) {
  const { brand } = React.use(params);

  // ======================
  // STATE
  // ======================
  const [priceState, setPriceState] = useState<"up" | "down">("up");
  const [phones, setPhones] = useState<Phone[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  // ======================
  // CALL API
  // ======================
  const getProductByBrand = async (brand: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await callAPI(token, brand);

      const normalized: Phone[] = res.data.map((p: any) => ({
        phone_id: p.id_product,
        phone_name: p.name_product,
        phone_image: p.image_url,
        phone_describe: p.description_phone,
        price: Number(p.price),
        rate: Number(p.rate),
        discount: Number(p.id_promotion),
        screen_size: p.screen_size,
        ram: p.ram,
        rom: p.rom,
        percent: Number(p.percent),
        product_code: p.product_code,
      }));

      setPhones(normalized);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  useEffect(() => {
    getProductByBrand(brand);
  }, [brand]);

  // reset page khi đổi sort / brand
  useEffect(() => {
    setCurrentPage(1);
  }, [priceState, brand]);

  // ======================
  // SORT
  // ======================
  const sortedPhones = useMemo(() => {
    return [...phones].sort((a, b) =>
      priceState === "up" ? a.price - b.price : b.price - a.price
    );
  }, [phones, priceState]);

  // ======================
  // PAGINATION
  // ======================
  const totalPages = Math.ceil(sortedPhones.length / ITEMS_PER_PAGE);

  const paginatedPhones = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedPhones.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedPhones, currentPage]);

  // ======================
  // RENDER
  // ======================
  return (
    <section className={styles.product_by_brand}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{brand}</h1>
          <p>
            Khám phá dòng sản phẩm {brand} với công nghệ tiên tiến, thiết kế sang
            trọng và hiệu năng vượt trội.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.gridContainer}>
            {/* FILTER */}
            <div className={`${styles.item} ${styles.filter}`}>
              <div className={styles.filter_container}>
                <span className={styles.title_filter_box}>
                  <VscSettings /> Bộ lọc
                </span>

                <select
                  value={priceState}
                  onChange={(e) =>
                    setPriceState(e.target.value as "up" | "down")
                  }
                >
                  <option value="down">Giá giảm dần</option>
                  <option value="up">Giá tăng dần</option>
                </select>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className={`${styles.item} ${styles.product}`}>
              <div className={styles.tab_content}>
                <div className={styles.grid}>
                  {sortedPhones.length === 0 ? (
                    <div className={styles.empty}>
                      <h2>Không có sản phẩm</h2>
                      <p>
                        Hiện tại chưa có sản phẩm nào thuộc hãng{" "}
                        <b>{brand}</b>.
                      </p>
                      <Link href="/home">
                        <button className={styles.backBtn}>
                          Quay về trang chủ
                        </button>
                      </Link>
                    </div>
                  ) : (
                    paginatedPhones.map((phone) => {
                      const finalPrice =
                        phone.percent > 0
                          ? Math.round(
                              phone.price * (1 - phone.percent / 100)
                            )
                          : phone.price;

                      return (
                        <Link
                          key={phone.phone_id}
                          href={`/home/detail_product/${phone.product_code}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className={styles.card}>
                            <div className={styles.tragop_discount}>
                              <div className={styles.tragop}>
                                Trả góp 0%
                              </div>
                              {phone.percent > 0 && (
                                <div
                                  className={styles.discount_percent}
                                >
                                  Giảm {phone.percent}%
                                </div>
                              )}
                            </div>

                            <img
                              src={phone.phone_image}
                              alt={phone.phone_name}
                              className={styles.image}
                            />

                            <h2 className={styles.name}>
                              {phone.phone_name}
                            </h2>
                            <div className={styles.desc}>
                              {phone.phone_describe}
                            </div>

                            <div className={styles.price_star}>
                              <div className={styles.priceSection}>
                                {phone.percent > 0 ? (
                                  <>
                                    <span
                                      className={styles.newPrice}
                                    >
                                      {finalPrice.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      ₫
                                    </span>
                                    <br />
                                    <span
                                      className={styles.oldPrice}
                                    >
                                      {phone.price.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      ₫
                                    </span>
                                  </>
                                ) : (
                                  <span
                                    className={styles.newPrice}
                                  >
                                    {phone.price.toLocaleString(
                                      "vi-VN"
                                    )}{" "}
                                    ₫
                                  </span>
                                )}
                              </div>

                              <div className={styles.rate}>
                                ⭐ {phone.rate.toFixed(1)} / 5
                              </div>
                            </div>

                            <div className={styles.thongso}>
                              <span>{phone.screen_size}</span>
                              <span>{phone.ram}</span>
                              <span>{phone.rom}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        className={`${styles.pageBtn} ${
                          page === currentPage
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
