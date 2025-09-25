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
    const u = c.map((p) => (p + "").length);
    return n.length ? n.map((p, g) => p < u[g] ? u[g] : p) : u;
  }, []);
  return e.reduce(
    (n, c, u) => {
      const p = c.map((g, v) => nt(g, i[v]));
      return n.length && (n += `
`), u === 1 && (n += `|${p.map((g) => g.replace(/\|/g, "-")).join("|").replace(/[^|]/g, "-")}|
`.replace(/\|-/g, "| ").replace(/-\|/g, " |")), n + `|${p.join("|")}|`;
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
    n.forEach(([u, p]) => {
      u in t || (t[u] = ++r, a.push(u)), c[t[u]] = p;
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
function lt(e, t, ...r) {
  return e ? null : `Assertion failed: ${pt(t, ...r)}`;
}
function pt(e, ...t) {
  if (!t.length)
    return e;
  const r = /%[a-zA-Z]/g, a = [...e.matchAll(r)];
  a.length > t.length && (a.length = t.length), t.length > a.length && (t.length = a.length);
  for (let o = t.length - 1; o >= 0; o--) {
    let i = t[o];
    const s = a[o], n = s[0], { index: c } = s, u = {
      "%s": String,
      "%i": parseInt,
      "%O": (p) => JSON.stringify(p),
      "%o": (p) => JSON.stringify(p, null, 2)
    };
    u[n] && (i = u[n](i)), e = e.substring(0, c) + i + e.substring(c + 2);
  }
  return e;
}
var x = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function vt() {
  this.__data__ = [], this.size = 0;
}
var yt = vt;
function bt(e, t) {
  return e === t || e !== e && t !== t;
}
var Le = bt, ht = Le;
function $t(e, t) {
  for (var r = e.length; r--; )
    if (ht(e[r][0], t))
      return r;
  return -1;
}
var F = $t, dt = F, _t = Array.prototype, Tt = _t.splice;
function jt(e) {
  var t = this.__data__, r = dt(t, e);
  if (r < 0)
    return !1;
  var a = t.length - 1;
  return r == a ? t.pop() : Tt.call(t, r, 1), --this.size, !0;
}
var Ot = jt, At = F;
function mt(e) {
  var t = this.__data__, r = At(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var St = mt, Ct = F;
function It(e) {
  return Ct(this.__data__, e) > -1;
}
var wt = It, Pt = F;
function xt(e, t) {
  var r = this.__data__, a = Pt(r, e);
  return a < 0 ? (++this.size, r.push([e, t])) : r[a][1] = t, this;
}
var Et = xt, Mt = yt, Lt = Ot, Dt = St, Ft = wt, Gt = Et;
function T(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
T.prototype.clear = Mt;
T.prototype.delete = Lt;
T.prototype.get = Dt;
T.prototype.has = Ft;
T.prototype.set = Gt;
var G = T, Bt = G;
function Nt() {
  this.__data__ = new Bt(), this.size = 0;
}
var Ut = Nt;
function Kt(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var Ht = Kt;
function Rt(e) {
  return this.__data__.get(e);
}
var Vt = Rt;
function zt(e) {
  return this.__data__.has(e);
}
var kt = zt, Wt = typeof x == "object" && x && x.Object === Object && x, De = Wt, qt = De, Jt = typeof self == "object" && self && self.Object === Object && self, Yt = qt || Jt || Function("return this")(), y = Yt, Xt = y, Zt = Xt.Symbol, J = Zt, ie = J, Fe = Object.prototype, Qt = Fe.hasOwnProperty, er = Fe.toString, C = ie ? ie.toStringTag : void 0;
function tr(e) {
  var t = Qt.call(e, C), r = e[C];
  try {
    e[C] = void 0;
    var a = !0;
  } catch {
  }
  var o = er.call(e);
  return a && (t ? e[C] = r : delete e[C]), o;
}
var rr = tr, ar = Object.prototype, nr = ar.toString;
function or(e) {
  return nr.call(e);
}
var sr = or, ce = J, ir = rr, cr = sr, ur = "[object Null]", fr = "[object Undefined]", ue = ce ? ce.toStringTag : void 0;
function lr(e) {
  return e == null ? e === void 0 ? fr : ur : ue && ue in Object(e) ? ir(e) : cr(e);
}
var B = lr;
function pr(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var I = pr, gr = B, vr = I, yr = "[object AsyncFunction]", br = "[object Function]", hr = "[object GeneratorFunction]", $r = "[object Proxy]";
function dr(e) {
  if (!vr(e))
    return !1;
  var t = gr(e);
  return t == br || t == hr || t == yr || t == $r;
}
var Ge = dr, _r = y, Tr = _r["__core-js_shared__"], jr = Tr, H = jr, fe = function() {
  var e = /[^.]+$/.exec(H && H.keys && H.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Or(e) {
  return !!fe && fe in e;
}
var Ar = Or, mr = Function.prototype, Sr = mr.toString;
function Cr(e) {
  if (e != null) {
    try {
      return Sr.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Be = Cr, Ir = Ge, wr = Ar, Pr = I, xr = Be, Er = /[\\^$.*+?()[\]{}|]/g, Mr = /^\[object .+?Constructor\]$/, Lr = Function.prototype, Dr = Object.prototype, Fr = Lr.toString, Gr = Dr.hasOwnProperty, Br = RegExp(
  "^" + Fr.call(Gr).replace(Er, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Nr(e) {
  if (!Pr(e) || wr(e))
    return !1;
  var t = Ir(e) ? Br : Mr;
  return t.test(xr(e));
}
var Ur = Nr;
function Kr(e, t) {
  return e == null ? void 0 : e[t];
}
var Hr = Kr, Rr = Ur, Vr = Hr;
function zr(e, t) {
  var r = Vr(e, t);
  return Rr(r) ? r : void 0;
}
var d = zr, kr = d, Wr = y, qr = kr(Wr, "Map"), Y = qr, Jr = d, Yr = Jr(Object, "create"), N = Yr, le = N;
function Xr() {
  this.__data__ = le ? le(null) : {}, this.size = 0;
}
var Zr = Xr;
function Qr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ea = Qr, ta = N, ra = "__lodash_hash_undefined__", aa = Object.prototype, na = aa.hasOwnProperty;
function oa(e) {
  var t = this.__data__;
  if (ta) {
    var r = t[e];
    return r === ra ? void 0 : r;
  }
  return na.call(t, e) ? t[e] : void 0;
}
var sa = oa, ia = N, ca = Object.prototype, ua = ca.hasOwnProperty;
function fa(e) {
  var t = this.__data__;
  return ia ? t[e] !== void 0 : ua.call(t, e);
}
var la = fa, pa = N, ga = "__lodash_hash_undefined__";
function va(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = pa && t === void 0 ? ga : t, this;
}
var ya = va, ba = Zr, ha = ea, $a = sa, da = la, _a = ya;
function j(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
j.prototype.clear = ba;
j.prototype.delete = ha;
j.prototype.get = $a;
j.prototype.has = da;
j.prototype.set = _a;
var Ta = j, pe = Ta, ja = G, Oa = Y;
function Aa() {
  this.size = 0, this.__data__ = {
    hash: new pe(),
    map: new (Oa || ja)(),
    string: new pe()
  };
}
var ma = Aa;
function Sa(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Ca = Sa, Ia = Ca;
function wa(e, t) {
  var r = e.__data__;
  return Ia(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var U = wa, Pa = U;
function xa(e) {
  var t = Pa(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Ea = xa, Ma = U;
function La(e) {
  return Ma(this, e).get(e);
}
var Da = La, Fa = U;
function Ga(e) {
  return Fa(this, e).has(e);
}
var Ba = Ga, Na = U;
function Ua(e, t) {
  var r = Na(this, e), a = r.size;
  return r.set(e, t), this.size += r.size == a ? 0 : 1, this;
}
var Ka = Ua, Ha = ma, Ra = Ea, Va = Da, za = Ba, ka = Ka;
function O(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
O.prototype.clear = Ha;
O.prototype.delete = Ra;
O.prototype.get = Va;
O.prototype.has = za;
O.prototype.set = ka;
var Wa = O, qa = G, Ja = Y, Ya = Wa, Xa = 200;
function Za(e, t) {
  var r = this.__data__;
  if (r instanceof qa) {
    var a = r.__data__;
    if (!Ja || a.length < Xa - 1)
      return a.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Ya(a);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Qa = Za, en = G, tn = Ut, rn = Ht, an = Vt, nn = kt, on = Qa;
function A(e) {
  var t = this.__data__ = new en(e);
  this.size = t.size;
}
A.prototype.clear = tn;
A.prototype.delete = rn;
A.prototype.get = an;
A.prototype.has = nn;
A.prototype.set = on;
var sn = A;
function cn(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length; ++r < a && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var un = cn, fn = d, ln = function() {
  try {
    var e = fn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), pn = ln, ge = pn;
function gn(e, t, r) {
  t == "__proto__" && ge ? ge(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Ne = gn, vn = Ne, yn = Le, bn = Object.prototype, hn = bn.hasOwnProperty;
function $n(e, t, r) {
  var a = e[t];
  (!(hn.call(e, t) && yn(a, r)) || r === void 0 && !(t in e)) && vn(e, t, r);
}
var Ue = $n, dn = Ue, _n = Ne;
function Tn(e, t, r, a) {
  var o = !r;
  r || (r = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var n = t[i], c = a ? a(r[n], e[n], n, r, e) : void 0;
    c === void 0 && (c = e[n]), o ? _n(r, n, c) : dn(r, n, c);
  }
  return r;
}
var K = Tn;
function jn(e, t) {
  for (var r = -1, a = Array(e); ++r < e; )
    a[r] = t(r);
  return a;
}
var On = jn;
function An(e) {
  return e != null && typeof e == "object";
}
var w = An, mn = B, Sn = w, Cn = "[object Arguments]";
function In(e) {
  return Sn(e) && mn(e) == Cn;
}
var wn = In, ve = wn, Pn = w, Ke = Object.prototype, xn = Ke.hasOwnProperty, En = Ke.propertyIsEnumerable, Mn = ve(function() {
  return arguments;
}()) ? ve : function(e) {
  return Pn(e) && xn.call(e, "callee") && !En.call(e, "callee");
}, Ln = Mn, Dn = Array.isArray, X = Dn, M = { exports: {} };
function Fn() {
  return !1;
}
var Gn = Fn;
M.exports;
(function(e, t) {
  var r = y, a = Gn, o = t && !t.nodeType && t, i = o && !0 && e && !e.nodeType && e, s = i && i.exports === o, n = s ? r.Buffer : void 0, c = n ? n.isBuffer : void 0, u = c || a;
  e.exports = u;
})(M, M.exports);
var He = M.exports, Bn = 9007199254740991, Nn = /^(?:0|[1-9]\d*)$/;
function Un(e, t) {
  var r = typeof e;
  return t = t ?? Bn, !!t && (r == "number" || r != "symbol" && Nn.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Kn = Un, Hn = 9007199254740991;
function Rn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Hn;
}
var Re = Rn, Vn = B, zn = Re, kn = w, Wn = "[object Arguments]", qn = "[object Array]", Jn = "[object Boolean]", Yn = "[object Date]", Xn = "[object Error]", Zn = "[object Function]", Qn = "[object Map]", eo = "[object Number]", to = "[object Object]", ro = "[object RegExp]", ao = "[object Set]", no = "[object String]", oo = "[object WeakMap]", so = "[object ArrayBuffer]", io = "[object DataView]", co = "[object Float32Array]", uo = "[object Float64Array]", fo = "[object Int8Array]", lo = "[object Int16Array]", po = "[object Int32Array]", go = "[object Uint8Array]", vo = "[object Uint8ClampedArray]", yo = "[object Uint16Array]", bo = "[object Uint32Array]", l = {};
l[co] = l[uo] = l[fo] = l[lo] = l[po] = l[go] = l[vo] = l[yo] = l[bo] = !0;
l[Wn] = l[qn] = l[so] = l[Jn] = l[io] = l[Yn] = l[Xn] = l[Zn] = l[Qn] = l[eo] = l[to] = l[ro] = l[ao] = l[no] = l[oo] = !1;
function ho(e) {
  return kn(e) && zn(e.length) && !!l[Vn(e)];
}
var $o = ho;
function _o(e) {
  return function(t) {
    return e(t);
  };
}
var Z = _o, L = { exports: {} };
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
var Q = L.exports, To = $o, jo = Z, ye = Q, be = ye && ye.isTypedArray, Oo = be ? jo(be) : To, Ao = Oo, mo = On, So = Ln, Co = X, Io = He, wo = Kn, Po = Ao, xo = Object.prototype, Eo = xo.hasOwnProperty;
function Mo(e, t) {
  var r = Co(e), a = !r && So(e), o = !r && !a && Io(e), i = !r && !a && !o && Po(e), s = r || a || o || i, n = s ? mo(e.length, String) : [], c = n.length;
  for (var u in e)
    (t || Eo.call(e, u)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    wo(u, c))) && n.push(u);
  return n;
}
var Ve = Mo, Lo = Object.prototype;
function Do(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Lo;
  return e === r;
}
var ee = Do;
function Fo(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ze = Fo, Go = ze, Bo = Go(Object.keys, Object), No = Bo, Uo = ee, Ko = No, Ho = Object.prototype, Ro = Ho.hasOwnProperty;
function Vo(e) {
  if (!Uo(e))
    return Ko(e);
  var t = [];
  for (var r in Object(e))
    Ro.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var zo = Vo, ko = Ge, Wo = Re;
function qo(e) {
  return e != null && Wo(e.length) && !ko(e);
}
var ke = qo, Jo = Ve, Yo = zo, Xo = ke;
function Zo(e) {
  return Xo(e) ? Jo(e) : Yo(e);
}
var te = Zo, Qo = K, es = te;
function ts(e, t) {
  return e && Qo(t, es(t), e);
}
var rs = ts;
function as(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var ns = as, os = I, ss = ee, is = ns, cs = Object.prototype, us = cs.hasOwnProperty;
function fs(e) {
  if (!os(e))
    return is(e);
  var t = ss(e), r = [];
  for (var a in e)
    a == "constructor" && (t || !us.call(e, a)) || r.push(a);
  return r;
}
var ls = fs, ps = Ve, gs = ls, vs = ke;
function ys(e) {
  return vs(e) ? ps(e, !0) : gs(e);
}
var re = ys, bs = K, hs = re;
function $s(e, t) {
  return e && bs(t, hs(t), e);
}
var ds = $s, D = { exports: {} };
D.exports;
(function(e, t) {
  var r = y, a = t && !t.nodeType && t, o = a && !0 && e && !e.nodeType && e, i = o && o.exports === a, s = i ? r.Buffer : void 0, n = s ? s.allocUnsafe : void 0;
  function c(u, p) {
    if (p)
      return u.slice();
    var g = u.length, v = n ? n(g) : new u.constructor(g);
    return u.copy(v), v;
  }
  e.exports = c;
})(D, D.exports);
var _s = D.exports;
function Ts(e, t) {
  var r = -1, a = e.length;
  for (t || (t = Array(a)); ++r < a; )
    t[r] = e[r];
  return t;
}
var js = Ts;
function Os(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length, o = 0, i = []; ++r < a; ) {
    var s = e[r];
    t(s, r, e) && (i[o++] = s);
  }
  return i;
}
var As = Os;
function ms() {
  return [];
}
var We = ms, Ss = As, Cs = We, Is = Object.prototype, ws = Is.propertyIsEnumerable, he = Object.getOwnPropertySymbols, Ps = he ? function(e) {
  return e == null ? [] : (e = Object(e), Ss(he(e), function(t) {
    return ws.call(e, t);
  }));
} : Cs, ae = Ps, xs = K, Es = ae;
function Ms(e, t) {
  return xs(e, Es(e), t);
}
var Ls = Ms;
function Ds(e, t) {
  for (var r = -1, a = t.length, o = e.length; ++r < a; )
    e[o + r] = t[r];
  return e;
}
var qe = Ds, Fs = ze, Gs = Fs(Object.getPrototypeOf, Object), Je = Gs, Bs = qe, Ns = Je, Us = ae, Ks = We, Hs = Object.getOwnPropertySymbols, Rs = Hs ? function(e) {
  for (var t = []; e; )
    Bs(t, Us(e)), e = Ns(e);
  return t;
} : Ks, Ye = Rs, Vs = K, zs = Ye;
function ks(e, t) {
  return Vs(e, zs(e), t);
}
var Ws = ks, qs = qe, Js = X;
function Ys(e, t, r) {
  var a = t(e);
  return Js(e) ? a : qs(a, r(e));
}
var Xe = Ys, Xs = Xe, Zs = ae, Qs = te;
function ei(e) {
  return Xs(e, Qs, Zs);
}
var ti = ei, ri = Xe, ai = Ye, ni = re;
function oi(e) {
  return ri(e, ni, ai);
}
var si = oi, ii = d, ci = y, ui = ii(ci, "DataView"), fi = ui, li = d, pi = y, gi = li(pi, "Promise"), vi = gi, yi = d, bi = y, hi = yi(bi, "Set"), $i = hi, di = d, _i = y, Ti = di(_i, "WeakMap"), ji = Ti, R = fi, V = Y, z = vi, k = $i, W = ji, Ze = B, m = Be, $e = "[object Map]", Oi = "[object Object]", de = "[object Promise]", _e = "[object Set]", Te = "[object WeakMap]", je = "[object DataView]", Ai = m(R), mi = m(V), Si = m(z), Ci = m(k), Ii = m(W), $ = Ze;
(R && $(new R(new ArrayBuffer(1))) != je || V && $(new V()) != $e || z && $(z.resolve()) != de || k && $(new k()) != _e || W && $(new W()) != Te) && ($ = function(e) {
  var t = Ze(e), r = t == Oi ? e.constructor : void 0, a = r ? m(r) : "";
  if (a)
    switch (a) {
      case Ai:
        return je;
      case mi:
        return $e;
      case Si:
        return de;
      case Ci:
        return _e;
      case Ii:
        return Te;
    }
  return t;
});
var ne = $, wi = Object.prototype, Pi = wi.hasOwnProperty;
function xi(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Pi.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var Ei = xi, Mi = y, Li = Mi.Uint8Array, Di = Li, Oe = Di;
function Fi(e) {
  var t = new e.constructor(e.byteLength);
  return new Oe(t).set(new Oe(e)), t;
}
var oe = Fi, Gi = oe;
function Bi(e, t) {
  var r = t ? Gi(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Ni = Bi, Ui = /\w*$/;
function Ki(e) {
  var t = new e.constructor(e.source, Ui.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Hi = Ki, Ae = J, me = Ae ? Ae.prototype : void 0, Se = me ? me.valueOf : void 0;
function Ri(e) {
  return Se ? Object(Se.call(e)) : {};
}
var Vi = Ri, zi = oe;
function ki(e, t) {
  var r = t ? zi(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Wi = ki, qi = oe, Ji = Ni, Yi = Hi, Xi = Vi, Zi = Wi, Qi = "[object Boolean]", ec = "[object Date]", tc = "[object Map]", rc = "[object Number]", ac = "[object RegExp]", nc = "[object Set]", oc = "[object String]", sc = "[object Symbol]", ic = "[object ArrayBuffer]", cc = "[object DataView]", uc = "[object Float32Array]", fc = "[object Float64Array]", lc = "[object Int8Array]", pc = "[object Int16Array]", gc = "[object Int32Array]", vc = "[object Uint8Array]", yc = "[object Uint8ClampedArray]", bc = "[object Uint16Array]", hc = "[object Uint32Array]";
function $c(e, t, r) {
  var a = e.constructor;
  switch (t) {
    case ic:
      return qi(e);
    case Qi:
    case ec:
      return new a(+e);
    case cc:
      return Ji(e, r);
    case uc:
    case fc:
    case lc:
    case pc:
    case gc:
    case vc:
    case yc:
    case bc:
    case hc:
      return Zi(e, r);
    case tc:
      return new a();
    case rc:
    case oc:
      return new a(e);
    case ac:
      return Yi(e);
    case nc:
      return new a();
    case sc:
      return Xi(e);
  }
}
var dc = $c, _c = I, Ce = Object.create, Tc = function() {
  function e() {
  }
  return function(t) {
    if (!_c(t))
      return {};
    if (Ce)
      return Ce(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), jc = Tc, Oc = jc, Ac = Je, mc = ee;
function Sc(e) {
  return typeof e.constructor == "function" && !mc(e) ? Oc(Ac(e)) : {};
}
var Cc = Sc, Ic = ne, wc = w, Pc = "[object Map]";
function xc(e) {
  return wc(e) && Ic(e) == Pc;
}
var Ec = xc, Mc = Ec, Lc = Z, Ie = Q, we = Ie && Ie.isMap, Dc = we ? Lc(we) : Mc, Fc = Dc, Gc = ne, Bc = w, Nc = "[object Set]";
function Uc(e) {
  return Bc(e) && Gc(e) == Nc;
}
var Kc = Uc, Hc = Kc, Rc = Z, Pe = Q, xe = Pe && Pe.isSet, Vc = xe ? Rc(xe) : Hc, zc = Vc, kc = sn, Wc = un, qc = Ue, Jc = rs, Yc = ds, Xc = _s, Zc = js, Qc = Ls, eu = Ws, tu = ti, ru = si, au = ne, nu = Ei, ou = dc, su = Cc, iu = X, cu = He, uu = Fc, fu = I, lu = zc, pu = te, gu = re, vu = 1, yu = 2, bu = 4, Qe = "[object Arguments]", hu = "[object Array]", $u = "[object Boolean]", du = "[object Date]", _u = "[object Error]", et = "[object Function]", Tu = "[object GeneratorFunction]", ju = "[object Map]", Ou = "[object Number]", tt = "[object Object]", Au = "[object RegExp]", mu = "[object Set]", Su = "[object String]", Cu = "[object Symbol]", Iu = "[object WeakMap]", wu = "[object ArrayBuffer]", Pu = "[object DataView]", xu = "[object Float32Array]", Eu = "[object Float64Array]", Mu = "[object Int8Array]", Lu = "[object Int16Array]", Du = "[object Int32Array]", Fu = "[object Uint8Array]", Gu = "[object Uint8ClampedArray]", Bu = "[object Uint16Array]", Nu = "[object Uint32Array]", f = {};
f[Qe] = f[hu] = f[wu] = f[Pu] = f[$u] = f[du] = f[xu] = f[Eu] = f[Mu] = f[Lu] = f[Du] = f[ju] = f[Ou] = f[tt] = f[Au] = f[mu] = f[Su] = f[Cu] = f[Fu] = f[Gu] = f[Bu] = f[Nu] = !0;
f[_u] = f[et] = f[Iu] = !1;
function E(e, t, r, a, o, i) {
  var s, n = t & vu, c = t & yu, u = t & bu;
  if (r && (s = o ? r(e, a, o, i) : r(e)), s !== void 0)
    return s;
  if (!fu(e))
    return e;
  var p = iu(e);
  if (p) {
    if (s = nu(e), !n)
      return Zc(e, s);
  } else {
    var g = au(e), v = g == et || g == Tu;
    if (cu(e))
      return Xc(e, n);
    if (g == tt || g == Qe || v && !o) {
      if (s = c || v ? {} : su(e), !n)
        return c ? eu(e, Yc(s, e)) : Qc(e, Jc(s, e));
    } else {
      if (!f[g])
        return o ? e : {};
      s = ou(e, g, n);
    }
  }
  i || (i = new kc());
  var S = i.get(e);
  if (S)
    return S;
  i.set(e, s), lu(e) ? e.forEach(function(b) {
    s.add(E(b, t, r, b, e, i));
  }) : uu(e) && e.forEach(function(b, h) {
    s.set(h, E(b, t, r, h, e, i));
  });
  var P = u ? c ? ru : tu : c ? gu : pu, se = p ? void 0 : P(e);
  return Wc(se || e, function(b, h) {
    se && (h = b, b = e[h]), qc(s, h, E(b, t, r, h, e, i));
  }), s;
}
var Uu = E, Ku = Uu, Hu = 1, Ru = 4;
function Vu(e) {
  return Ku(e, Hu | Ru);
}
var zu = Vu;
const ku = /* @__PURE__ */ gt(zu), Wu = function() {
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
      }, p = ku(n), g = Object.keys(u).reduce((S, P) => !S && _[P](p) ? u[P] : S, null);
      if (g === null)
        throw new Error("Cannot convert input to table");
      const v = i(g(p), this);
      return c.returnOnly || console.log(v), v;
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
    /**
     * Asserts that an expression is truthy. If the expression is falsy, an error message is logged to the console.
     * The error message can be formatted using printf-like placeholders.
     *
     * @param {any} expression - The expression to assert.
     * @param {string} message - The base error message. Can contain placeholders like %s, %i, %O, %o.
     * @param {...any} args - Arguments to substitute into the message placeholders.
     */
    assert(n, c, ...u) {
      lt(n, c) !== null && console.error(c);
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
  Wu as ConsolAS
};
