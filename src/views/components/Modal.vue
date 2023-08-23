<template>
    <div v-if="OpenClose">
        <div class="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="false" style="display:block">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                        <button @click="OpenCloseFun" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="false">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn bg-gradient-secondary" @click="OpenCloseFun"
                            data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show"></div>
    </div>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        visible: Boolean,
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            OpenClose: this.visible
        }
    },
    methods: {
        OpenCloseFun() {
            this.OpenClose = false;
        },
    },
    watch: {
        visible: function (newVal, oldVal) { // watch it
            console.log(newVal, oldVal)
            this.OpenClose = this.OpenClose === true ? false : true;
        }
    }
}
</script>