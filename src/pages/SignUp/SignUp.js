import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/Auth';
import { withRouter, Redirect, Link } from 'react-router-dom';
import fire from '../../config/Fire';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'; // Added imports
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import mascot from '../../assets/mascot.png';
import avatar1 from '../../assets/avatars/avatar_1.png';
import avatar2 from '../../assets/avatars/avatar_2.png';
import avatar3 from '../../assets/avatars/avatar_3.png';
import avatar4 from '../../assets/avatars/avatar_4.png';
import avatar5 from '../../assets/avatars/avatar_5.png';
import avatar6 from '../../assets/avatars/avatar_6.png';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import parse from 'html-react-parser';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [fireErrors, setFireErrors] = useState("");

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];


  const handleSubmit = (event) => {
    event.preventDefault();

    var errs = "";
    if (name == "") { errs += "Please provide name." }

    if (errs == "") {
      fire.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          localStorage.setItem('user_details', JSON.stringify({ age, gender, avatar: selectedAvatar }));
          return userCredential.user.updateProfile({
            displayName: name,
          });

        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setFireErrors("This email has already been registered, please <a href='/login' className='auth-error-msg'>click here</a> to log in");
          }
          else {
            setFireErrors(error.message);
          }
        })
    } else {
      setFireErrors(errs);
    }
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/Home" />;
  }

  let errorNotification = fireErrors ?
    (<Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{parse(fireErrors)}</Alert>
    </Stack>)
    : null;

  // const theme = useTheme(); // Use global theme
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Box
          component="img"
          sx={{
            height: 150,
            width: 150,
            mb: 2,
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
              '100%': { transform: 'translateY(0px)' },
            }
          }}
          alt="Friendly Mascot"
          src={mascot}
        />
        <Typography component="h1" variant="h5" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
          Join the Fun!
        </Typography>
        <Typography component="h4" variant="h4">
          {errorNotification}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="FullName"
                label="Full Name"
                name="FullName"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                type="number"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  label="Gender"
                  onChange={(event) => setGender(event.target.value)}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
                Choose your Avatar:
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {avatars.map((avatar, index) => (
                  <Grid item key={index}>
                    <Box
                      component="img"
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        border: selectedAvatar === index ? '4px solid #4a90e2' : '2px solid transparent',
                        transform: selectedAvatar === index ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}