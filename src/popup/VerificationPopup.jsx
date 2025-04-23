import { useEffect, useState } from "react";
import "../../styles/popup_styles/VerificationPopup.scss";
import axios from "axios";

function VerificationPopup({ phone, onVerified }) {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState("idle"); // idle | success | fail
    const [cooldown, setCooldown] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = async (e) => {
        const val = e.target.value;
        if (/^[a-zA-Z0-9]{0,6}$/.test(val)) {
            setCode(val);
            if (val.length === 6) {
                try {
                    const res = await axios.post("http://localhost:8000/api/auth/verify/", {
                        username,
                        code,
                    });
                    setStatus("success");
                    setTimeout(() => {
                        onVerified();
                    }, 2000);
                } catch (err) {
                    setStatus("fail");
                }
            } else {
                setStatus("idle");
            }
        }
    };

    const resendCode = async () => {
        if (cooldown > 0) return;
        try {
            await axios.post("http://localhost:8000/api/auth/resend-code/", { phone });
            setCooldown(30);
        } catch (err) {
            console.error("Kod yeniden gönderilemedi", err);
        }
    };

    return (
        <div className="verification-popup">
            <h3>Kodu daxil edin</h3>
            <input
                type="text"
                value={code}
                onChange={handleChange}
                className={
                    status === "success"
                        ? "success"
                        : status === "fail"
                            ? "error"
                            : ""
                }
                readOnly={status === "success"}
                maxLength={6}
                placeholder="Kod..."
            />
            {status === "success" && <p className="success-msg">Onaylandı ✅</p>}
            {status === "fail" && <p className="error-msg">Kod yanlış</p>}
            <button disabled={cooldown > 0} onClick={resendCode}>
                {cooldown > 0 ? `Yenidən göndər (${cooldown}s)` : "Yenidən göndər"}
            </button>
        </div>
    );
}

export default VerificationPopup;
