import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Modal, Button } from '@mui/material';

const UserList = ({ users }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {users.map(user => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card onClick={() => handleOpenModal(user)} style={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">{user.login}</Typography>
              <img src={user.avatar_url} alt={user.login} style={{ width: 50, height: 50, borderRadius: '50%' }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
      
      {selectedUser && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <div style={{ padding: 20, backgroundColor: 'white', margin: 'auto', marginTop: '10%', maxWidth: '500px' }}>
            <Typography variant="h5">{selectedUser.login}</Typography>
            <Typography variant="body1">Bio: {selectedUser.bio || 'No bio available'}</Typography>
            <Typography variant="body1">Public Repos: {selectedUser.public_repos}</Typography>
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserList;
