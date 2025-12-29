"use client"
import styles from './manage_account.module.scss';
import getAll_Account from './api/getAccount.js';
import { useEffect,useState } from 'react';
import unable_account from './api/unable_account.js';
import enable_account from './api/enable_account.js';
import { FaLock,FaLockOpen   } from "react-icons/fa";


interface AllAccount {
    id_user: number;
    name: string;
    email: string;
    role: string;
    enable: number;
    created_at: Date;
    updated_at: Date;
}

export default function ManageAccount() {
    const [accounts, setAccounts] = useState<AllAccount[]>([]);
    const [display_popup, set_display_popup] = useState(false);
    const [display_popup2, set_display_popup2] = useState(false);
    const [display_notification, set_display_notification] = useState(false);
    const [display_notification2, set_display_notification2] = useState(false);
    const [id_user, setid_user] = useState(0);
    const [content_popup, setContent_popup] = useState('');
    const fetch_unabel_account = async (id:any) => {
        try{

            const result = await unable_account(id);
            if(!result){
                    throw new Error('Http error!');
            }
            console.log('Đã vô hiệu hóa tài khoản này!');
            set_display_notification(true);
        }
        catch(err){
            console.error('Error while fetching: ',err);
        }
    }

    const fetch_enable_account = async (id:any) => {
        try{
            const result = await enable_account(id);
            if(!result){
                throw new Error('Http error!');
            }
            console.log('Đã gỡ vô hiệu hóa tài khoản!');
            set_display_notification2(true);
        }
        catch(err){
            console.error('Error while fetching: ', err);
        }
    }

    function reload_page () {
        window.location.reload();
    }

    const fetchAllAccount = async () => {
        console.log('Fetching data from API getAllAcount');
        try {
            const result = await getAll_Account();
            if (!result) {
                throw new Error('Http error!');
            }
            //Test xong phải bỏ để tránh lộ dữ liệu cá nhân
            console.log('Data lấy được: ', result);

            const p = result.data ?? {};
            const normalized: AllAccount[] = (result.data ?? []).map((p: any) => ({
            id_user: p.id_user,
            name: p.name,
            email: p.email,
            role: p.role,
            enable: p.enable,
            created_at: new Date(p.created_at),
            updated_at: new Date(p.updated_at),
        }));

            setAccounts(normalized);
        } catch (err) {
            console.error('Error while fetching data: ', err);
        }
    };
    

    useEffect(() => {

        fetchAllAccount();

    }, []);



    return (
        <section className={styles.manage_account}>
            <div className={styles.container}>
                <h1>Quản lý tài khoản</h1>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Enable</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((acc) => (
                            <tr key={acc.id_user}>
                                <td>{acc.id_user}</td>
                                <td>{acc.name}</td>
                                <td>{acc.email}</td>
                                <td>{acc.role}</td>
                                <td>{acc.enable}</td>
                                <td>{acc.created_at.toLocaleString()}</td>
                                <td>{acc.updated_at.toLocaleString()}</td>
                                <td style={{display:'flex', gap: '0.5rem', flexDirection: 'column'}}>
                                    {/* <button className={styles.btn_unable} onClick={() => fetch_unabel_account(acc.id_user)}>Vô hiệu hóa</button> */}
                                    <button className={acc.enable == 0 ? styles.btn_none : styles.btn_unable} onClick={() => {set_display_popup(true); setid_user(acc.id_user)}}>Vô hiệu hóa</button>
                                    <button className={acc.enable == 1 ? styles.btn_none : styles.btn_enable} onClick={() => {set_display_popup2(true); setid_user(acc.id_user)}}>Gỡ vô hiệu hóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={display_popup ? styles.container_popup_display : styles.container_popup}>
                <div className={styles.popup}>
                    <span>Bạn có thực sự muốn vô hiệu hóa tài khoản này?</span>
                    <div className={styles.container_btn}>
                        <button className={styles.btn_yes} onClick={() => {set_display_popup(false) ; fetch_unabel_account(id_user)}}>Có</button>
                        <button className={styles.btn_no} onClick={() => set_display_popup(false)}>Không</button>
                    </div>
                </div>
            </div>

            <div className={display_popup2 ? styles.container_popup_display : styles.container_popup}>
                <div className={styles.popup}>
                    <span>Bạn có thực sự muốn gỡ vô hiệu hóa tài khoản này?</span>
                    <div className={styles.container_btn}>
                        <button className={styles.btn_yes} onClick={() => {set_display_popup2(false) ; fetch_enable_account(id_user)}}>Có</button>
                        <button className={styles.btn_no} onClick={() => set_display_popup2(false)}>Không</button>
                    </div>
                </div>
            </div>
           

            <div className={display_notification ? styles.container_notification : styles.notification_none} onClick={() => {set_display_notification(false); reload_page()}}>
                <div className={  styles.notification }>
                    <span>Đã vô hiệu hóa tài khoản thành công!</span>
                    <FaLock  style={{color: 'green', fontSize: '50pt'}}/>
                </div>
            </div>

            <div className={display_notification2 ? styles.container_notification : styles.notification_none} onClick={() => {set_display_notification2(false); reload_page()}}>
                <div className={  styles.notification }>
                    <span>Đã gỡ vô hiệu hóa tài khoản thành công!</span>
                    <FaLockOpen style={{color: 'green', fontSize: '50pt'}}/>
                </div>
            </div>
            


        </section>
    );
}
