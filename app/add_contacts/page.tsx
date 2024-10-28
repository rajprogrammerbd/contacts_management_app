'use client';
import {
    Box,
    Typography,
    TextField
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { IContact, IFormInput } from "../types/index";
import { addNewContact } from "../utils/contacts";

function AddContacts() {
    const { register, handleSubmit } = useForm<IFormInput>();
    const queryClient = useQueryClient();

    const mutation = useMutation<IContact, Error, IFormInput>(
        (body: IFormInput) => addNewContact(body),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
          }
        }
    );

    const onSubmit: SubmitHandler<IFormInput> = data => mutation.mutate(data);

    return (
        <Box>
            <Typography variant="h5">Add a new contact:</Typography>

            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    fullWidth
                    label="Name"
                    required
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    {...register('name', { required: true, min: 1 })}
                />

                <TextField
                    fullWidth
                    label="Address"
                    required
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    {...register('address', { required: true, min: 1 })}
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="standard"
                    id="fullWidth"
                    {...register('email', { required: false, min: 1 })}
                />

                <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    type="text"
                    variant="standard"
                    id="fullWidth"
                    {...register('phone_number', { required: true, min: 1 })}
                />

                <TextField
                    fullWidth
                    required
                    label="Profile Picture"
                    type="file"
                    variant="standard"
                    id="fullWidth"
                    {...register('profilePicture', { required: true })}
                />

                <TextField type="submit" />
            </Box>
        </Box>
    )
}

export default AddContacts;
