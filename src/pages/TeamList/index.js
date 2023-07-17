import TeamDetail from '../TeamDetail';
import { Button } from '@mui/material';
import AddEditTeam from './AddEditTeam';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import {Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';
import React from 'react';
import useHttp from '../../hooks/use-http';

const TeamList = () => {

    const{ isLoading, error, sendRequest } = useHttp();
    const[teams, setTeams] = useState([]);
    const[isAddEditModalOpen, SetIsAddEditModalOpen] = useState(false);
    const[filterYear, setFilterYear] = useState(null);
    const[teamToEdit, SetTeamToEdit] = useState(null);

    const getYears = useCallback(()=>{
        let yearsList = [];

        for (let i = 2008; i <= new Date().getFullYear(); i++) {
            yearsList.push(i);
        }

        return yearsList;
    }, []);

    const years = useMemo(() => getYears(), [getYears]);

    const createTeamsList = useCallback((data) => {
        setTeams(data);
    }, [] );

    const fetchTeams = useCallback(async () => {
           
        let requestConfig = {
            url: `http://localhost:4000/Teams${filterYear ? '?teamFoundedIn=' + filterYear : ''}`
        }

        sendRequest(requestConfig, createTeamsList);
    }, [filterYear]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const onAddButtonClick = () => {
        SetIsAddEditModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        SetIsAddEditModalOpen(false);
        SetTeamToEdit(null);
    }, []);

    const onSubmit = useCallback((data) => {
        SetTeamToEdit(null);
        SetIsAddEditModalOpen(false);
        addEditTeam(data);
    }, []);

    const onFilterSelect = (event) => {
        setFilterYear(event.target.value);
    };

    const clearFilter = () => {
        setFilterYear(null);
    };

    const teamEditHandler = (id) => {
        SetTeamToEdit(teams.filter(team => team.id == id));
        SetIsAddEditModalOpen(true);
    };

    const teamDeleteHandler = (id) => {
        deleteTeam(id);
    };

    const addEditTeam = useCallback(async (team)=>{
        
        let requestConfig = {
            url: `http://localhost:4000/Teams${team.id!=null ? '/'+team.id : ''}`,
            method: team.id!=null ? 'PUT' : 'POST',
            body: team
        }
            
        sendRequest(requestConfig, handleAddEditTeamResponse);
        
    }, []);

    const handleAddEditTeamResponse = useCallback((data) => {
        fetchTeams();
    });

     const deleteTeam = useCallback(async (id) => {
          
        let requestConfig = {
            url: `http://localhost:4000/Teams/${id}`,
            method: 'DELETE',
        }; 
        
       sendRequest(requestConfig, handleDeleteResponse);
       
    }, []);

    const handleDeleteResponse = useCallback((data) => {
        fetchTeams();
    });

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
                {!isLoading && teams.length == 0 && !error && <p>No teams found!!</p>} 
                {isLoading && <p>Loading!!</p>}
                {!isLoading && error && <p>Something went wrong!! Try again.</p>}
                {!isLoading && teams.length > 0 && teams.map((team,index) => (
                    <TeamDetail
                        key = {team.id}
                        teamID = {team.id}
                        teamName = {team.teamName}
                        teamCaptain = {team.teamCaptain}
                        teamHome = {team.teamHome}
                        teamFoundedIn = {team.teamFoundedIn}
                        onTeamEdit = {teamEditHandler}
                        onTeamDelete = {teamDeleteHandler}
                        className="team-detail"
                    />
                ))}
            </div>
            <AddEditTeam
            isAddEditModalOpen = {isAddEditModalOpen}
            years = {useMemo(() => years, [])}
            teamToEdit = {teamToEdit}
            handleCloseModal = {handleCloseModal}
            onSubmit = {onSubmit}
            />
        </div> 
    );
}

export default TeamList;