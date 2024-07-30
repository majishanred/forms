import { styled, Stack } from '@mui/material';

export const StyledFormTab = styled(Stack)<{ error: unknown }>`
  box-sizing: border-box;
  padding: 12px;
  gap: 16px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow:
    0 3px 1px -2px #00000033,
    0 2px 2px 0 #00000024,
    0 1px 5px 0 #0000001f;

  outline: ${({ error }) => (error ? '1px solid red' : 'none')};
`;
