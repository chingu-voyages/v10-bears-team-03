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
  distance_used: 0,
  where_purchased: '',
  date_purchased: null,
  email:''
};

function AssetsAndFormContainerBase(props) {
  const [inventory, setInventory] = useState([]);
  const [asset, setAsset] = useState(emptyAsset);
  const [user_id, setUser_id] = useState("")

  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAssets = () => {
    // axios
    //   .get('/trackers')
    //   .then(response => {
    //     const responseAssets = response.data;
    //     setInventory(responseAssets);
    //   })
    //   .catch(error => console.log(error));
    
    axios.get(`/users/${user_id.user_id}`)
      .then(response => {
      const responseAssets = response.data;

      let resp_data = responseAssets.UserTrackerGroup.map( async e => {
        return axios.get(`/userTrackers/more/${e}`)
      })
      
      Promise.all(resp_data).then(res =>{
        let combined = res.map(res => {
          return res.data
        })
        setInventory(combined)
      })            
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isUpdating) {
      console.log("update post", {...asset, ...user_id})
      console.log(asset)
      axios
        .post(`/userTrackers/update/${asset._id}`, {...asset, ...user_id})
        .then(response => {
          //updating the UserTracker too
          axios
          .post(`/trackers/update/${response.data.tracker_id}`, {...asset, ...user_id})
          .then(response => {
            fetchAssets();
            setIsUpdating(false);
          })
          .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
      
    } else {
      console.log("add post", {...asset, ...user_id})
      axios.post('/trackers/add', {...asset, ...user_id})
        .then((res) => {
          axios
            .post('/userTrackers/add', {...asset, ...user_id, tracker_id:res.data._id, distance_used:0})
            .then(() => {
              fetchAssets();
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

      
    }
    setAsset(emptyAsset);
  };

  const onDelete = _id => {
    axios
      .delete(`/userTrackers/delete/${_id}`)
      .then(() => fetchAssets())
      .catch(error => console.log(error));
  };

  const onChange = e => {
    e.persist();
    setAsset(asset => ({ ...asset, [e.target.name]: e.target.value }));
    console.log(asset)
  };

  const onDateChange = date_purchased => {
    setAsset(asset => ({ ...asset, date_purchased }));
  };

  const onUpdate = _id => {
    setIsUpdating(true);

    axios
      .get(`/userTrackers/${_id}`)
      .then(response => {        

        axios.get(`/trackers/${response.data.tracker_id}`)
          .then(res => {
            response.data.date_purchased = moment(response.data.date_purchased);
            setAsset({...res.data, ...response.data});
            
            
          })
          console.log("check asset onUpdate", asset)
      })
      .catch(error => console.log(error));
    
  };

  useEffect(() => {
    const userEmail = props.firebase.currentUserEmail();
    
    axios.post('/users/email', {
      email: userEmail
      })
      .then(response => {
        let userId = response.data._id;
        
        setUser_id(user_id => ({ ...user_id, user_id:userId }));
        console.log("check userid", userId, user_id)
        axios.get(`/users/${userId}`)
          .then(response => {
          const responseAssets = response.data;

          let resp_data = responseAssets.UserTrackerGroup.map( e => {
            return axios.get(`/userTrackers/more/${e}`)
          })
          
          Promise.all(resp_data).then(res =>{
            let combined = res.map(res => {
              return res.data
            })
            setInventory(combined)
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
          axios.post('/users/email', {
            email: userEmail
            })
            .then(resp => {
              let userId = resp.data._id;
              setUser_id(user_id => ({ ...user_id, user_id:userId }));
              console.log("check userid", userId, user_id)

            })
          
          // axios.get(`/users/${userId}`)
          // .then(response => {
          //   const responseAssets = response.data;

          //   let resp_data = responseAssets.UserTrackerGroup.map( e => {
          //     return axios.get(`/userTrackers/more/${e}`)
          //   })
            
          //   Promise.all(resp_data).then(res =>{
          //     let combined = res.map(res => {
          //       return res.data
          //     })
          //     setInventory(combined)
          //   });            
          // });
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
