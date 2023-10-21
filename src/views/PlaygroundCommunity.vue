<template>
    <div class="py-4 container-fluid">
        <div class="mt-0 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Playground <span class="text-lighter">({{ communityName }})</span></h6>
                    </div>
                    <filters :callback="fetch" :filters="{ communityId: '', radius, communityName }" />
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="row">
                            <div class="col-md-12">
                                <div v-if="coords !== null" ref="mapContainer" class="map-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Filters from './components/Filters.vue';
import MapboxCircle from 'mapbox-gl-circle';
import CommunityService from '../services/community.service';

export default {
    name: 'playground',
    components: { Filters },
    data() {
        return {
            coords: null,
            radius: 15,
            communityName: '',
            map: null,
            nearByUsers: [],
            markerColor: 'black'
        }
    },
    methods: {
        mbResult(result) {
            console.log(result);
        },
        fetch(filters = {}) {
            const rad = filters?.radius ?? 15;
            this.communityName = filters?.communityName ?? '';
            this.coords = JSON.parse(this.$route?.query?.coords)?.map(t => parseFloat(t));
            CommunityService.fetchNearBy({ radius: rad, communityId: filters?.communityId, latitude: this.coords[1], longitude: this.coords[0] }).then(response => {
                this.radius = rad;
                this.nearByUsers = response.data.responseData.data;
                this.markerColor = 'blue';
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
                    const coords = nu.CommunityProfile.location.coordinates;
                    const radius = nu.CommunityProfile.radius
                    if (coords[1] == this.coords[1] && coords[0] == this.coords[0])
                        return;

                    const popup = new mapboxgl.Popup({ closeOnClick: false, offset: 25 }).setHTML(`<h6 class="m-0">${nu.CommunityProfile.name}</h6><p class="text-xs">${nu.CommunityProfile.address}</p><p class="text-sm">${nu.CommunityProfile.description}</p>`);

                    new mapboxgl.Marker({ color: this.markerColor }).setLngLat([coords[0], coords[1]]).setPopup(popup).addTo(this.map);
                    // Draw a circle with given radius
                    new MapboxCircle({ lat: coords[1], lng: coords[0] }, radius * 1000, {
                        editable: false,
                        fillColor: 'blue'
                    }).addTo(this.map);
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