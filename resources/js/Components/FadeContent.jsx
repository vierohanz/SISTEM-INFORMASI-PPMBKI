import { useRef, useEffect, useState } from "react";

const FadeContent = ({
    children,
    blur = false,
    duration = 1000,
    easing = "ease-out",
    delay = 1,
    threshold = 0.1,
    initialOpacity = 0,
    className = "",
    onClick = () => {},
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setTimeout(() => {
                    setInView(entry.isIntersecting);
                }, delay);
            },
            { threshold }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [threshold, delay]);

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={className}
            style={{
                opacity: inView ? 1 : initialOpacity,
                transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
                filter: blur ? (inView ? "blur(0px)" : "blur(10px)") : "none",
                pointerEvents: inView ? "auto" : "none",
            }}
        >
            {children}
        </div>
    );
};

export default FadeContent;
