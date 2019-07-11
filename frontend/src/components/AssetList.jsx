import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssetList() {
    const [data, setData] = useState({ assets: [] });

    useEffect(() => {
        axios.get('/api/tracker')
            .then((response) => response.json())
            .then((responseObj) => setData(responseObj))
    })

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
                {data.assets.map(asset => (
                    <tr>
                        <td>{asset.type}</td>
                        <td>{asset.date_purchased}</td>
                        <td>{asset.expire}</td>
                        <td>{asset.price}</td>
                        <td>{asset.where_purchased}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AssetList;