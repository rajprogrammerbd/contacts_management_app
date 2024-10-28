import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";
import { IMyDialog, IMyDialogState, IUpdateContactProps, PATCHDataResponse } from "@/app/types";
import { updateContact } from "@/app/utils/contacts";

function MyDialog(props: IMyDialog) {
    const { open, onClose, id } = props;
    const queryClient = useQueryClient();

    const [state, setState] = useState<IMyDialogState>(() => {
        return {
            name: '',
            address: '',
            email: '',
            phone_number: ''
        }
    });

    const mutation = useMutation<PATCHDataResponse, Error, IUpdateContactProps>(
        (props) => updateContact(props),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
          }
        }
      );
      

    const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
        const name = e.target.name;
        const value = e.target.value;

        setState((prev: IMyDialogState) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const handleSubmit = () => {
        if (state.address === '' && state.email === '' && state.name === '' && state.phone_number === '') {
            toast('User must complete a input field');
            return;
        }

        const filter: Partial<IMyDialogState> = {};
        type IKEY = keyof typeof state;

        for (const key in state) {
            const K: IKEY = key as IKEY;

            const value = state[K];

            if (value !== '') {
                filter[K] = value;
            }
        }

        const result = filter as IMyDialogState;

        mutation.mutate({ id, ...result });
        onClose();
    }

    return (
        <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Update Contact</DialogTitle>
        <DialogContent>
            <TextField
                name="name"
                label="User Name"
                value={state.name}
                type="text"
                onChange={changeValue}
                fullWidth
                variant="standard"
            />

            <TextField
                name="address"
                label="Address"
                type="text"
                onChange={changeValue}
                value={state.address}
                fullWidth
                variant="standard"
            />

            <TextField
                name="email"
                label="Email Address"
                type="email"
                onChange={changeValue}
                value={state.email}
                fullWidth
                variant="standard"
            />

            <TextField
                name="phone_number"
                label="Phone Number"
                type="text"
                onChange={changeValue}
                fullWidth
                value={state.phone_number}
                variant="standard"
            />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>UPDATE</Button>
        </DialogActions>
      </Dialog>
      );
}

export default MyDialog;
