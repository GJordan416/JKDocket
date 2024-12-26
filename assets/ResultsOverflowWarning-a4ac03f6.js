import {b as s, _ as a, o as r, c as o, a as n, t as c, j as i} from "./index-c903cc1f.js";
const l = s()
  , p = {
    props: {
        paging: {
            type: Object
        }
    },
    computed: {
        isOverflow() {
            return this.paging.totalItems >= this.maxResults
        },
        maxResults() {
            return l.getAppProperty(this.CONST.APP_PROPERTY_SEARCH_RESULTS_LIMIT)
        }
    }
}
  , _ = {
    key: 0,
    class: "d-flex justify-center"
}
  , m = {
    class: "text-warning font-weight-medium text-center mb-2",
    style: {
        "max-width": "64ch"
    }
};
function u(t, d, f, g, h, e) {
    return e.isOverflow ? (r(),
    o("div", _, [n("div", m, c(t.$t("global.table.resultsOverflow", [e.maxResults])), 1)])) : i("", !0)
}
const R = a(p, [["render", u]]);
export {R};
