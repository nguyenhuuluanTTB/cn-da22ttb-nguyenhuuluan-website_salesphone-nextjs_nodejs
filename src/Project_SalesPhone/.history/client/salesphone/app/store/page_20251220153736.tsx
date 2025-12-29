"use client";
import styles from "./store.module.scss";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

import ChiNhanh1 from '../home/media/Chi nhánh TPHCM.png';
import ChiNhanh2 from '../home/media/Chi nhánh Hà Nội.png';
import ChiNhanh3 from '../home/media/quan7.jpg';
import Image from "next/image";

export default function BranchesPage() {
  return (
    <section className={styles.branchPage}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h1>Hệ thống chi nhánh SalesPhone</h1>
          <p>
            SalesPhone – Chuỗi cửa hàng điện thoại chính hãng, uy tín, giá tốt
            trên toàn quốc.
          </p>
        </div>

        {/* BRANCH LIST */}
        <div className={styles.branchList}>
          {/* BRANCH ITEM */}
          <div className={styles.branchCard}>
            <Image
              src={ChiNhanh1}
              alt="SalesPhone Quận 1"
              className={styles.branchImage}
            />

            <div className={styles.branchContent}>
              <h2>SalesPhone Quận 1</h2>

              <p>
                <FaMapMarkerAlt /> 123 Nguyễn Huệ, Quận 1, TP.HCM
              </p>
              <p>
                <FaPhoneAlt /> 0901 234 567
              </p>
              <p>
                <FaClock /> 8:00 – 22:00 (Thứ 2 – CN)
              </p>

              <iframe
                className={styles.map}
                src="https://www.google.com/maps?q=123%20Nguyen%20Hue%20Quan%201&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className={styles.branchCard}>
            <Image
              src={ChiNhanh3}
              alt="SalesPhone Quận 7"
              className={styles.branchImage}
            />

            <div className={styles.branchContent}>
              <h2>SalesPhone Quận 7</h2>

              <p>
                <FaMapMarkerAlt /> 456 Nguyễn Thị Thập, Quận 7, TP.HCM
              </p>
              <p>
                <FaPhoneAlt /> 0902 345 678
              </p>
              <p>
                <FaClock /> 8:30 – 21:30 (Thứ 2 – CN)
              </p>

              <iframe
                className={styles.map}
                src="https://www.google.com/maps?q=456%20Nguyen%20Thi%20Thap%20Quan%207&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className={styles.branchCard}>
            <Image
              src={ChiNhanh2}
              alt="SalesPhone Hà Nội"
              className={styles.branchImage}
            />

            <div className={styles.branchContent}>
              <h2>SalesPhone Hà Nội</h2>

              <p>
                <FaMapMarkerAlt /> 89 Cầu Giấy, Hà Nội
              </p>
              <p>
                <FaPhoneAlt /> 0903 456 789
              </p>
              <p>
                <FaClock /> 9:00 – 22:00 (Thứ 2 – CN)
              </p>

              <iframe
                className={styles.map}
                src="https://www.google.com/maps?q=89%20Cau%20Giay%20Ha%20Noi&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
