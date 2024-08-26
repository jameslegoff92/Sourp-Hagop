import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const BackgroundImageContainer = ({ children, style }) => (
    <motion.div 
        className="fixed left-0 right-0 flex justify-center items-center z-[-1]"
        style={style}
    >
        {children}
    </motion.div>
);

const BackgroundImage = ({ src }) => (
    <img src={src} className="w-full max-w-[800px] h-[auto] object-contain opacity-10" />
);

const BackgroundLogo = ( {src, style} ) => {

    const { scrollY, scrollYProgress } = useScroll();
    const ref = useRef(null);
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const updateLayout = () => {
            if (ref.current) {
                setElementTop(ref.current.offsetTop);
            }
            setViewportHeight(window.innerHeight);
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const backgroundY = useTransform(
        scrollY,
        [0, viewportHeight * 0.1],
        ["150%", "15%"]
    );

    const backgroundOpacity = useTransform(
        scrollY,
        [0, viewportHeight * 0.2],
        [0.3, 0.3]
    );

    return (
        <>
            <BackgroundImageContainer style={{ y: backgroundY, opacity: backgroundOpacity, ...style }}>
                <BackgroundImage src={ src } />
            </BackgroundImageContainer>
        </>
    );
};

export default BackgroundLogo;

