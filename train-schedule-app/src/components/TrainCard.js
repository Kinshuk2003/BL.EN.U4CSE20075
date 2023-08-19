import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function TrainCard({ train }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{train.trainName}</Typography>
        <Typography>Train Number: {train.trainNumber}</Typography>
        <Typography>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</Typography>
        <Typography>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</Typography>
        <Typography>Price (Sleeper): {train.price.sleeper}</Typography>
        <Typography>Seats Available (AC): {train.seatsAvailable.AC}</Typography>
        <Typography>Price (AC): {train.price.AC}</Typography>
        <Typography>Delay: {train.delayedBy} minutes</Typography>
      </CardContent>
    </Card>
  );
}

export default TrainCard;
