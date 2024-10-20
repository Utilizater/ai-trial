// src/components/SelectedRoles/index.tsx
import React, { useState } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { setJudgeName, setProsecutorName } from '../../../lib/trialSlice';

interface Role {
  id: string;
  name: string;
}

const judges: Role[] = [
  { id: 'none', name: 'None' },
  { id: 'judge1', name: 'Chief Justice Patricia Guerrero' },
  { id: 'judge2', name: 'Chief Justice Steven C. González' },
  { id: 'judge3', name: 'Frank Caprio' },
];
const prosecutors: Role[] = [
  { id: 'none', name: 'None' },
  { id: 'prosecutor1', name: 'Attorney General' },
  { id: 'prosecutor2', name: 'Stephen D. Watson' },
  { id: 'prosecutor3', name: 'Steven Taylor Oetting' },
];

const SelectedRoles: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedJudge, setSelectedJudge] = useState<Role | null>(null);
  const [selectedProsecutor, setSelectedProsecutor] = useState<Role | null>(
    null
  );

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.heading}>Participant</Typography>
      <Box sx={styles.dropdownsContainer}>
        <Autocomplete
          options={judges}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              // label='Judge'
              placeholder='Judge'
              size='small'
              // variant='filled'
              InputLabelProps={{
                shrink: false,
              }}
              sx={{
                width: '70%',
                '& .MuiInputBase-root': {
                  bgcolor: 'background.paper',
                },
              }}
            />
          )}
          value={selectedJudge}
          onChange={(event, newValue) => {
            setSelectedJudge(newValue);
            dispatch(setJudgeName(newValue?.name as string));
          }}
          size='small'
          sx={{ width: '48%' }}
        />
        <Autocomplete
          options={prosecutors}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Prosecutor'
              size='small'
              sx={{
                width: '70%',
                '& .MuiInputBase-root': {
                  bgcolor: 'background.paper',
                },
              }}
            />
          )}
          value={selectedProsecutor}
          onChange={(event, newValue) => {
            setSelectedProsecutor(newValue);
            dispatch(setProsecutorName(newValue?.name as string));
          }}
          size='small'
          sx={{ width: '48%' }}
        />
      </Box>
    </Box>
  );
};

export default SelectedRoles;
