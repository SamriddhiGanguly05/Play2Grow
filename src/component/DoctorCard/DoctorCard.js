import React from 'react';
import { Box, Typography, Button, Avatar, Chip, Rating, Card, CardContent } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SendIcon from '@mui/icons-material/Send';

const DoctorCard = ({ doctor }) => {
    const { name, title, experience, location, clinic, fees, rating, stories, image, available } = doctor;

    return (
        <Card sx={{ display: 'flex', mb: 2, padding: 2, boxShadow: 2, borderRadius: 2 }}>
            {/* Left Side: Image and Basic Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
                <Avatar src={image} alt={name} sx={{ width: 80, height: 80, mb: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#8d3bfb' }}>
                    <VerifiedIcon fontSize="small" />
                </Box>
            </Box>

            {/* Middle: Details */}
            <CardContent sx={{ flex: 1, pt: 0 }}>
                <Typography variant="h5" component="h2" sx={{ color: '#0078d4', fontWeight: 'bold' }}>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {experience} experience overall
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{location}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>•</Typography>
                    <Typography variant="body2" color="text.secondary">{clinic}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    ₹{fees} Consultation fee at clinic
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        icon={<ThumbUpIcon fontSize="small" sx={{ color: 'white !important' }} />}
                        label={`${rating}%`}
                        sx={{ backgroundColor: '#00a500', color: 'white', fontWeight: 'bold', borderRadius: 1, height: 24, mr: 1 }}
                    />
                    <Typography variant="body2" sx={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                        {stories} Patient Stories
                    </Typography>
                </Box>
            </CardContent>

            {/* Right Side: Actions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minWidth: 200, gap: 1 }}>

                {available && (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#00a500', mb: 1 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="bold">Available Today</Typography>
                    </Box>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: '#2ba3d4', textTransform: 'none', fontWeight: 'bold' }}
                    onClick={() => alert(`Booking appointment with ${name}`)}
                >
                    Book Clinic Visit
                    <Typography variant="caption" display="block" sx={{ width: '100%', fontSize: '0.6rem', textAlign: 'center' }}>No Booking Fee</Typography>
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<LocalPhoneIcon />}
                    sx={{ textTransform: 'none', fontWeight: 'bold', borderColor: '#2ba3d4', color: '#2ba3d4' }}
                    onClick={() => alert(`Contacting clinic of ${name}`)}
                >
                    Contact Clinic
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<SendIcon />}
                    color="secondary"
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    onClick={() => alert(`Report sent to ${name}`)}
                >
                    Send Report
                </Button>

            </Box>
        </Card>
    );
};

export default DoctorCard;
