<template>
    <div class="py-4 container-fluid">
        <div class="mt-0 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Categories List</h6>
                    </div>
                    <filters :callback="fetch" :filters="{ name: '', status: '', orderBy: '' }" />
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Id
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Uuid
                                        </th>
                                        
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Name
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Status
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TableSkeleton v-if="list === null" rows=10 cols=5 />
                                    <tr v-else-if="list.length === 0">
                                        <td align="center">No record found.</td>
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
                                                    <h6 class="mb-0 text-sm">{{ item.categoryUuid }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        

                                        <td>
                                            <div class="d-flex px-2" v-for="title in item?.CategoryContents" :key="title">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">
                                                        {{ title.name }} ({{title.Language.name}})
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="align-middle">
                                            <span v-if="item.status == 0">
                                                <a href="javascript: void(0);" @click="e => manageStatus(item.categoryUuid, 1)"
                                                    class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                                    data-original-title="Accept record">Accept</a> |
                                                <a href="javascript: void(0);" data-bs-toggle="modal" data-bs-target="#detailModal" @click="e => showDetail(e, item)" class="text-secondary font-weight-bold text-xs">Reject</a>
                                            </span>

                                            <span v-else-if="item.status == 1">
                                                <h6 class="mb-0 text-sm">Accepted</h6>
                                            </span>

                                            <span v-else-if="item.status == 2">
                                                <h6 class="mb-0 text-sm">Rejected</h6>
                                            </span>

                                        </td>
                                        <td class="align-middle">
                                            <a href="javascript: void(0);"
                                                @click="e => $router.push(`/dashboard/categories/edit/${item.id}`)"
                                                class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                                data-original-title="Edit category">Edit</a>
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
    <Modal :visible="openModal" title="Reject Category">
        <RejectCategory :info="detail" />
    </Modal>
</template>
  
<script>
import CategoryService from '../services/category.service';
import TableSkeleton from './components/TableSkeleton.vue';
import Modal from './components/Modal.vue';
import RejectCategory from './RejectCategory.vue';
import Filters from './components/Filters.vue';
import Paginate from "vuejs-paginate-next";

export default {
    name: "categories-list",
    components: { TableSkeleton, Modal, RejectCategory, Filters, Paginate },
    data() {
        return {
            list: null,
            openModal: false,
            detail: {},
            currentPage: 1,
            itemsPerPage: 20,
            totalItems: null,
        }
    },
    methods: {
        showDetail(e, item) {
            e.preventDefault();
            this.openModal = Date.now();
            this.detail = item;
        },
        fetch(filters) {
            filters = {...filters, allLanguage: 1}
            this.list = null
            CategoryService.list({...filters, perPage:20, page: this.currentPage}).then(response => {
                this.list = response.data.responseData.data;
                this.currentPage = response.data.responseData.page;
                this.itemsPerPage = response.data.responseData.perPage;
                this.pageCount = response.data.responseData.totalPages;
            }).catch(() => {
                this.list = [];
            })
        },
        clickCallback (pageNum){
            this.currentPage = pageNum;
            this.fetch();
        },
        manageStatus(uuid, status) {
            this.$confirm("Are you sure to accept this?", '', 'Confirm', {
                customClass: {
                    confirmButton: 'btn mb-0 btn-success btn-sm',
                    cancelButton: 'btn mb-0 btn-sm m-lg-3'
                },
                buttonsStyling: false
            }).then(() => {
                CategoryService.manageStatus({ uuid: `${uuid}`, status: `${status}`}).then(() => {
                    this.fetch();
                });
            }).catch(e => {
                console.log(e);
            });
        }

    },

    created() {
        this.fetch();
    }
}
</script>