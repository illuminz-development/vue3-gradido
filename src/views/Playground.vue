<template>
    <div class="py-4 container-fluid">
        <div class="mt-0 row">
            <div :class="offerNeedDetail === null ? 'col-12' : 'col-8'">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Playground</h6>
                    </div>
                    <filters :callback="fetch" :filters="{ communityId: '', type: '0', radius }" />
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="row">
                            <div class="col-md-12">
                                <div v-if="coords !== null" ref="mapContainer" class="map-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="offerNeedDetail !== null" class="col-4">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Detail</h6>
                    </div>
                    <div class="card-body  max-height-vh-80 mb-4 overflow-auto pb-2">
                        <OfferNeedDetails :data="offerNeedDetail" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Filters from './components/Filters.vue';
import MapboxCircle from 'mapbox-gl-circle';
import CommunityUserService from '../services/communityUser.service';
import OfferNeedDetails from './components/OfferNeedDetails.vue';
import _ from 'lodash';

export default {
    name: 'playground',
    components: { Filters, OfferNeedDetails },
    data() {
        return {
            coords: null,
            radius: 15,
            map: null,
            offerNeedDetail: null,
            nearByUsers: [],
            markerImg: '/person.png',
            markerColor: 'black'
        }
    },
    methods: {
        mbResult(result) {
            console.log(result);
        },
        fetch(filters = {}) {
            const rad = filters?.radius ?? 15;
            this.coords = JSON.parse(this.$route?.query?.coords)?.map(t => parseFloat(t));
            CommunityUserService.fetchNearBy({ type: filters?.type ?? 0, radius: rad, communityId: filters?.communityId, latitude: this.coords[1], longitude: this.coords[0] }).then(response => {
                this.radius = rad;
                this.nearByUsers = response.data.responseData.data;
                this.offerNeedDetail = null;
                //this.markerImg = filters?.type == '1' ? '/diamond.png' : (filters?.type == '2' ? '/umbrella.png' : 'person.png');
                this.markerColor = filters?.type == '1' ? 'blue' : (filters?.type == '2' ? 'green' : 'black');
                setTimeout(this.drawMap, 1);
            })
        },
        calculateZoomLevel() {
            const radius = this.radius * 1000;
            // Center coordinates of the area
            const center = [this.coords[0], this.coords[1]]; // replace with actual coordinates

            // Calculate the distance in degrees for the latitude based on the radius
            const latDistance = (radius / 40008000) * 360;

            // Calculate the distance in degrees for the longitude based on the radius
            const lonDistance = (radius / (40008000 * Math.cos((Math.PI / 180) * center[1]))) * 360;

            // Create the bounding box
            const bounds = new mapboxgl.LngLatBounds(
                [center[0] - lonDistance, center[1] - latDistance], // Southwest corner
                [center[0] + lonDistance, center[1] + latDistance]  // Northeast corner
            );

            // Get the map's container dimensions
            const mapContainer = this.map.getContainer();
            const mapWidth = mapContainer.offsetWidth - 200;

            // Calculate the zoom level based on the bounding box width
            const zoomLevel = this.map.getZoom() - Math.log2(360 * mapWidth / (bounds.getEast() - bounds.getWest()));

            // Set the calculated zoom level to your map
            console.log('zoomLevel', zoomLevel, mapWidth, this.map.getZoom(), bounds.getEast(), bounds.getWest())
            this.map.setZoom(Math.abs(zoomLevel));
        },
        drawMap() {
            if (this.map !== null) {
                this.map.remove();
            }

            mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY;
            this.map = new mapboxgl.Map({
                container: this.$refs.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.coords[0], this.coords[1]],
                zoom: 10,
            });

            // Add nearby users markers to the map
            if (this.nearByUsers.length > 0) {
                this.nearByUsers.map(nu => {
                    const coords = nu.UserProfile.location.coordinates
                    console.log('8888888', nu);
                    let type = nu.UserProfile.type;
                    if (coords[1] == this.coords[1] && coords[0] == this.coords[0])
                        return;
                    const $this = this;
                    // const customMarkerElement = document.createElement('img');
                    // customMarkerElement.src = this.markerImg;
                    let marker = new mapboxgl.Marker({ color: type == '1' ? 'blue' : (type == '2' ? 'green' : 'black') }).setLngLat([coords[0], coords[1]]).addTo(this.map);
                    marker.getElement().dataset.detail = JSON.stringify(nu.OfferAndNeeds);
                    marker.getElement().dataset.community = JSON.stringify(nu.Communities?.[0]?.name ?? 'Unknown');
                    marker.getElement().dataset.email = JSON.stringify(nu?.email);
                    marker.getElement().dataset.user = JSON.stringify(nu.UserProfile);
                    
                    marker.getElement().addEventListener('click', function () {
                        const detail = JSON.parse(this.dataset.detail);
                        const user = JSON.parse(this.dataset.user);
                        const community = JSON.parse(this.dataset.community);
                        const email = JSON.parse(this.dataset.email);
                        $this.offerNeedDetail = { community, user, offerNeeds: {}, email };
                        if (detail.length > 0) {
                            $this.offerNeedDetail = { ...$this.offerNeedDetail, offerNeeds: _.groupBy(detail, key => key.type) };
                        }
                    });
                })
            }
            // Add source marker to the map
            new mapboxgl.Marker({ color: 'red' }).setLngLat([this.coords[0], this.coords[1]]).addTo(this.map);
            // Draw a circle with given radius
            new MapboxCircle({ lat: this.coords[1], lng: this.coords[0] }, this.radius * 1000, {
                editable: false,
                fillColor: '#29AB87'
            }).addTo(this.map);

            this.calculateZoomLevel();
        }
    },
    created() {
        this.coords = JSON.parse(this.$route?.query?.coords)?.map(t => parseFloat(t));
    },
    beforeUnmount() {
        this.map.remove();
    }
}
</script>
<style scoped>
.map-container {
    width: 100%;
    height: 500px;
}
</style>