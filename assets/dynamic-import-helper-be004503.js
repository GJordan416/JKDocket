const t = (r, n) => {
    const e = r[n];
    return e ? typeof e == "function" ? e() : Promise.resolve(e) : new Promise( (i, o) => {
        (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(o.bind(null, new Error("Unknown variable dynamic import: " + n)))
    }
    )
}
;
export {t as _};
