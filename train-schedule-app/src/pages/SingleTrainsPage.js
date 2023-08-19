import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import TrainCard from '../components/TrainCard';

function SingleTrainPage() {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchSingleTrain = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/trains/${trainNumber}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrain(data);
      } catch (error) {
        console.error('Error fetching single train data:', error);
      }
    };
  
    if (trainNumber) {
      fetchSingleTrain();
    }
  }, [trainNumber]);

  if (!train) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">Train Details</Typography>
      <TrainCard train={train} />
    </Container>
  );
}

export default SingleTrainPage;
