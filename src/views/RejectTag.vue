<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="">
                    <div class="card">
                        <div class="card-header pb-0">
                            
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="example-text-input" class="form-control-label">Tags</label>
                                    <div class="form-group">
                                        <select type="text" v-model="replacementUuid" name="replacementUuid" class="form-control form-select p-1" placeholder="Select Category">
                                            <option value=""></option>
                                            <option v-for="item in categoriesList" :key="item"
                                                :value="item?.categoryUuid">{{
                                                    item?.name }}</option>
                                        </select>
                                        <span class="form-input-error" v-if="v$.replacementUuid.$error"> {{ v$.replacementUuid.$errors[0].$message
                                        }} </span>

                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="d-flex align-items-center">
                                        <argon-button @click="submit" color="success" size="sm" class="ms-auto">Save</argon-button>
                                    </div>
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
//import CommunityService from "../services/community.service";
import categoryService from '../services/category.service';
import TagService from '../services/tag.service';

export default {
    name: "reject-category",
    props: {
        info: {
            type: Object
        }
    },
    setup() {
        return { v$: useValidate() }
    },
    validations() {
        return {
            replacementUuid: { required: helpers.withMessage('Tag replacement is required', required) }
        }
    },
    data() {
        return {
            replacementUuid: '',
            categoriesList: [],
            categoryUuid: ''
        }
    },
    components: { ArgonButton },
    methods: {
        categories() {
            TagService.list().then(response => {
                this.categoriesList = response.data.responseData.data;
            })
        },
        submit(e) {
            e.preventDefault();
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) {
                categoryService.manageStatus({ uuid: `${this.info.categoryUuid}`, status: 2, replacementUuid:`${this.replacementUuid}` }).then(() => {
                    window.location.reload();
                    //this.$router.push('/dashboard/categories');
                })
            }
        }
    },
    created() {
        this.categories();
    }
};
</script>