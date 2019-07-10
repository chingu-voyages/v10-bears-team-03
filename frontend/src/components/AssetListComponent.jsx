import React from 'react';
import PropTypes from 'prop-types';

const AssetListComponent = ({assets}) => {
    const { type, date_purchased, expire, price, where_purchased } = assets;

    return (
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Date Purchased</th>
                    <th>Expire</th>
                    <th>Price</th>
                    <th>Where Purchased</th>
                </tr>
            </thead>
            <tbody>
            {assets.forEach((asset) => (
                <tr>
                    <td>{type}</td>
                    <td>{date_purchased}</td>
                    <td>{expire}</td>
                    <td>{price}</td>
                    <td>{where_purchased}</td>
                </tr>))}
            </tbody>
        </table>
    )
}

AssetListComponent.propTypes = {
    assets: PropTypes.object
}

export default AssetListComponent;