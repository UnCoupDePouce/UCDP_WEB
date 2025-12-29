import { useState, useEffect } from 'react';

export function useIsHorizontal() {
    const [isHorizontal, setIsHorizontal] = useState(true);

    useEffect(() => {
        const checkOrientation = () => {
            setIsHorizontal(window.innerWidth > window.innerHeight);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    return isHorizontal;
}