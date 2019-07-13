import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';

function AssetsAndFormContainer() {

    const [inventory, setInventory] = useState([]);
    const [asset, setAsset] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const onSubmit = (e) => {
        console.log(asset);
        axios.post('/trackers/add', asset)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))

        e.preventDefault();
    }

    const onChange = (e) => {
        e.persist()
        setAsset(asset => ({...asset, [e.target.name]: e.target.value}));
        console.log(asset);
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
                setInventory(response.data)
            });

        setIsLoading(false);    
    }, [inventory]);

    return (
        <React.Fragment>
            <FormComponent asset={asset} onChange={onChange} onSubmit={onSubmit} />
            {!isLoading && <AssetsListComponent assets={inventory} />}
        </React.Fragment>
    )
}

export default AssetsAndFormContainer;