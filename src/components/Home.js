import React from 'react';
import { Tabs, Spin } from 'antd';
import {GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY, API_ROOT} from '../constants';
import {Gallery} from "./Gallery"
import $ from 'jquery';
import { CreatePostButton } from "./CreatePostButton"
import {WrappedAroundMap} from "./AroundMap"

const TabPane = Tabs.TabPane;

export class Home extends React.Component {

    state = {
        posts: [],
        loadingPosts: false,
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
        this.loadNearbyPosts();
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
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading posts..."/>;
        } else if (this.state.posts != null && this.state.posts.length > 0) {
            return <Gallery images={
                this.state.posts.map(({ user, message, url}) => ({
                    user: user,
                    src: url,
                    thumbnail: url,
                    caption: message,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300
                }))
            } />;
        } else {
            return null;
        }
    }

    loadNearbyPosts = (location, range) => {
        this.setState({ loadingPosts: true});
        const { latitude, longitude } = location || JSON.parse(localStorage.getItem(POS_KEY));
        const radius = range || 20;
        $.ajax({
            url: `${API_ROOT}/search?lat=${latitude}&lon=${longitude}&range=${radius}`,
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then(
            (response) => {
            this.setState({ posts: response || [], loadingPosts: false, error: '' });
            console.log(response);
        },
            (response) => {
                this.setState({error: response.responseText})

            }
            ).catch(
            (error) => console.log(error)
        );
    }
    render() {
        const createPostButton = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts} />;
        return (
            <Tabs tabBarExtraContent={createPostButton} className="main-tabs">
                <TabPane tab="Posts" key="1">{this.getGalleryPanelContent()}</TabPane>
                <TabPane tab="Map" key="2">
                    <WrappedAroundMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    posts={this.state.posts}
                    loadNearbyPosts={this.loadNearbyPosts}
                    />
                </TabPane>

            </Tabs>
        );
    }
}
