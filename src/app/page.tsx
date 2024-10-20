// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import Layout from './components/Layout';
import CaseInput from './components/CaseInput';
import TrialChat from './components/TrialChat';

const Home: React.FC = () => {
  const [trialPrompt, setTrialPrompt] = useState('');
  console.log('trialPrompt', trialPrompt);
  return (
    <Layout>
      <CaseInput setTrialPrompt={setTrialPrompt} />
      <TrialChat sseUrlBase='/api/run-trial' trialPrompt={trialPrompt} />
    </Layout>
  );
};

export default Home;
