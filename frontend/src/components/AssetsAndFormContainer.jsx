import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-dates/initialize';

import Navbar from '../components/Navbar';
import FormComponent from './FormComponent';
import AssetsListComponent from './AssetsListComponent';
import { withFirebase } from '../firebase/context';
import { fdatasyncSync } from 'fs';

const emptyAsset = {
  name: '',
  type: '',
  expire: '',
  price: '',
  distance_used: '',
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
    const userId = props.firebase.currentUserId();
    const userEmail = props.firebase.currentUserEmail();
    
    axios.post('/users/email', {
      email: userEmail
      })
      .then(response => {
        let user_id = response.data._id;
        setAsset(asset => ({ ...asset, user_id }));

        axios.get(`/users/${user_id}`)
          .then(response => {
          const responseAssets = response.data;

          let resp_data = responseAssets.UserTrackerGroup.map( async e => {
            return axios.get(`/userTrackers/more/${e}`)
          })
          
          Promise.all(resp_data).then(res =>{
            let a = res.map(res => {
              return res.data
            })
            setInventory(a)
          })            
        });
      })
      .catch(error => {
        let today = new Date();
        axios.post(`/users/add`, {
          email: userEmail,
          dateCreated: today,
        })
        .then(response => {
          //make the user to be the current user
          let user_id = response.data._id;
          setAsset(asset => ({ ...asset, user_id }));

          axios.get(`/users/${user_id}`)
          .then(response => {
            const responseAssets = response.data;

            let resp_data = responseAssets.UserTrackerGroup.map( async e => {
              return axios.get(`/userTrackers/more/${e}`)
            })
            
            Promise.all(resp_data).then(res =>{
              let a = res.map(res => {
                return res.data
              })
              setInventory(a)
            });            
          });
        })
        .catch(error => console.log(error));
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
