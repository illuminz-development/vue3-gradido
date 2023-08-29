<template>
    <div v-if="Object.keys(data).length > 0">
        <div v-for="key of Object.keys(data)" class="row" :key="key">
            <h6>{{ key == '1' ? 'Offers' : 'Needs' }}</h6>
            <dl v-for="item in data[key]" class="row" :key="item">
                <dt class="col-sm-4 text-sm mb-2">Title</dt>
                <dd class="col-sm-8 text-sm mb-2">
                    <p class="text-sm mb-0">{{ item?.title }}</p>
                </dd>

                <dt class="col-sm-4 text-sm mb-2">Description</dt>
                <dd class="col-sm-8 text-sm mb-2">
                    <p class="text-sm mb-0">{{ item?.description }}</p>
                </dd>

                <dt class="col-sm-4 text-sm mb-2">Community</dt>
                <dd class="col-sm-8 text-sm mb-2">
                    <p class="text-sm mb-0">{{ community }}</p>
                </dd>

                <dt class="col-sm-4 text-sm mb-2">Created At</dt>
                <dd class="col-sm-8 text-sm mb-2">
                    <p class="text-sm mb-0">{{ formattedDate(item?.createdAt) }}</p>
                </dd>
                <dt class="border-bottom-md col-sm-12"></dt>
            </dl>
        </div>
    </div>
    <div v-else>
        No offer / need found.
    </div>
</template>
<script>
import moment from 'moment';

export default {
    name: 'offer-need-detail',
    props: {
        data: {
            type: Object
        },
        community: {
            type: String
        }
    },
    methods: {
        formattedDate(date) {
            return moment(date).format('MM-DD-YYYY');
        }
    }
}
</script>