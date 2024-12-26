import {R as t} from "./ResultsOverflowWarning-a4ac03f6.js";
import {b as r} from "./index-c903cc1f.js";
const o = r()
  , n = {
    components: {
        ResultsOverflowWarning: t
    },
    props: {
        searchDTO: {
            type: Object
        },
        items: {
            type: Array
        },
        headers: {
            type: Array
        },
        loading: {
            type: Boolean
        }
    },
    methods: {
        toggleDrawer() {
            this.$emit("toggleDrawer")
        },
        getCourtByExternalID(e) {
            return o.getCourtByExternalID(e)
        }
    }
};
export {n as S};
