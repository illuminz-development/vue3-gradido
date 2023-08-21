<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Community Users List</p>
                        </div>
                    </div>
                    <filters :callback="fetch" :filters="{ communityId: '' }" />
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Email ID
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Contact
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Language</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Location
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Community
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="list.length === 0">
                                        <td align="center" colspan="6">No record found.</td>
                                    </tr>
                                    <tr v-for="item in list" :key="item">
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.UserProfile.name }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ item.email }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ item.countryCode }}{{ item.mobile }}
                                            </p>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ item.UserProfile.language }}</p>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{
                                                item.UserProfile.address }}</span>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{
                                                item.UserAccounts?.[0]?.name }}</span>
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
import CommunityUserService from '../services/communityUser.service';
import Filters from './components/Filters.vue';

export default {
    name: "community-users-list",
    components: {
        Filters
    },
    data() {
        return {
            list: []
        }
    },
    methods: {
        fetch(filters) {
            CommunityUserService.list(filters).then(response => {
                this.list = response.data.responseData.data;
            })
        }
    }
}
</script>
  