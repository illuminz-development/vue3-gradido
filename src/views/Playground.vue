<template>
    <div class="py-4 container-fluid">
        <div class="mt-0 row">
            <div :class="offerNeedDetail === null ? 'col-12' : 'col-8'">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Playground</h6>
                    </div>
                    <filters :callback="fetch" :filters="{ communityId: '', radius }" />
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
                        <OfferNeedDetails :community="community" :data="offerNeedDetail" />
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
            community: null,
            offerNeedDetail: null,
            nearByUsers: []
        }
    },
    methods: {
        mbResult(result) {
            console.log(result);
        },
        fetch(filters = {}) {
            const rad = filters?.radius ?? 15;
            this.coords = JSON.parse(this.$route?.query?.coords)?.map(t => parseFloat(t));
            CommunityUserService.fetchNearBy({ radius: rad, communityId: filters?.communityId, latitude: this.coords[0], longitude: this.coords[1] }).then(response => {
                this.radius = rad;
                this.nearByUsers = response.data.responseData.data;
                this.offerNeedDetail = null;
                this.drawMap();
            })
        },
        drawMap() {
            mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY;
            this.map = new mapboxgl.Map({
                container: this.$refs.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.coords[1], this.coords[0]],
                zoom: 8,
            });

            // Add nearby users markers to the map
            if (this.nearByUsers.length > 0) {
                this.nearByUsers.map(nu => {
                    const $this = this;
                    let marker = new mapboxgl.Marker({ color: '#FF0000' }).setLngLat([nu.UserProfile.location.coordinates[1], nu.UserProfile.location.coordinates[0]]).addTo(this.map);

                    marker.getElement().dataset.detail = JSON.stringify(nu.OfferAndNeeds);
                    marker.getElement().dataset.community = JSON.stringify(nu.UserAccounts?.[0]?.name ?? 'Unknown');
                    marker.getElement().dataset.location = JSON.stringify(nu.UserProfile.location.coordinates);
                    marker.getElement().addEventListener('click', function () {
                        const detail = JSON.parse(this.dataset.detail);
                        const community = JSON.parse(this.dataset.community);
                        if (detail.length > 0) {
                            $this.offerNeedDetail = _.groupBy(detail, key => key.type);
                            $this.community = community;
                        } else {
                            //if ($this.offerNeedDetail.length > 0) {
                            $this.offerNeedDetail = {}
                            $this.community = null;
                            //}
                        }
                    });
                })
            }
            // Add markers to the map
            new mapboxgl.Marker().setLngLat([this.coords[1], this.coords[0]]).addTo(this.map);
            // Draw a circle with given radius
            new MapboxCircle({ lat: this.coords[0], lng: this.coords[1] }, this.radius * 1609.34, {
                editable: false,
                fillColor: '#29AB87'
            }).addTo(this.map);
        }
    },
    created() {
        this.coords = JSON.parse(this.$route?.query?.coords)?.map(t => parseFloat(t));
    },
    updated() {
        //this.drawMap();
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