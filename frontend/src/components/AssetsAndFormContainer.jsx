import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-dates/initialize';

import Navbar from '../components/Navbar';
import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';

const emptyAsset = {
  name: '',
  type: '',
  expire: '',
  price: '',
  where_purchased: '',
  date_purchased: null
};

function AssetsAndFormContainer() {
  const [inventory, setInventory] = useState([]);
  const [asset, setAsset] = useState(emptyAsset);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit = e => {
    if (isUpdating) {
      axios
        .post(`/trackers/update/${asset._id}`, asset)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));

      setIsUpdating(false);
    } else {
      axios
        .post('/trackers/add', asset)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    setAsset(emptyAsset);
    axios
      .get('/trackers')
      .then(response => {
        const formattedAsset = reformatAsset(response.data);
        setInventory(formattedAsset);
      })
      .catch(error => console.log(error));
    e.preventDefault();
  };

  const onDelete = _id => {
    setIsLoading(true);

    axios
      .get(`/trackers/delete/${_id}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    axios
      .get('/trackers')
      .then(response => {
        const reformattedAsset = reformatAsset(response.data);
        setInventory(reformattedAsset);
      })
      .catch(error => console.log(error));

    setIsLoading(false);
  };

  const onChange = e => {
    e.persist();
    setAsset(asset => ({ ...asset, [e.target.name]: e.target.value }));
  };

  const onDateChange = date_purchased => {
    setAsset(asset => ({ ...asset, date_purchased }));
    const unix = date_purchased.valueOf();
    const formatted = moment(unix).format();
    console.log(unix, formatted); //will send ;
  };

  const onUpdate = _id => {
    setIsLoading(true);
    setIsUpdating(true);

    axios
      .get(`/trackers/${_id}`)
      .then(response => {
        const formattedAsset = reformatAsset(response.data);
        setAsset(formattedAsset);
      })
      .catch(error => console.log(error));
  };

  const reformatAsset = obj => {
    obj.date_purchased = obj.date_purchased.slice(0, 10);
    console.log(obj);
    return obj;
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get('/trackers').then(response => {
      const responseAssets = response.data;
      responseAssets.map(asset => reformatAsset(asset));
      setInventory(responseAssets);
    });
    setIsLoading(false);
  }, [inventory]);

  return (
    <React.Fragment>
      <Navbar />
      {!isLoading && (
        <AssetsListComponent assets={inventory} onDelete={onDelete} onUpdate={onUpdate} />
      )}
      <FormComponent
        asset={asset}
        onChange={onChange}
        onDateChange={onDateChange}
        onSubmit={onSubmit}
      />
    </React.Fragment>
  );
}

export default AssetsAndFormContainer;
