function rt(e) {
  return Array.isArray(e) && Array.isArray(e == null ? void 0 : e[0]);
}
function Ee(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function at(e) {
  return Array.isArray(e) && e.every(Ee);
}
const _ = {
  isTwoDimAr: rt,
  isObject: Ee,
  isObjectArray: at
};
function q(e, t = {}) {
  let { addIndices: r } = t;
  r === void 0 && (r = !0);
  const a = !_.isTwoDimAr(e);
  a && (e = st(e, "table(TwoDimArray)"));
  const o = [...e[0]];
  if (!a && r) {
    r === "row-only" && e.shift(), e.forEach((c, u) => c.unshift(u + ""));
    let n;
    r === !0 && (n = new Array(e[0].length).fill().map((c, u) => u === 0 ? "(index)" : u - 1 + "")), r === "row-only" && (n = ["(index)", ...o]), e.unshift(n);
  }
  e = e.map((n) => n.map(ot));
  const i = e.reduce((n, c) => {
    const u = c.map((v) => (v + "").length);
    return n.length ? n.map((v, p) => v < u[p] ? u[p] : v) : u;
  }, []);
  return e.reduce(
    (n, c, u) => {
      const v = c.map((p, g) => nt(p, i[g]));
      return n.length && (n += `
`), u === 1 && (n += `|${v.map((p) => p.replace(/\|/g, "-")).join("|").replace(/[^|]/g, "-")}|
`.replace(/\|-/g, "| ").replace(/-\|/g, " |")), n + `|${v.join("|")}|`;
    },
    ""
  );
}
function nt(e, t) {
  e += "";
  const r = 1, a = t - e.length - r + 2;
  return `${" ".repeat(r)}${e}${" ".repeat(a)}`;
}
function ot(e) {
  if (typeof e != "object")
    return e;
  let t = JSON.stringify(e);
  return t.length > 25 && (t = t.substring(0, 21) + "..."), t;
}
function st(e, t) {
  return e = e + "", e.length > 25 && (e = e.slice(0, 21) + "..."), [
    ["Error", "Source", "Input"],
    ["Invalid argument", t, e]
  ];
}
function it(e) {
  if (!_.isObject(e))
    throw "This is not an object";
  const t = ["(index)", "Value"];
  let r = ut(e, t).map(
    (o) => o.map((i) => i && i !== void 0 ? i : "")
  ).map((o) => {
    const i = t.length - o.length;
    for (let s = 0; s < i; s++)
      o.push("");
    return o;
  });
  const a = [t, ...r];
  return q(a, { addIndices: !1 });
}
function ct(e) {
  return Array.isArray ? e.reduce((t, r, a) => (t[a] = r, t), {}) : e;
}
function Me(e, t, r, a) {
  return e.forEach((o) => {
    t.indexOf(o[0]) === -1 && t.push(o[0]);
  }), e.reduce(
    (o, [i, s]) => {
      if (_.isObject(s))
        return Me(Object.entries(s), t, r, !1);
      const n = t.findIndex((c) => c === i);
      return o[n] = s, [...o].map(
        (c) => c !== void 0 ? c : a ? "" : "{...}"
      );
    },
    [r, ""]
  );
}
function ut(e, t) {
  return Object.entries(e).map(([o, i]) => {
    let s = !1;
    return Array.isArray(i) && (i = ct(i), s = !0), _.isObject(i) ? Me(Object.entries(i), t, o, s) : [o, i];
  });
}
function ft(e) {
  if (!_.isObjectArray(e))
    throw "This is not an object array";
  const t = {};
  let r = -1;
  const a = [];
  let o = [];
  for (const s of e) {
    const n = Object.entries(s), c = new Array(n.length).fill("");
    n.forEach(([u, v]) => {
      u in t || (t[u] = ++r, a.push(u)), c[t[u]] = v;
    }), o.push(c);
  }
  o.forEach((s) => {
    for (let n = 0; n < s.length; n++)
      n in s || (s[n] = "");
  }), o.forEach((s) => {
    if (s.length === a.length)
      return;
    const n = a.length - s.length;
    for (let c = 0; c < n; c++)
      s.push("");
  });
  const i = [a, ...o];
  return q(i, { addIndices: "row-only" });
}
var x = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function pt() {
  this.__data__ = [], this.size = 0;
}
var vt = pt;
function gt(e, t) {
  return e === t || e !== e && t !== t;
}
var Le = gt, yt = Le;
function bt(e, t) {
  for (var r = e.length; r--; )
    if (yt(e[r][0], t))
      return r;
  return -1;
}
var F = bt, ht = F, $t = Array.prototype, dt = $t.splice;
function _t(e) {
  var t = this.__data__, r = ht(t, e);
  if (r < 0)
    return !1;
  var a = t.length - 1;
  return r == a ? t.pop() : dt.call(t, r, 1), --this.size, !0;
}
var Tt = _t, jt = F;
function Ot(e) {
  var t = this.__data__, r = jt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var At = Ot, mt = F;
function St(e) {
  return mt(this.__data__, e) > -1;
}
var Ct = St, It = F;
function wt(e, t) {
  var r = this.__data__, a = It(r, e);
  return a < 0 ? (++this.size, r.push([e, t])) : r[a][1] = t, this;
}
var Pt = wt, xt = vt, Et = Tt, Mt = At, Lt = Ct, Dt = Pt;
function T(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
T.prototype.clear = xt;
T.prototype.delete = Et;
T.prototype.get = Mt;
T.prototype.has = Lt;
T.prototype.set = Dt;
var G = T, Ft = G;
function Gt() {
  this.__data__ = new Ft(), this.size = 0;
}
var Bt = Gt;
function Ut(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var Nt = Ut;
function Kt(e) {
  return this.__data__.get(e);
}
var Ht = Kt;
function Rt(e) {
  return this.__data__.has(e);
}
var Vt = Rt, zt = typeof x == "object" && x && x.Object === Object && x, De = zt, kt = De, Wt = typeof self == "object" && self && self.Object === Object && self, qt = kt || Wt || Function("return this")(), y = qt, Yt = y, Jt = Yt.Symbol, Y = Jt, ie = Y, Fe = Object.prototype, Xt = Fe.hasOwnProperty, Zt = Fe.toString, C = ie ? ie.toStringTag : void 0;
function Qt(e) {
  var t = Xt.call(e, C), r = e[C];
  try {
    e[C] = void 0;
    var a = !0;
  } catch {
  }
  var o = Zt.call(e);
  return a && (t ? e[C] = r : delete e[C]), o;
}
var er = Qt, tr = Object.prototype, rr = tr.toString;
function ar(e) {
  return rr.call(e);
}
var nr = ar, ce = Y, or = er, sr = nr, ir = "[object Null]", cr = "[object Undefined]", ue = ce ? ce.toStringTag : void 0;
function ur(e) {
  return e == null ? e === void 0 ? cr : ir : ue && ue in Object(e) ? or(e) : sr(e);
}
var B = ur;
function fr(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var I = fr, lr = B, pr = I, vr = "[object AsyncFunction]", gr = "[object Function]", yr = "[object GeneratorFunction]", br = "[object Proxy]";
function hr(e) {
  if (!pr(e))
    return !1;
  var t = lr(e);
  return t == gr || t == yr || t == vr || t == br;
}
var Ge = hr, $r = y, dr = $r["__core-js_shared__"], _r = dr, H = _r, fe = function() {
  var e = /[^.]+$/.exec(H && H.keys && H.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Tr(e) {
  return !!fe && fe in e;
}
var jr = Tr, Or = Function.prototype, Ar = Or.toString;
function mr(e) {
  if (e != null) {
    try {
      return Ar.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Be = mr, Sr = Ge, Cr = jr, Ir = I, wr = Be, Pr = /[\\^$.*+?()[\]{}|]/g, xr = /^\[object .+?Constructor\]$/, Er = Function.prototype, Mr = Object.prototype, Lr = Er.toString, Dr = Mr.hasOwnProperty, Fr = RegExp(
  "^" + Lr.call(Dr).replace(Pr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Gr(e) {
  if (!Ir(e) || Cr(e))
    return !1;
  var t = Sr(e) ? Fr : xr;
  return t.test(wr(e));
}
var Br = Gr;
function Ur(e, t) {
  return e == null ? void 0 : e[t];
}
var Nr = Ur, Kr = Br, Hr = Nr;
function Rr(e, t) {
  var r = Hr(e, t);
  return Kr(r) ? r : void 0;
}
var d = Rr, Vr = d, zr = y, kr = Vr(zr, "Map"), J = kr, Wr = d, qr = Wr(Object, "create"), U = qr, le = U;
function Yr() {
  this.__data__ = le ? le(null) : {}, this.size = 0;
}
var Jr = Yr;
function Xr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Zr = Xr, Qr = U, ea = "__lodash_hash_undefined__", ta = Object.prototype, ra = ta.hasOwnProperty;
function aa(e) {
  var t = this.__data__;
  if (Qr) {
    var r = t[e];
    return r === ea ? void 0 : r;
  }
  return ra.call(t, e) ? t[e] : void 0;
}
var na = aa, oa = U, sa = Object.prototype, ia = sa.hasOwnProperty;
function ca(e) {
  var t = this.__data__;
  return oa ? t[e] !== void 0 : ia.call(t, e);
}
var ua = ca, fa = U, la = "__lodash_hash_undefined__";
function pa(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = fa && t === void 0 ? la : t, this;
}
var va = pa, ga = Jr, ya = Zr, ba = na, ha = ua, $a = va;
function j(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
j.prototype.clear = ga;
j.prototype.delete = ya;
j.prototype.get = ba;
j.prototype.has = ha;
j.prototype.set = $a;
var da = j, pe = da, _a = G, Ta = J;
function ja() {
  this.size = 0, this.__data__ = {
    hash: new pe(),
    map: new (Ta || _a)(),
    string: new pe()
  };
}
var Oa = ja;
function Aa(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var ma = Aa, Sa = ma;
function Ca(e, t) {
  var r = e.__data__;
  return Sa(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var N = Ca, Ia = N;
function wa(e) {
  var t = Ia(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Pa = wa, xa = N;
function Ea(e) {
  return xa(this, e).get(e);
}
var Ma = Ea, La = N;
function Da(e) {
  return La(this, e).has(e);
}
var Fa = Da, Ga = N;
function Ba(e, t) {
  var r = Ga(this, e), a = r.size;
  return r.set(e, t), this.size += r.size == a ? 0 : 1, this;
}
var Ua = Ba, Na = Oa, Ka = Pa, Ha = Ma, Ra = Fa, Va = Ua;
function O(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
O.prototype.clear = Na;
O.prototype.delete = Ka;
O.prototype.get = Ha;
O.prototype.has = Ra;
O.prototype.set = Va;
var za = O, ka = G, Wa = J, qa = za, Ya = 200;
function Ja(e, t) {
  var r = this.__data__;
  if (r instanceof ka) {
    var a = r.__data__;
    if (!Wa || a.length < Ya - 1)
      return a.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new qa(a);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Xa = Ja, Za = G, Qa = Bt, en = Nt, tn = Ht, rn = Vt, an = Xa;
function A(e) {
  var t = this.__data__ = new Za(e);
  this.size = t.size;
}
A.prototype.clear = Qa;
A.prototype.delete = en;
A.prototype.get = tn;
A.prototype.has = rn;
A.prototype.set = an;
var nn = A;
function on(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length; ++r < a && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var sn = on, cn = d, un = function() {
  try {
    var e = cn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), fn = un, ve = fn;
function ln(e, t, r) {
  t == "__proto__" && ve ? ve(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Ue = ln, pn = Ue, vn = Le, gn = Object.prototype, yn = gn.hasOwnProperty;
function bn(e, t, r) {
  var a = e[t];
  (!(yn.call(e, t) && vn(a, r)) || r === void 0 && !(t in e)) && pn(e, t, r);
}
var Ne = bn, hn = Ne, $n = Ue;
function dn(e, t, r, a) {
  var o = !r;
  r || (r = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var n = t[i], c = a ? a(r[n], e[n], n, r, e) : void 0;
    c === void 0 && (c = e[n]), o ? $n(r, n, c) : hn(r, n, c);
  }
  return r;
}
var K = dn;
function _n(e, t) {
  for (var r = -1, a = Array(e); ++r < e; )
    a[r] = t(r);
  return a;
}
var Tn = _n;
function jn(e) {
  return e != null && typeof e == "object";
}
var w = jn, On = B, An = w, mn = "[object Arguments]";
function Sn(e) {
  return An(e) && On(e) == mn;
}
var Cn = Sn, ge = Cn, In = w, Ke = Object.prototype, wn = Ke.hasOwnProperty, Pn = Ke.propertyIsEnumerable, xn = ge(function() {
  return arguments;
}()) ? ge : function(e) {
  return In(e) && wn.call(e, "callee") && !Pn.call(e, "callee");
}, En = xn, Mn = Array.isArray, X = Mn, M = { exports: {} };
function Ln() {
  return !1;
}
var Dn = Ln;
M.exports;
(function(e, t) {
  var r = y, a = Dn, o = t && !t.nodeType && t, i = o && !0 && e && !e.nodeType && e, s = i && i.exports === o, n = s ? r.Buffer : void 0, c = n ? n.isBuffer : void 0, u = c || a;
  e.exports = u;
})(M, M.exports);
var He = M.exports, Fn = 9007199254740991, Gn = /^(?:0|[1-9]\d*)$/;
function Bn(e, t) {
  var r = typeof e;
  return t = t ?? Fn, !!t && (r == "number" || r != "symbol" && Gn.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Un = Bn, Nn = 9007199254740991;
function Kn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Nn;
}
var Re = Kn, Hn = B, Rn = Re, Vn = w, zn = "[object Arguments]", kn = "[object Array]", Wn = "[object Boolean]", qn = "[object Date]", Yn = "[object Error]", Jn = "[object Function]", Xn = "[object Map]", Zn = "[object Number]", Qn = "[object Object]", eo = "[object RegExp]", to = "[object Set]", ro = "[object String]", ao = "[object WeakMap]", no = "[object ArrayBuffer]", oo = "[object DataView]", so = "[object Float32Array]", io = "[object Float64Array]", co = "[object Int8Array]", uo = "[object Int16Array]", fo = "[object Int32Array]", lo = "[object Uint8Array]", po = "[object Uint8ClampedArray]", vo = "[object Uint16Array]", go = "[object Uint32Array]", l = {};
l[so] = l[io] = l[co] = l[uo] = l[fo] = l[lo] = l[po] = l[vo] = l[go] = !0;
l[zn] = l[kn] = l[no] = l[Wn] = l[oo] = l[qn] = l[Yn] = l[Jn] = l[Xn] = l[Zn] = l[Qn] = l[eo] = l[to] = l[ro] = l[ao] = !1;
function yo(e) {
  return Vn(e) && Rn(e.length) && !!l[Hn(e)];
}
var bo = yo;
function ho(e) {
  return function(t) {
    return e(t);
  };
}
var Z = ho, L = { exports: {} };
L.exports;
(function(e, t) {
  var r = De, a = t && !t.nodeType && t, o = a && !0 && e && !e.nodeType && e, i = o && o.exports === a, s = i && r.process, n = function() {
    try {
      var c = o && o.require && o.require("util").types;
      return c || s && s.binding && s.binding("util");
    } catch {
    }
  }();
  e.exports = n;
})(L, L.exports);
var Q = L.exports, $o = bo, _o = Z, ye = Q, be = ye && ye.isTypedArray, To = be ? _o(be) : $o, jo = To, Oo = Tn, Ao = En, mo = X, So = He, Co = Un, Io = jo, wo = Object.prototype, Po = wo.hasOwnProperty;
function xo(e, t) {
  var r = mo(e), a = !r && Ao(e), o = !r && !a && So(e), i = !r && !a && !o && Io(e), s = r || a || o || i, n = s ? Oo(e.length, String) : [], c = n.length;
  for (var u in e)
    (t || Po.call(e, u)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Co(u, c))) && n.push(u);
  return n;
}
var Ve = xo, Eo = Object.prototype;
function Mo(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Eo;
  return e === r;
}
var ee = Mo;
function Lo(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ze = Lo, Do = ze, Fo = Do(Object.keys, Object), Go = Fo, Bo = ee, Uo = Go, No = Object.prototype, Ko = No.hasOwnProperty;
function Ho(e) {
  if (!Bo(e))
    return Uo(e);
  var t = [];
  for (var r in Object(e))
    Ko.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Ro = Ho, Vo = Ge, zo = Re;
function ko(e) {
  return e != null && zo(e.length) && !Vo(e);
}
var ke = ko, Wo = Ve, qo = Ro, Yo = ke;
function Jo(e) {
  return Yo(e) ? Wo(e) : qo(e);
}
var te = Jo, Xo = K, Zo = te;
function Qo(e, t) {
  return e && Xo(t, Zo(t), e);
}
var es = Qo;
function ts(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var rs = ts, as = I, ns = ee, os = rs, ss = Object.prototype, is = ss.hasOwnProperty;
function cs(e) {
  if (!as(e))
    return os(e);
  var t = ns(e), r = [];
  for (var a in e)
    a == "constructor" && (t || !is.call(e, a)) || r.push(a);
  return r;
}
var us = cs, fs = Ve, ls = us, ps = ke;
function vs(e) {
  return ps(e) ? fs(e, !0) : ls(e);
}
var re = vs, gs = K, ys = re;
function bs(e, t) {
  return e && gs(t, ys(t), e);
}
var hs = bs, D = { exports: {} };
D.exports;
(function(e, t) {
  var r = y, a = t && !t.nodeType && t, o = a && !0 && e && !e.nodeType && e, i = o && o.exports === a, s = i ? r.Buffer : void 0, n = s ? s.allocUnsafe : void 0;
  function c(u, v) {
    if (v)
      return u.slice();
    var p = u.length, g = n ? n(p) : new u.constructor(p);
    return u.copy(g), g;
  }
  e.exports = c;
})(D, D.exports);
var $s = D.exports;
function ds(e, t) {
  var r = -1, a = e.length;
  for (t || (t = Array(a)); ++r < a; )
    t[r] = e[r];
  return t;
}
var _s = ds;
function Ts(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length, o = 0, i = []; ++r < a; ) {
    var s = e[r];
    t(s, r, e) && (i[o++] = s);
  }
  return i;
}
var js = Ts;
function Os() {
  return [];
}
var We = Os, As = js, ms = We, Ss = Object.prototype, Cs = Ss.propertyIsEnumerable, he = Object.getOwnPropertySymbols, Is = he ? function(e) {
  return e == null ? [] : (e = Object(e), As(he(e), function(t) {
    return Cs.call(e, t);
  }));
} : ms, ae = Is, ws = K, Ps = ae;
function xs(e, t) {
  return ws(e, Ps(e), t);
}
var Es = xs;
function Ms(e, t) {
  for (var r = -1, a = t.length, o = e.length; ++r < a; )
    e[o + r] = t[r];
  return e;
}
var qe = Ms, Ls = ze, Ds = Ls(Object.getPrototypeOf, Object), Ye = Ds, Fs = qe, Gs = Ye, Bs = ae, Us = We, Ns = Object.getOwnPropertySymbols, Ks = Ns ? function(e) {
  for (var t = []; e; )
    Fs(t, Bs(e)), e = Gs(e);
  return t;
} : Us, Je = Ks, Hs = K, Rs = Je;
function Vs(e, t) {
  return Hs(e, Rs(e), t);
}
var zs = Vs, ks = qe, Ws = X;
function qs(e, t, r) {
  var a = t(e);
  return Ws(e) ? a : ks(a, r(e));
}
var Xe = qs, Ys = Xe, Js = ae, Xs = te;
function Zs(e) {
  return Ys(e, Xs, Js);
}
var Qs = Zs, ei = Xe, ti = Je, ri = re;
function ai(e) {
  return ei(e, ri, ti);
}
var ni = ai, oi = d, si = y, ii = oi(si, "DataView"), ci = ii, ui = d, fi = y, li = ui(fi, "Promise"), pi = li, vi = d, gi = y, yi = vi(gi, "Set"), bi = yi, hi = d, $i = y, di = hi($i, "WeakMap"), _i = di, R = ci, V = J, z = pi, k = bi, W = _i, Ze = B, m = Be, $e = "[object Map]", Ti = "[object Object]", de = "[object Promise]", _e = "[object Set]", Te = "[object WeakMap]", je = "[object DataView]", ji = m(R), Oi = m(V), Ai = m(z), mi = m(k), Si = m(W), $ = Ze;
(R && $(new R(new ArrayBuffer(1))) != je || V && $(new V()) != $e || z && $(z.resolve()) != de || k && $(new k()) != _e || W && $(new W()) != Te) && ($ = function(e) {
  var t = Ze(e), r = t == Ti ? e.constructor : void 0, a = r ? m(r) : "";
  if (a)
    switch (a) {
      case ji:
        return je;
      case Oi:
        return $e;
      case Ai:
        return de;
      case mi:
        return _e;
      case Si:
        return Te;
    }
  return t;
});
var ne = $, Ci = Object.prototype, Ii = Ci.hasOwnProperty;
function wi(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Ii.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var Pi = wi, xi = y, Ei = xi.Uint8Array, Mi = Ei, Oe = Mi;
function Li(e) {
  var t = new e.constructor(e.byteLength);
  return new Oe(t).set(new Oe(e)), t;
}
var oe = Li, Di = oe;
function Fi(e, t) {
  var r = t ? Di(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Gi = Fi, Bi = /\w*$/;
function Ui(e) {
  var t = new e.constructor(e.source, Bi.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Ni = Ui, Ae = Y, me = Ae ? Ae.prototype : void 0, Se = me ? me.valueOf : void 0;
function Ki(e) {
  return Se ? Object(Se.call(e)) : {};
}
var Hi = Ki, Ri = oe;
function Vi(e, t) {
  var r = t ? Ri(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var zi = Vi, ki = oe, Wi = Gi, qi = Ni, Yi = Hi, Ji = zi, Xi = "[object Boolean]", Zi = "[object Date]", Qi = "[object Map]", ec = "[object Number]", tc = "[object RegExp]", rc = "[object Set]", ac = "[object String]", nc = "[object Symbol]", oc = "[object ArrayBuffer]", sc = "[object DataView]", ic = "[object Float32Array]", cc = "[object Float64Array]", uc = "[object Int8Array]", fc = "[object Int16Array]", lc = "[object Int32Array]", pc = "[object Uint8Array]", vc = "[object Uint8ClampedArray]", gc = "[object Uint16Array]", yc = "[object Uint32Array]";
function bc(e, t, r) {
  var a = e.constructor;
  switch (t) {
    case oc:
      return ki(e);
    case Xi:
    case Zi:
      return new a(+e);
    case sc:
      return Wi(e, r);
    case ic:
    case cc:
    case uc:
    case fc:
    case lc:
    case pc:
    case vc:
    case gc:
    case yc:
      return Ji(e, r);
    case Qi:
      return new a();
    case ec:
    case ac:
      return new a(e);
    case tc:
      return qi(e);
    case rc:
      return new a();
    case nc:
      return Yi(e);
  }
}
var hc = bc, $c = I, Ce = Object.create, dc = function() {
  function e() {
  }
  return function(t) {
    if (!$c(t))
      return {};
    if (Ce)
      return Ce(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), _c = dc, Tc = _c, jc = Ye, Oc = ee;
function Ac(e) {
  return typeof e.constructor == "function" && !Oc(e) ? Tc(jc(e)) : {};
}
var mc = Ac, Sc = ne, Cc = w, Ic = "[object Map]";
function wc(e) {
  return Cc(e) && Sc(e) == Ic;
}
var Pc = wc, xc = Pc, Ec = Z, Ie = Q, we = Ie && Ie.isMap, Mc = we ? Ec(we) : xc, Lc = Mc, Dc = ne, Fc = w, Gc = "[object Set]";
function Bc(e) {
  return Fc(e) && Dc(e) == Gc;
}
var Uc = Bc, Nc = Uc, Kc = Z, Pe = Q, xe = Pe && Pe.isSet, Hc = xe ? Kc(xe) : Nc, Rc = Hc, Vc = nn, zc = sn, kc = Ne, Wc = es, qc = hs, Yc = $s, Jc = _s, Xc = Es, Zc = zs, Qc = Qs, eu = ni, tu = ne, ru = Pi, au = hc, nu = mc, ou = X, su = He, iu = Lc, cu = I, uu = Rc, fu = te, lu = re, pu = 1, vu = 2, gu = 4, Qe = "[object Arguments]", yu = "[object Array]", bu = "[object Boolean]", hu = "[object Date]", $u = "[object Error]", et = "[object Function]", du = "[object GeneratorFunction]", _u = "[object Map]", Tu = "[object Number]", tt = "[object Object]", ju = "[object RegExp]", Ou = "[object Set]", Au = "[object String]", mu = "[object Symbol]", Su = "[object WeakMap]", Cu = "[object ArrayBuffer]", Iu = "[object DataView]", wu = "[object Float32Array]", Pu = "[object Float64Array]", xu = "[object Int8Array]", Eu = "[object Int16Array]", Mu = "[object Int32Array]", Lu = "[object Uint8Array]", Du = "[object Uint8ClampedArray]", Fu = "[object Uint16Array]", Gu = "[object Uint32Array]", f = {};
f[Qe] = f[yu] = f[Cu] = f[Iu] = f[bu] = f[hu] = f[wu] = f[Pu] = f[xu] = f[Eu] = f[Mu] = f[_u] = f[Tu] = f[tt] = f[ju] = f[Ou] = f[Au] = f[mu] = f[Lu] = f[Du] = f[Fu] = f[Gu] = !0;
f[$u] = f[et] = f[Su] = !1;
function E(e, t, r, a, o, i) {
  var s, n = t & pu, c = t & vu, u = t & gu;
  if (r && (s = o ? r(e, a, o, i) : r(e)), s !== void 0)
    return s;
  if (!cu(e))
    return e;
  var v = ou(e);
  if (v) {
    if (s = ru(e), !n)
      return Jc(e, s);
  } else {
    var p = tu(e), g = p == et || p == du;
    if (su(e))
      return Yc(e, n);
    if (p == tt || p == Qe || g && !o) {
      if (s = c || g ? {} : nu(e), !n)
        return c ? Zc(e, qc(s, e)) : Xc(e, Wc(s, e));
    } else {
      if (!f[p])
        return o ? e : {};
      s = au(e, p, n);
    }
  }
  i || (i = new Vc());
  var S = i.get(e);
  if (S)
    return S;
  i.set(e, s), uu(e) ? e.forEach(function(b) {
    s.add(E(b, t, r, b, e, i));
  }) : iu(e) && e.forEach(function(b, h) {
    s.set(h, E(b, t, r, h, e, i));
  });
  var P = u ? c ? eu : Qc : c ? lu : fu, se = v ? void 0 : P(e);
  return zc(se || e, function(b, h) {
    se && (h = b, b = e[h]), kc(s, h, E(b, t, r, h, e, i));
  }), s;
}
var Bu = E, Uu = Bu, Nu = 1, Ku = 4;
function Hu(e) {
  return Uu(e, Nu | Ku);
}
var Ru = Hu;
const Vu = /* @__PURE__ */ lt(Ru), zu = function() {
  const e = /* @__PURE__ */ new WeakMap(), t = ["table"], r = ["log", "warn", "error"], a = /* @__PURE__ */ new WeakMap();
  class o {
    constructor() {
      return o.instance || (e.set(this, !1), a.set(this, []), r.forEach((n) => this[n] = console[n]), o.instance = this), o.instance;
    }
    /**
     * Polyfills the Console object.
     * @returns {ConsolAS}
     */
    polyfill() {
      return this.isPolyfilled ? this : (t.forEach((n) => {
        n in Object.getPrototypeOf(console) || (Object.getPrototypeOf(console)[n] = this[n].bind(this));
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
     * @param {TwoDimArray | object} origObj
     * @param {{returnOnly: boolean}} [options] The options object, if `returnOnly` is `true`, returns the MD table without logging it.
     * @returns {string} - The
     */
    table(n, c = { returnOnly: !1 }) {
      const u = {
        isTwoDimAr: q,
        isObject: it,
        isObjectArray: ft
      }, v = Vu(n), p = Object.keys(u).reduce((S, P) => !S && _[P](v) ? u[P] : S, null);
      if (p === null)
        throw new Error("Cannot convert input to table");
      const g = i(p(v), this);
      return c.returnOnly || console.log(g), g;
    }
    // TODO: Implement the tree method
    /**
     *
     * @param {GoogleAppsScript.Drive.Folder} folder
     * @param {TreeOptions} options
     */
    tree(n, c) {
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
  function i(s, n) {
    return a.get(n).push(s), s;
  }
  return o;
}();
export {
  zu as ConsolAS
};
