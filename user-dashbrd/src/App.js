import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import UserList from './components/UserList';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    axios.get('https://api.github.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);
  
  const filteredUsers = users.filter(user => user.login.toLowerCase().includes(search.toLowerCase()));
  
  return (
    <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', minHeight: '100vh' }}>
      <Container>
        <Button onClick={toggleTheme} variant="contained" style={{ marginBottom: 20 }}>
          Toggle Theme
        </Button>
        <TextField 
          label="Search Users" 
          variant="outlined" 
          fullWidth 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ marginBottom: 20 }}
        />
        
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        
        <Grid container spacing={2}>
          <UserList users={filteredUsers} />
        </Grid>
      </Container>
    </div>
  );
};

const WrappedApp = () => (
  <ThemeProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </ThemeProvider>
);

export default WrappedApp;
