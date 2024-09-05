function at(e) {
  return Array.isArray(e) && Array.isArray(e == null ? void 0 : e[0]);
}
function Me(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function nt(e) {
  return Array.isArray(e) && e.every(Me);
}
const _ = {
  isTwoDimAr: at,
  isObject: Me,
  isObjectArray: nt
};
function q(e, t = {}) {
  let { addIndices: r } = t;
  r === void 0 && (r = !0);
  const a = !_.isTwoDimAr(e);
  a && (e = it(e, "table(TwoDimArray)"));
  const o = [...e[0]];
  if (!a && r) {
    r === "row-only" && e.shift(), e.forEach((c, u) => c.unshift(u + ""));
    let n;
    r === !0 && (n = new Array(e[0].length).fill().map((c, u) => u === 0 ? "(index)" : u - 1 + "")), r === "row-only" && (n = ["(index)", ...o]), e.unshift(n);
  }
  e = e.map((n) => n.map(st));
  const i = e.reduce((n, c) => {
    const u = c.map((v) => (v + "").length);
    return n.length ? n.map((v, p) => v < u[p] ? u[p] : v) : u;
  }, []);
  return e.reduce(
    (n, c, u) => {
      const v = c.map((p, y) => ot(p, i[y]));
      return n.length && (n += `
`), u === 1 && (n += `|${v.map((p) => p.replace(/\|/g, "-")).join("|").replace(/[^|]/g, "-")}|
`.replace(/\|-/g, "| ").replace(/-\|/g, " |")), n + `|${v.join("|")}|`;
    },
    ""
  );
}
function ot(e, t) {
  e += "";
  const r = 1, a = t - e.length - r + 2;
  return `${" ".repeat(r)}${e}${" ".repeat(a)}`;
}
function st(e) {
  if (typeof e != "object")
    return e;
  let t = JSON.stringify(e);
  return t.length > 25 && (t = t.substring(0, 21) + "..."), t;
}
function it(e, t) {
  return e = e + "", e.length > 25 && (e = e.slice(0, 21) + "..."), [
    ["Error", "Source", "Input"],
    ["Invalid argument", t, e]
  ];
}
function ct(e) {
  if (!_.isObject(e))
    throw "This is not an object";
  const t = ["(index)", "Value"];
  let r = ft(e, t).map(
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
function ut(e) {
  return Array.isArray ? e.reduce((t, r, a) => (t[a] = r, t), {}) : e;
}
function Le(e, t, r, a) {
  return e.forEach((o) => {
    t.indexOf(o[0]) === -1 && t.push(o[0]);
  }), e.reduce(
    (o, [i, s]) => {
      if (_.isObject(s))
        return Le(Object.entries(s), t, r, !1);
      const n = t.findIndex((c) => c === i);
      return o[n] = s, [...o].map(
        (c) => c !== void 0 ? c : a ? "" : "{...}"
      );
    },
    [r, ""]
  );
}
function ft(e, t) {
  return Object.entries(e).map(([o, i]) => {
    let s = !1;
    return Array.isArray(i) && (i = ut(i), s = !0), _.isObject(i) ? Le(Object.entries(i), t, o, s) : [o, i];
  });
}
function lt(e) {
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
function pt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function vt() {
  this.__data__ = [], this.size = 0;
}
var yt = vt;
function gt(e, t) {
  return e === t || e !== e && t !== t;
}
var De = gt, bt = De;
function ht(e, t) {
  for (var r = e.length; r--; )
    if (bt(e[r][0], t))
      return r;
  return -1;
}
var F = ht, $t = F, dt = Array.prototype, _t = dt.splice;
function Tt(e) {
  var t = this.__data__, r = $t(t, e);
  if (r < 0)
    return !1;
  var a = t.length - 1;
  return r == a ? t.pop() : _t.call(t, r, 1), --this.size, !0;
}
var jt = Tt, Ot = F;
function At(e) {
  var t = this.__data__, r = Ot(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var mt = At, St = F;
function Ct(e) {
  return St(this.__data__, e) > -1;
}
var wt = Ct, It = F;
function Pt(e, t) {
  var r = this.__data__, a = It(r, e);
  return a < 0 ? (++this.size, r.push([e, t])) : r[a][1] = t, this;
}
var xt = Pt, Et = yt, Mt = jt, Lt = mt, Dt = wt, Ft = xt;
function T(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
T.prototype.clear = Et;
T.prototype.delete = Mt;
T.prototype.get = Lt;
T.prototype.has = Dt;
T.prototype.set = Ft;
var G = T, Gt = G;
function Bt() {
  this.__data__ = new Gt(), this.size = 0;
}
var Ut = Bt;
function Nt(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var Kt = Nt;
function Ht(e) {
  return this.__data__.get(e);
}
var Rt = Ht;
function Vt(e) {
  return this.__data__.has(e);
}
var zt = Vt, kt = typeof x == "object" && x && x.Object === Object && x, Fe = kt, Wt = Fe, qt = typeof self == "object" && self && self.Object === Object && self, Yt = Wt || qt || Function("return this")(), g = Yt, Jt = g, Xt = Jt.Symbol, Y = Xt, ie = Y, Ge = Object.prototype, Zt = Ge.hasOwnProperty, Qt = Ge.toString, C = ie ? ie.toStringTag : void 0;
function er(e) {
  var t = Zt.call(e, C), r = e[C];
  try {
    e[C] = void 0;
    var a = !0;
  } catch {
  }
  var o = Qt.call(e);
  return a && (t ? e[C] = r : delete e[C]), o;
}
var tr = er, rr = Object.prototype, ar = rr.toString;
function nr(e) {
  return ar.call(e);
}
var or = nr, ce = Y, sr = tr, ir = or, cr = "[object Null]", ur = "[object Undefined]", ue = ce ? ce.toStringTag : void 0;
function fr(e) {
  return e == null ? e === void 0 ? ur : cr : ue && ue in Object(e) ? sr(e) : ir(e);
}
var B = fr;
function lr(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var w = lr, pr = B, vr = w, yr = "[object AsyncFunction]", gr = "[object Function]", br = "[object GeneratorFunction]", hr = "[object Proxy]";
function $r(e) {
  if (!vr(e))
    return !1;
  var t = pr(e);
  return t == gr || t == br || t == yr || t == hr;
}
var Be = $r, dr = g, _r = dr["__core-js_shared__"], Tr = _r, H = Tr, fe = function() {
  var e = /[^.]+$/.exec(H && H.keys && H.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function jr(e) {
  return !!fe && fe in e;
}
var Or = jr, Ar = Function.prototype, mr = Ar.toString;
function Sr(e) {
  if (e != null) {
    try {
      return mr.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ue = Sr, Cr = Be, wr = Or, Ir = w, Pr = Ue, xr = /[\\^$.*+?()[\]{}|]/g, Er = /^\[object .+?Constructor\]$/, Mr = Function.prototype, Lr = Object.prototype, Dr = Mr.toString, Fr = Lr.hasOwnProperty, Gr = RegExp(
  "^" + Dr.call(Fr).replace(xr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Br(e) {
  if (!Ir(e) || wr(e))
    return !1;
  var t = Cr(e) ? Gr : Er;
  return t.test(Pr(e));
}
var Ur = Br;
function Nr(e, t) {
  return e == null ? void 0 : e[t];
}
var Kr = Nr, Hr = Ur, Rr = Kr;
function Vr(e, t) {
  var r = Rr(e, t);
  return Hr(r) ? r : void 0;
}
var d = Vr, zr = d, kr = g, Wr = zr(kr, "Map"), J = Wr, qr = d, Yr = qr(Object, "create"), U = Yr, le = U;
function Jr() {
  this.__data__ = le ? le(null) : {}, this.size = 0;
}
var Xr = Jr;
function Zr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Qr = Zr, ea = U, ta = "__lodash_hash_undefined__", ra = Object.prototype, aa = ra.hasOwnProperty;
function na(e) {
  var t = this.__data__;
  if (ea) {
    var r = t[e];
    return r === ta ? void 0 : r;
  }
  return aa.call(t, e) ? t[e] : void 0;
}
var oa = na, sa = U, ia = Object.prototype, ca = ia.hasOwnProperty;
function ua(e) {
  var t = this.__data__;
  return sa ? t[e] !== void 0 : ca.call(t, e);
}
var fa = ua, la = U, pa = "__lodash_hash_undefined__";
function va(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = la && t === void 0 ? pa : t, this;
}
var ya = va, ga = Xr, ba = Qr, ha = oa, $a = fa, da = ya;
function j(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
j.prototype.clear = ga;
j.prototype.delete = ba;
j.prototype.get = ha;
j.prototype.has = $a;
j.prototype.set = da;
var _a = j, pe = _a, Ta = G, ja = J;
function Oa() {
  this.size = 0, this.__data__ = {
    hash: new pe(),
    map: new (ja || Ta)(),
    string: new pe()
  };
}
var Aa = Oa;
function ma(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Sa = ma, Ca = Sa;
function wa(e, t) {
  var r = e.__data__;
  return Ca(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var N = wa, Ia = N;
function Pa(e) {
  var t = Ia(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var xa = Pa, Ea = N;
function Ma(e) {
  return Ea(this, e).get(e);
}
var La = Ma, Da = N;
function Fa(e) {
  return Da(this, e).has(e);
}
var Ga = Fa, Ba = N;
function Ua(e, t) {
  var r = Ba(this, e), a = r.size;
  return r.set(e, t), this.size += r.size == a ? 0 : 1, this;
}
var Na = Ua, Ka = Aa, Ha = xa, Ra = La, Va = Ga, za = Na;
function O(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
O.prototype.clear = Ka;
O.prototype.delete = Ha;
O.prototype.get = Ra;
O.prototype.has = Va;
O.prototype.set = za;
var ka = O, Wa = G, qa = J, Ya = ka, Ja = 200;
function Xa(e, t) {
  var r = this.__data__;
  if (r instanceof Wa) {
    var a = r.__data__;
    if (!qa || a.length < Ja - 1)
      return a.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Ya(a);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Za = Xa, Qa = G, en = Ut, tn = Kt, rn = Rt, an = zt, nn = Za;
function A(e) {
  var t = this.__data__ = new Qa(e);
  this.size = t.size;
}
A.prototype.clear = en;
A.prototype.delete = tn;
A.prototype.get = rn;
A.prototype.has = an;
A.prototype.set = nn;
var on = A;
function sn(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length; ++r < a && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var cn = sn, un = d, fn = function() {
  try {
    var e = un(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), ln = fn, ve = ln;
function pn(e, t, r) {
  t == "__proto__" && ve ? ve(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Ne = pn, vn = Ne, yn = De, gn = Object.prototype, bn = gn.hasOwnProperty;
function hn(e, t, r) {
  var a = e[t];
  (!(bn.call(e, t) && yn(a, r)) || r === void 0 && !(t in e)) && vn(e, t, r);
}
var Ke = hn, $n = Ke, dn = Ne;
function _n(e, t, r, a) {
  var o = !r;
  r || (r = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var n = t[i], c = a ? a(r[n], e[n], n, r, e) : void 0;
    c === void 0 && (c = e[n]), o ? dn(r, n, c) : $n(r, n, c);
  }
  return r;
}
var K = _n;
function Tn(e, t) {
  for (var r = -1, a = Array(e); ++r < e; )
    a[r] = t(r);
  return a;
}
var jn = Tn;
function On(e) {
  return e != null && typeof e == "object";
}
var I = On, An = B, mn = I, Sn = "[object Arguments]";
function Cn(e) {
  return mn(e) && An(e) == Sn;
}
var wn = Cn, ye = wn, In = I, He = Object.prototype, Pn = He.hasOwnProperty, xn = He.propertyIsEnumerable, En = ye(function() {
  return arguments;
}()) ? ye : function(e) {
  return In(e) && Pn.call(e, "callee") && !xn.call(e, "callee");
}, Mn = En, Ln = Array.isArray, X = Ln, M = { exports: {} };
function Dn() {
  return !1;
}
var Fn = Dn;
M.exports;
(function(e, t) {
  var r = g, a = Fn, o = t && !t.nodeType && t, i = o && !0 && e && !e.nodeType && e, s = i && i.exports === o, n = s ? r.Buffer : void 0, c = n ? n.isBuffer : void 0, u = c || a;
  e.exports = u;
})(M, M.exports);
var Re = M.exports, Gn = 9007199254740991, Bn = /^(?:0|[1-9]\d*)$/;
function Un(e, t) {
  var r = typeof e;
  return t = t ?? Gn, !!t && (r == "number" || r != "symbol" && Bn.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Nn = Un, Kn = 9007199254740991;
function Hn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Kn;
}
var Ve = Hn, Rn = B, Vn = Ve, zn = I, kn = "[object Arguments]", Wn = "[object Array]", qn = "[object Boolean]", Yn = "[object Date]", Jn = "[object Error]", Xn = "[object Function]", Zn = "[object Map]", Qn = "[object Number]", eo = "[object Object]", to = "[object RegExp]", ro = "[object Set]", ao = "[object String]", no = "[object WeakMap]", oo = "[object ArrayBuffer]", so = "[object DataView]", io = "[object Float32Array]", co = "[object Float64Array]", uo = "[object Int8Array]", fo = "[object Int16Array]", lo = "[object Int32Array]", po = "[object Uint8Array]", vo = "[object Uint8ClampedArray]", yo = "[object Uint16Array]", go = "[object Uint32Array]", l = {};
l[io] = l[co] = l[uo] = l[fo] = l[lo] = l[po] = l[vo] = l[yo] = l[go] = !0;
l[kn] = l[Wn] = l[oo] = l[qn] = l[so] = l[Yn] = l[Jn] = l[Xn] = l[Zn] = l[Qn] = l[eo] = l[to] = l[ro] = l[ao] = l[no] = !1;
function bo(e) {
  return zn(e) && Vn(e.length) && !!l[Rn(e)];
}
var ho = bo;
function $o(e) {
  return function(t) {
    return e(t);
  };
}
var Z = $o, L = { exports: {} };
L.exports;
(function(e, t) {
  var r = Fe, a = t && !t.nodeType && t, o = a && !0 && e && !e.nodeType && e, i = o && o.exports === a, s = i && r.process, n = function() {
    try {
      var c = o && o.require && o.require("util").types;
      return c || s && s.binding && s.binding("util");
    } catch {
    }
  }();
  e.exports = n;
})(L, L.exports);
var Q = L.exports, _o = ho, To = Z, ge = Q, be = ge && ge.isTypedArray, jo = be ? To(be) : _o, Oo = jo, Ao = jn, mo = Mn, So = X, Co = Re, wo = Nn, Io = Oo, Po = Object.prototype, xo = Po.hasOwnProperty;
function Eo(e, t) {
  var r = So(e), a = !r && mo(e), o = !r && !a && Co(e), i = !r && !a && !o && Io(e), s = r || a || o || i, n = s ? Ao(e.length, String) : [], c = n.length;
  for (var u in e)
    (t || xo.call(e, u)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    wo(u, c))) && n.push(u);
  return n;
}
var ze = Eo, Mo = Object.prototype;
function Lo(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Mo;
  return e === r;
}
var ee = Lo;
function Do(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ke = Do, Fo = ke, Go = Fo(Object.keys, Object), Bo = Go, Uo = ee, No = Bo, Ko = Object.prototype, Ho = Ko.hasOwnProperty;
function Ro(e) {
  if (!Uo(e))
    return No(e);
  var t = [];
  for (var r in Object(e))
    Ho.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Vo = Ro, zo = Be, ko = Ve;
function Wo(e) {
  return e != null && ko(e.length) && !zo(e);
}
var We = Wo, qo = ze, Yo = Vo, Jo = We;
function Xo(e) {
  return Jo(e) ? qo(e) : Yo(e);
}
var te = Xo, Zo = K, Qo = te;
function es(e, t) {
  return e && Zo(t, Qo(t), e);
}
var ts = es;
function rs(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var as = rs, ns = w, os = ee, ss = as, is = Object.prototype, cs = is.hasOwnProperty;
function us(e) {
  if (!ns(e))
    return ss(e);
  var t = os(e), r = [];
  for (var a in e)
    a == "constructor" && (t || !cs.call(e, a)) || r.push(a);
  return r;
}
var fs = us, ls = ze, ps = fs, vs = We;
function ys(e) {
  return vs(e) ? ls(e, !0) : ps(e);
}
var re = ys, gs = K, bs = re;
function hs(e, t) {
  return e && gs(t, bs(t), e);
}
var $s = hs, D = { exports: {} };
D.exports;
(function(e, t) {
  var r = g, a = t && !t.nodeType && t, o = a && !0 && e && !e.nodeType && e, i = o && o.exports === a, s = i ? r.Buffer : void 0, n = s ? s.allocUnsafe : void 0;
  function c(u, v) {
    if (v)
      return u.slice();
    var p = u.length, y = n ? n(p) : new u.constructor(p);
    return u.copy(y), y;
  }
  e.exports = c;
})(D, D.exports);
var ds = D.exports;
function _s(e, t) {
  var r = -1, a = e.length;
  for (t || (t = Array(a)); ++r < a; )
    t[r] = e[r];
  return t;
}
var Ts = _s;
function js(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length, o = 0, i = []; ++r < a; ) {
    var s = e[r];
    t(s, r, e) && (i[o++] = s);
  }
  return i;
}
var Os = js;
function As() {
  return [];
}
var qe = As, ms = Os, Ss = qe, Cs = Object.prototype, ws = Cs.propertyIsEnumerable, he = Object.getOwnPropertySymbols, Is = he ? function(e) {
  return e == null ? [] : (e = Object(e), ms(he(e), function(t) {
    return ws.call(e, t);
  }));
} : Ss, ae = Is, Ps = K, xs = ae;
function Es(e, t) {
  return Ps(e, xs(e), t);
}
var Ms = Es;
function Ls(e, t) {
  for (var r = -1, a = t.length, o = e.length; ++r < a; )
    e[o + r] = t[r];
  return e;
}
var Ye = Ls, Ds = ke, Fs = Ds(Object.getPrototypeOf, Object), Je = Fs, Gs = Ye, Bs = Je, Us = ae, Ns = qe, Ks = Object.getOwnPropertySymbols, Hs = Ks ? function(e) {
  for (var t = []; e; )
    Gs(t, Us(e)), e = Bs(e);
  return t;
} : Ns, Xe = Hs, Rs = K, Vs = Xe;
function zs(e, t) {
  return Rs(e, Vs(e), t);
}
var ks = zs, Ws = Ye, qs = X;
function Ys(e, t, r) {
  var a = t(e);
  return qs(e) ? a : Ws(a, r(e));
}
var Ze = Ys, Js = Ze, Xs = ae, Zs = te;
function Qs(e) {
  return Js(e, Zs, Xs);
}
var ei = Qs, ti = Ze, ri = Xe, ai = re;
function ni(e) {
  return ti(e, ai, ri);
}
var oi = ni, si = d, ii = g, ci = si(ii, "DataView"), ui = ci, fi = d, li = g, pi = fi(li, "Promise"), vi = pi, yi = d, gi = g, bi = yi(gi, "Set"), hi = bi, $i = d, di = g, _i = $i(di, "WeakMap"), Ti = _i, R = ui, V = J, z = vi, k = hi, W = Ti, Qe = B, m = Ue, $e = "[object Map]", ji = "[object Object]", de = "[object Promise]", _e = "[object Set]", Te = "[object WeakMap]", je = "[object DataView]", Oi = m(R), Ai = m(V), mi = m(z), Si = m(k), Ci = m(W), $ = Qe;
(R && $(new R(new ArrayBuffer(1))) != je || V && $(new V()) != $e || z && $(z.resolve()) != de || k && $(new k()) != _e || W && $(new W()) != Te) && ($ = function(e) {
  var t = Qe(e), r = t == ji ? e.constructor : void 0, a = r ? m(r) : "";
  if (a)
    switch (a) {
      case Oi:
        return je;
      case Ai:
        return $e;
      case mi:
        return de;
      case Si:
        return _e;
      case Ci:
        return Te;
    }
  return t;
});
var ne = $, wi = Object.prototype, Ii = wi.hasOwnProperty;
function Pi(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Ii.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var xi = Pi, Ei = g, Mi = Ei.Uint8Array, Li = Mi, Oe = Li;
function Di(e) {
  var t = new e.constructor(e.byteLength);
  return new Oe(t).set(new Oe(e)), t;
}
var oe = Di, Fi = oe;
function Gi(e, t) {
  var r = t ? Fi(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Bi = Gi, Ui = /\w*$/;
function Ni(e) {
  var t = new e.constructor(e.source, Ui.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Ki = Ni, Ae = Y, me = Ae ? Ae.prototype : void 0, Se = me ? me.valueOf : void 0;
function Hi(e) {
  return Se ? Object(Se.call(e)) : {};
}
var Ri = Hi, Vi = oe;
function zi(e, t) {
  var r = t ? Vi(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var ki = zi, Wi = oe, qi = Bi, Yi = Ki, Ji = Ri, Xi = ki, Zi = "[object Boolean]", Qi = "[object Date]", ec = "[object Map]", tc = "[object Number]", rc = "[object RegExp]", ac = "[object Set]", nc = "[object String]", oc = "[object Symbol]", sc = "[object ArrayBuffer]", ic = "[object DataView]", cc = "[object Float32Array]", uc = "[object Float64Array]", fc = "[object Int8Array]", lc = "[object Int16Array]", pc = "[object Int32Array]", vc = "[object Uint8Array]", yc = "[object Uint8ClampedArray]", gc = "[object Uint16Array]", bc = "[object Uint32Array]";
function hc(e, t, r) {
  var a = e.constructor;
  switch (t) {
    case sc:
      return Wi(e);
    case Zi:
    case Qi:
      return new a(+e);
    case ic:
      return qi(e, r);
    case cc:
    case uc:
    case fc:
    case lc:
    case pc:
    case vc:
    case yc:
    case gc:
    case bc:
      return Xi(e, r);
    case ec:
      return new a();
    case tc:
    case nc:
      return new a(e);
    case rc:
      return Yi(e);
    case ac:
      return new a();
    case oc:
      return Ji(e);
  }
}
var $c = hc, dc = w, Ce = Object.create, _c = function() {
  function e() {
  }
  return function(t) {
    if (!dc(t))
      return {};
    if (Ce)
      return Ce(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Tc = _c, jc = Tc, Oc = Je, Ac = ee;
function mc(e) {
  return typeof e.constructor == "function" && !Ac(e) ? jc(Oc(e)) : {};
}
var Sc = mc, Cc = ne, wc = I, Ic = "[object Map]";
function Pc(e) {
  return wc(e) && Cc(e) == Ic;
}
var xc = Pc, Ec = xc, Mc = Z, we = Q, Ie = we && we.isMap, Lc = Ie ? Mc(Ie) : Ec, Dc = Lc, Fc = ne, Gc = I, Bc = "[object Set]";
function Uc(e) {
  return Gc(e) && Fc(e) == Bc;
}
var Nc = Uc, Kc = Nc, Hc = Z, Pe = Q, xe = Pe && Pe.isSet, Rc = xe ? Hc(xe) : Kc, Vc = Rc, zc = on, kc = cn, Wc = Ke, qc = ts, Yc = $s, Jc = ds, Xc = Ts, Zc = Ms, Qc = ks, eu = ei, tu = oi, ru = ne, au = xi, nu = $c, ou = Sc, su = X, iu = Re, cu = Dc, uu = w, fu = Vc, lu = te, pu = re, vu = 1, yu = 2, gu = 4, et = "[object Arguments]", bu = "[object Array]", hu = "[object Boolean]", $u = "[object Date]", du = "[object Error]", tt = "[object Function]", _u = "[object GeneratorFunction]", Tu = "[object Map]", ju = "[object Number]", rt = "[object Object]", Ou = "[object RegExp]", Au = "[object Set]", mu = "[object String]", Su = "[object Symbol]", Cu = "[object WeakMap]", wu = "[object ArrayBuffer]", Iu = "[object DataView]", Pu = "[object Float32Array]", xu = "[object Float64Array]", Eu = "[object Int8Array]", Mu = "[object Int16Array]", Lu = "[object Int32Array]", Du = "[object Uint8Array]", Fu = "[object Uint8ClampedArray]", Gu = "[object Uint16Array]", Bu = "[object Uint32Array]", f = {};
f[et] = f[bu] = f[wu] = f[Iu] = f[hu] = f[$u] = f[Pu] = f[xu] = f[Eu] = f[Mu] = f[Lu] = f[Tu] = f[ju] = f[rt] = f[Ou] = f[Au] = f[mu] = f[Su] = f[Du] = f[Fu] = f[Gu] = f[Bu] = !0;
f[du] = f[tt] = f[Cu] = !1;
function E(e, t, r, a, o, i) {
  var s, n = t & vu, c = t & yu, u = t & gu;
  if (r && (s = o ? r(e, a, o, i) : r(e)), s !== void 0)
    return s;
  if (!uu(e))
    return e;
  var v = su(e);
  if (v) {
    if (s = au(e), !n)
      return Xc(e, s);
  } else {
    var p = ru(e), y = p == tt || p == _u;
    if (iu(e))
      return Jc(e, n);
    if (p == rt || p == et || y && !o) {
      if (s = c || y ? {} : ou(e), !n)
        return c ? Qc(e, Yc(s, e)) : Zc(e, qc(s, e));
    } else {
      if (!f[p])
        return o ? e : {};
      s = nu(e, p, n);
    }
  }
  i || (i = new zc());
  var S = i.get(e);
  if (S)
    return S;
  i.set(e, s), fu(e) ? e.forEach(function(b) {
    s.add(E(b, t, r, b, e, i));
  }) : cu(e) && e.forEach(function(b, h) {
    s.set(h, E(b, t, r, h, e, i));
  });
  var P = u ? c ? tu : eu : c ? pu : lu, se = v ? void 0 : P(e);
  return kc(se || e, function(b, h) {
    se && (h = b, b = e[h]), Wc(s, h, E(b, t, r, h, e, i));
  }), s;
}
var Uu = E, Nu = Uu, Ku = 1, Hu = 4;
function Ru(e) {
  return Nu(e, Ku | Hu);
}
var Vu = Ru;
const zu = /* @__PURE__ */ pt(Vu), Ee = function() {
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
        isObject: ct,
        isObjectArray: lt
      }, v = zu(n), p = Object.keys(u).reduce((S, P) => !S && _[P](v) ? u[P] : S, null);
      if (p === null)
        throw new Error("Cannot convert input to table");
      const y = i(p(v), this);
      return c.returnOnly || console.log(y), y;
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
function ku(e) {
  return (e == null ? void 0 : e.polyfill) || !1 ? new Ee().polyfill() : new Ee();
}
export {
  ku as init
};
