import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TrainList from '../components/TrainList';

function AllTrainsPage() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/trains'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrains(data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4">All Trains Schedule</Typography>
      <TrainList trains={trains} />
    </Container>
  );
}

export default AllTrainsPage;
