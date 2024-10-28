'use client';
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Alert,
  Box
} from "@mui/material";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import { getAllContacts } from "./utils/contacts";
import { IContact, IContactList } from "./types";
import ContactCard from "./Components/Cards";

const BoxWrapper = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
`;
 
export default function Home() {
  const { data, isLoading: loadingContacts, isError: failedLoadingContacts } = useQuery<IContactList>({
    queryFn: async () => await getAllContacts(),
    queryKey: ["contacts"],
  });

  return (
    <Container maxWidth="xl">
      {loadingContacts && (
        <CircularProgress />
      )}

      {failedLoadingContacts && (
        <Alert variant="filled" severity="error">
          Network Error. Failed to get contacts
        </Alert>
      )}

      {(data && data.length) && (
        <BoxWrapper>
          {data.map(({ _id, address, email, name, profilePicture, phone_number, created_time }: IContact) =>
            <ContactCard
              key={_id}
              address={address}
              created_time={created_time}
              email={email}
              image={profilePicture}
              phone_number={phone_number}
              username={name}
            />
          )}
        </BoxWrapper>
      )}
    </Container>
  )
}
