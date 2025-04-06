// src/components/SeloList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Modal, TextField, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface Selo {
    id: number;
    naziv: string;
    drzava: string;
    lokacija: string;
    ovlasceniKorisnik: string;
}

interface DodajSelo {
    naziv: string;
    drzava: string;
    lokacija: string;
    ovlasceniKorisnik: string;
}

const SeloList: React.FC = () => {
    const [sela, setSela] = useState<Selo[]>([]);
    const [open, setOpen] = useState(false);
    const [newSelo, setNewSelo] = useState<DodajSelo>({
        naziv: '',
        drzava: '',
        lokacija: '',
        ovlasceniKorisnik: '',
    });

    useEffect(() => {
        axios.get('https://localhost:7249/api/selo')
            .then(response => {
                console.log('Fetched data:', response.data);
                setSela(response.data);
            })
            .catch(error => console.error('There was an error fetching the villages!', error));
    }, []);

    const deleteSelo = (id: number) => {
        axios.delete(`https://localhost:7249/api/selo/${id}`)
            .then(() => {
                setSela(sela.filter(selo => selo.id !== id));
            })
            .catch(error => console.error('There was an error deleting the village!', error));
    };

    const viewSelo = (id: number) => {
        console.log(`View village with id: ${id}`);
        // Implement your view logic here
    };

    const editSelo = (id: number) => {
        console.log(`Edit village with id: ${id}`);
        // Implement your edit logic here
    };

    const handleAddSelo = () => {
        console.log(newSelo);
        axios.post(`https://localhost:7249/api/selo`, newSelo)
            .then(response => {
                setSela([...sela, response.data]);
                setOpen(false);
                setNewSelo({ naziv: '', drzava: '', lokacija: '', ovlasceniKorisnik: '' });
            })
            .catch(error => console.error('There was an error adding the village!', error));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSelo({
            ...newSelo,
            [name]: value,
        });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Lista Sela
            </Typography>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Dodaj novo selo
                </Button>
            </Box>
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
                                <TableCell>{selo.drzava}</TableCell>
                                <TableCell>{selo.lokacija}</TableCell>
                                <TableCell>{selo.ovlasceniKorisnik}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => viewSelo(selo.id)}
                                        title="View"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => editSelo(selo.id)}
                                        title="Edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => deleteSelo(selo.id)}
                                        title="Delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Adding New Selo */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="add-selo-modal"
                aria-describedby="add-selo-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography variant="h6" gutterBottom>Dodaj novo selo</Typography>
                    <TextField
                        fullWidth
                        label="Naslov"
                        name="naziv"
                        value={newSelo.naziv}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Drzava"
                        name="drzava"
                        value={newSelo.drzava}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Lokacija"
                        name="lokacija"
                        value={newSelo.lokacija}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Ovlasceni Korisnik"
                        name="ovlasceniKorisnik"
                        value={newSelo.ovlasceniKorisnik}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleAddSelo} sx={{ mt: 2 }}>
                        Dodaj
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default SeloList;
