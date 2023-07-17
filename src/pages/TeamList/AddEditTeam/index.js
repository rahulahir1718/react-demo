import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import {FormControl, InputLabel, Select, MenuItem, IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Classes from '../../../Invalid.module.css';
import React from 'react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const AddEditTeam = (props) => {
    const [teamName, SetTeamName] = useState('');
    const [teamCaptain, SetTeamCaptain] = useState('');
    const [teamHome, SetTeamHome] = useState(''); 
    const [teamFoundedIn, SetTeamFoundedIn] = useState(2008);
    const [formSubmitted, SetFormSubmitted] = useState(false);
    const [title, SetTitle] = useState("Add Team");
    const [id, setId] = useState(null);
    
    useEffect(()=>{
        if(props.teamToEdit!=null){
            let team = props.teamToEdit[0];
        
            setId(team.id);
            SetTeamName(team.teamName);
            SetTeamCaptain(team.teamCaptain);
            SetTeamHome(team.teamHome);
            SetTeamFoundedIn(team.teamFoundedIn);
            SetTitle("Edit Team");
        }else{
            setId(null);
            SetTeamName('');
            SetTeamCaptain('');
            SetTeamHome('');
            SetTeamFoundedIn(2008);
            SetTitle("Add Team");
        }
    }, [props.teamToEdit]);

    const onTeamNameChange = (event) => {
        SetTeamName(event.target.value);
    };

    const onTeamCaptainChange = (event) => {
        SetTeamCaptain(event.target.value);
    };

    const onTeamHomeChange = (event) => {
        SetTeamHome(event.target.value);
    };

    const onTeamFoundedInChange = (event) => {
        SetTeamFoundedIn(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        SetFormSubmitted(true);

        if(teamName.length === 0 || teamCaptain.length === 0 || teamHome.length === 0 || teamFoundedIn == null)
            return;

        let obj = {
            id: id,
            teamName:teamName,
            teamCaptain:teamCaptain,
            teamFoundedIn:teamFoundedIn,
            teamHome:teamHome,
        };

        SetTeamName('');
        SetTeamCaptain('');
        SetTeamHome('');
        SetFormSubmitted(false);
        props.onSubmit(obj);
    };

    return (
        <Modal
        open={props.isAddEditModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1} mb={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           {title}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={props.handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                
                <form onSubmit={handleSubmit}>
                    <TextField 
                    id="teamName" 
                    error = {formSubmitted && teamName.length === 0 ? true : false}
                    className={Classes.textField}
                    label="Team Name" 
                    variant="outlined" 
                    onChange={onTeamNameChange} 
                    value={teamName}
                    helperText = {formSubmitted && teamName.length === 0 ? "Team Name is required" : ""}
                    />
                    <TextField 
                    id="teamCaptain" 
                    error = {formSubmitted && teamCaptain.length === 0 ? true : false}
                    className={Classes.textField}
                    label="Team Captain" 
                    variant="outlined" 
                    onChange={onTeamCaptainChange}
                    value={teamCaptain}
                    helperText = {formSubmitted && teamCaptain.length === 0 ? "Team Captain is required" : ""}
                    />
                    <TextField 
                    id="teamHome"
                    error = {formSubmitted && teamHome.length === 0 ? true : false} 
                    className={Classes.textField} 
                    label="Team Home" 
                    variant="outlined" 
                    onChange={onTeamHomeChange}
                    value={teamHome}
                    helperText = {formSubmitted && teamHome.length === 0 ? "Team Home is required" : ""}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Team Founded In</InputLabel>
                        <Select
                            error = {formSubmitted && teamFoundedIn == null ? true : false}
                            labelId="demo-simple-select-label"
                            id="teamFoundedIn"
                            label="Team Founded In"
                            value={teamFoundedIn}
                            onChange={onTeamFoundedInChange}
                            helperText = {formSubmitted && teamFoundedIn == null ? "Year is required" : ""}
                        >
                            {props.years.map(year => (
                                <MenuItem value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        justifyContent: 'flex-start'
                        }}
                    >
                        <Box mr={2}><Button variant="outlined" type="submit">Save</Button></Box>
                        <Box mr={2}><Button variant="outlined" onClick={props.handleCloseModal}>Cancel</Button></Box>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default React.memo(AddEditTeam);