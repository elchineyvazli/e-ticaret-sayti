import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/dashb_styles/OrderSection.scss';

function OrderSection() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get("http://localhost:8000/api/my-orders/", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => {
                console.error("Sipariş verisi alınamadı ❌", err);
            });
    }, []);

    return (
        <motion.div
            className="orders-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="content-header">
                <FaShoppingBag style={{ marginRight: "10px" }} />
                Sifarişlər
            </div>

            <div className="orders-grid">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <motion.div
                            className="order-card"
                            key={order.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <h3>🛍️ Məhsul ID: {order.product_id}</h3>
                            <p>Tarix: {new Date(order.created_at).toLocaleDateString()}</p>
                            <p>Metro: {order.selected_metro}</p>
                            <p>Ödəniş: {order.payment_method}</p>
                            <p>Say: {order.quantity}</p>
                            <p>Ümumi: ₼{order.total_price}</p>
                            <p className={`badge ${order.is_complete ? 'success' : 'pending'}`}>
                                {order.is_complete ? "Tamamlandı ✅" : "Gözləyir ⏳"}
                            </p>
                        </motion.div>
                    ))
                ) : (
                    <p>😕 Hələ sifariş yoxdur.</p>
                )}

            </div>
        </motion.div>
    );
}

export default OrderSection;
