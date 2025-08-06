import React from 'react';
import Scheduler from '../components/MeetingScheduler/Scheduler';

const HomePage = () => {
  return (
    <div className="page-container">
      <h1>Welcome to VideoSync!</h1>
      <p>Your one-stop solution for video conferencing and collaboration.</p>
      <div className="placeholder-component">
        <Scheduler />
      </div>
    </div>
  );
};

export default HomePage;
