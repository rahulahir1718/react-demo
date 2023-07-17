import { Box, Card, IconButton, Grid } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const TeamDetail = (props) => {

    const editTeam = (id) => {
        props.onTeamEdit(id)
    };


    const deleteTeam = (id) => {
        props.onTeamDelete(id)
    };

    return (
    <Card className='team-detail-card'>
        <div><b>Team Name: </b> {props.teamName}</div>
        <div><b>Team Captain: </b> {props.teamCaptain}</div>
        <div><b>Home Groud: </b> {props.teamHome}</div>
        <div><b>Founded In:</b> {props.teamFoundedIn}</div>
        <Grid container justifyContent="flex-end">
            <Box display="flex" alignItems="center">
                <IconButton onClick={() => editTeam(props.teamID)}>
                    <ModeEditOutlineIcon/>
                </IconButton>
                <IconButton onClick={() => deleteTeam(props.teamID )}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Grid>
    </Card>
    );
}

export default TeamDetail;