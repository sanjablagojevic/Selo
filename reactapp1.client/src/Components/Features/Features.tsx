import React, { useEffect, useState } from 'react';

interface Novost {
    id: number;
    naslov: string;
    opis: string;
}

const Features: React.FC = () => {
    const [news, setNews] = useState<Novost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://localhost:7249/api/Novosti'); // Update this URL with your actual API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setNews(data);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch news');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const lastThreeNews = news.slice(-3);

    return (
        <section id="features" className="features">
            <h2>Novosti</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="feature-cards">
                        {lastThreeNews.map((novost) => (
                        <div className="feature-card" key={novost.id}>
                            <h3>{novost.naslov}</h3>
                            <p>{novost.opis}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Features;
