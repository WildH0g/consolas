function g(e) {
  return Array.isArray(e) && Array.isArray(e == null ? void 0 : e[0]);
}
function b(e) {
  return typeof e == "object" && !Array.isArray(e);
}
const f = {
  isTwoDimAr: g,
  isObject: b
};
function h(e, { addIndices: n = !0 } = {}) {
  const c = !f.isTwoDimAr(e);
  if (c && (e = T(e, "table(TwoDimArray)")), !c && n) {
    e.forEach((i, r) => i.unshift(r + ""));
    const t = new Array(e[0].length).fill().map((i, r) => r === 0 ? "(index)" : r - 1 + "");
    e.unshift(t);
  }
  e = e.map((t) => t.map(m));
  const l = e.reduce((t, i) => {
    const r = i.map((s) => (s + "").length);
    return t.length ? t.map((s, u) => s < r[u] ? r[u] : s) : r;
  }, []);
  return e.reduce((t, i, r) => {
    const s = i.map((u, a) => O(u, l[a]));
    return t.length && (t += `
`), r === 1 && (t += `|${s.map((u) => u.replace(/\|/g, "-")).join("|").replace(/[^|]/g, "-")}|
`.replace(/\|-/g, "| ").replace(/-\|/g, " |")), t + `|${s.join("|")}|`;
  }, "");
}
function O(e, n) {
  e += "";
  const c = 1, l = n - e.length - c + 2;
  return `${" ".repeat(c)}${e}${" ".repeat(l)}`;
}
function m(e) {
  if (typeof e != "object")
    return e;
  let n = JSON.stringify(e);
  return n.length > 25 && (n = n.substring(0, 21) + "..."), n;
}
function T(e, n) {
  return e = e + "", e.length > 25 && (e = e.slice(0, 21) + "..."), [
    ["Error", "Source", "Input"],
    ["Invalid argument", n, e]
  ];
}
function j(e) {
  if (!f.isObject(e))
    throw "This is not an object";
  const n = ["(index)", "Value"];
  let c = M(e, n).map(
    (o) => o.map((t) => t && t !== void 0 ? t : "")
  ).map((o) => {
    const t = n.length - o.length;
    for (let i = 0; i < t; i++)
      o.push("");
    return o;
  });
  const l = [n, ...c];
  return h(l, { addIndices: !1 });
}
function E(e) {
  return Array.isArray ? e.reduce((n, c, l) => (n[l] = c, n), {}) : e;
}
function y(e, n, c, l) {
  return e.forEach((o) => {
    n.indexOf(o[0]) === -1 && n.push(o[0]);
  }), e.reduce(
    (o, [t, i]) => {
      if (f.isObject(i))
        return y(Object.entries(i), n, c, !1);
      const r = n.findIndex((s) => s === t);
      return o[r] = i, [...o].map(
        (s) => s !== void 0 ? s : l ? "" : "{...}"
      );
    },
    [c, ""]
  );
}
function M(e, n) {
  return Object.entries(e).map(([o, t]) => {
    let i = !1;
    return Array.isArray(t) && (t = E(t), i = !0), f.isObject(t) ? y(Object.entries(t), n, o, i) : [o, t];
  });
}
const L = (e) => e;
function I() {
  globalThis.require = globalThis.require || L;
}
I();
const P = function() {
  const e = /* @__PURE__ */ new WeakMap(), n = ["table"], c = ["log", "warn", "error"], l = /* @__PURE__ */ new WeakMap();
  class o {
    constructor() {
      return o.instance || (e.set(this, !1), l.set(this, []), c.forEach((r) => this[r] = console[r]), o.instance = this), o.instance;
    }
    /**
     * Polyfills the Console object.
     * @returns {ConsolAS}
     */
    polyfill() {
      return this.isPolyfilled ? this : (n.forEach((r) => {
        r in Object.getPrototypeOf(console) || (Object.getPrototypeOf(console)[r] = this[r].bind(this));
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
    table(r) {
      const s = {
        isTwoDimAr: h,
        isObject: j
      }, u = Object.keys(s).reduce((d, p) => !d && f[p](r) ? s[p] : d, null);
      if (u === null)
        throw new Error("Cannot convert input to table");
      const a = t(u(r), this);
      return console.log(a), a;
    }
    // TODO: Implement the tree method
    /**
     *
     * @param {GoogleAppsScript.Drive.Folder} folder
     * @param {TreeOptions} options
     */
    tree(r, s) {
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
  o.instance = null;
  function t(i, r) {
    return l.get(r).push(i), i;
  }
  return o;
}();
export {
  P as ConsolAS
};
