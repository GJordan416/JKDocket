var V = Object.defineProperty;
var Y = (c, n, t) => n in c ? V(c, n, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : c[n] = t;
var x = (c, n, t) => (Y(c, typeof n != "symbol" ? n + "" : n, t),
t)
  , ee = (c, n, t) => {
    if (!n.has(c))
        throw TypeError("Cannot " + t)
}
;
var D = (c, n, t) => {
    if (n.has(c))
        throw TypeError("Cannot add the same private member more than once");
    n instanceof WeakSet ? n.add(c) : n.set(c, t)
}
;
var A = (c, n, t) => (ee(c, n, "access private method"),
t);
function v() {
    return {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    }
}
let R = v();
function X(c) {
    R = c
}
const W = /[&<>"']/
  , te = new RegExp(W.source,"g")
  , G = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/
  , ne = new RegExp(G.source,"g")
  , se = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
}
  , H = c => se[c];
function b(c, n) {
    if (n) {
        if (W.test(c))
            return c.replace(te, H)
    } else if (G.test(c))
        return c.replace(ne, H);
    return c
}
const ie = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function re(c) {
    return c.replace(ie, (n, t) => (t = t.toLowerCase(),
    t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""))
}
const le = /(^|[^\[])\^/g;
function k(c, n) {
    c = typeof c == "string" ? c : c.source,
    n = n || "";
    const t = {
        replace: (e, s) => (s = typeof s == "object" && "source"in s ? s.source : s,
        s = s.replace(le, "$1"),
        c = c.replace(e, s),
        t),
        getRegex: () => new RegExp(c,n)
    };
    return t
}
function N(c) {
    try {
        c = encodeURI(c).replace(/%25/g, "%")
    } catch {
        return null
    }
    return c
}
const E = {
    exec: () => null
};
function F(c, n) {
    const t = c.replace(/\|/g, (i, r, l) => {
        let o = !1
          , f = r;
        for (; --f >= 0 && l[f] === "\\"; )
            o = !o;
        return o ? "|" : " |"
    }
    )
      , e = t.split(/ \|/);
    let s = 0;
    if (e[0].trim() || e.shift(),
    e.length > 0 && !e[e.length - 1].trim() && e.pop(),
    n)
        if (e.length > n)
            e.splice(n);
        else
            for (; e.length < n; )
                e.push("");
    for (; s < e.length; s++)
        e[s] = e[s].trim().replace(/\\\|/g, "|");
    return e
}
function P(c, n, t) {
    const e = c.length;
    if (e === 0)
        return "";
    let s = 0;
    for (; s < e; ) {
        const i = c.charAt(e - s - 1);
        if (i === n && !t)
            s++;
        else if (i !== n && t)
            s++;
        else
            break
    }
    return c.slice(0, e - s)
}
function oe(c, n) {
    if (c.indexOf(n[1]) === -1)
        return -1;
    let t = 0;
    for (let e = 0; e < c.length; e++)
        if (c[e] === "\\")
            e++;
        else if (c[e] === n[0])
            t++;
        else if (c[e] === n[1] && (t--,
        t < 0))
            return e;
    return -1
}
function K(c, n, t, e) {
    const s = n.href
      , i = n.title ? b(n.title) : null
      , r = c[1].replace(/\\([\[\]])/g, "$1");
    if (c[0].charAt(0) !== "!") {
        e.state.inLink = !0;
        const l = {
            type: "link",
            raw: t,
            href: s,
            title: i,
            text: r,
            tokens: e.inlineTokens(r)
        };
        return e.state.inLink = !1,
        l
    }
    return {
        type: "image",
        raw: t,
        href: s,
        title: i,
        text: b(r)
    }
}
function ae(c, n) {
    const t = c.match(/^(\s+)(?:```)/);
    if (t === null)
        return n;
    const e = t[1];
    return n.split(`
`).map(s => {
        const i = s.match(/^\s+/);
        if (i === null)
            return s;
        const [r] = i;
        return r.length >= e.length ? s.slice(e.length) : s
    }
    ).join(`
`)
}
class L {
    constructor(n) {
        x(this, "options");
        x(this, "rules");
        x(this, "lexer");
        this.options = n || R
    }
    space(n) {
        const t = this.rules.block.newline.exec(n);
        if (t && t[0].length > 0)
            return {
                type: "space",
                raw: t[0]
            }
    }
    code(n) {
        const t = this.rules.block.code.exec(n);
        if (t) {
            const e = t[0].replace(/^ {1,4}/gm, "");
            return {
                type: "code",
                raw: t[0],
                codeBlockStyle: "indented",
                text: this.options.pedantic ? e : P(e, `
`)
            }
        }
    }
    fences(n) {
        const t = this.rules.block.fences.exec(n);
        if (t) {
            const e = t[0]
              , s = ae(e, t[3] || "");
            return {
                type: "code",
                raw: e,
                lang: t[2] ? t[2].trim().replace(this.rules.inline._escapes, "$1") : t[2],
                text: s
            }
        }
    }
    heading(n) {
        const t = this.rules.block.heading.exec(n);
        if (t) {
            let e = t[2].trim();
            if (/#$/.test(e)) {
                const s = P(e, "#");
                (this.options.pedantic || !s || / $/.test(s)) && (e = s.trim())
            }
            return {
                type: "heading",
                raw: t[0],
                depth: t[1].length,
                text: e,
                tokens: this.lexer.inline(e)
            }
        }
    }
    hr(n) {
        const t = this.rules.block.hr.exec(n);
        if (t)
            return {
                type: "hr",
                raw: t[0]
            }
    }
    blockquote(n) {
        const t = this.rules.block.blockquote.exec(n);
        if (t) {
            const e = t[0].replace(/^ *>[ \t]?/gm, "")
              , s = this.lexer.state.top;
            this.lexer.state.top = !0;
            const i = this.lexer.blockTokens(e);
            return this.lexer.state.top = s,
            {
                type: "blockquote",
                raw: t[0],
                tokens: i,
                text: e
            }
        }
    }
    list(n) {
        let t = this.rules.block.list.exec(n);
        if (t) {
            let e = t[1].trim();
            const s = e.length > 1
              , i = {
                type: "list",
                raw: "",
                ordered: s,
                start: s ? +e.slice(0, -1) : "",
                loose: !1,
                items: []
            };
            e = s ? `\\d{1,9}\\${e.slice(-1)}` : `\\${e}`,
            this.options.pedantic && (e = s ? e : "[*+-]");
            const r = new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`);
            let l = ""
              , o = ""
              , f = !1;
            for (; n; ) {
                let h = !1;
                if (!(t = r.exec(n)) || this.rules.block.hr.test(n))
                    break;
                l = t[0],
                n = n.substring(l.length);
                let g = t[2].split(`
`, 1)[0].replace(/^\t+/, q => " ".repeat(3 * q.length))
                  , u = n.split(`
`, 1)[0]
                  , m = 0;
                this.options.pedantic ? (m = 2,
                o = g.trimStart()) : (m = t[2].search(/[^ ]/),
                m = m > 4 ? 1 : m,
                o = g.slice(m),
                m += t[1].length);
                let y = !1;
                if (!g && /^ *$/.test(u) && (l += u + `
`,
                n = n.substring(u.length + 1),
                h = !0),
                !h) {
                    const q = new RegExp(`^ {0,${Math.min(3, m - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)
                      , j = new RegExp(`^ {0,${Math.min(3, m - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)
                      , O = new RegExp(`^ {0,${Math.min(3, m - 1)}}(?:\`\`\`|~~~)`)
                      , U = new RegExp(`^ {0,${Math.min(3, m - 1)}}#`);
                    for (; n; ) {
                        const B = n.split(`
`, 1)[0];
                        if (u = B,
                        this.options.pedantic && (u = u.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
                        O.test(u) || U.test(u) || q.test(u) || j.test(n))
                            break;
                        if (u.search(/[^ ]/) >= m || !u.trim())
                            o += `
` + u.slice(m);
                        else {
                            if (y || g.search(/[^ ]/) >= 4 || O.test(g) || U.test(g) || j.test(g))
                                break;
                            o += `
` + u
                        }
                        !y && !u.trim() && (y = !0),
                        l += B + `
`,
                        n = n.substring(B.length + 1),
                        g = u.slice(m)
                    }
                }
                i.loose || (f ? i.loose = !0 : /\n *\n *$/.test(l) && (f = !0));
                let $ = null, T;
                this.options.gfm && ($ = /^\[[ xX]\] /.exec(o),
                $ && (T = $[0] !== "[ ] ",
                o = o.replace(/^\[[ xX]\] +/, ""))),
                i.items.push({
                    type: "list_item",
                    raw: l,
                    task: !!$,
                    checked: T,
                    loose: !1,
                    text: o,
                    tokens: []
                }),
                i.raw += l
            }
            i.items[i.items.length - 1].raw = l.trimEnd(),
            i.items[i.items.length - 1].text = o.trimEnd(),
            i.raw = i.raw.trimEnd();
            for (let h = 0; h < i.items.length; h++)
                if (this.lexer.state.top = !1,
                i.items[h].tokens = this.lexer.blockTokens(i.items[h].text, []),
                !i.loose) {
                    const g = i.items[h].tokens.filter(m => m.type === "space")
                      , u = g.length > 0 && g.some(m => /\n.*\n/.test(m.raw));
                    i.loose = u
                }
            if (i.loose)
                for (let h = 0; h < i.items.length; h++)
                    i.items[h].loose = !0;
            return i
        }
    }
    html(n) {
        const t = this.rules.block.html.exec(n);
        if (t)
            return {
                type: "html",
                block: !0,
                raw: t[0],
                pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
                text: t[0]
            }
    }
    def(n) {
        const t = this.rules.block.def.exec(n);
        if (t) {
            const e = t[1].toLowerCase().replace(/\s+/g, " ")
              , s = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : ""
              , i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline._escapes, "$1") : t[3];
            return {
                type: "def",
                tag: e,
                raw: t[0],
                href: s,
                title: i
            }
        }
    }
    table(n) {
        const t = this.rules.block.table.exec(n);
        if (t) {
            if (!/[:|]/.test(t[2]))
                return;
            const e = {
                type: "table",
                raw: t[0],
                header: F(t[1]).map(s => ({
                    text: s,
                    tokens: []
                })),
                align: t[2].replace(/^\||\| *$/g, "").split("|"),
                rows: t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : []
            };
            if (e.header.length === e.align.length) {
                let s = e.align.length, i, r, l, o;
                for (i = 0; i < s; i++) {
                    const f = e.align[i];
                    f && (/^ *-+: *$/.test(f) ? e.align[i] = "right" : /^ *:-+: *$/.test(f) ? e.align[i] = "center" : /^ *:-+ *$/.test(f) ? e.align[i] = "left" : e.align[i] = null)
                }
                for (s = e.rows.length,
                i = 0; i < s; i++)
                    e.rows[i] = F(e.rows[i], e.header.length).map(f => ({
                        text: f,
                        tokens: []
                    }));
                for (s = e.header.length,
                r = 0; r < s; r++)
                    e.header[r].tokens = this.lexer.inline(e.header[r].text);
                for (s = e.rows.length,
                r = 0; r < s; r++)
                    for (o = e.rows[r],
                    l = 0; l < o.length; l++)
                        o[l].tokens = this.lexer.inline(o[l].text);
                return e
            }
        }
    }
    lheading(n) {
        const t = this.rules.block.lheading.exec(n);
        if (t)
            return {
                type: "heading",
                raw: t[0],
                depth: t[2].charAt(0) === "=" ? 1 : 2,
                text: t[1],
                tokens: this.lexer.inline(t[1])
            }
    }
    paragraph(n) {
        const t = this.rules.block.paragraph.exec(n);
        if (t) {
            const e = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
            return {
                type: "paragraph",
                raw: t[0],
                text: e,
                tokens: this.lexer.inline(e)
            }
        }
    }
    text(n) {
        const t = this.rules.block.text.exec(n);
        if (t)
            return {
                type: "text",
                raw: t[0],
                text: t[0],
                tokens: this.lexer.inline(t[0])
            }
    }
    escape(n) {
        const t = this.rules.inline.escape.exec(n);
        if (t)
            return {
                type: "escape",
                raw: t[0],
                text: b(t[1])
            }
    }
    tag(n) {
        const t = this.rules.inline.tag.exec(n);
        if (t)
            return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1),
            !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1),
            {
                type: "html",
                raw: t[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: !1,
                text: t[0]
            }
    }
    link(n) {
        const t = this.rules.inline.link.exec(n);
        if (t) {
            const e = t[2].trim();
            if (!this.options.pedantic && /^</.test(e)) {
                if (!/>$/.test(e))
                    return;
                const r = P(e.slice(0, -1), "\\");
                if ((e.length - r.length) % 2 === 0)
                    return
            } else {
                const r = oe(t[2], "()");
                if (r > -1) {
                    const o = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + r;
                    t[2] = t[2].substring(0, r),
                    t[0] = t[0].substring(0, o).trim(),
                    t[3] = ""
                }
            }
            let s = t[2]
              , i = "";
            if (this.options.pedantic) {
                const r = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);
                r && (s = r[1],
                i = r[3])
            } else
                i = t[3] ? t[3].slice(1, -1) : "";
            return s = s.trim(),
            /^</.test(s) && (this.options.pedantic && !/>$/.test(e) ? s = s.slice(1) : s = s.slice(1, -1)),
            K(t, {
                href: s && s.replace(this.rules.inline._escapes, "$1"),
                title: i && i.replace(this.rules.inline._escapes, "$1")
            }, t[0], this.lexer)
        }
    }
    reflink(n, t) {
        let e;
        if ((e = this.rules.inline.reflink.exec(n)) || (e = this.rules.inline.nolink.exec(n))) {
            let s = (e[2] || e[1]).replace(/\s+/g, " ");
            if (s = t[s.toLowerCase()],
            !s) {
                const i = e[0].charAt(0);
                return {
                    type: "text",
                    raw: i,
                    text: i
                }
            }
            return K(e, s, e[0], this.lexer)
        }
    }
    emStrong(n, t, e="") {
        let s = this.rules.inline.emStrong.lDelim.exec(n);
        if (!s || s[3] && e.match(/[\p{L}\p{N}]/u))
            return;
        if (!(s[1] || s[2] || "") || !e || this.rules.inline.punctuation.exec(e)) {
            const r = [...s[0]].length - 1;
            let l, o, f = r, h = 0;
            const g = s[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
            for (g.lastIndex = 0,
            t = t.slice(-1 * n.length + s[0].length - 1); (s = g.exec(t)) != null; ) {
                if (l = s[1] || s[2] || s[3] || s[4] || s[5] || s[6],
                !l)
                    continue;
                if (o = [...l].length,
                s[3] || s[4]) {
                    f += o;
                    continue
                } else if ((s[5] || s[6]) && r % 3 && !((r + o) % 3)) {
                    h += o;
                    continue
                }
                if (f -= o,
                f > 0)
                    continue;
                o = Math.min(o, o + f + h);
                const u = [...n].slice(0, r + s.index + o + 1).join("");
                if (Math.min(r, o) % 2) {
                    const y = u.slice(1, -1);
                    return {
                        type: "em",
                        raw: u,
                        text: y,
                        tokens: this.lexer.inlineTokens(y)
                    }
                }
                const m = u.slice(2, -2);
                return {
                    type: "strong",
                    raw: u,
                    text: m,
                    tokens: this.lexer.inlineTokens(m)
                }
            }
        }
    }
    codespan(n) {
        const t = this.rules.inline.code.exec(n);
        if (t) {
            let e = t[2].replace(/\n/g, " ");
            const s = /[^ ]/.test(e)
              , i = /^ /.test(e) && / $/.test(e);
            return s && i && (e = e.substring(1, e.length - 1)),
            e = b(e, !0),
            {
                type: "codespan",
                raw: t[0],
                text: e
            }
        }
    }
    br(n) {
        const t = this.rules.inline.br.exec(n);
        if (t)
            return {
                type: "br",
                raw: t[0]
            }
    }
    del(n) {
        const t = this.rules.inline.del.exec(n);
        if (t)
            return {
                type: "del",
                raw: t[0],
                text: t[2],
                tokens: this.lexer.inlineTokens(t[2])
            }
    }
    autolink(n) {
        const t = this.rules.inline.autolink.exec(n);
        if (t) {
            let e, s;
            return t[2] === "@" ? (e = b(t[1]),
            s = "mailto:" + e) : (e = b(t[1]),
            s = e),
            {
                type: "link",
                raw: t[0],
                text: e,
                href: s,
                tokens: [{
                    type: "text",
                    raw: e,
                    text: e
                }]
            }
        }
    }
    url(n) {
        let t;
        if (t = this.rules.inline.url.exec(n)) {
            let e, s;
            if (t[2] === "@")
                e = b(t[0]),
                s = "mailto:" + e;
            else {
                let i;
                do
                    i = t[0],
                    t[0] = this.rules.inline._backpedal.exec(t[0])[0];
                while (i !== t[0]);
                e = b(t[0]),
                t[1] === "www." ? s = "http://" + t[0] : s = t[0]
            }
            return {
                type: "link",
                raw: t[0],
                text: e,
                href: s,
                tokens: [{
                    type: "text",
                    raw: e,
                    text: e
                }]
            }
        }
    }
    inlineText(n) {
        const t = this.rules.inline.text.exec(n);
        if (t) {
            let e;
            return this.lexer.state.inRawBlock ? e = t[0] : e = b(t[0]),
            {
                type: "text",
                raw: t[0],
                text: e
            }
        }
    }
}
const p = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
    html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: E,
    lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
};
p._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
p._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
p.def = k(p.def).replace("label", p._label).replace("title", p._title).getRegex();
p.bullet = /(?:[*+-]|\d{1,9}[.)])/;
p.listItemStart = k(/^( *)(bull) */).replace("bull", p.bullet).getRegex();
p.list = k(p.list).replace(/bull/g, p.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + p.def.source + ")").getRegex();
p._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
p._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
p.html = k(p.html, "i").replace("comment", p._comment).replace("tag", p._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
p.lheading = k(p.lheading).replace(/bull/g, p.bullet).getRegex();
p.paragraph = k(p._paragraph).replace("hr", p.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", p._tag).getRegex();
p.blockquote = k(p.blockquote).replace("paragraph", p.paragraph).getRegex();
p.normal = {
    ...p
};
p.gfm = {
    ...p.normal,
    table: "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
};
p.gfm.table = k(p.gfm.table).replace("hr", p.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", p._tag).getRegex();
p.gfm.paragraph = k(p._paragraph).replace("hr", p.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", p.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", p._tag).getRegex();
p.pedantic = {
    ...p.normal,
    html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", p._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: E,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: k(p.normal._paragraph).replace("hr", p.hr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", p.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
const a = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: E,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    emStrong: {
        lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
        rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
        rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: E,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^((?![*_])[\spunctuation])/
};
a._punctuation = "\\p{P}$+<=>`^|~";
a.punctuation = k(a.punctuation, "u").replace(/punctuation/g, a._punctuation).getRegex();
a.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
a.anyPunctuation = /\\[punct]/g;
a._escapes = /\\([punct])/g;
a._comment = k(p._comment).replace("(?:-->|$)", "-->").getRegex();
a.emStrong.lDelim = k(a.emStrong.lDelim, "u").replace(/punct/g, a._punctuation).getRegex();
a.emStrong.rDelimAst = k(a.emStrong.rDelimAst, "gu").replace(/punct/g, a._punctuation).getRegex();
a.emStrong.rDelimUnd = k(a.emStrong.rDelimUnd, "gu").replace(/punct/g, a._punctuation).getRegex();
a.anyPunctuation = k(a.anyPunctuation, "gu").replace(/punct/g, a._punctuation).getRegex();
a._escapes = k(a._escapes, "gu").replace(/punct/g, a._punctuation).getRegex();
a._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
a._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
a.autolink = k(a.autolink).replace("scheme", a._scheme).replace("email", a._email).getRegex();
a._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
a.tag = k(a.tag).replace("comment", a._comment).replace("attribute", a._attribute).getRegex();
a._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
a._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
a._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
a.link = k(a.link).replace("label", a._label).replace("href", a._href).replace("title", a._title).getRegex();
a.reflink = k(a.reflink).replace("label", a._label).replace("ref", p._label).getRegex();
a.nolink = k(a.nolink).replace("ref", p._label).getRegex();
a.reflinkSearch = k(a.reflinkSearch, "g").replace("reflink", a.reflink).replace("nolink", a.nolink).getRegex();
a.normal = {
    ...a
};
a.pedantic = {
    ...a.normal,
    strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
    },
    em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
    },
    link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", a._label).getRegex(),
    reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", a._label).getRegex()
};
a.gfm = {
    ...a.normal,
    escape: k(a.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
a.gfm.url = k(a.gfm.url, "i").replace("email", a.gfm._extended_email).getRegex();
a.breaks = {
    ...a.gfm,
    br: k(a.br).replace("{2,}", "*").getRegex(),
    text: k(a.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
class w {
    constructor(n) {
        x(this, "tokens");
        x(this, "options");
        x(this, "state");
        x(this, "tokenizer");
        x(this, "inlineQueue");
        this.tokens = [],
        this.tokens.links = Object.create(null),
        this.options = n || R,
        this.options.tokenizer = this.options.tokenizer || new L,
        this.tokenizer = this.options.tokenizer,
        this.tokenizer.options = this.options,
        this.tokenizer.lexer = this,
        this.inlineQueue = [],
        this.state = {
            inLink: !1,
            inRawBlock: !1,
            top: !0
        };
        const t = {
            block: p.normal,
            inline: a.normal
        };
        this.options.pedantic ? (t.block = p.pedantic,
        t.inline = a.pedantic) : this.options.gfm && (t.block = p.gfm,
        this.options.breaks ? t.inline = a.breaks : t.inline = a.gfm),
        this.tokenizer.rules = t
    }
    static get rules() {
        return {
            block: p,
            inline: a
        }
    }
    static lex(n, t) {
        return new w(t).lex(n)
    }
    static lexInline(n, t) {
        return new w(t).inlineTokens(n)
    }
    lex(n) {
        n = n.replace(/\r\n|\r/g, `
`),
        this.blockTokens(n, this.tokens);
        let t;
        for (; t = this.inlineQueue.shift(); )
            this.inlineTokens(t.src, t.tokens);
        return this.tokens
    }
    blockTokens(n, t=[]) {
        this.options.pedantic ? n = n.replace(/\t/g, "    ").replace(/^ +$/gm, "") : n = n.replace(/^( *)(\t+)/gm, (l, o, f) => o + "    ".repeat(f.length));
        let e, s, i, r;
        for (; n; )
            if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(l => (e = l.call({
                lexer: this
            }, n, t)) ? (n = n.substring(e.raw.length),
            t.push(e),
            !0) : !1))) {
                if (e = this.tokenizer.space(n)) {
                    n = n.substring(e.raw.length),
                    e.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(e);
                    continue
                }
                if (e = this.tokenizer.code(n)) {
                    n = n.substring(e.raw.length),
                    s = t[t.length - 1],
                    s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + e.raw,
                    s.text += `
` + e.text,
                    this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(e);
                    continue
                }
                if (e = this.tokenizer.fences(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.heading(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.hr(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.blockquote(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.list(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.html(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.def(n)) {
                    n = n.substring(e.raw.length),
                    s = t[t.length - 1],
                    s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + e.raw,
                    s.text += `
` + e.raw,
                    this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : this.tokens.links[e.tag] || (this.tokens.links[e.tag] = {
                        href: e.href,
                        title: e.title
                    });
                    continue
                }
                if (e = this.tokenizer.table(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.lheading(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (i = n,
                this.options.extensions && this.options.extensions.startBlock) {
                    let l = 1 / 0;
                    const o = n.slice(1);
                    let f;
                    this.options.extensions.startBlock.forEach(h => {
                        f = h.call({
                            lexer: this
                        }, o),
                        typeof f == "number" && f >= 0 && (l = Math.min(l, f))
                    }
                    ),
                    l < 1 / 0 && l >= 0 && (i = n.substring(0, l + 1))
                }
                if (this.state.top && (e = this.tokenizer.paragraph(i))) {
                    s = t[t.length - 1],
                    r && s.type === "paragraph" ? (s.raw += `
` + e.raw,
                    s.text += `
` + e.text,
                    this.inlineQueue.pop(),
                    this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(e),
                    r = i.length !== n.length,
                    n = n.substring(e.raw.length);
                    continue
                }
                if (e = this.tokenizer.text(n)) {
                    n = n.substring(e.raw.length),
                    s = t[t.length - 1],
                    s && s.type === "text" ? (s.raw += `
` + e.raw,
                    s.text += `
` + e.text,
                    this.inlineQueue.pop(),
                    this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(e);
                    continue
                }
                if (n) {
                    const l = "Infinite loop on byte: " + n.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(l);
                        break
                    } else
                        throw new Error(l)
                }
            }
        return this.state.top = !0,
        t
    }
    inline(n, t=[]) {
        return this.inlineQueue.push({
            src: n,
            tokens: t
        }),
        t
    }
    inlineTokens(n, t=[]) {
        let e, s, i, r = n, l, o, f;
        if (this.tokens.links) {
            const h = Object.keys(this.tokens.links);
            if (h.length > 0)
                for (; (l = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; )
                    h.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
        }
        for (; (l = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; )
            r = r.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; )
            r = r.slice(0, l.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        for (; n; )
            if (o || (f = ""),
            o = !1,
            !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(h => (e = h.call({
                lexer: this
            }, n, t)) ? (n = n.substring(e.raw.length),
            t.push(e),
            !0) : !1))) {
                if (e = this.tokenizer.escape(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.tag(n)) {
                    n = n.substring(e.raw.length),
                    s = t[t.length - 1],
                    s && e.type === "text" && s.type === "text" ? (s.raw += e.raw,
                    s.text += e.text) : t.push(e);
                    continue
                }
                if (e = this.tokenizer.link(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.reflink(n, this.tokens.links)) {
                    n = n.substring(e.raw.length),
                    s = t[t.length - 1],
                    s && e.type === "text" && s.type === "text" ? (s.raw += e.raw,
                    s.text += e.text) : t.push(e);
                    continue
                }
                if (e = this.tokenizer.emStrong(n, r, f)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.codespan(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.br(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.del(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (e = this.tokenizer.autolink(n)) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (!this.state.inLink && (e = this.tokenizer.url(n))) {
                    n = n.substring(e.raw.length),
                    t.push(e);
                    continue
                }
                if (i = n,
                this.options.extensions && this.options.extensions.startInline) {
                    let h = 1 / 0;
                    const g = n.slice(1);
                    let u;
                    this.options.extensions.startInline.forEach(m => {
                        u = m.call({
                            lexer: this
                        }, g),
                        typeof u == "number" && u >= 0 && (h = Math.min(h, u))
                    }
                    ),
                    h < 1 / 0 && h >= 0 && (i = n.substring(0, h + 1))
                }
                if (e = this.tokenizer.inlineText(i)) {
                    n = n.substring(e.raw.length),
                    e.raw.slice(-1) !== "_" && (f = e.raw.slice(-1)),
                    o = !0,
                    s = t[t.length - 1],
                    s && s.type === "text" ? (s.raw += e.raw,
                    s.text += e.text) : t.push(e);
                    continue
                }
                if (n) {
                    const h = "Infinite loop on byte: " + n.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(h);
                        break
                    } else
                        throw new Error(h)
                }
            }
        return t
    }
}
class C {
    constructor(n) {
        x(this, "options");
        this.options = n || R
    }
    code(n, t, e) {
        var i;
        const s = (i = (t || "").match(/^\S*/)) == null ? void 0 : i[0];
        return n = n.replace(/\n$/, "") + `
`,
        s ? '<pre><code class="language-' + b(s) + '">' + (e ? n : b(n, !0)) + `</code></pre>
` : "<pre><code>" + (e ? n : b(n, !0)) + `</code></pre>
`
    }
    blockquote(n) {
        return `<blockquote>
${n}</blockquote>
`
    }
    html(n, t) {
        return n
    }
    heading(n, t, e) {
        return `<h${t}>${n}</h${t}>
`
    }
    hr() {
        return `<hr>
`
    }
    list(n, t, e) {
        const s = t ? "ol" : "ul"
          , i = t && e !== 1 ? ' start="' + e + '"' : "";
        return "<" + s + i + `>
` + n + "</" + s + `>
`
    }
    listitem(n, t, e) {
        return `<li>${n}</li>
`
    }
    checkbox(n) {
        return "<input " + (n ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    }
    paragraph(n) {
        return `<p>${n}</p>
`
    }
    table(n, t) {
        return t && (t = `<tbody>${t}</tbody>`),
        `<table>
<thead>
` + n + `</thead>
` + t + `</table>
`
    }
    tablerow(n) {
        return `<tr>
${n}</tr>
`
    }
    tablecell(n, t) {
        const e = t.header ? "th" : "td";
        return (t.align ? `<${e} align="${t.align}">` : `<${e}>`) + n + `</${e}>
`
    }
    strong(n) {
        return `<strong>${n}</strong>`
    }
    em(n) {
        return `<em>${n}</em>`
    }
    codespan(n) {
        return `<code>${n}</code>`
    }
    br() {
        return "<br>"
    }
    del(n) {
        return `<del>${n}</del>`
    }
    link(n, t, e) {
        const s = N(n);
        if (s === null)
            return e;
        n = s;
        let i = '<a href="' + n + '"';
        return t && (i += ' title="' + t + '"'),
        i += ">" + e + "</a>",
        i
    }
    image(n, t, e) {
        const s = N(n);
        if (s === null)
            return e;
        n = s;
        let i = `<img src="${n}" alt="${e}"`;
        return t && (i += ` title="${t}"`),
        i += ">",
        i
    }
    text(n) {
        return n
    }
}
class Q {
    strong(n) {
        return n
    }
    em(n) {
        return n
    }
    codespan(n) {
        return n
    }
    del(n) {
        return n
    }
    html(n) {
        return n
    }
    text(n) {
        return n
    }
    link(n, t, e) {
        return "" + e
    }
    image(n, t, e) {
        return "" + e
    }
    br() {
        return ""
    }
}
class _ {
    constructor(n) {
        x(this, "options");
        x(this, "renderer");
        x(this, "textRenderer");
        this.options = n || R,
        this.options.renderer = this.options.renderer || new C,
        this.renderer = this.options.renderer,
        this.renderer.options = this.options,
        this.textRenderer = new Q
    }
    static parse(n, t) {
        return new _(t).parse(n)
    }
    static parseInline(n, t) {
        return new _(t).parseInline(n)
    }
    parse(n, t=!0) {
        let e = "";
        for (let s = 0; s < n.length; s++) {
            const i = n[s];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
                const r = i
                  , l = this.options.extensions.renderers[r.type].call({
                    parser: this
                }, r);
                if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(r.type)) {
                    e += l || "";
                    continue
                }
            }
            switch (i.type) {
            case "space":
                continue;
            case "hr":
                {
                    e += this.renderer.hr();
                    continue
                }
            case "heading":
                {
                    const r = i;
                    e += this.renderer.heading(this.parseInline(r.tokens), r.depth, re(this.parseInline(r.tokens, this.textRenderer)));
                    continue
                }
            case "code":
                {
                    const r = i;
                    e += this.renderer.code(r.text, r.lang, !!r.escaped);
                    continue
                }
            case "table":
                {
                    const r = i;
                    let l = ""
                      , o = "";
                    for (let h = 0; h < r.header.length; h++)
                        o += this.renderer.tablecell(this.parseInline(r.header[h].tokens), {
                            header: !0,
                            align: r.align[h]
                        });
                    l += this.renderer.tablerow(o);
                    let f = "";
                    for (let h = 0; h < r.rows.length; h++) {
                        const g = r.rows[h];
                        o = "";
                        for (let u = 0; u < g.length; u++)
                            o += this.renderer.tablecell(this.parseInline(g[u].tokens), {
                                header: !1,
                                align: r.align[u]
                            });
                        f += this.renderer.tablerow(o)
                    }
                    e += this.renderer.table(l, f);
                    continue
                }
            case "blockquote":
                {
                    const r = i
                      , l = this.parse(r.tokens);
                    e += this.renderer.blockquote(l);
                    continue
                }
            case "list":
                {
                    const r = i
                      , l = r.ordered
                      , o = r.start
                      , f = r.loose;
                    let h = "";
                    for (let g = 0; g < r.items.length; g++) {
                        const u = r.items[g]
                          , m = u.checked
                          , y = u.task;
                        let $ = "";
                        if (u.task) {
                            const T = this.renderer.checkbox(!!m);
                            f ? u.tokens.length > 0 && u.tokens[0].type === "paragraph" ? (u.tokens[0].text = T + " " + u.tokens[0].text,
                            u.tokens[0].tokens && u.tokens[0].tokens.length > 0 && u.tokens[0].tokens[0].type === "text" && (u.tokens[0].tokens[0].text = T + " " + u.tokens[0].tokens[0].text)) : u.tokens.unshift({
                                type: "text",
                                text: T + " "
                            }) : $ += T + " "
                        }
                        $ += this.parse(u.tokens, f),
                        h += this.renderer.listitem($, y, !!m)
                    }
                    e += this.renderer.list(h, l, o);
                    continue
                }
            case "html":
                {
                    const r = i;
                    e += this.renderer.html(r.text, r.block);
                    continue
                }
            case "paragraph":
                {
                    const r = i;
                    e += this.renderer.paragraph(this.parseInline(r.tokens));
                    continue
                }
            case "text":
                {
                    let r = i
                      , l = r.tokens ? this.parseInline(r.tokens) : r.text;
                    for (; s + 1 < n.length && n[s + 1].type === "text"; )
                        r = n[++s],
                        l += `
` + (r.tokens ? this.parseInline(r.tokens) : r.text);
                    e += t ? this.renderer.paragraph(l) : l;
                    continue
                }
            default:
                {
                    const r = 'Token with "' + i.type + '" type was not found.';
                    if (this.options.silent)
                        return console.error(r),
                        "";
                    throw new Error(r)
                }
            }
        }
        return e
    }
    parseInline(n, t) {
        t = t || this.renderer;
        let e = "";
        for (let s = 0; s < n.length; s++) {
            const i = n[s];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
                const r = this.options.extensions.renderers[i.type].call({
                    parser: this
                }, i);
                if (r !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
                    e += r || "";
                    continue
                }
            }
            switch (i.type) {
            case "escape":
                {
                    const r = i;
                    e += t.text(r.text);
                    break
                }
            case "html":
                {
                    const r = i;
                    e += t.html(r.text);
                    break
                }
            case "link":
                {
                    const r = i;
                    e += t.link(r.href, r.title, this.parseInline(r.tokens, t));
                    break
                }
            case "image":
                {
                    const r = i;
                    e += t.image(r.href, r.title, r.text);
                    break
                }
            case "strong":
                {
                    const r = i;
                    e += t.strong(this.parseInline(r.tokens, t));
                    break
                }
            case "em":
                {
                    const r = i;
                    e += t.em(this.parseInline(r.tokens, t));
                    break
                }
            case "codespan":
                {
                    const r = i;
                    e += t.codespan(r.text);
                    break
                }
            case "br":
                {
                    e += t.br();
                    break
                }
            case "del":
                {
                    const r = i;
                    e += t.del(this.parseInline(r.tokens, t));
                    break
                }
            case "text":
                {
                    const r = i;
                    e += t.text(r.text);
                    break
                }
            default:
                {
                    const r = 'Token with "' + i.type + '" type was not found.';
                    if (this.options.silent)
                        return console.error(r),
                        "";
                    throw new Error(r)
                }
            }
        }
        return e
    }
}
class S {
    constructor(n) {
        x(this, "options");
        this.options = n || R
    }
    preprocess(n) {
        return n
    }
    postprocess(n) {
        return n
    }
}
x(S, "passThroughHooks", new Set(["preprocess", "postprocess"]));
var I, M, Z, J;
class ce {
    constructor(...n) {
        D(this, I);
        D(this, Z);
        x(this, "defaults", v());
        x(this, "options", this.setOptions);
        x(this, "parse", A(this, I, M).call(this, w.lex, _.parse));
        x(this, "parseInline", A(this, I, M).call(this, w.lexInline, _.parseInline));
        x(this, "Parser", _);
        x(this, "parser", _.parse);
        x(this, "Renderer", C);
        x(this, "TextRenderer", Q);
        x(this, "Lexer", w);
        x(this, "lexer", w.lex);
        x(this, "Tokenizer", L);
        x(this, "Hooks", S);
        this.use(...n)
    }
    walkTokens(n, t) {
        var s, i;
        let e = [];
        for (const r of n)
            switch (e = e.concat(t.call(this, r)),
            r.type) {
            case "table":
                {
                    const l = r;
                    for (const o of l.header)
                        e = e.concat(this.walkTokens(o.tokens, t));
                    for (const o of l.rows)
                        for (const f of o)
                            e = e.concat(this.walkTokens(f.tokens, t));
                    break
                }
            case "list":
                {
                    const l = r;
                    e = e.concat(this.walkTokens(l.items, t));
                    break
                }
            default:
                {
                    const l = r;
                    (i = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && i[l.type] ? this.defaults.extensions.childTokens[l.type].forEach(o => {
                        e = e.concat(this.walkTokens(l[o], t))
                    }
                    ) : l.tokens && (e = e.concat(this.walkTokens(l.tokens, t)))
                }
            }
        return e
    }
    use(...n) {
        const t = this.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        return n.forEach(e => {
            const s = {
                ...e
            };
            if (s.async = this.defaults.async || s.async || !1,
            e.extensions && (e.extensions.forEach(i => {
                if (!i.name)
                    throw new Error("extension name required");
                if ("renderer"in i) {
                    const r = t.renderers[i.name];
                    r ? t.renderers[i.name] = function(...l) {
                        let o = i.renderer.apply(this, l);
                        return o === !1 && (o = r.apply(this, l)),
                        o
                    }
                    : t.renderers[i.name] = i.renderer
                }
                if ("tokenizer"in i) {
                    if (!i.level || i.level !== "block" && i.level !== "inline")
                        throw new Error("extension level must be 'block' or 'inline'");
                    const r = t[i.level];
                    r ? r.unshift(i.tokenizer) : t[i.level] = [i.tokenizer],
                    i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]))
                }
                "childTokens"in i && i.childTokens && (t.childTokens[i.name] = i.childTokens)
            }
            ),
            s.extensions = t),
            e.renderer) {
                const i = this.defaults.renderer || new C(this.defaults);
                for (const r in e.renderer) {
                    const l = e.renderer[r]
                      , o = r
                      , f = i[o];
                    i[o] = (...h) => {
                        let g = l.apply(i, h);
                        return g === !1 && (g = f.apply(i, h)),
                        g || ""
                    }
                }
                s.renderer = i
            }
            if (e.tokenizer) {
                const i = this.defaults.tokenizer || new L(this.defaults);
                for (const r in e.tokenizer) {
                    const l = e.tokenizer[r]
                      , o = r
                      , f = i[o];
                    i[o] = (...h) => {
                        let g = l.apply(i, h);
                        return g === !1 && (g = f.apply(i, h)),
                        g
                    }
                }
                s.tokenizer = i
            }
            if (e.hooks) {
                const i = this.defaults.hooks || new S;
                for (const r in e.hooks) {
                    const l = e.hooks[r]
                      , o = r
                      , f = i[o];
                    S.passThroughHooks.has(r) ? i[o] = h => {
                        if (this.defaults.async)
                            return Promise.resolve(l.call(i, h)).then(u => f.call(i, u));
                        const g = l.call(i, h);
                        return f.call(i, g)
                    }
                    : i[o] = (...h) => {
                        let g = l.apply(i, h);
                        return g === !1 && (g = f.apply(i, h)),
                        g
                    }
                }
                s.hooks = i
            }
            if (e.walkTokens) {
                const i = this.defaults.walkTokens
                  , r = e.walkTokens;
                s.walkTokens = function(l) {
                    let o = [];
                    return o.push(r.call(this, l)),
                    i && (o = o.concat(i.call(this, l))),
                    o
                }
            }
            this.defaults = {
                ...this.defaults,
                ...s
            }
        }
        ),
        this
    }
    setOptions(n) {
        return this.defaults = {
            ...this.defaults,
            ...n
        },
        this
    }
}
I = new WeakSet,
M = function(n, t) {
    return (e, s) => {
        const i = {
            ...s
        }
          , r = {
            ...this.defaults,
            ...i
        };
        this.defaults.async === !0 && i.async === !1 && (r.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),
        r.async = !0);
        const l = A(this, Z, J).call(this, !!r.silent, !!r.async);
        if (typeof e > "u" || e === null)
            return l(new Error("marked(): input parameter is undefined or null"));
        if (typeof e != "string")
            return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
        if (r.hooks && (r.hooks.options = r),
        r.async)
            return Promise.resolve(r.hooks ? r.hooks.preprocess(e) : e).then(o => n(o, r)).then(o => r.walkTokens ? Promise.all(this.walkTokens(o, r.walkTokens)).then( () => o) : o).then(o => t(o, r)).then(o => r.hooks ? r.hooks.postprocess(o) : o).catch(l);
        try {
            r.hooks && (e = r.hooks.preprocess(e));
            const o = n(e, r);
            r.walkTokens && this.walkTokens(o, r.walkTokens);
            let f = t(o, r);
            return r.hooks && (f = r.hooks.postprocess(f)),
            f
        } catch (o) {
            return l(o)
        }
    }
}
,
Z = new WeakSet,
J = function(n, t) {
    return e => {
        if (e.message += `
Please report this to https://github.com/markedjs/marked.`,
        n) {
            const s = "<p>An error occurred:</p><pre>" + b(e.message + "", !0) + "</pre>";
            return t ? Promise.resolve(s) : s
        }
        if (t)
            return Promise.reject(e);
        throw e
    }
}
;
const z = new ce;
function d(c, n) {
    return z.parse(c, n)
}
d.options = d.setOptions = function(c) {
    return z.setOptions(c),
    d.defaults = z.defaults,
    X(d.defaults),
    d
}
;
d.getDefaults = v;
d.defaults = R;
d.use = function(...c) {
    return z.use(...c),
    d.defaults = z.defaults,
    X(d.defaults),
    d
}
;
d.walkTokens = function(c, n) {
    return z.walkTokens(c, n)
}
;
d.parseInline = z.parseInline;
d.Parser = _;
d.parser = _.parse;
d.Renderer = C;
d.TextRenderer = Q;
d.Lexer = w;
d.lexer = w.lex;
d.Tokenizer = L;
d.Hooks = S;
d.parse = d;
d.options;
d.setOptions;
d.use;
d.walkTokens;
d.parseInline;
_.parse;
w.lex;
export {d as m};
