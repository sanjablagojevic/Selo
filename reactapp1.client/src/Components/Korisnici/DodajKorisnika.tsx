import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

interface DodajKorisnikaProps {
    open: boolean;
    onClose: () => void;
    onAddUser: (newUser: ApplicationUser) => void;
    villages: string[]; // Assuming villages are passed as props
}

export interface ApplicationUser {
    id: string;
    userName: string;
    userSurname: string,
    email: string;
    villages: string[]; // Assign multiple villages to a user
}

const DodajKorisnika: React.FC<DodajKorisnikaProps> = ({ open, onClose, onAddUser, villages }) => {
    const [newUser, setNewUser] = useState<ApplicationUser>({
        id: '',
        userName: '',
        userSurname: '',
        email: '',
        villages: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleVillageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            villages: event.target.value as string[], // Update with selected villages
        }));
    };

    const handleAddUser = async () => {
        try {
            // Send POST request to add the user
            await axios.post('https://localhost:7249/api/usermanager/register', newUser);
            onAddUser(newUser); // Call the function to update the users in the parent component
            setNewUser({ id: '', userName: '', userSurname: '', email: '', villages: [] }); // Reset the form
            onClose(); // Close the modal
        } catch (err) {
            console.error('Failed to add user:', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Dodaj korisnika</DialogTitle>
            <DialogContent>
                <TextField
                    label="Ime"
                    name="userName"
                    value={newUser.userName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Prezime"
                    name="userSurname"
                    value={newUser.userSurname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Pridruzena Sela</InputLabel>
                    <Select
                        multiple
                        value={newUser.villages}
                        label="Pridružena Sela"
                    >
                        {villages.map((village) => (
                            <MenuItem key={village} value={village}>
                                {village}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Otkazi
                </Button>
                <Button onClick={handleAddUser} color="primary">
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DodajKorisnika;
