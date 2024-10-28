'use client';
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Alert
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { getAllContacts } from "./utils/contacts";
import { IContactList } from "./types";
 
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
        <Typography variant="h5">There is a list</Typography>
      )}
    </Container>
  )
}
