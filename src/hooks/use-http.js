import { useCallback, useState } from "react";

const useHttp = () => {

    const[isLoading, SetIsLoading] = useState(false);
    const[error, SetError] = useState(null);

    const sendRequest = useCallback(async(requestConfig, handleResponse) => {
        try
        {   SetIsLoading(true);
            
            const url = requestConfig.url;
            const response  = await fetch(url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                headers: {'Content-type': 'application/json'}
            });
    
            if(!response.ok)
                throw new Error("Something went wrong");
    
            const data = await response.json();
            handleResponse(data);
            SetIsLoading(false); 
    
        }
        catch(error)
        {
            SetError(error.message);
            SetIsLoading(false);
        }
    });

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    };
};

export default useHttp;