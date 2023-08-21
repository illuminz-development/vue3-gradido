<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Needs List</h6>
                    </div>
                    <filters :callback="fetch" :filters="{ communityId: '' }" />
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Title
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Description</th>
                                        <!-- <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Category
                                        </th> -->
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Community
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Created At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="list.length === 0">
                                        <td align="center" colspan="5">No record found.</td>
                                    </tr>
                                    <tr v-for="item in list" :key="item">
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.title }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ item.description }}</p>
                                        </td>
                                        <!-- <td>
                                            <span class="text-xs font-weight-bold">{{
                                                item.category }}</span>
                                        </td> -->
                                        <td>
                                            <span class="text-xs font-weight-bold">{{
                                                item.CommunityProfile.name }}</span>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{
                                                formattedDate(item.createdAt) }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import NeedService from '../services/need.service';
import Filters from './components/Filters.vue';
import moment from 'moment';

export default {
    name: "needs-list",
    components: {
        Filters
    },
    data() {
        return {
            list: []
        }
    },
    methods: {
        fetch(filters = {}) {
            NeedService.list(filters).then(response => {
                console.log('response', response)
                this.list = response.data.responseData.data;
            })
        },
        formattedDate(date) {
            return moment(date).format('MM-DD-YYYY');
        }
    }
}
</script>