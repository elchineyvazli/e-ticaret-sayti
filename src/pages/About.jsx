import React from 'react';
import '../styles/About.scss';

function About() {
    return (
        <div className="about-container">
            <div className="about-card">
                <img src="/profil.jpg" alt="Müəllif şəkli" className="author-image" />
                <div className="about-text">
                    <h1 className="about-title">Haqqımızda</h1>
                    <p>
                        Bizim məqsədimiz zərif, halal və dürüst ticarət dəyərlərinə əsaslanaraq müştərilərimizə keyfiyyətli və münasib qiymətli aksesuarlar təqdim etməkdir.
                        Bu platforma vasitəsilə hər bir məhsul sevgi ilə seçilir və paketlənir. Biz inanırıq ki, düzgünlük və şəffaflıq hər bir uğurun əsasındadır.
                    </p>
                    <p>
                        Sən bu saytda təkcə məhsul almırsan – həm də bir niyyətə dəstək olursan.
                        Məqsədimiz insanlara gözəl görünmək üçün bahalı olmaq lazım deyil mesajını çatdırmaq və hər kəsin zövqünə uyğun bir şey tapmasına imkan yaratmaqdır.
                    </p>
                    <p>
                        Dəstəyiniz üçün təşəkkür edirik. 🫶
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;