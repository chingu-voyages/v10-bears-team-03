import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssetList() {
    const [data, setData] = useState({ assets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(
                '/api/trackers',
            );

            setData(response.data);
        }

        fetchData();
        
    }, []);

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