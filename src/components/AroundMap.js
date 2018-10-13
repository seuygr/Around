import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import {POS_KEY} from "../constants"
import { AroundMarker } from "./AroundMarker"

class AroundMap extends React.Component {

    reloadMarkers = () => {
        const center = this.map.getCenter();
        const range = this.getRange();
        const location = {
          latitude: center.lat(),
          longitude: center.lng()
        };
        // call loadNearbyPost from Home.js (location, range)
        this.props.loadNearbyPosts(location, range);
    }

    getMapRef = (map) => {
        this.map = map;
        window.map = map;
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    render() {
        console.log(this.props.posts);
        const { latitude, longitude } = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
                defaultZoom={11}
                defaultCenter = {{ lat: latitude, lng: longitude }}>
            {
                this.props.posts.map(
                    (post) => (<AroundMarker
                        key ={post.url}
                        post={post}
                    />)
                )
            }
            </GoogleMap>
        );
    }
}
export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));