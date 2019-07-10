import React, { Component } from 'rearct';
import AssetListComponent from './AssetListComponent';

class AssetListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('api/trackers')
            .then((response) => response.json())
            .then((data) => this.setState({
                assets: data,
                isLoading: false
            }))
    }

    render() {
        const { isLoading, assets } = this.state;

        return (
            <React.Fragment>
                {isLoading && <AssetListComponent data={assets} />}
            </React.Fragment>
        )
    }

}