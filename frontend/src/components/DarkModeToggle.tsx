import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );

    // Persist preference in localStorage
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.classList.toggle('dark', saved === 'dark');
            setIsDark(saved === 'dark');
        }
    }, []);

    const toggle = () => {
        const next = !isDark;
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
        setIsDark(next);
    };

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-primary/10 text-dark hover:text-primary transition-all duration-300"
            aria-label="Toggle dark mode"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default DarkModeToggle;

