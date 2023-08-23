<template>
    <dl class="row">
        <dt class="col-sm-3 text-sm mb-2">Name</dt>
        <dd class="col-sm-9 text-sm mb-2">
            <p class="text-sm">{{ data?.CommunityProfile?.name }}</p>
        </dd>

        <dt class="col-sm-3 text-sm mb-2">Description</dt>
        <dd class="col-sm-9 text-sm mb-2">
            <p class="text-sm">{{ data?.CommunityProfile?.description }}</p>
        </dd>

        <dt class="col-sm-3 text-sm mb-2">Location</dt>
        <dd class="col-sm-9 text-sm mb-2">
            <p class="text-sm">{{ data?.CommunityProfile?.address }}</p>
        </dd>

        <dt class="col-sm-3 text-sm mb-2">Radius</dt>
        <dd class="col-sm-9 text-sm mb-2">
            <p class="text-sm">{{ data?.CommunityProfile?.radius }} Miles</p>
        </dd>

        <dt class="col-sm-3 text-sm mb-2">API Key</dt>
        <dd class="col-sm-9 mb-2" style="word-break: break-word;">
            <p class="text-sm" v-if="displayKey">{{ data?.CommunityProfile?.api_key }}</p>
            <p class="text-sm" v-else>************ <a href="#" @click="showKey">show</a></p>
        </dd>
    </dl>
</template>
<script>
export default {
    name: 'community-detail',
    props: {
        data: {
            type: Object
        }
    },
    data() {
        return {
            displayKey: false
        }
    },
    methods: {
        showKey() {
            this.displayKey = true;
        }
    }
}
</script>