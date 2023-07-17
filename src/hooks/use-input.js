import { useReducer } from "react";


const initialState = {
    val:'', isValid: null
}

const reducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return {val: action.val, isValid: action.checkIsValid(action.val)};
    }

    if(action.type === 'INVALID_FORM_SUBMIT'){
        return {val:state.val, isValid:false};
    }

    return initialState;
};

const useInput = (checkIsValid) => {
    const[state, dispatch] = useReducer(reducer, initialState);

    const onFieldChange = (event) => {
        dispatch({type:'USER_INPUT', val:event.target.value , checkIsValid: checkIsValid});
    };

    const onInvalidSubmit = () => {
        dispatch({type:'INVALID_FORM_SUBMIT'});
    };

    return {
        value : state.val,
        isValid: state.isValid,
        onFieldChange: onFieldChange,
        onInvalidSubmit: onInvalidSubmit
    }
}

export default useInput;