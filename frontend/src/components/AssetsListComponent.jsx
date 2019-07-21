import React from 'react';
import PropTypes from 'prop-types';

const AssetsListComponent = ({ assets, onDelete, onUpdate, isUpdating }) => {
  return (
    <table className='asset_table'>
      <caption>Your Eqipment</caption>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Type</th>
          <th scope='col'>Date Purchased</th>
          <th scope='col'>Expire</th>
          <th scope='col'>Price</th>
          <th scope='col'>Where Purchased</th>
          <th scope='col'>Update</th>
          <th scope='col'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {assets.map(asset => (
          <tr key={asset._id}>
            <td className='name'>{asset.name}</td>
            <td className='type'>{asset.type}</td>
            <td className='date_purchased'>{asset.date_purchased}</td>
            <td className='expire'>{asset.expire}</td>
            <td className='price'>{asset.price}</td>
            <td className='where_purchased'>{asset.where_purchased}</td>
            <td className='asset-update'>
              <button onClick={() => onUpdate(asset._id)}>Update</button>
            </td>
            <td className='asset-delete'>
              <button onClick={() => onDelete(asset._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

AssetsListComponent.propTypes = {
  assets: PropTypes.array
};

export default AssetsListComponent;
