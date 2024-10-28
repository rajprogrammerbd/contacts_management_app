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

function ContactCard(props: IContactCard) {
    const { image, username, phone_number, email, address, created_time } = props;

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
                    <Typography gutterBottom variant="h5" component="div">{username}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Email Address: {email}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Phone Number (*): {phone_number}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Address (*): {address}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Created Time: (*): {created_time}</Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button size="small" color="primary">Update Info</Button>
            </CardActions>
        </Card>
    );
}

export default ContactCard;
