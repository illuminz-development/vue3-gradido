<template>
  <nav aria-label="breadcrumb">
    <ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="`${this.$store.state.isRTL ? '' : ' me-sm-6'} ${this.$store.state.isNavFixed ? 'text-dark' : 'text-dark'}`">
      <li class="text-sm breadcrumb-item" v-for="crumb in crumbs" :key="crumb">
        <router-link :class="this.$store.state.isNavFixed ? 'text-dark' : 'text-dark'" class="opacity-8" :to="crumb.to">{{
          formatted(crumb.text) }}</router-link>
      </li>
    </ol>
    <h6 v-if="crumbs?.[crumbs.length - 1]" class="mb-0 font-weight-bolder"
      :class="this.$store.state.isNavFixed ? 'text-dark' : 'text-dark'">
      {{ formatted(crumbs[crumbs.length - 1].text) }}
    </h6>
  </nav>
</template>
<script>
export default {
  methods: {
    formatted(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  computed: {
    crumbs: function () {
      let pathArray = this.$route.path.split("/")
      pathArray.shift()
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if (this.$route.matched?.[parseInt(idx)]?.meta?.breadCrumbs) {
          breadcrumbArray.push({
            path: path,
            to: breadcrumbArray[idx - 1]
              ? breadcrumbArray[idx - 1].to + "/" + path
              : "/" + path,
            text: path,
          });
        }

        console.log('breadcrumbArray', breadcrumbArray)
        return breadcrumbArray;
      }, [])
      return breadcrumbs;
    }
  }
};
</script>
