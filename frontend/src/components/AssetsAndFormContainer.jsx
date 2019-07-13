import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';

function AssetsAndFormContainer() {

    const [inventory, setInventory] = useState([]);
    const [asset, setAsset] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const onSubmit = (e) => {
        axios.post('/trackers/add', asset)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))

        e.preventDefault();
    }

    const onChange = (e) => {
        setAsset({[e.target.name]: e.target.value})
    }

    useEffect(() => {

        axios('/trackers', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response.data);
                setInventory(response.data)
            });
        setIsLoading(false);    
    }, []);

    return (
        <React.Fragment>
            <FormComponent asset={asset} onChange={onChange} onSubmit={onSubmit} />
            <AssetsListComponent assets={inventory} isLoading={isLoading}/>
        </React.Fragment>
    )
}

export default AssetsAndFormContainer;