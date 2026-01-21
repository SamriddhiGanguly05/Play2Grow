import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DoctorCard from '../../component/DoctorCard/DoctorCard';
import Header from '../../component/Header';

const mockDoctors = [
    {
        id: 1,
        name: 'Mr. Varun',
        title: 'Psychologist',
        experience: '7 years',
        location: 'Alagapuram, Salem',
        clinic: 'IMHAPS Mental Health and Educational OPC Pvt Ltd',
        fees: 1500,
        rating: 100,
        stories: 10,
        available: true,
        image: 'https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg'
    },
    {
        id: 2,
        name: 'Dr. Sarah Smith',
        title: 'Behavioral Therapist',
        experience: '12 years',
        location: 'Fairlands, Salem',
        clinic: 'Happy Kids Therapy Center',
        fees: 2000,
        rating: 98,
        stories: 45,
        available: true,
        image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg'
    },
    {
        id: 3,
        name: 'Dr. Rajesh Kumar',
        title: 'Pediatric Neurologist',
        experience: '15 years',
        location: 'Junction, Salem',
        clinic: 'NeuroCare Speciality Hospital',
        fees: 2500,
        rating: 95,
        stories: 120,
        available: false,
        image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg'
    }
];

const ContactDoctor = () => {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="CONTACT DOCTORS" subtitle="Find and book appointments with autism specialists" />
            </Box>

            <Box mt="20px">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {mockDoctors.length} Best Doctors for Autism available in Salem
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    Book appointments with minimum wait-time & verified doctor details
                </Typography>

                {mockDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </Box>
        </Box>
    );
};

export default ContactDoctor;
