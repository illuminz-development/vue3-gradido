<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Categories List</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Name
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="list.length === 0">
                                        <td align="center" colspan="2">No record found.</td>
                                    </tr>
                                    <tr v-for="item in list" :key="item">
                                        <td>
                                            <div class="d-flex px-2">
                                                <div class="my-auto">
                                                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                                                </div>
                                            </div>
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
import CategoryService from '../services/category.service';

export default {
    name: "categories-list",
    data() {
        return {
            list: []
        }
    },
    methods: {
        fetch(filters) {
            CategoryService.list(filters).then(response => {
                console.log('response', response)
                this.list = response.data.responseData.data;
            })
        }
    },

    created() {
        this.fetch();
    }
}
</script>