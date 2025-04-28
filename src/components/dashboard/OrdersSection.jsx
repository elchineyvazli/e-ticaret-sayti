import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag } from 'react-icons/fa';
import '../../styles/dashb_styles/OrderSection.scss';

const orders = [
    { id: 1, title: "Gümüş Üzük", date: "12/04/2025", price: "45 AZN" },
    { id: 2, title: "Təbii Daşlı Boyunbağı", date: "20/04/2025", price: "75 AZN" },
    { id: 3, title: "Klassik Qolbaq", date: "21/04/2025", price: "60 AZN" },
];

function OrderSection() {
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
                            <h3>{order.title}</h3>
                            <p>Tarix: {order.date}</p>
                            <p>Qiymət: {order.price}</p>
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
