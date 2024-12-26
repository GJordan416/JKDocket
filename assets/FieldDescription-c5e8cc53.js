import {_ as r, d as s, o as a, c as o, i as d, t as l, B as n} from "./index-c903cc1f.js";
const c = {
    props: {
        id: {
            type: String,
            required: !0
        },
        messageKey: {
            type: String,
            required: !1
        }
    },
    computed: {
        messageDisplay() {
            let e = s.isNil(this.messageKey) ? null : this.$t(this.messageKey);
            return s.isNil(this.id) && (e = "ERROR: FIELD DESCRIPTION ELEMENT MISSING ID ATTRIBUTE"),
            e
        }
    }
}
  , p = ["id"];
function u(e, _, t, m, f, i) {
    return a(),
    o("div", {
        id: t.id,
        class: "field-description"
    }, [d(l(i.messageDisplay) + " ", 1), n(e.$slots, "default")], 8, p)
}
const y = r(c, [["render", u]]);
export {y as F};
