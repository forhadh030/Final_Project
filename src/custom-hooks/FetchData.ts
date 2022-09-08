import React, { useState, useEffect } from 'react'
import { server_calls } from '../api';

// Building your own Hooks lets you extract component logic into reusable functions.
// In this case, we reuse carData and getData in CarForm and DataTable
export const useGetData = () => {
    const [carData, setData] = useState<[]>([]);

    async function handleDataFetch(){
        const result = await server_calls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch();
    }, [])

    return {carData, getData:handleDataFetch}
}