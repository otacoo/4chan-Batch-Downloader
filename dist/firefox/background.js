(() => {
  // src/vendor/jszip-esm.js
  var t = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
  var e = [];
  var r = [];
  var n = "undefined" != typeof Uint8Array ? Uint8Array : Array;
  var i = false;
  function a() {
    i = true;
    for (var t3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n2 = 0; n2 < 64; ++n2)
      e[n2] = t3[n2], r[t3.charCodeAt(n2)] = n2;
    r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63;
  }
  function s(t3, r2, n2) {
    for (var i2, a2, s2 = [], o2 = r2; o2 < n2; o2 += 3)
      i2 = (t3[o2] << 16) + (t3[o2 + 1] << 8) + t3[o2 + 2], s2.push(e[(a2 = i2) >> 18 & 63] + e[a2 >> 12 & 63] + e[a2 >> 6 & 63] + e[63 & a2]);
    return s2.join("");
  }
  function o(t3) {
    var r2;
    i || a();
    for (var n2 = t3.length, o2 = n2 % 3, h2 = "", u2 = [], f2 = 16383, l2 = 0, c2 = n2 - o2; l2 < c2; l2 += f2)
      u2.push(s(t3, l2, l2 + f2 > c2 ? c2 : l2 + f2));
    return 1 === o2 ? (r2 = t3[n2 - 1], h2 += e[r2 >> 2], h2 += e[r2 << 4 & 63], h2 += "==") : 2 === o2 && (r2 = (t3[n2 - 2] << 8) + t3[n2 - 1], h2 += e[r2 >> 10], h2 += e[r2 >> 4 & 63], h2 += e[r2 << 2 & 63], h2 += "="), u2.push(h2), u2.join("");
  }
  function h(t3, e2, r2, n2, i2) {
    var a2, s2, o2 = 8 * i2 - n2 - 1, h2 = (1 << o2) - 1, u2 = h2 >> 1, f2 = -7, l2 = r2 ? i2 - 1 : 0, c2 = r2 ? -1 : 1, d2 = t3[e2 + l2];
    for (l2 += c2, a2 = d2 & (1 << -f2) - 1, d2 >>= -f2, f2 += o2; f2 > 0; a2 = 256 * a2 + t3[e2 + l2], l2 += c2, f2 -= 8)
      ;
    for (s2 = a2 & (1 << -f2) - 1, a2 >>= -f2, f2 += n2; f2 > 0; s2 = 256 * s2 + t3[e2 + l2], l2 += c2, f2 -= 8)
      ;
    if (0 === a2)
      a2 = 1 - u2;
    else {
      if (a2 === h2)
        return s2 ? NaN : 1 / 0 * (d2 ? -1 : 1);
      s2 += Math.pow(2, n2), a2 -= u2;
    }
    return (d2 ? -1 : 1) * s2 * Math.pow(2, a2 - n2);
  }
  function u(t3, e2, r2, n2, i2, a2) {
    var s2, o2, h2, u2 = 8 * a2 - i2 - 1, f2 = (1 << u2) - 1, l2 = f2 >> 1, c2 = 23 === i2 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d2 = n2 ? 0 : a2 - 1, p2 = n2 ? 1 : -1, m2 = e2 < 0 || 0 === e2 && 1 / e2 < 0 ? 1 : 0;
    for (e2 = Math.abs(e2), isNaN(e2) || e2 === 1 / 0 ? (o2 = isNaN(e2) ? 1 : 0, s2 = f2) : (s2 = Math.floor(Math.log(e2) / Math.LN2), e2 * (h2 = Math.pow(2, -s2)) < 1 && (s2--, h2 *= 2), (e2 += s2 + l2 >= 1 ? c2 / h2 : c2 * Math.pow(2, 1 - l2)) * h2 >= 2 && (s2++, h2 /= 2), s2 + l2 >= f2 ? (o2 = 0, s2 = f2) : s2 + l2 >= 1 ? (o2 = (e2 * h2 - 1) * Math.pow(2, i2), s2 += l2) : (o2 = e2 * Math.pow(2, l2 - 1) * Math.pow(2, i2), s2 = 0)); i2 >= 8; t3[r2 + d2] = 255 & o2, d2 += p2, o2 /= 256, i2 -= 8)
      ;
    for (s2 = s2 << i2 | o2, u2 += i2; u2 > 0; t3[r2 + d2] = 255 & s2, d2 += p2, s2 /= 256, u2 -= 8)
      ;
    t3[r2 + d2 - p2] |= 128 * m2;
  }
  var f = {}.toString;
  var l = Array.isArray || function(t3) {
    return "[object Array]" == f.call(t3);
  };
  function c() {
    return p.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function d(t3, e2) {
    if (c() < e2)
      throw new RangeError("Invalid typed array length");
    return p.TYPED_ARRAY_SUPPORT ? (t3 = new Uint8Array(e2)).__proto__ = p.prototype : (null === t3 && (t3 = new p(e2)), t3.length = e2), t3;
  }
  function p(t3, e2, r2) {
    if (!(p.TYPED_ARRAY_SUPPORT || this instanceof p))
      return new p(t3, e2, r2);
    if ("number" == typeof t3) {
      if ("string" == typeof e2)
        throw new Error("If encoding is specified then the first argument must be a string");
      return _(this, t3);
    }
    return m(this, t3, e2, r2);
  }
  function m(t3, e2, r2, n2) {
    if ("number" == typeof e2)
      throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e2 instanceof ArrayBuffer ? function(t4, e3, r3, n3) {
      if (e3.byteLength, r3 < 0 || e3.byteLength < r3)
        throw new RangeError("'offset' is out of bounds");
      if (e3.byteLength < r3 + (n3 || 0))
        throw new RangeError("'length' is out of bounds");
      e3 = void 0 === r3 && void 0 === n3 ? new Uint8Array(e3) : void 0 === n3 ? new Uint8Array(e3, r3) : new Uint8Array(e3, r3, n3);
      p.TYPED_ARRAY_SUPPORT ? (t4 = e3).__proto__ = p.prototype : t4 = y(t4, e3);
      return t4;
    }(t3, e2, r2, n2) : "string" == typeof e2 ? function(t4, e3, r3) {
      "string" == typeof r3 && "" !== r3 || (r3 = "utf8");
      if (!p.isEncoding(r3))
        throw new TypeError('"encoding" must be a valid string encoding');
      var n3 = 0 | b(e3, r3);
      t4 = d(t4, n3);
      var i2 = t4.write(e3, r3);
      i2 !== n3 && (t4 = t4.slice(0, i2));
      return t4;
    }(t3, e2, r2) : function(t4, e3) {
      if (w(e3)) {
        var r3 = 0 | v(e3.length);
        return 0 === (t4 = d(t4, r3)).length || e3.copy(t4, 0, 0, r3), t4;
      }
      if (e3) {
        if ("undefined" != typeof ArrayBuffer && e3.buffer instanceof ArrayBuffer || "length" in e3)
          return "number" != typeof e3.length || (n3 = e3.length) != n3 ? d(t4, 0) : y(t4, e3);
        if ("Buffer" === e3.type && l(e3.data))
          return y(t4, e3.data);
      }
      var n3;
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }(t3, e2);
  }
  function g(t3) {
    if ("number" != typeof t3)
      throw new TypeError('"size" argument must be a number');
    if (t3 < 0)
      throw new RangeError('"size" argument must not be negative');
  }
  function _(t3, e2) {
    if (g(e2), t3 = d(t3, e2 < 0 ? 0 : 0 | v(e2)), !p.TYPED_ARRAY_SUPPORT)
      for (var r2 = 0; r2 < e2; ++r2)
        t3[r2] = 0;
    return t3;
  }
  function y(t3, e2) {
    var r2 = e2.length < 0 ? 0 : 0 | v(e2.length);
    t3 = d(t3, r2);
    for (var n2 = 0; n2 < r2; n2 += 1)
      t3[n2] = 255 & e2[n2];
    return t3;
  }
  function v(t3) {
    if (t3 >= c())
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + c().toString(16) + " bytes");
    return 0 | t3;
  }
  function w(t3) {
    return !(null == t3 || !t3._isBuffer);
  }
  function b(t3, e2) {
    if (w(t3))
      return t3.length;
    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t3) || t3 instanceof ArrayBuffer))
      return t3.byteLength;
    "string" != typeof t3 && (t3 = "" + t3);
    var r2 = t3.length;
    if (0 === r2)
      return 0;
    for (var n2 = false; ; )
      switch (e2) {
        case "ascii":
        case "latin1":
        case "binary":
          return r2;
        case "utf8":
        case "utf-8":
        case void 0:
          return X(t3).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * r2;
        case "hex":
          return r2 >>> 1;
        case "base64":
          return V(t3).length;
        default:
          if (n2)
            return X(t3).length;
          e2 = ("" + e2).toLowerCase(), n2 = true;
      }
  }
  function k(t3, e2, r2) {
    var n2 = false;
    if ((void 0 === e2 || e2 < 0) && (e2 = 0), e2 > this.length)
      return "";
    if ((void 0 === r2 || r2 > this.length) && (r2 = this.length), r2 <= 0)
      return "";
    if ((r2 >>>= 0) <= (e2 >>>= 0))
      return "";
    for (t3 || (t3 = "utf8"); ; )
      switch (t3) {
        case "hex":
          return F(this, e2, r2);
        case "utf8":
        case "utf-8":
          return B(this, e2, r2);
        case "ascii":
          return D(this, e2, r2);
        case "latin1":
        case "binary":
          return U(this, e2, r2);
        case "base64":
          return O(this, e2, r2);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return N(this, e2, r2);
        default:
          if (n2)
            throw new TypeError("Unknown encoding: " + t3);
          t3 = (t3 + "").toLowerCase(), n2 = true;
      }
  }
  function E(t3, e2, r2) {
    var n2 = t3[e2];
    t3[e2] = t3[r2], t3[r2] = n2;
  }
  function x(t3, e2, r2, n2, i2) {
    if (0 === t3.length)
      return -1;
    if ("string" == typeof r2 ? (n2 = r2, r2 = 0) : r2 > 2147483647 ? r2 = 2147483647 : r2 < -2147483648 && (r2 = -2147483648), r2 = +r2, isNaN(r2) && (r2 = i2 ? 0 : t3.length - 1), r2 < 0 && (r2 = t3.length + r2), r2 >= t3.length) {
      if (i2)
        return -1;
      r2 = t3.length - 1;
    } else if (r2 < 0) {
      if (!i2)
        return -1;
      r2 = 0;
    }
    if ("string" == typeof e2 && (e2 = p.from(e2, n2)), w(e2))
      return 0 === e2.length ? -1 : A(t3, e2, r2, n2, i2);
    if ("number" == typeof e2)
      return e2 &= 255, p.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i2 ? Uint8Array.prototype.indexOf.call(t3, e2, r2) : Uint8Array.prototype.lastIndexOf.call(t3, e2, r2) : A(t3, [e2], r2, n2, i2);
    throw new TypeError("val must be string, number or Buffer");
  }
  function A(t3, e2, r2, n2, i2) {
    var a2, s2 = 1, o2 = t3.length, h2 = e2.length;
    if (void 0 !== n2 && ("ucs2" === (n2 = String(n2).toLowerCase()) || "ucs-2" === n2 || "utf16le" === n2 || "utf-16le" === n2)) {
      if (t3.length < 2 || e2.length < 2)
        return -1;
      s2 = 2, o2 /= 2, h2 /= 2, r2 /= 2;
    }
    function u2(t4, e3) {
      return 1 === s2 ? t4[e3] : t4.readUInt16BE(e3 * s2);
    }
    if (i2) {
      var f2 = -1;
      for (a2 = r2; a2 < o2; a2++)
        if (u2(t3, a2) === u2(e2, -1 === f2 ? 0 : a2 - f2)) {
          if (-1 === f2 && (f2 = a2), a2 - f2 + 1 === h2)
            return f2 * s2;
        } else
          -1 !== f2 && (a2 -= a2 - f2), f2 = -1;
    } else
      for (r2 + h2 > o2 && (r2 = o2 - h2), a2 = r2; a2 >= 0; a2--) {
        for (var l2 = true, c2 = 0; c2 < h2; c2++)
          if (u2(t3, a2 + c2) !== u2(e2, c2)) {
            l2 = false;
            break;
          }
        if (l2)
          return a2;
      }
    return -1;
  }
  function S(t3, e2, r2, n2) {
    r2 = Number(r2) || 0;
    var i2 = t3.length - r2;
    n2 ? (n2 = Number(n2)) > i2 && (n2 = i2) : n2 = i2;
    var a2 = e2.length;
    if (a2 % 2 != 0)
      throw new TypeError("Invalid hex string");
    n2 > a2 / 2 && (n2 = a2 / 2);
    for (var s2 = 0; s2 < n2; ++s2) {
      var o2 = parseInt(e2.substr(2 * s2, 2), 16);
      if (isNaN(o2))
        return s2;
      t3[r2 + s2] = o2;
    }
    return s2;
  }
  function C(t3, e2, r2, n2) {
    return q(X(e2, t3.length - r2), t3, r2, n2);
  }
  function z(t3, e2, r2, n2) {
    return q(function(t4) {
      for (var e3 = [], r3 = 0; r3 < t4.length; ++r3)
        e3.push(255 & t4.charCodeAt(r3));
      return e3;
    }(e2), t3, r2, n2);
  }
  function R(t3, e2, r2, n2) {
    return z(t3, e2, r2, n2);
  }
  function I(t3, e2, r2, n2) {
    return q(V(e2), t3, r2, n2);
  }
  function T(t3, e2, r2, n2) {
    return q(function(t4, e3) {
      for (var r3, n3, i2, a2 = [], s2 = 0; s2 < t4.length && !((e3 -= 2) < 0); ++s2)
        n3 = (r3 = t4.charCodeAt(s2)) >> 8, i2 = r3 % 256, a2.push(i2), a2.push(n3);
      return a2;
    }(e2, t3.length - r2), t3, r2, n2);
  }
  function O(t3, e2, r2) {
    return 0 === e2 && r2 === t3.length ? o(t3) : o(t3.slice(e2, r2));
  }
  function B(t3, e2, r2) {
    r2 = Math.min(t3.length, r2);
    for (var n2 = [], i2 = e2; i2 < r2; ) {
      var a2, s2, o2, h2, u2 = t3[i2], f2 = null, l2 = u2 > 239 ? 4 : u2 > 223 ? 3 : u2 > 191 ? 2 : 1;
      if (i2 + l2 <= r2)
        switch (l2) {
          case 1:
            u2 < 128 && (f2 = u2);
            break;
          case 2:
            128 == (192 & (a2 = t3[i2 + 1])) && (h2 = (31 & u2) << 6 | 63 & a2) > 127 && (f2 = h2);
            break;
          case 3:
            a2 = t3[i2 + 1], s2 = t3[i2 + 2], 128 == (192 & a2) && 128 == (192 & s2) && (h2 = (15 & u2) << 12 | (63 & a2) << 6 | 63 & s2) > 2047 && (h2 < 55296 || h2 > 57343) && (f2 = h2);
            break;
          case 4:
            a2 = t3[i2 + 1], s2 = t3[i2 + 2], o2 = t3[i2 + 3], 128 == (192 & a2) && 128 == (192 & s2) && 128 == (192 & o2) && (h2 = (15 & u2) << 18 | (63 & a2) << 12 | (63 & s2) << 6 | 63 & o2) > 65535 && h2 < 1114112 && (f2 = h2);
        }
      null === f2 ? (f2 = 65533, l2 = 1) : f2 > 65535 && (f2 -= 65536, n2.push(f2 >>> 10 & 1023 | 55296), f2 = 56320 | 1023 & f2), n2.push(f2), i2 += l2;
    }
    return function(t4) {
      var e3 = t4.length;
      if (e3 <= P)
        return String.fromCharCode.apply(String, t4);
      var r3 = "", n3 = 0;
      for (; n3 < e3; )
        r3 += String.fromCharCode.apply(String, t4.slice(n3, n3 += P));
      return r3;
    }(n2);
  }
  p.TYPED_ARRAY_SUPPORT = void 0 === t.TYPED_ARRAY_SUPPORT || t.TYPED_ARRAY_SUPPORT, c(), p.poolSize = 8192, p._augment = function(t3) {
    return t3.__proto__ = p.prototype, t3;
  }, p.from = function(t3, e2, r2) {
    return m(null, t3, e2, r2);
  }, p.TYPED_ARRAY_SUPPORT && (p.prototype.__proto__ = Uint8Array.prototype, p.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && p[Symbol.species]), p.alloc = function(t3, e2, r2) {
    return function(t4, e3, r3, n2) {
      return g(e3), e3 <= 0 ? d(t4, e3) : void 0 !== r3 ? "string" == typeof n2 ? d(t4, e3).fill(r3, n2) : d(t4, e3).fill(r3) : d(t4, e3);
    }(null, t3, e2, r2);
  }, p.allocUnsafe = function(t3) {
    return _(null, t3);
  }, p.allocUnsafeSlow = function(t3) {
    return _(null, t3);
  }, p.isBuffer = function(t3) {
    return null != t3 && (!!t3._isBuffer || J(t3) || function(t4) {
      return "function" == typeof t4.readFloatLE && "function" == typeof t4.slice && J(t4.slice(0, 0));
    }(t3));
  }, p.compare = function(t3, e2) {
    if (!w(t3) || !w(e2))
      throw new TypeError("Arguments must be Buffers");
    if (t3 === e2)
      return 0;
    for (var r2 = t3.length, n2 = e2.length, i2 = 0, a2 = Math.min(r2, n2); i2 < a2; ++i2)
      if (t3[i2] !== e2[i2]) {
        r2 = t3[i2], n2 = e2[i2];
        break;
      }
    return r2 < n2 ? -1 : n2 < r2 ? 1 : 0;
  }, p.isEncoding = function(t3) {
    switch (String(t3).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, p.concat = function(t3, e2) {
    if (!l(t3))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === t3.length)
      return p.alloc(0);
    var r2;
    if (void 0 === e2)
      for (e2 = 0, r2 = 0; r2 < t3.length; ++r2)
        e2 += t3[r2].length;
    var n2 = p.allocUnsafe(e2), i2 = 0;
    for (r2 = 0; r2 < t3.length; ++r2) {
      var a2 = t3[r2];
      if (!w(a2))
        throw new TypeError('"list" argument must be an Array of Buffers');
      a2.copy(n2, i2), i2 += a2.length;
    }
    return n2;
  }, p.byteLength = b, p.prototype._isBuffer = true, p.prototype.swap16 = function() {
    var t3 = this.length;
    if (t3 % 2 != 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e2 = 0; e2 < t3; e2 += 2)
      E(this, e2, e2 + 1);
    return this;
  }, p.prototype.swap32 = function() {
    var t3 = this.length;
    if (t3 % 4 != 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e2 = 0; e2 < t3; e2 += 4)
      E(this, e2, e2 + 3), E(this, e2 + 1, e2 + 2);
    return this;
  }, p.prototype.swap64 = function() {
    var t3 = this.length;
    if (t3 % 8 != 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e2 = 0; e2 < t3; e2 += 8)
      E(this, e2, e2 + 7), E(this, e2 + 1, e2 + 6), E(this, e2 + 2, e2 + 5), E(this, e2 + 3, e2 + 4);
    return this;
  }, p.prototype.toString = function() {
    var t3 = 0 | this.length;
    return 0 === t3 ? "" : 0 === arguments.length ? B(this, 0, t3) : k.apply(this, arguments);
  }, p.prototype.equals = function(t3) {
    if (!w(t3))
      throw new TypeError("Argument must be a Buffer");
    return this === t3 || 0 === p.compare(this, t3);
  }, p.prototype.inspect = function() {
    var t3 = "";
    return this.length > 0 && (t3 = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), this.length > 50 && (t3 += " ... ")), "<Buffer " + t3 + ">";
  }, p.prototype.compare = function(t3, e2, r2, n2, i2) {
    if (!w(t3))
      throw new TypeError("Argument must be a Buffer");
    if (void 0 === e2 && (e2 = 0), void 0 === r2 && (r2 = t3 ? t3.length : 0), void 0 === n2 && (n2 = 0), void 0 === i2 && (i2 = this.length), e2 < 0 || r2 > t3.length || n2 < 0 || i2 > this.length)
      throw new RangeError("out of range index");
    if (n2 >= i2 && e2 >= r2)
      return 0;
    if (n2 >= i2)
      return -1;
    if (e2 >= r2)
      return 1;
    if (this === t3)
      return 0;
    for (var a2 = (i2 >>>= 0) - (n2 >>>= 0), s2 = (r2 >>>= 0) - (e2 >>>= 0), o2 = Math.min(a2, s2), h2 = this.slice(n2, i2), u2 = t3.slice(e2, r2), f2 = 0; f2 < o2; ++f2)
      if (h2[f2] !== u2[f2]) {
        a2 = h2[f2], s2 = u2[f2];
        break;
      }
    return a2 < s2 ? -1 : s2 < a2 ? 1 : 0;
  }, p.prototype.includes = function(t3, e2, r2) {
    return -1 !== this.indexOf(t3, e2, r2);
  }, p.prototype.indexOf = function(t3, e2, r2) {
    return x(this, t3, e2, r2, true);
  }, p.prototype.lastIndexOf = function(t3, e2, r2) {
    return x(this, t3, e2, r2, false);
  }, p.prototype.write = function(t3, e2, r2, n2) {
    if (void 0 === e2)
      n2 = "utf8", r2 = this.length, e2 = 0;
    else if (void 0 === r2 && "string" == typeof e2)
      n2 = e2, r2 = this.length, e2 = 0;
    else {
      if (!isFinite(e2))
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      e2 |= 0, isFinite(r2) ? (r2 |= 0, void 0 === n2 && (n2 = "utf8")) : (n2 = r2, r2 = void 0);
    }
    var i2 = this.length - e2;
    if ((void 0 === r2 || r2 > i2) && (r2 = i2), t3.length > 0 && (r2 < 0 || e2 < 0) || e2 > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    n2 || (n2 = "utf8");
    for (var a2 = false; ; )
      switch (n2) {
        case "hex":
          return S(this, t3, e2, r2);
        case "utf8":
        case "utf-8":
          return C(this, t3, e2, r2);
        case "ascii":
          return z(this, t3, e2, r2);
        case "latin1":
        case "binary":
          return R(this, t3, e2, r2);
        case "base64":
          return I(this, t3, e2, r2);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return T(this, t3, e2, r2);
        default:
          if (a2)
            throw new TypeError("Unknown encoding: " + n2);
          n2 = ("" + n2).toLowerCase(), a2 = true;
      }
  }, p.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  var P = 4096;
  function D(t3, e2, r2) {
    var n2 = "";
    r2 = Math.min(t3.length, r2);
    for (var i2 = e2; i2 < r2; ++i2)
      n2 += String.fromCharCode(127 & t3[i2]);
    return n2;
  }
  function U(t3, e2, r2) {
    var n2 = "";
    r2 = Math.min(t3.length, r2);
    for (var i2 = e2; i2 < r2; ++i2)
      n2 += String.fromCharCode(t3[i2]);
    return n2;
  }
  function F(t3, e2, r2) {
    var n2 = t3.length;
    (!e2 || e2 < 0) && (e2 = 0), (!r2 || r2 < 0 || r2 > n2) && (r2 = n2);
    for (var i2 = "", a2 = e2; a2 < r2; ++a2)
      i2 += K(t3[a2]);
    return i2;
  }
  function N(t3, e2, r2) {
    for (var n2 = t3.slice(e2, r2), i2 = "", a2 = 0; a2 < n2.length; a2 += 2)
      i2 += String.fromCharCode(n2[a2] + 256 * n2[a2 + 1]);
    return i2;
  }
  function L(t3, e2, r2) {
    if (t3 % 1 != 0 || t3 < 0)
      throw new RangeError("offset is not uint");
    if (t3 + e2 > r2)
      throw new RangeError("Trying to access beyond buffer length");
  }
  function j(t3, e2, r2, n2, i2, a2) {
    if (!w(t3))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e2 > i2 || e2 < a2)
      throw new RangeError('"value" argument is out of bounds');
    if (r2 + n2 > t3.length)
      throw new RangeError("Index out of range");
  }
  function M(t3, e2, r2, n2) {
    e2 < 0 && (e2 = 65535 + e2 + 1);
    for (var i2 = 0, a2 = Math.min(t3.length - r2, 2); i2 < a2; ++i2)
      t3[r2 + i2] = (e2 & 255 << 8 * (n2 ? i2 : 1 - i2)) >>> 8 * (n2 ? i2 : 1 - i2);
  }
  function Z(t3, e2, r2, n2) {
    e2 < 0 && (e2 = 4294967295 + e2 + 1);
    for (var i2 = 0, a2 = Math.min(t3.length - r2, 4); i2 < a2; ++i2)
      t3[r2 + i2] = e2 >>> 8 * (n2 ? i2 : 3 - i2) & 255;
  }
  function W(t3, e2, r2, n2, i2, a2) {
    if (r2 + n2 > t3.length)
      throw new RangeError("Index out of range");
    if (r2 < 0)
      throw new RangeError("Index out of range");
  }
  function Y(t3, e2, r2, n2, i2) {
    return i2 || W(t3, 0, r2, 4), u(t3, e2, r2, n2, 23, 4), r2 + 4;
  }
  function H(t3, e2, r2, n2, i2) {
    return i2 || W(t3, 0, r2, 8), u(t3, e2, r2, n2, 52, 8), r2 + 8;
  }
  p.prototype.slice = function(t3, e2) {
    var r2, n2 = this.length;
    if ((t3 = ~~t3) < 0 ? (t3 += n2) < 0 && (t3 = 0) : t3 > n2 && (t3 = n2), (e2 = void 0 === e2 ? n2 : ~~e2) < 0 ? (e2 += n2) < 0 && (e2 = 0) : e2 > n2 && (e2 = n2), e2 < t3 && (e2 = t3), p.TYPED_ARRAY_SUPPORT)
      (r2 = this.subarray(t3, e2)).__proto__ = p.prototype;
    else {
      var i2 = e2 - t3;
      r2 = new p(i2, void 0);
      for (var a2 = 0; a2 < i2; ++a2)
        r2[a2] = this[a2 + t3];
    }
    return r2;
  }, p.prototype.readUIntLE = function(t3, e2, r2) {
    t3 |= 0, e2 |= 0, r2 || L(t3, e2, this.length);
    for (var n2 = this[t3], i2 = 1, a2 = 0; ++a2 < e2 && (i2 *= 256); )
      n2 += this[t3 + a2] * i2;
    return n2;
  }, p.prototype.readUIntBE = function(t3, e2, r2) {
    t3 |= 0, e2 |= 0, r2 || L(t3, e2, this.length);
    for (var n2 = this[t3 + --e2], i2 = 1; e2 > 0 && (i2 *= 256); )
      n2 += this[t3 + --e2] * i2;
    return n2;
  }, p.prototype.readUInt8 = function(t3, e2) {
    return e2 || L(t3, 1, this.length), this[t3];
  }, p.prototype.readUInt16LE = function(t3, e2) {
    return e2 || L(t3, 2, this.length), this[t3] | this[t3 + 1] << 8;
  }, p.prototype.readUInt16BE = function(t3, e2) {
    return e2 || L(t3, 2, this.length), this[t3] << 8 | this[t3 + 1];
  }, p.prototype.readUInt32LE = function(t3, e2) {
    return e2 || L(t3, 4, this.length), (this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16) + 16777216 * this[t3 + 3];
  }, p.prototype.readUInt32BE = function(t3, e2) {
    return e2 || L(t3, 4, this.length), 16777216 * this[t3] + (this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3]);
  }, p.prototype.readIntLE = function(t3, e2, r2) {
    t3 |= 0, e2 |= 0, r2 || L(t3, e2, this.length);
    for (var n2 = this[t3], i2 = 1, a2 = 0; ++a2 < e2 && (i2 *= 256); )
      n2 += this[t3 + a2] * i2;
    return n2 >= (i2 *= 128) && (n2 -= Math.pow(2, 8 * e2)), n2;
  }, p.prototype.readIntBE = function(t3, e2, r2) {
    t3 |= 0, e2 |= 0, r2 || L(t3, e2, this.length);
    for (var n2 = e2, i2 = 1, a2 = this[t3 + --n2]; n2 > 0 && (i2 *= 256); )
      a2 += this[t3 + --n2] * i2;
    return a2 >= (i2 *= 128) && (a2 -= Math.pow(2, 8 * e2)), a2;
  }, p.prototype.readInt8 = function(t3, e2) {
    return e2 || L(t3, 1, this.length), 128 & this[t3] ? -1 * (255 - this[t3] + 1) : this[t3];
  }, p.prototype.readInt16LE = function(t3, e2) {
    e2 || L(t3, 2, this.length);
    var r2 = this[t3] | this[t3 + 1] << 8;
    return 32768 & r2 ? 4294901760 | r2 : r2;
  }, p.prototype.readInt16BE = function(t3, e2) {
    e2 || L(t3, 2, this.length);
    var r2 = this[t3 + 1] | this[t3] << 8;
    return 32768 & r2 ? 4294901760 | r2 : r2;
  }, p.prototype.readInt32LE = function(t3, e2) {
    return e2 || L(t3, 4, this.length), this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16 | this[t3 + 3] << 24;
  }, p.prototype.readInt32BE = function(t3, e2) {
    return e2 || L(t3, 4, this.length), this[t3] << 24 | this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3];
  }, p.prototype.readFloatLE = function(t3, e2) {
    return e2 || L(t3, 4, this.length), h(this, t3, true, 23, 4);
  }, p.prototype.readFloatBE = function(t3, e2) {
    return e2 || L(t3, 4, this.length), h(this, t3, false, 23, 4);
  }, p.prototype.readDoubleLE = function(t3, e2) {
    return e2 || L(t3, 8, this.length), h(this, t3, true, 52, 8);
  }, p.prototype.readDoubleBE = function(t3, e2) {
    return e2 || L(t3, 8, this.length), h(this, t3, false, 52, 8);
  }, p.prototype.writeUIntLE = function(t3, e2, r2, n2) {
    (t3 = +t3, e2 |= 0, r2 |= 0, n2) || j(this, t3, e2, r2, Math.pow(2, 8 * r2) - 1, 0);
    var i2 = 1, a2 = 0;
    for (this[e2] = 255 & t3; ++a2 < r2 && (i2 *= 256); )
      this[e2 + a2] = t3 / i2 & 255;
    return e2 + r2;
  }, p.prototype.writeUIntBE = function(t3, e2, r2, n2) {
    (t3 = +t3, e2 |= 0, r2 |= 0, n2) || j(this, t3, e2, r2, Math.pow(2, 8 * r2) - 1, 0);
    var i2 = r2 - 1, a2 = 1;
    for (this[e2 + i2] = 255 & t3; --i2 >= 0 && (a2 *= 256); )
      this[e2 + i2] = t3 / a2 & 255;
    return e2 + r2;
  }, p.prototype.writeUInt8 = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 1, 255, 0), p.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), this[e2] = 255 & t3, e2 + 1;
  }, p.prototype.writeUInt16LE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 2, 65535, 0), p.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : M(this, t3, e2, true), e2 + 2;
  }, p.prototype.writeUInt16BE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 2, 65535, 0), p.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : M(this, t3, e2, false), e2 + 2;
  }, p.prototype.writeUInt32LE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 4, 4294967295, 0), p.TYPED_ARRAY_SUPPORT ? (this[e2 + 3] = t3 >>> 24, this[e2 + 2] = t3 >>> 16, this[e2 + 1] = t3 >>> 8, this[e2] = 255 & t3) : Z(this, t3, e2, true), e2 + 4;
  }, p.prototype.writeUInt32BE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 4, 4294967295, 0), p.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : Z(this, t3, e2, false), e2 + 4;
  }, p.prototype.writeIntLE = function(t3, e2, r2, n2) {
    if (t3 = +t3, e2 |= 0, !n2) {
      var i2 = Math.pow(2, 8 * r2 - 1);
      j(this, t3, e2, r2, i2 - 1, -i2);
    }
    var a2 = 0, s2 = 1, o2 = 0;
    for (this[e2] = 255 & t3; ++a2 < r2 && (s2 *= 256); )
      t3 < 0 && 0 === o2 && 0 !== this[e2 + a2 - 1] && (o2 = 1), this[e2 + a2] = (t3 / s2 | 0) - o2 & 255;
    return e2 + r2;
  }, p.prototype.writeIntBE = function(t3, e2, r2, n2) {
    if (t3 = +t3, e2 |= 0, !n2) {
      var i2 = Math.pow(2, 8 * r2 - 1);
      j(this, t3, e2, r2, i2 - 1, -i2);
    }
    var a2 = r2 - 1, s2 = 1, o2 = 0;
    for (this[e2 + a2] = 255 & t3; --a2 >= 0 && (s2 *= 256); )
      t3 < 0 && 0 === o2 && 0 !== this[e2 + a2 + 1] && (o2 = 1), this[e2 + a2] = (t3 / s2 | 0) - o2 & 255;
    return e2 + r2;
  }, p.prototype.writeInt8 = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 1, 127, -128), p.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), t3 < 0 && (t3 = 255 + t3 + 1), this[e2] = 255 & t3, e2 + 1;
  }, p.prototype.writeInt16LE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 2, 32767, -32768), p.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : M(this, t3, e2, true), e2 + 2;
  }, p.prototype.writeInt16BE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 2, 32767, -32768), p.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : M(this, t3, e2, false), e2 + 2;
  }, p.prototype.writeInt32LE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 4, 2147483647, -2147483648), p.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8, this[e2 + 2] = t3 >>> 16, this[e2 + 3] = t3 >>> 24) : Z(this, t3, e2, true), e2 + 4;
  }, p.prototype.writeInt32BE = function(t3, e2, r2) {
    return t3 = +t3, e2 |= 0, r2 || j(this, t3, e2, 4, 2147483647, -2147483648), t3 < 0 && (t3 = 4294967295 + t3 + 1), p.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : Z(this, t3, e2, false), e2 + 4;
  }, p.prototype.writeFloatLE = function(t3, e2, r2) {
    return Y(this, t3, e2, true, r2);
  }, p.prototype.writeFloatBE = function(t3, e2, r2) {
    return Y(this, t3, e2, false, r2);
  }, p.prototype.writeDoubleLE = function(t3, e2, r2) {
    return H(this, t3, e2, true, r2);
  }, p.prototype.writeDoubleBE = function(t3, e2, r2) {
    return H(this, t3, e2, false, r2);
  }, p.prototype.copy = function(t3, e2, r2, n2) {
    if (r2 || (r2 = 0), n2 || 0 === n2 || (n2 = this.length), e2 >= t3.length && (e2 = t3.length), e2 || (e2 = 0), n2 > 0 && n2 < r2 && (n2 = r2), n2 === r2)
      return 0;
    if (0 === t3.length || 0 === this.length)
      return 0;
    if (e2 < 0)
      throw new RangeError("targetStart out of bounds");
    if (r2 < 0 || r2 >= this.length)
      throw new RangeError("sourceStart out of bounds");
    if (n2 < 0)
      throw new RangeError("sourceEnd out of bounds");
    n2 > this.length && (n2 = this.length), t3.length - e2 < n2 - r2 && (n2 = t3.length - e2 + r2);
    var i2, a2 = n2 - r2;
    if (this === t3 && r2 < e2 && e2 < n2)
      for (i2 = a2 - 1; i2 >= 0; --i2)
        t3[i2 + e2] = this[i2 + r2];
    else if (a2 < 1e3 || !p.TYPED_ARRAY_SUPPORT)
      for (i2 = 0; i2 < a2; ++i2)
        t3[i2 + e2] = this[i2 + r2];
    else
      Uint8Array.prototype.set.call(t3, this.subarray(r2, r2 + a2), e2);
    return a2;
  }, p.prototype.fill = function(t3, e2, r2, n2) {
    if ("string" == typeof t3) {
      if ("string" == typeof e2 ? (n2 = e2, e2 = 0, r2 = this.length) : "string" == typeof r2 && (n2 = r2, r2 = this.length), 1 === t3.length) {
        var i2 = t3.charCodeAt(0);
        i2 < 256 && (t3 = i2);
      }
      if (void 0 !== n2 && "string" != typeof n2)
        throw new TypeError("encoding must be a string");
      if ("string" == typeof n2 && !p.isEncoding(n2))
        throw new TypeError("Unknown encoding: " + n2);
    } else
      "number" == typeof t3 && (t3 &= 255);
    if (e2 < 0 || this.length < e2 || this.length < r2)
      throw new RangeError("Out of range index");
    if (r2 <= e2)
      return this;
    var a2;
    if (e2 >>>= 0, r2 = void 0 === r2 ? this.length : r2 >>> 0, t3 || (t3 = 0), "number" == typeof t3)
      for (a2 = e2; a2 < r2; ++a2)
        this[a2] = t3;
    else {
      var s2 = w(t3) ? t3 : X(new p(t3, n2).toString()), o2 = s2.length;
      for (a2 = 0; a2 < r2 - e2; ++a2)
        this[a2 + e2] = s2[a2 % o2];
    }
    return this;
  };
  var G = /[^+\/0-9A-Za-z-_]/g;
  function K(t3) {
    return t3 < 16 ? "0" + t3.toString(16) : t3.toString(16);
  }
  function X(t3, e2) {
    var r2;
    e2 = e2 || 1 / 0;
    for (var n2 = t3.length, i2 = null, a2 = [], s2 = 0; s2 < n2; ++s2) {
      if ((r2 = t3.charCodeAt(s2)) > 55295 && r2 < 57344) {
        if (!i2) {
          if (r2 > 56319) {
            (e2 -= 3) > -1 && a2.push(239, 191, 189);
            continue;
          }
          if (s2 + 1 === n2) {
            (e2 -= 3) > -1 && a2.push(239, 191, 189);
            continue;
          }
          i2 = r2;
          continue;
        }
        if (r2 < 56320) {
          (e2 -= 3) > -1 && a2.push(239, 191, 189), i2 = r2;
          continue;
        }
        r2 = 65536 + (i2 - 55296 << 10 | r2 - 56320);
      } else
        i2 && (e2 -= 3) > -1 && a2.push(239, 191, 189);
      if (i2 = null, r2 < 128) {
        if ((e2 -= 1) < 0)
          break;
        a2.push(r2);
      } else if (r2 < 2048) {
        if ((e2 -= 2) < 0)
          break;
        a2.push(r2 >> 6 | 192, 63 & r2 | 128);
      } else if (r2 < 65536) {
        if ((e2 -= 3) < 0)
          break;
        a2.push(r2 >> 12 | 224, r2 >> 6 & 63 | 128, 63 & r2 | 128);
      } else {
        if (!(r2 < 1114112))
          throw new Error("Invalid code point");
        if ((e2 -= 4) < 0)
          break;
        a2.push(r2 >> 18 | 240, r2 >> 12 & 63 | 128, r2 >> 6 & 63 | 128, 63 & r2 | 128);
      }
    }
    return a2;
  }
  function V(t3) {
    return function(t4) {
      var e2, s2, o2, h2, u2, f2;
      i || a();
      var l2 = t4.length;
      if (l2 % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      u2 = "=" === t4[l2 - 2] ? 2 : "=" === t4[l2 - 1] ? 1 : 0, f2 = new n(3 * l2 / 4 - u2), o2 = u2 > 0 ? l2 - 4 : l2;
      var c2 = 0;
      for (e2 = 0, s2 = 0; e2 < o2; e2 += 4, s2 += 3)
        h2 = r[t4.charCodeAt(e2)] << 18 | r[t4.charCodeAt(e2 + 1)] << 12 | r[t4.charCodeAt(e2 + 2)] << 6 | r[t4.charCodeAt(e2 + 3)], f2[c2++] = h2 >> 16 & 255, f2[c2++] = h2 >> 8 & 255, f2[c2++] = 255 & h2;
      return 2 === u2 ? (h2 = r[t4.charCodeAt(e2)] << 2 | r[t4.charCodeAt(e2 + 1)] >> 4, f2[c2++] = 255 & h2) : 1 === u2 && (h2 = r[t4.charCodeAt(e2)] << 10 | r[t4.charCodeAt(e2 + 1)] << 4 | r[t4.charCodeAt(e2 + 2)] >> 2, f2[c2++] = h2 >> 8 & 255, f2[c2++] = 255 & h2), f2;
    }(function(t4) {
      if ((t4 = function(t5) {
        return t5.trim ? t5.trim() : t5.replace(/^\s+|\s+$/g, "");
      }(t4).replace(G, "")).length < 2)
        return "";
      for (; t4.length % 4 != 0; )
        t4 += "=";
      return t4;
    }(t3));
  }
  function q(t3, e2, r2, n2) {
    for (var i2 = 0; i2 < n2 && !(i2 + r2 >= e2.length || i2 >= t3.length); ++i2)
      e2[i2 + r2] = t3[i2];
    return i2;
  }
  function J(t3) {
    return !!t3.constructor && "function" == typeof t3.constructor.isBuffer && t3.constructor.isBuffer(t3);
  }
  function $() {
    throw new Error("setTimeout has not been defined");
  }
  function Q() {
    throw new Error("clearTimeout has not been defined");
  }
  var tt = $;
  var et = Q;
  function rt(t3) {
    if (tt === setTimeout)
      return setTimeout(t3, 0);
    if ((tt === $ || !tt) && setTimeout)
      return tt = setTimeout, setTimeout(t3, 0);
    try {
      return tt(t3, 0);
    } catch (e2) {
      try {
        return tt.call(null, t3, 0);
      } catch (e3) {
        return tt.call(this, t3, 0);
      }
    }
  }
  "function" == typeof t.setTimeout && (tt = setTimeout), "function" == typeof t.clearTimeout && (et = clearTimeout);
  var nt;
  var it = [];
  var at = false;
  var st = -1;
  function ot() {
    at && nt && (at = false, nt.length ? it = nt.concat(it) : st = -1, it.length && ht());
  }
  function ht() {
    if (!at) {
      var t3 = rt(ot);
      at = true;
      for (var e2 = it.length; e2; ) {
        for (nt = it, it = []; ++st < e2; )
          nt && nt[st].run();
        st = -1, e2 = it.length;
      }
      nt = null, at = false, function(t4) {
        if (et === clearTimeout)
          return clearTimeout(t4);
        if ((et === Q || !et) && clearTimeout)
          return et = clearTimeout, clearTimeout(t4);
        try {
          return et(t4);
        } catch (e3) {
          try {
            return et.call(null, t4);
          } catch (e4) {
            return et.call(this, t4);
          }
        }
      }(t3);
    }
  }
  function ut(t3, e2) {
    this.fun = t3, this.array = e2;
  }
  ut.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  function ft() {
  }
  var lt = ft;
  var ct = ft;
  var dt = ft;
  var pt = ft;
  var mt = ft;
  var gt = ft;
  var _t = ft;
  var yt = t.performance || {};
  var vt = yt.now || yt.mozNow || yt.msNow || yt.oNow || yt.webkitNow || function() {
    return (/* @__PURE__ */ new Date()).getTime();
  };
  var wt = /* @__PURE__ */ new Date();
  var bt = { nextTick: function(t3) {
    var e2 = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r2 = 1; r2 < arguments.length; r2++)
        e2[r2 - 1] = arguments[r2];
    it.push(new ut(t3, e2)), 1 !== it.length || at || rt(ht);
  }, title: "browser", browser: true, env: {}, argv: [], version: "", versions: {}, on: lt, addListener: ct, once: dt, off: pt, removeListener: mt, removeAllListeners: gt, emit: _t, binding: function(t3) {
    throw new Error("process.binding is not supported");
  }, cwd: function() {
    return "/";
  }, chdir: function(t3) {
    throw new Error("process.chdir is not supported");
  }, umask: function() {
    return 0;
  }, hrtime: function(t3) {
    var e2 = 1e-3 * vt.call(yt), r2 = Math.floor(e2), n2 = Math.floor(e2 % 1 * 1e9);
    return t3 && (r2 -= t3[0], (n2 -= t3[1]) < 0 && (r2--, n2 += 1e9)), [r2, n2];
  }, platform: "browser", release: {}, config: {}, uptime: function() {
    return (/* @__PURE__ */ new Date() - wt) / 1e3;
  } };
  var kt = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
  function Et(t3) {
    throw new Error('Could not dynamically require "' + t3 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var xt = { exports: {} };
  var At = xt.exports = function t2(e2, r2, n2) {
    function i2(s3, o2) {
      if (!r2[s3]) {
        if (!e2[s3]) {
          if (!o2 && Et)
            return Et(s3);
          if (a2)
            return a2(s3, true);
          var h2 = new Error("Cannot find module '" + s3 + "'");
          throw h2.code = "MODULE_NOT_FOUND", h2;
        }
        var u2 = r2[s3] = { exports: {} };
        e2[s3][0].call(u2.exports, function(t3) {
          return i2(e2[s3][1][t3] || t3);
        }, u2, u2.exports, t2, e2, r2, n2);
      }
      return r2[s3].exports;
    }
    for (var a2 = Et, s2 = 0; s2 < n2.length; s2++)
      i2(n2[s2]);
    return i2;
  }({ 1: [function(t3, e2, r2) {
    var n2 = t3("./utils"), i2 = t3("./support"), a2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    r2.encode = function(t4) {
      for (var e3, r3, i3, s2, o2, h2, u2, f2 = [], l2 = 0, c2 = t4.length, d2 = c2, p2 = "string" !== n2.getTypeOf(t4); l2 < t4.length; )
        d2 = c2 - l2, i3 = p2 ? (e3 = t4[l2++], r3 = l2 < c2 ? t4[l2++] : 0, l2 < c2 ? t4[l2++] : 0) : (e3 = t4.charCodeAt(l2++), r3 = l2 < c2 ? t4.charCodeAt(l2++) : 0, l2 < c2 ? t4.charCodeAt(l2++) : 0), s2 = e3 >> 2, o2 = (3 & e3) << 4 | r3 >> 4, h2 = 1 < d2 ? (15 & r3) << 2 | i3 >> 6 : 64, u2 = 2 < d2 ? 63 & i3 : 64, f2.push(a2.charAt(s2) + a2.charAt(o2) + a2.charAt(h2) + a2.charAt(u2));
      return f2.join("");
    }, r2.decode = function(t4) {
      var e3, r3, n3, s2, o2, h2, u2 = 0, f2 = 0, l2 = "data:";
      if (t4.substr(0, l2.length) === l2)
        throw new Error("Invalid base64 input, it looks like a data url.");
      var c2, d2 = 3 * (t4 = t4.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
      if (t4.charAt(t4.length - 1) === a2.charAt(64) && d2--, t4.charAt(t4.length - 2) === a2.charAt(64) && d2--, d2 % 1 != 0)
        throw new Error("Invalid base64 input, bad content length.");
      for (c2 = i2.uint8array ? new Uint8Array(0 | d2) : new Array(0 | d2); u2 < t4.length; )
        e3 = a2.indexOf(t4.charAt(u2++)) << 2 | (s2 = a2.indexOf(t4.charAt(u2++))) >> 4, r3 = (15 & s2) << 4 | (o2 = a2.indexOf(t4.charAt(u2++))) >> 2, n3 = (3 & o2) << 6 | (h2 = a2.indexOf(t4.charAt(u2++))), c2[f2++] = e3, 64 !== o2 && (c2[f2++] = r3), 64 !== h2 && (c2[f2++] = n3);
      return c2;
    };
  }, { "./support": 30, "./utils": 32 }], 2: [function(t3, e2, r2) {
    var n2 = t3("./external"), i2 = t3("./stream/DataWorker"), a2 = t3("./stream/Crc32Probe"), s2 = t3("./stream/DataLengthProbe");
    function o2(t4, e3, r3, n3, i3) {
      this.compressedSize = t4, this.uncompressedSize = e3, this.crc32 = r3, this.compression = n3, this.compressedContent = i3;
    }
    o2.prototype = { getContentWorker: function() {
      var t4 = new i2(n2.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s2("data_length")), e3 = this;
      return t4.on("end", function() {
        if (this.streamInfo.data_length !== e3.uncompressedSize)
          throw new Error("Bug : uncompressed data size mismatch");
      }), t4;
    }, getCompressedWorker: function() {
      return new i2(n2.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
    } }, o2.createWorkerFrom = function(t4, e3, r3) {
      return t4.pipe(new a2()).pipe(new s2("uncompressedSize")).pipe(e3.compressWorker(r3)).pipe(new s2("compressedSize")).withStreamInfo("compression", e3);
    }, e2.exports = o2;
  }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(t3, e2, r2) {
    var n2 = t3("./stream/GenericWorker");
    r2.STORE = { magic: "\0\0", compressWorker: function() {
      return new n2("STORE compression");
    }, uncompressWorker: function() {
      return new n2("STORE decompression");
    } }, r2.DEFLATE = t3("./flate");
  }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(t3, e2, r2) {
    var n2 = t3("./utils"), i2 = function() {
      for (var t4, e3 = [], r3 = 0; r3 < 256; r3++) {
        t4 = r3;
        for (var n3 = 0; n3 < 8; n3++)
          t4 = 1 & t4 ? 3988292384 ^ t4 >>> 1 : t4 >>> 1;
        e3[r3] = t4;
      }
      return e3;
    }();
    e2.exports = function(t4, e3) {
      return void 0 !== t4 && t4.length ? "string" !== n2.getTypeOf(t4) ? function(t5, e4, r3, n3) {
        var a2 = i2, s2 = n3 + r3;
        t5 ^= -1;
        for (var o2 = n3; o2 < s2; o2++)
          t5 = t5 >>> 8 ^ a2[255 & (t5 ^ e4[o2])];
        return ~t5;
      }(0 | e3, t4, t4.length, 0) : function(t5, e4, r3, n3) {
        var a2 = i2, s2 = n3 + r3;
        t5 ^= -1;
        for (var o2 = n3; o2 < s2; o2++)
          t5 = t5 >>> 8 ^ a2[255 & (t5 ^ e4.charCodeAt(o2))];
        return ~t5;
      }(0 | e3, t4, t4.length, 0) : 0;
    };
  }, { "./utils": 32 }], 5: [function(t3, e2, r2) {
    r2.base64 = false, r2.binary = false, r2.dir = false, r2.createFolders = true, r2.date = null, r2.compression = null, r2.compressionOptions = null, r2.comment = null, r2.unixPermissions = null, r2.dosPermissions = null;
  }, {}], 6: [function(t3, e2, r2) {
    var n2 = null;
    n2 = "undefined" != typeof Promise ? Promise : t3("lie"), e2.exports = { Promise: n2 };
  }, { lie: 37 }], 7: [function(t3, e2, r2) {
    var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i2 = t3("pako"), a2 = t3("./utils"), s2 = t3("./stream/GenericWorker"), o2 = n2 ? "uint8array" : "array";
    function h2(t4, e3) {
      s2.call(this, "FlateWorker/" + t4), this._pako = null, this._pakoAction = t4, this._pakoOptions = e3, this.meta = {};
    }
    r2.magic = "\b\0", a2.inherits(h2, s2), h2.prototype.processChunk = function(t4) {
      this.meta = t4.meta, null === this._pako && this._createPako(), this._pako.push(a2.transformTo(o2, t4.data), false);
    }, h2.prototype.flush = function() {
      s2.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
    }, h2.prototype.cleanUp = function() {
      s2.prototype.cleanUp.call(this), this._pako = null;
    }, h2.prototype._createPako = function() {
      this._pako = new i2[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
      var t4 = this;
      this._pako.onData = function(e3) {
        t4.push({ data: e3, meta: t4.meta });
      };
    }, r2.compressWorker = function(t4) {
      return new h2("Deflate", t4);
    }, r2.uncompressWorker = function() {
      return new h2("Inflate", {});
    };
  }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(t3, e2, r2) {
    function n2(t4, e3) {
      var r3, n3 = "";
      for (r3 = 0; r3 < e3; r3++)
        n3 += String.fromCharCode(255 & t4), t4 >>>= 8;
      return n3;
    }
    function i2(t4, e3, r3, i3, s3, f3) {
      var l2, c2, d2 = t4.file, p2 = t4.compression, m2 = f3 !== o2.utf8encode, g2 = a2.transformTo("string", f3(d2.name)), _2 = a2.transformTo("string", o2.utf8encode(d2.name)), y2 = d2.comment, v2 = a2.transformTo("string", f3(y2)), w2 = a2.transformTo("string", o2.utf8encode(y2)), b2 = _2.length !== d2.name.length, k2 = w2.length !== y2.length, E2 = "", x2 = "", A2 = "", S2 = d2.dir, C2 = d2.date, z2 = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
      e3 && !r3 || (z2.crc32 = t4.crc32, z2.compressedSize = t4.compressedSize, z2.uncompressedSize = t4.uncompressedSize);
      var R2 = 0;
      e3 && (R2 |= 8), m2 || !b2 && !k2 || (R2 |= 2048);
      var I2 = 0, T2 = 0;
      S2 && (I2 |= 16), "UNIX" === s3 ? (T2 = 798, I2 |= function(t5, e4) {
        var r4 = t5;
        return t5 || (r4 = e4 ? 16893 : 33204), (65535 & r4) << 16;
      }(d2.unixPermissions, S2)) : (T2 = 20, I2 |= function(t5) {
        return 63 & (t5 || 0);
      }(d2.dosPermissions)), l2 = C2.getUTCHours(), l2 <<= 6, l2 |= C2.getUTCMinutes(), l2 <<= 5, l2 |= C2.getUTCSeconds() / 2, c2 = C2.getUTCFullYear() - 1980, c2 <<= 4, c2 |= C2.getUTCMonth() + 1, c2 <<= 5, c2 |= C2.getUTCDate(), b2 && (x2 = n2(1, 1) + n2(h2(g2), 4) + _2, E2 += "up" + n2(x2.length, 2) + x2), k2 && (A2 = n2(1, 1) + n2(h2(v2), 4) + w2, E2 += "uc" + n2(A2.length, 2) + A2);
      var O2 = "";
      return O2 += "\n\0", O2 += n2(R2, 2), O2 += p2.magic, O2 += n2(l2, 2), O2 += n2(c2, 2), O2 += n2(z2.crc32, 4), O2 += n2(z2.compressedSize, 4), O2 += n2(z2.uncompressedSize, 4), O2 += n2(g2.length, 2), O2 += n2(E2.length, 2), { fileRecord: u2.LOCAL_FILE_HEADER + O2 + g2 + E2, dirRecord: u2.CENTRAL_FILE_HEADER + n2(T2, 2) + O2 + n2(v2.length, 2) + "\0\0\0\0" + n2(I2, 4) + n2(i3, 4) + g2 + E2 + v2 };
    }
    var a2 = t3("../utils"), s2 = t3("../stream/GenericWorker"), o2 = t3("../utf8"), h2 = t3("../crc32"), u2 = t3("../signature");
    function f2(t4, e3, r3, n3) {
      s2.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e3, this.zipPlatform = r3, this.encodeFileName = n3, this.streamFiles = t4, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
    }
    a2.inherits(f2, s2), f2.prototype.push = function(t4) {
      var e3 = t4.meta.percent || 0, r3 = this.entriesCount, n3 = this._sources.length;
      this.accumulate ? this.contentBuffer.push(t4) : (this.bytesWritten += t4.data.length, s2.prototype.push.call(this, { data: t4.data, meta: { currentFile: this.currentFile, percent: r3 ? (e3 + 100 * (r3 - n3 - 1)) / r3 : 100 } }));
    }, f2.prototype.openedSource = function(t4) {
      this.currentSourceOffset = this.bytesWritten, this.currentFile = t4.file.name;
      var e3 = this.streamFiles && !t4.file.dir;
      if (e3) {
        var r3 = i2(t4, e3, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({ data: r3.fileRecord, meta: { percent: 0 } });
      } else
        this.accumulate = true;
    }, f2.prototype.closedSource = function(t4) {
      this.accumulate = false;
      var e3 = this.streamFiles && !t4.file.dir, r3 = i2(t4, e3, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      if (this.dirRecords.push(r3.dirRecord), e3)
        this.push({ data: function(t5) {
          return u2.DATA_DESCRIPTOR + n2(t5.crc32, 4) + n2(t5.compressedSize, 4) + n2(t5.uncompressedSize, 4);
        }(t4), meta: { percent: 100 } });
      else
        for (this.push({ data: r3.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; )
          this.push(this.contentBuffer.shift());
      this.currentFile = null;
    }, f2.prototype.flush = function() {
      for (var t4 = this.bytesWritten, e3 = 0; e3 < this.dirRecords.length; e3++)
        this.push({ data: this.dirRecords[e3], meta: { percent: 100 } });
      var r3 = this.bytesWritten - t4, i3 = function(t5, e4, r4, i4, s3) {
        var o3 = a2.transformTo("string", s3(i4));
        return u2.CENTRAL_DIRECTORY_END + "\0\0\0\0" + n2(t5, 2) + n2(t5, 2) + n2(e4, 4) + n2(r4, 4) + n2(o3.length, 2) + o3;
      }(this.dirRecords.length, r3, t4, this.zipComment, this.encodeFileName);
      this.push({ data: i3, meta: { percent: 100 } });
    }, f2.prototype.prepareNextSource = function() {
      this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
    }, f2.prototype.registerPrevious = function(t4) {
      this._sources.push(t4);
      var e3 = this;
      return t4.on("data", function(t5) {
        e3.processChunk(t5);
      }), t4.on("end", function() {
        e3.closedSource(e3.previous.streamInfo), e3._sources.length ? e3.prepareNextSource() : e3.end();
      }), t4.on("error", function(t5) {
        e3.error(t5);
      }), this;
    }, f2.prototype.resume = function() {
      return !!s2.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
    }, f2.prototype.error = function(t4) {
      var e3 = this._sources;
      if (!s2.prototype.error.call(this, t4))
        return false;
      for (var r3 = 0; r3 < e3.length; r3++)
        try {
          e3[r3].error(t4);
        } catch (t5) {
        }
      return true;
    }, f2.prototype.lock = function() {
      s2.prototype.lock.call(this);
      for (var t4 = this._sources, e3 = 0; e3 < t4.length; e3++)
        t4[e3].lock();
    }, e2.exports = f2;
  }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(t3, e2, r2) {
    var n2 = t3("../compressions"), i2 = t3("./ZipFileWorker");
    r2.generateWorker = function(t4, e3, r3) {
      var a2 = new i2(e3.streamFiles, r3, e3.platform, e3.encodeFileName), s2 = 0;
      try {
        t4.forEach(function(t5, r4) {
          s2++;
          var i3 = function(t6, e4) {
            var r5 = t6 || e4, i4 = n2[r5];
            if (!i4)
              throw new Error(r5 + " is not a valid compression method !");
            return i4;
          }(r4.options.compression, e3.compression), o2 = r4.options.compressionOptions || e3.compressionOptions || {}, h2 = r4.dir, u2 = r4.date;
          r4._compressWorker(i3, o2).withStreamInfo("file", { name: t5, dir: h2, date: u2, comment: r4.comment || "", unixPermissions: r4.unixPermissions, dosPermissions: r4.dosPermissions }).pipe(a2);
        }), a2.entriesCount = s2;
      } catch (t5) {
        a2.error(t5);
      }
      return a2;
    };
  }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(t3, e2, r2) {
    function n2() {
      if (!(this instanceof n2))
        return new n2();
      if (arguments.length)
        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
      this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
        var t4 = new n2();
        for (var e3 in this)
          "function" != typeof this[e3] && (t4[e3] = this[e3]);
        return t4;
      };
    }
    (n2.prototype = t3("./object")).loadAsync = t3("./load"), n2.support = t3("./support"), n2.defaults = t3("./defaults"), n2.version = "3.10.1", n2.loadAsync = function(t4, e3) {
      return new n2().loadAsync(t4, e3);
    }, n2.external = t3("./external"), e2.exports = n2;
  }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(t3, e2, r2) {
    var n2 = t3("./utils"), i2 = t3("./external"), a2 = t3("./utf8"), s2 = t3("./zipEntries"), o2 = t3("./stream/Crc32Probe"), h2 = t3("./nodejsUtils");
    function u2(t4) {
      return new i2.Promise(function(e3, r3) {
        var n3 = t4.decompressed.getContentWorker().pipe(new o2());
        n3.on("error", function(t5) {
          r3(t5);
        }).on("end", function() {
          n3.streamInfo.crc32 !== t4.decompressed.crc32 ? r3(new Error("Corrupted zip : CRC32 mismatch")) : e3();
        }).resume();
      });
    }
    e2.exports = function(t4, e3) {
      var r3 = this;
      return e3 = n2.extend(e3 || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: a2.utf8decode }), h2.isNode && h2.isStream(t4) ? i2.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : n2.prepareContent("the loaded zip file", t4, true, e3.optimizedBinaryString, e3.base64).then(function(t5) {
        var r4 = new s2(e3);
        return r4.load(t5), r4;
      }).then(function(t5) {
        var r4 = [i2.Promise.resolve(t5)], n3 = t5.files;
        if (e3.checkCRC32)
          for (var a3 = 0; a3 < n3.length; a3++)
            r4.push(u2(n3[a3]));
        return i2.Promise.all(r4);
      }).then(function(t5) {
        for (var i3 = t5.shift(), a3 = i3.files, s3 = 0; s3 < a3.length; s3++) {
          var o3 = a3[s3], h3 = o3.fileNameStr, u3 = n2.resolve(o3.fileNameStr);
          r3.file(u3, o3.decompressed, { binary: true, optimizedBinaryString: true, date: o3.date, dir: o3.dir, comment: o3.fileCommentStr.length ? o3.fileCommentStr : null, unixPermissions: o3.unixPermissions, dosPermissions: o3.dosPermissions, createFolders: e3.createFolders }), o3.dir || (r3.file(u3).unsafeOriginalName = h3);
        }
        return i3.zipComment.length && (r3.comment = i3.zipComment), r3;
      });
    };
  }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(t3, e2, r2) {
    var n2 = t3("../utils"), i2 = t3("../stream/GenericWorker");
    function a2(t4, e3) {
      i2.call(this, "Nodejs stream input adapter for " + t4), this._upstreamEnded = false, this._bindStream(e3);
    }
    n2.inherits(a2, i2), a2.prototype._bindStream = function(t4) {
      var e3 = this;
      (this._stream = t4).pause(), t4.on("data", function(t5) {
        e3.push({ data: t5, meta: { percent: 0 } });
      }).on("error", function(t5) {
        e3.isPaused ? this.generatedError = t5 : e3.error(t5);
      }).on("end", function() {
        e3.isPaused ? e3._upstreamEnded = true : e3.end();
      });
    }, a2.prototype.pause = function() {
      return !!i2.prototype.pause.call(this) && (this._stream.pause(), true);
    }, a2.prototype.resume = function() {
      return !!i2.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
    }, e2.exports = a2;
  }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(t3, e2, r2) {
    var n2 = t3("readable-stream").Readable;
    function i2(t4, e3, r3) {
      n2.call(this, e3), this._helper = t4;
      var i3 = this;
      t4.on("data", function(t5, e4) {
        i3.push(t5) || i3._helper.pause(), r3 && r3(e4);
      }).on("error", function(t5) {
        i3.emit("error", t5);
      }).on("end", function() {
        i3.push(null);
      });
    }
    t3("../utils").inherits(i2, n2), i2.prototype._read = function() {
      this._helper.resume();
    }, e2.exports = i2;
  }, { "../utils": 32, "readable-stream": 16 }], 14: [function(t3, e2, r2) {
    e2.exports = { isNode: void 0 !== p, newBufferFrom: function(t4, e3) {
      if (p.from && p.from !== Uint8Array.from)
        return p.from(t4, e3);
      if ("number" == typeof t4)
        throw new Error('The "data" argument must not be a number');
      return new p(t4, e3);
    }, allocBuffer: function(t4) {
      if (p.alloc)
        return p.alloc(t4);
      var e3 = new p(t4);
      return e3.fill(0), e3;
    }, isBuffer: function(t4) {
      return p.isBuffer(t4);
    }, isStream: function(t4) {
      return t4 && "function" == typeof t4.on && "function" == typeof t4.pause && "function" == typeof t4.resume;
    } };
  }, {}], 15: [function(t3, e2, r2) {
    function n2(t4, e3, r3) {
      var n3, i3 = a2.getTypeOf(e3), o3 = a2.extend(r3 || {}, h2);
      o3.date = o3.date || /* @__PURE__ */ new Date(), null !== o3.compression && (o3.compression = o3.compression.toUpperCase()), "string" == typeof o3.unixPermissions && (o3.unixPermissions = parseInt(o3.unixPermissions, 8)), o3.unixPermissions && 16384 & o3.unixPermissions && (o3.dir = true), o3.dosPermissions && 16 & o3.dosPermissions && (o3.dir = true), o3.dir && (t4 = m2(t4)), o3.createFolders && (n3 = p2(t4)) && g2.call(this, n3, true);
      var l3 = "string" === i3 && false === o3.binary && false === o3.base64;
      r3 && void 0 !== r3.binary || (o3.binary = !l3), (e3 instanceof u2 && 0 === e3.uncompressedSize || o3.dir || !e3 || 0 === e3.length) && (o3.base64 = false, o3.binary = true, e3 = "", o3.compression = "STORE", i3 = "string");
      var _3 = null;
      _3 = e3 instanceof u2 || e3 instanceof s2 ? e3 : c2.isNode && c2.isStream(e3) ? new d2(t4, e3) : a2.prepareContent(t4, e3, o3.binary, o3.optimizedBinaryString, o3.base64);
      var y3 = new f2(t4, _3, o3);
      this.files[t4] = y3;
    }
    var i2 = t3("./utf8"), a2 = t3("./utils"), s2 = t3("./stream/GenericWorker"), o2 = t3("./stream/StreamHelper"), h2 = t3("./defaults"), u2 = t3("./compressedObject"), f2 = t3("./zipObject"), l2 = t3("./generate"), c2 = t3("./nodejsUtils"), d2 = t3("./nodejs/NodejsStreamInputAdapter"), p2 = function(t4) {
      "/" === t4.slice(-1) && (t4 = t4.substring(0, t4.length - 1));
      var e3 = t4.lastIndexOf("/");
      return 0 < e3 ? t4.substring(0, e3) : "";
    }, m2 = function(t4) {
      return "/" !== t4.slice(-1) && (t4 += "/"), t4;
    }, g2 = function(t4, e3) {
      return e3 = void 0 !== e3 ? e3 : h2.createFolders, t4 = m2(t4), this.files[t4] || n2.call(this, t4, null, { dir: true, createFolders: e3 }), this.files[t4];
    };
    function _2(t4) {
      return "[object RegExp]" === Object.prototype.toString.call(t4);
    }
    var y2 = { load: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, forEach: function(t4) {
      var e3, r3, n3;
      for (e3 in this.files)
        n3 = this.files[e3], (r3 = e3.slice(this.root.length, e3.length)) && e3.slice(0, this.root.length) === this.root && t4(r3, n3);
    }, filter: function(t4) {
      var e3 = [];
      return this.forEach(function(r3, n3) {
        t4(r3, n3) && e3.push(n3);
      }), e3;
    }, file: function(t4, e3, r3) {
      if (1 !== arguments.length)
        return t4 = this.root + t4, n2.call(this, t4, e3, r3), this;
      if (_2(t4)) {
        var i3 = t4;
        return this.filter(function(t5, e4) {
          return !e4.dir && i3.test(t5);
        });
      }
      var a3 = this.files[this.root + t4];
      return a3 && !a3.dir ? a3 : null;
    }, folder: function(t4) {
      if (!t4)
        return this;
      if (_2(t4))
        return this.filter(function(e4, r4) {
          return r4.dir && t4.test(e4);
        });
      var e3 = this.root + t4, r3 = g2.call(this, e3), n3 = this.clone();
      return n3.root = r3.name, n3;
    }, remove: function(t4) {
      t4 = this.root + t4;
      var e3 = this.files[t4];
      if (e3 || ("/" !== t4.slice(-1) && (t4 += "/"), e3 = this.files[t4]), e3 && !e3.dir)
        delete this.files[t4];
      else
        for (var r3 = this.filter(function(e4, r4) {
          return r4.name.slice(0, t4.length) === t4;
        }), n3 = 0; n3 < r3.length; n3++)
          delete this.files[r3[n3].name];
      return this;
    }, generate: function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, generateInternalStream: function(t4) {
      var e3, r3 = {};
      try {
        if ((r3 = a2.extend(t4 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i2.utf8encode })).type = r3.type.toLowerCase(), r3.compression = r3.compression.toUpperCase(), "binarystring" === r3.type && (r3.type = "string"), !r3.type)
          throw new Error("No output type specified.");
        a2.checkSupport(r3.type), "darwin" !== r3.platform && "freebsd" !== r3.platform && "linux" !== r3.platform && "sunos" !== r3.platform || (r3.platform = "UNIX"), "win32" === r3.platform && (r3.platform = "DOS");
        var n3 = r3.comment || this.comment || "";
        e3 = l2.generateWorker(this, r3, n3);
      } catch (t5) {
        (e3 = new s2("error")).error(t5);
      }
      return new o2(e3, r3.type || "string", r3.mimeType);
    }, generateAsync: function(t4, e3) {
      return this.generateInternalStream(t4).accumulate(e3);
    }, generateNodeStream: function(t4, e3) {
      return (t4 = t4 || {}).type || (t4.type = "nodebuffer"), this.generateInternalStream(t4).toNodejsStream(e3);
    } };
    e2.exports = y2;
  }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(t3, e2, r2) {
    e2.exports = t3("stream");
  }, { stream: void 0 }], 17: [function(t3, e2, r2) {
    var n2 = t3("./DataReader");
    function i2(t4) {
      n2.call(this, t4);
      for (var e3 = 0; e3 < this.data.length; e3++)
        t4[e3] = 255 & t4[e3];
    }
    t3("../utils").inherits(i2, n2), i2.prototype.byteAt = function(t4) {
      return this.data[this.zero + t4];
    }, i2.prototype.lastIndexOfSignature = function(t4) {
      for (var e3 = t4.charCodeAt(0), r3 = t4.charCodeAt(1), n3 = t4.charCodeAt(2), i3 = t4.charCodeAt(3), a2 = this.length - 4; 0 <= a2; --a2)
        if (this.data[a2] === e3 && this.data[a2 + 1] === r3 && this.data[a2 + 2] === n3 && this.data[a2 + 3] === i3)
          return a2 - this.zero;
      return -1;
    }, i2.prototype.readAndCheckSignature = function(t4) {
      var e3 = t4.charCodeAt(0), r3 = t4.charCodeAt(1), n3 = t4.charCodeAt(2), i3 = t4.charCodeAt(3), a2 = this.readData(4);
      return e3 === a2[0] && r3 === a2[1] && n3 === a2[2] && i3 === a2[3];
    }, i2.prototype.readData = function(t4) {
      if (this.checkOffset(t4), 0 === t4)
        return [];
      var e3 = this.data.slice(this.zero + this.index, this.zero + this.index + t4);
      return this.index += t4, e3;
    }, e2.exports = i2;
  }, { "../utils": 32, "./DataReader": 18 }], 18: [function(t3, e2, r2) {
    var n2 = t3("../utils");
    function i2(t4) {
      this.data = t4, this.length = t4.length, this.index = 0, this.zero = 0;
    }
    i2.prototype = { checkOffset: function(t4) {
      this.checkIndex(this.index + t4);
    }, checkIndex: function(t4) {
      if (this.length < this.zero + t4 || t4 < 0)
        throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t4 + "). Corrupted zip ?");
    }, setIndex: function(t4) {
      this.checkIndex(t4), this.index = t4;
    }, skip: function(t4) {
      this.setIndex(this.index + t4);
    }, byteAt: function() {
    }, readInt: function(t4) {
      var e3, r3 = 0;
      for (this.checkOffset(t4), e3 = this.index + t4 - 1; e3 >= this.index; e3--)
        r3 = (r3 << 8) + this.byteAt(e3);
      return this.index += t4, r3;
    }, readString: function(t4) {
      return n2.transformTo("string", this.readData(t4));
    }, readData: function() {
    }, lastIndexOfSignature: function() {
    }, readAndCheckSignature: function() {
    }, readDate: function() {
      var t4 = this.readInt(4);
      return new Date(Date.UTC(1980 + (t4 >> 25 & 127), (t4 >> 21 & 15) - 1, t4 >> 16 & 31, t4 >> 11 & 31, t4 >> 5 & 63, (31 & t4) << 1));
    } }, e2.exports = i2;
  }, { "../utils": 32 }], 19: [function(t3, e2, r2) {
    var n2 = t3("./Uint8ArrayReader");
    function i2(t4) {
      n2.call(this, t4);
    }
    t3("../utils").inherits(i2, n2), i2.prototype.readData = function(t4) {
      this.checkOffset(t4);
      var e3 = this.data.slice(this.zero + this.index, this.zero + this.index + t4);
      return this.index += t4, e3;
    }, e2.exports = i2;
  }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(t3, e2, r2) {
    var n2 = t3("./DataReader");
    function i2(t4) {
      n2.call(this, t4);
    }
    t3("../utils").inherits(i2, n2), i2.prototype.byteAt = function(t4) {
      return this.data.charCodeAt(this.zero + t4);
    }, i2.prototype.lastIndexOfSignature = function(t4) {
      return this.data.lastIndexOf(t4) - this.zero;
    }, i2.prototype.readAndCheckSignature = function(t4) {
      return t4 === this.readData(4);
    }, i2.prototype.readData = function(t4) {
      this.checkOffset(t4);
      var e3 = this.data.slice(this.zero + this.index, this.zero + this.index + t4);
      return this.index += t4, e3;
    }, e2.exports = i2;
  }, { "../utils": 32, "./DataReader": 18 }], 21: [function(t3, e2, r2) {
    var n2 = t3("./ArrayReader");
    function i2(t4) {
      n2.call(this, t4);
    }
    t3("../utils").inherits(i2, n2), i2.prototype.readData = function(t4) {
      if (this.checkOffset(t4), 0 === t4)
        return new Uint8Array(0);
      var e3 = this.data.subarray(this.zero + this.index, this.zero + this.index + t4);
      return this.index += t4, e3;
    }, e2.exports = i2;
  }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(t3, e2, r2) {
    var n2 = t3("../utils"), i2 = t3("../support"), a2 = t3("./ArrayReader"), s2 = t3("./StringReader"), o2 = t3("./NodeBufferReader"), h2 = t3("./Uint8ArrayReader");
    e2.exports = function(t4) {
      var e3 = n2.getTypeOf(t4);
      return n2.checkSupport(e3), "string" !== e3 || i2.uint8array ? "nodebuffer" === e3 ? new o2(t4) : i2.uint8array ? new h2(n2.transformTo("uint8array", t4)) : new a2(n2.transformTo("array", t4)) : new s2(t4);
    };
  }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(t3, e2, r2) {
    r2.LOCAL_FILE_HEADER = "PK", r2.CENTRAL_FILE_HEADER = "PK", r2.CENTRAL_DIRECTORY_END = "PK", r2.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r2.ZIP64_CENTRAL_DIRECTORY_END = "PK", r2.DATA_DESCRIPTOR = "PK\x07\b";
  }, {}], 24: [function(t3, e2, r2) {
    var n2 = t3("./GenericWorker"), i2 = t3("../utils");
    function a2(t4) {
      n2.call(this, "ConvertWorker to " + t4), this.destType = t4;
    }
    i2.inherits(a2, n2), a2.prototype.processChunk = function(t4) {
      this.push({ data: i2.transformTo(this.destType, t4.data), meta: t4.meta });
    }, e2.exports = a2;
  }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(t3, e2, r2) {
    var n2 = t3("./GenericWorker"), i2 = t3("../crc32");
    function a2() {
      n2.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
    }
    t3("../utils").inherits(a2, n2), a2.prototype.processChunk = function(t4) {
      this.streamInfo.crc32 = i2(t4.data, this.streamInfo.crc32 || 0), this.push(t4);
    }, e2.exports = a2;
  }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(t3, e2, r2) {
    var n2 = t3("../utils"), i2 = t3("./GenericWorker");
    function a2(t4) {
      i2.call(this, "DataLengthProbe for " + t4), this.propName = t4, this.withStreamInfo(t4, 0);
    }
    n2.inherits(a2, i2), a2.prototype.processChunk = function(t4) {
      if (t4) {
        var e3 = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = e3 + t4.data.length;
      }
      i2.prototype.processChunk.call(this, t4);
    }, e2.exports = a2;
  }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(t3, e2, r2) {
    var n2 = t3("../utils"), i2 = t3("./GenericWorker");
    function a2(t4) {
      i2.call(this, "DataWorker");
      var e3 = this;
      this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, t4.then(function(t5) {
        e3.dataIsReady = true, e3.data = t5, e3.max = t5 && t5.length || 0, e3.type = n2.getTypeOf(t5), e3.isPaused || e3._tickAndRepeat();
      }, function(t5) {
        e3.error(t5);
      });
    }
    n2.inherits(a2, i2), a2.prototype.cleanUp = function() {
      i2.prototype.cleanUp.call(this), this.data = null;
    }, a2.prototype.resume = function() {
      return !!i2.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n2.delay(this._tickAndRepeat, [], this)), true);
    }, a2.prototype._tickAndRepeat = function() {
      this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n2.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
    }, a2.prototype._tick = function() {
      if (this.isPaused || this.isFinished)
        return false;
      var t4 = null, e3 = Math.min(this.max, this.index + 16384);
      if (this.index >= this.max)
        return this.end();
      switch (this.type) {
        case "string":
          t4 = this.data.substring(this.index, e3);
          break;
        case "uint8array":
          t4 = this.data.subarray(this.index, e3);
          break;
        case "array":
        case "nodebuffer":
          t4 = this.data.slice(this.index, e3);
      }
      return this.index = e3, this.push({ data: t4, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
    }, e2.exports = a2;
  }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(t3, e2, r2) {
    function n2(t4) {
      this.name = t4 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
    }
    n2.prototype = { push: function(t4) {
      this.emit("data", t4);
    }, end: function() {
      if (this.isFinished)
        return false;
      this.flush();
      try {
        this.emit("end"), this.cleanUp(), this.isFinished = true;
      } catch (t4) {
        this.emit("error", t4);
      }
      return true;
    }, error: function(t4) {
      return !this.isFinished && (this.isPaused ? this.generatedError = t4 : (this.isFinished = true, this.emit("error", t4), this.previous && this.previous.error(t4), this.cleanUp()), true);
    }, on: function(t4, e3) {
      return this._listeners[t4].push(e3), this;
    }, cleanUp: function() {
      this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
    }, emit: function(t4, e3) {
      if (this._listeners[t4])
        for (var r3 = 0; r3 < this._listeners[t4].length; r3++)
          this._listeners[t4][r3].call(this, e3);
    }, pipe: function(t4) {
      return t4.registerPrevious(this);
    }, registerPrevious: function(t4) {
      if (this.isLocked)
        throw new Error("The stream '" + this + "' has already been used.");
      this.streamInfo = t4.streamInfo, this.mergeStreamInfo(), this.previous = t4;
      var e3 = this;
      return t4.on("data", function(t5) {
        e3.processChunk(t5);
      }), t4.on("end", function() {
        e3.end();
      }), t4.on("error", function(t5) {
        e3.error(t5);
      }), this;
    }, pause: function() {
      return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
    }, resume: function() {
      if (!this.isPaused || this.isFinished)
        return false;
      var t4 = this.isPaused = false;
      return this.generatedError && (this.error(this.generatedError), t4 = true), this.previous && this.previous.resume(), !t4;
    }, flush: function() {
    }, processChunk: function(t4) {
      this.push(t4);
    }, withStreamInfo: function(t4, e3) {
      return this.extraStreamInfo[t4] = e3, this.mergeStreamInfo(), this;
    }, mergeStreamInfo: function() {
      for (var t4 in this.extraStreamInfo)
        Object.prototype.hasOwnProperty.call(this.extraStreamInfo, t4) && (this.streamInfo[t4] = this.extraStreamInfo[t4]);
    }, lock: function() {
      if (this.isLocked)
        throw new Error("The stream '" + this + "' has already been used.");
      this.isLocked = true, this.previous && this.previous.lock();
    }, toString: function() {
      var t4 = "Worker " + this.name;
      return this.previous ? this.previous + " -> " + t4 : t4;
    } }, e2.exports = n2;
  }, {}], 29: [function(t3, e2, r2) {
    var n2 = t3("../utils"), i2 = t3("./ConvertWorker"), a2 = t3("./GenericWorker"), s2 = t3("../base64"), o2 = t3("../support"), h2 = t3("../external"), u2 = null;
    if (o2.nodestream)
      try {
        u2 = t3("../nodejs/NodejsStreamOutputAdapter");
      } catch (t4) {
      }
    function f2(t4, e3) {
      return new h2.Promise(function(r3, i3) {
        var a3 = [], o3 = t4._internalType, h3 = t4._outputType, u3 = t4._mimeType;
        t4.on("data", function(t5, r4) {
          a3.push(t5), e3 && e3(r4);
        }).on("error", function(t5) {
          a3 = [], i3(t5);
        }).on("end", function() {
          try {
            var t5 = function(t6, e4, r4) {
              switch (t6) {
                case "blob":
                  return n2.newBlob(n2.transformTo("arraybuffer", e4), r4);
                case "base64":
                  return s2.encode(e4);
                default:
                  return n2.transformTo(t6, e4);
              }
            }(h3, function(t6, e4) {
              var r4, n3 = 0, i4 = null, a4 = 0;
              for (r4 = 0; r4 < e4.length; r4++)
                a4 += e4[r4].length;
              switch (t6) {
                case "string":
                  return e4.join("");
                case "array":
                  return Array.prototype.concat.apply([], e4);
                case "uint8array":
                  for (i4 = new Uint8Array(a4), r4 = 0; r4 < e4.length; r4++)
                    i4.set(e4[r4], n3), n3 += e4[r4].length;
                  return i4;
                case "nodebuffer":
                  return p.concat(e4);
                default:
                  throw new Error("concat : unsupported type '" + t6 + "'");
              }
            }(o3, a3), u3);
            r3(t5);
          } catch (t6) {
            i3(t6);
          }
          a3 = [];
        }).resume();
      });
    }
    function l2(t4, e3, r3) {
      var s3 = e3;
      switch (e3) {
        case "blob":
        case "arraybuffer":
          s3 = "uint8array";
          break;
        case "base64":
          s3 = "string";
      }
      try {
        this._internalType = s3, this._outputType = e3, this._mimeType = r3, n2.checkSupport(s3), this._worker = t4.pipe(new i2(s3)), t4.lock();
      } catch (t5) {
        this._worker = new a2("error"), this._worker.error(t5);
      }
    }
    l2.prototype = { accumulate: function(t4) {
      return f2(this, t4);
    }, on: function(t4, e3) {
      var r3 = this;
      return "data" === t4 ? this._worker.on(t4, function(t5) {
        e3.call(r3, t5.data, t5.meta);
      }) : this._worker.on(t4, function() {
        n2.delay(e3, arguments, r3);
      }), this;
    }, resume: function() {
      return n2.delay(this._worker.resume, [], this._worker), this;
    }, pause: function() {
      return this._worker.pause(), this;
    }, toNodejsStream: function(t4) {
      if (n2.checkSupport("nodestream"), "nodebuffer" !== this._outputType)
        throw new Error(this._outputType + " is not supported by this method");
      return new u2(this, { objectMode: "nodebuffer" !== this._outputType }, t4);
    } }, e2.exports = l2;
  }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(t3, e2, r2) {
    if (r2.base64 = true, r2.array = true, r2.string = true, r2.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r2.nodebuffer = void 0 !== p, r2.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer)
      r2.blob = false;
    else {
      var n2 = new ArrayBuffer(0);
      try {
        r2.blob = 0 === new Blob([n2], { type: "application/zip" }).size;
      } catch (t4) {
        try {
          var i2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
          i2.append(n2), r2.blob = 0 === i2.getBlob("application/zip").size;
        } catch (t5) {
          r2.blob = false;
        }
      }
    }
    try {
      r2.nodestream = !!t3("readable-stream").Readable;
    } catch (t4) {
      r2.nodestream = false;
    }
  }, { "readable-stream": 16 }], 31: [function(t3, e2, r2) {
    for (var n2 = t3("./utils"), i2 = t3("./support"), a2 = t3("./nodejsUtils"), s2 = t3("./stream/GenericWorker"), o2 = new Array(256), h2 = 0; h2 < 256; h2++)
      o2[h2] = 252 <= h2 ? 6 : 248 <= h2 ? 5 : 240 <= h2 ? 4 : 224 <= h2 ? 3 : 192 <= h2 ? 2 : 1;
    function u2() {
      s2.call(this, "utf-8 decode"), this.leftOver = null;
    }
    function f2() {
      s2.call(this, "utf-8 encode");
    }
    o2[254] = o2[254] = 1, r2.utf8encode = function(t4) {
      return i2.nodebuffer ? a2.newBufferFrom(t4, "utf-8") : function(t5) {
        var e3, r3, n3, a3, s3, o3 = t5.length, h3 = 0;
        for (a3 = 0; a3 < o3; a3++)
          55296 == (64512 & (r3 = t5.charCodeAt(a3))) && a3 + 1 < o3 && 56320 == (64512 & (n3 = t5.charCodeAt(a3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (n3 - 56320), a3++), h3 += r3 < 128 ? 1 : r3 < 2048 ? 2 : r3 < 65536 ? 3 : 4;
        for (e3 = i2.uint8array ? new Uint8Array(h3) : new Array(h3), a3 = s3 = 0; s3 < h3; a3++)
          55296 == (64512 & (r3 = t5.charCodeAt(a3))) && a3 + 1 < o3 && 56320 == (64512 & (n3 = t5.charCodeAt(a3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (n3 - 56320), a3++), r3 < 128 ? e3[s3++] = r3 : (r3 < 2048 ? e3[s3++] = 192 | r3 >>> 6 : (r3 < 65536 ? e3[s3++] = 224 | r3 >>> 12 : (e3[s3++] = 240 | r3 >>> 18, e3[s3++] = 128 | r3 >>> 12 & 63), e3[s3++] = 128 | r3 >>> 6 & 63), e3[s3++] = 128 | 63 & r3);
        return e3;
      }(t4);
    }, r2.utf8decode = function(t4) {
      return i2.nodebuffer ? n2.transformTo("nodebuffer", t4).toString("utf-8") : function(t5) {
        var e3, r3, i3, a3, s3 = t5.length, h3 = new Array(2 * s3);
        for (e3 = r3 = 0; e3 < s3; )
          if ((i3 = t5[e3++]) < 128)
            h3[r3++] = i3;
          else if (4 < (a3 = o2[i3]))
            h3[r3++] = 65533, e3 += a3 - 1;
          else {
            for (i3 &= 2 === a3 ? 31 : 3 === a3 ? 15 : 7; 1 < a3 && e3 < s3; )
              i3 = i3 << 6 | 63 & t5[e3++], a3--;
            1 < a3 ? h3[r3++] = 65533 : i3 < 65536 ? h3[r3++] = i3 : (i3 -= 65536, h3[r3++] = 55296 | i3 >> 10 & 1023, h3[r3++] = 56320 | 1023 & i3);
          }
        return h3.length !== r3 && (h3.subarray ? h3 = h3.subarray(0, r3) : h3.length = r3), n2.applyFromCharCode(h3);
      }(t4 = n2.transformTo(i2.uint8array ? "uint8array" : "array", t4));
    }, n2.inherits(u2, s2), u2.prototype.processChunk = function(t4) {
      var e3 = n2.transformTo(i2.uint8array ? "uint8array" : "array", t4.data);
      if (this.leftOver && this.leftOver.length) {
        if (i2.uint8array) {
          var a3 = e3;
          (e3 = new Uint8Array(a3.length + this.leftOver.length)).set(this.leftOver, 0), e3.set(a3, this.leftOver.length);
        } else
          e3 = this.leftOver.concat(e3);
        this.leftOver = null;
      }
      var s3 = function(t5, e4) {
        var r3;
        for ((e4 = e4 || t5.length) > t5.length && (e4 = t5.length), r3 = e4 - 1; 0 <= r3 && 128 == (192 & t5[r3]); )
          r3--;
        return r3 < 0 || 0 === r3 ? e4 : r3 + o2[t5[r3]] > e4 ? r3 : e4;
      }(e3), h3 = e3;
      s3 !== e3.length && (i2.uint8array ? (h3 = e3.subarray(0, s3), this.leftOver = e3.subarray(s3, e3.length)) : (h3 = e3.slice(0, s3), this.leftOver = e3.slice(s3, e3.length))), this.push({ data: r2.utf8decode(h3), meta: t4.meta });
    }, u2.prototype.flush = function() {
      this.leftOver && this.leftOver.length && (this.push({ data: r2.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
    }, r2.Utf8DecodeWorker = u2, n2.inherits(f2, s2), f2.prototype.processChunk = function(t4) {
      this.push({ data: r2.utf8encode(t4.data), meta: t4.meta });
    }, r2.Utf8EncodeWorker = f2;
  }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(t3, e2, r2) {
    var n2 = t3("./support"), i2 = t3("./base64"), a2 = t3("./nodejsUtils"), s2 = t3("./external");
    function o2(t4) {
      return t4;
    }
    function h2(t4, e3) {
      for (var r3 = 0; r3 < t4.length; ++r3)
        e3[r3] = 255 & t4.charCodeAt(r3);
      return e3;
    }
    t3("setimmediate"), r2.newBlob = function(t4, e3) {
      r2.checkSupport("blob");
      try {
        return new Blob([t4], { type: e3 });
      } catch (r3) {
        try {
          var n3 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
          return n3.append(t4), n3.getBlob(e3);
        } catch (t5) {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    var u2 = { stringifyByChunk: function(t4, e3, r3) {
      var n3 = [], i3 = 0, a3 = t4.length;
      if (a3 <= r3)
        return String.fromCharCode.apply(null, t4);
      for (; i3 < a3; )
        "array" === e3 || "nodebuffer" === e3 ? n3.push(String.fromCharCode.apply(null, t4.slice(i3, Math.min(i3 + r3, a3)))) : n3.push(String.fromCharCode.apply(null, t4.subarray(i3, Math.min(i3 + r3, a3)))), i3 += r3;
      return n3.join("");
    }, stringifyByChar: function(t4) {
      for (var e3 = "", r3 = 0; r3 < t4.length; r3++)
        e3 += String.fromCharCode(t4[r3]);
      return e3;
    }, applyCanBeUsed: { uint8array: function() {
      try {
        return n2.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
      } catch (t4) {
        return false;
      }
    }(), nodebuffer: function() {
      try {
        return n2.nodebuffer && 1 === String.fromCharCode.apply(null, a2.allocBuffer(1)).length;
      } catch (t4) {
        return false;
      }
    }() } };
    function f2(t4) {
      var e3 = 65536, n3 = r2.getTypeOf(t4), i3 = true;
      if ("uint8array" === n3 ? i3 = u2.applyCanBeUsed.uint8array : "nodebuffer" === n3 && (i3 = u2.applyCanBeUsed.nodebuffer), i3)
        for (; 1 < e3; )
          try {
            return u2.stringifyByChunk(t4, n3, e3);
          } catch (t5) {
            e3 = Math.floor(e3 / 2);
          }
      return u2.stringifyByChar(t4);
    }
    function l2(t4, e3) {
      for (var r3 = 0; r3 < t4.length; r3++)
        e3[r3] = t4[r3];
      return e3;
    }
    r2.applyFromCharCode = f2;
    var c2 = {};
    c2.string = { string: o2, array: function(t4) {
      return h2(t4, new Array(t4.length));
    }, arraybuffer: function(t4) {
      return c2.string.uint8array(t4).buffer;
    }, uint8array: function(t4) {
      return h2(t4, new Uint8Array(t4.length));
    }, nodebuffer: function(t4) {
      return h2(t4, a2.allocBuffer(t4.length));
    } }, c2.array = { string: f2, array: o2, arraybuffer: function(t4) {
      return new Uint8Array(t4).buffer;
    }, uint8array: function(t4) {
      return new Uint8Array(t4);
    }, nodebuffer: function(t4) {
      return a2.newBufferFrom(t4);
    } }, c2.arraybuffer = { string: function(t4) {
      return f2(new Uint8Array(t4));
    }, array: function(t4) {
      return l2(new Uint8Array(t4), new Array(t4.byteLength));
    }, arraybuffer: o2, uint8array: function(t4) {
      return new Uint8Array(t4);
    }, nodebuffer: function(t4) {
      return a2.newBufferFrom(new Uint8Array(t4));
    } }, c2.uint8array = { string: f2, array: function(t4) {
      return l2(t4, new Array(t4.length));
    }, arraybuffer: function(t4) {
      return t4.buffer;
    }, uint8array: o2, nodebuffer: function(t4) {
      return a2.newBufferFrom(t4);
    } }, c2.nodebuffer = { string: f2, array: function(t4) {
      return l2(t4, new Array(t4.length));
    }, arraybuffer: function(t4) {
      return c2.nodebuffer.uint8array(t4).buffer;
    }, uint8array: function(t4) {
      return l2(t4, new Uint8Array(t4.length));
    }, nodebuffer: o2 }, r2.transformTo = function(t4, e3) {
      if (e3 = e3 || "", !t4)
        return e3;
      r2.checkSupport(t4);
      var n3 = r2.getTypeOf(e3);
      return c2[n3][t4](e3);
    }, r2.resolve = function(t4) {
      for (var e3 = t4.split("/"), r3 = [], n3 = 0; n3 < e3.length; n3++) {
        var i3 = e3[n3];
        "." === i3 || "" === i3 && 0 !== n3 && n3 !== e3.length - 1 || (".." === i3 ? r3.pop() : r3.push(i3));
      }
      return r3.join("/");
    }, r2.getTypeOf = function(t4) {
      return "string" == typeof t4 ? "string" : "[object Array]" === Object.prototype.toString.call(t4) ? "array" : n2.nodebuffer && a2.isBuffer(t4) ? "nodebuffer" : n2.uint8array && t4 instanceof Uint8Array ? "uint8array" : n2.arraybuffer && t4 instanceof ArrayBuffer ? "arraybuffer" : void 0;
    }, r2.checkSupport = function(t4) {
      if (!n2[t4.toLowerCase()])
        throw new Error(t4 + " is not supported by this platform");
    }, r2.MAX_VALUE_16BITS = 65535, r2.MAX_VALUE_32BITS = -1, r2.pretty = function(t4) {
      var e3, r3, n3 = "";
      for (r3 = 0; r3 < (t4 || "").length; r3++)
        n3 += "\\x" + ((e3 = t4.charCodeAt(r3)) < 16 ? "0" : "") + e3.toString(16).toUpperCase();
      return n3;
    }, r2.delay = function(t4, e3, r3) {
      setImmediate(function() {
        t4.apply(r3 || null, e3 || []);
      });
    }, r2.inherits = function(t4, e3) {
      function r3() {
      }
      r3.prototype = e3.prototype, t4.prototype = new r3();
    }, r2.extend = function() {
      var t4, e3, r3 = {};
      for (t4 = 0; t4 < arguments.length; t4++)
        for (e3 in arguments[t4])
          Object.prototype.hasOwnProperty.call(arguments[t4], e3) && void 0 === r3[e3] && (r3[e3] = arguments[t4][e3]);
      return r3;
    }, r2.prepareContent = function(t4, e3, a3, o3, u3) {
      return s2.Promise.resolve(e3).then(function(t5) {
        return n2.blob && (t5 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(t5))) && "undefined" != typeof FileReader ? new s2.Promise(function(e4, r3) {
          var n3 = new FileReader();
          n3.onload = function(t6) {
            e4(t6.target.result);
          }, n3.onerror = function(t6) {
            r3(t6.target.error);
          }, n3.readAsArrayBuffer(t5);
        }) : t5;
      }).then(function(e4) {
        var f3 = r2.getTypeOf(e4);
        return f3 ? ("arraybuffer" === f3 ? e4 = r2.transformTo("uint8array", e4) : "string" === f3 && (u3 ? e4 = i2.decode(e4) : a3 && true !== o3 && (e4 = function(t5) {
          return h2(t5, n2.uint8array ? new Uint8Array(t5.length) : new Array(t5.length));
        }(e4))), e4) : s2.Promise.reject(new Error("Can't read the data of '" + t4 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
      });
    };
  }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(t3, e2, r2) {
    var n2 = t3("./reader/readerFor"), i2 = t3("./utils"), a2 = t3("./signature"), s2 = t3("./zipEntry"), o2 = t3("./support");
    function h2(t4) {
      this.files = [], this.loadOptions = t4;
    }
    h2.prototype = { checkSignature: function(t4) {
      if (!this.reader.readAndCheckSignature(t4)) {
        this.reader.index -= 4;
        var e3 = this.reader.readString(4);
        throw new Error("Corrupted zip or bug: unexpected signature (" + i2.pretty(e3) + ", expected " + i2.pretty(t4) + ")");
      }
    }, isSignature: function(t4, e3) {
      var r3 = this.reader.index;
      this.reader.setIndex(t4);
      var n3 = this.reader.readString(4) === e3;
      return this.reader.setIndex(r3), n3;
    }, readBlockEndOfCentral: function() {
      this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
      var t4 = this.reader.readData(this.zipCommentLength), e3 = o2.uint8array ? "uint8array" : "array", r3 = i2.transformTo(e3, t4);
      this.zipComment = this.loadOptions.decodeFileName(r3);
    }, readBlockZip64EndOfCentral: function() {
      this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
      for (var t4, e3, r3, n3 = this.zip64EndOfCentralSize - 44; 0 < n3; )
        t4 = this.reader.readInt(2), e3 = this.reader.readInt(4), r3 = this.reader.readData(e3), this.zip64ExtensibleData[t4] = { id: t4, length: e3, value: r3 };
    }, readBlockZip64EndOfCentralLocator: function() {
      if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount)
        throw new Error("Multi-volumes zip are not supported");
    }, readLocalFiles: function() {
      var t4, e3;
      for (t4 = 0; t4 < this.files.length; t4++)
        e3 = this.files[t4], this.reader.setIndex(e3.localHeaderOffset), this.checkSignature(a2.LOCAL_FILE_HEADER), e3.readLocalPart(this.reader), e3.handleUTF8(), e3.processAttributes();
    }, readCentralDir: function() {
      var t4;
      for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a2.CENTRAL_FILE_HEADER); )
        (t4 = new s2({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t4);
      if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length)
        throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
    }, readEndOfCentral: function() {
      var t4 = this.reader.lastIndexOfSignature(a2.CENTRAL_DIRECTORY_END);
      if (t4 < 0)
        throw this.isSignature(0, a2.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
      this.reader.setIndex(t4);
      var e3 = t4;
      if (this.checkSignature(a2.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i2.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i2.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i2.MAX_VALUE_16BITS || this.centralDirRecords === i2.MAX_VALUE_16BITS || this.centralDirSize === i2.MAX_VALUE_32BITS || this.centralDirOffset === i2.MAX_VALUE_32BITS) {
        if (this.zip64 = true, (t4 = this.reader.lastIndexOfSignature(a2.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
          throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
        if (this.reader.setIndex(t4), this.checkSignature(a2.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a2.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a2.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
          throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a2.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
      }
      var r3 = this.centralDirOffset + this.centralDirSize;
      this.zip64 && (r3 += 20, r3 += 12 + this.zip64EndOfCentralSize);
      var n3 = e3 - r3;
      if (0 < n3)
        this.isSignature(e3, a2.CENTRAL_FILE_HEADER) || (this.reader.zero = n3);
      else if (n3 < 0)
        throw new Error("Corrupted zip: missing " + Math.abs(n3) + " bytes.");
    }, prepareReader: function(t4) {
      this.reader = n2(t4);
    }, load: function(t4) {
      this.prepareReader(t4), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
    } }, e2.exports = h2;
  }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(t3, e2, r2) {
    var n2 = t3("./reader/readerFor"), i2 = t3("./utils"), a2 = t3("./compressedObject"), s2 = t3("./crc32"), o2 = t3("./utf8"), h2 = t3("./compressions"), u2 = t3("./support");
    function f2(t4, e3) {
      this.options = t4, this.loadOptions = e3;
    }
    f2.prototype = { isEncrypted: function() {
      return !(1 & ~this.bitFlag);
    }, useUTF8: function() {
      return !(2048 & ~this.bitFlag);
    }, readLocalPart: function(t4) {
      var e3, r3;
      if (t4.skip(22), this.fileNameLength = t4.readInt(2), r3 = t4.readInt(2), this.fileName = t4.readData(this.fileNameLength), t4.skip(r3), -1 === this.compressedSize || -1 === this.uncompressedSize)
        throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
      if (null === (e3 = function(t5) {
        for (var e4 in h2)
          if (Object.prototype.hasOwnProperty.call(h2, e4) && h2[e4].magic === t5)
            return h2[e4];
        return null;
      }(this.compressionMethod)))
        throw new Error("Corrupted zip : compression " + i2.pretty(this.compressionMethod) + " unknown (inner file : " + i2.transformTo("string", this.fileName) + ")");
      this.decompressed = new a2(this.compressedSize, this.uncompressedSize, this.crc32, e3, t4.readData(this.compressedSize));
    }, readCentralPart: function(t4) {
      this.versionMadeBy = t4.readInt(2), t4.skip(2), this.bitFlag = t4.readInt(2), this.compressionMethod = t4.readString(2), this.date = t4.readDate(), this.crc32 = t4.readInt(4), this.compressedSize = t4.readInt(4), this.uncompressedSize = t4.readInt(4);
      var e3 = t4.readInt(2);
      if (this.extraFieldsLength = t4.readInt(2), this.fileCommentLength = t4.readInt(2), this.diskNumberStart = t4.readInt(2), this.internalFileAttributes = t4.readInt(2), this.externalFileAttributes = t4.readInt(4), this.localHeaderOffset = t4.readInt(4), this.isEncrypted())
        throw new Error("Encrypted zip are not supported");
      t4.skip(e3), this.readExtraFields(t4), this.parseZIP64ExtraField(t4), this.fileComment = t4.readData(this.fileCommentLength);
    }, processAttributes: function() {
      this.unixPermissions = null, this.dosPermissions = null;
      var t4 = this.versionMadeBy >> 8;
      this.dir = !!(16 & this.externalFileAttributes), 0 == t4 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == t4 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
    }, parseZIP64ExtraField: function() {
      if (this.extraFields[1]) {
        var t4 = n2(this.extraFields[1].value);
        this.uncompressedSize === i2.MAX_VALUE_32BITS && (this.uncompressedSize = t4.readInt(8)), this.compressedSize === i2.MAX_VALUE_32BITS && (this.compressedSize = t4.readInt(8)), this.localHeaderOffset === i2.MAX_VALUE_32BITS && (this.localHeaderOffset = t4.readInt(8)), this.diskNumberStart === i2.MAX_VALUE_32BITS && (this.diskNumberStart = t4.readInt(4));
      }
    }, readExtraFields: function(t4) {
      var e3, r3, n3, i3 = t4.index + this.extraFieldsLength;
      for (this.extraFields || (this.extraFields = {}); t4.index + 4 < i3; )
        e3 = t4.readInt(2), r3 = t4.readInt(2), n3 = t4.readData(r3), this.extraFields[e3] = { id: e3, length: r3, value: n3 };
      t4.setIndex(i3);
    }, handleUTF8: function() {
      var t4 = u2.uint8array ? "uint8array" : "array";
      if (this.useUTF8())
        this.fileNameStr = o2.utf8decode(this.fileName), this.fileCommentStr = o2.utf8decode(this.fileComment);
      else {
        var e3 = this.findExtraFieldUnicodePath();
        if (null !== e3)
          this.fileNameStr = e3;
        else {
          var r3 = i2.transformTo(t4, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName(r3);
        }
        var n3 = this.findExtraFieldUnicodeComment();
        if (null !== n3)
          this.fileCommentStr = n3;
        else {
          var a3 = i2.transformTo(t4, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(a3);
        }
      }
    }, findExtraFieldUnicodePath: function() {
      var t4 = this.extraFields[28789];
      if (t4) {
        var e3 = n2(t4.value);
        return 1 !== e3.readInt(1) || s2(this.fileName) !== e3.readInt(4) ? null : o2.utf8decode(e3.readData(t4.length - 5));
      }
      return null;
    }, findExtraFieldUnicodeComment: function() {
      var t4 = this.extraFields[25461];
      if (t4) {
        var e3 = n2(t4.value);
        return 1 !== e3.readInt(1) || s2(this.fileComment) !== e3.readInt(4) ? null : o2.utf8decode(e3.readData(t4.length - 5));
      }
      return null;
    } }, e2.exports = f2;
  }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(t3, e2, r2) {
    function n2(t4, e3, r3) {
      this.name = t4, this.dir = r3.dir, this.date = r3.date, this.comment = r3.comment, this.unixPermissions = r3.unixPermissions, this.dosPermissions = r3.dosPermissions, this._data = e3, this._dataBinary = r3.binary, this.options = { compression: r3.compression, compressionOptions: r3.compressionOptions };
    }
    var i2 = t3("./stream/StreamHelper"), a2 = t3("./stream/DataWorker"), s2 = t3("./utf8"), o2 = t3("./compressedObject"), h2 = t3("./stream/GenericWorker");
    n2.prototype = { internalStream: function(t4) {
      var e3 = null, r3 = "string";
      try {
        if (!t4)
          throw new Error("No output type specified.");
        var n3 = "string" === (r3 = t4.toLowerCase()) || "text" === r3;
        "binarystring" !== r3 && "text" !== r3 || (r3 = "string"), e3 = this._decompressWorker();
        var a3 = !this._dataBinary;
        a3 && !n3 && (e3 = e3.pipe(new s2.Utf8EncodeWorker())), !a3 && n3 && (e3 = e3.pipe(new s2.Utf8DecodeWorker()));
      } catch (t5) {
        (e3 = new h2("error")).error(t5);
      }
      return new i2(e3, r3, "");
    }, async: function(t4, e3) {
      return this.internalStream(t4).accumulate(e3);
    }, nodeStream: function(t4, e3) {
      return this.internalStream(t4 || "nodebuffer").toNodejsStream(e3);
    }, _compressWorker: function(t4, e3) {
      if (this._data instanceof o2 && this._data.compression.magic === t4.magic)
        return this._data.getCompressedWorker();
      var r3 = this._decompressWorker();
      return this._dataBinary || (r3 = r3.pipe(new s2.Utf8EncodeWorker())), o2.createWorkerFrom(r3, t4, e3);
    }, _decompressWorker: function() {
      return this._data instanceof o2 ? this._data.getContentWorker() : this._data instanceof h2 ? this._data : new a2(this._data);
    } };
    for (var u2 = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], f2 = function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, l2 = 0; l2 < u2.length; l2++)
      n2.prototype[u2[l2]] = f2;
    e2.exports = n2;
  }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(t3, e2, r2) {
    (function(t4) {
      var r3, n2, i2 = t4.MutationObserver || t4.WebKitMutationObserver;
      if (i2) {
        var a2 = 0, s2 = new i2(f2), o2 = t4.document.createTextNode("");
        s2.observe(o2, { characterData: true }), r3 = function() {
          o2.data = a2 = ++a2 % 2;
        };
      } else if (t4.setImmediate || void 0 === t4.MessageChannel)
        r3 = "document" in t4 && "onreadystatechange" in t4.document.createElement("script") ? function() {
          var e3 = t4.document.createElement("script");
          e3.onreadystatechange = function() {
            f2(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
          }, t4.document.documentElement.appendChild(e3);
        } : function() {
          setTimeout(f2, 0);
        };
      else {
        var h2 = new t4.MessageChannel();
        h2.port1.onmessage = f2, r3 = function() {
          h2.port2.postMessage(0);
        };
      }
      var u2 = [];
      function f2() {
        var t5, e3;
        n2 = true;
        for (var r4 = u2.length; r4; ) {
          for (e3 = u2, u2 = [], t5 = -1; ++t5 < r4; )
            e3[t5]();
          r4 = u2.length;
        }
        n2 = false;
      }
      e2.exports = function(t5) {
        1 !== u2.push(t5) || n2 || r3();
      };
    }).call(this, void 0 !== kt ? kt : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {}], 37: [function(t3, e2, r2) {
    var n2 = t3("immediate");
    function i2() {
    }
    var a2 = {}, s2 = ["REJECTED"], o2 = ["FULFILLED"], h2 = ["PENDING"];
    function u2(t4) {
      if ("function" != typeof t4)
        throw new TypeError("resolver must be a function");
      this.state = h2, this.queue = [], this.outcome = void 0, t4 !== i2 && d2(this, t4);
    }
    function f2(t4, e3, r3) {
      this.promise = t4, "function" == typeof e3 && (this.onFulfilled = e3, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r3 && (this.onRejected = r3, this.callRejected = this.otherCallRejected);
    }
    function l2(t4, e3, r3) {
      n2(function() {
        var n3;
        try {
          n3 = e3(r3);
        } catch (n4) {
          return a2.reject(t4, n4);
        }
        n3 === t4 ? a2.reject(t4, new TypeError("Cannot resolve promise with itself")) : a2.resolve(t4, n3);
      });
    }
    function c2(t4) {
      var e3 = t4 && t4.then;
      if (t4 && ("object" == typeof t4 || "function" == typeof t4) && "function" == typeof e3)
        return function() {
          e3.apply(t4, arguments);
        };
    }
    function d2(t4, e3) {
      var r3 = false;
      function n3(e4) {
        r3 || (r3 = true, a2.reject(t4, e4));
      }
      function i3(e4) {
        r3 || (r3 = true, a2.resolve(t4, e4));
      }
      var s3 = p2(function() {
        e3(i3, n3);
      });
      "error" === s3.status && n3(s3.value);
    }
    function p2(t4, e3) {
      var r3 = {};
      try {
        r3.value = t4(e3), r3.status = "success";
      } catch (t5) {
        r3.status = "error", r3.value = t5;
      }
      return r3;
    }
    (e2.exports = u2).prototype.finally = function(t4) {
      if ("function" != typeof t4)
        return this;
      var e3 = this.constructor;
      return this.then(function(r3) {
        return e3.resolve(t4()).then(function() {
          return r3;
        });
      }, function(r3) {
        return e3.resolve(t4()).then(function() {
          throw r3;
        });
      });
    }, u2.prototype.catch = function(t4) {
      return this.then(null, t4);
    }, u2.prototype.then = function(t4, e3) {
      if ("function" != typeof t4 && this.state === o2 || "function" != typeof e3 && this.state === s2)
        return this;
      var r3 = new this.constructor(i2);
      return this.state !== h2 ? l2(r3, this.state === o2 ? t4 : e3, this.outcome) : this.queue.push(new f2(r3, t4, e3)), r3;
    }, f2.prototype.callFulfilled = function(t4) {
      a2.resolve(this.promise, t4);
    }, f2.prototype.otherCallFulfilled = function(t4) {
      l2(this.promise, this.onFulfilled, t4);
    }, f2.prototype.callRejected = function(t4) {
      a2.reject(this.promise, t4);
    }, f2.prototype.otherCallRejected = function(t4) {
      l2(this.promise, this.onRejected, t4);
    }, a2.resolve = function(t4, e3) {
      var r3 = p2(c2, e3);
      if ("error" === r3.status)
        return a2.reject(t4, r3.value);
      var n3 = r3.value;
      if (n3)
        d2(t4, n3);
      else {
        t4.state = o2, t4.outcome = e3;
        for (var i3 = -1, s3 = t4.queue.length; ++i3 < s3; )
          t4.queue[i3].callFulfilled(e3);
      }
      return t4;
    }, a2.reject = function(t4, e3) {
      t4.state = s2, t4.outcome = e3;
      for (var r3 = -1, n3 = t4.queue.length; ++r3 < n3; )
        t4.queue[r3].callRejected(e3);
      return t4;
    }, u2.resolve = function(t4) {
      return t4 instanceof this ? t4 : a2.resolve(new this(i2), t4);
    }, u2.reject = function(t4) {
      var e3 = new this(i2);
      return a2.reject(e3, t4);
    }, u2.all = function(t4) {
      var e3 = this;
      if ("[object Array]" !== Object.prototype.toString.call(t4))
        return this.reject(new TypeError("must be an array"));
      var r3 = t4.length, n3 = false;
      if (!r3)
        return this.resolve([]);
      for (var s3 = new Array(r3), o3 = 0, h3 = -1, u3 = new this(i2); ++h3 < r3; )
        f3(t4[h3], h3);
      return u3;
      function f3(t5, i3) {
        e3.resolve(t5).then(function(t6) {
          s3[i3] = t6, ++o3 !== r3 || n3 || (n3 = true, a2.resolve(u3, s3));
        }, function(t6) {
          n3 || (n3 = true, a2.reject(u3, t6));
        });
      }
    }, u2.race = function(t4) {
      var e3 = this;
      if ("[object Array]" !== Object.prototype.toString.call(t4))
        return this.reject(new TypeError("must be an array"));
      var r3 = t4.length, n3 = false;
      if (!r3)
        return this.resolve([]);
      for (var s3, o3 = -1, h3 = new this(i2); ++o3 < r3; )
        s3 = t4[o3], e3.resolve(s3).then(function(t5) {
          n3 || (n3 = true, a2.resolve(h3, t5));
        }, function(t5) {
          n3 || (n3 = true, a2.reject(h3, t5));
        });
      return h3;
    };
  }, { immediate: 36 }], 38: [function(t3, e2, r2) {
    var n2 = {};
    (0, t3("./lib/utils/common").assign)(n2, t3("./lib/deflate"), t3("./lib/inflate"), t3("./lib/zlib/constants")), e2.exports = n2;
  }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(t3, e2, r2) {
    var n2 = t3("./zlib/deflate"), i2 = t3("./utils/common"), a2 = t3("./utils/strings"), s2 = t3("./zlib/messages"), o2 = t3("./zlib/zstream"), h2 = Object.prototype.toString, u2 = 0, f2 = -1, l2 = 0, c2 = 8;
    function d2(t4) {
      if (!(this instanceof d2))
        return new d2(t4);
      this.options = i2.assign({ level: f2, method: c2, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: l2, to: "" }, t4 || {});
      var e3 = this.options;
      e3.raw && 0 < e3.windowBits ? e3.windowBits = -e3.windowBits : e3.gzip && 0 < e3.windowBits && e3.windowBits < 16 && (e3.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new o2(), this.strm.avail_out = 0;
      var r3 = n2.deflateInit2(this.strm, e3.level, e3.method, e3.windowBits, e3.memLevel, e3.strategy);
      if (r3 !== u2)
        throw new Error(s2[r3]);
      if (e3.header && n2.deflateSetHeader(this.strm, e3.header), e3.dictionary) {
        var p3;
        if (p3 = "string" == typeof e3.dictionary ? a2.string2buf(e3.dictionary) : "[object ArrayBuffer]" === h2.call(e3.dictionary) ? new Uint8Array(e3.dictionary) : e3.dictionary, (r3 = n2.deflateSetDictionary(this.strm, p3)) !== u2)
          throw new Error(s2[r3]);
        this._dict_set = true;
      }
    }
    function p2(t4, e3) {
      var r3 = new d2(e3);
      if (r3.push(t4, true), r3.err)
        throw r3.msg || s2[r3.err];
      return r3.result;
    }
    d2.prototype.push = function(t4, e3) {
      var r3, s3, o3 = this.strm, f3 = this.options.chunkSize;
      if (this.ended)
        return false;
      s3 = e3 === ~~e3 ? e3 : true === e3 ? 4 : 0, "string" == typeof t4 ? o3.input = a2.string2buf(t4) : "[object ArrayBuffer]" === h2.call(t4) ? o3.input = new Uint8Array(t4) : o3.input = t4, o3.next_in = 0, o3.avail_in = o3.input.length;
      do {
        if (0 === o3.avail_out && (o3.output = new i2.Buf8(f3), o3.next_out = 0, o3.avail_out = f3), 1 !== (r3 = n2.deflate(o3, s3)) && r3 !== u2)
          return this.onEnd(r3), !(this.ended = true);
        0 !== o3.avail_out && (0 !== o3.avail_in || 4 !== s3 && 2 !== s3) || ("string" === this.options.to ? this.onData(a2.buf2binstring(i2.shrinkBuf(o3.output, o3.next_out))) : this.onData(i2.shrinkBuf(o3.output, o3.next_out)));
      } while ((0 < o3.avail_in || 0 === o3.avail_out) && 1 !== r3);
      return 4 === s3 ? (r3 = n2.deflateEnd(this.strm), this.onEnd(r3), this.ended = true, r3 === u2) : 2 !== s3 || (this.onEnd(u2), !(o3.avail_out = 0));
    }, d2.prototype.onData = function(t4) {
      this.chunks.push(t4);
    }, d2.prototype.onEnd = function(t4) {
      t4 === u2 && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i2.flattenChunks(this.chunks)), this.chunks = [], this.err = t4, this.msg = this.strm.msg;
    }, r2.Deflate = d2, r2.deflate = p2, r2.deflateRaw = function(t4, e3) {
      return (e3 = e3 || {}).raw = true, p2(t4, e3);
    }, r2.gzip = function(t4, e3) {
      return (e3 = e3 || {}).gzip = true, p2(t4, e3);
    };
  }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(t3, e2, r2) {
    var n2 = t3("./zlib/inflate"), i2 = t3("./utils/common"), a2 = t3("./utils/strings"), s2 = t3("./zlib/constants"), o2 = t3("./zlib/messages"), h2 = t3("./zlib/zstream"), u2 = t3("./zlib/gzheader"), f2 = Object.prototype.toString;
    function l2(t4) {
      if (!(this instanceof l2))
        return new l2(t4);
      this.options = i2.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t4 || {});
      var e3 = this.options;
      e3.raw && 0 <= e3.windowBits && e3.windowBits < 16 && (e3.windowBits = -e3.windowBits, 0 === e3.windowBits && (e3.windowBits = -15)), !(0 <= e3.windowBits && e3.windowBits < 16) || t4 && t4.windowBits || (e3.windowBits += 32), 15 < e3.windowBits && e3.windowBits < 48 && !(15 & e3.windowBits) && (e3.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new h2(), this.strm.avail_out = 0;
      var r3 = n2.inflateInit2(this.strm, e3.windowBits);
      if (r3 !== s2.Z_OK)
        throw new Error(o2[r3]);
      this.header = new u2(), n2.inflateGetHeader(this.strm, this.header);
    }
    function c2(t4, e3) {
      var r3 = new l2(e3);
      if (r3.push(t4, true), r3.err)
        throw r3.msg || o2[r3.err];
      return r3.result;
    }
    l2.prototype.push = function(t4, e3) {
      var r3, o3, h3, u3, l3, c3, d2 = this.strm, p2 = this.options.chunkSize, m2 = this.options.dictionary, g2 = false;
      if (this.ended)
        return false;
      o3 = e3 === ~~e3 ? e3 : true === e3 ? s2.Z_FINISH : s2.Z_NO_FLUSH, "string" == typeof t4 ? d2.input = a2.binstring2buf(t4) : "[object ArrayBuffer]" === f2.call(t4) ? d2.input = new Uint8Array(t4) : d2.input = t4, d2.next_in = 0, d2.avail_in = d2.input.length;
      do {
        if (0 === d2.avail_out && (d2.output = new i2.Buf8(p2), d2.next_out = 0, d2.avail_out = p2), (r3 = n2.inflate(d2, s2.Z_NO_FLUSH)) === s2.Z_NEED_DICT && m2 && (c3 = "string" == typeof m2 ? a2.string2buf(m2) : "[object ArrayBuffer]" === f2.call(m2) ? new Uint8Array(m2) : m2, r3 = n2.inflateSetDictionary(this.strm, c3)), r3 === s2.Z_BUF_ERROR && true === g2 && (r3 = s2.Z_OK, g2 = false), r3 !== s2.Z_STREAM_END && r3 !== s2.Z_OK)
          return this.onEnd(r3), !(this.ended = true);
        d2.next_out && (0 !== d2.avail_out && r3 !== s2.Z_STREAM_END && (0 !== d2.avail_in || o3 !== s2.Z_FINISH && o3 !== s2.Z_SYNC_FLUSH) || ("string" === this.options.to ? (h3 = a2.utf8border(d2.output, d2.next_out), u3 = d2.next_out - h3, l3 = a2.buf2string(d2.output, h3), d2.next_out = u3, d2.avail_out = p2 - u3, u3 && i2.arraySet(d2.output, d2.output, h3, u3, 0), this.onData(l3)) : this.onData(i2.shrinkBuf(d2.output, d2.next_out)))), 0 === d2.avail_in && 0 === d2.avail_out && (g2 = true);
      } while ((0 < d2.avail_in || 0 === d2.avail_out) && r3 !== s2.Z_STREAM_END);
      return r3 === s2.Z_STREAM_END && (o3 = s2.Z_FINISH), o3 === s2.Z_FINISH ? (r3 = n2.inflateEnd(this.strm), this.onEnd(r3), this.ended = true, r3 === s2.Z_OK) : o3 !== s2.Z_SYNC_FLUSH || (this.onEnd(s2.Z_OK), !(d2.avail_out = 0));
    }, l2.prototype.onData = function(t4) {
      this.chunks.push(t4);
    }, l2.prototype.onEnd = function(t4) {
      t4 === s2.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i2.flattenChunks(this.chunks)), this.chunks = [], this.err = t4, this.msg = this.strm.msg;
    }, r2.Inflate = l2, r2.inflate = c2, r2.inflateRaw = function(t4, e3) {
      return (e3 = e3 || {}).raw = true, c2(t4, e3);
    }, r2.ungzip = c2;
  }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(t3, e2, r2) {
    var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
    r2.assign = function(t4) {
      for (var e3 = Array.prototype.slice.call(arguments, 1); e3.length; ) {
        var r3 = e3.shift();
        if (r3) {
          if ("object" != typeof r3)
            throw new TypeError(r3 + "must be non-object");
          for (var n3 in r3)
            r3.hasOwnProperty(n3) && (t4[n3] = r3[n3]);
        }
      }
      return t4;
    }, r2.shrinkBuf = function(t4, e3) {
      return t4.length === e3 ? t4 : t4.subarray ? t4.subarray(0, e3) : (t4.length = e3, t4);
    };
    var i2 = { arraySet: function(t4, e3, r3, n3, i3) {
      if (e3.subarray && t4.subarray)
        t4.set(e3.subarray(r3, r3 + n3), i3);
      else
        for (var a3 = 0; a3 < n3; a3++)
          t4[i3 + a3] = e3[r3 + a3];
    }, flattenChunks: function(t4) {
      var e3, r3, n3, i3, a3, s2;
      for (e3 = n3 = 0, r3 = t4.length; e3 < r3; e3++)
        n3 += t4[e3].length;
      for (s2 = new Uint8Array(n3), e3 = i3 = 0, r3 = t4.length; e3 < r3; e3++)
        a3 = t4[e3], s2.set(a3, i3), i3 += a3.length;
      return s2;
    } }, a2 = { arraySet: function(t4, e3, r3, n3, i3) {
      for (var a3 = 0; a3 < n3; a3++)
        t4[i3 + a3] = e3[r3 + a3];
    }, flattenChunks: function(t4) {
      return [].concat.apply([], t4);
    } };
    r2.setTyped = function(t4) {
      t4 ? (r2.Buf8 = Uint8Array, r2.Buf16 = Uint16Array, r2.Buf32 = Int32Array, r2.assign(r2, i2)) : (r2.Buf8 = Array, r2.Buf16 = Array, r2.Buf32 = Array, r2.assign(r2, a2));
    }, r2.setTyped(n2);
  }, {}], 42: [function(t3, e2, r2) {
    var n2 = t3("./common"), i2 = true, a2 = true;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch (t4) {
      i2 = false;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t4) {
      a2 = false;
    }
    for (var s2 = new n2.Buf8(256), o2 = 0; o2 < 256; o2++)
      s2[o2] = 252 <= o2 ? 6 : 248 <= o2 ? 5 : 240 <= o2 ? 4 : 224 <= o2 ? 3 : 192 <= o2 ? 2 : 1;
    function h2(t4, e3) {
      if (e3 < 65537 && (t4.subarray && a2 || !t4.subarray && i2))
        return String.fromCharCode.apply(null, n2.shrinkBuf(t4, e3));
      for (var r3 = "", s3 = 0; s3 < e3; s3++)
        r3 += String.fromCharCode(t4[s3]);
      return r3;
    }
    s2[254] = s2[254] = 1, r2.string2buf = function(t4) {
      var e3, r3, i3, a3, s3, o3 = t4.length, h3 = 0;
      for (a3 = 0; a3 < o3; a3++)
        55296 == (64512 & (r3 = t4.charCodeAt(a3))) && a3 + 1 < o3 && 56320 == (64512 & (i3 = t4.charCodeAt(a3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (i3 - 56320), a3++), h3 += r3 < 128 ? 1 : r3 < 2048 ? 2 : r3 < 65536 ? 3 : 4;
      for (e3 = new n2.Buf8(h3), a3 = s3 = 0; s3 < h3; a3++)
        55296 == (64512 & (r3 = t4.charCodeAt(a3))) && a3 + 1 < o3 && 56320 == (64512 & (i3 = t4.charCodeAt(a3 + 1))) && (r3 = 65536 + (r3 - 55296 << 10) + (i3 - 56320), a3++), r3 < 128 ? e3[s3++] = r3 : (r3 < 2048 ? e3[s3++] = 192 | r3 >>> 6 : (r3 < 65536 ? e3[s3++] = 224 | r3 >>> 12 : (e3[s3++] = 240 | r3 >>> 18, e3[s3++] = 128 | r3 >>> 12 & 63), e3[s3++] = 128 | r3 >>> 6 & 63), e3[s3++] = 128 | 63 & r3);
      return e3;
    }, r2.buf2binstring = function(t4) {
      return h2(t4, t4.length);
    }, r2.binstring2buf = function(t4) {
      for (var e3 = new n2.Buf8(t4.length), r3 = 0, i3 = e3.length; r3 < i3; r3++)
        e3[r3] = t4.charCodeAt(r3);
      return e3;
    }, r2.buf2string = function(t4, e3) {
      var r3, n3, i3, a3, o3 = e3 || t4.length, u2 = new Array(2 * o3);
      for (r3 = n3 = 0; r3 < o3; )
        if ((i3 = t4[r3++]) < 128)
          u2[n3++] = i3;
        else if (4 < (a3 = s2[i3]))
          u2[n3++] = 65533, r3 += a3 - 1;
        else {
          for (i3 &= 2 === a3 ? 31 : 3 === a3 ? 15 : 7; 1 < a3 && r3 < o3; )
            i3 = i3 << 6 | 63 & t4[r3++], a3--;
          1 < a3 ? u2[n3++] = 65533 : i3 < 65536 ? u2[n3++] = i3 : (i3 -= 65536, u2[n3++] = 55296 | i3 >> 10 & 1023, u2[n3++] = 56320 | 1023 & i3);
        }
      return h2(u2, n3);
    }, r2.utf8border = function(t4, e3) {
      var r3;
      for ((e3 = e3 || t4.length) > t4.length && (e3 = t4.length), r3 = e3 - 1; 0 <= r3 && 128 == (192 & t4[r3]); )
        r3--;
      return r3 < 0 || 0 === r3 ? e3 : r3 + s2[t4[r3]] > e3 ? r3 : e3;
    };
  }, { "./common": 41 }], 43: [function(t3, e2, r2) {
    e2.exports = function(t4, e3, r3, n2) {
      for (var i2 = 65535 & t4, a2 = t4 >>> 16 & 65535, s2 = 0; 0 !== r3; ) {
        for (r3 -= s2 = 2e3 < r3 ? 2e3 : r3; a2 = a2 + (i2 = i2 + e3[n2++] | 0) | 0, --s2; )
          ;
        i2 %= 65521, a2 %= 65521;
      }
      return i2 | a2 << 16;
    };
  }, {}], 44: [function(t3, e2, r2) {
    e2.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
  }, {}], 45: [function(t3, e2, r2) {
    var n2 = function() {
      for (var t4, e3 = [], r3 = 0; r3 < 256; r3++) {
        t4 = r3;
        for (var n3 = 0; n3 < 8; n3++)
          t4 = 1 & t4 ? 3988292384 ^ t4 >>> 1 : t4 >>> 1;
        e3[r3] = t4;
      }
      return e3;
    }();
    e2.exports = function(t4, e3, r3, i2) {
      var a2 = n2, s2 = i2 + r3;
      t4 ^= -1;
      for (var o2 = i2; o2 < s2; o2++)
        t4 = t4 >>> 8 ^ a2[255 & (t4 ^ e3[o2])];
      return ~t4;
    };
  }, {}], 46: [function(t3, e2, r2) {
    var n2, i2 = t3("../utils/common"), a2 = t3("./trees"), s2 = t3("./adler32"), o2 = t3("./crc32"), h2 = t3("./messages"), u2 = 0, f2 = 4, l2 = 0, c2 = -2, d2 = -1, p2 = 4, m2 = 2, g2 = 8, _2 = 9, y2 = 286, v2 = 30, w2 = 19, b2 = 2 * y2 + 1, k2 = 15, E2 = 3, x2 = 258, A2 = x2 + E2 + 1, S2 = 42, C2 = 113, z2 = 1, R2 = 2, I2 = 3, T2 = 4;
    function O2(t4, e3) {
      return t4.msg = h2[e3], e3;
    }
    function B2(t4) {
      return (t4 << 1) - (4 < t4 ? 9 : 0);
    }
    function P2(t4) {
      for (var e3 = t4.length; 0 <= --e3; )
        t4[e3] = 0;
    }
    function D2(t4) {
      var e3 = t4.state, r3 = e3.pending;
      r3 > t4.avail_out && (r3 = t4.avail_out), 0 !== r3 && (i2.arraySet(t4.output, e3.pending_buf, e3.pending_out, r3, t4.next_out), t4.next_out += r3, e3.pending_out += r3, t4.total_out += r3, t4.avail_out -= r3, e3.pending -= r3, 0 === e3.pending && (e3.pending_out = 0));
    }
    function U2(t4, e3) {
      a2._tr_flush_block(t4, 0 <= t4.block_start ? t4.block_start : -1, t4.strstart - t4.block_start, e3), t4.block_start = t4.strstart, D2(t4.strm);
    }
    function F2(t4, e3) {
      t4.pending_buf[t4.pending++] = e3;
    }
    function N2(t4, e3) {
      t4.pending_buf[t4.pending++] = e3 >>> 8 & 255, t4.pending_buf[t4.pending++] = 255 & e3;
    }
    function L2(t4, e3) {
      var r3, n3, i3 = t4.max_chain_length, a3 = t4.strstart, s3 = t4.prev_length, o3 = t4.nice_match, h3 = t4.strstart > t4.w_size - A2 ? t4.strstart - (t4.w_size - A2) : 0, u3 = t4.window, f3 = t4.w_mask, l3 = t4.prev, c3 = t4.strstart + x2, d3 = u3[a3 + s3 - 1], p3 = u3[a3 + s3];
      t4.prev_length >= t4.good_match && (i3 >>= 2), o3 > t4.lookahead && (o3 = t4.lookahead);
      do {
        if (u3[(r3 = e3) + s3] === p3 && u3[r3 + s3 - 1] === d3 && u3[r3] === u3[a3] && u3[++r3] === u3[a3 + 1]) {
          a3 += 2, r3++;
          do {
          } while (u3[++a3] === u3[++r3] && u3[++a3] === u3[++r3] && u3[++a3] === u3[++r3] && u3[++a3] === u3[++r3] && u3[++a3] === u3[++r3] && u3[++a3] === u3[++r3] && u3[++a3] === u3[++r3] && u3[++a3] === u3[++r3] && a3 < c3);
          if (n3 = x2 - (c3 - a3), a3 = c3 - x2, s3 < n3) {
            if (t4.match_start = e3, o3 <= (s3 = n3))
              break;
            d3 = u3[a3 + s3 - 1], p3 = u3[a3 + s3];
          }
        }
      } while ((e3 = l3[e3 & f3]) > h3 && 0 != --i3);
      return s3 <= t4.lookahead ? s3 : t4.lookahead;
    }
    function j2(t4) {
      var e3, r3, n3, a3, h3, u3, f3, l3, c3, d3, p3 = t4.w_size;
      do {
        if (a3 = t4.window_size - t4.lookahead - t4.strstart, t4.strstart >= p3 + (p3 - A2)) {
          for (i2.arraySet(t4.window, t4.window, p3, p3, 0), t4.match_start -= p3, t4.strstart -= p3, t4.block_start -= p3, e3 = r3 = t4.hash_size; n3 = t4.head[--e3], t4.head[e3] = p3 <= n3 ? n3 - p3 : 0, --r3; )
            ;
          for (e3 = r3 = p3; n3 = t4.prev[--e3], t4.prev[e3] = p3 <= n3 ? n3 - p3 : 0, --r3; )
            ;
          a3 += p3;
        }
        if (0 === t4.strm.avail_in)
          break;
        if (u3 = t4.strm, f3 = t4.window, l3 = t4.strstart + t4.lookahead, d3 = void 0, (c3 = a3) < (d3 = u3.avail_in) && (d3 = c3), r3 = 0 === d3 ? 0 : (u3.avail_in -= d3, i2.arraySet(f3, u3.input, u3.next_in, d3, l3), 1 === u3.state.wrap ? u3.adler = s2(u3.adler, f3, d3, l3) : 2 === u3.state.wrap && (u3.adler = o2(u3.adler, f3, d3, l3)), u3.next_in += d3, u3.total_in += d3, d3), t4.lookahead += r3, t4.lookahead + t4.insert >= E2)
          for (h3 = t4.strstart - t4.insert, t4.ins_h = t4.window[h3], t4.ins_h = (t4.ins_h << t4.hash_shift ^ t4.window[h3 + 1]) & t4.hash_mask; t4.insert && (t4.ins_h = (t4.ins_h << t4.hash_shift ^ t4.window[h3 + E2 - 1]) & t4.hash_mask, t4.prev[h3 & t4.w_mask] = t4.head[t4.ins_h], t4.head[t4.ins_h] = h3, h3++, t4.insert--, !(t4.lookahead + t4.insert < E2)); )
            ;
      } while (t4.lookahead < A2 && 0 !== t4.strm.avail_in);
    }
    function M2(t4, e3) {
      for (var r3, n3; ; ) {
        if (t4.lookahead < A2) {
          if (j2(t4), t4.lookahead < A2 && e3 === u2)
            return z2;
          if (0 === t4.lookahead)
            break;
        }
        if (r3 = 0, t4.lookahead >= E2 && (t4.ins_h = (t4.ins_h << t4.hash_shift ^ t4.window[t4.strstart + E2 - 1]) & t4.hash_mask, r3 = t4.prev[t4.strstart & t4.w_mask] = t4.head[t4.ins_h], t4.head[t4.ins_h] = t4.strstart), 0 !== r3 && t4.strstart - r3 <= t4.w_size - A2 && (t4.match_length = L2(t4, r3)), t4.match_length >= E2)
          if (n3 = a2._tr_tally(t4, t4.strstart - t4.match_start, t4.match_length - E2), t4.lookahead -= t4.match_length, t4.match_length <= t4.max_lazy_match && t4.lookahead >= E2) {
            for (t4.match_length--; t4.strstart++, t4.ins_h = (t4.ins_h << t4.hash_shift ^ t4.window[t4.strstart + E2 - 1]) & t4.hash_mask, r3 = t4.prev[t4.strstart & t4.w_mask] = t4.head[t4.ins_h], t4.head[t4.ins_h] = t4.strstart, 0 != --t4.match_length; )
              ;
            t4.strstart++;
          } else
            t4.strstart += t4.match_length, t4.match_length = 0, t4.ins_h = t4.window[t4.strstart], t4.ins_h = (t4.ins_h << t4.hash_shift ^ t4.window[t4.strstart + 1]) & t4.hash_mask;
        else
          n3 = a2._tr_tally(t4, 0, t4.window[t4.strstart]), t4.lookahead--, t4.strstart++;
        if (n3 && (U2(t4, false), 0 === t4.strm.avail_out))
          return z2;
      }
      return t4.insert = t4.strstart < E2 - 1 ? t4.strstart : E2 - 1, e3 === f2 ? (U2(t4, true), 0 === t4.strm.avail_out ? I2 : T2) : t4.last_lit && (U2(t4, false), 0 === t4.strm.avail_out) ? z2 : R2;
    }
    function Z2(t4, e3) {
      for (var r3, n3, i3; ; ) {
        if (t4.lookahead < A2) {
          if (j2(t4), t4.lookahead < A2 && e3 === u2)
            return z2;
          if (0 === t4.lookahead)
            break;
        }
        if (r3 = 0, t4.lookahead >= E2 && (t4.ins_h = (t4.ins_h << t4.hash_shift ^ t4.window[t4.strstart + E2 - 1]) & t4.hash_mask, r3 = t4.prev[t4.strstart & t4.w_mask] = t4.head[t4.ins_h], t4.head[t4.ins_h] = t4.strstart), t4.prev_length = t4.match_length, t4.prev_match = t4.match_start, t4.match_length = E2 - 1, 0 !== r3 && t4.prev_length < t4.max_lazy_match && t4.strstart - r3 <= t4.w_size - A2 && (t4.match_length = L2(t4, r3), t4.match_length <= 5 && (1 === t4.strategy || t4.match_length === E2 && 4096 < t4.strstart - t4.match_start) && (t4.match_length = E2 - 1)), t4.prev_length >= E2 && t4.match_length <= t4.prev_length) {
          for (i3 = t4.strstart + t4.lookahead - E2, n3 = a2._tr_tally(t4, t4.strstart - 1 - t4.prev_match, t4.prev_length - E2), t4.lookahead -= t4.prev_length - 1, t4.prev_length -= 2; ++t4.strstart <= i3 && (t4.ins_h = (t4.ins_h << t4.hash_shift ^ t4.window[t4.strstart + E2 - 1]) & t4.hash_mask, r3 = t4.prev[t4.strstart & t4.w_mask] = t4.head[t4.ins_h], t4.head[t4.ins_h] = t4.strstart), 0 != --t4.prev_length; )
            ;
          if (t4.match_available = 0, t4.match_length = E2 - 1, t4.strstart++, n3 && (U2(t4, false), 0 === t4.strm.avail_out))
            return z2;
        } else if (t4.match_available) {
          if ((n3 = a2._tr_tally(t4, 0, t4.window[t4.strstart - 1])) && U2(t4, false), t4.strstart++, t4.lookahead--, 0 === t4.strm.avail_out)
            return z2;
        } else
          t4.match_available = 1, t4.strstart++, t4.lookahead--;
      }
      return t4.match_available && (n3 = a2._tr_tally(t4, 0, t4.window[t4.strstart - 1]), t4.match_available = 0), t4.insert = t4.strstart < E2 - 1 ? t4.strstart : E2 - 1, e3 === f2 ? (U2(t4, true), 0 === t4.strm.avail_out ? I2 : T2) : t4.last_lit && (U2(t4, false), 0 === t4.strm.avail_out) ? z2 : R2;
    }
    function W2(t4, e3, r3, n3, i3) {
      this.good_length = t4, this.max_lazy = e3, this.nice_length = r3, this.max_chain = n3, this.func = i3;
    }
    function Y2() {
      this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g2, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new i2.Buf16(2 * b2), this.dyn_dtree = new i2.Buf16(2 * (2 * v2 + 1)), this.bl_tree = new i2.Buf16(2 * (2 * w2 + 1)), P2(this.dyn_ltree), P2(this.dyn_dtree), P2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new i2.Buf16(k2 + 1), this.heap = new i2.Buf16(2 * y2 + 1), P2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new i2.Buf16(2 * y2 + 1), P2(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    function H2(t4) {
      var e3;
      return t4 && t4.state ? (t4.total_in = t4.total_out = 0, t4.data_type = m2, (e3 = t4.state).pending = 0, e3.pending_out = 0, e3.wrap < 0 && (e3.wrap = -e3.wrap), e3.status = e3.wrap ? S2 : C2, t4.adler = 2 === e3.wrap ? 0 : 1, e3.last_flush = u2, a2._tr_init(e3), l2) : O2(t4, c2);
    }
    function G2(t4) {
      var e3 = H2(t4);
      return e3 === l2 && function(t5) {
        t5.window_size = 2 * t5.w_size, P2(t5.head), t5.max_lazy_match = n2[t5.level].max_lazy, t5.good_match = n2[t5.level].good_length, t5.nice_match = n2[t5.level].nice_length, t5.max_chain_length = n2[t5.level].max_chain, t5.strstart = 0, t5.block_start = 0, t5.lookahead = 0, t5.insert = 0, t5.match_length = t5.prev_length = E2 - 1, t5.match_available = 0, t5.ins_h = 0;
      }(t4.state), e3;
    }
    function K2(t4, e3, r3, n3, a3, s3) {
      if (!t4)
        return c2;
      var o3 = 1;
      if (e3 === d2 && (e3 = 6), n3 < 0 ? (o3 = 0, n3 = -n3) : 15 < n3 && (o3 = 2, n3 -= 16), a3 < 1 || _2 < a3 || r3 !== g2 || n3 < 8 || 15 < n3 || e3 < 0 || 9 < e3 || s3 < 0 || p2 < s3)
        return O2(t4, c2);
      8 === n3 && (n3 = 9);
      var h3 = new Y2();
      return (t4.state = h3).strm = t4, h3.wrap = o3, h3.gzhead = null, h3.w_bits = n3, h3.w_size = 1 << h3.w_bits, h3.w_mask = h3.w_size - 1, h3.hash_bits = a3 + 7, h3.hash_size = 1 << h3.hash_bits, h3.hash_mask = h3.hash_size - 1, h3.hash_shift = ~~((h3.hash_bits + E2 - 1) / E2), h3.window = new i2.Buf8(2 * h3.w_size), h3.head = new i2.Buf16(h3.hash_size), h3.prev = new i2.Buf16(h3.w_size), h3.lit_bufsize = 1 << a3 + 6, h3.pending_buf_size = 4 * h3.lit_bufsize, h3.pending_buf = new i2.Buf8(h3.pending_buf_size), h3.d_buf = 1 * h3.lit_bufsize, h3.l_buf = 3 * h3.lit_bufsize, h3.level = e3, h3.strategy = s3, h3.method = r3, G2(t4);
    }
    n2 = [new W2(0, 0, 0, 0, function(t4, e3) {
      var r3 = 65535;
      for (r3 > t4.pending_buf_size - 5 && (r3 = t4.pending_buf_size - 5); ; ) {
        if (t4.lookahead <= 1) {
          if (j2(t4), 0 === t4.lookahead && e3 === u2)
            return z2;
          if (0 === t4.lookahead)
            break;
        }
        t4.strstart += t4.lookahead, t4.lookahead = 0;
        var n3 = t4.block_start + r3;
        if ((0 === t4.strstart || t4.strstart >= n3) && (t4.lookahead = t4.strstart - n3, t4.strstart = n3, U2(t4, false), 0 === t4.strm.avail_out))
          return z2;
        if (t4.strstart - t4.block_start >= t4.w_size - A2 && (U2(t4, false), 0 === t4.strm.avail_out))
          return z2;
      }
      return t4.insert = 0, e3 === f2 ? (U2(t4, true), 0 === t4.strm.avail_out ? I2 : T2) : (t4.strstart > t4.block_start && (U2(t4, false), t4.strm.avail_out), z2);
    }), new W2(4, 4, 8, 4, M2), new W2(4, 5, 16, 8, M2), new W2(4, 6, 32, 32, M2), new W2(4, 4, 16, 16, Z2), new W2(8, 16, 32, 32, Z2), new W2(8, 16, 128, 128, Z2), new W2(8, 32, 128, 256, Z2), new W2(32, 128, 258, 1024, Z2), new W2(32, 258, 258, 4096, Z2)], r2.deflateInit = function(t4, e3) {
      return K2(t4, e3, g2, 15, 8, 0);
    }, r2.deflateInit2 = K2, r2.deflateReset = G2, r2.deflateResetKeep = H2, r2.deflateSetHeader = function(t4, e3) {
      return t4 && t4.state ? 2 !== t4.state.wrap ? c2 : (t4.state.gzhead = e3, l2) : c2;
    }, r2.deflate = function(t4, e3) {
      var r3, i3, s3, h3;
      if (!t4 || !t4.state || 5 < e3 || e3 < 0)
        return t4 ? O2(t4, c2) : c2;
      if (i3 = t4.state, !t4.output || !t4.input && 0 !== t4.avail_in || 666 === i3.status && e3 !== f2)
        return O2(t4, 0 === t4.avail_out ? -5 : c2);
      if (i3.strm = t4, r3 = i3.last_flush, i3.last_flush = e3, i3.status === S2)
        if (2 === i3.wrap)
          t4.adler = 0, F2(i3, 31), F2(i3, 139), F2(i3, 8), i3.gzhead ? (F2(i3, (i3.gzhead.text ? 1 : 0) + (i3.gzhead.hcrc ? 2 : 0) + (i3.gzhead.extra ? 4 : 0) + (i3.gzhead.name ? 8 : 0) + (i3.gzhead.comment ? 16 : 0)), F2(i3, 255 & i3.gzhead.time), F2(i3, i3.gzhead.time >> 8 & 255), F2(i3, i3.gzhead.time >> 16 & 255), F2(i3, i3.gzhead.time >> 24 & 255), F2(i3, 9 === i3.level ? 2 : 2 <= i3.strategy || i3.level < 2 ? 4 : 0), F2(i3, 255 & i3.gzhead.os), i3.gzhead.extra && i3.gzhead.extra.length && (F2(i3, 255 & i3.gzhead.extra.length), F2(i3, i3.gzhead.extra.length >> 8 & 255)), i3.gzhead.hcrc && (t4.adler = o2(t4.adler, i3.pending_buf, i3.pending, 0)), i3.gzindex = 0, i3.status = 69) : (F2(i3, 0), F2(i3, 0), F2(i3, 0), F2(i3, 0), F2(i3, 0), F2(i3, 9 === i3.level ? 2 : 2 <= i3.strategy || i3.level < 2 ? 4 : 0), F2(i3, 3), i3.status = C2);
        else {
          var d3 = g2 + (i3.w_bits - 8 << 4) << 8;
          d3 |= (2 <= i3.strategy || i3.level < 2 ? 0 : i3.level < 6 ? 1 : 6 === i3.level ? 2 : 3) << 6, 0 !== i3.strstart && (d3 |= 32), d3 += 31 - d3 % 31, i3.status = C2, N2(i3, d3), 0 !== i3.strstart && (N2(i3, t4.adler >>> 16), N2(i3, 65535 & t4.adler)), t4.adler = 1;
        }
      if (69 === i3.status)
        if (i3.gzhead.extra) {
          for (s3 = i3.pending; i3.gzindex < (65535 & i3.gzhead.extra.length) && (i3.pending !== i3.pending_buf_size || (i3.gzhead.hcrc && i3.pending > s3 && (t4.adler = o2(t4.adler, i3.pending_buf, i3.pending - s3, s3)), D2(t4), s3 = i3.pending, i3.pending !== i3.pending_buf_size)); )
            F2(i3, 255 & i3.gzhead.extra[i3.gzindex]), i3.gzindex++;
          i3.gzhead.hcrc && i3.pending > s3 && (t4.adler = o2(t4.adler, i3.pending_buf, i3.pending - s3, s3)), i3.gzindex === i3.gzhead.extra.length && (i3.gzindex = 0, i3.status = 73);
        } else
          i3.status = 73;
      if (73 === i3.status)
        if (i3.gzhead.name) {
          s3 = i3.pending;
          do {
            if (i3.pending === i3.pending_buf_size && (i3.gzhead.hcrc && i3.pending > s3 && (t4.adler = o2(t4.adler, i3.pending_buf, i3.pending - s3, s3)), D2(t4), s3 = i3.pending, i3.pending === i3.pending_buf_size)) {
              h3 = 1;
              break;
            }
            h3 = i3.gzindex < i3.gzhead.name.length ? 255 & i3.gzhead.name.charCodeAt(i3.gzindex++) : 0, F2(i3, h3);
          } while (0 !== h3);
          i3.gzhead.hcrc && i3.pending > s3 && (t4.adler = o2(t4.adler, i3.pending_buf, i3.pending - s3, s3)), 0 === h3 && (i3.gzindex = 0, i3.status = 91);
        } else
          i3.status = 91;
      if (91 === i3.status)
        if (i3.gzhead.comment) {
          s3 = i3.pending;
          do {
            if (i3.pending === i3.pending_buf_size && (i3.gzhead.hcrc && i3.pending > s3 && (t4.adler = o2(t4.adler, i3.pending_buf, i3.pending - s3, s3)), D2(t4), s3 = i3.pending, i3.pending === i3.pending_buf_size)) {
              h3 = 1;
              break;
            }
            h3 = i3.gzindex < i3.gzhead.comment.length ? 255 & i3.gzhead.comment.charCodeAt(i3.gzindex++) : 0, F2(i3, h3);
          } while (0 !== h3);
          i3.gzhead.hcrc && i3.pending > s3 && (t4.adler = o2(t4.adler, i3.pending_buf, i3.pending - s3, s3)), 0 === h3 && (i3.status = 103);
        } else
          i3.status = 103;
      if (103 === i3.status && (i3.gzhead.hcrc ? (i3.pending + 2 > i3.pending_buf_size && D2(t4), i3.pending + 2 <= i3.pending_buf_size && (F2(i3, 255 & t4.adler), F2(i3, t4.adler >> 8 & 255), t4.adler = 0, i3.status = C2)) : i3.status = C2), 0 !== i3.pending) {
        if (D2(t4), 0 === t4.avail_out)
          return i3.last_flush = -1, l2;
      } else if (0 === t4.avail_in && B2(e3) <= B2(r3) && e3 !== f2)
        return O2(t4, -5);
      if (666 === i3.status && 0 !== t4.avail_in)
        return O2(t4, -5);
      if (0 !== t4.avail_in || 0 !== i3.lookahead || e3 !== u2 && 666 !== i3.status) {
        var p3 = 2 === i3.strategy ? function(t5, e4) {
          for (var r4; ; ) {
            if (0 === t5.lookahead && (j2(t5), 0 === t5.lookahead)) {
              if (e4 === u2)
                return z2;
              break;
            }
            if (t5.match_length = 0, r4 = a2._tr_tally(t5, 0, t5.window[t5.strstart]), t5.lookahead--, t5.strstart++, r4 && (U2(t5, false), 0 === t5.strm.avail_out))
              return z2;
          }
          return t5.insert = 0, e4 === f2 ? (U2(t5, true), 0 === t5.strm.avail_out ? I2 : T2) : t5.last_lit && (U2(t5, false), 0 === t5.strm.avail_out) ? z2 : R2;
        }(i3, e3) : 3 === i3.strategy ? function(t5, e4) {
          for (var r4, n3, i4, s4, o3 = t5.window; ; ) {
            if (t5.lookahead <= x2) {
              if (j2(t5), t5.lookahead <= x2 && e4 === u2)
                return z2;
              if (0 === t5.lookahead)
                break;
            }
            if (t5.match_length = 0, t5.lookahead >= E2 && 0 < t5.strstart && (n3 = o3[i4 = t5.strstart - 1]) === o3[++i4] && n3 === o3[++i4] && n3 === o3[++i4]) {
              s4 = t5.strstart + x2;
              do {
              } while (n3 === o3[++i4] && n3 === o3[++i4] && n3 === o3[++i4] && n3 === o3[++i4] && n3 === o3[++i4] && n3 === o3[++i4] && n3 === o3[++i4] && n3 === o3[++i4] && i4 < s4);
              t5.match_length = x2 - (s4 - i4), t5.match_length > t5.lookahead && (t5.match_length = t5.lookahead);
            }
            if (t5.match_length >= E2 ? (r4 = a2._tr_tally(t5, 1, t5.match_length - E2), t5.lookahead -= t5.match_length, t5.strstart += t5.match_length, t5.match_length = 0) : (r4 = a2._tr_tally(t5, 0, t5.window[t5.strstart]), t5.lookahead--, t5.strstart++), r4 && (U2(t5, false), 0 === t5.strm.avail_out))
              return z2;
          }
          return t5.insert = 0, e4 === f2 ? (U2(t5, true), 0 === t5.strm.avail_out ? I2 : T2) : t5.last_lit && (U2(t5, false), 0 === t5.strm.avail_out) ? z2 : R2;
        }(i3, e3) : n2[i3.level].func(i3, e3);
        if (p3 !== I2 && p3 !== T2 || (i3.status = 666), p3 === z2 || p3 === I2)
          return 0 === t4.avail_out && (i3.last_flush = -1), l2;
        if (p3 === R2 && (1 === e3 ? a2._tr_align(i3) : 5 !== e3 && (a2._tr_stored_block(i3, 0, 0, false), 3 === e3 && (P2(i3.head), 0 === i3.lookahead && (i3.strstart = 0, i3.block_start = 0, i3.insert = 0))), D2(t4), 0 === t4.avail_out))
          return i3.last_flush = -1, l2;
      }
      return e3 !== f2 ? l2 : i3.wrap <= 0 ? 1 : (2 === i3.wrap ? (F2(i3, 255 & t4.adler), F2(i3, t4.adler >> 8 & 255), F2(i3, t4.adler >> 16 & 255), F2(i3, t4.adler >> 24 & 255), F2(i3, 255 & t4.total_in), F2(i3, t4.total_in >> 8 & 255), F2(i3, t4.total_in >> 16 & 255), F2(i3, t4.total_in >> 24 & 255)) : (N2(i3, t4.adler >>> 16), N2(i3, 65535 & t4.adler)), D2(t4), 0 < i3.wrap && (i3.wrap = -i3.wrap), 0 !== i3.pending ? l2 : 1);
    }, r2.deflateEnd = function(t4) {
      var e3;
      return t4 && t4.state ? (e3 = t4.state.status) !== S2 && 69 !== e3 && 73 !== e3 && 91 !== e3 && 103 !== e3 && e3 !== C2 && 666 !== e3 ? O2(t4, c2) : (t4.state = null, e3 === C2 ? O2(t4, -3) : l2) : c2;
    }, r2.deflateSetDictionary = function(t4, e3) {
      var r3, n3, a3, o3, h3, u3, f3, d3, p3 = e3.length;
      if (!t4 || !t4.state)
        return c2;
      if (2 === (o3 = (r3 = t4.state).wrap) || 1 === o3 && r3.status !== S2 || r3.lookahead)
        return c2;
      for (1 === o3 && (t4.adler = s2(t4.adler, e3, p3, 0)), r3.wrap = 0, p3 >= r3.w_size && (0 === o3 && (P2(r3.head), r3.strstart = 0, r3.block_start = 0, r3.insert = 0), d3 = new i2.Buf8(r3.w_size), i2.arraySet(d3, e3, p3 - r3.w_size, r3.w_size, 0), e3 = d3, p3 = r3.w_size), h3 = t4.avail_in, u3 = t4.next_in, f3 = t4.input, t4.avail_in = p3, t4.next_in = 0, t4.input = e3, j2(r3); r3.lookahead >= E2; ) {
        for (n3 = r3.strstart, a3 = r3.lookahead - (E2 - 1); r3.ins_h = (r3.ins_h << r3.hash_shift ^ r3.window[n3 + E2 - 1]) & r3.hash_mask, r3.prev[n3 & r3.w_mask] = r3.head[r3.ins_h], r3.head[r3.ins_h] = n3, n3++, --a3; )
          ;
        r3.strstart = n3, r3.lookahead = E2 - 1, j2(r3);
      }
      return r3.strstart += r3.lookahead, r3.block_start = r3.strstart, r3.insert = r3.lookahead, r3.lookahead = 0, r3.match_length = r3.prev_length = E2 - 1, r3.match_available = 0, t4.next_in = u3, t4.input = f3, t4.avail_in = h3, r3.wrap = o3, l2;
    }, r2.deflateInfo = "pako deflate (from Nodeca project)";
  }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(t3, e2, r2) {
    e2.exports = function() {
      this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
    };
  }, {}], 48: [function(t3, e2, r2) {
    e2.exports = function(t4, e3) {
      var r3, n2, i2, a2, s2, o2, h2, u2, f2, l2, c2, d2, p2, m2, g2, _2, y2, v2, w2, b2, k2, E2, x2, A2, S2;
      r3 = t4.state, n2 = t4.next_in, A2 = t4.input, i2 = n2 + (t4.avail_in - 5), a2 = t4.next_out, S2 = t4.output, s2 = a2 - (e3 - t4.avail_out), o2 = a2 + (t4.avail_out - 257), h2 = r3.dmax, u2 = r3.wsize, f2 = r3.whave, l2 = r3.wnext, c2 = r3.window, d2 = r3.hold, p2 = r3.bits, m2 = r3.lencode, g2 = r3.distcode, _2 = (1 << r3.lenbits) - 1, y2 = (1 << r3.distbits) - 1;
      t:
        do {
          p2 < 15 && (d2 += A2[n2++] << p2, p2 += 8, d2 += A2[n2++] << p2, p2 += 8), v2 = m2[d2 & _2];
          e:
            for (; ; ) {
              if (d2 >>>= w2 = v2 >>> 24, p2 -= w2, 0 == (w2 = v2 >>> 16 & 255))
                S2[a2++] = 65535 & v2;
              else {
                if (!(16 & w2)) {
                  if (!(64 & w2)) {
                    v2 = m2[(65535 & v2) + (d2 & (1 << w2) - 1)];
                    continue e;
                  }
                  if (32 & w2) {
                    r3.mode = 12;
                    break t;
                  }
                  t4.msg = "invalid literal/length code", r3.mode = 30;
                  break t;
                }
                b2 = 65535 & v2, (w2 &= 15) && (p2 < w2 && (d2 += A2[n2++] << p2, p2 += 8), b2 += d2 & (1 << w2) - 1, d2 >>>= w2, p2 -= w2), p2 < 15 && (d2 += A2[n2++] << p2, p2 += 8, d2 += A2[n2++] << p2, p2 += 8), v2 = g2[d2 & y2];
                r:
                  for (; ; ) {
                    if (d2 >>>= w2 = v2 >>> 24, p2 -= w2, !(16 & (w2 = v2 >>> 16 & 255))) {
                      if (!(64 & w2)) {
                        v2 = g2[(65535 & v2) + (d2 & (1 << w2) - 1)];
                        continue r;
                      }
                      t4.msg = "invalid distance code", r3.mode = 30;
                      break t;
                    }
                    if (k2 = 65535 & v2, p2 < (w2 &= 15) && (d2 += A2[n2++] << p2, (p2 += 8) < w2 && (d2 += A2[n2++] << p2, p2 += 8)), h2 < (k2 += d2 & (1 << w2) - 1)) {
                      t4.msg = "invalid distance too far back", r3.mode = 30;
                      break t;
                    }
                    if (d2 >>>= w2, p2 -= w2, (w2 = a2 - s2) < k2) {
                      if (f2 < (w2 = k2 - w2) && r3.sane) {
                        t4.msg = "invalid distance too far back", r3.mode = 30;
                        break t;
                      }
                      if (x2 = c2, (E2 = 0) === l2) {
                        if (E2 += u2 - w2, w2 < b2) {
                          for (b2 -= w2; S2[a2++] = c2[E2++], --w2; )
                            ;
                          E2 = a2 - k2, x2 = S2;
                        }
                      } else if (l2 < w2) {
                        if (E2 += u2 + l2 - w2, (w2 -= l2) < b2) {
                          for (b2 -= w2; S2[a2++] = c2[E2++], --w2; )
                            ;
                          if (E2 = 0, l2 < b2) {
                            for (b2 -= w2 = l2; S2[a2++] = c2[E2++], --w2; )
                              ;
                            E2 = a2 - k2, x2 = S2;
                          }
                        }
                      } else if (E2 += l2 - w2, w2 < b2) {
                        for (b2 -= w2; S2[a2++] = c2[E2++], --w2; )
                          ;
                        E2 = a2 - k2, x2 = S2;
                      }
                      for (; 2 < b2; )
                        S2[a2++] = x2[E2++], S2[a2++] = x2[E2++], S2[a2++] = x2[E2++], b2 -= 3;
                      b2 && (S2[a2++] = x2[E2++], 1 < b2 && (S2[a2++] = x2[E2++]));
                    } else {
                      for (E2 = a2 - k2; S2[a2++] = S2[E2++], S2[a2++] = S2[E2++], S2[a2++] = S2[E2++], 2 < (b2 -= 3); )
                        ;
                      b2 && (S2[a2++] = S2[E2++], 1 < b2 && (S2[a2++] = S2[E2++]));
                    }
                    break;
                  }
              }
              break;
            }
        } while (n2 < i2 && a2 < o2);
      n2 -= b2 = p2 >> 3, d2 &= (1 << (p2 -= b2 << 3)) - 1, t4.next_in = n2, t4.next_out = a2, t4.avail_in = n2 < i2 ? i2 - n2 + 5 : 5 - (n2 - i2), t4.avail_out = a2 < o2 ? o2 - a2 + 257 : 257 - (a2 - o2), r3.hold = d2, r3.bits = p2;
    };
  }, {}], 49: [function(t3, e2, r2) {
    var n2 = t3("../utils/common"), i2 = t3("./adler32"), a2 = t3("./crc32"), s2 = t3("./inffast"), o2 = t3("./inftrees"), h2 = 1, u2 = 2, f2 = 0, l2 = -2, c2 = 1, d2 = 852, p2 = 592;
    function m2(t4) {
      return (t4 >>> 24 & 255) + (t4 >>> 8 & 65280) + ((65280 & t4) << 8) + ((255 & t4) << 24);
    }
    function g2() {
      this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n2.Buf16(320), this.work = new n2.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    function _2(t4) {
      var e3;
      return t4 && t4.state ? (e3 = t4.state, t4.total_in = t4.total_out = e3.total = 0, t4.msg = "", e3.wrap && (t4.adler = 1 & e3.wrap), e3.mode = c2, e3.last = 0, e3.havedict = 0, e3.dmax = 32768, e3.head = null, e3.hold = 0, e3.bits = 0, e3.lencode = e3.lendyn = new n2.Buf32(d2), e3.distcode = e3.distdyn = new n2.Buf32(p2), e3.sane = 1, e3.back = -1, f2) : l2;
    }
    function y2(t4) {
      var e3;
      return t4 && t4.state ? ((e3 = t4.state).wsize = 0, e3.whave = 0, e3.wnext = 0, _2(t4)) : l2;
    }
    function v2(t4, e3) {
      var r3, n3;
      return t4 && t4.state ? (n3 = t4.state, e3 < 0 ? (r3 = 0, e3 = -e3) : (r3 = 1 + (e3 >> 4), e3 < 48 && (e3 &= 15)), e3 && (e3 < 8 || 15 < e3) ? l2 : (null !== n3.window && n3.wbits !== e3 && (n3.window = null), n3.wrap = r3, n3.wbits = e3, y2(t4))) : l2;
    }
    function w2(t4, e3) {
      var r3, n3;
      return t4 ? (n3 = new g2(), (t4.state = n3).window = null, (r3 = v2(t4, e3)) !== f2 && (t4.state = null), r3) : l2;
    }
    var b2, k2, E2 = true;
    function x2(t4) {
      if (E2) {
        var e3;
        for (b2 = new n2.Buf32(512), k2 = new n2.Buf32(32), e3 = 0; e3 < 144; )
          t4.lens[e3++] = 8;
        for (; e3 < 256; )
          t4.lens[e3++] = 9;
        for (; e3 < 280; )
          t4.lens[e3++] = 7;
        for (; e3 < 288; )
          t4.lens[e3++] = 8;
        for (o2(h2, t4.lens, 0, 288, b2, 0, t4.work, { bits: 9 }), e3 = 0; e3 < 32; )
          t4.lens[e3++] = 5;
        o2(u2, t4.lens, 0, 32, k2, 0, t4.work, { bits: 5 }), E2 = false;
      }
      t4.lencode = b2, t4.lenbits = 9, t4.distcode = k2, t4.distbits = 5;
    }
    function A2(t4, e3, r3, i3) {
      var a3, s3 = t4.state;
      return null === s3.window && (s3.wsize = 1 << s3.wbits, s3.wnext = 0, s3.whave = 0, s3.window = new n2.Buf8(s3.wsize)), i3 >= s3.wsize ? (n2.arraySet(s3.window, e3, r3 - s3.wsize, s3.wsize, 0), s3.wnext = 0, s3.whave = s3.wsize) : (i3 < (a3 = s3.wsize - s3.wnext) && (a3 = i3), n2.arraySet(s3.window, e3, r3 - i3, a3, s3.wnext), (i3 -= a3) ? (n2.arraySet(s3.window, e3, r3 - i3, i3, 0), s3.wnext = i3, s3.whave = s3.wsize) : (s3.wnext += a3, s3.wnext === s3.wsize && (s3.wnext = 0), s3.whave < s3.wsize && (s3.whave += a3))), 0;
    }
    r2.inflateReset = y2, r2.inflateReset2 = v2, r2.inflateResetKeep = _2, r2.inflateInit = function(t4) {
      return w2(t4, 15);
    }, r2.inflateInit2 = w2, r2.inflate = function(t4, e3) {
      var r3, d3, p3, g3, _3, y3, v3, w3, b3, k3, E3, S2, C2, z2, R2, I2, T2, O2, B2, P2, D2, U2, F2, N2, L2 = 0, j2 = new n2.Buf8(4), M2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      if (!t4 || !t4.state || !t4.output || !t4.input && 0 !== t4.avail_in)
        return l2;
      12 === (r3 = t4.state).mode && (r3.mode = 13), _3 = t4.next_out, p3 = t4.output, v3 = t4.avail_out, g3 = t4.next_in, d3 = t4.input, y3 = t4.avail_in, w3 = r3.hold, b3 = r3.bits, k3 = y3, E3 = v3, U2 = f2;
      t:
        for (; ; )
          switch (r3.mode) {
            case c2:
              if (0 === r3.wrap) {
                r3.mode = 13;
                break;
              }
              for (; b3 < 16; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              if (2 & r3.wrap && 35615 === w3) {
                j2[r3.check = 0] = 255 & w3, j2[1] = w3 >>> 8 & 255, r3.check = a2(r3.check, j2, 2, 0), b3 = w3 = 0, r3.mode = 2;
                break;
              }
              if (r3.flags = 0, r3.head && (r3.head.done = false), !(1 & r3.wrap) || (((255 & w3) << 8) + (w3 >> 8)) % 31) {
                t4.msg = "incorrect header check", r3.mode = 30;
                break;
              }
              if (8 != (15 & w3)) {
                t4.msg = "unknown compression method", r3.mode = 30;
                break;
              }
              if (b3 -= 4, D2 = 8 + (15 & (w3 >>>= 4)), 0 === r3.wbits)
                r3.wbits = D2;
              else if (D2 > r3.wbits) {
                t4.msg = "invalid window size", r3.mode = 30;
                break;
              }
              r3.dmax = 1 << D2, t4.adler = r3.check = 1, r3.mode = 512 & w3 ? 10 : 12, b3 = w3 = 0;
              break;
            case 2:
              for (; b3 < 16; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              if (r3.flags = w3, 8 != (255 & r3.flags)) {
                t4.msg = "unknown compression method", r3.mode = 30;
                break;
              }
              if (57344 & r3.flags) {
                t4.msg = "unknown header flags set", r3.mode = 30;
                break;
              }
              r3.head && (r3.head.text = w3 >> 8 & 1), 512 & r3.flags && (j2[0] = 255 & w3, j2[1] = w3 >>> 8 & 255, r3.check = a2(r3.check, j2, 2, 0)), b3 = w3 = 0, r3.mode = 3;
            case 3:
              for (; b3 < 32; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              r3.head && (r3.head.time = w3), 512 & r3.flags && (j2[0] = 255 & w3, j2[1] = w3 >>> 8 & 255, j2[2] = w3 >>> 16 & 255, j2[3] = w3 >>> 24 & 255, r3.check = a2(r3.check, j2, 4, 0)), b3 = w3 = 0, r3.mode = 4;
            case 4:
              for (; b3 < 16; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              r3.head && (r3.head.xflags = 255 & w3, r3.head.os = w3 >> 8), 512 & r3.flags && (j2[0] = 255 & w3, j2[1] = w3 >>> 8 & 255, r3.check = a2(r3.check, j2, 2, 0)), b3 = w3 = 0, r3.mode = 5;
            case 5:
              if (1024 & r3.flags) {
                for (; b3 < 16; ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                r3.length = w3, r3.head && (r3.head.extra_len = w3), 512 & r3.flags && (j2[0] = 255 & w3, j2[1] = w3 >>> 8 & 255, r3.check = a2(r3.check, j2, 2, 0)), b3 = w3 = 0;
              } else
                r3.head && (r3.head.extra = null);
              r3.mode = 6;
            case 6:
              if (1024 & r3.flags && (y3 < (S2 = r3.length) && (S2 = y3), S2 && (r3.head && (D2 = r3.head.extra_len - r3.length, r3.head.extra || (r3.head.extra = new Array(r3.head.extra_len)), n2.arraySet(r3.head.extra, d3, g3, S2, D2)), 512 & r3.flags && (r3.check = a2(r3.check, d3, S2, g3)), y3 -= S2, g3 += S2, r3.length -= S2), r3.length))
                break t;
              r3.length = 0, r3.mode = 7;
            case 7:
              if (2048 & r3.flags) {
                if (0 === y3)
                  break t;
                for (S2 = 0; D2 = d3[g3 + S2++], r3.head && D2 && r3.length < 65536 && (r3.head.name += String.fromCharCode(D2)), D2 && S2 < y3; )
                  ;
                if (512 & r3.flags && (r3.check = a2(r3.check, d3, S2, g3)), y3 -= S2, g3 += S2, D2)
                  break t;
              } else
                r3.head && (r3.head.name = null);
              r3.length = 0, r3.mode = 8;
            case 8:
              if (4096 & r3.flags) {
                if (0 === y3)
                  break t;
                for (S2 = 0; D2 = d3[g3 + S2++], r3.head && D2 && r3.length < 65536 && (r3.head.comment += String.fromCharCode(D2)), D2 && S2 < y3; )
                  ;
                if (512 & r3.flags && (r3.check = a2(r3.check, d3, S2, g3)), y3 -= S2, g3 += S2, D2)
                  break t;
              } else
                r3.head && (r3.head.comment = null);
              r3.mode = 9;
            case 9:
              if (512 & r3.flags) {
                for (; b3 < 16; ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                if (w3 !== (65535 & r3.check)) {
                  t4.msg = "header crc mismatch", r3.mode = 30;
                  break;
                }
                b3 = w3 = 0;
              }
              r3.head && (r3.head.hcrc = r3.flags >> 9 & 1, r3.head.done = true), t4.adler = r3.check = 0, r3.mode = 12;
              break;
            case 10:
              for (; b3 < 32; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              t4.adler = r3.check = m2(w3), b3 = w3 = 0, r3.mode = 11;
            case 11:
              if (0 === r3.havedict)
                return t4.next_out = _3, t4.avail_out = v3, t4.next_in = g3, t4.avail_in = y3, r3.hold = w3, r3.bits = b3, 2;
              t4.adler = r3.check = 1, r3.mode = 12;
            case 12:
              if (5 === e3 || 6 === e3)
                break t;
            case 13:
              if (r3.last) {
                w3 >>>= 7 & b3, b3 -= 7 & b3, r3.mode = 27;
                break;
              }
              for (; b3 < 3; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              switch (r3.last = 1 & w3, b3 -= 1, 3 & (w3 >>>= 1)) {
                case 0:
                  r3.mode = 14;
                  break;
                case 1:
                  if (x2(r3), r3.mode = 20, 6 !== e3)
                    break;
                  w3 >>>= 2, b3 -= 2;
                  break t;
                case 2:
                  r3.mode = 17;
                  break;
                case 3:
                  t4.msg = "invalid block type", r3.mode = 30;
              }
              w3 >>>= 2, b3 -= 2;
              break;
            case 14:
              for (w3 >>>= 7 & b3, b3 -= 7 & b3; b3 < 32; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              if ((65535 & w3) != (w3 >>> 16 ^ 65535)) {
                t4.msg = "invalid stored block lengths", r3.mode = 30;
                break;
              }
              if (r3.length = 65535 & w3, b3 = w3 = 0, r3.mode = 15, 6 === e3)
                break t;
            case 15:
              r3.mode = 16;
            case 16:
              if (S2 = r3.length) {
                if (y3 < S2 && (S2 = y3), v3 < S2 && (S2 = v3), 0 === S2)
                  break t;
                n2.arraySet(p3, d3, g3, S2, _3), y3 -= S2, g3 += S2, v3 -= S2, _3 += S2, r3.length -= S2;
                break;
              }
              r3.mode = 12;
              break;
            case 17:
              for (; b3 < 14; ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              if (r3.nlen = 257 + (31 & w3), w3 >>>= 5, b3 -= 5, r3.ndist = 1 + (31 & w3), w3 >>>= 5, b3 -= 5, r3.ncode = 4 + (15 & w3), w3 >>>= 4, b3 -= 4, 286 < r3.nlen || 30 < r3.ndist) {
                t4.msg = "too many length or distance symbols", r3.mode = 30;
                break;
              }
              r3.have = 0, r3.mode = 18;
            case 18:
              for (; r3.have < r3.ncode; ) {
                for (; b3 < 3; ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                r3.lens[M2[r3.have++]] = 7 & w3, w3 >>>= 3, b3 -= 3;
              }
              for (; r3.have < 19; )
                r3.lens[M2[r3.have++]] = 0;
              if (r3.lencode = r3.lendyn, r3.lenbits = 7, F2 = { bits: r3.lenbits }, U2 = o2(0, r3.lens, 0, 19, r3.lencode, 0, r3.work, F2), r3.lenbits = F2.bits, U2) {
                t4.msg = "invalid code lengths set", r3.mode = 30;
                break;
              }
              r3.have = 0, r3.mode = 19;
            case 19:
              for (; r3.have < r3.nlen + r3.ndist; ) {
                for (; I2 = (L2 = r3.lencode[w3 & (1 << r3.lenbits) - 1]) >>> 16 & 255, T2 = 65535 & L2, !((R2 = L2 >>> 24) <= b3); ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                if (T2 < 16)
                  w3 >>>= R2, b3 -= R2, r3.lens[r3.have++] = T2;
                else {
                  if (16 === T2) {
                    for (N2 = R2 + 2; b3 < N2; ) {
                      if (0 === y3)
                        break t;
                      y3--, w3 += d3[g3++] << b3, b3 += 8;
                    }
                    if (w3 >>>= R2, b3 -= R2, 0 === r3.have) {
                      t4.msg = "invalid bit length repeat", r3.mode = 30;
                      break;
                    }
                    D2 = r3.lens[r3.have - 1], S2 = 3 + (3 & w3), w3 >>>= 2, b3 -= 2;
                  } else if (17 === T2) {
                    for (N2 = R2 + 3; b3 < N2; ) {
                      if (0 === y3)
                        break t;
                      y3--, w3 += d3[g3++] << b3, b3 += 8;
                    }
                    b3 -= R2, D2 = 0, S2 = 3 + (7 & (w3 >>>= R2)), w3 >>>= 3, b3 -= 3;
                  } else {
                    for (N2 = R2 + 7; b3 < N2; ) {
                      if (0 === y3)
                        break t;
                      y3--, w3 += d3[g3++] << b3, b3 += 8;
                    }
                    b3 -= R2, D2 = 0, S2 = 11 + (127 & (w3 >>>= R2)), w3 >>>= 7, b3 -= 7;
                  }
                  if (r3.have + S2 > r3.nlen + r3.ndist) {
                    t4.msg = "invalid bit length repeat", r3.mode = 30;
                    break;
                  }
                  for (; S2--; )
                    r3.lens[r3.have++] = D2;
                }
              }
              if (30 === r3.mode)
                break;
              if (0 === r3.lens[256]) {
                t4.msg = "invalid code -- missing end-of-block", r3.mode = 30;
                break;
              }
              if (r3.lenbits = 9, F2 = { bits: r3.lenbits }, U2 = o2(h2, r3.lens, 0, r3.nlen, r3.lencode, 0, r3.work, F2), r3.lenbits = F2.bits, U2) {
                t4.msg = "invalid literal/lengths set", r3.mode = 30;
                break;
              }
              if (r3.distbits = 6, r3.distcode = r3.distdyn, F2 = { bits: r3.distbits }, U2 = o2(u2, r3.lens, r3.nlen, r3.ndist, r3.distcode, 0, r3.work, F2), r3.distbits = F2.bits, U2) {
                t4.msg = "invalid distances set", r3.mode = 30;
                break;
              }
              if (r3.mode = 20, 6 === e3)
                break t;
            case 20:
              r3.mode = 21;
            case 21:
              if (6 <= y3 && 258 <= v3) {
                t4.next_out = _3, t4.avail_out = v3, t4.next_in = g3, t4.avail_in = y3, r3.hold = w3, r3.bits = b3, s2(t4, E3), _3 = t4.next_out, p3 = t4.output, v3 = t4.avail_out, g3 = t4.next_in, d3 = t4.input, y3 = t4.avail_in, w3 = r3.hold, b3 = r3.bits, 12 === r3.mode && (r3.back = -1);
                break;
              }
              for (r3.back = 0; I2 = (L2 = r3.lencode[w3 & (1 << r3.lenbits) - 1]) >>> 16 & 255, T2 = 65535 & L2, !((R2 = L2 >>> 24) <= b3); ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              if (I2 && !(240 & I2)) {
                for (O2 = R2, B2 = I2, P2 = T2; I2 = (L2 = r3.lencode[P2 + ((w3 & (1 << O2 + B2) - 1) >> O2)]) >>> 16 & 255, T2 = 65535 & L2, !(O2 + (R2 = L2 >>> 24) <= b3); ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                w3 >>>= O2, b3 -= O2, r3.back += O2;
              }
              if (w3 >>>= R2, b3 -= R2, r3.back += R2, r3.length = T2, 0 === I2) {
                r3.mode = 26;
                break;
              }
              if (32 & I2) {
                r3.back = -1, r3.mode = 12;
                break;
              }
              if (64 & I2) {
                t4.msg = "invalid literal/length code", r3.mode = 30;
                break;
              }
              r3.extra = 15 & I2, r3.mode = 22;
            case 22:
              if (r3.extra) {
                for (N2 = r3.extra; b3 < N2; ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                r3.length += w3 & (1 << r3.extra) - 1, w3 >>>= r3.extra, b3 -= r3.extra, r3.back += r3.extra;
              }
              r3.was = r3.length, r3.mode = 23;
            case 23:
              for (; I2 = (L2 = r3.distcode[w3 & (1 << r3.distbits) - 1]) >>> 16 & 255, T2 = 65535 & L2, !((R2 = L2 >>> 24) <= b3); ) {
                if (0 === y3)
                  break t;
                y3--, w3 += d3[g3++] << b3, b3 += 8;
              }
              if (!(240 & I2)) {
                for (O2 = R2, B2 = I2, P2 = T2; I2 = (L2 = r3.distcode[P2 + ((w3 & (1 << O2 + B2) - 1) >> O2)]) >>> 16 & 255, T2 = 65535 & L2, !(O2 + (R2 = L2 >>> 24) <= b3); ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                w3 >>>= O2, b3 -= O2, r3.back += O2;
              }
              if (w3 >>>= R2, b3 -= R2, r3.back += R2, 64 & I2) {
                t4.msg = "invalid distance code", r3.mode = 30;
                break;
              }
              r3.offset = T2, r3.extra = 15 & I2, r3.mode = 24;
            case 24:
              if (r3.extra) {
                for (N2 = r3.extra; b3 < N2; ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                r3.offset += w3 & (1 << r3.extra) - 1, w3 >>>= r3.extra, b3 -= r3.extra, r3.back += r3.extra;
              }
              if (r3.offset > r3.dmax) {
                t4.msg = "invalid distance too far back", r3.mode = 30;
                break;
              }
              r3.mode = 25;
            case 25:
              if (0 === v3)
                break t;
              if (S2 = E3 - v3, r3.offset > S2) {
                if ((S2 = r3.offset - S2) > r3.whave && r3.sane) {
                  t4.msg = "invalid distance too far back", r3.mode = 30;
                  break;
                }
                C2 = S2 > r3.wnext ? (S2 -= r3.wnext, r3.wsize - S2) : r3.wnext - S2, S2 > r3.length && (S2 = r3.length), z2 = r3.window;
              } else
                z2 = p3, C2 = _3 - r3.offset, S2 = r3.length;
              for (v3 < S2 && (S2 = v3), v3 -= S2, r3.length -= S2; p3[_3++] = z2[C2++], --S2; )
                ;
              0 === r3.length && (r3.mode = 21);
              break;
            case 26:
              if (0 === v3)
                break t;
              p3[_3++] = r3.length, v3--, r3.mode = 21;
              break;
            case 27:
              if (r3.wrap) {
                for (; b3 < 32; ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 |= d3[g3++] << b3, b3 += 8;
                }
                if (E3 -= v3, t4.total_out += E3, r3.total += E3, E3 && (t4.adler = r3.check = r3.flags ? a2(r3.check, p3, E3, _3 - E3) : i2(r3.check, p3, E3, _3 - E3)), E3 = v3, (r3.flags ? w3 : m2(w3)) !== r3.check) {
                  t4.msg = "incorrect data check", r3.mode = 30;
                  break;
                }
                b3 = w3 = 0;
              }
              r3.mode = 28;
            case 28:
              if (r3.wrap && r3.flags) {
                for (; b3 < 32; ) {
                  if (0 === y3)
                    break t;
                  y3--, w3 += d3[g3++] << b3, b3 += 8;
                }
                if (w3 !== (4294967295 & r3.total)) {
                  t4.msg = "incorrect length check", r3.mode = 30;
                  break;
                }
                b3 = w3 = 0;
              }
              r3.mode = 29;
            case 29:
              U2 = 1;
              break t;
            case 30:
              U2 = -3;
              break t;
            case 31:
              return -4;
            default:
              return l2;
          }
      return t4.next_out = _3, t4.avail_out = v3, t4.next_in = g3, t4.avail_in = y3, r3.hold = w3, r3.bits = b3, (r3.wsize || E3 !== t4.avail_out && r3.mode < 30 && (r3.mode < 27 || 4 !== e3)) && A2(t4, t4.output, t4.next_out, E3 - t4.avail_out) ? (r3.mode = 31, -4) : (k3 -= t4.avail_in, E3 -= t4.avail_out, t4.total_in += k3, t4.total_out += E3, r3.total += E3, r3.wrap && E3 && (t4.adler = r3.check = r3.flags ? a2(r3.check, p3, E3, t4.next_out - E3) : i2(r3.check, p3, E3, t4.next_out - E3)), t4.data_type = r3.bits + (r3.last ? 64 : 0) + (12 === r3.mode ? 128 : 0) + (20 === r3.mode || 15 === r3.mode ? 256 : 0), (0 == k3 && 0 === E3 || 4 === e3) && U2 === f2 && (U2 = -5), U2);
    }, r2.inflateEnd = function(t4) {
      if (!t4 || !t4.state)
        return l2;
      var e3 = t4.state;
      return e3.window && (e3.window = null), t4.state = null, f2;
    }, r2.inflateGetHeader = function(t4, e3) {
      var r3;
      return t4 && t4.state && 2 & (r3 = t4.state).wrap ? ((r3.head = e3).done = false, f2) : l2;
    }, r2.inflateSetDictionary = function(t4, e3) {
      var r3, n3 = e3.length;
      return t4 && t4.state ? 0 !== (r3 = t4.state).wrap && 11 !== r3.mode ? l2 : 11 === r3.mode && i2(1, e3, n3, 0) !== r3.check ? -3 : A2(t4, e3, n3, n3) ? (r3.mode = 31, -4) : (r3.havedict = 1, f2) : l2;
    }, r2.inflateInfo = "pako inflate (from Nodeca project)";
  }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(t3, e2, r2) {
    var n2 = t3("../utils/common"), i2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], a2 = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], s2 = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], o2 = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
    e2.exports = function(t4, e3, r3, h2, u2, f2, l2, c2) {
      var d2, p2, m2, g2, _2, y2, v2, w2, b2, k2 = c2.bits, E2 = 0, x2 = 0, A2 = 0, S2 = 0, C2 = 0, z2 = 0, R2 = 0, I2 = 0, T2 = 0, O2 = 0, B2 = null, P2 = 0, D2 = new n2.Buf16(16), U2 = new n2.Buf16(16), F2 = null, N2 = 0;
      for (E2 = 0; E2 <= 15; E2++)
        D2[E2] = 0;
      for (x2 = 0; x2 < h2; x2++)
        D2[e3[r3 + x2]]++;
      for (C2 = k2, S2 = 15; 1 <= S2 && 0 === D2[S2]; S2--)
        ;
      if (S2 < C2 && (C2 = S2), 0 === S2)
        return u2[f2++] = 20971520, u2[f2++] = 20971520, c2.bits = 1, 0;
      for (A2 = 1; A2 < S2 && 0 === D2[A2]; A2++)
        ;
      for (C2 < A2 && (C2 = A2), E2 = I2 = 1; E2 <= 15; E2++)
        if (I2 <<= 1, (I2 -= D2[E2]) < 0)
          return -1;
      if (0 < I2 && (0 === t4 || 1 !== S2))
        return -1;
      for (U2[1] = 0, E2 = 1; E2 < 15; E2++)
        U2[E2 + 1] = U2[E2] + D2[E2];
      for (x2 = 0; x2 < h2; x2++)
        0 !== e3[r3 + x2] && (l2[U2[e3[r3 + x2]]++] = x2);
      if (y2 = 0 === t4 ? (B2 = F2 = l2, 19) : 1 === t4 ? (B2 = i2, P2 -= 257, F2 = a2, N2 -= 257, 256) : (B2 = s2, F2 = o2, -1), E2 = A2, _2 = f2, R2 = x2 = O2 = 0, m2 = -1, g2 = (T2 = 1 << (z2 = C2)) - 1, 1 === t4 && 852 < T2 || 2 === t4 && 592 < T2)
        return 1;
      for (; ; ) {
        for (v2 = E2 - R2, b2 = l2[x2] < y2 ? (w2 = 0, l2[x2]) : l2[x2] > y2 ? (w2 = F2[N2 + l2[x2]], B2[P2 + l2[x2]]) : (w2 = 96, 0), d2 = 1 << E2 - R2, A2 = p2 = 1 << z2; u2[_2 + (O2 >> R2) + (p2 -= d2)] = v2 << 24 | w2 << 16 | b2, 0 !== p2; )
          ;
        for (d2 = 1 << E2 - 1; O2 & d2; )
          d2 >>= 1;
        if (0 !== d2 ? (O2 &= d2 - 1, O2 += d2) : O2 = 0, x2++, 0 == --D2[E2]) {
          if (E2 === S2)
            break;
          E2 = e3[r3 + l2[x2]];
        }
        if (C2 < E2 && (O2 & g2) !== m2) {
          for (0 === R2 && (R2 = C2), _2 += A2, I2 = 1 << (z2 = E2 - R2); z2 + R2 < S2 && !((I2 -= D2[z2 + R2]) <= 0); )
            z2++, I2 <<= 1;
          if (T2 += 1 << z2, 1 === t4 && 852 < T2 || 2 === t4 && 592 < T2)
            return 1;
          u2[m2 = O2 & g2] = C2 << 24 | z2 << 16 | _2 - f2;
        }
      }
      return 0 !== O2 && (u2[_2 + O2] = E2 - R2 << 24 | 64 << 16), c2.bits = C2, 0;
    };
  }, { "../utils/common": 41 }], 51: [function(t3, e2, r2) {
    e2.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
  }, {}], 52: [function(t3, e2, r2) {
    var n2 = t3("../utils/common"), i2 = 0, a2 = 1;
    function s2(t4) {
      for (var e3 = t4.length; 0 <= --e3; )
        t4[e3] = 0;
    }
    var o2 = 0, h2 = 29, u2 = 256, f2 = u2 + 1 + h2, l2 = 30, c2 = 19, d2 = 2 * f2 + 1, p2 = 15, m2 = 16, g2 = 7, _2 = 256, y2 = 16, v2 = 17, w2 = 18, b2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k2 = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], E2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], x2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], A2 = new Array(2 * (f2 + 2));
    s2(A2);
    var S2 = new Array(2 * l2);
    s2(S2);
    var C2 = new Array(512);
    s2(C2);
    var z2 = new Array(256);
    s2(z2);
    var R2 = new Array(h2);
    s2(R2);
    var I2, T2, O2, B2 = new Array(l2);
    function P2(t4, e3, r3, n3, i3) {
      this.static_tree = t4, this.extra_bits = e3, this.extra_base = r3, this.elems = n3, this.max_length = i3, this.has_stree = t4 && t4.length;
    }
    function D2(t4, e3) {
      this.dyn_tree = t4, this.max_code = 0, this.stat_desc = e3;
    }
    function U2(t4) {
      return t4 < 256 ? C2[t4] : C2[256 + (t4 >>> 7)];
    }
    function F2(t4, e3) {
      t4.pending_buf[t4.pending++] = 255 & e3, t4.pending_buf[t4.pending++] = e3 >>> 8 & 255;
    }
    function N2(t4, e3, r3) {
      t4.bi_valid > m2 - r3 ? (t4.bi_buf |= e3 << t4.bi_valid & 65535, F2(t4, t4.bi_buf), t4.bi_buf = e3 >> m2 - t4.bi_valid, t4.bi_valid += r3 - m2) : (t4.bi_buf |= e3 << t4.bi_valid & 65535, t4.bi_valid += r3);
    }
    function L2(t4, e3, r3) {
      N2(t4, r3[2 * e3], r3[2 * e3 + 1]);
    }
    function j2(t4, e3) {
      for (var r3 = 0; r3 |= 1 & t4, t4 >>>= 1, r3 <<= 1, 0 < --e3; )
        ;
      return r3 >>> 1;
    }
    function M2(t4, e3, r3) {
      var n3, i3, a3 = new Array(p2 + 1), s3 = 0;
      for (n3 = 1; n3 <= p2; n3++)
        a3[n3] = s3 = s3 + r3[n3 - 1] << 1;
      for (i3 = 0; i3 <= e3; i3++) {
        var o3 = t4[2 * i3 + 1];
        0 !== o3 && (t4[2 * i3] = j2(a3[o3]++, o3));
      }
    }
    function Z2(t4) {
      var e3;
      for (e3 = 0; e3 < f2; e3++)
        t4.dyn_ltree[2 * e3] = 0;
      for (e3 = 0; e3 < l2; e3++)
        t4.dyn_dtree[2 * e3] = 0;
      for (e3 = 0; e3 < c2; e3++)
        t4.bl_tree[2 * e3] = 0;
      t4.dyn_ltree[2 * _2] = 1, t4.opt_len = t4.static_len = 0, t4.last_lit = t4.matches = 0;
    }
    function W2(t4) {
      8 < t4.bi_valid ? F2(t4, t4.bi_buf) : 0 < t4.bi_valid && (t4.pending_buf[t4.pending++] = t4.bi_buf), t4.bi_buf = 0, t4.bi_valid = 0;
    }
    function Y2(t4, e3, r3, n3) {
      var i3 = 2 * e3, a3 = 2 * r3;
      return t4[i3] < t4[a3] || t4[i3] === t4[a3] && n3[e3] <= n3[r3];
    }
    function H2(t4, e3, r3) {
      for (var n3 = t4.heap[r3], i3 = r3 << 1; i3 <= t4.heap_len && (i3 < t4.heap_len && Y2(e3, t4.heap[i3 + 1], t4.heap[i3], t4.depth) && i3++, !Y2(e3, n3, t4.heap[i3], t4.depth)); )
        t4.heap[r3] = t4.heap[i3], r3 = i3, i3 <<= 1;
      t4.heap[r3] = n3;
    }
    function G2(t4, e3, r3) {
      var n3, i3, a3, s3, o3 = 0;
      if (0 !== t4.last_lit)
        for (; n3 = t4.pending_buf[t4.d_buf + 2 * o3] << 8 | t4.pending_buf[t4.d_buf + 2 * o3 + 1], i3 = t4.pending_buf[t4.l_buf + o3], o3++, 0 === n3 ? L2(t4, i3, e3) : (L2(t4, (a3 = z2[i3]) + u2 + 1, e3), 0 !== (s3 = b2[a3]) && N2(t4, i3 -= R2[a3], s3), L2(t4, a3 = U2(--n3), r3), 0 !== (s3 = k2[a3]) && N2(t4, n3 -= B2[a3], s3)), o3 < t4.last_lit; )
          ;
      L2(t4, _2, e3);
    }
    function K2(t4, e3) {
      var r3, n3, i3, a3 = e3.dyn_tree, s3 = e3.stat_desc.static_tree, o3 = e3.stat_desc.has_stree, h3 = e3.stat_desc.elems, u3 = -1;
      for (t4.heap_len = 0, t4.heap_max = d2, r3 = 0; r3 < h3; r3++)
        0 !== a3[2 * r3] ? (t4.heap[++t4.heap_len] = u3 = r3, t4.depth[r3] = 0) : a3[2 * r3 + 1] = 0;
      for (; t4.heap_len < 2; )
        a3[2 * (i3 = t4.heap[++t4.heap_len] = u3 < 2 ? ++u3 : 0)] = 1, t4.depth[i3] = 0, t4.opt_len--, o3 && (t4.static_len -= s3[2 * i3 + 1]);
      for (e3.max_code = u3, r3 = t4.heap_len >> 1; 1 <= r3; r3--)
        H2(t4, a3, r3);
      for (i3 = h3; r3 = t4.heap[1], t4.heap[1] = t4.heap[t4.heap_len--], H2(t4, a3, 1), n3 = t4.heap[1], t4.heap[--t4.heap_max] = r3, t4.heap[--t4.heap_max] = n3, a3[2 * i3] = a3[2 * r3] + a3[2 * n3], t4.depth[i3] = (t4.depth[r3] >= t4.depth[n3] ? t4.depth[r3] : t4.depth[n3]) + 1, a3[2 * r3 + 1] = a3[2 * n3 + 1] = i3, t4.heap[1] = i3++, H2(t4, a3, 1), 2 <= t4.heap_len; )
        ;
      t4.heap[--t4.heap_max] = t4.heap[1], function(t5, e4) {
        var r4, n4, i4, a4, s4, o4, h4 = e4.dyn_tree, u4 = e4.max_code, f3 = e4.stat_desc.static_tree, l3 = e4.stat_desc.has_stree, c3 = e4.stat_desc.extra_bits, m3 = e4.stat_desc.extra_base, g3 = e4.stat_desc.max_length, _3 = 0;
        for (a4 = 0; a4 <= p2; a4++)
          t5.bl_count[a4] = 0;
        for (h4[2 * t5.heap[t5.heap_max] + 1] = 0, r4 = t5.heap_max + 1; r4 < d2; r4++)
          g3 < (a4 = h4[2 * h4[2 * (n4 = t5.heap[r4]) + 1] + 1] + 1) && (a4 = g3, _3++), h4[2 * n4 + 1] = a4, u4 < n4 || (t5.bl_count[a4]++, s4 = 0, m3 <= n4 && (s4 = c3[n4 - m3]), o4 = h4[2 * n4], t5.opt_len += o4 * (a4 + s4), l3 && (t5.static_len += o4 * (f3[2 * n4 + 1] + s4)));
        if (0 !== _3) {
          do {
            for (a4 = g3 - 1; 0 === t5.bl_count[a4]; )
              a4--;
            t5.bl_count[a4]--, t5.bl_count[a4 + 1] += 2, t5.bl_count[g3]--, _3 -= 2;
          } while (0 < _3);
          for (a4 = g3; 0 !== a4; a4--)
            for (n4 = t5.bl_count[a4]; 0 !== n4; )
              u4 < (i4 = t5.heap[--r4]) || (h4[2 * i4 + 1] !== a4 && (t5.opt_len += (a4 - h4[2 * i4 + 1]) * h4[2 * i4], h4[2 * i4 + 1] = a4), n4--);
        }
      }(t4, e3), M2(a3, u3, t4.bl_count);
    }
    function X2(t4, e3, r3) {
      var n3, i3, a3 = -1, s3 = e3[1], o3 = 0, h3 = 7, u3 = 4;
      for (0 === s3 && (h3 = 138, u3 = 3), e3[2 * (r3 + 1) + 1] = 65535, n3 = 0; n3 <= r3; n3++)
        i3 = s3, s3 = e3[2 * (n3 + 1) + 1], ++o3 < h3 && i3 === s3 || (o3 < u3 ? t4.bl_tree[2 * i3] += o3 : 0 !== i3 ? (i3 !== a3 && t4.bl_tree[2 * i3]++, t4.bl_tree[2 * y2]++) : o3 <= 10 ? t4.bl_tree[2 * v2]++ : t4.bl_tree[2 * w2]++, a3 = i3, u3 = (o3 = 0) === s3 ? (h3 = 138, 3) : i3 === s3 ? (h3 = 6, 3) : (h3 = 7, 4));
    }
    function V2(t4, e3, r3) {
      var n3, i3, a3 = -1, s3 = e3[1], o3 = 0, h3 = 7, u3 = 4;
      for (0 === s3 && (h3 = 138, u3 = 3), n3 = 0; n3 <= r3; n3++)
        if (i3 = s3, s3 = e3[2 * (n3 + 1) + 1], !(++o3 < h3 && i3 === s3)) {
          if (o3 < u3)
            for (; L2(t4, i3, t4.bl_tree), 0 != --o3; )
              ;
          else
            0 !== i3 ? (i3 !== a3 && (L2(t4, i3, t4.bl_tree), o3--), L2(t4, y2, t4.bl_tree), N2(t4, o3 - 3, 2)) : o3 <= 10 ? (L2(t4, v2, t4.bl_tree), N2(t4, o3 - 3, 3)) : (L2(t4, w2, t4.bl_tree), N2(t4, o3 - 11, 7));
          a3 = i3, u3 = (o3 = 0) === s3 ? (h3 = 138, 3) : i3 === s3 ? (h3 = 6, 3) : (h3 = 7, 4);
        }
    }
    s2(B2);
    var q2 = false;
    function J2(t4, e3, r3, i3) {
      N2(t4, (o2 << 1) + (i3 ? 1 : 0), 3), function(t5, e4, r4, i4) {
        W2(t5), i4 && (F2(t5, r4), F2(t5, ~r4)), n2.arraySet(t5.pending_buf, t5.window, e4, r4, t5.pending), t5.pending += r4;
      }(t4, e3, r3, true);
    }
    r2._tr_init = function(t4) {
      q2 || (function() {
        var t5, e3, r3, n3, i3, a3 = new Array(p2 + 1);
        for (n3 = r3 = 0; n3 < h2 - 1; n3++)
          for (R2[n3] = r3, t5 = 0; t5 < 1 << b2[n3]; t5++)
            z2[r3++] = n3;
        for (z2[r3 - 1] = n3, n3 = i3 = 0; n3 < 16; n3++)
          for (B2[n3] = i3, t5 = 0; t5 < 1 << k2[n3]; t5++)
            C2[i3++] = n3;
        for (i3 >>= 7; n3 < l2; n3++)
          for (B2[n3] = i3 << 7, t5 = 0; t5 < 1 << k2[n3] - 7; t5++)
            C2[256 + i3++] = n3;
        for (e3 = 0; e3 <= p2; e3++)
          a3[e3] = 0;
        for (t5 = 0; t5 <= 143; )
          A2[2 * t5 + 1] = 8, t5++, a3[8]++;
        for (; t5 <= 255; )
          A2[2 * t5 + 1] = 9, t5++, a3[9]++;
        for (; t5 <= 279; )
          A2[2 * t5 + 1] = 7, t5++, a3[7]++;
        for (; t5 <= 287; )
          A2[2 * t5 + 1] = 8, t5++, a3[8]++;
        for (M2(A2, f2 + 1, a3), t5 = 0; t5 < l2; t5++)
          S2[2 * t5 + 1] = 5, S2[2 * t5] = j2(t5, 5);
        I2 = new P2(A2, b2, u2 + 1, f2, p2), T2 = new P2(S2, k2, 0, l2, p2), O2 = new P2(new Array(0), E2, 0, c2, g2);
      }(), q2 = true), t4.l_desc = new D2(t4.dyn_ltree, I2), t4.d_desc = new D2(t4.dyn_dtree, T2), t4.bl_desc = new D2(t4.bl_tree, O2), t4.bi_buf = 0, t4.bi_valid = 0, Z2(t4);
    }, r2._tr_stored_block = J2, r2._tr_flush_block = function(t4, e3, r3, n3) {
      var s3, o3, h3 = 0;
      0 < t4.level ? (2 === t4.strm.data_type && (t4.strm.data_type = function(t5) {
        var e4, r4 = 4093624447;
        for (e4 = 0; e4 <= 31; e4++, r4 >>>= 1)
          if (1 & r4 && 0 !== t5.dyn_ltree[2 * e4])
            return i2;
        if (0 !== t5.dyn_ltree[18] || 0 !== t5.dyn_ltree[20] || 0 !== t5.dyn_ltree[26])
          return a2;
        for (e4 = 32; e4 < u2; e4++)
          if (0 !== t5.dyn_ltree[2 * e4])
            return a2;
        return i2;
      }(t4)), K2(t4, t4.l_desc), K2(t4, t4.d_desc), h3 = function(t5) {
        var e4;
        for (X2(t5, t5.dyn_ltree, t5.l_desc.max_code), X2(t5, t5.dyn_dtree, t5.d_desc.max_code), K2(t5, t5.bl_desc), e4 = c2 - 1; 3 <= e4 && 0 === t5.bl_tree[2 * x2[e4] + 1]; e4--)
          ;
        return t5.opt_len += 3 * (e4 + 1) + 5 + 5 + 4, e4;
      }(t4), s3 = t4.opt_len + 3 + 7 >>> 3, (o3 = t4.static_len + 3 + 7 >>> 3) <= s3 && (s3 = o3)) : s3 = o3 = r3 + 5, r3 + 4 <= s3 && -1 !== e3 ? J2(t4, e3, r3, n3) : 4 === t4.strategy || o3 === s3 ? (N2(t4, 2 + (n3 ? 1 : 0), 3), G2(t4, A2, S2)) : (N2(t4, 4 + (n3 ? 1 : 0), 3), function(t5, e4, r4, n4) {
        var i3;
        for (N2(t5, e4 - 257, 5), N2(t5, r4 - 1, 5), N2(t5, n4 - 4, 4), i3 = 0; i3 < n4; i3++)
          N2(t5, t5.bl_tree[2 * x2[i3] + 1], 3);
        V2(t5, t5.dyn_ltree, e4 - 1), V2(t5, t5.dyn_dtree, r4 - 1);
      }(t4, t4.l_desc.max_code + 1, t4.d_desc.max_code + 1, h3 + 1), G2(t4, t4.dyn_ltree, t4.dyn_dtree)), Z2(t4), n3 && W2(t4);
    }, r2._tr_tally = function(t4, e3, r3) {
      return t4.pending_buf[t4.d_buf + 2 * t4.last_lit] = e3 >>> 8 & 255, t4.pending_buf[t4.d_buf + 2 * t4.last_lit + 1] = 255 & e3, t4.pending_buf[t4.l_buf + t4.last_lit] = 255 & r3, t4.last_lit++, 0 === e3 ? t4.dyn_ltree[2 * r3]++ : (t4.matches++, e3--, t4.dyn_ltree[2 * (z2[r3] + u2 + 1)]++, t4.dyn_dtree[2 * U2(e3)]++), t4.last_lit === t4.lit_bufsize - 1;
    }, r2._tr_align = function(t4) {
      N2(t4, 2, 3), L2(t4, _2, A2), function(t5) {
        16 === t5.bi_valid ? (F2(t5, t5.bi_buf), t5.bi_buf = 0, t5.bi_valid = 0) : 8 <= t5.bi_valid && (t5.pending_buf[t5.pending++] = 255 & t5.bi_buf, t5.bi_buf >>= 8, t5.bi_valid -= 8);
      }(t4);
    };
  }, { "../utils/common": 41 }], 53: [function(t3, e2, r2) {
    e2.exports = function() {
      this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    };
  }, {}], 54: [function(t3, e2, r2) {
    (function(t4) {
      !function(t5, e3) {
        if (!t5.setImmediate) {
          var r3, n2, i2, a2, s2 = 1, o2 = {}, h2 = false, u2 = t5.document, f2 = Object.getPrototypeOf && Object.getPrototypeOf(t5);
          f2 = f2 && f2.setTimeout ? f2 : t5, r3 = "[object process]" === {}.toString.call(t5.process) ? function(t6) {
            bt.nextTick(function() {
              c2(t6);
            });
          } : function() {
            if (t5.postMessage && !t5.importScripts) {
              var e4 = true, r4 = t5.onmessage;
              return t5.onmessage = function() {
                e4 = false;
              }, t5.postMessage("", "*"), t5.onmessage = r4, e4;
            }
          }() ? (a2 = "setImmediate$" + Math.random() + "$", t5.addEventListener ? t5.addEventListener("message", d2, false) : t5.attachEvent("onmessage", d2), function(e4) {
            t5.postMessage(a2 + e4, "*");
          }) : t5.MessageChannel ? ((i2 = new MessageChannel()).port1.onmessage = function(t6) {
            c2(t6.data);
          }, function(t6) {
            i2.port2.postMessage(t6);
          }) : u2 && "onreadystatechange" in u2.createElement("script") ? (n2 = u2.documentElement, function(t6) {
            var e4 = u2.createElement("script");
            e4.onreadystatechange = function() {
              c2(t6), e4.onreadystatechange = null, n2.removeChild(e4), e4 = null;
            }, n2.appendChild(e4);
          }) : function(t6) {
            setTimeout(c2, 0, t6);
          }, f2.setImmediate = function(t6) {
            "function" != typeof t6 && (t6 = new Function("" + t6));
            for (var e4 = new Array(arguments.length - 1), n3 = 0; n3 < e4.length; n3++)
              e4[n3] = arguments[n3 + 1];
            var i3 = { callback: t6, args: e4 };
            return o2[s2] = i3, r3(s2), s2++;
          }, f2.clearImmediate = l2;
        }
        function l2(t6) {
          delete o2[t6];
        }
        function c2(t6) {
          if (h2)
            setTimeout(c2, 0, t6);
          else {
            var r4 = o2[t6];
            if (r4) {
              h2 = true;
              try {
                !function(t7) {
                  var r5 = t7.callback, n3 = t7.args;
                  switch (n3.length) {
                    case 0:
                      r5();
                      break;
                    case 1:
                      r5(n3[0]);
                      break;
                    case 2:
                      r5(n3[0], n3[1]);
                      break;
                    case 3:
                      r5(n3[0], n3[1], n3[2]);
                      break;
                    default:
                      r5.apply(e3, n3);
                  }
                }(r4);
              } finally {
                l2(t6), h2 = false;
              }
            }
          }
        }
        function d2(e4) {
          e4.source === t5 && "string" == typeof e4.data && 0 === e4.data.indexOf(a2) && c2(+e4.data.slice(a2.length));
        }
      }("undefined" == typeof self ? void 0 === t4 ? this : t4 : self);
    }).call(this, void 0 !== kt ? kt : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {}] }, {}, [10])(10);

  // src/background.js
  var DEFAULTS = {
    modifierKey: "alt",
    useOriginalFilenames: false,
    showNoDialogBtn: false,
    showIndividualBtn: true,
    showZipBtn: true,
    buttonPosition: "top-right",
    zipNameAddDate: false,
    zipNameAddBoard: false,
    zipNameAddCount: false,
    imageThreshold: 20,
    timeoutSeconds: 2,
    defaultFolder: "",
    boardFolders: {},
    nameFolders: {}
  };
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      chrome.storage.sync.set(DEFAULTS);
    }
  });
  var cancelRequested = false;
  var isDownloading = false;
  function getCurrentDateString() {
    const now = /* @__PURE__ */ new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  }
  function getBoardNameFromFiles(files) {
    if (!files.length)
      return "";
    const match = files[0].url.match(/:\/\/i\.4cdn\.org\/([a-z0-9]+)\//i);
    return match ? match[1] : "";
  }
  function getBoardNameFromUrl(url) {
    const match = url.match(/:\/\/i\.4cdn\.org\/([a-z0-9]+)\//i);
    return match ? match[1] : "";
  }
  function getFolderPathForFile(file, options) {
    let folders = [];
    if (options.defaultFolder && options.defaultFolder.trim()) {
      folders.push(options.defaultFolder.trim());
    }
    const board = getBoardNameFromUrl(file.url);
    if (board && options.boardFolders && options.boardFolders[board]) {
      folders.push(options.boardFolders[board]);
    }
    if (options.nameFolders && typeof options.nameFolders === "object") {
      for (const key in options.nameFolders) {
        const entry = options.nameFolders[key];
        if (!entry || !entry.string || !entry.label || !entry.folder)
          continue;
        let match = false;
        if (entry.label === "filename" && typeof file.originalFilename === "string" && // exact match (change === entry.string to '.includes(entry.string)' for case-insensitive)
        file.originalFilename === entry.string) {
          match = true;
        }
        if (entry.label === "name" && typeof file.name === "string" && file.name === entry.string) {
          match = true;
        }
        if (match) {
          folders.push(entry.folder);
          break;
        }
      }
    }
    return folders.join("/");
  }
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "cancelDownload") {
      cancelRequested = true;
      isDownloading = false;
      sendResponse && sendResponse({ status: "cancel_set" });
      return;
    }
    if (message.action === "downloadImages" && Array.isArray(message.files)) {
      if (isDownloading) {
        sendResponse && sendResponse({ status: "busy" });
        return;
      }
      isDownloading = true;
      cancelRequested = false;
      const tabId = sender.tab && sender.tab.id;
      const noDialog = !!message.noDialog;
      const imageThreshold = typeof message.imageThreshold === "number" ? message.imageThreshold : 20;
      const timeoutSeconds = typeof message.timeoutSeconds === "number" ? message.timeoutSeconds : 2;
      const useOriginalFilenames = !!message.useOriginalFilenames;
      chrome.storage.sync.get([
        "overwriteExistingFiles",
        "defaultFolder",
        "boardFolders",
        "nameFolders"
      ], (opts) => {
        const overwriteExistingFiles = !!opts.overwriteExistingFiles;
        const defaultFolder = opts.defaultFolder || "";
        const boardFolders = opts.boardFolders || {};
        const nameFolders = opts.nameFolders || {};
        if (message.zip) {
          chrome.storage.sync.get(["zipNameAddDate", "zipNameAddBoard", "zipNameAddCount"], (zipOpts) => {
            zipAndDownloadImages(
              message.files,
              { defaultFolder, boardFolders, nameFolders },
              zipOpts,
              tabId,
              imageThreshold,
              timeoutSeconds,
              useOriginalFilenames
            ).then((result) => {
              isDownloading = false;
              sendResponse && sendResponse({ status: result === "cancelled" ? "zip_cancelled" : "zip_started" });
            }).catch((err) => {
              isDownloading = false;
              sendResponse && sendResponse({ status: "zip_failed", error: err == null ? void 0 : err.toString() });
            });
          });
          return;
        } else {
          downloadImagesWithProgress(
            message.files,
            { defaultFolder, boardFolders, nameFolders },
            tabId,
            noDialog,
            imageThreshold,
            timeoutSeconds,
            useOriginalFilenames,
            overwriteExistingFiles
          ).then((result) => {
            isDownloading = false;
            sendResponse && sendResponse({ status: result === "cancelled" ? "cancelled" : "started" });
          });
        }
      });
      return true;
    }
    return true;
  });
  async function downloadImagesWithProgress(files, folderOptions, tabId, noDialog, imageThreshold = 20, timeoutSeconds = 2, useOriginalFilenames = false, overwriteExistingFiles = false) {
    for (let i2 = 0; i2 < files.length; i2++) {
      if (cancelRequested) {
        if (tabId)
          chrome.tabs.sendMessage(tabId, { type: "fetch-cancelled" });
        return "cancelled";
      }
      const { url, originalFilename } = files[i2];
      let filename = url.split("/").pop().split("?")[0] || `image${i2 + 1}`;
      if (useOriginalFilenames && originalFilename)
        filename = originalFilename;
      const folder = getFolderPathForFile(files[i2], folderOptions);
      if (tabId) {
        chrome.tabs.sendMessage(tabId, {
          type: "fetch-progress",
          current: i2 + 1,
          total: files.length,
          filename
        });
      }
      const conflictAction = useOriginalFilenames ? "uniquify" : overwriteExistingFiles ? "overwrite" : "uniquify";
      await new Promise((resolve) => {
        chrome.downloads.download({
          url,
          filename: folder ? `${folder}/${filename}` : filename,
          conflictAction,
          saveAs: !noDialog
        }, () => resolve());
      });
      if (imageThreshold > 0 && timeoutSeconds > 0 && i2 + 1 > imageThreshold) {
        await new Promise((res) => setTimeout(res, timeoutSeconds * 1e3));
      }
    }
    if (cancelRequested) {
      if (tabId)
        chrome.tabs.sendMessage(tabId, { type: "fetch-cancelled" });
      return "cancelled";
    }
    if (tabId) {
      chrome.tabs.sendMessage(tabId, { type: "fetch-complete" });
    }
    return "done";
  }
  async function zipAndDownloadImages(files, folderOptions, opts, tabId, imageThreshold = 20, timeoutSeconds = 2, useOriginalFilenames = false) {
    const zip = new At();
    for (let i2 = 0; i2 < files.length; i2++) {
      if (cancelRequested) {
        if (tabId)
          chrome.tabs.sendMessage(tabId, { type: "fetch-cancelled" });
        return "cancelled";
      }
      const { url, originalFilename } = files[i2];
      let filename = url.split("/").pop().split("?")[0] || `image${i2 + 1}`;
      if (useOriginalFilenames && originalFilename)
        filename = originalFilename;
      const folder = getFolderPathForFile(files[i2], folderOptions);
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        zip.file(folder ? `${folder}/${filename}` : filename, blob);
        if (tabId) {
          chrome.tabs.sendMessage(tabId, {
            type: "fetch-progress",
            current: i2 + 1,
            total: files.length,
            filename
          });
        }
      } catch (e2) {
        if (tabId) {
          chrome.tabs.sendMessage(tabId, {
            type: "fetch-progress",
            current: i2 + 1,
            total: files.length,
            filename: `Failed to fetch: ${url}`
          });
        }
      }
      if (imageThreshold > 0 && timeoutSeconds > 0 && i2 + 1 > imageThreshold) {
        await new Promise((res) => setTimeout(res, timeoutSeconds * 1e3));
      }
    }
    if (cancelRequested) {
      if (tabId)
        chrome.tabs.sendMessage(tabId, { type: "fetch-cancelled" });
      return "cancelled";
    }
    let zipNameParts = ["4BD"];
    if (opts.zipNameAddBoard) {
      const board = getBoardNameFromFiles(files);
      if (board)
        zipNameParts.push(board);
    }
    if (opts.zipNameAddDate) {
      zipNameParts.push(getCurrentDateString());
    }
    if (opts.zipNameAddCount) {
      zipNameParts.push(`(${files.length}_files)`);
    }
    let zipName = zipNameParts.join("_") + ".zip";
    const content = await zip.generateAsync({ type: "blob" });
    const reader = new FileReader();
    reader.onloadend = function() {
      if (cancelRequested) {
        if (tabId)
          chrome.tabs.sendMessage(tabId, { type: "fetch-cancelled" });
        return;
      }
      const dataUrl = reader.result;
      chrome.downloads.download({
        url: dataUrl,
        filename: zipName,
        saveAs: true
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Download failed:", chrome.runtime.lastError);
        } else {
          console.log("Download started, id:", downloadId);
        }
        if (tabId) {
          chrome.tabs.sendMessage(tabId, { type: "fetch-complete" });
        }
      });
    };
    reader.readAsDataURL(content);
    return "done";
  }
})();
