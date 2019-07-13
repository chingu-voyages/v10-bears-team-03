import React from 'react';
import PropTypes from 'prop-types';

const AssetsListComponent = ({assets, isLoading}) => {
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
            {assets.map(asset => (
                    <tr key={asset._id}>
                        <td>{asset.type}</td>
                        <td>{asset.date_purchased}</td>
                        <td>{asset.expire}</td>
                        <td>{asset.price}</td>
                        <td>{asset.where_purchased}</td>
                    </tr>))
                }
            </tbody>
        </table>
    )
}

AssetsListComponent.propTypes = {
    assets: PropTypes.array
}

export default AssetsListComponent;