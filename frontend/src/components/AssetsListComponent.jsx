import React from 'react';
import PropTypes from 'prop-types';

const AssetsListComponent = ({assets, onDelete, onUpdate, isUpdating}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date Purchased</th>
                    <th>Expire</th>
                    <th>Price</th>
                    <th>Where Purchased</th>
                </tr>
            </thead>
            <tbody>
            {assets.map(asset => (
                    <tr key={asset._id}>
                        <td>{asset.name}</td>
                        <td>{asset.type}</td>
                        <td>{asset.date_purchased}</td>
                        <td>{asset.expire}</td>
                        <td>{asset.price}</td>
                        <td>{asset.where_purchased}</td>
                        <td><button onClick={() => onUpdate(asset._id)}>Update</button></td>
                        <td><button onClick={() => onDelete(asset._id)}>Delete</button></td>
                    </tr>))}            
            </tbody>
        </table>
    )
}

AssetsListComponent.propTypes = {
    assets: PropTypes.array
}

export default AssetsListComponent;