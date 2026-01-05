"use client"
import styles from './manage_account.module.scss';
import getAll_Account from './api/getAccount.js';
import { useEffect,useState } from 'react';
import fetchGetOrders from '../manage_order/api/get_orders.js';
import unable_account from './api/unable_account.js';
import enable_account from './api/enable_account.js';
import getUserInformation from './api/getUserInformation.js';
import { FaLock,FaLockOpen, FaEye } from "react-icons/fa";


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
    const [display_view, set_display_view] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<AllAccount | null>(null);
    const [userOrderCount, setUserOrderCount] = useState(0);
    const [userTotalSpent, setUserTotalSpent] = useState(0);
    const [userOrders, setUserOrders] = useState<any[]>([]);
    const [userInformation, setUserInformation] = useState<any | null>(null);
    // helper: convert buffer-like avatar object to data URL in browser
    const toDataUrlFromBufferLike = (avatar: any) => {
        try {
            if (!avatar) return null;
            if (typeof avatar === 'string') return avatar;
            const arr = Array.isArray(avatar.data) ? avatar.data : (Array.isArray(avatar) ? avatar : null);
            if (!arr) return null;
            const byteArray = new Uint8Array(arr);
            let mime = 'image/png';
            if (byteArray[0] === 0xFF && byteArray[1] === 0xD8) mime = 'image/jpeg';
            else if (byteArray[0] === 0x89 && byteArray[1] === 0x50) mime = 'image/png';
            else if (byteArray[0] === 0x47 && byteArray[1] === 0x49) mime = 'image/gif';

            // convert to binary string in chunks
            let binary = '';
            const chunkSize = 0x8000;
            for (let i = 0; i < byteArray.length; i += chunkSize) {
                const chunk = byteArray.subarray(i, i + chunkSize);
                binary += String.fromCharCode.apply(null, Array.from(chunk));
            }
            const b64 = window.btoa(binary);
            return `data:${mime};base64,${b64}`;
        } catch (e) {
            console.error('toDataUrlFromBufferLike error', e);
            return null;
        }
    };
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

    // Load user orders and compute stats when selectedAccount changes
    useEffect(() => {
        async function loadUserOrders() {
            if (!selectedAccount) return;
            try {
                const res = await fetchGetOrders();
                if (!res || !res.data) return;
                const orders = res.data.filter((o: any) => Number(o.id_user) === Number(selectedAccount.id_user));
                setUserOrders(orders);
                setUserOrderCount(orders.length);
                const total = orders.reduce((sum: number, o: any) => sum + (Number(o.total_amount) || 0), 0);
                setUserTotalSpent(total);
                // fetch user_information from server
                try {
                    const infoRes = await getUserInformation(selectedAccount.id_user);
                    if (infoRes && infoRes.success) {
                        const payload = infoRes.data;
                        // server now returns a single object; if it returns an array, pick first
                        let infoObj = Array.isArray(payload) ? (payload[0] || null) : payload;
                        // normalize avatar: accept data URL string or Buffer-like object { type: 'Buffer', data: [...] }
                        if (infoObj && infoObj.avatar && typeof infoObj.avatar !== 'string') {
                            try {
                                const a = infoObj.avatar;
                                const arr = Array.isArray(a.data) ? a.data : (Array.isArray(a) ? a : null);
                                if (arr) {
                                    const byteArray = new Uint8Array(arr);
                                    // detect mime
                                    let mime = 'image/png';
                                    if (byteArray[0] === 0xFF && byteArray[1] === 0xD8) mime = 'image/jpeg';
                                    else if (byteArray[0] === 0x89 && byteArray[1] === 0x50) mime = 'image/png';
                                    else if (byteArray[0] === 0x47 && byteArray[1] === 0x49) mime = 'image/gif';

                                    // convert to base64 in chunks to avoid call stack issues
                                    let binary = '';
                                    const chunkSize = 0x8000;
                                    for (let i = 0; i < byteArray.length; i += chunkSize) {
                                        const chunk = byteArray.subarray(i, i + chunkSize);
                                        binary += String.fromCharCode.apply(null, Array.from(chunk));
                                    }
                                    const b64 = typeof window !== 'undefined' && window.btoa ? window.btoa(binary) : '';
                                    infoObj = { ...infoObj, avatar: `data:${mime};base64,${b64}` };
                                }
                            } catch (e) {
                                console.error('Error converting avatar to data URL on client:', e);
                            }
                        }
                        // preserve any existing avatar (e.g., set earlier from account list)
                        setUserInformation((prev: { avatar: any; }) => {
                            if (!infoObj) return prev ?? null;
                            if (!infoObj.avatar && prev && prev.avatar) {
                                infoObj.avatar = prev.avatar;
                            }
                            return infoObj;
                        });
                    } else {
                        // keep previous info (avoid clearing avatar shown from list)
                        setUserInformation((prev: any) => prev ?? null);
                    }
                } catch (err) {
                    console.error('Error loading user information', err);
                    setUserInformation(null);
                }
            } catch (err) {
                console.error('Error loading user orders', err);
            }
        }

        loadUserOrders();
    }, [selectedAccount]);

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
            // keep original avatar payload (Buffer-like) for quick display without extra server call
            avatarRaw: p.avatar ?? null,
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
                                <td>
                                    <div className={styles.actionCell}>
                                        <button className={styles.btn_unable} onClick={() => {
                                            set_display_view(true);
                                            setSelectedAccount(acc);
                                            const anyAcc: any = acc as any;
                                            if (anyAcc.avatarRaw) {
                                                const url = toDataUrlFromBufferLike(anyAcc.avatarRaw);
                                                if (url) setUserInformation((prev: any) => ({ ...(prev || {}), avatar: url }));
                                            }
                                        }}><FaEye style={{color: '#A70000', height: '2px'}}/>Xem</button>

                                        <button className={acc.enable == 0 ? styles.btn_none : styles.btn_unable} onClick={() => {set_display_popup(true); setid_user(acc.id_user)}}>Vô hiệu hóa</button>

                                        <button className={acc.enable == 1 ? styles.btn_none : styles.btn_enable} onClick={() => {set_display_popup2(true); setid_user(acc.id_user)}}>Gỡ vô hiệu hóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View account modal */}
            <div className={display_view ? styles.container_popup_display : styles.container_popup} onClick={() => { set_display_view(false); setSelectedAccount(null); setUserInformation(null); }}>
                <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                    {selectedAccount && (
                        <div className={styles.view_detail}>
                            <h1>Thông tin chi tiết</h1>
                            <div className={styles.gridContainer}>
                                <div className={styles.item}>
                                    <div className={styles.img_ten}>
                                        <img 
                                            src={userInformation?.avatar || 'https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png'} 
                                            alt="avatar" 
                                            className={styles.avatar}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png';
                                            }}
                                        />
                                        <span style={{marginTop: '10px', fontWeight: 700, color: '#A70000'}}>{selectedAccount.name}</span>
                                    </div>

                                    <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Email:</strong> {selectedAccount.email}</p>
                                    <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Role:</strong> {selectedAccount.role}</p>
                                    <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Trạng thái:</strong> {selectedAccount.enable ? 'Đang hoạt động' : 'Đã vô hiệu'}</p>
                                    {userInformation && (
                                        <>
                                            {/* fullname: try multiple common field names */}
                                            {(userInformation.fullname || userInformation.full_name || userInformation.name) && (
                                                <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Full name:</strong> {userInformation.fullname || userInformation.full_name || userInformation.name}</p>
                                            )}
                                            {/* phone number: try several possible column names */}
                                            {(userInformation.phonenumber || userInformation.phone_number || userInformation.phone) && (
                                                <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Phone:</strong> {userInformation.phonenumber || userInformation.phone_number || userInformation.phone}</p>
                                            )}
                                            {/* gender */}
                                            {typeof userInformation.gender !== 'undefined' && (
                                                <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Gender:</strong> {String(userInformation.gender)}</p>
                                            )}
                                            {userInformation.address && <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Address:</strong> {userInformation.address}</p>}
                                            {userInformation.city && <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>City:</strong> {userInformation.city}</p>}
                                            {userInformation.postal_code && <p style={{display:'flex', alignItems:'center', gap: '0.5rem'}}><strong>Postal Code:</strong> {userInformation.postal_code}</p>}
                                        </>
                                    )}
                                </div>

                                <div className={styles.item}>
                                    <p style={{marginBottom: '0.6rem'}}><strong>Số đơn hàng:</strong> {userOrderCount}</p>
                                    <p style={{marginBottom: '0.6rem'}}><strong>Tổng đã chi tiêu:</strong> {userTotalSpent.toLocaleString()}</p>

                                    <div style={{marginTop: '1rem'}}>
                                        <h3>Đơn gần nhất</h3>
                                        {userOrders.length === 0 && <p style={{color:'#666'}}>Không có đơn hàng</p>}
                                        {userOrders.slice(0,5).map((o, idx) => (
                                            <div key={idx} style={{padding: '0.6rem', border: '1px solid #eee', borderRadius: 6, marginBottom: '0.5rem'}}>
                                                <div><strong>Mã đơn:</strong> {o.id}</div>
                                                <div><strong>Ngày:</strong> {new Date(o.created_at).toLocaleString()}</div>
                                                <div><strong>Tổng:</strong> {Number(o.total_amount).toLocaleString()}</div>
                                                <div><strong>Trạng thái:</strong> {o.status}</div>
                                            </div>
                                        ))}
                                    </div>

                                        {/* Close button moved below the grid to sit at the bottom of the modal */}
                                </div>
                            </div>
                                {/* Close button removed as requested */}
                        </div>
                    )}
                </div>
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
