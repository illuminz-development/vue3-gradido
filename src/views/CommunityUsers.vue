<template>
    <div class="py-4 container-fluid">
        <div class="mt-0 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Community Users List</p>
                        </div>
                    </div>
                    <filters :callback="fetch" :filters="{ communityId: '', name: '' }" />
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">UUID
                                        </th>
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
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Playground
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TableSkeleton v-if="list === null" rows=3 cols=8 />
                                    <tr v-else-if="list.length === 0">
                                        <td align="center" colspan="8">No record found.</td>
                                    </tr>
                                    <tr v-else-if="list.length > 0" v-for="item in list" :key="item">
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.id }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.communityUuid }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.UserProfile.name }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.email }}</p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.countryCode }}{{ item.mobile }}
                                            </p>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.UserProfile.language }}</p>
                                        </td>
                                        <td>
                                            <span class="text-xs">{{
                                                item.UserProfile.address }}</span>
                                        </td>
                                        <td>
                                            <span class="text-xs">{{
                                                item.UserAccounts?.[0]?.name }}</span>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold"><a target="_blank"
                                                    :href="`/playground?coords=${JSON.stringify(item.UserProfile.location.coordinates)}`"
                                                    class="nav-link">Playground</a></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <paginate :page-count="pageCount" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" ></paginate>
    </div>
</template>
  
<script>
import CommunityUserService from '../services/communityUser.service';
import Filters from './components/Filters.vue';
import TableSkeleton from './components/TableSkeleton.vue';
import Paginate from "vuejs-paginate-next";

export default {
    name: "community-users-list",
    components: {
        Filters,
        TableSkeleton,
        Paginate
    },
    data() {
        return {
            list: null,
            currentPage: 1,
            itemsPerPage: 20,
            totalItems: null,
        }
    },
    methods: {
        clickCallback (pageNum){
            this.currentPage = pageNum;
            this.fetch();
        },
        fetch(filters) {
            this.list = null
            CommunityUserService.list({...filters, perPage:20, page: this.currentPage}).then(response => {
                this.list = response.data.responseData.data;
                this.currentPage = response.data.responseData.page;
                this.itemsPerPage = response.data.responseData.perPage;
                this.pageCount = response.data.responseData.totalPages;
            }).catch(() => {
                this.list = [];
            })
        }
    }
}
</script>
  