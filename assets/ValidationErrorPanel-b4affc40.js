import {_ as c, d, r as m, o as e, c as r, h as p, w as u, a as o, t as a, F as v, k as _, x as h, n as f} from "./index-c903cc1f.js";
const g = {
    inheritAttrs: !1,
    props: {
        errorScope: {
            type: String,
            default: null
        }
    },
    computed: {
        visible() {
            return !d.isEmpty(this.errors)
        },
        errors() {
            return this.$cove.validation.getAllErrorMessages(this.errorScope)
        }
    }
}
  , b = {
    class: "font-weight-medium",
    style: {
        "font-size": "1.1rem",
        "line-height": "1.5"
    }
}
  , y = {
    class: "mt-2"
};
function E(s, S, l, x, V, t) {
    const n = m("v-alert");
    return e(),
    r("div", {
        class: f(["js-validation-anchor", l.errorScope ? "js-scoped-errors" : null])
    }, [p(n, h(s.$attrs, {
        "model-value": t.visible,
        elevation: "2",
        color: "error",
        variant: "tonal",
        icon: "mdi-alert-circle",
        style: {
            border: "2px solid rgb(var(--v-theme-error))"
        },
        class: "mb-4"
    }), {
        default: u( () => [o("div", b, a(s.$t("global.validationErrors")), 1), o("ul", y, [(e(!0),
        r(v, null, _(t.errors, i => (e(),
        r("li", null, a(i), 1))), 256))])]),
        _: 1
    }, 16, ["model-value"])], 2)
}
const k = c(g, [["render", E]]);
export {k as V};
