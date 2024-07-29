import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import StyledForm, { StyledFromSection } from '../styled/StyledForm';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactsFormFields, contactsSchema } from '../schemas/ContactsSchema.ts';
import { useInfoStore } from '../stores/InfoStore.tsx';
import { ContactsInfo } from '../types/Contacts.ts';
import { StyledFormTab } from '../styled/StyledFormTab.tsx';

const ContactsForm = () => {
  const contacts = useInfoStore((state) => state.contactsInfo);
  const changing = contacts.changing;
  const changeContactsInfo = useInfoStore((state) => state.changeContactsInfo);
  const { control, handleSubmit } = useForm<ContactsInfo>({
    defaultValues: contacts.contactsInfo,
    resolver: zodResolver(contactsSchema),
  });

  const onSubmit: SubmitHandler<ContactsFormFields> = (data) => {
    changeContactsInfo({ ...contacts, contactsInfo: data, changing: false, error: false });
  };

  const onInvalid = () => {
    changeContactsInfo({ ...contacts, error: true, changing: true });
  };

  return (
    <StyledForm noValidate onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <StyledFromSection>
        <StyledFormTab error={contacts.error}>
          <Box>
            <Typography padding="4px">Общая информация</Typography>
            <Box display="flex" gap="16px" marginTop="16px">
              <Controller
                name="lastName"
                control={control}
                render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
                  <FormControl>
                    <TextField
                      label="Фамилия"
                      placeholder="Иванов"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(error)}
                      inputRef={ref}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      disabled={!changing}
                    />
                    <FormHelperText error>{error?.message ?? ''}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                  <FormControl>
                    <TextField
                      label="Имя"
                      placeholder="Иван"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      inputRef={ref}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      disabled={!changing}
                    />
                    <FormHelperText error>{error?.message ?? ''}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="middleName"
                control={control}
                render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                  <FormControl>
                    <TextField
                      label="Отчество"
                      placeholder="Иванович"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      inputRef={ref}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={!changing}
                    />
                    <FormHelperText error>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
          </Box>
          <Box>
            <Typography padding="4px">Контакты</Typography>
            <Box display="flex" gap="16px" marginTop="16px">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                  <FormControl>
                    <TextField
                      label="Телефон"
                      placeholder="+7 (999) 999 99 99"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      inputRef={ref}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      disabled={!changing}
                    />
                    <FormHelperText error>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                  <FormControl>
                    <TextField
                      label="E-mail"
                      placeholder="ivanov.ivan@example.com"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      inputRef={ref}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={!changing}
                    />
                    <FormHelperText error>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
          </Box>
          <Box>
            <Typography padding="4px">Другое</Typography>
            <Box>
              <FormGroup>
                <Controller
                  name="luboiDvij"
                  control={control}
                  render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                    <>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="За любой движ"
                        checked={value}
                        inputRef={ref}
                        onChange={onChange}
                        disabled={!changing}
                      />
                      <FormHelperText error>{error?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormGroup>
            </Box>
          </Box>
        </StyledFormTab>
      </StyledFromSection>
      <StyledFromSection
        sx={{
          borderWidth: '0px 1px 1px 1px',
        }}
      >
        <Button variant="contained" type="submit" sx={{ marginLeft: 'auto' }}>
          <Typography textTransform="uppercase">сохранить</Typography>
        </Button>
      </StyledFromSection>
    </StyledForm>
  );
};

export default ContactsForm;
