<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex align-items-center">
                                <p class="mb-0">Edit Tag</p>
                                <argon-button @click="submit" color="success" size="sm"
                                    class="ms-auto">Update</argon-button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Name (English)</label>
                                    <div class="form-group">
                                        <input v-model="titleEnglish" type="text" class="form-control" name="titleEnglish" />
                                        <span class="form-input-error" v-if="v$.titleEnglish.$error"> {{ v$.titleEnglish.$errors[0].$message
                                        }} </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Name (German)</label>
                                    <div class="form-group">
                                        <input v-model="titleGerman" type="text" class="form-control" name="titleGerman" />
                                        <span class="form-input-error" v-if="v$.titleGerman.$error"> {{ v$.titleGerman.$errors[0].$message
                                        }} </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Name (French)</label>
                                    <div class="form-group">
                                        <input v-model="titleFrench" type="text" class="form-control" name="titleFrench" />
                                        <span class="form-input-error" v-if="v$.titleFrench.$error"> {{ v$.titleFrench.$errors[0].$message
                                        }} </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Name (Spanish)</label>
                                    <div class="form-group">
                                        <input v-model="titleSpanish" type="text" class="form-control" name="titleSpanish" />
                                        <span class="form-input-error" v-if="v$.titleSpanish.$error"> {{ v$.titleSpanish.$errors[0].$message
                                        }} </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="example-text-input" class="form-control-label">Name (Dutch)</label>
                                    <div class="form-group">
                                        <input v-model="titleDutch" type="text" class="form-control" name="titleDutch" />
                                        <span class="form-input-error" v-if="v$.titleDutch.$error"> {{ v$.titleDutch.$errors[0].$message
                                        }} </span>
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
import useValidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import CategoryService from '../services/category.service';

export default {
    name: "add-community",
    setup() {
        return { v$: useValidate() }
    },
    validations() {
        return {
            titleEnglish: { required: helpers.withMessage('Name is required for english language', required) },
            titleGerman: { required: helpers.withMessage('Name is required for german language', required) },
            titleFrench: { required: helpers.withMessage('Name is required for french language', required) },
            titleSpanish: { required: helpers.withMessage('Name is required for spanish language', required) },
            titleDutch: { required: helpers.withMessage('Name is required for dutch language', required) }
        }
    },
    data() {
        return {
            titleEnglish: '',
            titleGerman: '',
            titleFrench: '',
            titleSpanish: '',
            titleDutch: ''
        }
    },
    components: { ArgonButton },
    methods: {
        fetch() {
            CategoryService.fetchById(this.$route.params.id).then(response => {
                const { CategoryContents } = response.data.responseData;
                if(CategoryContents.length > 0){
                    CategoryContents.forEach((value) => {
                        if(value.languageName == 'English'){
                            this.titleEnglish = value.name;
                        }
                        if(value.languageName == 'German'){
                            this.titleGerman = value.name;
                        }
                        if(value.languageName == 'French'){
                            this.titleFrench = value.name;
                        }
                        if(value.languageName == 'Spanish'){
                            this.titleSpanish = value.name;
                        }
                        if(value.languageName == 'Dutch'){
                            this.titleDutch = value.name;
                        }

                    })
                }
            })
        },
        submit(e) {
            e.preventDefault();
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) {
                CategoryService.edit(this.$route.params.id, { titleEnglish: this.titleEnglish, titleGerman: this.titleGerman, titleFrench: this.titleFrench, titleSpanish: this.titleSpanish, titleDutch: this.titleDutch }).then(() => {
                    this.$router.push('/dashboard/tags');
                })
            }
        }
    },

    created() {
        this.fetch();
    }
};
</script>
  