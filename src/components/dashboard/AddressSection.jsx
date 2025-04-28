import { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/dashb_styles/AddressSection.scss';

function AddressSection() {
    const [formData, setFormData] = useState({
        fullName: '',
        city: '',
        nearbyMetro: '',
        homePhone: '',
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Kaydedilen Adres:', formData);
        alert('Adres bilgiləriniz kaydedildi! (Demo)');
    };

    return (
        <motion.div
            className="address-section-container"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="address-header">
                <h2>Adres Bilgilerim</h2>
                <div className="badge">İstəyə bağlı</div>
            </div>
            <p className="info-text">
                Yaxında ünvana çatdırılma xidmətimiz də aktiv olacaq! İstəsəniz, artıq ünvanınızı qeyd edə bilərsiniz.
            </p>

            <form className="address-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="form-group">
                    <label>Ad Soyad</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Adınızı və soyadınızı daxil edin"
                    />
                </div>

                <div className="form-group">
                    <label>Şəhər</label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="Bakı, Gəncə, Sumqayıt və s."
                    />
                </div>

                <div className="form-group">
                    <label>Metroya Yaxın Ünvan (İstəyə bağlı)</label>
                    <input
                        type="text"
                        value={formData.nearbyMetro}
                        onChange={(e) => handleChange('nearbyMetro', e.target.value)}
                        placeholder="Ən yaxın metro və ya ərazi"
                    />
                </div>

                <div className="form-group">
                    <label>Ev Telefonu (İstəyə bağlı)</label>
                    <input
                        type="text"
                        value={formData.homePhone}
                        onChange={(e) => handleChange('homePhone', e.target.value)}
                        placeholder="+994 XX XXX XX XX"
                    />
                </div>

                <button type="submit" className="save-button">
                    Kaydet
                </button>
            </form>
        </motion.div>
    );
}

export default AddressSection;
