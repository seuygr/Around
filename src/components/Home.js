import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS, POS_KEY} from '../constants';
import {Gallery} from "./Gallery"

const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {

    state = {
        error: '',
        loadingGeoLocation: false,
    }

    componentDidMount() {
        this.setState({loadingGeoLocation: true, error: ''});
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
            this.setState({error: 'Your browser does not support geolocation'});
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({latitude, longitude}));
        this.setState({loadingGeoLocation: false, error: ''});
    }

    onFailedLoadGeoLocation = (error) => {
        console.log(error);
        this.setState({loadingGeoLocation: false, error: 'Failed to load geo location'});
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div> {this.state.error}</div>
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip='Loading geolocation ...' />
        } else {
            return <Gallery images={imageList}/>;
        }
    }

    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">{this.getGalleryPanelContent()}</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>

            </Tabs>
        );
    }
}

const imageList = [
    {
        user:'gary',
        src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
        thumbnailWidth: 271,
        thumbnailHeight: 320,
        caption: "Orange Macro (Tom Eversley - isorepublic.com)"
    },
    {
        user: 'gary',
        src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 190,
        caption: "286H (gratisography.com)"
    },
    {
        user: 'gary',
        src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 148,
        caption: "315H (gratisography.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "201H (gratisography.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
        thumbnailWidth: 248,
        thumbnailHeight: 320,
        caption: "Big Ben (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 113,
        caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
        thumbnailWidth: 313,
        thumbnailHeight: 320,
        caption: "Wood Glass (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
        thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
    }
];