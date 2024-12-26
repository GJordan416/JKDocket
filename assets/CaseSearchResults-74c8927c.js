import {S as m} from "./searchResults-913f2181.js";
import {_ as u, r as s, o as f, f as _, w as o, h as t, i as n, a as h, t as r} from "./index-c903cc1f.js";
import "./ResultsOverflowWarning-a4ac03f6.js";
const b = {
    mixins: [m]
}
  , v = {
    class: "d-sr-only"
};
function D(e, l, $, w, k, y) {
    const c = s("v-icon")
      , i = s("v-btn")
      , p = s("router-link")
      , d = s("results-overflow-warning")
      , g = s("c-server-table");
    return f(),
    _(g, {
        caption: e.$t("page.searchResults.case.table"),
        items: e.items,
        headers: e.headers,
        paging: e.searchDTO.paging,
        loading: e.loading,
        "item-key": "searchResultKey",
        class: "elevation-2",
        "show-header-controls": "",
        "onUpdate:items": l[0] || (l[0] = a => e.$emit("update:items"))
    }, {
        header: o( () => [t(i, {
            color: "primary",
            variant: "text",
            class: "c-table-control-button-icon",
            onClick: e.toggleDrawer
        }, {
            default: o( () => [t(c, {
                style: {
                    "font-size": "22px"
                }
            }, {
                default: o( () => [n(" mdi-filter ")]),
                _: 1
            }), h("span", v, r(e.$t("global.table.filterAndSort")), 1)]),
            _: 1
        }, 8, ["onClick"])]),
        "col-caseNumber": o( ({item: a}) => [t(p, {
            to: {
                name: "caseView",
                params: {
                    courtID: e.getCourtByExternalID(a.caseHeader.courtID).resourceID,
                    caseUUID: a.caseHeader.caseInstanceUUID
                }
            }
        }, {
            default: o( () => [n(r(a.caseHeader.caseNumber), 1)]),
            _: 2
        }, 1032, ["to"])]),
        "col-filedDate": o( ({value: a}) => [n(r(e.$cove.formatDate(a)), 1)]),
        "col-closedFlag": o( ({value: a}) => [n(r(a ? e.$t("global.closed") : e.$t("global.open")), 1)]),
        footer: o( () => [t(d, {
            paging: e.searchDTO.paging
        }, null, 8, ["paging"])]),
        _: 1
    }, 8, ["caption", "items", "headers", "paging", "loading"])
}
const S = u(b, [["render", D]]);
export {S as default};
