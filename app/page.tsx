'use client';
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Alert,
  Box,
  Typography
} from "@mui/material";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import { getAllContacts } from "./utils/contacts";
import { IContact, IContactList, IOpenState } from "./types";
import ContactCard from "./Components/Cards";
import MyDialog from "./Components/Modal";

const BoxWrapper = styled(Box)`
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 2rem;

  @media only screen and (max-width: 1260px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 882px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 590px) {
    grid-template-columns: 1fr;
  }
`;

function Common({
  children,
  open,
  closeDialogBox
}: Readonly<{
  children: React.ReactNode;
  open: IOpenState;
  closeDialogBox: () => void;
}>) {
  return (
    <Container maxWidth="xl">
      <Container maxWidth="xl">
        {children}
        <MyDialog open={open.status} onClose={closeDialogBox} id={open.id} />
      </Container>
    </Container>
  )
}

export default function Home() {
  const [open, setOpen] = useState<IOpenState>({
    status: false,
    id: ''
  });

  const { data, isLoading: loadingContacts, isError: failedLoadingContacts } = useQuery<IContactList>({
    queryFn: async () => await getAllContacts(),
    queryKey: ["contacts"],
  });

  const closeDialogBox = useCallback((): void => {
    setOpen(() => ({
      status: false,
      id: ''
    }));
  }, []);

  const updateData = useCallback((id: string): void => {
    setOpen(() => ({
      status: true,
      id
    }));
  }, []);

  if (loadingContacts) {
    return (
      <Common open={open} closeDialogBox={closeDialogBox}>
        <CircularProgress />
      </Common>
    );
  }

  if (failedLoadingContacts) {
    return (
      <Common open={open} closeDialogBox={closeDialogBox}>
        <Alert variant="filled" severity="error">
          Network Error. Failed to get contacts
        </Alert>
      </Common>
    )
  }

  return (
    <Common open={open} closeDialogBox={closeDialogBox}>
      {(data && data.length) ? (
        <BoxWrapper>
          {data.map(({ _id, address, email, name, profilePicture, phone_number, created_time }: IContact) =>
            <ContactCard
              updateData={updateData}
              id={_id}
              key={_id}
              address={address}
              created_time={new Date(created_time).toUTCString()}
              email={email}
              image={profilePicture}
              phone_number={phone_number}
              username={name}
            />
          )}
        </BoxWrapper>
      ) : (
        <Typography variant="h4">There is no contacts added</Typography>
      )}
    </Common>
  )
}
