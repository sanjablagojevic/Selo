/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, Divider, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface VillageProfileProps {
    editMode: boolean;
    //handleProfileUpdate: () => void;
    //handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFileUpload: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
    handleFilesUpload: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
    setEditMode: (edit: boolean) => void;
    seloId: number;
}

const SeloProfil: React.FC<VillageProfileProps> = ({
    seloId,
    editMode,
    handleFileUpload,
    handleFilesUpload
}) => {
    const [selectedSelo, setSelectedSelo] = useState<any | null>(null);
    const { id: routeSeloId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7249/api/Selo/${routeSeloId}`)
            .then(response => {
                const seloData = response.data;
                setSelectedSelo(seloData);
            })
            .catch(error => console.error('Error fetching selo:', error));
    }, [routeSeloId]);

    if (!selectedSelo) {
        return <Typography>Loading...</Typography>;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedSelo((prevSelo: any) => ({
            ...prevSelo,
            [name]: value,
        }));
    };

    const handleProfileUpdate = async () => {
        try {
            await axios.put(`https://localhost:7249/api/Selo/${routeSeloId}`, selectedSelo);
            alert('Profil sela je uspjesno azuriran.');
        } catch (error) {
            console.error('Greška prilikom ažuriranja profila sela:', error);
            alert('Došlo je do greške prilikom ažuriranja profila.');
        }
    };


    return (
        <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', p: 4 }}>
            <Typography variant="h6" gutterBottom>
                {editMode ? 'Izmijeni profil sela' : 'Profil sela'}
            </Typography>

            <Button
                variant="contained"
                component={Link}
                to={`/news/${routeSeloId}`} 
                sx={{ ml: 2 }}
            >
               Idi na novosti
            </Button>

            {/* General Information Section */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6">General Information</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Naziv"
                                name="naziv"
                                value={selectedSelo?.naziv || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ovlasceni Korisnik"
                                name="ovlasceniKorisnik"
                                value={selectedSelo?.ovlasceniKorisnik || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={
                                    <span>
                                        Povrsina (km<sup>2</sup>)
                                    </span>
                                }
                                name="povrsina"
                                value={selectedSelo?.povrsina || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Broj Stanovnika"
                                name="brojStanovnika"
                                value={selectedSelo?.brojStanovnika || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                                type="number"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Location Section */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6">Location</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Latitude"
                                name="lat"
                                value={selectedSelo?.lat || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{'\u00B0'}</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Longitude"
                                name="lng"
                                value={selectedSelo?.lng || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{'\u00B0'}</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Agriculture & Tourism Section */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6">Agriculture & Tourism</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Specijalizacija Poljoprivrede"
                                name="specijalizacijaPoljoprivrednogSektora"
                                value={selectedSelo?.specijalizacijaPoljoprivrednogSektora || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Potencijal Agroturizma"
                                name="potencijalAgroturizma"
                                value={selectedSelo?.potencijalAgroturizma || ''}
                                disabled={!editMode}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6">Social Media</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Facebook Link"
                                name="facebook"
                                value={selectedSelo?.socialLinks?.facebook || ''}
                                onChange={handleChange}
                                disabled={!editMode}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Instagram Link"
                                name="instagram"
                                value={selectedSelo?.socialLinks?.instagram || ''}
                                onChange={handleChange}
                                disabled={!editMode}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Images and Files Section */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6">Images & Files</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1">Logo</Typography>
                            {selectedSelo?.logoUrl && <img src={selectedSelo.logoUrl} alt="Logo" width={100} />}
                            {editMode && (
                                <Button variant="contained" component="label">
                                    Upload Logo
                                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'logo')} />
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">QR Code</Typography>
                            {selectedSelo?.qrCodeUrl && <img src={selectedSelo.qrCodeUrl} alt="QR Code" width={100} />}
                            {editMode && (
                                <Button variant="contained" component="label">
                                    Upload QR Code
                                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'qrCode')} />
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Photos</Typography>
                            {editMode && (
                                <Button variant="contained" component="label">
                                    Upload Photos
                                    <input type="file" hidden multiple onChange={(e) => handleFilesUpload(e, 'photos')} />
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Documents</Typography>
                            {editMode && (
                                <Button variant="contained" component="label">
                                    Upload Document
                                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'documents')} />
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Save/Close Button */}
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleProfileUpdate}>
                    {editMode ? 'Save Changes' : 'Close'}
                </Button>
                {editMode && (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigate(-1);
                        }}
                        sx={{ ml: 2 }}
                    >
                        Go Back
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SeloProfil;
