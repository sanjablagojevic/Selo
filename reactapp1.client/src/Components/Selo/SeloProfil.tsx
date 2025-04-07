/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface VillageProfileProps {
    selectedSelo: any | null;
    editMode: boolean;
    handleProfileUpdate: () => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFileUpload: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
    handleFilesUpload: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
    setEditMode: (edit: boolean) => void;
}

const SeloProfil: React.FC<VillageProfileProps> = ({
    selectedSelo,
    editMode,
    handleProfileUpdate,
    handleChange,
    handleFileUpload,
    handleFilesUpload,
    setEditMode,
}) => {

    return (
        <Box sx={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            p: 4
        }}>
            <Typography variant="h6" gutterBottom>
                {editMode ? 'Izmijeni profil sela' : 'Profil sela'}
            </Typography>

            {/* Village Info */}
            <TextField
                fullWidth
                label="Naziv"
                name="naziv"
                value={selectedSelo?.naziv || ''}
                disabled={!editMode}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Opis"
                name="opis"
                value={selectedSelo?.opis || ''}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
                multiline
                rows={4}
            />

            {/* Logo */}
            <div>
                <Typography variant="body1">Logo</Typography>
                {selectedSelo?.logoUrl && <img src={selectedSelo.logoUrl} alt="Logo" width={100} />}
                {editMode && <Button variant="contained" component="label">
                    Upload Logo
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'logo')} />
                </Button>}
            </div>

            {/* QR Code */}
            <div>
                <Typography variant="body1">QR Code</Typography>
                {selectedSelo?.qrCodeUrl && <img src={selectedSelo.qrCodeUrl} alt="QR Code" width={100} />}
                {editMode && <Button variant="contained" component="label">
                    Upload QR Code
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'qrCode')} />
                </Button>}
            </div>

            {/* Photos */}
            <div>
                <Typography variant="body1">Photos</Typography>

                {editMode && <Button variant="contained" component="label">
                    Upload Photos
                    <input type="file" hidden multiple onChange={(e) => handleFilesUpload(e, 'photos')} />
                </Button>}
            </div>

            {/* Social Media Links */}
            <TextField
                fullWidth
                label="Facebook Link"
                name="facebook"
                value={selectedSelo?.socialLinks?.facebook || ''}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Instagram Link"
                name="instagram"
                value={selectedSelo?.socialLinks?.instagram || ''}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
            />

            {/* Documents */}
            <div>
                <Typography variant="body1">Documents</Typography>

                {editMode && <Button variant="contained" component="label">
                    Upload Document
                    <input type="file" hidden onChange={(e) => handleFileUpload(e, 'documents')} />
                </Button>}
            </div>

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleProfileUpdate}>
                    {editMode ? 'Save Changes' : 'Close'}
                </Button>
                {editMode && <Button variant="outlined" onClick={() => setEditMode(false)}>
                    Go Back
                </Button>}
            </Box>
        </Box>
    );
};

export default SeloProfil;
