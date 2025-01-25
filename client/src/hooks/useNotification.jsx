import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const useNotification = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success'); // Can be 'success', 'error', 'info', 'warning'

    const showNotification = (message, severity = 'success') => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Notification = () => (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{
                '& .MuiSnackbarContent-root': {
                    borderRadius: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#1976d2', // Example background
                    color: 'white', // Text color
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.2)', // Shadow
                },
            }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );

    return { showNotification, Notification };
};

export default useNotification;
