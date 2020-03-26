import React, {useReducer} from 'react';
import axios from 'axios';
import PartContext from './partContext';
import partReducer from './partReducer';

import {
    ADD_PART,
    DELETE_PART,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PART,
    FILTER_PARTS,
    CLEAR_FILTER,
    PART_ERROR,
    GET_PARTS,
    CLEAR_PARTS
} from '../types';

const PartState = props => {
    const initialState = {
        parts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(partReducer, initialState);

    // GET USER'S PARTS
    const getParts = async () => {

        try {
            const res = await axios.get('/api/parts');
            dispatch({
                type: GET_PARTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PART_ERROR,
                payload: err.response.msg
            });
        };

    };

    
    
    // ADD PART

    const addPart = async part => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/parts', part, config);
            dispatch({
                type: ADD_PART,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PART_ERROR,
                payload: err.response.msg
            });
        };

    };


    // DELETE PART
    const deletePart = async id => {
        try {
            await axios.delete(`/api/parts/${id}`);

            dispatch({
                type: DELETE_PART,
                payload: id               // send id down to payload to delete
            });

        } catch (err) {
            dispatch({
                type: PART_ERROR,
                payload: err.response.msg
            });
        }

    };


    
    // UPDATE PART

    const updatePart = async part => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/parts/${part._id}`, part, config);
            dispatch({
                type: UPDATE_PART,
                payload: res.data         
            });
        } catch (err) {
            dispatch({
                type: PART_ERROR,
                payload: err.response.msg
            });
        };
        
    };




    // SET CURRENT PART

    const setCurrent = part => {
        dispatch({
            type: SET_CURRENT,
            payload: part            
        });
    };

    
    // CLEAR CURRENT PART
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT                  
        });
    };



    // FILTER PARTS

    const filterParts = text => {
        dispatch({
            type: FILTER_PARTS,
            payload: text         
        });
    };

    
    // CLEAR FILTER

    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER                  
        });
    };


    // CLEAR PARTS ON LOGOUT

    const clearParts = () => {
        dispatch({
            type: CLEAR_PARTS                
        });
    };





    return (
        <PartContext.Provider
            value={{
                parts: state.parts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addPart,
                deletePart,
                setCurrent,
                clearCurrent,
                updatePart,
                filterParts,
                clearFilter,
                getParts,
                clearParts
            }}>
        
            {props.children}
        </PartContext.Provider>
    );

};

export default PartState;