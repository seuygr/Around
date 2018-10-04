import React from 'react';
import { Tabs, Button } from 'antd';
import {GEO_OPTIONS} from '../constants';

const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {

    componentDidMount() {
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            )
        } else {
            console.log('NO Geolocation')
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
    }

    onFailedLoadGeoLocation = (error) => {
        console.log(error);
    }


    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">Content of tab 1</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>

            </Tabs>
        );
    }
}