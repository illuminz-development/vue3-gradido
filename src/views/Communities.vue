<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <div class="d-flex align-items-center">
                            <p class="mb-0">Communities List</p>
                            <argon-button @click="addNew" color="success" size="sm" class="ms-auto">Add
                                New</argon-button>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Radius</th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Location
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="list.length === 0">
                                        <td align="center" colspan="4">No record found.</td>
                                    </tr>
                                    <tr v-for="item in list" :key="item">
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.CommunityProfile.name }}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-sm font-weight-bold mb-0">{{ item.CommunityProfile.radius }}</p>
                                        </td>
                                        <td>
                                            <span class="text-xs font-weight-bold">{{
                                                item.CommunityProfile.address }}</span>
                                        </td>
                                        <td class="align-middle">
                                            <a href="javascript: void(0);"
                                                @click="e => $router.push(`/communities/edit/${item.id}`)"
                                                class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                                data-original-title="Edit user">Edit</a> |
                                            <a href="javascript: void(0);" @click="e => remove(item.id)"
                                                class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                                data-original-title="Edit user">Delete</a>
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
import CommunityService from '../services/community.service';
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "communities-list",
    components: { ArgonButton },
    data() {
        return {
            list: [],
            filters: {}
        }
    },
    methods: {
        addNew() {
            this.$router.push('/communities/add')
        },
        fetch() {
            CommunityService.list(this.filters).then(response => {
                this.list = response.data.responseData.data;
            })
        },
        remove(id) {
            this.$confirm("Are you sure to delete this?", '', 'Confirm', {
                customClass: {
                    confirmButton: 'btn mb-0 btn-success btn-sm',
                    cancelButton: 'btn mb-0 btn-sm m-lg-3'
                },
                buttonsStyling: false
            }).then(() => {
                CommunityService.remove(id).then(() => {
                    this.fetch();
                });
            }).catch(e => {
                console.log(e);
            });
        }
    },
    created() {
        this.fetch();
    },
}
</script>
  