//Khai báo sẽ chạy component này trên trình duyệt, đồng thời sử dụng hook useState và useEffect,...
"use client"

//file scss này sẽ chỉ được áp dụng riêng cho trang home
import styles from './home.module.scss';

export default function Home () {

    
    return(
        <section className={styles.home}> {/*sử dụng thẻ section sẽ tốt hơn cho seo */}
            Home
            <div> {/*Đây là thẻ container chứa toàn bộ nội dung bên trong (hai bên mép thu lại)*/}

                <div> {/*advertisement */}


                </div>

                <img/> {/*adlarge */}

                <div> {/*tab_container */}

                    <div> {/*tab_header */}



                    </div>

                    <div> {/*tab_content */}



                    </div>

                </div>

            </div>

        </section>
    );
}



