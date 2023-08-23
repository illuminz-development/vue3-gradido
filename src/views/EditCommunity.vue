<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex align-items-center">
                                <p class="mb-0">Edit Community</p>
                                <argon-button @click="submit" color="success" size="sm"
                                    class="ms-auto">Update</argon-button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Name</label>
                                    <div class="form-group">
                                        <input v-model="name" type="text" class="form-control" name="name" />
                                        <span class="form-input-error" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message
                                        }} </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Radius</label>
                                    <div class="form-group">
                                        <input v-model="radius" type="number" class="form-control" name="radius" />
                                        <span class="form-input-error" v-if="v$.radius.$error"> {{
                                            v$.radius.$errors[0].$message }} </span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label">UUID</label>
                                    <div class="form-group">
                                        <input v-model="communityUuid" type="text" class="form-control"
                                            name="communityUuid" />
                                        <span class="form-input-error" v-if="v$.communityUuid.$error"> {{
                                            v$.communityUuid.$errors[0].$message }} </span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label">Description</label>
                                    <div class="form-group">
                                        <textarea v-model="description" class="form-control" name="radius"></textarea>
                                        <span class="form-input-error" v-if="v$.description.$error"> {{
                                            v$.description.$errors[0].$message
                                        }} </span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label">Location</label>
                                    <p class="text-sm">{{ address }}</p>
                                    <MapboxMap :center="location" style="height: 400px"
                                        access-token="pk.eyJ1IjoidmlrYXNpbG16IiwiYSI6ImNsbG03NzNkNTFwZXMzbHQ2bTV6NHA0ZjgifQ.knlN4jnVdmhDkJTaka5RoQ"
                                        map-style="mapbox://styles/mapbox/streets-v11">
                                        <MapboxMarker :lng-lat="location" />
                                        <MapboxGeocoder types="locality,place,postcode,country" @mb-result="mbResult" />
                                    </MapboxMap>
                                    <!-- <GMapAutocomplete v-model="address" :value="address" class="form-control"
                                        placeholder="Type the location ..." @place_changed="setPlace">
                                    </GMapAutocomplete> -->
                                    <span class="form-input-error" v-if="v$.address.$error"> {{
                                        v$.address.$errors[0].$message
                                    }} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
  
<script>
import ArgonButton from "@/components/ArgonButton.vue";
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import CommunityService from "../services/community.service";
import { MapboxMap, MapboxGeocoder, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

export default {
    name: "add-community",
    setup() {
        return { v$: useValidate() }
    },
    validations() {
        return {
            name: { required: helpers.withMessage('Name is required', required) },
            communityUuid: { required: helpers.withMessage('UUID is required', required) },
            radius: { required: helpers.withMessage('Radius is required', required) },
            description: { required: helpers.withMessage('Description is required', required) },
            address: { required: helpers.withMessage('Location is required', required) }
        }
    },
    data() {
        return {
            communityUuid: '',
            name: '',
            radius: '',
            description: '',
            address: '',
            location: [0, 0]
        }
    },
    components: { ArgonButton, MapboxMap, MapboxGeocoder, MapboxMarker },
    methods: {
        mbResult(data) {
            console.log('mbResult', data);
            this.address = data?.result?.place_name ?? '';
            const lat = data.result.center[0];
            const lng = data.result.center[1];
            this.location = [lat, lng];
        },
        fetch() {
            CommunityService.fetchById(this.$route.params.id).then(response => {
                const { communityUuid, CommunityProfile } = response.data.responseData;
                this.communityUuid = communityUuid;
                this.name = CommunityProfile.name;
                this.radius = CommunityProfile.radius;
                this.description = CommunityProfile.description;
                this.address = CommunityProfile.address;
                this.location = CommunityProfile.location.coordinates
            })
        },
        setPlace(data) {
            this.address = data?.formatted_address ?? '';
            const lat = data.geometry.location.lat();
            const lng = data.geometry.location.lng();
            this.location = [lat, lng];
        },
        submit(e) {
            e.preventDefault();
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error && this.address.length > 0) {
                CommunityService.edit(this.$route.params.id, { communityUuid: `${this.communityUuid}`, name: this.name, radius: this.radius, description: this.description, location: this.location, address: this.address }).then(() => {
                    this.$router.push('/dashboard/communities');
                })
            }
        }
    },

    created() {
        this.fetch();
    }
};
</script>
  