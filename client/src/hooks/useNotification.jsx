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
            // autoHideDuration={100000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ top: '70px' }}
        >
            <Alert variant='filled' onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );

    return { showNotification, Notification };
};

export default useNotification;
