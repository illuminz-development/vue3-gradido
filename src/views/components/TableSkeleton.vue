<template>
    <tr v-for="row in numRows" :key="row">
        <td v-for="col in numCols" :key="col">
            <p class="text-sm font-weight-bold mb-0">
                <Skeletor width="150" height="12" />
            </p>
        </td>
    </tr>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";

export default {
    name: "table-skeleton",
    props: {
        rows: {
            type: Number,
            default: 1
        },
        cols: {
            type: Number,
            default: 1
        }
    },
    components: {
        Skeletor,
    },
    computed: {
        numRows() {
            return new Array(parseInt(this.rows)).fill(0)
        },
        numCols() {
            return new Array(parseInt(this.cols)).fill(0)
        }
    }
};
</script>