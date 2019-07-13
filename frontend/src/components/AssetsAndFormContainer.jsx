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
        e.persist()
        setAsset(asset => ({...asset, [e.target.name]: e.target.value}));
    }

    const onDelete = (_id) => {
        axios.get(`/trackers/delete/${_id}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        setIsLoading(true);

        axios.get('/trackers')
            .then((response) => setInventory(response.data))
            .catch((error) => console.log(error));
            
        setIsLoading(false);
    }

  

    useEffect(() => {
        setIsLoading(true);
        axios.get('/trackers')
            .then((response) => {
                setInventory(response.data)
            })
        setIsLoading(false);
    }, [inventory]);

    return (
        <React.Fragment>
            <FormComponent asset={asset} onChange={onChange} onSubmit={onSubmit} />
            {!isLoading && <AssetsListComponent assets={inventory} onDelete={onDelete} />}
        </React.Fragment>
    )
}

export default AssetsAndFormContainer;