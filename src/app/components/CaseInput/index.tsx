// src/components/CaseInput/index.tsx
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  CircularProgress,
  Box,
  Typography,
  TextareaAutosize,
} from '@mui/material';
import axios from 'axios';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';

type PrePromptQuality = {
  isPrePrePromptValid: boolean;
  explanation: string;
};

interface CaseInputProps {
  setTrialPrompt: (prompt: string) => void;
}

const rolesToString = (roles: { [key: string]: boolean }): string => {
  const selectedRoles = Object.keys(roles).filter((role) => roles[role]);
  return `Roles: ${selectedRoles.join(', ')}`;
};

const CaseInput: React.FC<CaseInputProps> = ({ setTrialPrompt }) => {
  const [text, setText] = useState(
    'The defendant, a renowned doctor (Nikita Polevoi), is accused of illegally prescribing opioids to patients without proper medical justification. The evidence includes patient records, undercover operation reports, and witness testimonies from former patients.'
  );
  const { judgeName, prosecutorName } = useSelector(
    (state: RootState) => state.trial
  );
  const submitDisabled = !judgeName || !prosecutorName;
  const [loading, setLoader] = useState(false);
  const [roles, setRoles] = useState({
    judge: true,
    lawyer: true,
    defendant: true,
    prosecutor: true,
  });

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoles({
      ...roles,
      [event.target.name]: event.target.checked,
    });
  };

  const onSubmit = async () => {
    setLoader(true);
    const rolesString = rolesToString(roles);
    const trialPrompt = text + ' ' + rolesString;

    try {
      const response = await axios.post('/api/userPromptCheck', {
        prePrompt: trialPrompt,
      });
      const promptQuality = response.data as PrePromptQuality;
      console.log('prePromptQuality', promptQuality);
      if (!promptQuality.isPrePrePromptValid) {
        alert(`Trial context is incorrect. ${promptQuality.explanation}`);
        return;
      }
      setTrialPrompt(trialPrompt);
    } catch (error) {
      console.error('Error fetching the response:', error);
      setTrialPrompt('');
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerContainer}>
        <Typography sx={styles.heading}>Case</Typography>
      </Box>

      <Box sx={styles.inputContainer}>
        <TextareaAutosize
          value={text}
          onChange={(e) => setText(e.target.value)}
          minRows={3}
          placeholder='Input trial context'
          style={styles.textarea}
        />
        <FormControl component='fieldset'>
          <FormGroup row>{/* ... (checkboxes remain the same) */}</FormGroup>
        </FormControl>
        <Box sx={styles.buttonContainer}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='outlined'
              onClick={onSubmit}
              sx={styles.button}
              disabled={submitDisabled}>
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CaseInput;
