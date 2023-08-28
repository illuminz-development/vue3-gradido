<template>
    <div class="py-4 container-fluid">
        <div class="mt-0 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Playground</h6>
                    </div>
                    <filters :callback="fetch" :filters="{ radius: '' }" />
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
// import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Filters from './components/Filters.vue';
import MapboxCircle from 'mapbox-gl-circle';

export default {
    name: 'playground',
    components: { Filters },
    data() {
        return {
            coords: null,
            radius: 5,
            map: null
        }
    },
    methods: {
        mbResult(result) {
            console.log(result);
        },
        fetch(filters = {}) {
            console.log('filters', filters)
        }
    },
    created() {
        this.coords = this.$route?.query?.coords?.split(',').map(t => parseFloat(t));
    },
    mounted() {
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY;
        this.map = new mapboxgl.Map({
            container: this.$refs.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.coords[1], this.coords[0]],
            zoom: 10,
        });

        // Add markers to the map
        new mapboxgl.Marker().setLngLat([this.coords[1], this.coords[0]]).addTo(this.map);
        // Draw a circle with given radius
        new MapboxCircle({ lat: this.coords[0], lng: this.coords[1] }, this.radius * 1000, {
            editable: false,
            fillColor: '#29AB87'
        }).addTo(this.map);
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