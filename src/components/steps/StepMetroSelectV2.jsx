import React, { useRef, useState } from 'react';
import metros from './metros';
import '../../styles/StepMetroSelectV2.scss';

const StepMetroSelectV2 = ({ next }) => {
    const [selected, setSelected] = useState(null);
    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleSelect = (id) => {
        setSelected(id);
        localStorage.setItem("selectedMetro", id);
        setTimeout(() => {
            next();
        }, 500);
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // hız
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const scrollBy = (amount) => {
        scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    };

    return (
        <div className="step-container">
            <h2 className="step-title">Metro Seçin</h2>

            <div className="scroll-buttons">
                <button onClick={() => scrollBy(-200)}>&larr;</button>
                <button onClick={() => scrollBy(200)}>&rarr;</button>
            </div>

            <div
                className="metro-scroll-wrapper"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {metros.map((metro, i) => (
                    <div
                        key={metro.id}
                        className={`metro-card-zigzag ${i % 2 === 0 ? 'up' : 'down'} ${selected === metro.id ? 'selected' : ''}`}
                        style={{ backgroundColor: metro.color }}
                        onClick={() => handleSelect(metro.id)}
                    >
                        {metro.name}
                    </div>
                ))}
            </div>

            {!selected && (
                <div className="hint-text">Bir metro seçin və növbəti addıma keçin</div>
            )}
        </div>
    );
};

export default StepMetroSelectV2;
