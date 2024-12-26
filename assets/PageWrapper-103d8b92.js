import {_, d as l, r as s, o, c as u, B as c, h as a, w as i, a as h, i as m, t as d, T as b, j as g} from "./index-c903cc1f.js";
const v = {
    props: {
        title: {
            type: String
        },
        subtitle: {
            type: String
        },
        fluid: {
            type: Boolean,
            default: !1
        }
    },
    computed: {
        hasSubtitle() {
            return !l.isNil(this.subtitle)
        }
    },
    watch: {
        title: {
            immediate: !0,
            handler() {
                this.updatePageTitle()
            }
        },
        subtitle: {
            immediate: !0,
            handler() {
                this.updatePageTitle()
            }
        }
    },
    methods: {
        updatePageTitle() {
            let t = "";
            l.isNil(this.title) || (t += this.title),
            l.isNil(this.subtitle) || (t += " - " + this.subtitle),
            t += (t !== "" ? " - " : "") + this.$t("application.project.name"),
            document.title = t
        }
    }
}
  , N = {
    class: "text-h4 page-title page-focus",
    tabindex: "-1"
};
function T(t, y, e, S, w, r) {
    const f = s("v-col")
      , p = s("v-row")
      , n = s("v-container");
    return o(),
    u("div", null, [c(t.$slots, "title", {}, () => [a(n, {
        class: "page-container py-5",
        fluid: e.fluid
    }, {
        default: i( () => [a(p, null, {
            default: i( () => [a(f, {
                cols: "12",
                class: "pb-0"
            }, {
                default: i( () => [h("h1", N, [m(d(e.title) + " ", 1), a(b, {
                    name: "fade-transition",
                    mode: "out-in"
                }, {
                    default: i( () => [r.hasSubtitle ? (o(),
                    u("span", {
                        class: "page-subtitle",
                        key: e.subtitle
                    }, d(e.subtitle), 1)) : g("", !0)]),
                    _: 1
                })])]),
                _: 1
            })]),
            _: 1
        })]),
        _: 1
    }, 8, ["fluid"])]), a(n, {
        class: "page-container",
        fluid: e.fluid
    }, {
        default: i( () => [c(t.$slots, "default")]),
        _: 3
    }, 8, ["fluid"])])
}
const B = _(v, [["render", T]]);
export {B as P};
