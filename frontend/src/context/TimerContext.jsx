import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const initialSeconds = import.meta.env.VITE_SESSION_TIMEOUT;
    const [seconds, setSeconds] = useState(initialSeconds);
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setAuthToken(localStorage.getItem("authToken"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    const saveAuthToken = (token) => {
        localStorage.setItem("authToken", token);
        setAuthToken(token);
    };

    useEffect(() => {
        if (!authToken) return;
        const savedEndTime = localStorage.getItem("countdownEndTime");
        if (savedEndTime) {
            const remaining = Math.floor((+savedEndTime - Date.now()) / 1000);
            setSeconds(remaining > 0 ? remaining : 0);
        } else {
            const endTime = Date.now() + initialSeconds * 1000;
            localStorage.setItem("countdownEndTime", endTime.toString());
            setSeconds(initialSeconds);
        }
    }, [authToken]);


    useEffect(() => {
        if (!authToken) return;

        let delayTimeout;
        let interval;

        const startTimer = () => {
            interval = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        toast.warning("Session timeout, please login again!");
                        clearInterval(interval);
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("countdownEndTime");
                        navigate('/login')
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        const countdownEndTime = localStorage.getItem("countdownEndTime");

        if (countdownEndTime) {
            startTimer();
        } else {
            delayTimeout = setTimeout(startTimer, 2000);
        }

        return () => {
            clearTimeout(delayTimeout);
            clearInterval(interval);
        };
    }, [authToken]);

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${String(minutes).padStart(2)}m ${String(remainingSeconds).padStart(2, "0")}s`;
    };

    const sessionTimeout = formatTime(seconds);

    return (
        <TimerContext.Provider value={{ sessionTimeout, saveAuthToken }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);