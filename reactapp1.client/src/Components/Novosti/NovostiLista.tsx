import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import AddNews from './AddNews';

interface Novost {
    id: number;
    naslov: string;
    opis: string;
}

const NovostiLista: React.FC = () => {
    const [news, setNews] = useState<Novost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { id: routeSeloId } = useParams<{ id: string }>();

    // Function to fetch the news
    const fetchNews = async () => {
        try {
            const response = await axios.get(`https://localhost:7249/api/Novosti/${routeSeloId}`);
            setNews(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to load news. Please try again later.');
            setLoading(false);
        }
    };

    // Call fetchNews when the component is mounted or routeSeloId changes
    useEffect(() => {
        fetchNews();
    }, [routeSeloId]);

    // Function to handle modal open/close
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    // Function to refresh the news list after adding a new one
    const handleNewsAdded = () => {
        fetchNews();  // Refresh the news list
        handleCloseModal();  // Close the modal
    };

    const lastThreeNews = news.slice(-3);

    return (
        <section id="features" className="features">
            <h2>Novosti</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
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
            {/* Button to open modal */}
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Dodaj Novost
            </Button>

            {/* Modal for adding news */}
            <Dialog open={modalOpen} onClose={handleCloseModal}>
                <DialogTitle>Dodaj Novost</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        <AddNews seloId={parseInt(routeSeloId)} onClose={handleCloseModal} onNewsAdded={handleNewsAdded} />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default NovostiLista;
