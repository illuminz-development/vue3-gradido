<template>
    <div class="card-header filters pb-0">
        <div class="row">
            <div class="col-3" v-if="typeof filters.communityId != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Community</label>
                        <select v-model="filter.communityId" type="text" class="form-control form-select p-1"
                            placeholder="Select Community">
                            <option value=""></option>
                            <option v-for="item in communitiesList" :key="item"
                                :value="item?.CommunityProfile?.communityId">{{
                                    item?.CommunityProfile?.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="typeof filters.type != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Listing Type</label>
                        <select v-model="filter.type" type="text" class="form-control form-select p-1"
                            placeholder="Select type">
                            <option value="0">All</option>
                            <option value="1">Offer</option>
                            <option value="2">Need</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="typeof filters.category != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Category</label>
                        <select v-model="filter.category" type="text" class="form-control form-select p-1"
                            placeholder="Select Category">
                            <option value=""></option>
                            <option v-for="item in categoriesList" :key="item"
                                :value="item?.categoryUuid">{{
                                    item?.CategoryContents[0]?.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="typeof filters.uuid != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>UUID</label>
                        <input v-model="filter.uuid" type="text" class="form-control p-1" />
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="typeof filters.name != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Name</label>
                        <input v-model="filter.name" type="text" class="form-control p-1" />
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="typeof filters.title != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Title</label>
                        <input v-model="filter.title" type="text" class="form-control p-1" />
                    </div>
                </div>
            </div>
            <div class="col-2" v-if="typeof filters.status != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Status</label>
                        <select v-model="filter.status" type="text" class="form-control form-select p-1"
                            placeholder="Select Status">
                            <option value="">All</option>
                            <option value="0">Pending</option>
                            <option value="1">Accepted</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="col-2" v-if="typeof filters.orderBy != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Order By</label>
                        <select v-model="filter.orderBy" type="text" class="form-control form-select p-1"
                            placeholder="Select Ordering">
                            <option value="date">Date</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="typeof filters.radius != 'undefined'">
                <div class="form-group">
                    <div>
                        <label>Radius (in KM)</label>
                        <input v-model="filter.radius" type="text" class="form-control p-1" />
                    </div>
                </div>
            </div>
            <div class="col-2">
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
            let filters = {};
            filters = {...filters, allLanguage: 0}
            categoryService.list(filters).then(response => {
                this.categoriesList = response.data.responseData.data;
            })
        },
        clean(obj) {
            for (var propName in obj) {
                if (obj[propName] === null || obj[propName] === undefined || obj[propName].length === 0) {
                    delete obj[propName];
                }
            }
            return obj
        },
        applyFilter() {
            this.$router.replace({ query: { ...this.filter } })
            this.callback(this.clean(this.filter));
        }
    },

    created() {
        typeof this.filter.communityId != 'undefined' && this.communities();
        typeof this.filter.category != 'undefined' && this.categories();
        this.callback(this.clean(this.filter));
    }
}
</script>