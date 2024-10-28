import { IContactCard } from "@/app/types";
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button
} from "@mui/material";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const { image, username, phone_number, email, address, created_time, updateData, id } = props;

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
                    <FavoriteIcon sx={{ color: COLOR }} />
                    <Button size="small" color="primary" onClick={() => updateData(id)}>Update Info</Button>
                </CardActions>
                <DeleteIcon sx={{ cursor: 'pointer', color: COLOR }} onClick={() => {}} />
            </CardActions>
        </Card>
    );
}

export default ContactCard;
