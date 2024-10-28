'use client';
import { useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    FormHelperText
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { redirect } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';
import { useForm, SubmitHandler } from "react-hook-form";
import { IContact, IFormInput } from "../types/index";
import { addNewContact } from "../utils/contacts";

const ErrorMessage = styled(FormHelperText)`
    color: red;
`;

const TextFields = styled(TextField)`
    margin-top: 5px;
`;

function AddContacts() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const queryClient = useQueryClient();

    const mutation = useMutation<IContact, string, IFormInput>(
        (body: IFormInput) => addNewContact(body),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
          }
        }
    );

    const onSubmit: SubmitHandler<IFormInput> = data => {
        mutation.mutate(data);
    };

    const isSuccess = mutation.isSuccess;

    useEffect(() => {
        if (isSuccess) {
            redirect('/');
        }
    }, [isSuccess]);

    return (
        <Box>
            <Typography variant="h5">Add a new contact:</Typography>

            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextFields
                    fullWidth
                    label="Name"
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters long' } })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                <TextFields
                    fullWidth
                    label="Address"
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

                <TextFields
                    fullWidth
                    label="Email"
                    type="email"
                    variant="standard"
                    id="fullWidth"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address'
                        }
                      })}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                <TextFields
                    fullWidth
                    label="Phone Number"
                    type="text"
                    variant="standard"
                    id="fullWidth"
                    {...register('phone_number', { required: 'Phone Number is required' })}
                />
                {errors.phone_number && <ErrorMessage>{errors.phone_number.message}</ErrorMessage>}

                <TextFields
                    fullWidth
                    label="Profile Picture"
                    type="file"
                    variant="standard"
                    inputProps={{ accept: 'image/*', multiple: false }}
                    id="fullWidth"
                    {...register('profilePicture', { required: 'Profile Picture is required' })}
                />
                {errors.profilePicture && <ErrorMessage>{errors.profilePicture.message}</ErrorMessage>}

                {mutation.isLoading ? <CircularProgress /> : <TextFields sx={{ mt: '18px !important' }} type="submit" />}
            </Box>
        </Box>
    )
}

export default AddContacts;
