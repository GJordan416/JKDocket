import {_ as a, o as t, c as s, a as o, B as c, j as n} from "./index-c903cc1f.js";
const r = {}
  , d = {
    class: "d-flex",
    style: {
        "justify-content": "center"
    }
}
  , i = {
    class: "py-8 px-14 rounded",
    style: {
        border: "2px dashed var(--c-line-color)",
        "max-width": "60ch"
    }
}
  , l = {
    class: "text-center text-minimum-gray font-italic"
}
  , _ = {
    key: 0,
    class: "mt-8 text-center"
};
function m(e, p, u, f, h, x) {
    return t(),
    s("div", d, [o("div", i, [o("div", l, [c(e.$slots, "default")]), e.$slots.action ? (t(),
    s("div", _, [c(e.$slots, "action")])) : n("", !0)])])
}
const y = a(r, [["render", m]]);
export {y as C};
