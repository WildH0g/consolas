function b(e) {
  return Array.isArray(e) && Array.isArray(e == null ? void 0 : e[0]);
}
function y(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function O(e) {
  return Array.isArray(e) && e.every(y);
}
const d = {
  isTwoDimAr: b,
  isObject: y,
  isObjectArray: O
};
function p(e, n = {}) {
  let { addIndices: i } = n;
  i === void 0 && (i = !0);
  const l = !d.isTwoDimAr(e);
  l && (e = m(e, "table(TwoDimArray)"));
  const r = [...e[0]];
  if (!l && i) {
    i === "row-only" && e.shift(), e.forEach((s, u) => s.unshift(u + ""));
    let t;
    i === !0 && (t = new Array(e[0].length).fill().map((s, u) => u === 0 ? "(index)" : u - 1 + "")), i === "row-only" && (t = ["(index)", ...r]), e.unshift(t);
  }
  e = e.map((t) => t.map(j));
  const c = e.reduce((t, s) => {
    const u = s.map((f) => (f + "").length);
    return t.length ? t.map((f, a) => f < u[a] ? u[a] : f) : u;
  }, []);
  return e.reduce(
    (t, s, u) => {
      const f = s.map((a, h) => T(a, c[h]));
      return t.length && (t += `
`), u === 1 && (t += `|${f.map((a) => a.replace(/\|/g, "-")).join("|").replace(/[^|]/g, "-")}|
`.replace(/\|-/g, "| ").replace(/-\|/g, " |")), t + `|${f.join("|")}|`;
    },
    ""
  );
}
function T(e, n) {
  e += "";
  const i = 1, l = n - e.length - i + 2;
  return `${" ".repeat(i)}${e}${" ".repeat(l)}`;
}
function j(e) {
  if (typeof e != "object")
    return e;
  let n = JSON.stringify(e);
  return n.length > 25 && (n = n.substring(0, 21) + "..."), n;
}
function m(e, n) {
  return e = e + "", e.length > 25 && (e = e.slice(0, 21) + "..."), [
    ["Error", "Source", "Input"],
    ["Invalid argument", n, e]
  ];
}
function E(e) {
  if (!d.isObject(e))
    throw "This is not an object";
  const n = ["(index)", "Value"];
  let i = M(e, n).map(
    (r) => r.map((c) => c && c !== void 0 ? c : "")
  ).map((r) => {
    const c = n.length - r.length;
    for (let o = 0; o < c; o++)
      r.push("");
    return r;
  });
  const l = [n, ...i];
  return p(l, { addIndices: !1 });
}
function I(e) {
  return Array.isArray ? e.reduce((n, i, l) => (n[l] = i, n), {}) : e;
}
function g(e, n, i, l) {
  return e.forEach((r) => {
    n.indexOf(r[0]) === -1 && n.push(r[0]);
  }), e.reduce(
    (r, [c, o]) => {
      if (d.isObject(o))
        return g(Object.entries(o), n, i, !1);
      const t = n.findIndex((s) => s === c);
      return r[t] = o, [...r].map(
        (s) => s !== void 0 ? s : l ? "" : "{...}"
      );
    },
    [i, ""]
  );
}
function M(e, n) {
  return Object.entries(e).map(([r, c]) => {
    let o = !1;
    return Array.isArray(c) && (c = I(c), o = !0), d.isObject(c) ? g(Object.entries(c), n, r, o) : [r, c];
  });
}
function A(e) {
  if (!d.isObjectArray(e))
    throw "This is not an object array";
  const n = {};
  let i = -1;
  const l = [];
  let r = [];
  for (const o of e) {
    const t = Object.entries(o), s = new Array(t.length).fill("");
    t.forEach(([u, f]) => {
      u in n || (n[u] = ++i, l.push(u)), s[n[u]] = f;
    }), r.push(s);
  }
  r.forEach((o) => {
    for (let t = 0; t < o.length; t++)
      t in o || (o[t] = "");
  }), r.forEach((o) => {
    if (o.length === l.length)
      return;
    const t = l.length - o.length;
    for (let s = 0; s < t; s++)
      o.push("");
  });
  const c = [l, ...r];
  return p(c, { addIndices: "row-only" });
}
const L = (e) => e;
function x() {
  globalThis.require = globalThis.require || L;
}
x();
const P = function() {
  const e = /* @__PURE__ */ new WeakMap(), n = ["table"], i = ["log", "warn", "error"], l = /* @__PURE__ */ new WeakMap();
  class r {
    constructor() {
      return r.instance || (e.set(this, !1), l.set(this, []), i.forEach((t) => this[t] = console[t]), r.instance = this), r.instance;
    }
    /**
     * Polyfills the Console object.
     * @returns {ConsolAS}
     */
    polyfill() {
      return this.isPolyfilled ? this : (n.forEach((t) => {
        t in Object.getPrototypeOf(console) || (Object.getPrototypeOf(console)[t] = this[t].bind(this));
      }), e.set(this, !0), this);
    }
    /**
     * Indicates if the console object has been polyfilled.
     * @returns {boolean}
     */
    get isPolyfilled() {
      return e.get(this);
    }
    /**
     * Prints arrays and objects in markdown table format.
     * @param {TwoDimArray | object} ar
     * @returns {string} - The
     */
    table(t) {
      const s = {
        isTwoDimAr: p,
        isObject: E,
        isObjectArray: A
      }, u = Object.keys(s).reduce((a, h) => !a && d[h](t) ? s[h] : a, null);
      if (u === null)
        throw new Error("Cannot convert input to table");
      const f = c(u(t), this);
      return console.log(f), f;
    }
    // TODO: Implement the tree method
    /**
     *
     * @param {GoogleAppsScript.Drive.Folder} folder
     * @param {TreeOptions} options
     */
    tree(t, s) {
      console.log('⏳ Method "tree" not implemented yet');
    }
    // TODO: Implement the assert method
    assert() {
      console.log('⏳ Method "assert" not implemented yet');
    }
    // TODO: Implement the group methods
    group() {
      console.log('⏳ Method "group" not implemented yet');
    }
    // TODO: Implement the dir method
    dir() {
      console.log('⏳ Method "dir" not implemented yet');
    }
    // TODO: Implement the count method
    count() {
      console.log('⏳ Method "count" not implemented yet');
    }
    // TODO: Implement the countReset method
    countReset() {
      console.log('⏳ Method "countReset" not implemented yet');
    }
    // TODO: Implement the help method
    help() {
      console.log('⏳ Method "help" not implemented yet');
    }
  }
  r.instance = null;
  function c(o, t) {
    return l.get(t).push(o), o;
  }
  return r;
}();
export {
  P as ConsolAS
};
