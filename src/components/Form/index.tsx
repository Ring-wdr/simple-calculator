import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { formStyle, nameValidate, phoneValidate } from "./formutils";

export default function Form() {
  const { register, handleSubmit, formState } = useForm<SubmitFormState>();
  const onSubmit: SubmitHandler<SubmitFormState> = (data) => {
    console.log(data);
    throw new Error("dd");
  };
  const messageNameNotValid = formState.errors.name && "Name is required";
  const messagePhoneNotValid =
    formState.errors.phone && "Phone number needs exact form!";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={formStyle}>
        <TextField label="id" {...register("id")} />
        <TextField
          label="name"
          {...register("name", nameValidate)}
          error={!!formState.errors.name}
          helperText={messageNameNotValid}
          aria-invalid={!!formState.errors.name}
        />
        <TextField
          label="phone"
          {...register("phone", phoneValidate)}
          error={!!formState.errors.phone}
          helperText={messagePhoneNotValid}
          aria-invalid={!!formState.errors.phone}
        />
        <Button type="submit" variant="contained">
          제출
        </Button>
      </Box>
    </form>
  );
}
