import { Button, styled } from '@mui/material';

const StyledTab = styled(Button)<{ choosen: boolean; error?: unknown }>`
  border-radius: 0;
  border-bottom: ${({ choosen, error }) => (choosen || error ? '2px solid #2196F3' : 'none')};
  border-color: ${({ error }) => (error ? 'red' : '#2196F3')};
`;

export default StyledTab;
