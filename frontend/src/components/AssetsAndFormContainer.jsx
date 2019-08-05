import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-dates/initialize';

import Navbar from '../components/Navbar';
import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';
import { withFirebase } from '../firebase/context';

const emptyAsset = {
  name: '',
  type: '',
  expire: '',
  price: '',
  distance: '',
  where_purchased: '',
  date_purchased: null,
  email:'',
  user_id:''
};

function AssetsAndFormContainerBase(props) {
  const [inventory, setInventory] = useState([]);
  const [asset, setAsset] = useState(emptyAsset);

  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAssets = () => {
    // axios
    //   .get('/userTrackers')
    //   .then(response => {
    //     const responseAssets = response.data;
    //     setInventory(responseAssets);
    //   })
    //   .catch(error => console.log(error));
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
      //updating the UserTracker too
      axios
        .post(`/userTrackers/update/${asset._id}`, asset)
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
    console.log(process.env)
    //REMOVE NEXT 4 LINES BEFORE PRODUCTION!!!  Just showing how to access userId and userEmail

    const userId = props.firebase.currentUserId();
    const userEmail = props.firebase.currentUserEmail();
    console.log('userId: ', userId);
    console.log('serEmail: ', userEmail);

    //REMOVE ABOVE BEFORE PRODUCTION
    
    axios.post('/users/email', {
      email: userEmail
      })
      .then(response => {
        console.log(response);
        let user_id = response.data._id;
        setAsset(asset => ({ ...asset, user_id }));
      })
      .catch(error => {
        let today = new Date();
        axios
        .post(`/users/add`, {
          email: userEmail,
          dateCreated: today,
        })
        .then(response => {
          console.log(response)
          //make the user to be the current user
          let user_id = response.data._id;
          setAsset(asset => ({ ...asset, user_id }));
        })
        .catch(error => console.log(error));
      });

    axios.get('/userTrackers').then(response => {
      const responseAssets = response.data;
      setInventory(responseAssets);
    });

  }, [props.firebase]);

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
