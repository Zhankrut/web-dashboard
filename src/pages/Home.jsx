import React from 'react';
import { useNavigate } from 'react-router-dom';
import vulnerabilityScan from '../assets/Images/vulnerabilityScan.avif';

export const Home = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Vulnerability Scanner',
            description: 'Run automated vulnerability scans using OWASP ZAP and view results in real-time.',
            image: vulnerabilityScan,
            path: '/vulnerability-scan',
        },
        {
            title: 'Honeypot Monitoring',
            description: 'Monitor attacker activity from honeypots like HoneyDB and Cowrie.',
            image: vulnerabilityScan,
            path: '/honeypot-monitoring',
        },
        {
            title: 'Password Vault',
            description: 'Securely store and manage application passwords using the vault system.',
            image: vulnerabilityScan,
            path: '/password-vault',
        },
        {
            title: 'SIEM Monitoring',
            description: 'Analyze system logs and attack data with Microsoft Sentinel SIEM.',
            image: vulnerabilityScan,
            path: '/siem-monitoring',
        },
    ];

    return (
        <div className="mx-10 my-6 flex flex-wrap gap-8">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="relative group w-80 h-80 bg-black overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => navigate(card.path)}
                >
                    <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-40"
                    />
                    <div className="relative z-10 flex flex-col justify-end h-full p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                        <h3 className="text-white text-2xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-white text-sm max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40">
                            {card.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
