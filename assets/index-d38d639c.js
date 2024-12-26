import {a5 as b} from "./index-c903cc1f.js";
var s = {};
(function(h) {
    (function(c) {
        c.stringify = function e(r) {
            function o(a) {
                return /[^\w-.]/.test(a) ? a.replace(/[^\w-.]/g, function(i) {
                    return i === "$" ? "!" : (i = i.charCodeAt(0),
                    i < 256 ? "*" + ("00" + i.toString(16)).slice(-2) : "**" + ("0000" + i.toString(16)).slice(-4))
                }) : a
            }
            var u;
            switch (typeof r) {
            case "number":
                return isFinite(r) ? "~" + r : "~null";
            case "boolean":
                return "~" + r;
            case "string":
                return "~'" + o(r);
            case "object":
                if (!r)
                    return "~null";
                if (u = [],
                Array.isArray(r)) {
                    for (var f = 0; f < r.length; f++)
                        u[f] = e(r[f]) || "~null";
                    return "~(" + (u.join("") || "~") + ")"
                } else {
                    for (var t in r)
                        if (r.hasOwnProperty(t)) {
                            var n = e(r[t]);
                            n && u.push(o(t) + n)
                        }
                    return "~(" + u.join("~") + ")"
                }
            default:
                return
            }
        }
        ;
        var g = {
            true: !0,
            false: !1,
            null: null
        };
        c.parse = function(e) {
            if (!e)
                return e;
            e = e.replace(/%(25)*27/g, "'");
            var r = 0
              , o = e.length;
            function u(t) {
                if (e.charAt(r) !== t)
                    throw new Error("bad JSURL syntax: expected " + t + ", got " + (e && e.charAt(r)));
                r++
            }
            function f() {
                for (var t = r, n, a = ""; r < o && (n = e.charAt(r)) !== "~" && n !== ")"; )
                    switch (n) {
                    case "*":
                        t < r && (a += e.substring(t, r)),
                        e.charAt(r + 1) === "*" ? (a += String.fromCharCode(parseInt(e.substring(r + 2, r + 6), 16)),
                        t = r += 6) : (a += String.fromCharCode(parseInt(e.substring(r + 1, r + 3), 16)),
                        t = r += 3);
                        break;
                    case "!":
                        t < r && (a += e.substring(t, r)),
                        a += "$",
                        t = ++r;
                        break;
                    default:
                        r++
                    }
                return a + e.substring(t, r)
            }
            return function t() {
                var n, a, i;
                switch (u("~"),
                a = e.charAt(r)) {
                case "(":
                    if (r++,
                    e.charAt(r) === "~")
                        if (n = [],
                        e.charAt(r + 1) === ")")
                            r++;
                        else
                            do
                                n.push(t());
                            while (e.charAt(r) === "~");
                    else if (n = {},
                    e.charAt(r) !== ")")
                        do {
                            var d = f();
                            n[d] = t()
                        } while (e.charAt(r) === "~" && ++r);
                    u(")");
                    break;
                case "'":
                    r++,
                    n = f();
                    break;
                default:
                    for (i = r++; r < o && /[^)~]/.test(e.charAt(r)); )
                        r++;
                    var l = e.substring(i, r);
                    if (/[\d\-]/.test(a))
                        n = parseFloat(l);
                    else if (n = g[l],
                    typeof n > "u")
                        throw new Error("bad value keyword: " + l)
                }
                return n
            }()
        }
        ,
        c.tryParse = function(e, r) {
            try {
                return c.parse(e)
            } catch {
                return r
            }
        }
    }
    )(h)
}
)(s);
var w = s;
const p = b(w);
export {p as J};
