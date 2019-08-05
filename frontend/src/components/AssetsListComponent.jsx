import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const AssetsListComponent = ({ assets, onDelete, onUpdate, isUpdating }) => {
  console.log(assets)
  return (
    <table className='asset_table'>
      <caption>Your Equipment</caption>
      <thead>
        <tr>
          <th scope='col'>Brand name</th>
          <th scope='col'>Type of item</th>
          <th scope='col'>Date Purchased</th>
          <th scope='col'>Expiration</th>
          <th scope='col'>Price</th>
          <th scope='col'>Distance Used(mile)</th>
          <th scope='col'>Where Purchased</th>
          <th scope='col'>Update</th>
          <th scope='col'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {assets.map(asset => (
          <tr key={asset._id}>
            <td data-label='Name' className='name'>
              {asset.name}
            </td>
            <td data-label='Type of item' className='type'>
              {asset.type}
            </td>
            <td data-label='Date Purchased' className='date_purchased'>
              {moment(asset.date_purchased).format('MM/DD/YYYY')}
            </td>

            <td data-label='Expiration' className='expire'>
              {asset.expire}
            </td>
            <td data-label='Price' className='price'>
              ${asset.price}.00
            </td>
            <td data-label='Distance' className='distance'>
              {asset.distance}
            </td>
            <td data-label='Where Purchased' className='where_purchased'>
              {asset.where_purchased}
            </td>
            <td className='asset-update'>
              <button onClick={() => onUpdate(asset._id)}>Update</button>
            </td>
            <td className='asset-delete'>
              <button onClick={() => onDelete(asset._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tbody />
    </table>
  );
};

AssetsListComponent.propTypes = {
  assets: PropTypes.array
};

export default AssetsListComponent;
