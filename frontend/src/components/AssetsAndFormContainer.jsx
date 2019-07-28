import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-dates/initialize';

import Navbar from '../components/Navbar';
import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';
import { firebase } from '../firebase/firebase';

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

  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAssets = () => {
    axios
      .get('/trackers')
      .then(response => {
        const responseAssets = response.data;
        setInventory(responseAssets);
        console.log('fetched assets');
      })
      .catch(error => console.log(error));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isUpdating) {
      axios
        .get(`/trackers/get/${asset._id}`)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
      // axios
      //   .post(`/trackers/update/${asset._id}`, asset)
      //   .then(response => console.log(response.data))
      //   .catch(error => console.log(error));

      setIsUpdating(false);
    } else {
      axios
        .post('/trackers/add', asset)
        .then(() => {
          fetchAssets();
        })
        .catch(error => console.log(error));
    }
    setAsset(emptyAsset);
  };

  const onDelete = _id => {
    axios
      .delete(`/trackers/delete/${_id}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    fetchAssets();
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
    setIsUpdating(true);

    axios
      .get(`/trackers/${_id}`)
      .then(response => {
        setAsset(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const userEmail = firebase.auth().currentUser.email;
    console.log(userId, userEmail);
    axios.get('/trackers').then(response => {
      const responseAssets = response.data;
      setInventory(responseAssets);
      console.log('fetched assets');
    });
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <AssetsListComponent
        assets={inventory}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
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
