import { DELETEDataResponse, IContactCard } from "@/app/types";
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteContact } from "@/app/utils/contacts";
import { RootState, useAppDispatch, useAppSelector } from "@/lib/store";
import { handleFavorites } from "@/lib/slices/list";

const COLOR = "#1976d2";
const stylesTypography = {
    color: 'text.secondary',
    fontSize: '0.8rem'
}

const spaceStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
}

function ContactCard(props: IContactCard) {
    const dispatch = useAppDispatch();
    const { lists } = useAppSelector((root: RootState) => root.lists);
    const { image, username, phone_number, email, address, created_time, updateData, id } = props;
    const queryClient = useQueryClient();

    const mutation = useMutation<DELETEDataResponse, Error, string>(
        (id: string) => deleteContact(id),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
          }
        }
    );

    const search = (id: string): boolean => {
        const idx = lists.findIndex((v: string) => v === id);

        if (idx === -1) {
            return false;
        }

        return true;
    }

    const handleDelete = () => {
        mutation.mutate(id);
        dispatch(handleFavorites(id));
    }

    const handleFavorite = (id: string) => {
        dispatch(handleFavorites(id));
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={`api/contacts/${image}`}
                    sx={{ width: '100%', height: '300px' }}
                    alt={`${username} profile picture`}
                />

                <CardContent>
                    <Typography gutterBottom variant="h4" sx={{ fontWeight: 'bold' }} component="div">{username}</Typography>
                    <Typography variant="body2" sx={stylesTypography}>Email Address: {email}</Typography>
                    <Typography variant="body2" sx={stylesTypography}>Phone Number (<span style={{ color: 'red' }}>*</span>): {phone_number}</Typography>
                    <Typography variant="body2" sx={stylesTypography}>Address (<span style={{ color: 'red' }}>*</span>): {address}</Typography>
                    <Typography variant="body2" sx={stylesTypography}>Created Time: (<span style={{ color: 'red' }}>*</span>): {created_time}</Typography>
                </CardContent>
            </CardActionArea>

            <CardActions sx={spaceStyles}>
                <CardActions>
                    {search(id) ? (
                        <FavoriteIcon sx={{ color: COLOR, cursor: 'pointer' }} onClick={() => handleFavorite(id)} />
                    ) : (
                        <FavoriteBorderIcon sx={{ color: COLOR, cursor: 'pointer' }} onClick={() => handleFavorite(id)} />
                    )}
                    <Button size="small" color="primary" onClick={() => updateData(id)}>Update Info</Button>
                </CardActions>
                <DeleteIcon sx={{ cursor: 'pointer', color: COLOR }} onClick={handleDelete} />
            </CardActions>
        </Card>
    );
}

export default ContactCard;
