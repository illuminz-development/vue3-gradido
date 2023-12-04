<template>
    <div class="py-4 container-fluid">
        <div class="mt-0 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Needs List</h6>
                    </div>
                    <filters :callback="fetch" :filters="{ communityId: '', title: '' }" />
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Uuid
                                        </th>
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
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            User
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Created At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TableSkeleton v-if="list === null" rows=3 cols=6 />
                                    <tr v-else-if="list.length === 0">
                                        <td align="center" colspan="4">No record found.</td>
                                    </tr>
                                    <tr v-else-if="list.length > 0" v-for="item in list" :key="item">
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ item.uuid }}</p>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.title }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm mb-0">{{ item.description }}</p>
                                        </td>
                                        <!-- <td>
                                            <span class="text-xs font-weight-bold">{{
                                                item.category }}</span>
                                        </td> -->
                                        <td>
                                            <span class="text-sm">{{
                                                item.CommunityProfile?.name }}</span>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{
                                                item.User.UserProfile.name }}</span>
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
        <paginate :page-count="pageCount" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" ></paginate>
    </div>
</template>
  
<script>
import NeedService from '../services/need.service';
import Filters from './components/Filters.vue';
import moment from 'moment';
import TableSkeleton from './components/TableSkeleton.vue';
import Paginate from "vuejs-paginate-next";

export default {
    name: "needs-list",
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
        fetch(filters = {}) {
            this.list = null;
            NeedService.list({...filters, perPage:20, page: this.currentPage}).then(response => {
                this.list = response.data.responseData.data;
                this.currentPage = response.data.responseData.page;
                this.itemsPerPage = response.data.responseData.perPage;
                this.pageCount = response.data.responseData.totalPages;
            }).catch(() => {
                this.list = [];
            })
        },
        formattedDate(date) {
            return moment(date).format('MM-DD-YYYY');
        }
    }
}
</script>