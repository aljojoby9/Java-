import React from 'react';
import VideoCallInterface from '../components/VideoCall/VideoCallInterface';
import ScreenShareView from '../components/ScreenShare/ScreenShareView';
import ChatBox from '../components/Chat/ChatBox';

const MeetingPage = () => {
  return (
    <div className="page-container">
      <h1>Meeting in Progress</h1>
      <div className="placeholder-component">
        <VideoCallInterface />
      </div>
      <div className="placeholder-component">
        <ScreenShareView />
      </div>
      <div className="placeholder-component">
        <ChatBox />
      </div>
    </div>
  );
};

export default MeetingPage;
