import TeamDetail from '../TeamDetail';
import { Button } from '@mui/material';
import AddEditTeam from './AddEditTeam';
import { useCallback, useMemo, useReducer, useState } from 'react';
import {Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';
import React from 'react';

const teamsReducer = (state, action) => {
    if(action.type==='FILTER_APPLIED'){
        return {originalTeams:state.originalTeams, filteredTeams:state.originalTeams.filter(team=>team.teamFoundedIn == action.val)};
    }
    if(action.type==='FILTER_CLEARED'){
        return {originalTeams:state.originalTeams, filteredTeams:state.originalTeams};
    }
    if(action.type==='NEW_TEAM_ADDED'){
        return {originalTeams:[...state.originalTeams, action.val], filteredTeams:[...state.originalTeams, action.val]};
    }

    return {originalTeams:[], filteredTeams:[]};
};

const Teams = (props) => {
    
    const getYears = useCallback(()=>{
        let yearsList = [];

        for (let i = 2008; i <= new Date().getFullYear(); i++) {
            yearsList.push(i);
        }

        return yearsList;
    }, []);

    const years = useMemo(() => getYears(), [getYears]);
    
    let initialteams = [
        {
            teamName: 'CSK',
            teamCaptain: 'MS Dhoni',
            teamHome: 'Chennai',
            teamFoundedIn: 2008
        },
        {
            teamName: 'GT',
            teamCaptain: 'Hardik Pandya',
            teamHome: 'Ahmedabad',
            teamFoundedIn: 2022
        },
        {
            teamName: 'SRH',
            teamCaptain: 'Aiden Markram',
            teamHome: 'Hyderabad',
            teamFoundedIn: 2013
        },
        {
            teamName: 'RCB',
            teamCaptain: 'Faf Du Plesis',
            teamHome: 'Bangluru',
            teamFoundedIn: 2008
        },
        {
            teamName: 'KKR',
            teamCaptain: 'Nitish Rana',
            teamHome: 'Kolkata',
            teamFoundedIn: 2008
        },
    ]

    const[isAddEditModalOpen, SetIsAddEditModalOpen] = useState(false);
    const[filterYear, setFilterYear] = useState(null);

    const[teamListState, dispatchTeams] = useReducer(teamsReducer, {originalTeams : initialteams, filteredTeams : initialteams});

    const onAddButtonClick = () => {
        SetIsAddEditModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        SetIsAddEditModalOpen(false);
    }, []);

    const onSubmit = useCallback((data) => {
        dispatchTeams({type:"NEW_TEAM_ADDED", val: data});
        
        setFilterYear(null);
        SetIsAddEditModalOpen(false);
    }, []);

    const onFilterSelect = (event) => {
        setFilterYear(event.target.value);
        dispatchTeams({type:"FILTER_APPLIED", val: event.target.value});
    };

    const clearFilter = () => {
        setFilterYear(null);
        dispatchTeams({type:"FILTER_CLEARED"});
    };

    return (
        <div className="outer-box">
            <div className='inner-box'>
                <h1 className="team-list-main-heading">Team Detail</h1>
                <Button variant="outlined" className='add-btn' onClick={onAddButtonClick}>Add Team</Button>
            </div>
            <Grid container justifyContent="flex-end">
                <Box display="flex" mt={2} alignItems="center">
                    <Typography variant="h6" mr={2}>
                        Filter By Foundation Year
                    </Typography>
                    <FormControl mr={2} sx={{ minWidth: 150 }}>
                        <InputLabel id="year-label">Year</InputLabel>
                        <Select
                            labelId="year-label"
                            id="teamFoundedIn"
                            label="Year"
                            value={filterYear}
                            onChange={onFilterSelect}
                        >
                            {years.map(year => (
                                <MenuItem value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box ml={2}><Button variant="outlined" onClick={clearFilter}>Clear Filter</Button></Box>
                </Box>
            </Grid>
            <div className="teamList">
                {teamListState.filteredTeams.length === 0 ? <p>No teams found!!</p> : teamListState.filteredTeams.map((team,index) => (
                    <TeamDetail
                        key = {index}
                        teamName = {team.teamName}
                        teamCaptain = {team.teamCaptain}
                        teamHome = {team.teamHome}
                        teamFoundedIn = {team.teamFoundedIn}
                    />
                ))}
            </div>
            <AddEditTeam
            isAddEditModalOpen = {isAddEditModalOpen}
            years = {useMemo(() => years, [])}
            handleCloseModal = {handleCloseModal}
            onSubmit = {onSubmit}
            />
        </div> 
    );
}

export default React.memo(Teams);