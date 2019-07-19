import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';


function AssetsAndFormContainer() {
  const [inventory, setInventory] = useState([]);
  const [asset, setAsset] = useState({});
  const [isLoading, setIsLoading] = useState(true);

    const [inventory, setInventory] = useState([]);
    const [asset, setAsset] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = (e) => {

        if (isUpdating) {
            axios.post(`/trackers/update/${asset._id}`, asset)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error))

            setIsUpdating(false);
        } else {
            axios.post('/trackers/add', asset)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        }

        setAsset({});
        axios.get('/trackers')
            .then((response) => {
                const formattedAsset = reformatAsset(response.data)
                setInventory(formattedAsset)
            })
            .catch((error) => console.log(error))
        e.preventDefault();
    }

  const onDelete = _id => {
    axios
      .get(`/trackers/delete/${_id}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    const onDelete = (_id) => {
        setIsLoading(true);

        axios.get(`/trackers/delete/${_id}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));


        axios.get('/trackers')
            .then((response) => {
                const reformattedAsset = reformatAsset(response.data);
                setInventory(reformattedAsset);
            })
            .catch((error) => console.log(error));
            
        setIsLoading(false);
    }

    const onUpdate = (_id) => {
        setIsLoading(true);
        setIsUpdating(true);

        axios.get(`/trackers/${_id}`)
             .then((response) => {
                 const formattedAsset = reformatAsset(response.data);
                 setAsset(formattedAsset);
             })
             .catch((error) => console.log(error))
    }

    const reformatAsset = (obj) => {
        obj.date_purchased = obj.date_purchased.slice(0, 10)
        console.log(obj);
        return obj;
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get('/trackers')
            .then((response) => {
                const responseAssets = response.data;
                responseAssets.map((asset) => reformatAsset(asset));
                setInventory(responseAssets);
            })
        setIsLoading(false);
    }, [inventory]);

  return (
    <React.Fragment>
      <Navbar />
      <FormComponent asset={asset} onChange={onChange} onSubmit={onSubmit} />
      {!isLoading && (
        <AssetsListComponent assets={inventory} onDelete={onDelete} />
      )}
    </React.Fragment>
  );
}

export default AssetsAndFormContainer;
