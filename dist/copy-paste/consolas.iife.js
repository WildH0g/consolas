var ConsolAS = (function (d) {
    "use strict";
    function b(e) {
      return Array.isArray(e) && Array.isArray(e == null ? void 0 : e[0]);
    }
    function O(e) {
      return typeof e == "object" && !Array.isArray(e);
    }
    const f = { isTwoDimAr: b, isObject: O };
    function isArrayOfObjects(e) {
      return Array.isArray(e) && e.every(O);
    }
  
    function convertObjectsToTwoDimArray(data) {
      if (!data.length) return [];
      const headers = Object.keys(data[0]);
      const rows = data.map((obj) => headers.map((header) => obj[header]));
      rows.unshift(headers); // Add headers at the beginning
      return rows;
    }
  
    function p(e, { addIndices: n = !0 } = {}) {
      // Convert array of objects to two-dimensional array if necessary
      if (isArrayOfObjects(e)) {
        e = convertObjectsToTwoDimArray(e);
      }
  
      const c = !f.isTwoDimAr(e);
      if ((c && (e = j(e, "table(TwoDimArray)")), !c && n)) {
        e.forEach((i, r) => i.unshift(r + ""));
        const t = new Array(e[0].length).fill().map((i, r) => (r === 0 ? "(index)" : r - 1 + ""));
        e.unshift(t);
      }
      e = e.map((t) => t.map(T));
      const l = e.reduce((t, i) => {
        const r = i.map((s) => (s + "").length);
        return t.length ? t.map((s, u) => (s < r[u] ? r[u] : s)) : r;
      }, []);
      return e.reduce((t, i, r) => {
        const s = i.map((u, a) => m(u, l[a]));
        return (
          t.length &&
            (t += `
  `),
          r === 1 &&
            (t += `|${s
              .map((u) => u.replace(/\|/g, "-"))
              .join("|")
              .replace(/[^|]/g, "-")}|
  `
              .replace(/\|-/g, "| ")
              .replace(/-\|/g, " |")),
          t + `|${s.join("|")}|`
        );
      }, "");
    }
  
    function m(e, n) {
      e += "";
      const c = 1,
        l = n - e.length - c + 2;
      return `${" ".repeat(c)}${e}${" ".repeat(l)}`;
    }
    function T(e) {
      if (typeof e != "object") return e;
      let n = JSON.stringify(e);
      return n.length > 25 && (n = n.substring(0, 21) + "..."), n;
    }
    function j(e, n) {
      return (
        (e = e + ""),
        e.length > 25 && (e = e.slice(0, 21) + "..."),
        [
          ["Error", "Source", "Input"],
          ["Invalid argument", n, e],
        ]
      );
    }
    function M(e) {
      if (!f.isObject(e)) throw "This is not an object";
      const n = ["(index)", "Value"];
      let c = L(e, n)
        .map((o) => o.map((t) => (t && t !== void 0 ? t : "")))
        .map((o) => {
          const t = n.length - o.length;
          for (let i = 0; i < t; i++) o.push("");
          return o;
        });
      const l = [n, ...c];
      return p(l, { addIndices: !1 });
    }
    function E(e) {
      return Array.isArray ? e.reduce((n, c, l) => ((n[l] = c), n), {}) : e;
    }
    function h(e, n, c, l) {
      return (
        e.forEach((o) => {
          n.indexOf(o[0]) === -1 && n.push(o[0]);
        }),
        e.reduce(
          (o, [t, i]) => {
            if (f.isObject(i)) return h(Object.entries(i), n, c, !1);
            const r = n.findIndex((s) => s === t);
            return (o[r] = i), [...o].map((s) => (s !== void 0 ? s : l ? "" : "{...}"));
          },
          [c, ""]
        )
      );
    }
    function L(e, n) {
      return Object.entries(e).map(([o, t]) => {
        let i = !1;
        return Array.isArray(t) && ((t = E(t)), (i = !0)), f.isObject(t) ? h(Object.entries(t), n, o, i) : [o, t];
      });
    }
    const I = (e) => e;
    function A() {
      globalThis.require = globalThis.require || I;
    }
    A();
    const P = (function () {
      const e = new WeakMap(),
        n = ["table"],
        c = ["log", "warn", "error"],
        l = new WeakMap();
      class o {
        constructor() {
          return (
            o.instance ||
              (e.set(this, !1), l.set(this, []), c.forEach((r) => (this[r] = console[r])), (o.instance = this)),
            o.instance
          );
        }
        polyfill() {
          return this.isPolyfilled
            ? this
            : (n.forEach((r) => {
                r in Object.getPrototypeOf(console) || (Object.getPrototypeOf(console)[r] = this[r].bind(this));
              }),
              e.set(this, !0),
              this);
        }
        get isPolyfilled() {
          return e.get(this);
        }
        table(r) {
          // Check if the input is an array of objects and convert if necessary
          if (isArrayOfObjects(r)) {
            r = convertObjectsToTwoDimArray(r);
          }
  
          const s = { isTwoDimAr: p, isObject: M },
            u = Object.keys(s).reduce((y, g) => (!y && f[g](r) ? s[g] : y), null);
          if (u === null) throw new Error("Cannot convert input to table");
          const a = t(u(r), this);
          return console.log(a), a;
        }
  
        tree(r, s) {
          console.log('⏳ Method "tree" not implemented yet');
        }
        assert() {
          console.log('⏳ Method "assert" not implemented yet');
        }
        group() {
          console.log('⏳ Method "group" not implemented yet');
        }
        dir() {
          console.log('⏳ Method "dir" not implemented yet');
        }
        count() {
          console.log('⏳ Method "count" not implemented yet');
        }
        countReset() {
          console.log('⏳ Method "countReset" not implemented yet');
        }
        help() {
          console.log('⏳ Method "help" not implemented yet');
        }
      }
      o.instance = null;
      function t(i, r) {
        return l.get(r).push(i), i;
      }
      return o;
    })();
    return (d.ConsolAS = P), Object.defineProperty(d, Symbol.toStringTag, { value: "Module" }), d;
  })({});
  
  ConsolAS = ConsolAS.ConsolAS;
  