"use client"

import styles from './manage_promotion.module.scss';
import { useState, useEffect } from 'react';
import fetchGetPromotion from './api/get_promotions.js';
import fetchAddPromotion from './api/add_promotion.js';
import fetchUpdatePromotion from './api/update_promotion.js';
import fetchSoftDeletePromotion from './api/soft_delete.js';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit, FaTrash, FaUndo } from "react-icons/fa";

interface Promotion {
    id_promotion: number;
    name_promotion: string;
    percent: number;
    start_at: string;
    end_at: string;
    describe_promotion: string;
    image_pro: string;
    is_del_pro: number;
}

export default function ManagePromotion() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    // Form states
    const [currentPromotion, setCurrentPromotion] = useState<Promotion>({
        id_promotion: 0,
        name_promotion: '',
        percent: 0,
        start_at: '',
        end_at: '',
        describe_promotion: '',
        image_pro: '',
        is_del_pro: 0
    });

    useEffect(() => {
        fetchPromotions();
    }, []);

    async function fetchPromotions() {
        try {
            const result = await fetchGetPromotion();
            if (result.success) {
                setPromotions(result.data);
            }
        } catch (err) {
            console.error('Error fetching promotions:', err);
            showNotification('Lỗi khi tải danh sách khuyến mãi', 'error');
        }
    }

    function showNotification(message: string, type: 'success' | 'error') {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: 'success' });
        }, 3000);
    }

    function openAddModal() {
        setIsEdit(false);
        setCurrentPromotion({
            id_promotion: 0,
            name_promotion: '',
            percent: 0,
            start_at: '',
            end_at: '',
            describe_promotion: '',
            is_del_pro: 0
        });
        setShowModal(true);
    }

    function openEditModal(promotion: Promotion) {
        setIsEdit(true);
        setCurrentPromotion({
            ...promotion,
            start_at: formatDateForInput(promotion.start_at),
            end_at: formatDateForInput(promotion.end_at)
        });
        setShowModal(true);
    }

    function formatDateForInput(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        try {
            const promotionData = {
                name_promotion: currentPromotion.name_promotion,
                percent: Number(currentPromotion.percent),
                start_at: currentPromotion.start_at,
                end_at: currentPromotion.end_at,
                        describe_promotion: currentPromotion.describe_promotion,
                        image_pro: currentPromotion.image_pro
            };

            if (isEdit) {
                const result = await fetchUpdatePromotion(currentPromotion.id_promotion, promotionData);
                if (result.success) {
                    showNotification('Cập nhật khuyến mãi thành công', 'success');
                    fetchPromotions();
                    setShowModal(false);
                }
            } else {
                const result = await fetchAddPromotion(promotionData);
                if (result.success) {
                    showNotification('Thêm khuyến mãi thành công', 'success');
                    fetchPromotions();
                    setShowModal(false);
                }
            }
        } catch (err) {
            console.error('Error submitting promotion:', err);
            showNotification('Có lỗi xảy ra', 'error');
        }
    }

    async function handleSoftDelete(id: number) {
        if (confirm('Bạn có chắc chắn muốn thực hiện thao tác này?')) {
            try {
                const result = await fetchSoftDeletePromotion(id);
                if (result.success) {
                    showNotification(result.message, 'success');
                    fetchPromotions();
                }
            } catch (err) {
                console.error('Error deleting promotion:', err);
                showNotification('Có lỗi xảy ra', 'error');
            }
        }
    }

    function formatDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    return (
        <div className={styles.container_manage_promotion}>
            

            

            <div className={styles.table_container}>
                <div className={styles.container}>
                    <h1 >Quản lý Khuyến mãi</h1>
                    <button className={styles.btn_add} onClick={openAddModal}>
                        <IoMdAddCircleOutline size={20} />
                        Thêm khuyến mãi
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name Promotion</th>
                                <th>Image</th>
                                <th>Percent</th>
                                <th>Start at</th>
                                <th>End at</th>
                                <th>Describe</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map((promotion) => (
                                <tr key={promotion.id_promotion}>
                                    <td>{promotion.id_promotion}</td>
                                    <td>{promotion.name_promotion}</td>
                                    <td>
                                        {promotion.image_pro ? (
                                            <img src={promotion.image_pro} alt={promotion.name_promotion} style={{width: 60, height: 'auto'}} />
                                        ) : (
                                            <span>—</span>
                                        )}
                                    </td>
                                    <td>{promotion.percent}%</td>
                                    <td>{formatDate(promotion.start_at)}</td>
                                    <td>{formatDate(promotion.end_at)}</td>
                                    <td>{promotion.describe_promotion}</td>
                                    <td>
                                        <span className={promotion.is_del_pro === 0 ? styles.status_active : styles.status_deleted}>
                                            {promotion.is_del_pro === 0 ? 'Hoạt động' : 'Đã xóa'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.action_buttons}>
                                            {promotion.is_del_pro === 0 ? (
                                                <>
                                                    <button 
                                                        className={styles.btn_edit}
                                                        onClick={() => openEditModal(promotion)}
                                                    >
                                                        <FaEdit /> Sửa
                                                    </button>
                                                    <button 
                                                        className={styles.btn_delete}
                                                        onClick={() => handleSoftDelete(promotion.id_promotion)}
                                                    >
                                                        <FaTrash /> Xóa
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    className={styles.btn_restore}
                                                    onClick={() => handleSoftDelete(promotion.id_promotion)}
                                                >
                                                    <FaUndo /> Khôi phục
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className={styles.modal_overlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                        <h2>{isEdit ? 'Cập nhật khuyến mãi' : 'Thêm khuyến mãi mới'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.form_group}>
                                <label>Tên khuyến mãi *</label>
                                <input
                                    type="text"
                                    value={currentPromotion.name_promotion}
                                    onChange={(e) => setCurrentPromotion({...currentPromotion, name_promotion: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label>Phần trăm giảm (%) *</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={currentPromotion.percent}
                                    onChange={(e) => setCurrentPromotion({...currentPromotion, percent: Number(e.target.value)})}
                                    required
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label>Ngày bắt đầu *</label>
                                <input
                                    type="date"
                                    value={currentPromotion.start_at}
                                    onChange={(e) => setCurrentPromotion({...currentPromotion, start_at: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label>Ngày kết thúc *</label>
                                <input
                                    type="date"
                                    value={currentPromotion.end_at}
                                    onChange={(e) => setCurrentPromotion({...currentPromotion, end_at: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label>Mô tả</label>
                                <textarea
                                    value={currentPromotion.describe_promotion}
                                    onChange={(e) => setCurrentPromotion({...currentPromotion, describe_promotion: e.target.value})}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label>URL ảnh</label>
                                <input
                                    type="text"
                                    value={currentPromotion.image_pro}
                                    onChange={(e) => setCurrentPromotion({...currentPromotion, image_pro: e.target.value})}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className={styles.modal_buttons}>
                                <button type="button" className={styles.btn_cancel} onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className={styles.btn_submit}>
                                    {isEdit ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {notification.show && (
                <div className={`${styles.notification} ${notification.type === 'error' ? styles.error : ''}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}
