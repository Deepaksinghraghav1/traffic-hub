import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Monitor, Clock, ChevronDown } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'auto';

interface ThemeToggleProps {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    align?: 'left' | 'right';
    direction?: 'up' | 'down';
}

export function ThemeToggle({ theme, setTheme, align = 'right', direction = 'down' }: ThemeToggleProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const options = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
        { id: 'auto', label: 'Auto (Time)', icon: Clock },
    ] as const;

    const CurrentIcon = options.find(opt => opt.id === theme)?.icon || Monitor;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all hover:scale-105 active:scale-95 text-zinc-600 dark:text-zinc-300 shadow-sm"
                aria-label="Toggle theme"
            >
                <CurrentIcon className="size-5" />
                <ChevronDown className={`size-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div 
                    className={`absolute ${direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-200 ${
                        align === 'right' ? 'right-0' : 'left-0'
                    }`}
                >
                    {options.map((option) => {
                        const Icon = option.icon;
                        const isActive = theme === option.id;
                        return (
                            <button
                                key={option.id}
                                onClick={() => {
                                    setTheme(option.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-bold ${
                                    isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                                }`}
                            >
                                <Icon className="size-4.5" />
                                {option.label}
                                {isActive && (
                                    <div className="ml-auto size-1.5 bg-white rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
