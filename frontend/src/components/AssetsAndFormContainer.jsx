import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-dates/initialize';

import Navbar from '../components/Navbar';
import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';
import { withFirebase } from '../firebase/context';

function AssetsAndFormContainerBase(props) {
  const [inventory, setInventory] = useState([]);
  // const [userEmail, setUserEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const userFirebaseId = props.firebase.currentUserId();
  const userEmail = props.firebase.currentUserEmail();

  const emptyAsset = {
    name: '',
    type: '',
    expire: '',
    price: '',
    where_purchased: '',
    date_purchased: null,
    owner: userFirebaseId
  };

  const [asset, setAsset] = useState(emptyAsset);

  // const currentUser = {
  //   userFirebaseId: props.firebase.currentUserId(),
  //   userEmail
  // };

  const fetchAssets = () => {
    axios
      .get(`/users/${userFirebaseId}`)
      .then(userTrackers => {
        // console.log(user);
        userTrackers.data ? setInventory(userTrackers.data) : setInventory([]);
      })
      // .then(response => {
      //   const responseAssets = response.data;
      //   setInventory(responseAssets);
      // })
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
      .then(() => {
        fetchAssets();
      })
      .catch(error => console.log(error));
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
    //REMOVE NEXT 4 LINES BEFORE PRODUCTION!!!  Just showing how to access userId and userEmail

    // console.log('userFirebaseId: ', userFirebaseId);
    // console.log('serEmail: ', userEmail);

    //REMOVE ABOVE BEFORE PRODUCTION
    // setUserFirebaseId(userFirebaseId);
    // setUserEmail(userEmail);

    axios.get(`/users/${userFirebaseId}`).then(user => {
      if (!user.data) {
        console.log('adding user');
        axios.post('/users/add', { userFirebaseId, userEmail });
      } else {
        fetchAssets();
      }
    });

    // axios.get(`/trackers/${userFirebaseId}`).then(response => {
    //   const responseAssets = response.data;
    //   setInventory(responseAssets);
    // });
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
