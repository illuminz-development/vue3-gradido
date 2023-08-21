<template>
    <div class="card-header filters pb-0">
        <div class="row">
            <div class="col-3" v-if="typeof filters.communityId != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Community</label>
                        <select v-model="filter.communityId" type="text" class="form-control form-select p-1" name="email"
                            placeholder="Select Community">
                            <option value=""></option>
                            <option v-for="item in communitiesList" :key="item"
                                :value="item?.CommunityProfile?.communityId">{{
                                    item?.CommunityProfile?.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="typeof filters.category != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Category</label>
                        <select v-model="filter.category" type="text" class="form-control form-select p-1" name="email"
                            placeholder="Select Category">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="form-group">
                    <div>
                        <label>&nbsp;</label>
                        <button class="btn mt-4 mb-0" @click="applyFilter">Apply Filter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import categoryService from '../../services/category.service';
import communityService from '../../services/community.service';

export default {
    name: "filters",
    props: {
        callback: Function,
        filters: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            communitiesList: [],
            categoriesList: [],
            filter: {
                ...(this?.filters ?? {}),
                ...this.$route.query
            }
        }
    },
    methods: {
        communities() {
            communityService.list().then(response => {
                this.communitiesList = response.data.responseData.data;
            })
        },
        categories() {
            categoryService.list().then(response => {
                this.categoriesList = response.data.responseData.data;
            })
        },
        applyFilter() {
            console.log('this.filter', this.filter)
            this.$router.replace({ query: { ...this.filter } })
            this.callback(this.filter);
        }
    },

    created() {
        this.callback(this.filter);
        this.communities();
        this.categories();
    }
}
</script>