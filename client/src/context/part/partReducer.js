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

export default (state, action) => {
    switch(action.type) {
        case GET_PARTS:
            return {
                ...state,
                parts: action.payload,
                loading: false
            };
        case ADD_PART:
            return {
                ...state,
                parts: [action.payload, ...state.parts],  // add new part to existing list
                loading: false
            };
        case DELETE_PART:
            return {
                ...state,
                parts: state.parts.filter(part => part._id !== action.payload),   // return all parts that don't need deleting
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload  
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case UPDATE_PART:
            return {
                ...state,
                parts: state.parts.map(part => part._id === action.payload._id ? action.payload : part)    // if id = payload, update this part, else return the existing part
            };
        case FILTER_PARTS:
            return {
                ...state,
                filtered: state.parts.filter(part => {
                    const regex = new RegExp(`${action.payload}`, 'gi');   // text - global and case insensitive
                    return part.name.match(regex) || part.url.match(regex) || part.type.match(regex) || part.imgUrl.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case PART_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_PARTS: {
            return {
                ...state,
                parts: null,
                filtered: null,
                error: null,
                current: null
            };
        }
        default:
            return state;
    }
}