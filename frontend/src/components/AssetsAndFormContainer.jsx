import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-dates/initialize';

import Navbar from '../components/Navbar';
import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';
// import { firebase } from '../firebase/firebase';
import { withFirebase } from '../firebase/context';

const emptyAsset = {
  name: '',
  type: '',
  expire: '',
  price: '',
  where_purchased: '',
  date_purchased: null
};

function AssetsAndFormContainerBase(props) {
  const [inventory, setInventory] = useState([]);
  const [asset, setAsset] = useState(emptyAsset);

  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAssets = () => {
    axios
      .get('/trackers')
      .then(response => {
        const responseAssets = response.data;
        setInventory(responseAssets);
      })
      .catch(error => console.log(error));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isUpdating) {
      axios
        .post(`/trackers/update/${asset._id}`, asset)
        .then(response => {
          fetchAssets();
          setIsUpdating(false);
        })
        .catch(error => console.log(error));
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
      .then(() => fetchAssets())
      .catch(error => console.log(error));

    // fetchAssets();
  };

  const onChange = e => {
    e.persist();
    setAsset(asset => ({ ...asset, [e.target.name]: e.target.value }));
  };

  const onDateChange = date_purchased => {
    setAsset(asset => ({ ...asset, date_purchased }));
  };

  const onUpdate = _id => {
    setIsUpdating(true);

    axios
      .get(`/trackers/${_id}`)
      .then(response => {
        response.data.date_purchased = moment(response.data.date_purchased);
        setAsset(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const user = props.firebase.user;
    // const userEmail = props.firebase.auth.uid;
    console.log(user);
    axios.get('/trackers').then(response => {
      const responseAssets = response.data;
      setInventory(responseAssets);
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

const AssetsAndFormContainer = withFirebase(AssetsAndFormContainerBase);
export default AssetsAndFormContainer;
