import React from 'react';
import '../styles/Contact.scss';
import { FaWhatsapp, FaTelegramPlane, FaEnvelope, FaLinkedin } from 'react-icons/fa';

function Contact() {
    return (
        <div className="contact-container">
            <div className="contact-card">
                <h1 className="contact-title">Əlaqə</h1>
                <p className="contact-description">
                    Aşağıdakı platformalardan bizimlə asanlıqla əlaqə saxlaya bilərsiniz. Sizin fikirləriniz və suallarınız bizim üçün çox önəmlidir.
                </p>
                <div className="contact-methods">
                    <a href="https://wa.me/994501234567" target="_blank" className="contact-method whatsapp">
                        <FaWhatsapp size={24} /> WhatsApp
                    </a>
                    <a href="https://t.me/yourtelegram" target="_blank" className="contact-method telegram">
                        <FaTelegramPlane size={24} /> Telegram
                    </a>
                    <a href="mailto:info@sensin.az" className="contact-method email">
                        <FaEnvelope size={24} /> E-poçt
                    </a>
                    <a href="https://www.linkedin.com/in/sensin" target="_blank" className="contact-method linkedin">
                        <FaLinkedin size={24} /> LinkedIn
                    </a>
                </div>
                <div className="contact-footer">
                    <p>Əməkdaşlıq üçün açığıq. Bizə yazmaqdan çəkinməyin ✨</p>
                </div>
            </div>
        </div>
    );
}

export default Contact;
