"use client";
import styles from "./branches.module.scss";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

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
            <h2>SalesPhone Quận 1</h2>
            <p className={styles.address}>
              <FaMapMarkerAlt /> 123 Nguyễn Huệ, Quận 1, TP.HCM
            </p>
            <p>
              <FaPhoneAlt /> 0901 234 567
            </p>
            <p>
              <FaClock /> 8:00 – 22:00 (Thứ 2 – CN)
            </p>
          </div>

          <div className={styles.branchCard}>
            <h2>SalesPhone Quận 7</h2>
            <p className={styles.address}>
              <FaMapMarkerAlt /> 456 Nguyễn Thị Thập, Quận 7, TP.HCM
            </p>
            <p>
              <FaPhoneAlt /> 0902 345 678
            </p>
            <p>
              <FaClock /> 8:30 – 21:30 (Thứ 2 – CN)
            </p>
          </div>

          <div className={styles.branchCard}>
            <h2>SalesPhone Hà Nội</h2>
            <p className={styles.address}>
              <FaMapMarkerAlt /> 89 Cầu Giấy, Hà Nội
            </p>
            <p>
              <FaPhoneAlt /> 0903 456 789
            </p>
            <p>
              <FaClock /> 9:00 – 22:00 (Thứ 2 – CN)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
