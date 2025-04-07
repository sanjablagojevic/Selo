import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Modal, Box, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SeloProfil from './SeloProfil';
import { useNavigate } from 'react-router-dom';

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
    const [selectedSelo, setSelectedSelo] = useState<Selo | null>(null); // State to track the selected village
    const [editMode, setEditMode] = useState<boolean>(false); // State to track if we are in edit mode
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for delete confirmation modal
    const [deleteSeloId, setDeleteSeloId] = useState<number | null>(null); // ID of the village to delete

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:7249/api/selo')
            .then(response => {
                console.log('Fetched data:', response.data);
                setSela(response.data);
            })
            .catch(error => console.error('There was an error fetching the villages!', error));
    }, []);

    const deleteSelo = () => {
        if (deleteSeloId !== null) {
            axios.delete(`https://localhost:7249/api/selo/${deleteSeloId}`)
                .then(() => {
                    setSela(sela.filter(selo => selo.id !== deleteSeloId));
                    setOpenDeleteModal(false); // Close the modal after successful deletion
                    setDeleteSeloId(null); // Reset the delete ID
                })
                .catch(error => {
                    console.error('There was an error deleting the village!', error);
                    setOpenDeleteModal(false); // Close modal on error
                });
        }
    };

    const viewSelo = (id: number) => {
        navigate(`/view/${id}`);
    };

    const editSelo = (id: number) => {
        console.log(`Edit village with id: ${id}`);
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

    const openDeleteConfirmation = (id: number) => {
        setDeleteSeloId(id); // Store the ID of the village to delete
        setOpenDeleteModal(true); // Open the confirmation modal
    };

    const closeDeleteConfirmation = () => {
        setOpenDeleteModal(false); // Close the confirmation modal
        setDeleteSeloId(null); // Reset the delete ID
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

            {/* Conditionally render the village profile */}
            {selectedSelo && !editMode && (
                <SeloProfil
                    selectedSelo={selectedSelo}
                    editMode={editMode}
                    handleProfileUpdate={() => { }}
                    handleChange={() => { }}
                    handleFileUpload={() => { }}
                    handleFilesUpload={() => { }}
                    setEditMode={setEditMode}
                />
            )}

            {!selectedSelo && (
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
                                            onClick={() => openDeleteConfirmation(selo.id)} // Open the delete confirmation modal
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
            )}

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

            {/* Modal for Delete Confirmation */}
            <Modal
                open={openDeleteModal}
                onClose={closeDeleteConfirmation}
                aria-labelledby="delete-selo-modal"
                aria-describedby="delete-selo-modal-description"
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
                    <Typography variant="h6" gutterBottom>Da li ste sigurni da zelite da obrisete ovo selo?</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" color="error" onClick={deleteSelo}>
                            Obrisi
                        </Button>
                        <Button variant="outlined" color="primary" onClick={closeDeleteConfirmation}>
                            Otkazi
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default SeloList;
