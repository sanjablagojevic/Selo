/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AddSeloModal from './AddSeloModal';
import DeleteSeloModal from './DeleteSeloModal';

interface Selo {
    id: number;
    naziv: string;
    country: string;
    city: string;
    ovlasceniKorisnik: string;
}

interface DodajSelo {
    naziv: string;
    country: string;
    city: string;
    ovlasceniKorisnik: string;
}

const SeloList: React.FC = () => {
    const [sela, setSela] = useState<Selo[]>([]);
    const [open, setOpen] = useState(false);
    const [newSelo, setNewSelo] = useState<DodajSelo>({
        naziv: '',
        country: '',
        city: '',
        ovlasceniKorisnik: '',
    });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteSeloId, setDeleteSeloId] = useState<number | null>(null);
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    const navigate = useNavigate();

    // Fetch countries and cities as before
    useEffect(() => {
        axios.get('https://localhost:7249/api/Selo/countries')
            .then(response => setCountries(response.data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        if (newSelo.country) {
            axios.get(`https://localhost:7249/api/Selo/countries/${newSelo.country}/cities`)
                .then(response => setCities(response.data))
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [newSelo.country]);

    useEffect(() => {
        axios.get('https://localhost:7249/api/selo')
            .then(response => setSela(response.data))
            .catch(error => console.error('There was an error fetching the villages!', error));
    }, []);

    const deleteSelo = () => {
        if (deleteSeloId !== null) {
            axios.delete(`https://localhost:7249/api/selo/${deleteSeloId}`)
                .then(() => {
                    setSela(sela.filter(selo => selo.id !== deleteSeloId));
                    setOpenDeleteModal(false);
                    setDeleteSeloId(null);
                })
                .catch(error => {
                    console.error('There was an error deleting the village!', error);
                    setOpenDeleteModal(false);
                });
        }
    };

    const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedCountry = event.target.value as string;
        setNewSelo({ ...newSelo, country: selectedCountry, city: '' });
    };

    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedCity = event.target.value as string;
        setNewSelo({ ...newSelo, city: selectedCity });
    };

    const handleAddSelo = () => {
        axios.post(`https://localhost:7249/api/selo`, newSelo)
            .then(response => {
                setSela([...sela, response.data]);
                setOpen(false);
                setNewSelo({ naziv: '', country: '', city: '', ovlasceniKorisnik: '' });
            })
            .catch(error => console.error('There was an error adding the village!', error));
    };

    const openDeleteConfirmation = (id: number) => {
        setDeleteSeloId(id);
        setOpenDeleteModal(true);
    };

    const closeDeleteConfirmation = () => {
        setOpenDeleteModal(false);
        setDeleteSeloId(null);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Lista Sela</Typography>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Dodaj novo selo</Button>
            </Box>

            {/* Render modals */}
            <AddSeloModal
                open={open}
                onClose={() => setOpen(false)}
                countries={countries}
                cities={cities}
                newSelo={newSelo}
                handleChange={(e) => setNewSelo({ ...newSelo, [e.target.name]: e.target.value })}
                handleCountryChange={handleCountryChange}
                handleCityChange={handleCityChange}
                handleAddSelo={handleAddSelo}
            />

            <DeleteSeloModal
                open={openDeleteModal}
                onClose={closeDeleteConfirmation}
                onDelete={deleteSelo}
            />

            {/* Village Table */}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Naslov</strong></TableCell>
                            <TableCell><strong>Drzava</strong></TableCell>
                            <TableCell><strong>Lokacija</strong></TableCell>
                            <TableCell><strong>Ovlasceni Korisnik</strong></TableCell>
                            <TableCell align="center"><strong>Akcija</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sela.map(selo => (
                            <TableRow key={selo.id}>
                                <TableCell>{selo.naziv}</TableCell>
                                <TableCell>{selo.country}</TableCell>
                                <TableCell>{selo.city}</TableCell>
                                <TableCell>{selo.ovlasceniKorisnik}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => navigate(`/view/${selo.id}`)} title="View">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => { }} title="Edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => openDeleteConfirmation(selo.id)} title="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SeloList;
