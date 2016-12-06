// ==UserScript==
// @id             reswueKC
// @name           IITC plugin: ResWueKC
// @category       Layer
// @version        1.49.1.20160817161349
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://ops.irde.net/iitc/reswue.meta.js
// @downloadURL    https://ops.irde.net/iitc/reswue.user.js
// @description    [reswue-2016-08-17-161349] Simulates the planned operation links
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==
function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function') window.plugin = function() {};

    ! function(b) {
        function c() {
            return "Markdown.mk_block( " + uneval(this.toString()) + ", " + uneval(this.trailing) + ", " + uneval(this.lineNumber) + " )"
        }

        function d() {
            var a = require("util");
            return "Markdown.mk_block( " + a.inspect(this.toString()) + ", " + a.inspect(this.trailing) + ", " + a.inspect(this.lineNumber) + " )"
        }

        function e(a) {
            for (var b = 0, c = -1; - 1 !== (c = a.indexOf("\n", c + 1));) b++;
            return b
        }

        function f(a, b) {
            function c(a) {
                this.len_after = a, this.name = "close_" + b
            }
            var d = a + "_state",
                e = "strong" == a ? "em_state" : "strong_state";
            return function(f, g) {
                if (this[d][0] == b) return this[d].shift(), [f.length, new c(f.length - b.length)];
                var h = this[e].slice(),
                    i = this[d].slice();
                this[d].unshift(b); {
                    var j = this.processInline(f.substr(b.length)),
                        k = j[j.length - 1];
                    this[d].shift()
                }
                if (k instanceof c) {
                    j.pop();
                    var l = f.length - k.len_after;
                    return [l, [a].concat(j)]
                }
                return this[e] = h, this[d] = i, [b.length, b]
            }
        }

        function g(a) {
            for (var b = a.split(""), c = [""], d = !1; b.length;) {
                var e = b.shift();
                switch (e) {
                    case " ":
                        d ? c[c.length - 1] += e : c.push("");
                        break;
                    case "'":
                    case '"':
                        d = !d;
                        break;
                    case "\\":
                        e = b.shift();
                    default:
                        c[c.length - 1] += e
                }
            }
            return c
        }

        function h(a) {
            return q(a) && a.length > 1 && "object" == typeof a[1] && !q(a[1]) ? a[1] : void 0
        }

        function i(a) {
            return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        }

        function j(a) {
            if ("string" == typeof a) return i(a);
            var b = a.shift(),
                c = {},
                d = [];
            for (!a.length || "object" != typeof a[0] || a[0] instanceof Array || (c = a.shift()); a.length;) d.push(j(a.shift()));
            var e = "";
            for (var f in c) e += " " + f + '="' + i(c[f]) + '"';
            return "img" == b || "br" == b || "hr" == b ? "<" + b + e + "/>" : "<" + b + e + ">" + d.join("") + "</" + b + ">"
        }

        function k(a, b, c) {
            var d;
            c = c || {};
            var e = a.slice(0);
            "function" == typeof c.preprocessTreeNode && (e = c.preprocessTreeNode(e, b));
            var f = h(e);
            if (f) {
                e[1] = {};
                for (d in f) e[1][d] = f[d];
                f = e[1]
            }
            if ("string" == typeof e) return e;
            switch (e[0]) {
                case "header":
                    e[0] = "h" + e[1].level, delete e[1].level;
                    break;
                case "bulletlist":
                    e[0] = "ul";
                    break;
                case "numberlist":
                    e[0] = "ol";
                    break;
                case "listitem":
                    e[0] = "li";
                    break;
                case "para":
                    e[0] = "p";
                    break;
                case "markdown":
                    e[0] = "html", f && delete f.references;
                    break;
                case "code_block":
                    e[0] = "pre", d = f ? 2 : 1;
                    var g = ["code"];
                    g.push.apply(g, e.splice(d, e.length - d)), e[d] = g;
                    break;
                case "inlinecode":
                    e[0] = "code";
                    break;
                case "img":
                    e[1].src = e[1].href, delete e[1].href;
                    break;
                case "linebreak":
                    e[0] = "br";
                    break;
                case "link":
                    e[0] = "a";
                    break;
                case "link_ref":
                    e[0] = "a";
                    var i = b[f.ref];
                    if (!i) return f.original;
                    delete f.ref, f.href = i.href, i.title && (f.title = i.title), delete f.original;
                    break;
                case "img_ref":
                    e[0] = "img";
                    var i = b[f.ref];
                    if (!i) return f.original;
                    delete f.ref, f.src = i.href, i.title && (f.title = i.title), delete f.original
            }
            if (d = 1, f) {
                for (var j in e[1]) {
                    d = 2;
                    break
                }
                1 === d && e.splice(d, 1)
            }
            for (; d < e.length; ++d) e[d] = k(e[d], b, c);
            return e
        }

        function l(a) {
            for (var b = h(a) ? 2 : 1; b < a.length;) "string" == typeof a[b] ? b + 1 < a.length && "string" == typeof a[b + 1] ? a[b] += a.splice(b + 1, 1)[0] : ++b : (l(a[b]), ++b)
        }
        var m = b.Markdown = function(a) {
            switch (typeof a) {
                case "undefined":
                    this.dialect = m.dialects.Gruber;
                    break;
                case "object":
                    this.dialect = a;
                    break;
                default:
                    if (!(a in m.dialects)) throw new Error("Unknown Markdown dialect '" + String(a) + "'");
                    this.dialect = m.dialects[a]
            }
            this.em_state = [], this.strong_state = [], this.debug_indent = ""
        };
        b.parse = function(a, b) {
            var c = new m(b);
            return c.toTree(a)
        }, b.toHTML = function(a, c, d) {
            var e = b.toHTMLTree(a, c, d);
            return b.renderJsonML(e)
        }, b.toHTMLTree = function(a, b, c) {
            "string" == typeof a && (a = this.parse(a, b));
            var d = h(a),
                e = {};
            d && d.references && (e = d.references);
            var f = k(a, e, c);
            return l(f), f
        };
        var n = m.mk_block = function(a, b, e) {
            1 == arguments.length && (b = "\n\n");
            var f = new String(a);
            return f.trailing = b, f.inspect = d, f.toSource = c, void 0 != e && (f.lineNumber = e), f
        };
        m.prototype.split_blocks = function(a, b) {
            a = a.replace(/(\r\n|\n|\r)/g, "\n");
            var c, d = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
                f = [],
                g = 1;
            for (null != (c = /^(\s*\n)/.exec(a)) && (g += e(c[0]), d.lastIndex = c[0].length); null !== (c = d.exec(a));) "\n#" == c[2] && (c[2] = "\n", d.lastIndex--), f.push(n(c[1], c[2], g)), g += e(c[0]);
            return f
        }, m.prototype.processBlock = function(a, b) {
            var c = this.dialect.block,
                d = c.__order__;
            if ("__call__" in c) return c.__call__.call(this, a, b);
            for (var e = 0; e < d.length; e++) {
                var f = c[d[e]].call(this, a, b);
                if (f) return (!q(f) || f.length > 0 && !q(f[0])) && this.debug(d[e], "didn't return a proper array"), f
            }
            return []
        }, m.prototype.processInline = function(a) {
            return this.dialect.inline.__call__.call(this, String(a))
        }, m.prototype.toTree = function(a, b) {
            var c = a instanceof Array ? a : this.split_blocks(a),
                d = this.tree;
            try {
                for (this.tree = b || this.tree || ["markdown"]; c.length;) {
                    var e = this.processBlock(c.shift(), c);
                    e.length && this.tree.push.apply(this.tree, e)
                }
                return this.tree
            } finally {
                b && (this.tree = d)
            }
        }, m.prototype.debug = function() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(this.debug_indent), "undefined" != typeof print && print.apply(print, a), "undefined" != typeof console && "undefined" != typeof console.log && console.log.apply(null, a)
        }, m.prototype.loop_re_over_block = function(a, b, c) {
            for (var d, e = b.valueOf(); e.length && null != (d = a.exec(e));) e = e.substr(d[0].length), c.call(this, d);
            return e
        }, m.dialects = {}, m.dialects.Gruber = {
            block: {
                atxHeader: function(a, b) {
                    var c = a.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);
                    if (!c) return void 0;
                    var d = ["header", {
                        level: c[1].length
                    }];
                    return Array.prototype.push.apply(d, this.processInline(c[2])), c[0].length < a.length && b.unshift(n(a.substr(c[0].length), a.trailing, a.lineNumber + 2)), [d]
                },
                setextHeader: function(a, b) {
                    var c = a.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);
                    if (!c) return void 0;
                    var d = "=" === c[2] ? 1 : 2,
                        e = ["header", {
                            level: d
                        }, c[1]];
                    return c[0].length < a.length && b.unshift(n(a.substr(c[0].length), a.trailing, a.lineNumber + 2)), [e]
                },
                code: function(a, b) {
                    var c = [],
                        d = /^(?: {0,3}\t| {4})(.*)\n?/;
                    if (!a.match(d)) return void 0;
                    a: for (;;) {
                        var e = this.loop_re_over_block(d, a.valueOf(), function(a) {
                            c.push(a[1])
                        });
                        if (e.length) {
                            b.unshift(n(e, a.trailing));
                            break a
                        }
                        if (!b.length) break a;
                        if (!b[0].match(d)) break a;
                        c.push(a.trailing.replace(/[^\n]/g, "").substring(2)), a = b.shift()
                    }
                    return [
                        ["code_block", c.join("\n")]
                    ]
                },
                horizRule: function(a, b) {
                    var c = a.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);
                    if (!c) return void 0;
                    var d = [
                        ["hr"]
                    ];
                    return c[1] && d.unshift.apply(d, this.processBlock(c[1], [])), c[3] && b.unshift(n(c[3])), d
                },
                lists: function() {
                    function a(a) {
                        return new RegExp("(?:^(" + i + "{0," + a + "} {0,3})(" + f + ")\\s+)|(^" + i + "{0," + (a - 1) + "}[ ]{0,4})")
                    }

                    function b(a) {
                        return a.replace(/ {0,3}\t/g, "    ")
                    }

                    function c(a, b, c, d) {
                        if (b) return void a.push(["para"].concat(c));
                        var e = a[a.length - 1] instanceof Array && "para" == a[a.length - 1][0] ? a[a.length - 1] : a;
                        d && a.length > 1 && c.unshift(d);
                        for (var f = 0; f < c.length; f++) {
                            var g = c[f],
                                h = "string" == typeof g;
                            h && e.length > 1 && "string" == typeof e[e.length - 1] ? e[e.length - 1] += g : e.push(g)
                        }
                    }

                    function d(a, b) {
                        for (var c = new RegExp("^(" + i + "{" + a + "}.*?\\n?)*$"), d = new RegExp("^" + i + "{" + a + "}", "gm"), e = []; b.length > 0 && c.exec(b[0]);) {
                            var f = b.shift(),
                                g = f.replace(d, "");
                            e.push(n(g, f.trailing, f.lineNumber))
                        }
                        return e
                    }

                    function e(a, b, c) {
                        var d = a.list,
                            e = d[d.length - 1];
                        if (!(e[1] instanceof Array && "para" == e[1][0]))
                            if (b + 1 == c.length) e.push(["para"].concat(e.splice(1, e.length - 1)));
                            else {
                                var f = e.pop();
                                e.push(["para"].concat(e.splice(1, e.length - 1)), f)
                            }
                    }
                    var f = "[*+-]|\\d+\\.",
                        g = /[*+-]/,
                        h = new RegExp("^( {0,3})(" + f + ")[ 	]+"),
                        i = "(?: {0,3}\\t| {4})";
                    return function(f, i) {
                        function j(a) {
                            var b = g.exec(a[2]) ? ["bulletlist"] : ["numberlist"];
                            return n.push({
                                list: b,
                                indent: a[1]
                            }), b
                        }
                        var k = f.match(h);
                        if (!k) return void 0;
                        for (var l, m, n = [], p = j(k), q = !1, r = [n[0].list];;) {
                            for (var s = f.split(/(?=\n)/), t = "", u = 0; u < s.length; u++) {
                                var v = "",
                                    w = s[u].replace(/^\n/, function(a) {
                                        return v = a, ""
                                    }),
                                    x = a(n.length);
                                if (k = w.match(x), void 0 !== k[1]) {
                                    t.length && (c(l, q, this.processInline(t), v), q = !1, t = ""), k[1] = b(k[1]);
                                    var y = Math.floor(k[1].length / 4) + 1;
                                    if (y > n.length) p = j(k), l.push(p), l = p[1] = ["listitem"];
                                    else {
                                        var z = !1;
                                        for (m = 0; m < n.length; m++)
                                            if (n[m].indent == k[1]) {
                                                p = n[m].list, n.splice(m + 1, n.length - (m + 1)), z = !0;
                                                break
                                            }
                                        z || (y++, y <= n.length ? (n.splice(y, n.length - y), p = n[y - 1].list) : (p = j(k), l.push(p))), l = ["listitem"], p.push(l)
                                    }
                                    v = ""
                                }
                                w.length > k[0].length && (t += v + w.substr(k[0].length))
                            }
                            t.length && (c(l, q, this.processInline(t), v), q = !1, t = "");
                            var A = d(n.length, i);
                            A.length > 0 && (o(n, e, this), l.push.apply(l, this.toTree(A, [])));
                            var B = i[0] && i[0].valueOf() || "";
                            if (!B.match(h) && !B.match(/^ /)) break;
                            f = i.shift();
                            var C = this.dialect.block.horizRule(f, i);
                            if (C) {
                                r.push.apply(r, C);
                                break
                            }
                            o(n, e, this), q = !0
                        }
                        return r
                    }
                }(),
                blockquote: function(a, b) {
                    if (!a.match(/^>/m)) return void 0;
                    var c = [];
                    if (">" != a[0]) {
                        for (var d = a.split(/\n/), e = [], f = a.lineNumber; d.length && ">" != d[0][0];) e.push(d.shift()), f++;
                        var g = n(e.join("\n"), "\n", a.lineNumber);
                        c.push.apply(c, this.processBlock(g, [])), a = n(d.join("\n"), a.trailing, f)
                    }
                    for (; b.length && ">" == b[0][0];) {
                        var i = b.shift();
                        a = n(a + a.trailing + i, i.trailing, a.lineNumber)
                    }
                    var j = a.replace(/^> ?/gm, ""),
                        k = (this.tree, this.toTree(j, ["blockquote"])),
                        l = h(k);
                    return l && l.references && (delete l.references, r(l) && k.splice(1, 1)), c.push(k), c
                },
                referenceDefn: function(a, b) {
                    var c = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
                    if (!a.match(c)) return void 0;
                    h(this.tree) || this.tree.splice(1, 0, {});
                    var d = h(this.tree);
                    void 0 === d.references && (d.references = {});
                    var e = this.loop_re_over_block(c, a, function(a) {
                        a[2] && "<" == a[2][0] && ">" == a[2][a[2].length - 1] && (a[2] = a[2].substring(1, a[2].length - 1));
                        var b = d.references[a[1].toLowerCase()] = {
                            href: a[2]
                        };
                        void 0 !== a[4] ? b.title = a[4] : void 0 !== a[5] && (b.title = a[5])
                    });
                    return e.length && b.unshift(n(e, a.trailing)), []
                },
                para: function(a, b) {
                    return [
                        ["para"].concat(this.processInline(a))
                    ]
                }
            }
        }, m.dialects.Gruber.inline = {
            __oneElement__: function(a, b, c) {
                var d, e;
                b = b || this.dialect.inline.__patterns__;
                var f = new RegExp("([\\s\\S]*?)(" + (b.source || b) + ")");
                if (d = f.exec(a), !d) return [a.length, a];
                if (d[1]) return [d[1].length, d[1]];
                var e;
                return d[2] in this.dialect.inline && (e = this.dialect.inline[d[2]].call(this, a.substr(d.index), d, c || [])), e = e || [d[2].length, d[2]]
            },
            __call__: function(a, b) {
                function c(a) {
                    "string" == typeof a && "string" == typeof e[e.length - 1] ? e[e.length - 1] += a : e.push(a)
                }
                for (var d, e = []; a.length > 0;) d = this.dialect.inline.__oneElement__.call(this, a, b, e), a = a.substr(d.shift()), o(d, c);
                return e
            },
            "]": function() {},
            "}": function() {},
            __escape__: /^\\[\\`\*_{}\[\]()#\+.!\-]/,
            "\\": function(a) {
                return this.dialect.inline.__escape__.exec(a) ? [2, a.charAt(1)] : [1, "\\"]
            },
            "![": function(a) {
                var b = a.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);
                if (b) {
                    b[2] && "<" == b[2][0] && ">" == b[2][b[2].length - 1] && (b[2] = b[2].substring(1, b[2].length - 1)), b[2] = this.dialect.inline.__call__.call(this, b[2], /\\/)[0];
                    var c = {
                        alt: b[1],
                        href: b[2] || ""
                    };
                    return void 0 !== b[4] && (c.title = b[4]), [b[0].length, ["img", c]]
                }
                return b = a.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/), b ? [b[0].length, ["img_ref", {
                    alt: b[1],
                    ref: b[2].toLowerCase(),
                    original: b[0]
                }]] : [2, "!["]
            },
            "[": function s(a) {
                var b = String(a),
                    c = m.DialectHelpers.inline_until_char.call(this, a.substr(1), "]");
                if (!c) return [1, "["];
                var s, d, e = 1 + c[0],
                    f = c[1];
                a = a.substr(e);
                var g = a.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);
                if (g) {
                    var h = g[1];
                    if (e += g[0].length, h && "<" == h[0] && ">" == h[h.length - 1] && (h = h.substring(1, h.length - 1)), !g[3])
                        for (var i = 1, j = 0; j < h.length; j++) switch (h[j]) {
                            case "(":
                                i++;
                                break;
                            case ")":
                                0 == --i && (e -= h.length - j, h = h.substring(0, j))
                        }
                    return h = this.dialect.inline.__call__.call(this, h, /\\/)[0], d = {
                        href: h || ""
                    }, void 0 !== g[3] && (d.title = g[3]), s = ["link", d].concat(f), [e, s]
                }
                return g = a.match(/^\s*\[(.*?)\]/), g ? (e += g[0].length, d = {
                    ref: (g[1] || String(f)).toLowerCase(),
                    original: b.substr(0, e)
                }, s = ["link_ref", d].concat(f), [e, s]) : 1 == f.length && "string" == typeof f[0] ? (d = {
                    ref: f[0].toLowerCase(),
                    original: b.substr(0, e)
                }, s = ["link_ref", d, f[0]], [e, s]) : [1, "["]
            },
            "<": function(a) {
                var b;
                return null != (b = a.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/)) ? b[3] ? [b[0].length, ["link", {
                    href: "mailto:" + b[3]
                }, b[3]]] : "mailto" == b[2] ? [b[0].length, ["link", {
                    href: b[1]
                }, b[1].substr("mailto:".length)]] : [b[0].length, ["link", {
                    href: b[1]
                }, b[1]]] : [1, "<"]
            },
            "`": function(a) {
                var b = a.match(/(`+)(([\s\S]*?)\1)/);
                return b && b[2] ? [b[1].length + b[2].length, ["inlinecode", b[3]]] : [1, "`"]
            },
            "  \n": function(a) {
                return [3, ["linebreak"]]
            }
        }, m.dialects.Gruber.inline["**"] = f("strong", "**"), m.dialects.Gruber.inline.__ = f("strong", "__"), m.dialects.Gruber.inline["*"] = f("em", "*"), m.dialects.Gruber.inline._ = f("em", "_"), m.buildBlockOrder = function(a) {
            var b = [];
            for (var c in a) "__order__" != c && "__call__" != c && b.push(c);
            a.__order__ = b
        }, m.buildInlinePatterns = function(a) {
            var b = [];
            for (var c in a)
                if (!c.match(/^__.*__$/)) {
                    var d = c.replace(/([\\.*+?|()\[\]{}])/g, "\\$1").replace(/\n/, "\\n");
                    b.push(1 == c.length ? d : "(?:" + d + ")")
                }
            b = b.join("|"), a.__patterns__ = b;
            var e = a.__call__;
            a.__call__ = function(a, c) {
                return void 0 != c ? e.call(this, a, c) : e.call(this, a, b)
            }
        }, m.DialectHelpers = {}, m.DialectHelpers.inline_until_char = function(a, b) {
            for (var c = 0, d = [];;) {
                if (a.charAt(c) == b) return c++, [c, d];
                if (c >= a.length) return null;
                var e = this.dialect.inline.__oneElement__.call(this, a.substr(c));
                c += e[0], d.push.apply(d, e.slice(1))
            }
        }, m.subclassDialect = function(a) {
            function b() {}

            function c() {}
            return b.prototype = a.block, c.prototype = a.inline, {
                block: new b,
                inline: new c
            }
        }, m.buildBlockOrder(m.dialects.Gruber.block), m.buildInlinePatterns(m.dialects.Gruber.inline), m.dialects.Maruku = m.subclassDialect(m.dialects.Gruber), m.dialects.Maruku.processMetaHash = function(a) {
            for (var b = g(a), c = {}, d = 0; d < b.length; ++d)
                if (/^#/.test(b[d])) c.id = b[d].substring(1);
                else if (/^\./.test(b[d])) c["class"] ? c["class"] = c["class"] + b[d].replace(/./, " ") : c["class"] = b[d].substring(1);
            else if (/\=/.test(b[d])) {
                var e = b[d].split(/\=/);
                c[e[0]] = e[1]
            }
            return c
        }, m.dialects.Maruku.block.document_meta = function(a, b) {
            if (a.lineNumber > 1) return void 0;
            if (!a.match(/^(?:\w+:.*\n)*\w+:.*$/)) return void 0;
            h(this.tree) || this.tree.splice(1, 0, {});
            var c = a.split(/\n/);
            for (p in c) {
                var d = c[p].match(/(\w+):\s*(.*)$/),
                    e = d[1].toLowerCase(),
                    f = d[2];
                this.tree[1][e] = f
            }
            return []
        }, m.dialects.Maruku.block.block_meta = function(b, c) {
            var d = b.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);
            if (!d) return void 0;
            var e, f = this.dialect.processMetaHash(d[2]);
            if ("" === d[1]) {
                var g = this.tree[this.tree.length - 1];
                if (e = h(g), "string" == typeof g) return void 0;
                e || (e = {}, g.splice(1, 0, e));
                for (a in f) e[a] = f[a];
                return []
            }
            var i = b.replace(/\n.*$/, ""),
                j = this.processBlock(i, []);
            e = h(j[0]), e || (e = {}, j[0].splice(1, 0, e));
            for (a in f) e[a] = f[a];
            return j
        }, m.dialects.Maruku.block.definition_list = function(a, b) {
            var c, d, e = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
                f = ["dl"];
            if (!(d = a.match(e))) return void 0;
            for (var g = [a]; b.length && e.exec(b[0]);) g.push(b.shift());
            for (var h = 0; h < g.length; ++h) {
                var d = g[h].match(e),
                    i = d[1].replace(/\n$/, "").split(/\n/),
                    j = d[2].split(/\n:\s+/);
                for (c = 0; c < i.length; ++c) f.push(["dt", i[c]]);
                for (c = 0; c < j.length; ++c) f.push(["dd"].concat(this.processInline(j[c].replace(/(\n)\s+/, "$1"))))
            }
            return [f]
        }, m.dialects.Maruku.block.table = function t(a, b) {
            var c, d, e = function(a, b) {
                    b = b || "\\s", b.match(/^[\\|\[\]{}?*.+^$]$/) && (b = "\\" + b);
                    for (var c, d = [], e = new RegExp("^((?:\\\\.|[^\\\\" + b + "])*)" + b + "(.*)"); c = a.match(e);) d.push(c[1]), a = c[2];
                    return d.push(a), d
                },
                f = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
                g = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/;
            if (d = a.match(f)) d[3] = d[3].replace(/^\s*\|/gm, "");
            else if (!(d = a.match(g))) return void 0;
            var t = ["table", ["thead", ["tr"]],
                ["tbody"]
            ];
            d[2] = d[2].replace(/\|\s*$/, "").split("|");
            var h = [];
            for (o(d[2], function(a) {
                    h.push(a.match(/^\s*-+:\s*$/) ? {
                        align: "right"
                    } : a.match(/^\s*:-+\s*$/) ? {
                        align: "left"
                    } : a.match(/^\s*:-+:\s*$/) ? {
                        align: "center"
                    } : {})
                }), d[1] = e(d[1].replace(/\|\s*$/, ""), "|"), c = 0; c < d[1].length; c++) t[1][1].push(["th", h[c] || {}].concat(this.processInline(d[1][c].trim())));
            return o(d[3].replace(/\|\s*$/gm, "").split("\n"), function(a) {
                var b = ["tr"];
                for (a = e(a, "|"), c = 0; c < a.length; c++) b.push(["td", h[c] || {}].concat(this.processInline(a[c].trim())));
                t[2].push(b)
            }, this), [t]
        }, m.dialects.Maruku.inline["{:"] = function(a, b, c) {
            if (!c.length) return [2, "{:"];
            var d = c[c.length - 1];
            if ("string" == typeof d) return [2, "{:"];
            var e = a.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);
            if (!e) return [2, "{:"];
            var f = this.dialect.processMetaHash(e[1]),
                g = h(d);
            g || (g = {}, d.splice(1, 0, g));
            for (var i in f) g[i] = f[i];
            return [e[0].length, ""]
        }, m.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/, m.buildBlockOrder(m.dialects.Maruku.block), m.buildInlinePatterns(m.dialects.Maruku.inline);
        var o, q = Array.isArray || function(a) {
            return "[object Array]" == Object.prototype.toString.call(a)
        };
        o = Array.prototype.forEach ? function(a, b, c) {
            return a.forEach(b, c)
        } : function(a, b, c) {
            for (var d = 0; d < a.length; d++) b.call(c || a, a[d], d, a)
        };
        var r = function(a) {
            for (var b in a)
                if (hasOwnProperty.call(a, b)) return !1;
            return !0
        };
        b.renderJsonML = function(a, b) {
            b = b || {}, b.root = b.root || !1;
            var c = [];
            if (b.root) c.push(j(a));
            else
                for (a.shift(), !a.length || "object" != typeof a[0] || a[0] instanceof Array || a.shift(); a.length;) c.push(j(a.shift()));
            return c.join("\n\n")
        }
    }(function() {
        return "undefined" == typeof exports ? (window.markdown = {}, window.markdown) : exports
    }());
    ! function(a) {
        function b(b) {
            var d = this;
            b = String(b);
            var e = "$BroadcastChannel$" + b + "$";
            return c[e] = c[e] || [], c[e].push(this), this._name = b, this._id = e, this._closed = !1, "function" != typeof MessageChannel ? void(this._mc = {
                port1: document.createElement("span")
            }) : (this._mc = new MessageChannel, this._mc.port1.start(), this._mc.port2.start(), void a.addEventListener("storage", function(b) {
                if (b.storageArea === a.localStorage && null !== b.newValue && b.key.substring(0, e.length) === e) {
                    var c = JSON.parse(b.newValue);
                    d._mc.port2.postMessage(c)
                }
            }))
        }
        var c = [];
        b.prototype = {get name() {
                return this._name
            },
            postMessage: function(b) {
                var d = this;
                if (this._closed) {
                    var e = new Error;
                    throw e.name = "InvalidStateError", e
                }
                var f = JSON.stringify(b),
                    g = this._id + String(Date.now()) + "$" + String(Math.random());
                a.localStorage.setItem(g, f), setTimeout(function() {
                    a.localStorage.removeItem(g)
                }, 500), c[this._id].forEach(function(a) {
                    a !== d && a._mc.port2.postMessage(JSON.parse(f))
                })
            },
            close: function() {
                if (!this._closed) {
                    this._closed = !0, this._mc.port1.close(), this._mc.port2.close();
                    var a = c[this._id].indexOf(this); - 1 != a && c[this._id].splice(a, 1)
                }
            },
            get onmessage() {
                return this._mc.port1.onmessage
            },
            set onmessage(a) {
                this._mc.port1.onmessage = a
            },
            addEventListener: function(a, b) {
                return this._mc.port1.addEventListener.apply(this._mc.port1, arguments)
            },
            removeEventListener: function(a, b) {
                return this._mc.port1.removeEventListener.apply(this._mc.port1, arguments)
            },
            dispatchEvent: function(a) {
                return this._mc.port1.dispatchEvent.apply(this._mc.port1, arguments)
            }
        }, a.BroadcastChannel = a.BroadcastChannel || b
    }(self);
    if (window.Promise === undefined) { // polyfill has a bug ;)

        /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
         * @version   3.0.2
         */

        (function() {
            "use strict";

            function lib$es6$promise$utils$$objectOrFunction(x) {
                return typeof x === "function" || typeof x === "object" && x !== null
            }

            function lib$es6$promise$utils$$isFunction(x) {
                return typeof x === "function"
            }

            function lib$es6$promise$utils$$isMaybeThenable(x) {
                return typeof x === "object" && x !== null
            }
            var lib$es6$promise$utils$$_isArray;
            if (!Array.isArray) {
                lib$es6$promise$utils$$_isArray = function(x) {
                    return Object.prototype.toString.call(x) === "[object Array]"
                }
            } else {
                lib$es6$promise$utils$$_isArray = Array.isArray
            }
            var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
            var lib$es6$promise$asap$$len = 0;
            var lib$es6$promise$asap$$toString = {}.toString;
            var lib$es6$promise$asap$$vertxNext;
            var lib$es6$promise$asap$$customSchedulerFn;
            var lib$es6$promise$asap$$asap = function asap(callback, arg) {
                lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
                lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
                lib$es6$promise$asap$$len += 2;
                if (lib$es6$promise$asap$$len === 2) {
                    if (lib$es6$promise$asap$$customSchedulerFn) {
                        lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush)
                    } else {
                        lib$es6$promise$asap$$scheduleFlush()
                    }
                }
            };

            function lib$es6$promise$asap$$setScheduler(scheduleFn) {
                lib$es6$promise$asap$$customSchedulerFn = scheduleFn
            }

            function lib$es6$promise$asap$$setAsap(asapFn) {
                lib$es6$promise$asap$$asap = asapFn
            }
            var lib$es6$promise$asap$$browserWindow = typeof window !== "undefined" ? window : undefined;
            var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
            var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
            var lib$es6$promise$asap$$isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]";
            var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";

            function lib$es6$promise$asap$$useNextTick() {
                return function() {
                    process.nextTick(lib$es6$promise$asap$$flush)
                }
            }

            function lib$es6$promise$asap$$useVertxTimer() {
                return function() {
                    lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush)
                }
            }

            function lib$es6$promise$asap$$useMutationObserver() {
                var iterations = 0;
                var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
                var node = document.createTextNode("");
                observer.observe(node, {
                    characterData: true
                });
                return function() {
                    node.data = iterations = ++iterations % 2
                }
            }

            function lib$es6$promise$asap$$useMessageChannel() {
                var channel = new MessageChannel;
                channel.port1.onmessage = lib$es6$promise$asap$$flush;
                return function() {
                    channel.port2.postMessage(0)
                }
            }

            function lib$es6$promise$asap$$useSetTimeout() {
                return function() {
                    setTimeout(lib$es6$promise$asap$$flush, 1)
                }
            }
            var lib$es6$promise$asap$$queue = new Array(1e3);

            function lib$es6$promise$asap$$flush() {
                for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
                    var callback = lib$es6$promise$asap$$queue[i];
                    var arg = lib$es6$promise$asap$$queue[i + 1];
                    callback(arg);
                    lib$es6$promise$asap$$queue[i] = undefined;
                    lib$es6$promise$asap$$queue[i + 1] = undefined
                }
                lib$es6$promise$asap$$len = 0
            }

            function lib$es6$promise$asap$$attemptVertx() {
                try {
                    var r = require;
                    var vertx = r("vertx");
                    lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
                    return lib$es6$promise$asap$$useVertxTimer()
                } catch (e) {
                    return lib$es6$promise$asap$$useSetTimeout()
                }
            }
            var lib$es6$promise$asap$$scheduleFlush;
            if (lib$es6$promise$asap$$isNode) {
                lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick()
            } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
                lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver()
            } else if (lib$es6$promise$asap$$isWorker) {
                lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel()
            } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === "function") {
                lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx()
            } else {
                lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout()
            }

            function lib$es6$promise$$internal$$noop() {}
            var lib$es6$promise$$internal$$PENDING = void 0;
            var lib$es6$promise$$internal$$FULFILLED = 1;
            var lib$es6$promise$$internal$$REJECTED = 2;
            var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject;

            function lib$es6$promise$$internal$$selfFulfillment() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function lib$es6$promise$$internal$$cannotReturnOwn() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function lib$es6$promise$$internal$$getThen(promise) {
                try {
                    return promise.then
                } catch (error) {
                    lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
                    return lib$es6$promise$$internal$$GET_THEN_ERROR
                }
            }

            function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                try {
                    then.call(value, fulfillmentHandler, rejectionHandler)
                } catch (e) {
                    return e
                }
            }

            function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
                lib$es6$promise$asap$$asap(function(promise) {
                    var sealed = false;
                    var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
                        if (sealed) {
                            return
                        }
                        sealed = true;
                        if (thenable !== value) {
                            lib$es6$promise$$internal$$resolve(promise, value)
                        } else {
                            lib$es6$promise$$internal$$fulfill(promise, value)
                        }
                    }, function(reason) {
                        if (sealed) {
                            return
                        }
                        sealed = true;
                        lib$es6$promise$$internal$$reject(promise, reason)
                    }, "Settle: " + (promise._label || " unknown promise"));
                    if (!sealed && error) {
                        sealed = true;
                        lib$es6$promise$$internal$$reject(promise, error)
                    }
                }, promise)
            }

            function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
                if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
                    lib$es6$promise$$internal$$fulfill(promise, thenable._result)
                } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
                    lib$es6$promise$$internal$$reject(promise, thenable._result)
                } else {
                    lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
                        lib$es6$promise$$internal$$resolve(promise, value)
                    }, function(reason) {
                        lib$es6$promise$$internal$$reject(promise, reason)
                    })
                }
            }

            function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
                if (maybeThenable.constructor === promise.constructor) {
                    lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable)
                } else {
                    var then = lib$es6$promise$$internal$$getThen(maybeThenable);
                    if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
                        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error)
                    } else if (then === undefined) {
                        lib$es6$promise$$internal$$fulfill(promise, maybeThenable)
                    } else if (lib$es6$promise$utils$$isFunction(then)) {
                        lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then)
                    } else {
                        lib$es6$promise$$internal$$fulfill(promise, maybeThenable)
                    }
                }
            }

            function lib$es6$promise$$internal$$resolve(promise, value) {
                if (promise === value) {
                    lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment())
                } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
                    lib$es6$promise$$internal$$handleMaybeThenable(promise, value)
                } else {
                    lib$es6$promise$$internal$$fulfill(promise, value)
                }
            }

            function lib$es6$promise$$internal$$publishRejection(promise) {
                if (promise._onerror) {
                    promise._onerror(promise._result)
                }
                lib$es6$promise$$internal$$publish(promise)
            }

            function lib$es6$promise$$internal$$fulfill(promise, value) {
                if (promise._state !== lib$es6$promise$$internal$$PENDING) {
                    return
                }
                promise._result = value;
                promise._state = lib$es6$promise$$internal$$FULFILLED;
                if (promise._subscribers.length !== 0) {
                    lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise)
                }
            }

            function lib$es6$promise$$internal$$reject(promise, reason) {
                if (promise._state !== lib$es6$promise$$internal$$PENDING) {
                    return
                }
                promise._state = lib$es6$promise$$internal$$REJECTED;
                promise._result = reason;
                lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise)
            }

            function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
                var subscribers = parent._subscribers;
                var length = subscribers.length;
                parent._onerror = null;
                subscribers[length] = child;
                subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
                subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;
                if (length === 0 && parent._state) {
                    lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent)
                }
            }

            function lib$es6$promise$$internal$$publish(promise) {
                var subscribers = promise._subscribers;
                var settled = promise._state;
                if (subscribers.length === 0) {
                    return
                }
                var child, callback, detail = promise._result;
                for (var i = 0; i < subscribers.length; i += 3) {
                    child = subscribers[i];
                    callback = subscribers[i + settled];
                    if (child) {
                        lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail)
                    } else {
                        callback(detail)
                    }
                }
                promise._subscribers.length = 0
            }

            function lib$es6$promise$$internal$$ErrorObject() {
                this.error = null
            }
            var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject;

            function lib$es6$promise$$internal$$tryCatch(callback, detail) {
                try {
                    return callback(detail)
                } catch (e) {
                    lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
                    return lib$es6$promise$$internal$$TRY_CATCH_ERROR
                }
            }

            function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
                var hasCallback = lib$es6$promise$utils$$isFunction(callback),
                    value, error, succeeded, failed;
                if (hasCallback) {
                    value = lib$es6$promise$$internal$$tryCatch(callback, detail);
                    if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
                        failed = true;
                        error = value.error;
                        value = null
                    } else {
                        succeeded = true
                    }
                    if (promise === value) {
                        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
                        return
                    }
                } else {
                    value = detail;
                    succeeded = true
                }
                if (promise._state !== lib$es6$promise$$internal$$PENDING) {} else if (hasCallback && succeeded) {
                    lib$es6$promise$$internal$$resolve(promise, value)
                } else if (failed) {
                    lib$es6$promise$$internal$$reject(promise, error)
                } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
                    lib$es6$promise$$internal$$fulfill(promise, value)
                } else if (settled === lib$es6$promise$$internal$$REJECTED) {
                    lib$es6$promise$$internal$$reject(promise, value)
                }
            }

            function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
                try {
                    resolver(function resolvePromise(value) {
                        lib$es6$promise$$internal$$resolve(promise, value)
                    }, function rejectPromise(reason) {
                        lib$es6$promise$$internal$$reject(promise, reason)
                    })
                } catch (e) {
                    lib$es6$promise$$internal$$reject(promise, e)
                }
            }

            function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
                var enumerator = this;
                enumerator._instanceConstructor = Constructor;
                enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
                if (enumerator._validateInput(input)) {
                    enumerator._input = input;
                    enumerator.length = input.length;
                    enumerator._remaining = input.length;
                    enumerator._init();
                    if (enumerator.length === 0) {
                        lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result)
                    } else {
                        enumerator.length = enumerator.length || 0;
                        enumerator._enumerate();
                        if (enumerator._remaining === 0) {
                            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result)
                        }
                    }
                } else {
                    lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError())
                }
            }
            lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
                return lib$es6$promise$utils$$isArray(input)
            };
            lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            };
            lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
                this._result = new Array(this.length)
            };
            var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
            lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
                var enumerator = this;
                var length = enumerator.length;
                var promise = enumerator.promise;
                var input = enumerator._input;
                for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
                    enumerator._eachEntry(input[i], i)
                }
            };
            lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
                var enumerator = this;
                var c = enumerator._instanceConstructor;
                if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
                    if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
                        entry._onerror = null;
                        enumerator._settledAt(entry._state, i, entry._result)
                    } else {
                        enumerator._willSettleAt(c.resolve(entry), i)
                    }
                } else {
                    enumerator._remaining--;
                    enumerator._result[i] = entry
                }
            };
            lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
                var enumerator = this;
                var promise = enumerator.promise;
                if (promise._state === lib$es6$promise$$internal$$PENDING) {
                    enumerator._remaining--;
                    if (state === lib$es6$promise$$internal$$REJECTED) {
                        lib$es6$promise$$internal$$reject(promise, value)
                    } else {
                        enumerator._result[i] = value
                    }
                }
                if (enumerator._remaining === 0) {
                    lib$es6$promise$$internal$$fulfill(promise, enumerator._result)
                }
            };
            lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
                var enumerator = this;
                lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
                    enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value)
                }, function(reason) {
                    enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason)
                })
            };

            function lib$es6$promise$promise$all$$all(entries) {
                return new lib$es6$promise$enumerator$$default(this, entries).promise
            }
            var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;

            function lib$es6$promise$promise$race$$race(entries) {
                var Constructor = this;
                var promise = new Constructor(lib$es6$promise$$internal$$noop);
                if (!lib$es6$promise$utils$$isArray(entries)) {
                    lib$es6$promise$$internal$$reject(promise, new TypeError("You must pass an array to race."));
                    return promise
                }
                var length = entries.length;

                function onFulfillment(value) {
                    lib$es6$promise$$internal$$resolve(promise, value)
                }

                function onRejection(reason) {
                    lib$es6$promise$$internal$$reject(promise, reason)
                }
                for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
                    lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection)
                }
                return promise
            }
            var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;

            function lib$es6$promise$promise$resolve$$resolve(object) {
                var Constructor = this;
                if (object && typeof object === "object" && object.constructor === Constructor) {
                    return object
                }
                var promise = new Constructor(lib$es6$promise$$internal$$noop);
                lib$es6$promise$$internal$$resolve(promise, object);
                return promise
            }
            var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;

            function lib$es6$promise$promise$reject$$reject(reason) {
                var Constructor = this;
                var promise = new Constructor(lib$es6$promise$$internal$$noop);
                lib$es6$promise$$internal$$reject(promise, reason);
                return promise
            }
            var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
            var lib$es6$promise$promise$$counter = 0;

            function lib$es6$promise$promise$$needsResolver() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function lib$es6$promise$promise$$needsNew() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }
            var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;

            function lib$es6$promise$promise$$Promise(resolver) {
                this._id = lib$es6$promise$promise$$counter++;
                this._state = undefined;
                this._result = undefined;
                this._subscribers = [];
                if (lib$es6$promise$$internal$$noop !== resolver) {
                    if (!lib$es6$promise$utils$$isFunction(resolver)) {
                        lib$es6$promise$promise$$needsResolver()
                    }
                    if (!(this instanceof lib$es6$promise$promise$$Promise)) {
                        lib$es6$promise$promise$$needsNew()
                    }
                    lib$es6$promise$$internal$$initializePromise(this, resolver)
                }
            }
            lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
            lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
            lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
            lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
            lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
            lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
            lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
            lib$es6$promise$promise$$Promise.prototype = {
                constructor: lib$es6$promise$promise$$Promise,
                then: function(onFulfillment, onRejection) {
                    var parent = this;
                    var state = parent._state;
                    if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
                        return this
                    }
                    var child = new this.constructor(lib$es6$promise$$internal$$noop);
                    var result = parent._result;
                    if (state) {
                        var callback = arguments[state - 1];
                        lib$es6$promise$asap$$asap(function() {
                            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result)
                        })
                    } else {
                        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection)
                    }
                    return child
                },
                "catch": function(onRejection) {
                    return this.then(null, onRejection)
                }
            };

            function lib$es6$promise$polyfill$$polyfill() {
                var local;
                if (typeof global !== "undefined") {
                    local = global
                } else if (typeof self !== "undefined") {
                    local = self
                } else {
                    try {
                        local = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                }
                var P = local.Promise;
                if (P && Object.prototype.toString.call(P.resolve()) === "[object Promise]" && !P.cast) {
                    return
                }
                local.Promise = lib$es6$promise$promise$$default
            }
            var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
            var lib$es6$promise$umd$$ES6Promise = {
                Promise: lib$es6$promise$promise$$default,
                polyfill: lib$es6$promise$polyfill$$default
            };
            if (typeof define === "function" && define["amd"]) {
                define(function() {
                    return lib$es6$promise$umd$$ES6Promise
                })
            } else if (typeof module !== "undefined" && module["exports"]) {
                module["exports"] = lib$es6$promise$umd$$ES6Promise
            } else if (typeof this !== "undefined") {
                this["ES6Promise"] = lib$es6$promise$umd$$ES6Promise
            }
            lib$es6$promise$polyfill$$default()
        }).call(this);
    }

    /**
     * Promise.prototype.finally
     *
     * Pulled from https://github.com/domenic/promises-unwrapping/issues/18#issuecomment-57801572
     * @author @stefanpenner, @matthew-andrews
     */

    (function() {
        // Get a handle on the global object
        var local;
        if (typeof global !== 'undefined') local = global;
        else if (typeof window !== 'undefined' && window.document) local = window;
        else local = self;

        // It's replaced unconditionally to preserve the expected behavior
        // in programs even if there's ever a native finally.
        local.Promise.prototype['finally'] = function finallyPolyfill(callback) {
            var constructor = this.constructor;

            return this.then(function(value) {
                return constructor.resolve(callback()).then(function() {
                    return value;
                });
            }, function(reason) {
                return constructor.resolve(callback()).then(function() {
                    throw reason;
                });
            });
        };
    }());

    var ResWue;
    ! function(a) {
        var b;
        ! function(a) {
            a.marker_alert_decay = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABmJLR0QAiQAgAMN/lbx2AAAACXBIWXMAAAhUAAAIVAGeUdvKAAAAB3RJTUUH4AEFEjQsRn6AqgAABH9JREFUWMO1ls9uGlcUxn/3zh1ggBj8R06UWGmxHCuq0jiVkifIIi+QdRV5aWXRV8iyqyyy6ZK3yLKtWrUL6koxlrGS2MDCHgE1OGYCMzAztxtDzb8UJ+ZILDj36n73fN853x3x6tUrCcR9308opQyuKHzfDyzLcrrdblu5rptwHCcLfAeYw5ullFiWJaWUAtAXDsHzvDAMw7EgQoh/lFI/uK77t1JKxYH1MAwzYzZy/fp1Hj9+TCqVwvd9hBAEQcC7d+/I5XI0m82xIFLKtNb6W8uyCgqQ57+RME2T1dVV1tbWBvKtVot2u0273f4UY4bW2tJaS6mU0hdpuBjJZJLV1dWBXBiG2LZNuVzG9/2p9OlVoMdpcePGDVZWVgbynudxdHTEycnJ1E0gJwkXiURYW1sjGo32c1prTk9PKZfLeJ43PcgkuhYWFshkMsNtiW3b2LZ9qXYeS5eUkkwmw+Li4sBmx3EolUo4jnM5kE6nM5JMJBLcuXNnIBcEAbVajePj4/5FhBBIKf8XRI2r5ObNm9y6dWukq8IwZHl5mfn5eQzDQErJx48fsW0b13UngwxropRifX19QHAAwzBYWVnpUyilxPd9CoUCtVptqkoGBB+ejd6hyWSSZDLZz/WaoNVqXU74u3fvjgg+LprNJjs7OxweHjJpDCbSZZompVIJrfVAFalUinQ6DUC32+X9+/cUCoWp5kUNl5rP59nf3+8PX6/bHj16RDqdRmtNpVIhn89Tr9enamF17rb9a9dqtYEqAJaWllBK9Wna3d2lXC5PPScqGo3qs7MzfdE6hu3+2rVrLC0tEYYhh4eH7O/v0+12CcOQVCrFvXv3MAyDvb29sZ6mzg/VE/3aMJifn2dubo5qtcrOzs4ATclkko2NDaLRKLZtU6/XRy4qh+ka96YsLy/T6XR48+YNxWJxoEohBEoplFITp18qpbQehr4QlmWRSqUolUrs7u4SBEF/LRaLEY/H+2CWZWFZFkKIQbrOe1xPeKdJJBIIIcjlcnz48GFg/fbt2zx48IC5uTmklGxsbKC15u3bt3S73f8qOfccPUkP0zQ5ODjg4OBgZL1arVKr1Wi323iex8nJCZVKZWR2VCQS0cDYkdVa4zgOjUZj7FSfnp6yvb2N67qYptnvrmH2FdCRUv4qpYwIIZLDBzUajX4DjAvXddne3gYwgiD4GoiMaAK0FhYWfpRS/uT7vvkF33OLjUYjC3wzMifPnz8PgTPg7NmzZ+JzER4+fFgF/hoLcvFPNpvVnwvy+vXrdr1e/wX4fpLVf3E8efIkjMfjOSllc2Ygm5ubKKUawNHMQLLZrFZKNYUQ+eGH8MpAep/JQojfZgqytbUVxOPx34UQ7ZmB5PN5YrFYTQhxDIQ9d79SkJcvXxKJRJpCiD0g6Ln7lYJks1mdTqdbQog/gC7gz0J4nj596luW9TPgCSG8mYCcm+kxUAHcmYBsbm4SBIEjhPgTqEspA/GJl/ez48WLF2YsFvsqFouJTqdzPBO6isWif//+/aJhGGXLstr/AnwwBhGBAAySAAAAAElFTkSuQmCC", a.marker_alert_destroy = "data:image/png;base64,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", a.marker_alert_farm = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAIVAAACFQBnlHbygAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARCSURBVFiFtZZLbFRlFMd/57uPeTDttDS0tlWUVxkrVSBh4dZoZONjIa5kZUTjyo3r6dbElXFh4gZlR+KCtRoQFUPwlUrbkCKEAMV2prePmbnzuvceFy3NTNqhUzr8Nzf33u98v3vOdx5XxsfHDZCs1Zxdrlu36JBqNSes9brFVKlUtn0/sSv38o2zkUTHRMXpFMSEVn54av8nvu//adt2kARGwniwr1MAAKckPUTRWDK5Z9oARlRMq8VhJYD8EhrqdjmWRpoANbbrOqpo0w6xis8b9gxPuz5D/XUGM8LErM2lhT6uJQ+Atb2js8FHRNYhA6U8Hz81g0XEd/PDVIoWxxfnOXnA58WhOb6/XeBcdQyNue1DSg03fUs5spkb/Hg3xYUgQ5CIr3pWqnMSH4DX9vncnZzhYuyFtiHGcRwlQgFeSdxjuWq4UB9ZBwCkQ7/J6L3DC7jeYvsQAATVUBlLF7nwYA9BMtng3RynM80burYw5nrbgKzFK6gGpJMRcQ3XX/bnZ/lo6Babhb/frbQNsdeuagRqoeHVAY90foKgFvLOsSJ2i0SqavsZZrtuXQVRK+FwNdfFWyMFnt29vKXhnWoSYu1BDEBEBMCV8gD18JHr13U04aHaXoEaAGG1TmbTg3xzfXdbhm8fKnBw5V57ENd1FVj/pEupDF9O9FMqb26gCpevVVCF510PDaMtIXahQJPbYllc7T7MXzeHycg83SZARYkQTqRXODFU5sBehz8ma7x5cJnyjev8kDqCWC3b32p2PQxXo2pdKSZINT2bXFrm76UHvD7o0ddT5f58yLuHl6hMT/FrzxGQzSEmFnMVoa0TXEmmuZzM8PmdQ+Si1YL9LxdyOuNxfGG6pZ2BItAe5KEWe/bwtTfCQL9NGMH8Qsj7mRyjuZlWEGjXk0ZVenr5cPIo4tjUA8VbDvng0H0yCzc3QlzXXW+Q25XV18W5hf2kemPUAwgC+PSlWXqW882QAjTNk+3qVtcw3959Bi+Kky8a8ktKNWheY7Oawo8NAZhM7WWSvWikRF6E1WfhNAwqE4vVFJGtK6oNiREsd2PjtIGaU3J+ipXirkSS2mjaphSrtLvwXOgGGwaDDfiD/w58Vrftr8IgeOz/Lic0fdWu8tnQDUY3QLLZbASsACsi0qJmt9b4+Pi8CczvwAZIU8PRHWh0dLRsVe1LD/eSVpCd6NSpU1HK67lmBVbhkZ7sRCJCLCeLVtW6/8QgqqqO4xQksv5Zw67XXscga/JN3f4ZoPHXt6OQbDYbdufTv5jQlGno7B2FCNDlxXNWzZ4FIjGrIetsuESIx+MFE1hTCKFG2nmIqmpvb69vIuuKGq0DAfgdP3jOnDkTdHndF0WkKkaq0PnsAiBxr3uWgDmIKk8EIiKEoVV06s5vinhV1w07DlFV9bzbxfRy9xcETNc9x5cdDsVNJSJy/vx5MzU1ZQHB/3UN/t91W4cEAAAAAElFTkSuQmCC", a.marker_alert_goto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAIVAAACFQBnlHbygAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARKSURBVFiFtZdNbFRVGIafc+fcOzOdae20FvmTv0ptGkmgLGhMCOCCRMREQ3BHEBdgNFVjjEZDbONGJS4IujAGDBsNEmIIBmGhEQVEA4EoMlU0LREoFPozdqZ3Zu7POS6g2PHecUqdvpubnJzvfe4533e+c6/o7u42gBrHMROW5UaokhzH9J2UlUuOjeWlbccT21qO7hVaL1MYZrUgRSUH9w2sfsm27bNSSq9GaVoarbGFUzG7cNkm7yiWzE8QleLO+GCxrh6lltTUNPUYgIEwjLs1BfjgyHVWbr/A2rd66NzdVzJPQ0QrHQdtGJZlaqG1LmeadxSb3/+DA6eGOHIuw8rtF3jx40sMZj3e3Hf5zrwDp4a42J8P9ZBggyAA8XxN70ABX8EXZ0Y42zvGy4/PAqDoKjI5L2BWEw2vGzl2a2kB7TjYz3uH+tmxaT4bOhqojUfYvGYG99aZdCxOUp+UrGqr49v0KACbVjUxp8EKh5imqbUu5bi+ZkVLkkTMoOAqtjwyg89ODtHaeQ4ZEaSSkvXLU+x5vpljv4wSNQXr2lMIEcpA3nqIO5CBjMvSV37m1Sdmk965lNc/+bNk7wGuZ1x6ruT58fccB197MNx5ggzGgAl5b6iVtC9KMJBx6dzTx6fHB8sGf5ce5evzf00CAiWJNyOCw2+08tTDjRw6PVLR4MuzmcoQy3I1QgRy/1uZcvy3auOVO5EBEHZMegeKFYNb58R5ek1TxXkSQGAEKNczTtmguniEbWvvo3PdTJKxyiuRlmXpkszf1gMzY6EB9QnJ0e2ttMyOVzQfl5HNhh/Gh+bVhAY81l5/VwAYr64QTsfiWhKxYN+MmpPupf9AolFLTzyM40rEDDZ0NAYC9p0c5NLNykVRAoEcIqRBAmxeHawcu6h4YXcfqmzfDoUQXsPAsoUJHl1WHxg/8WuWXYevTR5iWVagQU7Uzi0LaEjKwPjbn1/l2kj5Mi+BZIGwnIyr6R6Tnc8sKLlaAXylKbiT2zODLIiQczJR65en+OGdJTy5ooFZKYv2RQk+eraZhTOik4LIaNTRCFSlifOboux5rnlSpgEI4Nwo1n57w6m3PG0kp+QCaC0izYlrC5KRQuB6lID91eDSd10pP/Q9b8rfXaZvNM6cN7I3GSm0BSBdXV0KGAVGhSh3gVZWd3f3DVfJM0AAUtIj9P9QW1tbftSLHwt7gbtvRGW0ceNGdd6eezqvzOy0QYQQXMnUjthe7Oq0QbTW2jTNbFFZ58eHqg65LTvnR49PK6Srq8u/mJ93wtEyL6YLIoDebOPNnBvvF2gljFs9sbrbJQSxWCxb8K20ENrXSlcforXWqVTKLiC/N4RyAQ/sqieerVu3er323G8EFIUhilD96gLgp6G5/UUlB0AVpgUihMD3I7m8ip7SiOGiZflVh2it9fBwX67PuX8XHj3usGn/1+/ilCWEEPv37zfS6XQE8P4G8uDlVRBMTgcAAAAASUVORK5CYII=", a.marker_alert_link = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAhUAAAIVAGeUdvKAAAAB3RJTUUH4AEFExkigC6ddQAAA/VJREFUWMO1l0tsVGUUx3/fmXvn0Q6ltNhOC/XVR2ilQo0iKomILIyvjYkmJLhhYVyYaOLSlXRj4l7dsdG4Y2+MSMQiASpJEbAPKZB2GIbadjqd573nczGtUDp9DMyc5Obem+/e+/vO/3znnO+az3+wAtQVPepdhwBVsqKHHw2TzntknWyB+lSWE8AA4K71zjpja9ld1+HTbIFhxxHqgB7P5ymqaE6ARqA/EuSqAMtHtS2glgggjutgAVvpFyJBcATyRSj4G3i1dN40pLsVXnha6Y5B2BXic8q5CTg3sbYYjlbgw+Hd8MazSlujwRgDwOPbhe6YEhBlaKw8yHFkc3K9/ozy/j4hGhGshdlFGI8ryTS0boWDvXD5FqRyDynX7g54ay9EI2AtDF9XfroM16aFog9bI8qRl6Ezpvw5udobyRc3CLCrvNYLscbSyxcnlR//EEZulQAA81nh0k1obyz/DdnIk31d8PxSBs0swM8jMDW7+rmJhBByBUFXy7XeEo6GYX+n4C6JenESRm6tlKNvh6IKt+eFxJziOEJvOxQ8AnPZlTEpa307YFd76TqTVy5Ngn0gb5vq4cUuS3xOWczDuwNKZyv8PgZzWVk/8GKgf6cScksPJuaFieRqKc6MCrfnobddaY7C3TScvCBMJPFbGpblCpSXqyGidLfdm/XNGUhny+fBeALGE4IYRa0s1657E07nykvV0gDN0SU3LUzPbZxMy4B1V9e2OmhpKEnSFBVCzv+9gTvzYICwC05AK6pzEnJLcvV3KB8fVt4ZsDgCM2kYjSs5D9J5ZT4DsUbl2Ks+R1+BbfUVlP1lT7aEYWdTKat3tcHobfjuF6GloVRlJ5OwpwO6Y4aQA2fHldlFqQwyNCaEXHh7r3LsoJJYgFQGSjET3twDXa2wmIeTF+Hv+OZb0IrVdeoKxGehvwN62qAnVhqwFnJF5dINYWgcrk5V2CV9XZkn1+LCtWmoC0E0rICgFgqesJgHXytvkU62UCYZDWQKkClUpysvry6lhuYABTGcDjoEgeijbBw8nyfVEiwHyTzWwFdi+NbTivdW91tzMsUJ9elbBfn6iFEgBaSe+8KahyUc6uMOcAHKQO6/GR409mEhn5y22WSKX4EP16pdj2wf7EejYc6LYaFmkAPHwRFmRZiqGWR40FjXYQEYebARVnsPnBHDbzWFfPkefjTMGTFkawY5/w9EgiRFmAZUTAlUVchn30OoFJcrgK+2BpDhQWO3b7EZMQwt/Z15tQg8Hx0yXl2QU0BeDPmaQACCDtNAAsjVBHLgOHhKGjgL/CsG39TCk6PfWDcS5In6ICZXZLomcv01hfdSF9cDAW7Uh8n+B/Bae7g+zl60AAAAAElFTkSuQmCC", a.marker_alert_unknown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAACp0lEQVRYw7WXTUsbURSGn4mTYpogDYY0uyQgXQhZVHQdEXQjggjuFdy4ELop/oaibmOXBUFw5y+wlhYLbWmxknblMkqTkmrUWJuPt5sxmJgxY5x54TAwd+Y+c8575s4dQ5IPeAwEgR7cUw04By5Na/I3wHPAb3ND5Y4xO/0GXgBfTSuLZ0ASd/UESAE/fcB1uK0eIAD4fICsaKuLiwvW1tYYHh6mt7eXaDTK+Pg4m5ubSHKGkxSTdKA2ymazSiQSuvEgTTEzM6NKpSIblSW9lBSzhVSrVSWTycaECwsL2t7e1sbGhoaGhhrnV1ZWHEGeSvreesXx8bEMwxCgTCbTNFYsFhUKhQQolUp1hJjXVWstYywWY2dnh3q9ztjYWNNYOBwmHo+TzWbJ5/MdLTHvGhwdHW3/0lQq5HI5AAYHBztCfHaZ2KlQKLC0tMTJyQkAc3NzjrorKumbOmhra0sDAwNN3TU5OalarWZ3y9VN4x1BpqenG5MHAgEtLy/f1b5NENNpuYrFIgCzs7NkMhkikYiTBbLhiZxASqUSABMTE04AbY3vqGAw2HTsBtIxk3A4DIDf7783xHRarsXFRUZGRpiamrr/eiwpIumT3FdjWXFcrv39fdbX1xsN4Hq5JJFOpzk9PeXw8JDV1VX3jTcMg/n5efr6+kin01150i9pz2tPBNTxUCbwD3gHPAJCD9w4JKx5bkHKwCvgdRd7q5vqt/Zvtz4wpmEYdaAElCQZD4DkgS/tIL6WLlK3AVwCuw9aIB2oDnwGzryEAPwBcp5BrJKdAQetL7jbmZSB915DasAHqwk8gwAUgCOrEeQV5Az4YWXlPsQyvwzsWX9nVa8yqQJvgSsrPIFgefIL+Osl5Bz4CBSBmuEFQZIfiAMGcOQVxLCq1ANU/wNGYf1RfBw/igAAAABJRU5ErkJggg==", a.marker_alert_upgrade = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAITgAACE4BjDEA7AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOQSURBVFiFtddLbFRVGMDx/3fm3Nvpg5QWSwEBQRM1JcQnGmoUJNHE+FiYNOrCx0KrCQtdmRgXMwtdsDK6UKMbYlxoQ1wIxmCNAhoktpKAUBJjU0GofTnoTOe2M/fxuWiRjvNox95+u5l89/zuPd93zrlX0um0AZqKRafZdf0EMUWx6ITFNne6JZ+fsZ7X2Hx2zY79NJrbhMiJC7HJYGr7zOArnuedtNYGTSA3zpimrXEBAM1RdjVRtL2pqeOcAYyImjgBAFESGmkjqDGu6ygqGjeyMCx4gFZEHr1lLfff3F7XgG8cGiaT90uRfJXkJ3aso3fXproAANeWz7x1HEfR0id5pnsDz3ZfWzdQLSyAcrUmL9y3kSfvWh8bMIfkQVrnfxjh8JkpDp+ZqnrBHVta2btnM1IXAiAoQBApFzKzVZO7b1jNi7s21QUAWNf1FUUXu3L3Te289vD1WFMvAfOtENVMenDbNbz+SDnw6cAY+UK4NESovhgfu3Utrz60FSOlwEfHR/ng6O+LAgDWdV1FKiM9d67jpd3la+XDYxf55Mc/lgQA2FwOaFX4zyb/9M4NPHdP6VpR4N1vLvDZyfElA/DvOqHkSZ6/dyNP3V26VlThrf7f+OL0ZF0AgG1ocFXkKrJ3z2Yev72zJClSZd+XI3w99GfNwb46O8V4tlCOwDSyYIMczxZLEoJIefPQMMd+uVwTOHhqgrf7z1OpuBYgWlD4A4NjFPyIlx+4jiBU0p//yonhv2oCBwbHeO9I9U6b665IdGHhD56aYNYPyeR9fjqfrQl8fGKUvoGxmjk2B4iUnyf9i8z/lVgMADDkyrsr7jANDUVFF9lXlhkWKDbq30dX+TnXaNiyjLESU7Zji2+SbiXE21Y4vc+39v0wCP73e5cTmjXTq3bu90l2lSGpVCoCskBWROrfx+cjnU5PmCgcJEEZUnLq6zKiq6trpiEsHKl0A7G91PX09ESdjAxY9XMrhogILd7kZVcLl1YMUVV1HCfnqP/zlb9iR+bDs/jfzQsrg6RSqXB9cez7hAYzLDjSY0UEaI8uTrpaGAUiMXNQvNMlQjKZzNmoOKQioUYaP6Kq2tbW5iVMdFxJ+EAAXuyFp7e3N+hk7FuEghgpQPzdBUB79tKoifxxiGZXBBERwjAx7Yj/gyKZguuGsSOqqpnMyHSHGX+HgHN+xvFEK3/JLStERPr6+szQ0FACCP4BM4yjbDv7K3QAAAAASUVORK5CYII=", a.marker_alert_virus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAhUAAAIVAGeUdvKAAAAB3RJTUUH4AEFEhsoUw983gAABHxJREFUWMO1lktsVFUYx3/n3Hvn3Wmn72kLZXi0aYXiIwo2hSqk1YULIcZgjBhloTEBSVzYEImGkCgLMdEQMcYEF2piIomJugCkUFASMUikQKyEhj6n0/e0nelM773HRWFiaRv6mPkn926+k/PL9zjf94nvnr4tAY8ZV17dLTTSJDOuLFdAGzcn7bieiNreoeHBE8AjgJEuiIY+UOgO7E9E7Su6ZggPUDFlJ0OkUULKHGWzwZWt3ZTAvW9JKltRyory0jmdUTZupZSUulsoQC0VYiUU9UeKKF9bNu+Zex4sGFJcEJzpSZ2HWMSk9mABFY+unBtim4tIptB4+M1ctuypBODxF9ZSWuvhp/1ttByI8NjbeXN6JDXnwsNlKYvWEyNUv5LN1jcqseKKM+92krQnGewdJjFqseVw4awc6YsJV8AoYtvRYtpORtEMgadIY9waxqcF2P5RGV0XY3Q0T6C7ZtaRPjVuLyhUPi3AlsOFtJ8ap2Szh7+ODVL1UjZ1r1cQ67PovRznj+9vpc47pGtxic9zF9H4yQr85QZtJ6OcbwoT67c409SBK6DhK9NnAO6X/qASztbzefbLUm58O0LflUm8hTq3b3am7JG/c6k7VIgyK7nw1T/zl7CY5y369Vye+jDIaEeS0joPEwPJGYD19SGqduXw88vdeEv0WeX9wMTneYrZdrQYZ47kl1e7yX/Iib/UyeidafvGxtWEGn2c2dvLYCxM1+FeLGXNDdEccla4/HoujZ8HuXp8CEeWRm6lk7YrHSl7de0q1u3I4vTebkbNgVR5z5uTyWFrVhVtPVSCsiH4hIfzn7bNuKCmIUTFTj8tTZEU4EGS0z+Z8mTN9gDKhB/2XCc+YJKfW5g6vLFxNaufyeLs/jCR0d4Fdwrp8EllY6cgA9cTOHMktrK49M2/9A1OX1b1ZDnrdmRxrinMUKJvUU1UKqVmJL63pwfdJQmWFaPdHZQ1DSE2vBagpSnCiBlZdKfW7w/XhoYQwU1uag8WMBXLIxm1MTySU2/1LAmQqq574VpfH+Lpj4tofqePa6fbKSkrIa/KSfvZEaLm0JKnpG5bCoWtivKCbD6Qz6/7wlxrbgegq7Obrs7lj2I9GbURSCUk/PZBhJuX7pBu6YZXKAaww/29hPvJiHQg6RDu8w7N7ZBC+JazBU1Yo6ssZTnmgsRyV3qOCE0ctxJqOXtX3lR38kRcjVfPguw6G7KBKBBd790qlkp4b9PXEeBPoHq+LgxA60TLkleji+9H4kMdsXPA7vlWomWr9mCB7c1xXdaFMZYxSE12PZohhoUQ3RmDtE60KN0txnQc1+4fhDLNTyKmCeNCRiEvnlpleXNcF6UQcfW/8ZFWyK0fx3D6Zb8mjB7AFnLam7RCdu5+DsMjxzT0G4Cl7AxAWidalK/UiGnC+B2YAsxMJJ6GY0HT5/c0AwkhSWQEAqC7RY9A9gGTGYHUZNdjTalxDf0SMCQ0YYm7i0Ra9dmaq4bP5yt3ZGnCjNk9GQnXF+F95rrn/e2agzvOHBn/DxoMsgKpcNi5AAAAAElFTkSuQmCC", a.marker_layer_groupa = "data:image/png;base64,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", a.marker_layer_groupb = "data:image/png;base64,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", a.marker_layer_groupc = "data:image/png;base64,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", a.marker_layer_groupd = "data:image/png;base64,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", a.marker_layer_groupe = "data:image/png;base64,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",
                a.marker_layer_groupf = "data:image/png;base64,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", a.marker_layer_main = "data:image/png;base64,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", a.search_agent = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAC91BMVEUAAQAfIB4lJyQkJkISK0klKSsbLUYuLy07LD01NzRJN09BPDs/PUE7P0E4RFpBRUdFR0RCSVA5S2FJSkhKTElNS08uUnY1UnJNT0xPT0ciVopVUE9LUlksWIFOU1U0V3wtW35XUWZGVXEfXZdTVVIvW4QqXJA+WH5PWFQ4W4BTV1oyXYZIWnBRWWsvX5UuYZAlY5dUXFhUW2M8X4MeaKExZJM7ZHw5Y41aXmBcXltgXWErZ5tCYo1lXlhDZYpEZ4w5appDaYcxbKBBapQ9bZ1uZWs4b6oucqw4caZAcKAxdK5ma21dbH5FcZUnd7dUb4Q7c6hqbGlRcYtDc6M2dbc/dLA2d7JRcplGdaVMdKBwbnJhcI0/d6xLd5tvb4RJeKlDeq9TeJhpdIBYeJJqdY1ieZZWfalOgKpZfp5hfZ5of5xbgq58fntZhKlngphzf5dygZNng6SAgn9fiq9niK+DhYJ0h5+BiJB6iZt9iZaHiYZyjaOKjIl6kaGPjZGHj5ZqlLp1lLB/kqp7k7CDkqWVjpqQlJeWlJh3m69+ma+EmK+JmKuXmZabmKmHnq+dm595o8qZnqCDo7+enqibn66ZoLWJpbugop+ZqLuWqcKoqqeercCTr9O1r66nssCwsLqetcewtMOluMSluNG3ura1ur20u9Gnv9Cxvcu9v7yywdWsw+LEwcWyxtLExsOvy+O6yd3Jx8vHycXAzNqw0O260ePNz8vM0dTTz+HN0eHU0tbH197T1dLK1uTL2NnN2tvZ19vd1+Pc2d7W293a3Nna2+Xe3ODQ4Ofg3O7s2uLb3+/e3+nY4eni3+Tr3t7g4t/X4/Hn4eDr4efW5+3n5Onn4/Xh5fXk5uPk5e/f6eTn6PLl6u3r6e3q7Oni7/Dy7Ovn7/jw7fL37PPu7/nf9fTv8Prs8vTk9Pvz8unq8/v18vfy9PH09f/69fP49frz+Pv2+PX3+P/4+vf1+/38+f76/Pn3/vP/+/r3/f/7/fr//P/5/v/9//yX2n16AAAAiUlEQVQI12NgAAFREQYY2PPj3asPRyDsT7+u3Dmw588fEPv1z0+Pr5w49unHByDn5/f3T8+eOXbpx1cGhpofL9crBUUrrX3xaxZDW2O8x5Ypk5crFFbPZWDwCHV3CTcX07ZWBerJdYrxSI/R1pZKBRk3ocRZiE88cybEojurWloXPoO7QUUDTAEAP/M3dGBjYgYAAAAASUVORK5CYII=", a.search_alert_decay = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAABHElEQVQY022QPaqDUBCFz1yvWkVIIFoIYhZgk6SwjusIQvaRZbgULXUDYopUgi4giEmwMBDR+wrfMz+8U83Ax8eZoePxCAAAEe33e13XAcRxnGUZ/sKmabFY2LataZoQIs9zvOUFua7LOQeQ53nTNP9AnPPNZgOg67osyyRJ+oaEEKvVatTUdU1ElmUZhjFBfKy82+3GXdf1w+EAIAzDy+XyMs1ms+Vy+Xg82rYFIMtyWZbv13EAbdsGQSCEUBTF930hRBRFYw0i+jX1fX+73e73+2hNkuR6vc7nc8/zGGMfLwBg23ZRFGmaEpGmadvtdjzzAzJNMwxDIlJVdb1eq6rqOA4R8YmQJOl0OlVVxRh7Pp/n85lzXhTFMAw/adhs7ciDFKkAAAAASUVORK5CYII=", a.search_alert_destroy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAABw0lEQVQY02M8Y2/NwMDw9///a79+n2bnlFFWlpKXu3/liuTDB3psrGzMzAwMDCwMDAwsjIx7P37ynzI9wcqKgZGRgYGBgYHh+fVr3dGRSQL8P//9Y2JgYGBmYHihpKJqZgZXwcDAIKmhKWVt+/nXLwYGBiaovgcPXzx8yIAE3j57xvnzx4vv3xkZGFgYGRiYmZg+Pn3y9OKFo5s323h5cgkJ7V60WFJJ4cT5CxV8fL/+/2f2EBO5/vGTlYjwG16+iOrqlJgYTi5uU09PRTY2w6+fX3/6fPf7d6Y7/ILf/QOf/vsvaWT0+dyZUzt27p054/PVK75JSb9//37h5PxUUpoxTk2FQ07e38dn1759rPz88bGxrAwMh06d3rlxQ3ZCwsptW7/eu8942dGWnYlp99Nn23//UeDiUlJTY/rPcPPmjVOvXvvxckcqyv/+z8AcIyu99dHjJ+zsXl5eQqpq/AICf1mYfWJiOX7+ePL+3bVnL6R5eFhefv9hXlisYWXdlpwox8Bgn5fHwcGxorfvy+dP2VOm/f/z+3pjHeMZe+tZHz8r///nws/3n5HxzffvDAwMwhwczIyMFz5/OcjIksrJCgCPo7HZZDIbqAAAAABJRU5ErkJggg==", a.search_alert_farm = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAABO0lEQVQY03WPzUoCYRiFz/s5k006NE2CGYIVBAWBG4OiFrVp2T4QXFQXEO0L8gpcBdGFeBGFm35pIYZQKkyajjM2n9/boh+V6Fk/53AOZYtZBll9N655pnTLaqquT2pQGEIwaMZtnExfUcdbQqOwXNoOHjGKsGTndP7uuLZ+a6bu21EoHCy8UNsdkZJ697I8GxiG1X47StegSOjYDFUV6FfSZJ/3EnW76ubSLTABAEMP8XCTVpFmKiZzsXeonyhBSuZxAn+rohuOnJXm5AdDMASDuOfjMN2Y8AezKFvMAiCvl1HPY0KlDH8n2So9BB3DPBdrY6QGEoCvpaRUQjb3IzemCJ6kdcGrIdUXg59gASZBr2E772Q86Itac7d9zYoF/sIsTKPgrOjh0Fa8uYGKhn9wonbeydjCbyjjEyoahbP7e5lJAAAAAElFTkSuQmCC", a.search_alert_goto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABX0lEQVQoz3WQPSxDYRSGn+/e2x9tNYheIogGiYRERLrpQBgsEgmJWcLQxcZS6cDKZpEYRITBZBCTQQwGaSQVnUT8RDpQFbTV9n6fQVqtxpnOec/7nJNzRHI7oCgLh03DkopsTmIzBHtnz3xkJPNjJlKBVjQKQAgYX41zFE1hzl6QSOUJbd6yuHNH/DGDEGXAUTTFcOSaGrvAbzrYXejG57WhawKPU6eruQalwBDA62eB2H2a+VGTg/MkwfAVloQO08HpSi/tjXZ0/WewpgCvy8Dj1Fnef+Ak9kauoLCk4iaRZeM4QUOtrXSjBqAJGOx08/Je4G+8pS00QSUAcP2YrjLPjTaxFeokk5MlzSgmA353hXlpsoXwVCv5QsXXfzcEe7y4naUSXRNV5gognZNEpttKjbXDJz6/5P+AJRWzIz5c9h/pK6/oW7hEiH8AAF0XXK73MxGop85tMDPUWLXhG9R7cPZCQRp9AAAAAElFTkSuQmCC", a.search_alert_link = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAABOUlEQVQY02WQP0tCARTFz73v+V5aavQPIWspajFrkSgkGoqWlpqqKegL9BnaWppcWiNodBAagprKhoaGwCiEpuIhGZlapr57G9JSPNOF+7vnHg5tJhQdUoCas+0BdxKWiVAQPgt/12brui5YmcLWvHotqtZ1P6X3L9wGiSI+oTuLlCvg8FxzH1iP4cFpd+q2ZXuBP7+xl6TXEkRwkYHF6go1MqlidYYDXqRukS9BFbPj4ryTbdH0aNNJFPFJrdXp7E6I2CA85XgpIqK4fGTzlwgFZTDATgHFLzYNAHgr4+SaAXgtmOE+7fWpKAPIF+Hv0uF+zToMwGAAIAIlb9zIiB6cGgM9KFc1Gta1GHaPqVKjvzJpI6FzY7IcxZAfrlDmmY6uUKn+l2d7YBKQznI6C9OAKupu40urfgDxv3cZ5gTB4QAAAABJRU5ErkJggg==", a.search_alert_message = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAC91BMVEUfIB4AAQAlJyQkJkISK0klKSsbLUYuLy07LD01NzRJN09BPDs/PUE7P0E4RFpBRUdFR0RCSVA5S2FJSkhKTElNS08uUnY1UnJNT0xPT0ciVopVUE9LUlksWIFOU1U0V3wtW35XUWZGVXEfXZdTVVIvW4QqXJA+WH5PWFQ4W4BTV1oyXYZIWnBRWWsvX5UuYZAlY5dUXFhUW2M8X4MeaKExZJM7ZHw5Y41aXmBcXltgXWErZ5tCYo1lXlhDZYpEZ4w5appDaYcxbKBBapQ9bZ1uZWs4b6oucqw4caZAcKAxdK5ma21dbH5FcZUnd7dUb4Q7c6hqbGlRcYtDc6M2dbc/dLA2d7JRcplGdaVMdKBwbnJhcI0/d6xLd5tvb4RJeKlDeq9TeJhpdIBYeJJqdY1ieZZWfalOgKpZfp5hfZ5of5xbgq58fntZhKlngphzf5dygZNng6SAgn9fiq9niK+DhYJ0h5+BiJB6iZt9iZaHiYZyjaOKjIl6kaGPjZGHj5ZqlLp1lLB/kqp7k7CDkqWVjpqQlJeWlJh3m69+ma+EmK+JmKuXmZabmKmHnq+dm595o8qZnqCDo7+enqibn66ZoLWJpbugop+ZqLuWqcKoqqeercCTr9O1r66nssCwsLqetcewtMOluMSluNG3ura1ur20u9Gnv9Cxvcu9v7yywdWsw+LEwcWyxtLExsOvy+O6yd3Jx8vHycXAzNqw0O260ePNz8vM0dTTz+HN0eHU0tbH197T1dLK1uTL2NnN2tvZ19vd1+Pc2d7W293a3Nna2+Xe3ODQ4Ofg3O7s2uLb3+/e3+nY4eni3+Tr3t7g4t/X4/Hn4eDr4efW5+3n5Onn4/Xh5fXk5uPk5e/f6eTn6PLl6u3r6e3q7Oni7/Dy7Ovn7/jw7fL37PPu7/nf9fTv8Prs8vTk9Pvz8unq8/v18vfy9PH09f/69fP49frz+Pv2+PX3+P/4+vf1+/38+f76/Pn3/vP/+/r3/f/7/fr//P/5/v/9//zLfEcoAAAAAXRSTlMAQObYZgAAADNJREFUCNdjYEAGjEgAyPkFBSDOLygPyAByIDwQDeL8ggpAOYyMcA6yMmQDUIxGthQZAACSozzHjtWiiAAAAABJRU5ErkJggg==", a.search_alert_unknown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAtklEQVQY04WOMQqDQBBFf9IttltoIV5ALL2Cx7DcXtBOvIGXstPGWmEbL7BgZTEzKUKCWcS8ZmDm8RjIB2utMUZrnaZp13VE9D3hPY7jiONYa933fdM0ANq29SUiqqpqXVcRYeYsy/I896UzzrkwDMuyvJaYua7rJEmUUtM0XUvOOQBFUczzfN7/SNu2AfAMEXniRBAEAJRS8PB+GoaBme9KRLQsy77vdyVrbRRF4zh6pYeI4B8vO8kW/f7HnBcAAAAASUVORK5CYII=", a.search_alert_upgrade = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABFElEQVQoz5WRzyuDcRzHX489zuQwDKOk3AgljyRPrhS1gwN2UA47+BekHOTgulYuUqKdRAoHHDTbXFZzkOXH6ukRhtWE/fg47LbnW3gfP73enz69Ppq5GhWAsS43I511/BYdYMbwMGs08adsXVjyn2j+9YSoFvW21RAwvWiVJz1kPh2w0V7L/HCLAwaoqhyMd7tZmuig2lXGt2M2ua+iuuDra2BhtBUNEGDj3CJ0mnZaApge8OAfLJsSgbWjO/YTT2qtc0PNTPU3AlASYeXgluOrF/UfAqaXyZ56AAolYXkvxdn1qxI+TD6jP2a/EaBQFBZ3b4ik3pRwOG4TPEmjh+M27x95Mrk8l/dZJbwZsdiJ2QD8AMlFhhlv7JvFAAAAAElFTkSuQmCC", a.search_alert_virus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAA9klEQVQY02PsVDjMgAYYGX68/8MhyCKmwe3dpzbd6jQTAwb48/1fwVVLIQXO4Hla7+59zzxmyoJF0c9/f37+8+5Te3bus5QR79qka+gm/fj4J+es+aUVL+a6nuOTYl8ZdeXVja9MWFSsfPn29ndxbW52fpawJTo/3v9hwaLi1rd3975FLNft1z7Ows7EIcjCgkcFBz8LAwMDw38GJgIqGBgYGBhY/vz8l3PGfFP2DR5xtvf3v2OqYGBgYGJkZPjx4Q8DI8PnF7+wqmBgYGCR1OeVMuJ1a1bhEGDBqoKBgYHx////C7zOP7/4+f9/BhZ2LBHAwMAAABZLh5KCzfizAAAAAElFTkSuQmCC", a.toolbar_alert = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAEUSURBVDhPnZE9agJRFIUfkk4whRg7Q9Zg4waCS0ibgOAelMz/DAOzgaRIY5NK7NyBIIJpLIOduIv8fE+vZHzOcyQHDszcd75739xR5xSG4cD3/UBeL5fruhXgJ+BPz/PWPPepXe1PS6RhoDH+yTsIgqk+k5hdTHsw4YOjKHqUmF1MeSmCtfmkd4nZRfDNBHOeSMwurjkpAHd2HKe8ATv4f4M4jpsENyaY85YBtxI/Fsu7IbAygBPzO9cMagi2V5qm12y4FM55ddQE+LUgdNYwI8GV4lptCjMOvsxggb/xnL/VEfxPSZLUudo9DXt4yNaftQGGugbUPfl+m1hqi1sttdn8nZQvV5ZlVSYv8AfNalI2pNQvzMI6hgOf6woAAAAASUVORK5CYII=", a.toolbar_link = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiUlEQVQ4y+XTv0sCcRjH8c95X+70yh9pP840SSKRkIoCw35Y0BAlFoRBIdFQtAUR9V/UEhENLUVDS0MUBDYUhUvEkQ7REkSlZZZ42hHYqU2Fgw7NvsdnePHwwAOUV62DfqZ9csFaOKP/A7R5F+o15sZLOZ85sjn9fOT2PK4oJRcrsD7/xDu6GkyO/llKbfz+26CYXAxwemd8RtfoECiFOxu7/tS3ukKKUnKxWPuY9vEtq2WbLYyyqbtX2FlNkF+Z5nRita1jSQwH5L6N/e0qz0gSQB0AHgAlP0cqiNkUTQi5DKgck4vcrwEAKZR1zRYoM+5hxuNOATAA6ATQAkBBcSpa3D3VV4z302ylGul35zI2cUz1jM1pgofbqd6DpMSpJI5kXwTisPEA8gDuAFwDkOQXUf8Vz5B0WrIYOKrr4+o5WGNVbZE8A617Ze9GZZM5tlINSYiaCLAIIArgFUAMQJ4YtVAbgTNrU6rwLkRpn2DjMXpKDD5M87WsLxVOhpgPIXEyP3BRJv/xA/XAjaSER+ceAAAAAElFTkSuQmCC", a.toolbar_portal = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAIjSURBVDhPY8AL6uuZoCzSgLFPmhyINosr7wULkArsEhsDjSOKXD2q5v+2ji1NAolZ+ecbgCWJAd61W4wdi6f9jJ537L9GSHYKSMw0qicBLEkMUIvsEQmZfOR/5vZ7/+3KJlfbx1SoWKQujIJK4wf2oVk89vb1LOFzr/7K2vXkv1vz0ps2yV3brOKa3UJDQ5mhynADu4isMFfXGO7IZU+vFh569T944vb/9qVLXvrkNSTqeqTI6HpHCUKVYgf2iRUuppFVa507TtwqPvPjf9rOe/+9uvfc9SvrWGQaW/PRJLHaBaoUOwA507pkw0v7psP/Ew///p9y6t3/wFl7/9tldv/3nbRzK1QZfuBQtWGZWdv9/x47f/33PvLyf/Diq/99pp78HLPoigpUCX7g073J17z/2X+H4z//2+578T9m7/v/zr2HW6DS2IGVX5IUMAYkoFwG27mPNznu//rfbt/z/84Lr/x3ye9fHF07yRYqjRUw+mXXm0RWTq7z69uw33r+wb9O57//tzv05H/grY//Qzdf+q+fVO0GVYsJjNPSWI1CC+K1w2sfm3Vd/u91/+v/wMc//kc8/fjf9+mv/1arr/7XjOkMMI+oFIdqQQV+SZ28djW76o3y97VrZW5u1uw78shq9+v/Pre//nc7/eW/Wd+Vv+ZNJ995zDp2y7F6ijxUG26g4pHLbte5Ks2peukR14JZa8yTaubYhOSKQqWhgIEBADF06lZlZuXMAAAAAElFTkSuQmCC", a.toolbar_reswue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAALESURBVDhPhZJbSJNxGMZXN+FNVx3MhHWa4gRLCfSbaFmKkqRhaomgmVmoWZo0U5G0PKAhUo7EssxE1/C41T6dupNaouZSSqeipm3u29aozQNEIE9r+wgqVz94b/48z+//XryMf+Gb3LybGcNz1kV4BFIR7Ddzoe4adTCrbjbs0HY6sjlhGeQ2TqaYS+TJLF6Xn65QkZ7r46Hu6Dt2ABMnWVCHsAR09G846aKzRE7ffFChEtVto+gqL8PSaTb4BNM2ZMB+TIewvuM2YytdsROQ0ubD4UoUnAIF8upHMbOwjC8mLQxkI5Yj2Gj332cTyKxbqIPdjHTNjn+WONsvX74RXPoaFZJpLFMULBYzLGYDTNpZGOIJaKxbTIS4WX93Q3FM0oZrYj2XrjMYxM2e+qiqYXRrv0FlWEPT1Gc8/jCJXnUztKZhTNYkQB/pifkwd6jDPXCKex97kvkNdN0uIMqH4dtlRJKCQsGQDlUqKTKlT5Avb4RY9RCLl3xtAvm9UATf4TkWJMgpZPTrcE7xDj7CVoRL2hDR3YsSPg/vrwZAoLyAsOJax4J4mVUwQCFGPoajog74kyS8hApkDQ7h1dtCkKOZOFH0wLHgvEyPawN6RMlGwG4X43CrGGXSXLQMpmB84QVejmQj5G6NY0GMVI90q8BbqEJcdzPI8RKMzdVhRiuG1jiG1VUT4qr6NhEUDcCPv4BAkkKkRAfFJwPMZgrra2aYjEswUHO2UY6o4H1L9LuAk9ZxhOD29BPWIzpeOQz5xAJWLEZbwfJVD4N+HlMzk0jlSbAzvRPOKfzBg7HVPnT9F1v804SxRG7fx6BCBWpF49BoZqHTLaJCMABmZid2XWlZYsY/ivuZtVc2wS9a4MS5Tub75UlXz5Qq4Z0jxI7U9jXXxIYC1+hKJzr2fzgXO104N7qfuSQ3PWdF1+yln/+AwfgBFuHe6YVguGQAAAAASUVORK5CYII=", a.toolbar_sync = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABT0lEQVQ4jb2RsUpDQRBFzzxSBLGSdEpAwTatdnYmRDC7NpbBVhA/wEJsBVvBSq1MGrNYBPULrAXBKohYSUqRFIFr4b74kjzsdJpl5s7ePTML/x3OObz3SZoX8hrMbAtoAhVJCfBsZldACzgDnoDjKQPv/SzQBuppzcwAysA6cALMAYepPkJxziGpDdQl9SXtSVoGFiXtAMN4eSxGBBG7LqkPrIQQepEqAap5406O0IxGR51Op5cWJc2Y2Ttwmqk95BlUonibfSGE8AHsR5oisAkUpwwk7UfhLQ819iyYWRt4AW4mCQZA1czWvPdIGgIHkYA4Xi2ej1MEZrYK7GbylqTPNHfOLfHzfZd5O8iiDs3szszK3vsCUIuXS0BX0vVvBn0zKwHnOVpX0nYIYVRIMuIAuADmgR1J95Je+V5YkOSBjexOxsJ7nzQajVztT+MLPDWCvXqGCZkAAAAASUVORK5CYII=", a.marker_agent = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyNiIgaGVpZ2h0PSI0MiI+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAtY29sb3JzIj4KCQkJPHBhdGggZD0iTSAxMyw0MiAyNC44MzIxOTcsMTguMzkyNzM0IGEgMTMsMTMgMCAxIDAgLTIzLjY2NDM5MzcsMCB6IiAvPgoJCTwvY2xpcFBhdGg+CgkJPGNsaXBQYXRoIGlkPSJjbGlwLWljb24iPgoJCQk8Y2lyY2xlIGN4PSIxMyIgY3k9IjEzIiByPSIxMiIgLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgoJPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtY29sb3JzKSI+CgkJPGcgdHJhbnNmb3JtPSJtYXRyaXgoNDIuMTAyLDAsMCw0MiwtOC4wNTEsMCkiIGNsYXNzPSJncm91cENvbG9ycyI+CgkJCTxwYXRoIGQ9Ik0gMCwwIDEsMCAwLjUsMSIgc3R5bGU9ImZpbGw6IzAwMDtzdHJva2U6bm9uZTsiIC8+CgkJPC9nPgoJPC9nPgoJPGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMTIiIHN0eWxlPSJmaWxsOiNGRkY7IiAvPgoJPGltYWdlIGNsYXNzPSJhdmF0YXIiIHg9IjEiIHk9IjEiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtaWNvbikiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwKaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJjQUFBQVhDQUlBQUFCdlNFUDNBQUFBQTNOQ1NWUUlDQWpiNFUvZ0FBQUQ5RWxFUVZRNApqYVdVeVc4Y1ZSREc2eTM5dW51V0hrL2JIay9zQ1RnaGpqbUFpUkpMaVpBZ0lCRWpJWEdKaURpaGdNUUI4ZmZraXNTRm15WEVJUkxiCklYWWlZV1JpT1JCc1lvS0ZQV1kyYjlQZE03MjhsWU90eEhGeUNLTE9WYi82cXVwVElXTU0vTytnejVPa3RUNW9SZ2g1TG9veFJpcHAKTU5XQUxHbWtsRW9wQUZDWVUwcXBvUWd3cGNlcjBOR0pqREZDY21wUkVXdWxWSnpFVWtnQUVFS2txczhZODMzZmNSd0VpQkxyS0FVZgprNktKalJWUlNvVmhLSVdrRmxXSUpXa1NSV0VVUldtYUVrSU1HQVA2YVBzbnRHbEFSc1NwbFFNQW9LNVNTa25nbkNPYXM0a0FCWnh6CnBaVFdXb0pFQ0dGRE1NWlA3MFhadGkxRWFvaGoyMWp4bmhUU3BZVk1aY1RTeUZJSG15YUVTTENJNFk4bU9VTFJpbWlUR2FrUUF3Q2IKYUVVMDlQdElac0xDd0tSdEVBaGxRb21LdGdYR1VJUVJlbUl2MmlqUUdnQ3drRnBwQU9DYVpBb25pTzFieFJoYmNhWVRBUlRzWHIrWApaWm1nQ0FDMDBZKzFhRkJDQ29XWXJWR291TmFRaFBHM1A5eGF2cjg0UFBIYWNPWE1UbjMxMTUvbVhxaWMrUFRqait3QzdTVzcxVUxKCmFDYUFNR1FRSUdTTTBhQzRKZ0FReFhLM0cvL1JDbjladUxzNFAzZnExY25PZmhURjZLU0wvRkx1dDVXMXFmTlRiMTYrTURia25xMTYKdWVJZ1ZrUVRoWUVjVWpwZFdXL3VkS1BzNTdYTlc4dGJaci96K1NmWGh0dzBDSUxXZG5mRU1VRGRKRis4OGRWc3BWaTZjdW5peFpkZgpMT2VOWC9hTGZnNERvUUR3Wnp2OFluWitvNTFGQW5yOW5xQ3U0dzNTWXI2NXVkN2IzUnVydmRTcHI3YUR2ZkZ6cnp0Vy9tRW5DbjljCnVMZTJHUXArb21SOWR1M2RpWlBERkFBZVBOeGEvYnZiSVQ1TzA4d1FoVmdtK05mZno4OU1uVzVuKzNmdkxPWnc0ampPTjkvTmQ4TEUKd3M2MlpOdnJPd0JRMzRobXBqY1BLUVhIM2xFc0lGYlYwb0JsREFDT3QxN2YrN0xaS0NBYW9semNEWWpzaGxHVWQzTWNnQkRDaVVOVApIa2swTUZBNnZOSDRpT2RSb3pWa2doT0tIY3BTd1FWMUMzWWhCZGlURnFlZVp4ZDFwcVVVd0ZqUFVCN0x2QkUrTmJWSytkQXZwMnZWCmR5NmN0SFNRcVZocDdRTHZ4djBESTFnTzhoa2FHaWdEQUxNc0xqZ0F1RG9qV1lSbDhNSGI1OGVxZzQrOWUvM0sxTzNsdFR4MmxWWU0KcVFuZjIyNXVGSmpNbFF1T0lVem9adENVU1Z3WnJnQ0EwZHh6czlFeXZYNzE4dkhQME5qdjM3aTVFZ1JkMWV2M3VHbTBHdmZtYms2TwpWMHVsVXJmVHFiZDNSaWRlcVkxUER1U3QwWW8vVnZFL2ZHL2FMN2pQK0M5eG1qa09YWHJ3MSt6dGxjMDIvK2YrNzQybE95Tk1lSG5mCkd4MFpQRE01VUJ0NmYrYU5jMmRQRVo1YWp2T29FQjM3dTJFUUdJTTVkUmVXMWxhM0dueTNvK1B0SVpaanVkSndiWFQ2clV0RkpFRkoKcjFnNFduV2NjaEN0Vml0TFJhN2taUWdrbzVSTDIwQ2FKRGJCbFpISzAvblBwdnpYK0JjaC9EcllaSGJmVGdBQUFBQkpSVTVFcmtKZwpnZz09CgkiIC8+Cjwvc3ZnPgo=", a.search_polygon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmVyc2lvbj0iMS4xIj4KCTxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiVDT0xPUiU7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVqb2luOm1pdGVyIiBkPSJNIDEsNCA0LDEgMTEsOCA4LDExIHoiLz4KPC9zdmc+Cg==", a.search_portal = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiI+Cgk8cGF0aCBzdHlsZT0iZmlsbDolQ09MT1IlO3N0cm9rZTpub25lIiBkPSJtIDUuODQzMzI3NiwwLjAwMzA5MDMyIGMgLTEuMjIwMzM0MSwwLjA1MzUyIC0yLjM4ODgzMSwwLjc3OTY4MiAtMy4wMDM4MDY0LDEuODU5MDYyOTggLTAuNjE0OTc1NSwxLjA3OTM4MiAtMC42NTY4NjE3LDIuNDc3NjM4IC0wLjEwMDczNzUsMy41ODk5MTUgTCA1Ljk5OTAxMjYsMTIgOS4yNTkyNDE1LDUuNDUyMDY4MyBDIDkuODM4OTQ5NSw0LjI5MjUyODMgOS43NzI1MjQ5LDIuODIxMTIyMyA5LjA4NTI0MDYsMS43MjQ3ODQzIDguMzk3OTU2NSwwLjYyODQ0NjMyIDcuMTE1NTMyOCwtMC4wNTE3OTY2OCA1Ljg0MzMyNzYsMC4wMDMwOTAzMiB6Ii8+Cjwvc3ZnPgo="
        }(b = a.Images || (a.Images = {}))
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b;
        ! function(a) {
            a.main = "data:text/css;base64,LnJlc3d1ZS10YWJsZSB7Cglib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOwoJZW1wdHktY2VsbHM6IHNob3c7Cgl3aWR0aDogMTAwJTsKCWNsZWFyOiBib3RoOwp9Ci5yZXN3dWUtdGFibGUgdGQsIC5yZXN3dWUtdGFibGUgdGggewoJYm9yZGVyLXdpZHRoOiAwIDFweDsKCWJvcmRlci1zdHlsZTogc29saWQ7Cglib3JkZXItY29sb3I6IHJnYmEoOCwgNDgsIDc4LCAwLjc1KTsKCXBhZGRpbmc6IDNweCA0cHg7Cgl0ZXh0LWFsaWduOiBsZWZ0Owp9Ci5yZXN3dWUtdGFibGUgdGQ6Zmlyc3QtY2hpbGQsIC5yZXN3dWUtdGFibGUgdGg6Zmlyc3QtY2hpbGQgeyBib3JkZXItbGVmdC13aWR0aDogMDsgfQoucmVzd3VlLXRhYmxlIHRkOmxhc3QtY2hpbGQsICAucmVzd3VlLXRhYmxlIHRoOmxhc3QtY2hpbGQgeyBib3JkZXItcmlnaHQtd2lkdGg6IDA7IH0KLnJlc3d1ZS10YWJsZSB0Ym9keSB0cjpudGgtY2hpbGQoMm4rMSkgdGQgewoJYm9yZGVyLWNvbG9yOiByZ2JhKDI1LCA2MywgOTUsIDAuNzUpOwp9Ci5yZXN3dWUtdGFibGUgdHIgewoJYmFja2dyb3VuZDogcmdiYSgyNSwgNjMsIDk1LCAwLjc1KTsKfQoucmVzd3VlLXRhYmxlIHRib2R5IHRyOm50aC1jaGlsZCgybisxKSB7CgliYWNrZ3JvdW5kOiByZ2JhKDgsIDQ4LCA3OCwgMC43NSk7Cn0KLnJlc3d1ZS10YWJsZSA+IHRoZWFkIC5zb3J0YWJsZSB7CgljdXJzb3I6IHBvaW50ZXI7Cn0KLnJlc3d1ZS10YWJsZSA+IHRoZWFkIC5zb3J0ZWQgewoJY29sb3I6ICNmZmNlMDA7Cn0KLnJlc3d1ZS10YWJsZSA+IHRoZWFkIC5zb3J0YWJsZTpiZWZvcmUgewoJY29udGVudDogIiAiOwoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJZmxvYXQ6IHJpZ2h0OwoJbWluLXdpZHRoOiAxZW07Cgl0ZXh0LWFsaWduOiByaWdodDsKfQoucmVzd3VlLXRhYmxlID4gdGhlYWQgLnNvcnRhYmxlLmFzYzpiZWZvcmUgewoJY29udGVudDogIlwyNWIyIjsKfQoucmVzd3VlLXRhYmxlID4gdGhlYWQgLnNvcnRhYmxlLmRlc2M6YmVmb3JlIHsKCWNvbnRlbnQ6ICJcMjViYyI7Cn0KLnJlc3d1ZS10YWJsZSB0ZC5tZW51IHsKCXBvc2l0aW9uOiByZWxhdGl2ZTsKCW1pbi1oZWlnaHQ6IDIwcHg7CgltaW4td2lkdGg6IDI0cHg7Cn0KLnJlc3d1ZS10YWJsZSB0ZC5tZW51ID4gLnJlc3d1ZS1vdmVyZmxvdy1idXR0b24gewoJcG9zaXRpb246IGFic29sdXRlOwoJdG9wOiAwOwoJbGVmdDogMDsKCXJpZ2h0OiAwOwoJYm90dG9tOiAwOwoJZGlzcGxheTogZmxleDsKfQoKLnJlc3d1ZS1kaWFsb2ctcG9ydGFsbGlzdCAua2V5cywKLnJlc3d1ZS1kaWFsb2ctcG9ydGFsbGlzdCAubGlua3MgewoJd2lkdGg6IDMuNWVtOyAvKiB3aWxsIGV4cGFuZCB0byBmaXQgY29udGVudCAqLwoJdGV4dC1hbGlnbjogcmlnaHQ7Cn0KLnJlc3d1ZS1kaWFsb2ctcG9ydGFsbGlzdCAud2FybiB7Cgljb2xvcjogI2ZmMDsKCWZsb2F0OiBsZWZ0OwoJZm9udC1zaXplOiAxLjVlbTsKCWZvbnQtd2VpZ2h0OiBib2xkOwp9Ci5yZXN3dWUtZGlhbG9nLXBvcnRhbGxpc3QgLndhcm4uZXJyb3IgewoJY29sb3I6ICNmMDA7Cn0KCi8qIHN0eWxlLmNzcyBzZXRzIGRpYWxvZyBtYXgtd2lkdGggdG8gNzAwcHggLSBvdmVycmlkZSB0aGF0IGhlcmUgKi8KLnJlc3d1ZS1kaWFsb2ctbGlua2xpc3QgewoJbWF4LXdpZHRoOiAxMDAwcHggIWltcG9ydGFudDsKfQoucmVzd3VlLWRpYWxvZy1wb3J0YWxsaXN0ID4gLnVpLWRpYWxvZy1jb250ZW50LAoucmVzd3VlLWRpYWxvZy1saW5rbGlzdCA+IC51aS1kaWFsb2ctY29udGVudCwKLnJlc3d1ZS1kaWFsb2ctYWxlcnRsaXN0ID4gLnVpLWRpYWxvZy1jb250ZW50IHsKCXBhZGRpbmc6IDA7Cn0KLnJlc3d1ZS1kaWFsb2ctbGlua2xpc3QgLnJlc3d1ZS1sYXllciB7CgltYXJnaW46IC00cHggMCAtNHB4IC00cHg7Cn0KLnJlc3d1ZS1kaWFsb2ctbGlua2xpc3QgdGQua2V5cywKLnJlc3d1ZS1kaWFsb2ctbGlua2xpc3QgdGQubGVuZ3RoIHsKCXRleHQtYWxpZ246IHJpZ2h0Owp9CgoucmVzd3VlLWRpYWxvZy1hbGVydGxpc3QgdGQgewoJdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOwp9Ci5yZXN3dWUtZGlhbG9nLWFsZXJ0bGlzdCAuYXNzaWduZWUgewoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCW92ZXJmbG93OiBoaWRkZW47Cgl0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsKCW1heC13aWR0aDogMTBlbTsKfQoucmVzd3VlLWRpYWxvZy1hbGVydGxpc3QgLnJlc29sdmVkIGJ1dHRvbiB7CgltYXJnaW46IC0zcHggMDsKCXBhZGRpbmc6IDAgMC41ZW0gMXB4Owp9CgojcmVzd3VlLWZha2UtYnV0dG9uIHsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogLTk5OTllbTsKCWxlZnQ6IC05OTk5ZW07Cn0KCi5yZXN3dWUtYWxlcnRzLW51bSB7Cgljb2xvcjogIzAwRkYwMDsKfQoucmVzd3VlLWFsZXJ0cy1udW0ubmV3IHsKCWNvbG9yOiAjZmYwMDAwOwoJZm9udC13ZWlnaHQ6IGJvbGQ7Cn0KCi5yZXN3dWUtYWdlbnRzZWxlY3QgLnJlc3d1ZS1ncm91cC1pbmRpY2F0b3IgewoJZmxvYXQ6IHJpZ2h0OwoJbWFyZ2luLWxlZnQ6IDAuMjVlbTsKfQoKLnJlc3d1ZS1ncm91cC1jb250YWluZXIgewoJYm9yZGVyOiAxcHggc29saWQgY3VycmVudENvbG9yOwoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJaGVpZ2h0OiAxLjJlbTsKCWxpbmUtaGVpZ2h0OiAxLjJlbTsKCW1hcmdpbjogMXB4IDAuMjVlbSAxcHggMDsKCXBhZGRpbmc6IDAgMC4yNWVtOwp9Ci5yZXN3dWUtZ3JvdXAtY29udGFpbmVyID4gLnJlc3d1ZS1ncm91cC1pbmRpY2F0b3IgewoJbWFyZ2luLWxlZnQ6IC0wLjI1ZW07CgltYXJnaW4tcmlnaHQ6IDAuMjVlbTsKCWhlaWdodDogMS4yZW07Cgl3aWR0aDogMS4yZW07Cn0KCi5yZXN3dWUtZ3JvdXAtaW5kaWNhdG9yIHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCXBvc2l0aW9uOiByZWxhdGl2ZTsKCXdpZHRoOiAxZW07CgloZWlnaHQ6IDFlbTsKCXZlcnRpY2FsLWFsaWduOiB0b3A7Cn0KLnJlc3d1ZS1ncm91cC1pbmRpY2F0b3IgPiBkaXYgewoJaGVpZ2h0OiAxZW07CglmbG9hdDogbGVmdDsKfQoKLnJlc3d1ZS1wb3B1cCB7CgltYXgtd2lkdGg6IDMwMHB4Owp9Ci5yZXN3dWUtZGlhbG9nIC5kZXNjIHAsCi5yZXN3dWUtZGlhbG9nIC5kZXNjIHVsLAoucmVzd3VlLXBvcHVwIHAsCi5yZXN3dWUtcG9wdXAgdWwgewoJbWFyZ2luOiAwOwp9Ci5yZXN3dWUtcG9wdXAgYSB7Cgljb2xvcjogIzAwOTlDQzsKfQoucmVzd3VlLWRpYWxvZyAuZGVzYyB1bCwKLnJlc3d1ZS1wb2x5Z29uLWxhYmVsIHVsLAoucmVzd3VlLXBvcHVwIC5kZXNjIHVsIHsKCXBhZGRpbmctbGVmdDogMS41ZW07Cn0KLnJlc3d1ZS1kaWFsb2cgLmRlc2MgZW0sCi5yZXN3dWUtcG9seWdvbi1sYWJlbCBlbSwKLnJlc3d1ZS1wb3B1cCAuZGVzYyBlbSB7Cgljb2xvcjogaW5oZXJpdDsKCWZvbnQtc3R5bGU6IGl0YWxpYzsKfQoucmVzd3VlLXBvcHVwLnBvcnRhbCAudWktZGlhbG9nLWJ1dHRvbnNldCB7CglkaXNwbGF5OiBib3g7CglkaXNwbGF5OiBmbGV4OwoJbWFyZ2luLXRvcDogNnB4Owp9Ci5yZXN3dWUtcG9wdXAucG9ydGFsIC51aS1kaWFsb2ctYnV0dG9uc2V0IGJ1dHRvbiB7CglmbGV4LWdyb3c6IDE7Cglib3gtZ3JvdzogMTsKfQoucmVzd3VlLXBvcHVwIGltZy5hdmF0YXIgewoJbWF4LXdpZHRoOiA5NnB4OwoJbWF4LWhlaWdodDogOTZweDsKCW1hcmdpbi1sZWZ0OiA0cHg7CglmbG9hdDogcmlnaHQ7Cn0KCi5yZXN3dWUta2V5cy1vdmVybGF5LCAucmVzd3VlLWFnZW50LWxhYmVsLCAucmVzd3VlLXBvbHlnb24tbGFiZWwgewoJY29sb3I6ICNGRkZGQkI7Cglmb250LXNpemU6IDEycHg7CglsaW5lLWhlaWdodDogMTZweDsKCXRleHQtYWxpZ246IGNlbnRlcjsKCXBhZGRpbmc6IDJweDsKCW92ZXJmbG93OiBoaWRkZW47Cgl3aGl0ZS1zcGFjZTogbm93cmFwOwoJdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7Cgl0ZXh0LXNoYWRvdzogMXB4IDFweCAjMDAwLCAxcHggLTFweCAjMDAwLCAtMXB4IDFweCAjMDAwLCAtMXB4IC0xcHggIzAwMCwgMCAwIDVweCAjMDAwOwoJcG9pbnRlci1ldmVudHM6bm9uZTsKfQoucmVzd3VlLWtleXMtb3ZlcmxheSB7CglsaW5lLWhlaWdodDogMjFweDsKCXZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Cglmb250LXNpemU6IDE0cHg7Cglmb250LXdlaWdodDogYm9sZDsKfQoucmVzd3VlLXBvbHlnb24tbGFiZWwgewoJdmVydGljYWwtYWxpZ246IG1pZGRsZTsKCWZvbnQtd2VpZ2h0OiBib2xkZXI7Cgl0ZXh0LXNoYWRvdzogMCAwIDFweCB3aGl0ZTsKfQoucmVzd3VlLXBvbHlnb24tbGFiZWwgcCwKLnJlc3d1ZS1wb2x5Z29uLWxhYmVsIHVsIHsKCW1hcmdpbjogMDsKCW92ZXJmbG93OiBoaWRkZW47Cgl0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsKfQoKLnJlc3d1ZS1vdmVyZmxvdy1idXR0b24gewoJZGlzcGxheTogaW5saW5lLWJveDsKCWRpc3BsYXk6IGlubGluZS1mbGV4OwoJbWluLXdpZHRoOiAyNHB4OwoJbWluLWhlaWdodDogMjBweDsKCXRleHQtYWxpZ246IGNlbnRlcjsKCXZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Cglmb250LXdlaWdodDogYm9sZDsKCXRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50OwoJY29sb3I6ICNmZmNlMDA7CgljdXJzb3I6IHBvaW50ZXI7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cn0KLnJlc3d1ZS1vdmVyZmxvdy1idXR0b24gc3BhbiB7CglmbGV4OiAwIDAgYXV0bzsKCWJveDogMCAwIGF1dG87Cn0KLnJlc3d1ZS1vdmVyZmxvdy1tZW51IHsKCWJvcmRlcjogMXB4IHNvbGlkICMyMGE4YjE7CgliYWNrZ3JvdW5kOiByZ2JhKDgsIDQ4LCA3OCwgMC45KTsKCWNvbG9yOiAjZmZjZTAwOwoJcGFkZGluZzogMDsKCW1hcmdpbjogMDsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCWxpc3Qtc3R5bGU6IG5vbmU7Cgl6LWluZGV4OiAzMDAwMDsKCW1heC1oZWlnaHQ6IDcwJTsKCW1heC13aWR0aDogMjVlbTsKCW92ZXJmbG93LXk6IGF1dG87CglvdmVyZmxvdy14OiBoaWRkZW47Cn0KLnJlc3d1ZS1vdmVyZmxvdy1tZW51IGEgewoJZGlzcGxheTogYmxvY2s7CglwYWRkaW5nOiAwLjVlbTsKCW1pbi13aWR0aDogOGVtOwoJdGV4dC1kZWNvcmF0aW9uOiBub25lOwoJb3V0bGluZTogMCB0cmFuc3BhcmVudCBub25lICFpbXBvcnRhbnQ7Cn0KLnJlc3d1ZS1vdmVyZmxvdy1tZW51IGE6aG92ZXIgewoJdGV4dC1kZWNvcmF0aW9uOiBub25lOwoJYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMiwgMTY4LCAxNzcsIDAuNyk7Cn0KLnJlc3d1ZS1vdmVyZmxvdy1tZW51IGE6Zm9jdXMsCi5yZXN3dWUtb3ZlcmZsb3ctbWVudSBhOmFjdGl2ZSB7Cgl0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKfQoK", a.ui = "data:text/css;base64,Ym9keS5wcml2YWN5X2FjdGl2ZSAucmVzd3VlLXRvb2xiYXIgewoJZGlzcGxheTogbm9uZTsKfQoKI3Jlc3d1ZS1idG4tc3luYy5ydW5uaW5nIHsKCS13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAxczsKCSAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxczsKCS13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IHJlc3d1ZS1zeW5jLXJ1bm5pbmc7CgkgICAgICAgIGFuaW1hdGlvbi1uYW1lOiByZXN3dWUtc3luYy1ydW5uaW5nOwoJLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7CgkgICAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjsKCS13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7CgkgICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlOwp9CkAtd2Via2l0LWtleWZyYW1lcyByZXN3dWUtc3luYy1ydW5uaW5nIHsKCTAlIHsKCQktd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpOwoJCSAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7Cgl9CgkxMDAlIHsKCQktd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7CgkJICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOwoJfQp9CkBrZXlmcmFtZXMgcmVzd3VlLXN5bmMtcnVubmluZyB7CgkwJSB7CgkJLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsKCQkgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOwoJfQoJMTAwJSB7CgkJLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOwoJCSAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsKCX0KfQoKI3Jlc3d1ZS1tZW51LWNvbmZpZyB7CglkaXNwbGF5OiBib3g7IC8qIG9sZCB2YWx1ZSwgZm9yIEFuZHJvaWQgKi8KCWRpc3BsYXk6IGZsZXg7CgltYXJnaW46IC0xMnB4OwoJcG9zaXRpb246IHJlbGF0aXZlOwp9CiNyZXN3dWUtbWVudS1jb25maWcubW9iaWxlIHsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwoJcGFkZGluZzogMDsKCWJvcmRlcjogMCBub25lOwoJbWFyZ2luOiAwOwoJaGVpZ2h0OiAxMDAlOwoJd2lkdGg6IDEwMCU7CglsZWZ0OiAwOwoJdG9wOiAwOwoJcG9zaXRpb246IGFic29sdXRlOwoJb3ZlcmZsb3c6IGF1dG87Cn0KI3Jlc3d1ZS1tZW51LWNvbmZpZyAucHJvZ3Jlc3MgewoJcG9zaXRpb246IGFic29sdXRlOwoJdG9wOiAwOwoJbGVmdDogMDsKCXJpZ2h0OiAwOwoJaGVpZ2h0OiAzcHg7CgliYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFOwoJZGlzcGxheTogbm9uZTsKfQojcmVzd3VlLW1lbnUtY29uZmlnLnNob3dwcm9ncmVzcyAucHJvZ3Jlc3MgewoJZGlzcGxheTogYmxvY2s7Cn0KI3Jlc3d1ZS1tZW51LWNvbmZpZyAucHJvZ3Jlc3MgLnByb2dyZXNzLXZhbHVlIHsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogMDsKCWxlZnQ6IDA7CgloZWlnaHQ6IDEwMCU7CgliYWNrZ3JvdW5kLWNvbG9yOiAjRkZDRTAwOwoJd2lkdGg6IDAlOwp9CiNyZXN3dWUtbWVudS1jb25maWcgbmF2IHsKCWRpc3BsYXk6IGJsb2NrOwoJbWluLWhlaWdodDogMTUwcHg7Cgl3aWR0aDogMTUwcHg7Cglib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMjBBOEIxOwoJdmVydGljYWwtYWxpZ246IHRvcDsKCWZsZXgtc2hyaW5rOiAwOwoJZmxleC1ncm93OiAwOwoJYm94LXNocmluazogMDsKCWJveC1ncm93OiAwOwp9CiNyZXN3dWUtbWVudS1jb25maWcgLnRhYnMgewoJcG9zaXRpb246IHJlbGF0aXZlOwoJcGFkZGluZzogMTBweDsKCWZsZXgtc2hyaW5rOiAxOwoJZmxleC1ncm93OiAxOwoJYm94LXNocmluazogMTsKCWJveC1ncm93OiAxOwoJLyogbWF4LXdpZHRoOiAzMjBweDsgKi8KfQojcmVzd3VlLW1lbnUtY29uZmlnIG5hdiBhIHsKCWNvbG9yOiB3aGl0ZTsKCXBhZGRpbmc6IDAuNWVtOwoJZGlzcGxheTogYmxvY2s7Cgl0ZXh0LXdlaWdodDogYm9sZDsKCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjBBOEIxOwoJdGV4dC1kZWNvcmF0aW9uOiBub25lOwp9CiNyZXN3dWUtbWVudS1jb25maWcgbmF2IGE6bGFzdC1jaGlsZCB7Cglib3JkZXItYm90dG9tLXdpZHRoOiAwOwp9CiNyZXN3dWUtbWVudS1jb25maWcgbmF2IGE6aG92ZXIgewoJYmFja2dyb3VuZC1jb2xvcjogIzA4M0M0RTsKfQojcmVzd3VlLW1lbnUtY29uZmlnIG5hdiBhLmNsaWNrZWQgewoJYmFja2dyb3VuZC1jb2xvcjogIzIwQThCMTsKfQojcmVzd3VlLW1lbnUtY29uZmlnIHNlY3Rpb24gaDIgewoJZm9udC1zaXplOiAxOHB4OwoJbWFyZ2luOiAwIDAgMC40ZW0gMDsKCXBhZGRpbmc6IDA7Cn0KI3Jlc3d1ZS1tZW51LWNvbmZpZyBzZWN0aW9uIGgyIHNtYWxsIHsKCWNvbG9yOiAjQ0NDQ0NDOwoJdmVydGljYWwtYWxpZ246IHRvcDsKfQojcmVzd3VlLW1lbnUtY29uZmlnIGhyIHsKCWJvcmRlcjogMDsKCWhlaWdodDogMXB4OwoJYmFja2dyb3VuZC1jb2xvcjogIzIwQThCMQp9CiNyZXN3dWUtbWVudS1jb25maWcgZmllbGRzZXQgewoJYm9yZGVyOiAxcHggc29saWQgIzIwYThiMTsKCXBhZGRpbmc6IDAgMC42MjVlbTsKfQojcmVzd3VlLW1lbnUtY29uZmlnIGxlZ2VuZCB7Cgljb2xvcjogI2ZmY2UwMDsKCWZvbnQtd2VpZ2h0OiBib2xkOwp9CiNyZXN3dWUtbWVudS1jb25maWcgcCB7CgltYXJnaW46IDAuNWVtIDA7Cn0KI3Jlc3d1ZS1tZW51LWNvbmZpZyBsYWJlbCB7CglkaXNwbGF5OiBibG9jazsKfQojcmVzd3VlLW1lbnUtY29uZmlnIGxhYmVsIGlucHV0IHsKCXZlcnRpY2FsLWFsaWduOiBtaWRkbGU7CgltYXJnaW46IDAgMC4yZW07Cn0KI3Jlc3d1ZS1tZW51LWNvbmZpZy1zZWxlY3QgewoJZGlzcGxheTogbm9uZTsKCWZsZXgtc2hyaW5rOiAwOwoJZmxleC1ncm93OiAwOwoJYm94LXNocmluazogMDsKCWJveC1ncm93OiAwOwoJcGFkZGluZzogNXB4IDEwcHggMDsKfQojcmVzd3VlLW1lbnUtY29uZmlnLXNlbGVjdCBzZWxlY3QgewoJcGFkZGluZzogN3B4Owp9CiNyZXN3dWUtbWVudS1jb25maWctc2VsZWN0IGhyIHsKCW1hcmdpbjogNXB4IC0xMHB4IDA7Cn0KQG1lZGlhIChtYXgtd2lkdGg6IDk1OXB4KSB7CgkjcmVzd3VlLW1lbnUtY29uZmlnIHsKCQlmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJCWJveC1kaXJlY3Rpb246IGNvbHVtbjsKCX0KCSNyZXN3dWUtbWVudS1jb25maWcgbmF2IHsKCQlkaXNwbGF5OiBub25lOwoJfQoJI3Jlc3d1ZS1tZW51LWNvbmZpZy1zZWxlY3QgewoJCWRpc3BsYXk6IGJsb2NrOwoJfQp9CgoucmVzd3VlLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnQgaW5wdXQsCi5yZXN3dWUtZGlhbG9nIC51aS1kaWFsb2ctY29udGVudCB0ZXh0YXJlYSB7Cglib3JkZXI6IDFweCBzb2xpZCAjMjBhOGIxOwoJY29sb3I6ICNmZmNlMDA7CgliYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7Cn0KLnJlc3d1ZS1kaWFsb2cgcCB7CgltYXJnaW46IDAgMCA2cHg7Cn0KCi5yZXN3dWUtZGlhbG9nLXBvcnRhbHMgPiAudWktZGlhbG9nLWNvbnRlbnQsCi5yZXN3dWUtZGlhbG9nLWxpbmsgPiAudWktZGlhbG9nLWNvbnRlbnQsCi5yZXN3dWUtZGlhbG9nLXBvbHlnb24gPiAudWktZGlhbG9nLWNvbnRlbnQgewoJcGFkZGluZzogNnB4IDZweCAwOwp9Ci5yZXN3dWUtZGlhbG9nLXBvcnRhbHMgLm5hbWUgbGFiZWwgewoJYWxpZ24taXRlbXM6IGJhc2VsaW5lOwoJZGlzcGxheTogZmxleDsKfQoucmVzd3VlLWRpYWxvZy1wb3J0YWxzIC5uYW1lIGxhYmVsID4gKnsKCWZsZXgtZ3JvdzogMTsKCW1hcmdpbi1sZWZ0OiAwLjVlbTsKfQoucmVzd3VlLWRpYWxvZyB0ZXh0YXJlYS5kZXNjLAoucmVzd3VlLWRpYWxvZyAuZGVzYyB0ZXh0YXJlYSB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJd2lkdGg6IDEwMCU7CgloZWlnaHQ6IDQuNWVtOwoJcGFkZGluZzogM3B4OwoJcmVzaXplOiB2ZXJ0aWNhbDsKfQoucmVzd3VlLWRpYWxvZy1wb3J0YWxzIC5rZXlzIGlucHV0LAoucmVzd3VlLWRpYWxvZy1saW5rIC5rZXlzIGlucHV0IHsKCXdpZHRoOiA2ZW07CglwYWRkaW5nLXJpZ2h0OiAwOwp9Ci5yZXN3dWUtZGlhbG9nLXBvcnRhbHMgLmtleXMgaW5wdXQsCi5yZXN3dWUtZGlhbG9nLWxpbmsgLmtleXMgaW5wdXQgewoJbWFyZ2luLWxlZnQ6IDZweDsKfQoucmVzd3VlLWRpYWxvZy1wb3J0YWxzIC5kZXRhaWxzLAoucmVzd3VlLWRpYWxvZy1saW5rIC5kZXRhaWxzLAoucmVzd3VlLWRpYWxvZy1wb2x5Z29uIC5kZXRhaWxzIHsKCWRpc3BsYXk6IGJveDsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwp9Ci5yZXN3dWUtZGlhbG9nLXBvcnRhbHMgLnJlc3d1ZS1sYXllciwKLnJlc3d1ZS1kaWFsb2ctbGluayAucmVzd3VlLWxheWVyLAoucmVzd3VlLWRpYWxvZy1wb2x5Z29uIC5yZXN3dWUtbGF5ZXIgewoJbWFyZ2luLWxlZnQ6IDEycHg7CglmbGV4OiAxIDEgYXV0bzsKCWJveDogMSAxIGF1dG87Cn0KLnJlc3d1ZS1kaWFsb2ctcG9ydGFscyAucG9zaXRpb253YXJuaW5nLmhpZGRlbiB7CglkaXNwbGF5OiBub25lOwp9Ci5yZXN3dWUtZGlhbG9nLXBvcnRhbHMgLnBvc2l0aW9ud2FybmluZyB7CgliYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7Cglib3JkZXI6IDJweCBzb2xpZCByZWQ7Cgljb2xvcjogcmVkOwoJZm9udC13ZWlnaHQ6IGJvbGQ7CglwYWRkaW5nOiAwLjNlbTsKfQoKLnJlc3d1ZS1kaWFsb2ctbGluayAubGlua3BvcnRhbHMgewoJZGlzcGxheTogYm94OwoJZGlzcGxheTogZmxleDsKCW1hcmdpbjogMCAtNnB4IDZweDsKfQoucmVzd3VlLWRpYWxvZy1saW5rIC5saW5rcG9ydGFscyA+IHNwYW4gewoJZmxleDogMSAxIDUwJTsKCWJveDogMSAxIDUwJTsKCW1hcmdpbjogMCA2cHg7Cn0KCi5yZXN3dWUtZGlhbG9nLWxpbmtzID4gLnVpLWRpYWxvZy1jb250ZW50IHsKCXBhZGRpbmc6IDA7Cn0KLnJlc3d1ZS1kaWFsb2ctbGlua3MgPiAudWktZGlhbG9nLWNvbnRlbnQgPiBkaXYgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47Cn0KLnJlc3d1ZS1kaWFsb2ctbGlua3MgdGV4dGFyZWEuZGVzYyB7CgltYXJnaW46IDZweCA2cHggM3B4OwoJaGVpZ2h0OiAyZW07Cgl3aWR0aDogYXV0bzsKCXBhZGRpbmc6IDRweDsKfQoucmVzd3VlLWRpYWxvZy1saW5rcyB0YWJsZSB7Cglib3JkZXItc3BhY2luZzogMDsKfQoucmVzd3VlLWRpYWxvZy1saW5rcyB0ZCB7Cgl2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOwoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCXBhZGRpbmc6IDFweCAxcHggMCAwOwp9Ci5yZXN3dWUtZGlhbG9nLWxpbmtzIHRkOmZpcnN0LWNoaWxkLAoucmVzd3VlLWRpYWxvZy1saW5rcyAuYXJyb3cgewoJdGV4dC1hbGlnbjogY2VudGVyOwoJd2lkdGg6IDIwcHg7CglkaXNwbGF5OiBpbmxpbmUtYmxvY2s7Cn0KLnJlc3d1ZS1kaWFsb2ctbGlua3MgaW5wdXRbdHlwZT0iY2hlY2tib3giXSB7CgltYXJnaW46IDA7Cgl2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOwp9Ci5yZXN3dWUtZGlhbG9nLWxpbmtzIHRhYmxlIGJ1dHRvbiB7CglkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CglwYWRkaW5nOiAxcHggNHB4OwoJZm9udC1zaXplOiAxZW07CglsaW5lLWhlaWdodDogMS4yNWVtOwp9Ci5yZXN3dWUtZGlhbG9nLWxpbmtzIGJ1dHRvbi5wb3J0YWwtZHJvcGRvd24gewoJcGFkZGluZzogMXB4IDBweDsKCW1pbi13aWR0aDogMDsKCWJvcmRlci1sZWZ0LXdpZHRoOiAwOwp9Ci5yZXN3dWUtZGlhbG9nLWxpbmtzIC5wb3J0YWwgewoJcGFkZGluZy1yaWdodDogNnB4OwoJcGFkZGluZy1sZWZ0OiAycHg7CgltYXgtd2lkdGg6IDE1MHB4OwoJb3ZlcmZsb3c6IGhpZGRlbjsKCXRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOwp9Ci5yZXN3dWUtZGlhbG9nLWxpbmtzIC5idXR0b25iYXIgewoJZGlzcGxheTogYm94OwoJZGlzcGxheTogZmxleDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Cglib3JkZXItdG9wOiAxcHggc29saWQgIzIwYThiMTsKCW1hcmdpbjogNnB4IDAgMCAtNnB4OwoJcGFkZGluZzogNnB4Owp9Ci5yZXN3dWUtZGlhbG9nLWxpbmtzIC5idXR0b25iYXIgPiBsYWJlbCB7Cgl3aWR0aDogNWVtOwp9CgoucmVzd3VlLWRpYWxvZy1hbGVydHMgLnVpLWRpYWxvZy1jb250ZW50IHsKCW1pbi1oZWlnaHQ6IDAgIWltcG9ydGFudDsKfQoucmVzd3VlLWRpYWxvZy1hbGVydHMgLnVpLWRpYWxvZy1jb250ZW50ID4gZGl2IHsKCW1hcmdpbjogLTZweDsKfQoucmVzd3VlLWRpYWxvZy1hbGVydHMgLmZsZXggewoJZGlzcGxheTogYm94OyAvKiBvbGQgdmFsdWUsIGZvciBBbmRyb2lkICovCglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCXdoaXRlLXNwYWNlOiBub3dyYXA7Cn0KLnJlc3d1ZS1kaWFsb2ctYWxlcnRzIC5mbGV4ICogewoJZmxleDogMSAwIDA7Cglib3g6IDEgMCAwOwp9Ci5yZXN3dWUtZGlhbG9nLWFsZXJ0cyAuZmxleCBpbnB1dCB7Cglib3JkZXI6IDFweCBzb2xpZCAjMjBhOGIxOwoJbWFyZ2luLWxlZnQ6IDAuMmVtOwp9Ci5yZXN3dWUtZGlhbG9nLWFsZXJ0cyAuZmxleCBzZWxlY3QgewoJd2lkdGg6IDA7IC8qIENocm9tZSB3b3VsZCBleHBhbmQgdG8gZml0IHRoZSBjb250ZW50cyBvdGhlcndpc2UgKi8KfQoucmVzd3VlLXRhcmdldHNlbGVjdCB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGJhc2VsaW5lOwp9Ci5yZXN3dWUtdGFyZ2V0c2VsZWN0ID4gc3Ryb25nIHsKCWZsZXg6IDEgMCAwOwoJYm94OiAxIDAgMDsKCW1hcmdpbjogMCAwLjJlbTsKCW92ZXJmbG93OiBoaWRkZW47Cgl0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsKCXdoaXRlLXNwYWNlOiBub3dyYXA7Cn0KLnJlc3d1ZS10YXJnZXRzZWxlY3QgPiAucmVzd3VlLW92ZXJmbG93LWJ1dHRvbiB7CglhbGlnbi1zZWxmOiBzdHJldGNoOwoJYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4LCA0OCwgNzgsIDAuOSk7Cglib3JkZXI6IDFweCBzb2xpZCAjZmZjZTAwOwoJY29sb3I6ICNmZmNlMDA7CglwYWRkaW5nOiAycHg7Cn0KCi5yZXN3dWUtZGlhbG9nLXBvbHlnb24gLmRldGFpbHMgPiAuY29sb3IgewoJZGlzcGxheTogaW5saW5lLWJveDsKCWRpc3BsYXk6IGlubGluZS1mbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKfQoucmVzd3VlLWRpYWxvZy1wb2x5Z29uIC5kZXRhaWxzID4gLmNvbG9yIGlucHV0LAoucmVzd3VlLWRpYWxvZy1wb2x5Z29uIC5kZXRhaWxzID4gLmNvbG9yIC5zcC1yZXBsYWNlciB7CgltYXJnaW4tbGVmdDogMC41ZW07Cn0KCi5yZXN3dWUtY29sb3ItcGlja2VyIC5zcC1pbnB1dCB7Cglib3JkZXI6IDFweCBzb2xpZCAjNjY2OwoJYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7Cgljb2xvcjogIzIyMjsKfQoucmVzd3VlLWNvbG9yLXBpY2tlciAuc3AtY2YgewoJbWluLWhlaWdodDogMC41ZW07Cn0KCi5yZXN3dWUtbGF5ZXIgewoJZGlzcGxheTogaW5saW5lLWJveDsgLyogb2xkIHZhbHVlLCBmb3IgQW5kcm9pZCAqLwoJZGlzcGxheTogaW5saW5lLWZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwp9Ci5yZXN3dWUtbGF5ZXIgbGFiZWwgewoJbWFyZ2luLXJpZ2h0OiAwLjVlbTsKfQoucmVzd3VlLWxheWVyLm5vbGFiZWwgbGFiZWwgewoJZGlzcGxheTogbm9uZTsKfQoucmVzd3VlLWxheWVyIC5wcmV2aWV3IHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCXdpZHRoOiAwLjVyZW07CgltaW4taGVpZ2h0OiAyMHB4OwoJYWxpZ24tc2VsZjogc3RyZXRjaDsKfQoucmVzd3VlLWxheWVyIHNlbGVjdCwKLnJlc3d1ZS1sYXllciAub3V0cHV0IHsKCWZsZXg6IDEgMSBhdXRvOwoJYm94OiAxIDEgYXV0bzsKCS8qIHRoZSBzZWxlY3QgaGFzIGEgZGVmYXVsdCB3aWR0aCB3aGljaCB3ZSB3YW50IHRvIHVuc2V0ICovCgltaW4td2lkdGg6IDZlbTsKCXdpZHRoOiAwOwp9Ci5yZXN3dWUtbGF5ZXIgLm91dHB1dCB7CgltaW4td2lkdGg6IDRlbTsKfQoucmVzd3VlLWxheWVyIG9wdGlvbiBzcGFuIHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCWZsb2F0OiBsZWZ0OwoJdmVydGljYWwtYWxpZ246IHRvcDsKCWhlaWdodDogMWVtOwoJd2lkdGg6IDFlbTsKCW1hcmdpbi1yaWdodDogMC4yNWVtOwp9Ci5yZXN3dWUtbGF5ZXIgLm91dHB1dCB7CgltYXJnaW4tbGVmdDogNHB4Owp9Cgo=";

        }(b = a.CSS || (a.CSS = {}))
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a() {
                this.agentsInAlertTargetList = !0, this.showAgentSortedByDistance = !0, this.showAgentNames = !0, this.showPolygonLabels = !0, this.showKeys = "false", this.targetCrossLinks = !0, this.uploadDrawToolsPolygons = !0, this.disablePolygonPopups = !1, this.groupAgentsOnMap = !1, this.fastSyncMode = 0, this.defaultAlertType = "DestroyPortalAlert"
            }
            return a.prototype.loadOrInit = function() {
                var a;
                try {
                    a = JSON.parse(localStorage["reswue-preferences"])
                } catch (b) {
                    a = {}
                }
                "showAgentSortedByDistance" in a && (this.showAgentSortedByDistance = a.showAgentSortedByDistance), "agentsInAlertTargetList" in a && (this.agentsInAlertTargetList = a.agentsInAlertTargetList), "showAgentNames" in a && (this.showAgentNames = a.showAgentNames), "groupAgentsOnMap" in a && (this.groupAgentsOnMap = a.groupAgentsOnMap), "showPolygonLabels" in a && (this.showPolygonLabels = a.showPolygonLabels), "disablePolygonPopups" in a && (this.disablePolygonPopups = a.disablePolygonPopups), "showKeys" in a && (this.showKeys = a.showKeys), "targetCrossLinks" in a && (this.targetCrossLinks = a.targetCrossLinks), "uploadDrawToolsPolygons" in a && (this.uploadDrawToolsPolygons = a.uploadDrawToolsPolygons), "fastSyncMode" in a && (this.fastSyncMode = a.fastSyncMode), "defaultAlertType" in a && (this.defaultAlertType = a.defaultAlertType)
            }, a.prototype.save = function() {
                this.fastSyncMode = Math.min(this.fastSyncMode, Date.now() + 216e5), localStorage["reswue-preferences"] = JSON.stringify(this)
            }, a
        }();
        a.Preferences = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b, c) {
                void 0 === c && (c = null), this._handler = [], this.environment = a, this.operationName = b, this.password = c, this._handler = [], this.reset()
            }
            return a.prototype.reset = function() {
                this.updateOperation(null), this.updatePortals([]), this.updateLinks([]), this.updatePolygons([]), this.updateAlerts([]), this.updateAgents([]), this.updateGroups([])
            }, a.prototype.addUpdateNotificationHandler = function(a) {
                return this._handler.push(a), a
            }, a.prototype.removeUpdateNotificationHandler = function(a) {
                var b = this._handler.indexOf(a); - 1 == b ? console.warn("Handler wasn't registered.") : this._handler.splice(b, 1)
            }, a.prototype.updateOperation = function(a) {
                var b = this;
                this.operation = a, this._handler.forEach(function(c) {
                    return c.updateOperation(b, a)
                })
            }, a.prototype.updatePortals = function(a) {
                var b = this;
                this.portals = a, this._handler.forEach(function(c) {
                    return c.updatePortals(b, a)
                })
            }, a.prototype.updateLinks = function(a) {
                var b = this;
                this.links = a, this._handler.forEach(function(c) {
                    return c.updateLinks(b, a)
                })
            }, a.prototype.updatePolygons = function(a) {
                var b = this;
                this.polygons = a, this._handler.forEach(function(c) {
                    return c.updatePolygons(b, a)
                })
            }, a.prototype.updateAlerts = function(a) {
                var b = this;
                this.alerts = a, this._handler.forEach(function(c) {
                    return c.updateAlerts(b, a)
                })
            }, a.prototype.updateAgents = function(a) {
                var b = this;
                this.agents = a, this._handler.forEach(function(c) {
                    return c.updateAgents(b, a)
                })
            }, a.prototype.updateGroups = function(a) {
                var b = this;
                this.groups = a, this._handler.forEach(function(c) {
                    return c.updateGroups(b, a)
                })
            }, a.prototype.getPortal = function(a) {
                var b = this.portals.filter(function(b) {
                    return b.id == a
                });
                return 1 == b.length ? b[0] : null
            }, a
        }();
        a.OperationDataContext = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b) {
                this.name = "ApiError", this.message = a, this.statusCode = b
            }
            return a
        }();
        a.ApiError = b;
        var c = function() {
            function c(a, b, c, d, e) {
                this.clientId = a, this.apiKey = b, this.operationContext = c, this.team = d, this.agentName = e, null != c.password ? (this.authenticateAnonymously(c.password), this.retryGoogle = !1) : this.retryGoogle = !0
            }
            return c.prototype.authenticateAnonymously = function(a) {
                this.operationPassword = a, this.operationContext.authenticated = !0
            }, c.prototype.authenticateWithGoogle = function(b, c) {
                var d = this;
                void 0 === c && (c = !0), this.operationPassword = "---session---";
                var e = !1,
                    f = new Promise(function(f, g) {
                        var h = "63747919910-ic0h4c3jcjmff86120egg9mqnnp8jvhb.apps.googleusercontent.com",
                            i = "profile";
                        window.gapi.auth.authorize({
                            response_type: "code",
                            client_id: h,
                            scope: i,
                            immediate: c,
                            user_id: localStorage["reswue-user-google-id"],
                            authuser: -1
                        }, function(a) {
                            delete localStorage["reswue-user-google-id"], console.log(a), a && !a.error ? (d.trace("authenticateByGoogle: START"), d.apiCall("POST", "/agents/" + d.agentName + "/sessions/google/token", {
                                tokenType: "code",
                                token: a.code,
                                forgeryToken: "NOSTATE"
                            }, !0, !0).then(function(a) {
                                200 == a.statusCode && (d.operationContext.authenticated = !0, localStorage["reswue-user-google-id"] = a.data.googleId, f())
                            }, function() {
                                g()
                            })) : "immediate_failed" == a.error && b ? f(d.authenticateWithGoogle(b, !1)) : "access_denied" == a.error ? (alert("You denied access to your Google Profile."), g()) : g()
                        }), e = !0, a.RequestTracker.onRequestStarted()
                    }),
                    g = new Promise(function(a, b) {
                        return setTimeout(b, 3e4)
                    });
                return Promise.race([f, g])["finally"](function() {
                    e && a.RequestTracker.onRequestFinished()
                }), f
            }, c.prototype.logoutFromGoogle = function() {
                return delete localStorage["reswue-user-google-id"], this.apiCall("POST", "/agents/" + this.agentName + "/sessions/logout", {
                    logoutAgent: !0
                })
            }, c.prototype.apiCall = function(c, d, e, f, g, h) {
                var i = this;
                void 0 === f && (f = !1), void 0 === g && (g = !1), void 0 === h && (h = 0);
                var j = !1,
                    k = new Promise(function(k, l) {
                        i.trace(d + ": START");
                        var m = "";
                        0 == d.indexOf("https") ? m = d : (m += i.operationContext.environment, m += "/api/v1", m += d), m += "?" + $.param({
                            "ResWue-Client": i.clientId,
                            "ResWue-ApiKey": i.apiKey,
                            "ResWue-Auth-OperationName": i.operationContext.operationName,
                            "ResWue-Auth-OperationPassword": i.operationPassword,
                            "ResWue-Auth-AgentName": i.agentName,
                            "ResWue-Auth-Team": i.team
                        });
                        var n = null;
                        null != e && (n = JSON.stringify(e));
                        var o = c;
                        "POST" != c && "GET" != c && (m += "&X-HTTP-Method-Override=" + c, o = "POST"), $.ajax({
                            type: o,
                            url: m,
                            data: n,
                            crossDomain: !0,
                            async: !0,
                            cache: !1,
                            contentType: "text/plain",
                            xhrFields: {
                                withCredentials: !0
                            }
                        }).done(function(a, b, c) {
                            i.trace(d + ": Response Available (.done)"), i.operationContext.authenticated = !0;
                            var e = c.status,
                                f = c.responseJSON;
                            "undefined" != typeof f && "undefined" != typeof f.message && alert(f.message), i.trace(d + ": END"), k({
                                statusCode: e,
                                data: f
                            })
                        }).fail(function(a, j, m) {
                            i.trace(d + ": Response Available (.fail)");
                            var n = a.status,
                                o = a.responseJSON;
                            "parsererror" == j ? l(new Error("The response of the RESWUE service was malformed. Either something is wrong with the service and/or with your data.")) : "timeout" == j ? l(new Error("A timeout occurred, please retry.")) : "abort" == j ? l(new Error("The call was aborted, please retry.")) : "error" == j && ("undefined" != typeof o && "undefined" != typeof o.message && 0 == f && alert(o.message), 401 == n && 1 > h ? g || 0 == i.retryGoogle ? (i.operationContext.authenticated = !1, l(new b("Server access not successful", n))) : (h++, i.authenticateWithGoogle(!1).then(function() {
                                k(i.apiCall(c, d, e, f, g, h))
                            })) : 0 === n && "" === m ? i.trace("Networking Error") : l(new b("HTTP ERROR: " + m + " (" + n + ")", n))), i.trace(d + ": END")
                        }), j = !0, a.RequestTracker.onRequestStarted()
                    });
                return k["finally"](function() {
                    j && a.RequestTracker.onRequestFinished()
                }), k
            }, c.prototype.apiCallToOperation = function(a, b, c, d, e) {
                if (void 0 === d && (d = !1), void 0 === e && (e = !1), "" != this.operationContext.operationName && null != this.operationContext.operationName) {
                    var f = "/" + this.operationContext.operationName + b;
                    return this.apiCall(a, f, c, d, e)
                }
                this.trace("invalid call to operation api")
            }, c.loadGoogleApi = function() {
                var a = document.createElement("script");
                a.type = "text/javascript", a.async = !0, a.src = "https://apis.google.com/js/client:platform.js";
                var b = document.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b)
            }, c.prototype.trace = function(a) {
                console.log("RESWUE-API: " + a)
            }, c
        }();
        a.ApiBase = c
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b) {
                this.api = a, this.operationContext = b
            }
            return a.prototype.getPolygons = function() {
                var a = this;
                return this.api.apiCallToOperation("GET", "/polygons/all", null).then(function(b) {
                    return 200 == b.statusCode && a.operationContext.updatePolygons(b.data), b.data
                })
            }, a.prototype.addPolygon = function(a, b, c, d, e) {
                var f = this,
                    g = {
                        latLngs: a,
                        color: b,
                        layerName: c,
                        description: d,
                        creator: {
                            agentName: e
                        }
                    };
                return this.api.apiCallToOperation("POST", "/polygons", g).then(function(a) {
                    return 200 == a.statusCode ? f.getPolygons() : void 0
                })
            }, a.prototype.editPolygon = function(a, b) {
                var c = this;
                return a.editor = {
                    agentName: b
                }, this.api.apiCallToOperation("PUT", "/polygons/" + a.id, a).then(function(a) {
                    return c.getPolygons()
                })
            }, a.prototype.deletePolygon = function(a, b) {
                var c = this;
                return this.api.apiCallToOperation("DELETE", "/polygons/" + a, {
                    deletedBy: {
                        agentName: b
                    }
                }).then(function(a) {
                    return 200 == a.statusCode ? c.getPolygons() : void 0
                })
            }, a
        }();
        a.PolygonService = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b) {
                this.api = a, this.operationContext = b
            }
            return b.prototype.getLinks = function() {
                var a = this;
                return this.api.apiCallToOperation("GET", "/links/all", null).then(function(b) {
                    return 200 == b.statusCode && a.operationContext.updateLinks(b.data), b.data
                })
            }, b.prototype.addLink = function(b, c, d, e, f, g) {
                var h = this;
                void 0 === g && (g = "");
                var i = {
                    portalFrom: {
                        id: b
                    },
                    portalTo: {
                        id: c
                    },
                    layerName: d,
                    description: g,
                    creator: {
                        agentName: f
                    },
                    isProposal: e
                };
                return this.api.apiCallToOperation("POST", "/links", i).then(function(a) {
                    return 200 == a.statusCode ? i.isProposal ? Promise.reject(new Error("Link proposed. Thanks You.")) : h.getLinks() : void 0
                }, function(b) {
                    return Promise.reject(b instanceof a.ApiError && 409 == b.statusCode ? i.isProposal ? new Error("Link already proposed.") : new Error("Link already added.") : b)
                })
            }, b.prototype.editLink = function(a, b) {
                var c = this;
                return a.editor = {
                    agentName: b
                }, this.api.apiCallToOperation("PUT", "/links/" + a.portalFrom.id + "-" + a.portalTo.id, a).then(function(a) {
                    return c.getLinks()
                })
            }, b.prototype.deleteLink = function(a, b, c) {
                var d = this;
                return this.api.apiCallToOperation("DELETE", "/links/" + a + "-" + b, {
                    deletedBy: {
                        agentName: c
                    }
                }).then(function(a) {
                    return 200 == a.statusCode ? d.getLinks() : void 0
                })
            }, b.prototype.reverseLink = function(a, b, c) {
                var d = this;
                return this.api.apiCallToOperation("POST", "/links/" + a + "-" + b + "/reverse", {
                    editor: {
                        agentName: c
                    }
                }).then(function(a) {
                    return 200 == a.statusCode ? d.getLinks() : void 0
                })
            }, b
        }();
        a.LinkService = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b, c) {
                this.api = a, this.operationContext = b, this.linkService = c
            }
            return a.prototype.getPortals = function() {
                var a = this;
                return this.api.apiCallToOperation("GET", "/portals/all", null).then(function(b) {
                    return 200 == b.statusCode && (b.data.forEach(function(a) {
                        if ("string" == typeof a.lat && "string" == typeof a.lng) {
                            var b = a.lat,
                                c = a.lng;
                            a.lat = parseFloat(b), a.lng = parseFloat(c)
                        }
                    }), a.operationContext.updatePortals(b.data)), b.data
                })
            }, a.prototype.addPortal = function(a, b, c, d, e, f, g, h) {
                var i = this;
                void 0 === h && (h = ""), h.startsWith(PLAYER.nickname + ": ") || (h = PLAYER.nickname + ": " + h);
                var j = {
                    id: a,
                    name: b,
                    layerName: c,
                    description: h,
                    coordinates: {
                        lat: String(d),
                        lng: String(e)
                    },
                    isProposal: f,
                    creator: {
                        agentName: g
                    }
                };
                return this.api.apiCallToOperation("POST", "/portals", j).then(function(a) {
                    return 200 == a.statusCode ? j.isProposal ? Promise.reject(new Error("Portal proposed. Thanks You.")) : i.getPortals() : void 0
                })
            }, a.prototype.editPortal = function(a, b) {
                var c = this;
                return a.editor = {
                    agentName: b
                }, this.api.apiCallToOperation("PUT", "/portals/" + a.id, a).then(function(a) {
                    return c.getPortals()
                })
            }, a.prototype.swapPortals = function(a, b) {
                var c = this;
                return this.api.apiCallToOperation("POST", "/portals/" + a + "/swap", {
                    swapWith: b
                }).then(function(a) {
                    return 200 == a.statusCode ? Promise.all([c.getPortals(), c.linkService.getLinks()]).then(function(a) {
                        return a[0]
                    }) : void 0
                })
            }, a.prototype.deletePortal = function(a, b) {
                var c = this;
                return this.api.apiCallToOperation("DELETE", "/portals/" + a, {
                    id: a,
                    deletedBy: {
                        agentName: b
                    }
                }).then(function(a) {
                    return 200 == a.statusCode ? Promise.all([c.getPortals(), c.linkService.getLinks()]).then(function(a) {
                        return a[0]
                    }) : void 0
                })
            }, a
        }();
        a.PortalService = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b) {
                this.api = a, this.operationContext = b
            }
            return a.prototype.getAgentsAndGroups = function() {
                var a = this;
                return this.api.apiCallToOperation("GET", "/agents/all", null).then(function(b) {
                    return 200 == b.statusCode && (b.data.agents.forEach(function(a) {
                        if (a.lastKnownLocation && "string" == typeof a.lastKnownLocation.lat && "string" == typeof a.lastKnownLocation.lng) {
                            var b = a.lastKnownLocation.lat,
                                c = a.lastKnownLocation.lng;
                            a.lastKnownLocation.lat = parseFloat(b), a.lastKnownLocation.lng = parseFloat(c)
                        }
                    }), a.operationContext.updateAgents(b.data.agents), a.operationContext.updateGroups(b.data.groups)), b.data
                })
            }, a.prototype.requestAgentTracking = function(a) {
                return this.api.apiCallToOperation("POST", "/agents/" + a + "/location/request", null).then(function(b) {
                    return 200 == b.statusCode ? Promise.resolve(new Error("Tracking request sent to @" + a)) : void 0
                })
            }, a
        }();
        a.AgentService = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b) {
                this.api = a, this.operationContext = b
            }
            return b.prototype.getAlerts = function() {
                var a = this;
                return this.api.apiCallToOperation("GET", "/alerts/all", null).then(function(b) {
                    return 200 == b.statusCode && (b.data.forEach(function(a) {
                        if (a.portal && "string" == typeof a.portal.lat && "string" == typeof a.portal.lng) {
                            var b = a.portal.lat,
                                c = a.portal.lng;
                            a.portal.lat = parseFloat(b), a.portal.lng = parseFloat(c)
                        }
                    }), a.operationContext.updateAlerts(b.data)), b.data
                })
            }, b.prototype.addAlert = function(a, b) {
                var c = this;
                return void 0 === b && (b = !0), this.api.apiCallToOperation("POST", "/alerts", a).then(function(a) {
                    return 200 == a.statusCode && b ? c.getAlerts() : 200 != a.statusCode || b ? void 0 : []
                })
            }, b.prototype.resolveAlert = function(b, c) {
                var d = this;
                return this.api.apiCallToOperation("POST", "/alerts/" + b + "/resolve", {
                    id: b,
                    resolver: {
                        agentName: c
                    }
                }, !1, !0).then(function(a) {
                    return 200 == a.statusCode ? d.getAlerts() : void 0
                }, function(b) {
                    return Promise.reject(b instanceof a.ApiError && 401 == b.statusCode ? new Error("The alert is marked to be not resolvable. Only operators can resolve this alert.") : b)
                })
            }, b.prototype.declineAlert = function(a, b) {
                var c = this;
                return this.api.apiCallToOperation("POST", "/alerts/" + a + "/decline", {
                    id: a,
                    decliner: {
                        agentName: b
                    },
                    declineDate: (new Date).toISOString()
                }).then(function(a) {
                    return 200 == a.statusCode ? c.getAlerts() : void 0
                })
            }, b.prototype.deleteAlert = function(a, b, c) {
                var d = this;
                return void 0 === c && (c = !0), this.api.apiCallToOperation("POST", "/alerts/" + a + "/delete", {
                    id: a,
                    deleter: {
                        agentName: b
                    },
                    deleteDate: (new Date).toISOString()
                }).then(function(a) {
                    return 200 == a.statusCode && c ? d.getAlerts() : 200 != a.statusCode || c ? void 0 : []
                })
            }, b.prototype.assignAlert = function(a, b) {
                var c = this;
                return this.api.apiCallToOperation("POST", "/alerts/" + a + "/assign", {
                    id: a,
                    assignee: {
                        agentName: b
                    }
                }).then(function(a) {
                    return c.getAlerts()
                })
            }, b
        }();
        a.AlertService = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b) {
                this.api = a, this.operationDataContext = b
            }
            return a.prototype.getEnvironments = function() {
                return this.api.apiCall("GET", "https://ops.irde.net/iitc/reswue/api/v1/environments/public", null).then(function(a) {
                    if (200 == a.statusCode) {
                        var b = [];
                        for (var c in a.data.environments) {
                            var d = {
                                uri: c,
                                displayName: a.data.environments[c]
                            };
                            b.push(d)
                        }
                        return b
                    }
                })
            }, a.prototype.getOperation = function(a) {
                var b = this;
                return this.api.apiCall("GET", "/" + a + "/info", null).then(function(a) {
                    return 200 == a.statusCode && b.operationDataContext.updateOperation(a.data), a.data
                })
            }, a.prototype.getMyOperations = function(a) {
                return this.api.apiCall("GET", "/operations/my/" + a, null).then(function(a) {
                    return a.data
                })
            }, a.prototype.joinOperation = function(a, b) {
                return this.api.apiCall("POST", "/" + a + "/join", {
                    password: b
                }, !1, !0)
            }, a
        }();
        a.OperationService = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(b, c) {
                this._active = !1, this.api = c, this.data = b, this.linkService = new a.LinkService(c, b), this.portalService = new a.PortalService(c, b, this.linkService), this.polygonService = new a.PolygonService(c, b), this.alertService = new a.AlertService(c, b), this.agentService = new a.AgentService(c, b), this.operationService = new a.OperationService(c, b), this._preferences = new a.Preferences
            }
            return Object.defineProperty(b.prototype, "active", {
                get: function() {
                    return this._active
                },
                set: function(a) {
                    this._active = a, 1 == a ? (this.syncAll(), this.scheduleVolatileSync()) : (window.clearInterval(this._timer), this.reset())
                },
                enumerable: !0,
                configurable: !0
            }), b.prototype.getOperationName = function() {
                return this.data.operationName
            }, b.prototype.getDisplayName = function() {
                return this.data.operationName
            }, b.prototype.getEnvironmentDisplayName = function() {
                return this.data.environment
            }, b.prototype.syncAll = function() {
                var a = this;
                return this.data.authenticated ? this.operationService.getOperation(this.getOperationName()).then(function(b) {
                    return a.portalService.getPortals().then(function(b) {
                        return Promise.all([a.linkService.getLinks(), a.polygonService.getPolygons(), a.alertService.getAlerts(), a.agentService.getAgentsAndGroups()])
                    })
                }) : Promise.resolve()
            }, b.prototype.syncVolatile = function() {
                return this.scheduleVolatileSync(), this.data.authenticated ? Promise.all([this.alertService.getAlerts(), this.agentService.getAgentsAndGroups()]) : Promise.resolve()
            }, b.prototype.scheduleVolatileSync = function() {
                var a = this;
                if (this.active) {
                    this._preferences.loadOrInit();
                    var b = this._preferences.fastSyncMode > Date.now() ? 3e4 : 3e5;
                    clearTimeout(this._timer), this._timer = setTimeout(function() {
                        return a.syncVolatile()
                    }, b)
                }
            }, b.prototype.reset = function() {
                this.data.reset()
            }, b
        }();
        a.Operation = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b) {
                this.operations = [], this.selectedOperation = null, this._team = a, this._agentName = b
            }
            return Object.defineProperty(b.prototype, "selectedOperation", {
                get: function() {
                    return this._selectedOperation
                },
                enumerable: !0,
                configurable: !0
            }), b.prototype.addOperation = function(c, d, e) {
                void 0 === e && (e = null);
                var f = this.getOperation(c, d);
                if (f) return f;
                var g = new a.OperationDataContext(c, d, e),
                    h = b.createApi(g, this._team, this._agentName),
                    i = new a.Operation(g, h);
                return this.operations.push(i), i
            }, b.prototype.removeOperation = function(a, b) {
                var c = this.getOperation(a, b);
                null != c && (this.selectedOperation == c && (this._selectedOperation = null), c.active = !1, this.operations = this.operations.filter(function(c) {
                    return c.data.environment != a || c.getOperationName() != b
                })), this._selectedOperation == c && (this._selectedOperation = null)
            }, b.prototype.setSelectedOperation = function(a, b) {
                var c = this.getOperation(a, b);
                this._selectedOperation = c
            }, b.prototype.getOperation = function(a, b) {
                var c = this.operations.filter(function(c) {
                        return c.data.environment == a && c.getOperationName() == b
                    }),
                    d = null;
                return 1 == c.length && (d = c[0]), d
            }, b.createApi = function(b, c, d) {
                var e = "net.irde.ops.reswue.plugin:" + this.version,
                    f = "54998c15d4335",
                    g = new a.ApiBase(e, f, b, c, d);
                return g
            }, b.createApiNoOperation = function(c, d, e) {
                var f = new a.OperationDataContext(c, "---fake-op---");
                return b.createApi(f, d, e)
            }, b.version = "2.0", b
        }();
        a.Core = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        ! function(a) {
            a[a.Portals = 0] = "Portals", a[a.Links = 1] = "Links", a[a.Polygons = 2] = "Polygons", a[a.Agents = 3] = "Agents", a[a.Alerts = 4] = "Alerts"
        }(a.LayerKind || (a.LayerKind = {}));
        var b = a.LayerKind,
            c = function() {
                function c(b) {
                    this.layerConfig = [{
                        name: "main",
                        displayName: "Main",
                        color: "#FF0000",
                        link: {
                            dashArray: [5, 5, 1, 5],
                            sharedKeysDashArray: [5, 5],
                            opacity: 1,
                            weight: 2
                        },
                        portal: {
                            iconUrl: a.Images.marker_layer_main
                        }
                    }, {
                        name: "groupa",
                        displayName: "Layer A",
                        color: "#ff6600",
                        link: {
                            dashArray: [5, 5, 1, 5],
                            sharedKeysDashArray: [5, 5],
                            opacity: 1,
                            weight: 2
                        },
                        portal: {
                            iconUrl: a.Images.marker_layer_groupa
                        }
                    }, {
                        name: "groupb",
                        displayName: "Layer B",
                        color: "#ff9900",
                        link: {
                            dashArray: [5, 5, 1, 5],
                            sharedKeysDashArray: [5, 5],
                            opacity: 1,
                            weight: 2
                        },
                        portal: {
                            iconUrl: a.Images.marker_layer_groupb
                        }
                    }, {
                        name: "groupc",
                        displayName: "Layer C",
                        color: "#BB9900",
                        link: {
                            dashArray: [5, 5, 1, 5],
                            sharedKeysDashArray: [5, 5],
                            opacity: 1,
                            weight: 2
                        },
                        portal: {
                            iconUrl: a.Images.marker_layer_groupc
                        }
                    }, {
                        name: "groupd",
                        displayName: "Layer D",
                        color: "#bb22cc",
                        link: {
                            dashArray: [5, 5, 1, 5],
                            sharedKeysDashArray: [5, 5],
                            opacity: 1,
                            weight: 2
                        },
                        portal: {
                            iconUrl: a.Images.marker_layer_groupd
                        }
                    }, {
                        name: "groupe",
                        displayName: "Layer E",
                        color: "#33cccc",
                        link: {
                            dashArray: [5, 5, 1, 5],
                            sharedKeysDashArray: [5, 5],
                            opacity: 1,
                            weight: 2
                        },
                        portal: {
                            iconUrl: a.Images.marker_layer_groupe
                        }
                    }, {
                        name: "groupf",
                        displayName: "Layer F",
                        color: "#ff55ff",
                        link: {
                            dashArray: [5, 5, 1, 5],
                            sharedKeysDashArray: [5, 5],
                            opacity: 1,
                            weight: 2
                        },
                        portal: {
                            iconUrl: a.Images.marker_layer_groupf
                        }
                    }], this._layers = [], this._map = b, this._broadcast = new BroadcastChannel("reswue-active-layer"), this.setupPolygonCleanup()
                }
                return Object.defineProperty(c.prototype, "activeLayer", {
                    get: function() {
                        var a = localStorage["reswue-active-layer"];
                        return this.layerConfig.some(function(b) {
                            return b.name == a
                        }) || (a = "main"), a
                    },
                    set: function(a) {
                        a != this.activeLayer && this.layerConfig.some(function(b) {
                            return b.name == a
                        }) && (localStorage["reswue-active-layer"] = a, this._broadcast.postMessage(a))
                    },
                    enumerable: !0,
                    configurable: !0
                }), c.prototype.createLayers = function(a) {
                    var c = L.layerGroup([]);
                    this.addOrReplaceLayer(a, "", a.operationName + " Agent Tracker", b.Agents, c);
                    var d = L.layerGroup([]);
                    this.addOrReplaceLayer(a, "", a.operationName + " Alerts", b.Alerts, d)
                }, c.prototype.removeLayers = function(a) {
                    var b = this;
                    this.getLayers(a, null, null).forEach(function(a) {
                        return b.removeLayerInternal(a)
                    })
                }, c.prototype.removeLayer = function(a, b, c) {
                    var d = this.getLayer(a, b, c);
                    null != d && this.removeLayerInternal(d)
                }, c.prototype.getLayer = function(a, c, d, e) {
                    void 0 === e && (e = !0);
                    var f = this.getLayers(a, c, d),
                        g = null;
                    return 1 == f.length ? g = f[0] : !e || 0 != f.length || null == a || d != b.Portals && d != b.Links && d != b.Polygons || (this.addOrReplaceLayer(a, c, this.getFullLayerDisplayName(a, c, d), d, L.layerGroup([])), g = this.getLayer(a, c, d)), g
                }, c.prototype.getLayers = function(a, b, c) {
                    var d = this._layers.filter(function(d) {
                        return !(null != a && (d.environment != a.environment || d.operationName != a.operationName) || null != b && d.layerName != b || null != c && d.layerKind != c)
                    });
                    return d
                }, c.prototype.cleanLayers = function(a, b) {
                    void 0 === b && (b = null), this.getLayers(a, null, b).forEach(function(a) {
                        return a.layerGroup.clearLayers()
                    })
                }, c.prototype.getLayerConfig = function(a) {
                    var b = null,
                        c = this.layerConfig.filter(function(b) {
                            return b.name == a
                        });
                    return 1 == c.length && (b = c[0]), b
                }, c.prototype.getAllLayerConfigs = function() {
                    return this.layerConfig
                }, c.prototype.addOrReplaceLayer = function(a, b, c, d, e) {
                    if (null == this.getLayer(a, b, d, !1)) {
                        this._layers.push({
                            environment: a.environment,
                            operationName: a.operationName,
                            layerName: b,
                            layerKind: d,
                            layerGroup: e
                        }), window.addLayerGroup(c, e, !0);
                        try {
                            window.layerChooser.getLayers()
                        } catch (f) {
                            console.log(f)
                        }
                    }
                }, c.prototype.removeLayerInternal = function(a) {
                    var b = this._layers.indexOf(a); - 1 == b ? console.warn("layer not found.") : this._layers.splice(b, 1), window.removeLayerGroup(a.layerGroup)
                }, c.prototype.setupPolygonCleanup = function() {
                    var a = this,
                        c = function(a) {
                            a instanceof L.GeodesicPolygon && a.bringToBack()
                        };
                    this._map.on("overlayadd", function(d) {
                        var e = d;
                        a._layers.filter(function(a) {
                            return a.layerKind == b.Polygons
                        }).forEach(function(a) {
                            a.layerGroup === e.layer && a.layerGroup.eachLayer(c)
                        })
                    })
                }, c.prototype.getLayerDisplayName = function(a, b) {
                    var c;
                    c = b instanceof String ? b : b.layerName ? b.layerName : b.name;
                    var d = a.operation;
                    return d.customLayerNames && d.customLayerNames[c] ? d.customLayerNames[c] : b.displayName ? b.displayName : this.getLayerConfig(c).displayName
                }, c.prototype.getFullLayerDisplayName = function(a, c, d) {
                    var e = this.getLayerDisplayName(a, this.getLayerConfig(c)),
                        f = a.operationName + " " + e + " ";
                    switch (d) {
                        case b.Portals:
                            f += "Portals";
                            break;
                        case b.Links:
                            f += "Links";
                            break;
                        case b.Polygons:
                            f += "Polys"
                    }
                    return f
                }, c.prototype.hideLayers = function() {
                    this._layers.forEach(function(a) {
                        a.visible = map.hasLayer(a.layerGroup), a.visible && map.removeLayer(a.layerGroup)
                    })
                }, c.prototype.restoreLayers = function() {
                    this._layers.forEach(function(a) {
                        a.visible && map.addLayer(a.layerGroup)
                    })
                }, c
            }();
        a.LayerManager = c
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b, c) {
                this._core = a, this._layerManager = b, this._preferences = c
            }
            return b.isLoaded = function() {
                return void 0 !== window.plugin.drawTools
            }, b.prototype.init = function() {
                var a = this;
                window.pluginCreateHook("pluginDrawTools"), window.addHook("pluginDrawTools", function(b) {
                    return a.queryAdditionToResWue(b)
                })
            }, b.prototype.exportDrawToolIntoOperation = function() {
                new c(this._core, this._layerManager.activeLayer)
            }, b.prototype.linkExists = function(a, b, c, d) {
                var e = a.data.links.some(function(a, e, f) {
                    return a.portalFrom.id == b && a.portalTo.id == c && a.layerName == d
                });
                return e
            }, b.prototype.queryAdditionToResWue = function(c) {
                if (b.isLoaded() && this._preferences.uploadDrawToolsPolygons && void 0 !== c && null !== c && "layerCreated" === c.event) {
                    var d = c.layer;
                    if (d instanceof L.GeodesicPolygon) {
                        var e = this._core.selectedOperation;
                        if (e.data.operation.isAgentOperator) {
                            var f = {
                                    id: null,
                                    latLngs: d,
                                    color: d.options.color,
                                    description: "",
                                    layerName: this._layerManager.activeLayer
                                },
                                g = new a.PolygonEditDialog(e, this._layerManager, f);
                            g.waitForCreation.then(function() {
                                window.plugin.drawTools.drawnItems.removeLayer(d);
                                var a = L.layerGroup();
                                a.addLayer(d), map.fire("draw:deleted", {
                                    layers: a
                                })
                            })
                        }
                    }
                }
            }, b
        }();
        a.DrawToolAddon = b;
        var c = function() {
            function c(a, c) {
                var d = this;
                if (this._portals = {}, this._links = [], b.isLoaded()) {
                    if (this._core = a, this._layer = c, this._operation = this._core.selectedOperation, !this._operation) return void alert("You have to select an operation first!");
                    this._isProposal = !this._operation.data.operation.isAgentOperator, this._isProposal && alert("Your draw tool plan is added as proposal."), window.plugin.drawTools.drawnItems.eachLayer(function(a) {
                        if (!(a instanceof L.GeodesicCircle) && (a instanceof L.GeodesicPolygon && a.getLatLngs().forEach(function(a, b, c) {
                                var e = c[(b + 1) % c.length];
                                Promise.all([d._addPortal(a), d._addPortal(e)]).then(function() {
                                    d._addLink(a, e)
                                })
                            }), a instanceof L.GeodesicPolyline && a.getLatLngs().forEach(function(a, b, c) {
                                if (0 == b) d._addPortal(a);
                                else {
                                    var e = c[b - 1];
                                    d._addLink(a, e)
                                }
                            }), a instanceof L.Marker)) {
                            var b = a.getLatLng();
                            d._addPortal(b)
                        }
                    });
                    var e = this._links;
                    for (var f in this._portals) e.push(this._portals[f]);
                    Promise.all(e).then(function() {
                        return alert("Import finished.")
                    })["catch"](function(a) {
                        throw alert("Import failed:\n" + a), console.error(a), a
                    })
                }
            }
            return c.prototype._toString = function(a) {
                return a.lat.toFixed(6) + "," + a.lng.toFixed(6)
            }, c.prototype._addPortal = function(b) {
                var c = this,
                    d = this._toString(b);
                if (this._portals[d]) return this._portals[d];
                var e = this._operation.data.portals.filter(function(b) {
                    return c._toString(a.UiHelper.toLatLng(b)) == d
                })[0];
                if (e) return this._portals[d] = Promise.resolve(e);
                var f = window.findPortalGuidByPositionE6(Math.round(1e6 * b.lat), Math.round(1e6 * b.lng));
                if (f) {
                    if (e = this._operation.data.getPortal(f)) return this._portals[d] = Promise.resolve(e);
                    var g = window.portals[f] && window.portals[f].options && window.portals[f].options.data;
                    if (g && g.title) return this._portals[d] = this._operation.portalService.addPortal(f, g.title, this._layer, (g.latE6 / 1e6).toFixed(6), (g.lngE6 / 1e6).toFixed(6), this._isProposal, PLAYER.nickname).then(function(a) {
                        return a.filter(function(a) {
                            return a.id == f
                        })[0]
                    }), this._portals[d]
                }
                return this._portals[d] = Promise.reject("One portal could not be added since it was not visible or is not an exact match on the screen. Terminating import of current drawing."), this._portals[d]
            }, c.prototype._addLink = function(a, b) {
                var c = this,
                    d = Promise.all([this._addPortal(a), this._addPortal(b)]).then(function(a) {
                        var b = a[0],
                            d = a[1];
                        return c._operation.linkService.addLink(b.id, d.id, c._layer, c._isProposal, PLAYER.nickname)
                    });
                return this._links.push(d), d
            }, c
        }()
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b, c, d) {
                this.originalTestLink = null, this._core = a, this._layerManager = b, this._preferences = c, this._map = d
            }
            return b.isLoaded = function() {
                return void 0 !== window.plugin.crossLinks
            }, b.isEnabled = function() {
                return !window.plugin.crossLinks.disabled
            }, b.prototype.enableResWueAlertOverride = function(a) {
                var b = this;
                a ? window.plugin.crossLinks.testLink = function(a) {
                    b.testLinkVsTarget(a)
                } : "function" == typeof this.originalTestLink && (window.plugin.crossLinks.testLink = this.originalTestLink)
            }, b.testAllLinksAgainstLayer = function(a) {
                b.isLoaded() && b.isEnabled() && window.plugin.crossLinks.testAllLinksAgainstLayer(a)
            }, b.prototype.init = function() {
                var c = this;
                b.isLoaded() && a.DrawToolAddon.isLoaded() && (window.addHook("linkAdded", function(a) {
                    return c.onLinkAdded(a)
                }), window.pluginCreateHook("pluginDrawTools"), window.addHook("pluginDrawTools", function(a) {
                    return "layerCreated" !== a.event && setTimeout(function() {
                        return c.checkAllReswueLinks()
                    }, 100), !0
                })), this._map.on("overlayadd", function(a) {
                    var d = a;
                    b.isLoaded() && d.layer === window.plugin.crossLinks.linkLayer && setTimeout(function() {
                        return c.checkAllReswueLinks()
                    }, 100)
                }), b.isLoaded() && (this.originalTestLink = window.plugin.crossLinks.testLink, this.enableResWueAlertOverride(this._preferences.targetCrossLinks))
            }, b.prototype.onLinkAdded = function(a) {
                return b.isLoaded() && b.isEnabled() ? (this.testLink(a.link), !0) : void 0
            }, b.prototype.checkAllReswueLinks = function() {
                var a = this;
                b.isLoaded() && b.isEnabled() && $.each(window.links, function(b, c) {
                    a.testLink(c)
                })
            }, b.prototype.checkAllDrawToolsLinks = function() {
                b.isLoaded() && b.isEnabled() && window.plugin.crossLinks.checkAllLinks()
            }, b.prototype.testLink = function(b) {
                if (!(window.plugin.crossLinks.linkLayerGuids[b.options.guid] || this._preferences.targetCrossLinks === !0 && this.linkIsDestroyTarget(b))) {
                    var c = this._layerManager.getLayers(null, null, a.LayerKind.Links);
                    c.forEach(function(a) {
                        for (var c = 0, d = a.layerGroup.getLayers(); c < d.length; c++) {
                            var e = d[c];
                            if (e instanceof L.GeodesicPolygon) {
                                if (window.plugin.crossLinks.testPolyLine(e, b, !0)) {
                                    window.plugin.crossLinks.showLink(b);
                                    break
                                }
                            } else if (e instanceof L.GeodesicPolyline && window.plugin.crossLinks.testPolyLine(e, b)) {
                                window.plugin.crossLinks.showLink(b);
                                break
                            }
                        }
                    })
                }
            }, b.prototype.testLinkVsTarget = function(a) {
                this.linkIsDestroyTarget(a) || this.originalTestLink(a)
            }, b.prototype.linkIsDestroyTarget = function(a) {
                for (var b = a.getLatLngs(), c = b[0], d = b[1], e = !1, f = 0, g = this._core.operations; f < g.length; f++) {
                    var h = g[f];
                    e = e || h.data.alerts.some(function(a) {
                        if ("DestroyPortalAlert" != a.type && "UseVirusPortalAlert" != a.type && "LetDecayPortalAlert" != a.type) return !1;
                        if (null !== a.resolvedDate && void 0 !== a.resolvedDate) return !1;
                        var b = a.portal;
                        return b ? b.lng == c.lng && b.lat == c.lat ? !0 : b.lng == d.lng && b.lat == d.lat ? !0 : !1 : !1
                    })
                }
                return e
            }, b
        }();
        a.CrossLinksAddon = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b) {
                this._crossLinkAddon = a, this._operation = b
            }
            return a.prototype.bind = function() {
                var a = this;
                this._operation.data.addUpdateNotificationHandler({
                    updateOperation: function(a, b) {},
                    updatePortals: function(a, b) {},
                    updateLinks: function(b, c) {
                        a._crossLinkAddon.checkAllDrawToolsLinks(), a._crossLinkAddon.checkAllReswueLinks()
                    },
                    updatePolygons: function(a, b) {},
                    updateAlerts: function(b, c) {
                        a._crossLinkAddon.checkAllDrawToolsLinks(), a._crossLinkAddon.checkAllReswueLinks()
                    },
                    updateAgents: function(a, b) {},
                    updateGroups: function(a, b) {}
                })
            }, a
        }();
        a.CrossLinksBinder = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b() {}
            return b.getPortal = function(a) {
                if (window.portals[a] && window.portals[a].options.data.title) {
                    var b = window.portals[a].options.data;
                    return {
                        id: a,
                        name: b.title,
                        lat: (b.latE6 / 1e6).toFixed(6),
                        lng: (b.lngE6 / 1e6).toFixed(6)
                    }
                }
                return null
            }, b.getSelectedPortal = function() {
                return window.selectedPortal ? this.getPortal(window.selectedPortal) : null
            }, b.formatAgentDetails = function(a, b) {
                var c = $("<div>");
                b.length > 0 && (c.append(document.createTextNode("Groups: ")), b.forEach(function(a) {
                    var b = $('<div class="reswue-group-container" />').appendTo(c).text(a.groupName).attr("title", a.description);
                    a.color && ($('<div class="reswue-group-indicator" />').css("background-color", a.color).prependTo(b), b.css("border-color", a.color))
                }), c.append("<br>"));
                var d = new Date(1e3 * a.lastKnownLocation.lastSeenTimeStamp),
                    e = d.toDateString() != (new Date).toDateString() ? window.unixTimeToDateTimeString(d) : window.unixTimeToString(d);
                return c.append("Last seen: " + e), c
            }, b.createButtonLeafletControl = function(a, c) {
                var d = new b.EasyButtons;
                return d.options.buttons = c, a && a.addControl(d), d
            }, b.extendLeaflet = function() {
                b.ColoredDivIcon = L.DivIcon.extend({
                    createIcon: function() {
                        var a = L.DivIcon.prototype.createIcon.apply(this, arguments);
                        return this.options.color && (a.style.color = this.options.color), a
                    }
                }), b.AgentIcon = L.Icon.extend({
                    options: {
                        shadowUrl: null,
                        iconSize: [26, 42],
                        iconAnchor: [13, 42],
                        popupAnchor: [0, -36],
                        groups: [],
                        picture: null
                    },
                    createIcon: function(b) {
                        var c = b && "DIV" === b.tagName ? b : document.createElement("div"),
                            d = this.options,
                            e = [];
                        if (c.innerHTML = atob(a.Images.marker_agent.split(/,/)[1]), e = d.groups.filter(function(a) {
                                return !!a.color
                            }), e.length > 0) {
                            var f = c.getElementsByClassName("groupColors")[0];
                            f.innerHTML = "";
                            var g = e.length;
                            e.forEach(function(a, b) {
                                var c = 0 === b ? -.1 : b / g,
                                    d = b == g - 1 ? 1.1 : (b + 1) / g,
                                    e = document.createElementNS("http://www.w3.org/2000/svg", "path");
                                e.setAttribute("d", "M " + c + ",0 " + d + ",0 0.5,1"), e.style.fill = a.color, e.style.stroke = "none", f.appendChild(e)
                            })
                        }
                        return d.picture && c.getElementsByClassName("avatar")[0].setAttribute("xlink:href", d.picture), this._setIconStyles(c, "icon"), c
                    },
                    createShadow: function() {
                        return null
                    }
                }), b.EasyButtons = L.Control.extend({
                    options: {
                        position: "topleft",
                        buttons: [{
                            btnId: "",
                            btnTitle: "",
                            btnIcon: "fa-circle-o",
                            btnFunction: null
                        }]
                    },
                    onAdd: function() {
                        var a = this,
                            b = L.DomUtil.create("div", "leaflet-bar leaflet-control reswue-toolbar");
                        return this.options.buttons.forEach(function(c) {
                            var d = L.DomUtil.create("a", "leaflet-bar-part", b);
                            a._addImage(d, c.btnIcon, c.btnId), d.href = "#", d.title = c.btnTitle, L.DomEvent.on(d, "click", function(a) {
                                L.DomEvent.stopPropagation(a), L.DomEvent.preventDefault(a), c.btnFunction()
                            }, a)
                        }), b
                    },
                    _addImage: function(a, b, c) {
                        if (null != b) {
                            var d = L.DomUtil.create("img", "", a);
                            d.id = c, d.src = b, d.width = 16, d.height = 16, d.setAttribute("style", "vertical-align:middle;align:center;")
                        }
                    }
                })
            }, b.lookupEnvironmentName = function(a) {
                try {
                    var b = JSON.parse(localStorage["reswue-environment-data"]);
                    if (b.environments[a]) return b.environments[a]
                } catch (c) {}
                try {
                    if (a == localStorage["reswue-environment-extra"]) return "DEV Env LocalStorage"
                } catch (c) {}
                return ""
            }, b.toLatLng = function(a, b) {
                return void 0 === b && "object" == typeof a && (b = a.lng, a = a.lat), L.latLng(parseFloat(a), parseFloat(b))
            }, b.getPortalLink = function(a) {
                var c = b.toLatLng(a),
                    d = a.lat + "," + a.lng,
                    e = document.createElement("a");
                return e.appendChild(document.createTextNode(a.name)), e.title = a.name, e.href = "/intel?ll=" + d + "&pll=" + d, e.addEventListener("click", function(b) {
                    return window.selectedPortal != a.id ? window.renderPortalDetails(a.id) : map.panTo(c), b.preventDefault(), !1
                }, !1), e.addEventListener("dblclick", function(b) {
                    return map.getBounds().contains(c) ? (window.portals[a.id] || window.renderPortalDetails(a.id), window.zoomToAndShowPortal(a.id, c)) : (map.panTo(c), window.renderPortalDetails(a.id)), b.preventDefault(), !1
                }, !1), e
            }, b
        }();
        a.UiHelper = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b) {
                this._core = a, this._layerManager = b
            }
            return b.isLoaded = function() {
                return !0
            }, b.prototype.init = function() {
                var a = this;
                window.addHook("search", function(b) {
                    return a.onSearch(b), !0
                })
            }, b.prototype.onSearch = function(a) {
                var b = this,
                    c = a.term.toLowerCase();
                this._core.operations.forEach(function(d) {
                    d.data.portals.forEach(function(e) {
                        (e.name.toLowerCase().indexOf(c) > -1 || e.description.toLowerCase().indexOf(c) > -1) && b.addPortalToResult(a, d, e)
                    });
                    var e = {};
                    d.data.groups.forEach(function(a) {
                        a.groupName.toLowerCase().indexOf(c) > -1 && a.members.forEach(function(a) {
                            e[a] = !0
                        })
                    }), d.data.agents.forEach(function(f) {
                        if (f.lastKnownLocation) {
                            var g = f.firstName + " " + f.lastName;
                            (e[f.agentName] || f.agentName.toLowerCase().indexOf(c) > -1 || g.toLowerCase().indexOf(c) > -1) && b.addAgentToResult(a, d, f, g)
                        }
                    }), d.data.polygons.forEach(function(e) {
                        e.description.toLowerCase().indexOf(c) > -1 && b.addPolygonToResult(a, d, e)
                    }), d.data.alerts.forEach(function(e) {
                        null !== e.resolvedDate && void 0 !== e.resolvedDate || !e.portal || (e.comment.toLowerCase().indexOf(c) > -1 || e.portal.name.toLowerCase().indexOf(c) > -1) && b.addAlertToResult(a, d, e)
                    })
                })
            }, b.prototype.getLayerDisplayName = function(a, b) {
                return this._layerManager.getLayerDisplayName(b.data, a)
            }, b.prototype.onSearchResultSelected = function(b, c) {
                var d = b.reswueOperation;
                switch (b.reswueType) {
                    case "portal":
                        var e = b.reswueData,
                            f = this._layerManager.getLayer(d.data, e.layerName, a.LayerKind.Portals).layerGroup;
                        return map.addLayer(f), f.getLayers().some(function(a) {
                            return a instanceof L.Marker ? a.options.guid !== e.id ? !1 : (window.map.getBounds().contains(b.position) || window.map.setView(b.position), a.openPopup(), !0) : !1
                        });
                    case "agent":
                        var g = b.reswueData,
                            h = this._layerManager.getLayer(d.data, "", a.LayerKind.Agents).layerGroup;
                        return map.addLayer(h), h.getLayers().some(function(a) {
                            return a instanceof L.Marker ? a.options.key !== g.key ? !1 : (map.getBounds().contains(b.position) || map.setView(b.position), a.openPopup(), !0) : !1
                        });
                    case "polygon":
                        var i = b.reswueData,
                            j = this._layerManager.getLayer(d.data, i.layerName, a.LayerKind.Polygons).layerGroup;
                        map.addLayer(j);
                        break;
                    case "alert":
                        var k = b.reswueData;
                        if ("MessageAlert" == k.type) return !0;
                        var l = this._layerManager.getLayer(d.data, "", a.LayerKind.Alerts).layerGroup;
                        return map.addLayer(l), l.getLayers().some(function(a) {
                            return a instanceof L.Marker ? a.options.id !== k.id ? !1 : (map.getBounds().contains(b.position) || map.setView(b.position), a.openPopup(), !0) : !1
                        });
                    default:
                        console.warn("ResWue: don't know how to handle search result: ", b)
                }
                return !1
            }, b.prototype.addPortalToResult = function(b, c, d) {
                var e = this,
                    f = this._layerManager.getLayerConfig(d.layerName),
                    g = this.replacePatternInDataUri(a.Images.search_portal, /%COLOR%/g, f.color);
                b.addResult({
                    title: window.escapeHtmlSpecialChars(d.name),
                    description: "Portal in " + this.getLayerDisplayName(f, c) + "<br>" + window.escapeHtmlSpecialChars(d.description),
                    position: L.latLng(Number(d.lat), Number(d.lng)),
                    icon: g,
                    onSelected: function(a, b) {
                        return e.onSearchResultSelected(a, b)
                    },
                    reswueType: "portal",
                    reswueData: d,
                    reswueOperation: c
                })
            }, b.prototype.replacePatternInDataUri = function(a, b, c) {
                var d = a.split(/,/);
                return d[0] + "," + btoa(atob(d[1]).replace(b, c))
            }, b.prototype.addAgentToResult = function(b, c, d, e) {
                var f = this,
                    g = '<mark class="nickname help res">' + window.escapeHtmlSpecialChars(d.agentName) + "</mark>";
                "" !== e.trim() && (g += " (" + window.escapeHtmlSpecialChars(e) + ")");
                var h = a.Analyzer.getGroupsForAgent(c.data, d.agentName);
                b.addResult({
                    title: g,
                    description: a.UiHelper.formatAgentDetails(d, h),
                    position: L.latLng(Number(d.lastKnownLocation.lat), Number(d.lastKnownLocation.lng)),
                    icon: a.Images.search_agent,
                    onSelected: function(a, b) {
                        return f.onSearchResultSelected(a, b)
                    },
                    reswueType: "agent",
                    reswueData: d,
                    reswueOperation: c
                })
            }, b.prototype.addPolygonToResult = function(b, c, d) {
                var e = this,
                    f = this._layerManager.getLayerConfig(d.layerName),
                    g = d.color || "#0033ff",
                    h = this.replacePatternInDataUri(a.Images.search_polygon, /%COLOR%/g, g);
                b.addResult({
                    title: window.escapeHtmlSpecialChars(d.description),
                    description: "Polygon in " + this.getLayerDisplayName(f, c),
                    bounds: L.latLngBounds(d.latLngs),
                    icon: h,
                    onSelected: function(a, b) {
                        return e.onSearchResultSelected(a, b)
                    },
                    reswueType: "polygon",
                    reswueData: d,
                    reswueOperation: c
                })
            }, b.prototype.addAlertToResult = function(b, c, d) {
                var e = this;
                b.addResult({
                    title: d.type + " on " + window.escapeHtmlSpecialChars(d.portal.name),
                    description: window.escapeHtmlSpecialChars(d.comment),
                    position: L.latLng(Number(d.portal.lat), Number(d.portal.lng)),
                    icon: a.getAlertType(d.type).searchIcon,
                    onSelected: function(a, b) {
                        return e.onSearchResultSelected(a, b)
                    },
                    reswueType: "alert",
                    reswueData: d,
                    reswueOperation: c
                })
            }, b
        }();
        a.IitcSearchAddon = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a) {
                this._layerManager = a
            }
            return b.isLoaded = function() {
                return void 0 !== window.plugin.linkShowDirection && void 0 !== window.plugin.linkShowDirection.addAllLinkStyles
            }, b.addLine = function(a) {
                b.isLoaded() && null !== window.plugin.linkShowDirection.dashArray && void 0 !== window.plugin.linkShowDirection.dashArray && window.plugin.linkShowDirection.addLinkStyle(a)
            }, b.prototype.init = function() {
                var a = this;
                b.isLoaded() && (this._original = window.plugin.linkShowDirection.addAllLinkStyles, window.plugin.linkShowDirection.addAllLinkStyles = function() {
                    return a.addAllLinkStyles()
                })
            }, b.prototype.addAllLinkStyles = function() {
                var b = this,
                    c = this._layerManager.getLayers(null, null, a.LayerKind.Links);
                return c.forEach(null === window.plugin.linkShowDirection.dashArray || void 0 === window.plugin.linkShowDirection.dashArray ? function(a) {
                    var c = b._layerManager.getLayerConfig(a.layerName),
                        d = {
                            dashArray: c.link.dashArray
                        };
                    a.layerGroup.eachLayer(function(a) {
                        var b;
                        b.setStyle(d)
                    })
                } : function(a) {
                    a.layerGroup.eachLayer(window.plugin.linkShowDirection.addLinkStyle, window.plugin.linkShowDirection)
                }), this._original()
            }, b
        }();
        a.LinkShowDirectionAddon = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(b) {
                var c = this;
                this._layerManager = b, a.isLoaded() && (this._original = window.plugin.privacyView.toggle, window.plugin.privacyView.toggle = function() {
                    return c._toggle()
                })
            }
            return a.isLoaded = function() {
                return void 0 !== window.plugin.privacyView && void 0 !== window.plugin.privacyView.toggle
            }, a.prototype._toggle = function() {
                this._original.call(window.plugin.privacyView), document.body.classList.contains("privacy_active") ? this._layerManager.hideLayers() : this._layerManager.restoreLayers()
            }, a
        }();
        a.PrivacyViewAddon = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a() {
                this._store = this.getStore()
            }
            return a.prototype.isAgentVisible = function(a, b, c) {
                var d = this._store[a + "_" + b + "_" + c.agentName];
                return void 0 === d && (d = !0), d
            }, a.prototype.setVisibility = function(a, b, c, d) {
                this._store[a + "_" + b + "_" + c.agentName] = d, this.setStore(this._store)
            }, a.prototype.getStore = function() {
                var a = {};
                try {
                    a = JSON.parse(localStorage["reswue-hidden-agents"])
                } catch (b) {}
                return a
            }, a.prototype.setStore = function(a) {
                localStorage["reswue-hidden-agents"] = JSON.stringify(a)
            }, a
        }();
        a.AgentVisibilityManager = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a() {}
            return a.countActiveAlerts = function(a) {
                var b = 0;
                return a.forEach(function(a) {
                    "MessageAlert" === a.type || null !== a.resolvedDate && void 0 !== a.resolvedDate || b++
                }), b
            }, a.getGroupsForAgent = function(a, b) {
                return b = b.toLowerCase(), a.groups.filter(function(a) {
                    return a.members ? a.members.some(function(a) {
                        return a.toLowerCase() == b
                    }) : !1
                }).sort(function(a, b) {
                    return a.groupName < b.groupName ? -1 : a.groupName > b.groupName ? 1 : a.key < b.key ? -1 : a.key > b.key ? 1 : 0
                })
            }, a.getAgentOrGroup = function(a, b) {
                for (var c = a.agents, d = a.groups, e = 0, f = void 0; f = c[e]; e++)
                    if (f.key == b) return {
                        type: "agent",
                        assignee: f
                    };
                for (var e = 0, g = void 0; g = d[e]; e++)
                    if (g.key == b) return "all" == b ? {
                        type: "all",
                        assignee: g
                    } : {
                        type: "group",
                        assignee: g
                    };
                return null
            }, a.isMyAlert = function(b, c) {
                var d = a.getAgentOrGroup(b, c.assignee.key);
                if (!d) return !1;
                var e = PLAYER.nickname.toLowerCase();
                switch (d.type) {
                    case "agent":
                        var f = d.assignee;
                        return f.agentName.toLowerCase() == e;
                    case "group":
                        var g = d.assignee;
                        return g.members.some(function(a) {
                            return a.toLowerCase() == e
                        });
                    case "all":
                    default:
                        return !1
                }
            }, a.getLinkCoordinates = function(a, b) {
                var c = a.getPortal(b.portalFrom.id),
                    d = a.getPortal(b.portalTo.id);
                return [
                    [c.lat, c.lng],
                    [d.lat, d.lng]
                ]
            }, a
        }();
        a.Analyzer = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a) {
                this.agents = [a], null !== a.lastKnownLocation && void 0 !== a.lastKnownLocation && (this.position = {
                    lat: a.lastKnownLocation.lat,
                    lng: a.lastKnownLocation.lng
                })
            }
            return a.analyzeAgentGroupPins = function(b, c, d) {
                var e = this,
                    f = [];
                return b.forEach(function(b) {
                    if (null !== b.lastKnownLocation && void 0 !== b.lastKnownLocation) {
                        var c = !1;
                        0 == d && f.forEach(function(a) {
                            !c && e.getDistance(a, b) < 50 && (a.agents.push(b), a.position = e.calculatePosition(a), c = !0)
                        }), c || f.push(new a(b))
                    }
                }), f
            }, a.getDistance = function(a, b) {
                var c = L.latLng([a.position.lat, a.position.lng]).distanceTo([b.lastKnownLocation.lat, b.lastKnownLocation.lng]);
                return c
            }, a.calculatePosition = function(a) {
                var b = 0,
                    c = 0;
                return a.agents.forEach(function(a) {
                    b += a.lastKnownLocation.lat, c += a.lastKnownLocation.lng
                }), b /= a.agents.length, c /= a.agents.length, {
                    lat: b,
                    lng: c
                }
            }, a
        }();
        a.AgentGroupPin = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        function b(b) {
            for (var c = 0, d = a.alertTypes.length; d > c; c++) {
                var e = a.alertTypes[c];
                if (e.name == b) return e
            }
            return {
                name: b,
                label: b.replace(/(Portal)?Alert$/, ""),
                markerIcon: a.Images.marker_alert_unknown,
                searchIcon: a.Images.search_alert_unknown,
                color: "#FFF"
            }
        }
        a.getAlertType = b, a.alertTypes = [{
            name: "DestroyPortalAlert",
            label: "destroy",
            color: "#CE3B37",
            markerIcon: a.Images.marker_alert_destroy,
            searchIcon: a.Images.search_alert_destroy
        }, {
            name: "UseVirusPortalAlert",
            label: "use virus",
            color: "#8920C3",
            markerIcon: a.Images.marker_alert_virus,
            searchIcon: a.Images.search_alert_virus
        }, {
            name: "LetDecayPortalAlert",
            label: "let decay",
            color: "#7D7D7D",
            searchIcon: a.Images.search_alert_decay,
            markerIcon: a.Images.marker_alert_decay
        }, {
            name: "CreateLinkAlert",
            label: "link",
            color: "#5994FF",
            markerIcon: a.Images.marker_alert_link,
            searchIcon: a.Images.search_alert_link
        }, {
            name: "GotoPortalAlert",
            label: "go to",
            color: "#EDA032",
            markerIcon: a.Images.marker_alert_goto,
            searchIcon: a.Images.search_alert_goto
        }, {
            name: "UpgradePortalAlert",
            label: "upgrade",
            color: "#3679B4",
            markerIcon: a.Images.marker_alert_upgrade,
            searchIcon: a.Images.search_alert_upgrade
        }, {
            name: "FarmPortalAlert",
            label: "farm",
            color: "#53AD53",
            markerIcon: a.Images.marker_alert_farm,
            searchIcon: a.Images.search_alert_farm
        }, {
            name: "MessageAlert",
            label: "message",
            color: "transparent",
            markerIcon: a.Images.marker_alert_unknown,
            searchIcon: a.Images.search_alert_message
        }]
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b, c) {
                this._layerManager = a, this._preferences = b, this._operation = c, this.isAgentOperator = c.data.operation.isAgentOperator
            }
            return a.prototype.addPopup = function(a, b, c) {
                a.bindPopup(b, c), window.setupTooltips($(a._icon)), window.registerMarkerForOMS && (window.registerMarkerForOMS(a), a.off("click", a.togglePopup, a), a.on("spiderfiedclick", a.togglePopup, a));
                var d = window.registerMarkerForOMS ? "spiderfiedclick" : "click";
                a.on(d + " mouseout", function() {
                    var b = $(a._icon).tooltip("instance");
                    b && (b.options.hide = !1, b.close())
                })
            }, a.prototype.getLayerName = function(a) {
                return this._layerManager.getLayerDisplayName(this._operation.data, a)
            }, a
        }();
        a.MapItem = b
    }(ResWue || (ResWue = {}));
    var __extends = this.__extends || function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
            c.prototype = b.prototype, a.prototype = new c
        },
        ResWue;
    ! function(a) {
        var b = function(b) {
            function c(a, c, d, e, f) {
                this._layer = e, this._pin = f, b.call(this, a, c, d)
            }
            return __extends(c, b), c.prototype.render = function() {
                var b = this;
                this._agent = this._pin.agents[0];
                var c = 1 == this._pin.agents.length,
                    d = this._pin.agents[0],
                    e = [this._pin.position.lat, this._pin.position.lng],
                    f = "",
                    g = 1;
                this._pin.agents.forEach(function(a) {
                    var c = "";
                    a.nickname && (c = a.nickname.trim()), c.length || (c = a.agentName), f += c, g < b._pin.agents.length && (f += ", "), g++
                });
                var h = this._pin.agents.map(function(c) {
                        return a.Analyzer.getGroupsForAgent(b._operation.data, c.agentName)
                    }).reduce(function(a, b) {
                        return a.concat(b)
                    }, []).filter(function(a, b, c) {
                        return c.indexOf(a) == b
                    }),
                    i = Math.max.apply(Math, this._pin.agents.map(function(a) {
                        return a.lastKnownLocation.lastSeenTimeStamp
                    })),
                    j = c ? d.picture : void 0,
                    k = this._pin.agents.map(function(a) {
                        return a.key
                    }).join("-"),
                    l = L.marker(e, {
                        title: f,
                        icon: new a.UiHelper.AgentIcon({
                            picture: j,
                            groups: h
                        }),
                        opacity: this.getOpacity(1e3 * i),
                        key: k
                    }).addTo(this._layer.layerGroup),
                    m = $('<div class="reswue-agent-popup reswue-popup">');
                this._pin.agents.forEach(function(c) {
                    var d = a.Analyzer.getGroupsForAgent(b._operation.data, c.agentName);
                    if (c.picture) {
                        var e = $('<img class="avatar" alt="agent\'s avatar picture" />').attr({
                            src: c.picture
                        });
                        c.googleUrl ? $('<a target="_blank">').appendTo(m).append(e).prop({
                            href: c.googleUrl
                        }) : e.appendTo(m)
                    }
                    if ($("<strong>").appendTo(m).append($('<mark class="nickname help res">').text(c.agentName)), c.firstName || c.lastName) {
                        m.append(" (+");
                        var f = $('<a target="_blank">').appendTo(m).text(c.firstName + " " + c.lastName);
                        c.googleUrl && f.prop({
                            href: c.googleUrl
                        }), m.append(")")
                    }
                    m.append(a.UiHelper.formatAgentDetails(c, d)).append($("<br>").css("clear", "both"))
                }), this.addPopup(l, m[0], {
                    minWidth: this._pin.agents.some(function(a) {
                        return void 0 !== a.picture
                    }) ? 275 : 175
                }), this._preferences.showAgentNames && L.marker(e, {
                    icon: L.divIcon({
                        className: "reswue-agent-label",
                        clickable: !1,
                        html: window.escapeHtmlSpecialChars(f),
                        iconSize: L.point(80, 23),
                        iconAnchor: L.point(40, -5)
                    }),
                    zIndexOffset: 1e3
                }).addTo(this._layer.layerGroup)
            }, c.prototype.getOpacity = function(a) {
                var b = 1,
                    c = new Date(a).getTime(),
                    d = (new Date).getTime(),
                    e = (d - c) / 6e4;
                return b = e > 180 ? .5 : 1 - e / 360
            }, c
        }(a.MapItem);
        a.MapAgent = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function(b) {
            function c(a, c, d, e, f) {
                this._layer = e, this._alert = f, b.call(this, a, c, d)
            }
            return __extends(c, b), c.prototype.render = function() {
                var b = this,
                    c = a.getAlertType(this._alert.type).markerIcon,
                    d = L.icon({
                        iconUrl: c,
                        shadowUrl: null,
                        iconSize: L.point(25, 41),
                        iconAnchor: L.point(25, 41),
                        popupAnchor: L.point(-1, -48)
                    }),
                    e = 1;
                this._alert.isScheduled && (e = .5);
                var f = L.marker(a.UiHelper.toLatLng(this._alert.portal), {
                        title: this._alert.portal.name + (this._alert.comment ? " (" + this._alert.comment + ")" : ""),
                        icon: d,
                        opacity: e,
                        id: this._alert.id
                    }).addTo(this._layer.layerGroup),
                    g = document.createElement("div");
                g.className = "reswue-popup alert";
                var h = g.appendChild(document.createElement("p")),
                    i = h.appendChild(document.createElement("strong"));
                i.appendChild(a.UiHelper.getPortalLink(this._alert.portal)), h = g.appendChild(document.createElement("p"));
                var j = h.appendChild(document.createElement("small"));
                j.appendChild(document.createTextNode(this._alert.isScheduled ? "Scheduled " + this._alert.type + " in " : this._alert.type + " in "));
                var k = j.appendChild(document.createElement("span"));
                k.textContent = this._operation.data.operation.name, k.className = "help", k.title = "Environment: " + a.UiHelper.lookupEnvironmentName(this._operation.data.environment), h = g.appendChild(document.createElement("p")), h.textContent = "Assigned to: " + ("all" == this._alert.assignee.key ? "All" : this._alert.assignee.name);
                var l = null;
                if ("CreateLinkAlert" == this._alert.type && void 0 != this._alert.linkTarget && null != this._alert.linkTarget) {
                    h = g.appendChild(document.createElement("p")), h.textContent = "Link target: ";
                    var m = h.appendChild(document.createElement("strong"));
                    m.appendChild(a.UiHelper.getPortalLink(this._alert.linkTarget)), l = L.layerGroup(), L.geodesicPolyline([a.UiHelper.toLatLng(this._alert.portal), a.UiHelper.toLatLng(this._alert.linkTarget)], {
                        weight: 3,
                        color: "#729fcf"
                    }).addTo(l), L.geodesicPolyline([a.UiHelper.toLatLng(this._alert.portal), a.UiHelper.toLatLng(this._alert.linkTarget)], {
                        weight: 1,
                        color: "#204a87",
                        dashArray: [5, 5]
                    }).addTo(l)
                }
                if (this._alert.comment) {
                    var n = g.appendChild(document.createElement("div"));
                    n.className = "desc", n.innerHTML = window.markdown.toHTML(this._alert.comment)
                }
                h = g.appendChild(document.createElement("p")), h.className = "ui-dialog-buttonset";
                var o = h.appendChild(document.createElement("button"));
                o.textContent = "resolve", o.addEventListener("click", function(a) {
                    confirm("Do you really want to resolve this alert?") && b._operation.alertService.resolveAlert(b._alert.id, PLAYER.nickname)["catch"](function(a) {
                        alert(a.message)
                    })
                }, !1), this._operation.data.operation.isAgentOperator && (o = h.appendChild(document.createElement("button")), o.textContent = "Resolve As Other", o.addEventListener("click", function(a) {
                    //20160906 AGL
                    var otherPlayer = document.getElementById("otherPlayer").value;
                    console.log(otherPlayer);
                    if (otherPlayer !== "" && otherPlayer !== null) {
                        confirm("Do you really want to resolve this alert as " + otherPlayer + "?") && b._operation.alertService.resolveAlert(b._alert.id, otherPlayer)["catch"](function(a) {
                            alert(a.message)
                        })
                    }
                    else {
                        alert('You must fill in an Agent Name to Resolve as another agent');
                    }
                }, !1)), this._operation.data.operation.isAgentOperator && (o = h.appendChild(document.createElement("button")), o.textContent = "delete", o.addEventListener("click", function(a) {
                    confirm("Do you really want to delete this alert?") && b._operation.alertService.deleteAlert(b._alert.id, PLAYER.nickname)["catch"](function(a) {
                        alert(a.message)
                    })
                }, !1)),(o=h.appendChild(document.createElement("br"))) && (o=h.appendChild(document.createElement("input")),o.id="otherPlayer"), "undefined" != typeof android && android && android.intentPosLink  &&
                    (o = h.appendChild(document.createElement("button")), o.textContent = "share", o.addEventListener("click", function(a) {
                    android.intentPosLink(parseFloat(b._alert.portal.lat), parseFloat(b._alert.portal.lng), map.getZoom(), b._alert.portal.name, !0)
                }, !1)), this.addPopup(f, L.popup({
                    maxWidth: 1e3
                }).on("open", function() {
                    l && b._layer.layerGroup.addLayer(l)
                }).on("close", function() {
                    l && b._layer.layerGroup.removeLayer(l)
                }).setContent(g))
            }, c
        }(a.MapItem);
        a.MapAlert = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b() {}
            return b.addPortal = function(b, c, d, e, f) {
                if (void 0 === e && (e = ""), void 0 === f && (f = !1), !d) return void alert("Please select a portal first!");
                var g = c instanceof a.LayerManager ? c.activeLayer : c,
                    h = !b.data.operation.isAgentOperator;
                return b.portalService.addPortal(d.id, d.name, g, d.lat, d.lng, h, PLAYER.nickname, e).then(function(a) {
                    return h && alert("Portal proposed. Thanks You."), a
                }, function(c) {
                    if (c instanceof a.ApiError && 409 == c.statusCode) {
                        if (f) return b.data.portals;
                        alert(h ? "Portal already proposed." : "Portal already added.")
                    }
                    throw c
                })
            }, b.editPortal = function(a, b, c, d, e) {
                return b.layerName = c, b.description = d, b.keysFarmed = e, a.portalService.editPortal(b, PLAYER.nickname)
            }, b.swapPortal = function(c, d, e) {
                if (!c.data.operation.isAgentOperator) return void alert("You cannot delete a portal if you are not an operation admin.");
                if (null == d || null == e) return alert("Please select the portal you want to swap with."), Promise.reject("no portal selected");
                if (d == e) return alert("The source and target portal of the swap are identical."), Promise.reject("portals are identical");
                var f = c.data.getPortal(d),
                    g = c.data.getPortal(e);
                if (null == f && (j = [g, f, e, d], f = j[0], g = j[1], d = j[2], e = j[3]), null == f) return alert("None of these portals is part of the operation."), Promise.reject("both portals not in operation");
                if (null != g) return confirm("Do you really want to swap these two portals?\n\n" + f.name + "\n" + g.name) ? c.portalService.swapPortals(d, e) : Promise.reject("user cancelled");
                var h = a.UiHelper.getPortal(e);
                if (!h) return void alert("The target portal hasn't loaded completely yet.");
                if (!confirm('This will add the portal "' + h.name + '" to the operation and move all links of portal "' + f.name + '" to the newly added portal.\n\nDo you want to continue?')) return Promise.reject("user cancelled");
                var i = confirm('Do you want to *delete* the portal "' + f.name + '" after the portals have been swapped?');
                return b.addPortal(c, f.layerName, h, f.description, !0).then(function(a) {
                    return c.portalService.swapPortals(d, e)
                }).then(function(a) {
                    return i ? c.portalService.deletePortal(d, PLAYER.nickname) : a
                });
                var j
            }, b.deletePortal = function(a, b) {
                if (!a.data.operation.isAgentOperator) return void alert("You cannot delete a portal if you are not an operation admin.");
                var c = a.data.getPortal(b);
                if (confirm("Do you really want to delete this portal, including all incoming and outgoing links?\n\n" + c.name)) return a.portalService.deletePortal(b, PLAYER.nickname)
            }, b.addLink = function(a, b, c, d, e) {
                var f = !a.data.operation.isAgentOperator;
                if ("" == c || "" == d || null == c || null == c) alert("Either the source or the target are not set.");
                else if (c != d) {
                    var g = a.data.getPortal(c),
                        h = a.data.getPortal(d);
                    null != g && null != h ? a.linkService.addLink(c, d, b.activeLayer, f, PLAYER.nickname, e).then(function() {
                        f && alert("Link proposed. Thanks You.")
                    }, function(a) {
                        alert(a.message)
                    }) : alert("Either the source or target portal is not a portal in the current operation (check if the portals belong to the same operation).")
                } else alert("The source and target portal of the link are identical.")
            }, b
        }();
        a.UiCommands = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(b, c, d, e) {
                var f = this;
                this._portal = null, this._operation = b, this._dashboard = c, this._layerManager = d, this._portal = e, this._table = new a.Sortable, this._table.fields = [{
                    name: "Layer",
                    value: function(a) {
                        return a.layerName
                    },
                    sortValue: function(a) {
                        for (var b = f._layerManager.getAllLayerConfigs(), c = 0; c < b.length; c++)
                            if (b[c].name == a) return c
                    },
                    format: function(b, c) {
                        var d = new a.LayerSelector(f._layerManager, f._operation.data, !1);
                        d.layerName = c, d.disabled = !0, d.label = !1, b.appendChild(d.container)
                    }
                }, {
                    name: "Description",
                    value: function(a) {
                        return a.description
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(a, b) {
                        a.className = "desc", a.innerHTML = window.markdown.toHTML(window.escapeHtmlSpecialChars(b))
                    }
                }, {
                    name: "From",
                    value: function(a) {
                        return f._operation.data.getPortal(a.portalFrom.id)
                    },
                    sortValue: function(a) {
                        return a.name
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(b, c) {
                        if (b.colSpan = 2, b.appendChild(a.UiHelper.getPortalLink(c)), c.description) {
                            var d = b.appendChild(document.createElement("div"));
                            d.className = "desc", d.innerHTML = window.markdown.toHTML(window.escapeHtmlSpecialChars(c.description))
                        }
                    }
                }, {
                    name: "Desc.",
                    title: "From Portal Description",
                    value: function(a) {
                        return f._operation.data.getPortal(a.portalFrom.id)
                    },
                    sortValue: function(a) {
                        return a.description
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(a, b) {
                        a.style.display = "none"
                    }
                }, {
                    name: "To",
                    value: function(a) {
                        return f._operation.data.getPortal(a.portalTo.id)
                    },
                    sortValue: function(a) {
                        return a.name
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(b, c) {
                        if (b.colSpan = 2, b.appendChild(a.UiHelper.getPortalLink(c)), c.description) {
                            var d = b.appendChild(document.createElement("div"));
                            d.className = "desc", d.innerHTML = window.markdown.toHTML(window.escapeHtmlSpecialChars(c.description))
                        }
                    }
                }, {
                    name: "Desc",
                    title: "To Portal Description",
                    value: function(a) {
                        return f._operation.data.getPortal(a.portalTo.id)
                    },
                    sortValue: function(a) {
                        return a.description
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(a, b) {
                        a.style.display = "none"
                    }
                }, {
                    name: "Keys",
                    value: function(a) {
                        return a.keysShared
                    },
                    format: function(a, b) {
                        a.classList.add("keys"), a.textContent = b
                    }
                }, {
                    name: "Length",
                    value: function(a) {
                        return f.getLinkLength(a)
                    },
                    format: function(a, b) {
                        a.classList.add("length"), a.textContent = b > 1e3 ? (b / 1e3).toFixed(1) + "km" : b.toFixed(1) + "m"
                    }
                }, {
                    name: "Min Lvl",
                    title: "Minimum level required on source portal",
                    value: function(a) {
                        return f.getLinkLength(a)
                    },
                    format: function(a, b) {
                        var c;
                        if (b > 6881280) c = "impossible";
                        else if (b > 1966080) c = "L8+some VRLA", a.title = "Depending on the number and type Link Amps used, a lower source portal level might suffice.", a.classList.add("help");
                        else if (b > 655360) c = "L8+some LA", a.title = "Depending on the number and type Link Amps used, a lower source portal level might suffice.", a.classList.add("help");
                        else {
                            var d = Math.max(1, Math.ceil(8 * Math.pow(b / 160, .25)) / 8),
                                e = 8 * (d - Math.floor(d));
                            c = "L" + d, 0 != e && (1 & e || (c += " "), 1 & e || 2 & e || (c += " "), c += " = L" + Math.floor(d) + "0⅛¼⅜½⅝¾⅞".charAt(e))
                        }
                        a.textContent = c
                    }
                }, {
                    name: "",
                    sort: null,
                    value: function(a) {
                        return a
                    },
                    format: function(a, b) {
                        return f.makeMenu(a, b)
                    }
                }], this._table.sortBy = 1, this._setLinks();
                var g = this._operation.data.addUpdateNotificationHandler({
                        updateOperation: function(a, b) {},
                        updatePortals: function(a, b) {
                            f._setLinks()
                        },
                        updateLinks: function(a, b) {
                            f._setLinks()
                        },
                        updatePolygons: function(a, b) {},
                        updateAlerts: function(a, b) {},
                        updateAgents: function(a, b) {},
                        updateGroups: function(a, b) {}
                    }),
                    h = window.dialog({
                        html: this._table.table,
                        dialogClass: "reswue-dialog reswue-dialog-linklist",
                        title: this._operation.getDisplayName() + " Links",
                        width: "auto",
                        closeCallback: function() {
                            f._operation.data.removeUpdateNotificationHandler(g)
                        }
                    }),
                    i = h.dialog("option", "buttons");
                h.dialog("option", "buttons", $.extend({}, {
                    "Add links": function(b) {
                        f._portal && window.renderPortalDetails(e), a.LinkDialog.show(f._operation, f._dashboard, f._layerManager)
                    }
                }, i))
            }
            return b.prototype._setLinks = function() {
                var a = this,
                    b = this._operation.data.links;
                this._portal && (b = b.filter(function(b) {
                    return b.portalFrom.id == a._portal || b.portalTo.id == a._portal
                })), this._table.items = b
            }, b.prototype.getLinkLength = function(b) {
                var c = a.Analyzer.getLinkCoordinates(this._operation.data, b);
                return L.latLng(c[0]).distanceTo(c[1])
            }, b.prototype.deleteLink = function(a) {
                var b = this;
                confirm("Do you really want to delete the link?") && this._operation.linkService.deleteLink(a.portalFrom.id, a.portalTo.id, PLAYER.nickname).then(function() {
                    b._operation.portalService.getPortals()
                })
            }, b.prototype.reverseLink = function(a) {
                var b = this;
                this._operation.linkService.reverseLink(a.portalFrom.id, a.portalTo.id, PLAYER.nickname).then(function() {
                    b._operation.portalService.getPortals()
                })
            }, b.prototype.editLink = function(b) {
                new a.LinkEditDialog(this._operation, this._layerManager, b)
            }, b.prototype.addAlert = function(b) {
                window.renderPortalDetails(b.portalFrom.id);
                var c = new a.AlertDialog(this._operation, new a.Preferences);
                c.showDialog(), c.setTarget(this._operation.data.getPortal(b.portalTo.id))
            }, b.prototype.makeMenu = function(b, c) {
                var d = this,
                    e = new a.OverflowMenu;
                e.items = [{
                    label: "Add alert",
                    onclick: function() {
                        return d.addAlert(c)
                    }
                }, {
                    label: "Edit",
                    onclick: function() {
                        return d.editLink(c)
                    }
                }, {
                    label: "Reverse",
                    onclick: function() {
                        return d.reverseLink(c)
                    }
                }, {
                    label: "Delete",
                    onclick: function() {
                        return d.deleteLink(c)
                    }
                }], b.className = "menu", b.appendChild(e.button)
            }, b
        }();
        a.LinkListDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function(b) {
            function c(a, c, d, e, f, g) {
                this._layer = f, this._portal = g, this._dashboard = e, b.call(this, a, c, d)
            }
            return __extends(c, b), c.prototype.render = function() {
                var b = this;
                if (window.map.hasLayer(this._layer.layerGroup)) {
                    var c = this._layerManager.getLayerConfig(this._layer.layerName),
                        d = L.icon({
                            iconUrl: c.portal.iconUrl,
                            shadowUrl: null,
                            iconSize: L.point(25, 41),
                            iconAnchor: L.point(12, 41),
                            popupAnchor: L.point(0, -35)
                        }),
                        e = L.marker([this._portal.lat, this._portal.lng], {
                            title: this._portal.name + (this._portal.description ? " (" + this._portal.description + ")" : ""),
                            icon: d,
                            guid: this._portal.id
                        }).addTo(this._layer.layerGroup).on("popupopen", function() {
                            window.map._popup && window.map._popup._updateLayout()
                        }),
                        f = this._portal.keysFarmed || 0,
                        g = this._portal.keysNeeded || 0,
                        h = Math.max(0, g - f),
                        i = null,
                        j = this._preferences.showKeys;
                    "farmed" == j && f && (i = f), "needed" == j && g && (i = g), "remaining" == j && h && (i = h), "links" == j && this._portal.outgoingLinks && (i = this._portal.outgoingLinks), null !== i && 0 !== i && L.marker([this._portal.lat, this._portal.lng], {
                        icon: L.divIcon({
                            className: "reswue-keys-overlay",
                            clickable: !1,
                            html: "" + i,
                            iconSize: [21, 21],
                            iconAnchor: [12, 41]
                        }),
                        zIndexOffset: 1e3
                    }).addTo(this._layer.layerGroup);
                    var k = document.createElement("div");
                    k.className = "reswue-popup portal";
                    var l = k.appendChild(document.createElement("p")),
                        m = l.appendChild(document.createElement("strong"));
                    m.appendChild(a.UiHelper.getPortalLink(this._portal)), l = k.appendChild(document.createElement("p"));
                    var n = l.appendChild(document.createElement("small"));
                    n.appendChild(document.createTextNode("Portal in "));
                    var o = n.appendChild(document.createElement("span"));
                    if (o.textContent = this._operation.data.operation.name, o.className = "help", o.title = "Environment: " + a.UiHelper.lookupEnvironmentName(this._operation.data.environment), n.appendChild(document.createTextNode(" / " + this.getLayerName(this._layer))), (f || g || h) && (l = k.appendChild(document.createElement("p")), n = l.appendChild(document.createElement("small")), n.textContent = "Keys: " + f + " farmed, " + g + " needed" + (h > 0 ? ", " + h + " missing" : "")), this._portal.description) {
                        var p = k.appendChild(document.createElement("div"));
                        p.className = "desc", p.innerHTML = window.markdown.toHTML(this._portal.description)
                    }
                    l = k.appendChild(document.createElement("p")), l.className = "ui-dialog-buttonset";
                    var q = l.appendChild(document.createElement("button"));
                    q.textContent = "links", q.addEventListener("click", function(c) {
                        new a.LinkListDialog(b._operation, b._dashboard, b._layerManager, b._portal.id), e.closePopup()
                    }, !1), this.isAgentOperator && (q = l.appendChild(document.createElement("button")), q.textContent = "edit", q.addEventListener("click", function(c) {
                        window.renderPortalDetails(b._portal.id), a.PortalDialog.show(b._operation, b._dashboard, b._layerManager), e.closePopup()
                    }, !1), q = l.appendChild(document.createElement("button")), q.textContent = "delete", q.addEventListener("click", function(c) {
                        a.UiCommands.deletePortal(b._operation, b._portal.id)
                    }, !1), q = l.appendChild(document.createElement("button")), q.textContent = "swap", q.addEventListener("click", function(c) {
                        return a.UiCommands.swapPortal(b._operation, b._portal.id, window.selectedPortal)
                    }, !1)), "undefined" != typeof android && android && android.intentPosLink && (q = l.appendChild(document.createElement("button")), q.textContent = "share", q.addEventListener("click", function(a) {
                        android.intentPosLink(parseFloat(b._portal.lat), parseFloat(b._portal.lng), map.getZoom(), b._portal.name, !0)
                    }, !1)), this.addPopup(e, k, {
                        maxWidth: 1e3
                    })
                }
            }, c
        }(a.MapItem);
        a.MapPortal = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function(b) {
            function c(a, c, d, e, f) {
                this._layer = e, this._link = f, b.call(this, a, c, d)
            }
            return __extends(c, b), c.prototype.render = function() {
                if (window.map.hasLayer(this._layer.layerGroup)) {
                    var b = a.Analyzer.getLinkCoordinates(this._operation.data, this._link),
                        c = this.getLinkOptions(this._link),
                        d = L.latLng(b[0]).lng < 0 ? 360 : -360,
                        e = b.map(function(a) {
                            var b = L.latLng(a);
                            return b.lng += d, b
                        }),
                        f = L.geodesicPolyline(b, c);
                    f.addTo(this._layer.layerGroup);
                    var g = L.geodesicPolyline(e, c);
                    g.addTo(this._layer.layerGroup), a.CrossLinksAddon.testAllLinksAgainstLayer(f), a.CrossLinksAddon.testAllLinksAgainstLayer(g), a.LinkShowDirectionAddon.addLine(f), a.LinkShowDirectionAddon.addLine(f)
                }
            }, c.prototype.getLinkOptions = function(a) {
                var b = {
                        geodesic: !0,
                        clickable: !1
                    },
                    c = this._layerManager.getLayerConfig(a.layerName);
                return b.dashArray = c.link.dashArray, b.opacity = c.link.opacity, b.weight = c.link.weight,
                    b.color = c.color, a.keysShared > 0 && (b.color = c.color, b.dashArray = c.link.sharedKeysDashArray), b
            }, c
        }(a.MapItem);
        a.MapLink = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function(b) {
            function c(a, c, d, e, f) {
                this._layer = e, this._polygon = f, b.call(this, a, c, d)
            }
            return __extends(c, b), c.prototype.render = function() {
                var b = this;
                if (window.map.hasLayer(this._layer.layerGroup)) {
                    var c = this.getPolyOptions(this._polygon);
                    void 0 !== this._polygon.color && null !== this._polygon.color && (c.color = this._polygon.color);
                    var d = document.createElement("div");
                    d.className = "reswue-popup portal";
                    var e = d.appendChild(document.createElement("p")),
                        f = e.appendChild(document.createElement("small"));
                    f.appendChild(document.createTextNode("Polygon in " + this._operation.data.operation.name + " / " + this.getLayerName(this._layer)));
                    var g = window.markdown.toHTML(this._polygon.description);
                    if (this._polygon.description) {
                        var h = d.appendChild(document.createElement("div"));
                        h.className = "desc", h.innerHTML = g
                    }
                    if (this.isAgentOperator) {
                        var i = d.appendChild(document.createElement("p"));
                        i.className = "ui-dialog-buttonset";
                        var j = i.appendChild(document.createElement("button"));
                        j.textContent = "edit", j.addEventListener("click", function(c) {
                            new a.PolygonEditDialog(b._operation, b._layerManager, b._polygon)
                        }, !1), j = i.appendChild(document.createElement("button")), j.textContent = "delete", j.addEventListener("click", function(a) {
                            confirm("Do you really want to delete this polygon?") && b._operation.polygonService.deletePolygon(b._polygon.id, PLAYER.nickname)
                        }, !1)
                    }
                    var k = L.geodesicPolygon(this._polygon.latLngs, c).addTo(this._layer.layerGroup).bringToBack();
                    if (this._preferences.disablePolygonPopups !== !0 && k.bindPopup(d), this._polygon.description && this._preferences.showPolygonLabels) {
                        var l = this._polygon.latLngs,
                            m = l.length,
                            n = l.map(function(a, b, c) {
                                var d = c[(b + 1) % m];
                                return a.lat * d.lng - d.lat * a.lng
                            }).reduce(function(a, b) {
                                return a + b
                            }) / 2,
                            o = l.map(function(a, b, c) {
                                var d = c[(b + 1) % m],
                                    e = (a.lat + d.lat) * (a.lat * d.lng - d.lat * a.lng),
                                    f = (a.lng + d.lng) * (a.lat * d.lng - d.lat * a.lng);
                                return [e, f]
                            }).reduce(function(a, b) {
                                return [a[0] + b[0], a[1] + b[1]]
                            }).map(function(a) {
                                return a / (6 * n)
                            });
                        L.marker(o, {
                            zIndexOffset: 1e4,
                            clickable: !1,
                            icon: new a.UiHelper.ColoredDivIcon({
                                color: c.color,
                                className: "reswue-polygon-label",
                                clickable: !1,
                                html: g,
                                iconAnchor: [75, 8],
                                iconSize: [150, 16]
                            })
                        }).addTo(this._layer.layerGroup)
                    }
                }
            }, c.prototype.getPolyOptions = function(a) {
                var b = {
                        geodesic: !0,
                        clickable: this._preferences.disablePolygonPopups !== !0
                    },
                    c = this._layerManager.getLayerConfig(a.layerName);
                return b.color = c.color, b
            }, c
        }(a.MapItem);
        a.MapPolygon = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a) {
                this._plugin = a
            }
            return b.prototype.showDialog = function() {
                var a = this;
                return new Promise(function(b, c) {
                    var d = a,
                        e = localStorage["reswue-my-operations"],
                        f = null,
                        g = null;
                    if (g = $('<select style="width:160px" />').on("change", function() {
                            var a = f.val(),
                                c = this.value;
                            d._plugin.openOperation(a, c), b(c), n.dialog("close")
                        }), f = $('<select style="width:160px" />').on("change", function() {
                            var a = this.value,
                                b = $(this).find("option:selected").text();
                            localStorage["reswue-environment"] = a, localStorage["reswue-environment-name"] = b, d.buildOperationDropdown(g, [])
                        }), a.buildEnvironmentDropdown(f, g), void 0 !== e && "" !== e && "undefined" != e) {
                        var h = JSON.parse(e);
                        a.buildOperationDropdown(g, h)
                    } else a.buildOperationDropdown(g, []);
                    var i = $("<button>Google+ Login</button>").on("click", function() {
                            return a.authenticateWithGoogleAndLoadMyOperations(f.val(), g)
                        }),
                        j = $('<input placeholder="e.g. O2J" style="width:160px">'),
                        k = $('<input placeholder="e.g. deadfrog" type="password" style="width:160px">'),
                        l = $("<button>Password Login</button>").click(function() {
                            var c = f.val(),
                                d = j.val().trim(),
                                e = k.val().trim();
                            a.joinOperationOrOpenOperationByPassword(c, d, e).then(function() {
                                n.dialog("close"), b(d)
                            }, function(a) {
                                alert(a)
                            })
                        }),
                        m = $('<div id="reswue-dialog-env-c" />').append('<label style="display:inline-block;width:80px;">Environment:</label>').append(f).append("<br/><br/><hr/>").append("Sign in with your <strong>registered</strong> trusted identity!<br/><br/>").append(i).append("<br/><br/>").append('<label style="display:inline-block;width:80px;">Operations:</label>').append(g).append("<br/><br/><hr />").append("Or with your operation password!<br/><br/>").append('<label style="display:inline-block;width:80px;">Operation:</label>').append(j).append("<br/><br/>").append('<label style="display:inline-block;width:80px;">Password:</label>').append(k).append("<br/><br/>").append(l),
                        n = dialog({
                            html: m,
                            dialogClass: "ui-dialog-linklist",
                            title: "Operation Selection",
                            id: "reswue-dialog-env",
                            width: 300,
                            buttons: [{
                                text: "Logout from Google",
                                click: function() {
                                    delete localStorage["reswue-user-id"], d._plugin.logoutAgent().then(function() {
                                        b(null)
                                    });
                                    var a = $(this);
                                    a.dialog("close")
                                }
                            }]
                        })
                })
            }, b.prototype.authenticateWithGoogleAndLoadMyOperations = function(b, c) {
                var d = this,
                    e = a.Core.createApiNoOperation(b, PLAYER.team, PLAYER.nickname);
                e.authenticateWithGoogle(!0).then(function() {
                    var b = new a.OperationService(e, null);
                    b.getMyOperations(PLAYER.nickname).then(function(a) {
                        localStorage["reswue-my-operations"] = JSON.stringify(a), d.buildOperationDropdown(c, a)
                    })
                })
            }, b.prototype.joinOperationOrOpenOperationByPassword = function(b, c, d) {
                var e = this;
                return new Promise(function(f, g) {
                    if ("developer" == d && (localStorage["reswue-environment-enabled"] = !0, g("Developer Mode active!")), "" === c || "" === d) g("No operation or password was provided.");
                    else {
                        var h = a.Core.createApiNoOperation(b, PLAYER.team, PLAYER.nickname),
                            i = new a.OperationService(h, null);
                        i.joinOperation(c, d).then(function(a) {
                            200 == a.statusCode && a.data.role > 0 && (e._plugin.openOperation(b, c, "----google-session----"), f())
                        }, function(a) {
                            (401 == a.statusCode || 403 == a.statusCode) && (e._plugin.openOperation(b, c, d), f())
                        })
                    }
                })
            }, b.prototype.buildEnvironmentDropdown = function(a, b) {
                var c = localStorage["reswue-environment-data"],
                    d = localStorage["reswue-environment"],
                    e = localStorage["reswue-environment-enabled"],
                    f = localStorage["reswue-environment-extra"],
                    g = {
                        environments: []
                    };
                void 0 !== c && (g = JSON.parse(c)), "string" == typeof f && "" !== f.trim() && (g.environments[f] = "DEV Env LocalStorage", e = !0), $.each(g.environments, function(b, c) {
                    var f = $("<option></option>").attr("value", b).text(c);
                    b == d && f.attr("selected", "selected"), (-1 == c.indexOf("DEV") || e) && a.append(f)
                })
            }, b.prototype.buildOperationDropdown = function(a, b) {
                a.empty(), 0 === b.length ? a.append($('<option value="">loads after G+ Login</option>')) : (a.append($('<option value="">Please Select</option>')), $.each(b, function(b, c) {
                    "10" == c.status && a.append($("<option></option>").attr("value", c.name).text(c.name))
                }))
            }, b
        }();
        a.OperationSelectorDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a) {
                this._operation = a
            }
            return b.prototype.showDialog = function() {
                var a = $("<div />"),
                    b = $('<table class="reswue-table" />');
                a.append(b), this.buildTable(b), dialog({
                    html: a,
                    dialogClass: "ui-dialog-linklist",
                    title: this._operation.getDisplayName() + " Agents",
                    id: "agents-list",
                    width: 500
                })
            }, b.prototype.buildTable = function(b) {
                var c = this,
                    d = new a.AgentVisibilityManager;
                b.empty(), b.append($("<tr />").append("<th>Agent Name</th>").append("<th>First Name</th>").append("<th>Last Seen</th>").append($("<th />").append("Visibility ").append($('<a href="#">(hide all)</a>').on("click", function() {
                    c._operation.data.agents.forEach(function(a) {
                        d.setVisibility(c._operation.data.environment, c._operation.data.operationName, a, !1)
                    }), c._operation.data.updateAgents(c._operation.data.agents), c._operation.data.updateGroups(c._operation.data.groups), c.buildTable(b)
                }))));
                var e = this._operation.data.agents;
                null !== e && void 0 !== e && e.forEach(function(a) {
                    var e = $("<tr />").append("<td>@" + a.agentName + "</td>").append("<td>" + ("string" == typeof a.firstName ? a.firstName : "") + "</td>");
                    e.append($("<td/>").append(null === a.lastKnownLocation || void 0 === a.lastKnownLocation ? $('<a href="#">Request Location</a>').on("click", function(b) {
                        c._operation.agentService.requestAgentTracking(a.agentName).then(function() {
                            alert("Tracking request sent to @" + a.agentName)
                        }), b.preventDefault()
                    }) : $("<a></a>").text(a.lastKnownLocation.lastSeen).on("click", function() {
                        map.setView([a.lastKnownLocation.lat, a.lastKnownLocation.lng], 16)
                    })));
                    var f = d.isAgentVisible(c._operation.data.environment, c._operation.data.operationName, a),
                        g = $("<a />").text(f ? "Visible (Hide Agent)" : "Hidden (Show Agent)").on("click", function() {
                            f = !f, d.setVisibility(c._operation.data.environment, c._operation.data.operationName, a, f), g.text(f ? "Visible (Hide Agent)" : "Hidden (Show Agent)"), c._operation.data.updateAgents(c._operation.data.agents), c._operation.data.updateGroups(c._operation.data.groups)
                        });
                    e.append($("<td></td>").append(g)), b.append(e)
                })
            }, b
        }();
        a.AgentListDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(b, c) {
                var d = this;
                this._operation = b, this._preferences = c, this._table = new a.Sortable, this._table.fields = [{
                    name: "Type",
                    value: function(a) {
                        return a.type
                    },
                    format: function(b, c) {
                        var d = a.getAlertType(c);
                        b.textContent = d.label, b.style.backgroundColor = d.color
                    }
                }, {
                    name: "Portal",
                    value: function(a) {
                        return "MessageAlert" == a.type ? null : a.portal
                    },
                    sortValue: function(a) {
                        return a ? a.name : ""
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(b, c) {
                        c && b.appendChild(a.UiHelper.getPortalLink(c))
                    }
                }, {
                    name: "Comment",
                    value: function(a) {
                        return a.comment
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(a, b) {
                        a.className = "desc", a.innerHTML = window.markdown.toHTML(b)
                    }
                }, {
                    name: "Assignee",
                    value: function(a) {
                        return a.assignee
                    },
                    sortValue: function(a) {
                        return a.name || ""
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(a, b) {
                        a.className = "assignee";
                        var c = d.getGroups(b.key),
                            e = c.filter(function(a) {
                                return !!a.color
                            });
                        if (e.length) {
                            var f = a.appendChild(document.createElement("div"));
                            f.className = "reswue-group-indicator", e.forEach(function(a) {
                                var b = f.appendChild(document.createElement("div"));
                                b.style.backgroundColor = a.color, b.style.width = 100 / e.length + "%"
                            })
                        }
                        a.appendChild(document.createTextNode(" " + b.name)), 1 == c.length && (a.title = "<div>" + window.escapeHtmlSpecialChars(c[0].groupName) + "</div>" + window.markdown.toHTML(c[0].description), window.setupTooltips($(a)))
                    }
                }, {
                    name: "Resolved",
                    value: function(a) {
                        return d.getAlertResolvedDate(a)
                    },
                    sortValue: function(a, b) {
                        return a ? a.getTime() : "MessageAlert" == b.type ? -1 : 0
                    },
                    format: function(a, b, c) {
                        if (a.className = "resolved", b) return void(a.textContent = window.unixTimeToDateTimeString(b));
                        if ("MessageAlert" != c.type) {
                            var e = a.appendChild(document.createElement("button"));
                            e.appendChild(document.createTextNode("resolve")), e.addEventListener("click", function(a) {
                                confirm("Do you really want to resolve this alert?") && d._operation.alertService.resolveAlert(c.id, PLAYER.nickname)["catch"](function(a) {
                                    window.alert(a.message)
                                })
                            }, !1)
                        }
                    }
                }, {
                    name: "",
                    sort: null,
                    value: function(a) {
                        return a
                    },
                    format: function(a, b) {
                        return d.makeMenu(a, b)
                    }
                }], this._table.sortBy = 2, this.setAlerts();
                var e = this._operation.data.addUpdateNotificationHandler({
                        updateOperation: function(a, b) {},
                        updatePortals: function(a, b) {},
                        updateLinks: function(a, b) {},
                        updatePolygons: function(a, b) {},
                        updateAlerts: function(a, b) {
                            d.setAlerts()
                        },
                        updateAgents: function(a, b) {},
                        updateGroups: function(a, b) {}
                    }),
                    f = window.dialog({
                        html: this._table.table,
                        dialogClass: "reswue-dialog reswue-dialog-alertlist",
                        title: this._operation.getDisplayName() + " Alerts",
                        width: "auto",
                        closeCallback: function() {
                            d._operation.data.removeUpdateNotificationHandler(e)
                        }
                    }),
                    g = f.dialog("option", "buttons");
                f.dialog("option", "buttons", $.extend({}, {
                    "Add alerts": function(b) {
                        new a.AlertDialog(d._operation, d._preferences).showDialog()
                    }
                }, g))
            }
            return b.prototype.makeMenu = function(b, c) {
                var d = this,
                    e = [],
                    f = null !== c.resolvedDate && void 0 !== c.resolvedDate && "" !== c.resolvedDate,
                    g = a.Analyzer.getAgentOrGroup(this._operation.data, c.assignee.key);
                "agent" == g.type && g.assignee.agentName == PLAYER.nickname || f || e.push({
                    label: "Assign to me",
                    onclick: function() {
                        confirm("Are you sure you want to take over this Portal?\nType: 	" + c.type + (c.portal ? "\nPortal: 	" + c.portal.name : "") + "\nComment:\n" + c.comment) && d._operation.alertService.assignAlert(c.id, PLAYER.nickname)
                    }
                }), a.Analyzer.isMyAlert(this._operation.data, c) && !f && e.push({
                    label: "Decline",
                    onclick: function() {
                        return d._operation.alertService.declineAlert(c.id, PLAYER.nickname)
                    }
                }), this._operation.data.operation.isAgentOperator && e.push({
                    label: "Delete",
                    onclick: function() {
                        return d._operation.alertService.deleteAlert(c.id, PLAYER.nickname)
                    }
                });
                var h = new a.OverflowMenu;
                h.items = e, b.className = "menu", b.appendChild(h.button)
            }, b.prototype.setAlerts = function() {
                this._table.items = this._operation.data.alerts
            }, b.prototype.getAlertResolvedDate = function(a) {
                if (null === a.resolvedDate || void 0 === a.resolvedDate || "" === a.resolvedDate) return null;
                var b = a.resolvedDate.split(/[- :]/).map(function(a) {
                        return parseInt(a)
                    }),
                    c = 0;
                return new Date(b[c++], b[c++], b[c++], b[c++], b[c++], b[c++])
            }, b.prototype.getGroups = function(b) {
                if ("all" == b) return [];
                var c = this._operation.data.agents.filter(function(a) {
                    return a.key == b
                })[0];
                return c ? a.Analyzer.getGroupsForAgent(this._operation.data, c.agentName) : this._operation.data.groups.filter(function(a) {
                    return a.key == b
                }).sort(function(a, b) {
                    return a.groupName < b.groupName ? -1 : a.groupName > b.groupName ? 1 : a.key < b.key ? -1 : a.key > b.key ? 1 : 0
                })
            }, b
        }();
        a.AlertListDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b) {
                this._bindingCleanup = [], this._plugin = a, this._core = b
            }
            return b.create = function(a, c, d) {
                var e = new b(a, c),
                    f = e.createDialog();
                d.append(f), d.data("closeCallback", function() {
                    e.close()
                })
            }, b.prototype.createDialog = function() {
                var a = $("<div />");
                return this.createList(a), a
            }, b.prototype.createList = function(a) {
                var b = this;
                a.empty(), this._core.operations.forEach(function(c) {
                    return b.addItemToOperationList(a, c, c == b._core.selectedOperation)
                }), this.addOperationByGoogle(a)
            }, b.prototype.addItemToOperationList = function(b, c, d) {
                var e = this,
                    f = c.data.environment + "/my.php?action=switchToOperation&operationName=" + c.data.operationName,
                    g = $("<h2>" + c.data.operationName + "</h2>").on("click", function() {
                        e._plugin.setSelectedOperation(c), e.createList(b)
                    });
                d && g.append("<small> (selected)</small>");
                var h = $('<div class="reswue-operation-list-item" data-environment="' + c.data.environment + '" data-operation-name="' + c.data.operationName + '" />').append(g).append("<small>" + a.UiHelper.lookupEnvironmentName(c.data.environment) + "</small>"),
                    i = $("<span />");
                this.displayOperationStatus(i, c), h.append(i), h.append("<br />"), h.append($('<a href="#" title="Update the operations data">Sync</a>').on("click", function(a) {
                    return c.data.authenticated ? c.syncAll().then(function() {
                        e.displayOperationStatus(i, c), window.runHooks("plugin-reswue-operation-sync-finished", {
                            operation: c
                        })
                    }, function() {
                        return e.displayOperationStatus(i, c)
                    }) : alert("Not authenticated! Operation data cannot be synced."), a.preventDefault(), !1
                })), h.append(" &#183; ");
                var j = $('<a href="#" title="Show Alerts" class="reswue-alerts-num" />').on("click", function(b) {
                    return new a.AlertListDialog(c, e._plugin.preferences), b.preventDefault(), !1
                });
                this.displayAlertCount(j, c.data.alerts), h.append(j), h.append(" &#183; "), h.append($('<a href="#" title="Show List of Portals">Portals</a>').on("click", function(b) {
                    return new a.PortalListDialog(c, e._plugin.dashboard, e._plugin.layerManager), b.preventDefault(), !1
                })), h.append(" &#183; "), h.append($('<a href="#" title="Show List of Links">Links</a>').on("click", function(b) {
                    return new a.LinkListDialog(c, e._plugin.dashboard, e._plugin.layerManager), b.preventDefault(), !1
                })), h.append(" &#183; "), h.append($('<a href="#" title="Show List of Agents">Agents</a>').on("click", function(b) {
                    return new a.AgentListDialog(c).showDialog(), b.preventDefault(), !1
                })), h.append(" &#183; "), h.append('<a href="' + f + '" target="_blank">Web</a>'), h.append(" &#183; "), h.append($('<a href="#" title="Close">Close</a>').on("click", function(a) {
                    return e._plugin.closeOperation(c.data.environment, c.data.operationName), e.createList(b), a.preventDefault(), !1
                })), h.append("<hr />");
                var k = c.data.addUpdateNotificationHandler({
                    updateOperation: function(a, b) {
                        e.displayOperationStatus(i, c)
                    },
                    updatePortals: function(a, b) {},
                    updateLinks: function(a, b) {},
                    updatePolygons: function(a, b) {},
                    updateAlerts: function(a, b) {
                        e.displayAlertCount(j, b)
                    },
                    updateAgents: function(a, b) {},
                    updateGroups: function(a, b) {}
                });
                b.append(h), this._bindingCleanup.push({
                    operation: c,
                    handler: k
                })
            }, b.prototype.close = function() {
                this._bindingCleanup.forEach(function(a) {
                    return a.operation.data.removeUpdateNotificationHandler(a.handler)
                })
            }, b.prototype.addOperationByGoogle = function(b) {
                var c = this,
                    d = $("<div />");
                d.append("<strong>Load Operation</strong><br/>"), d.append($('<a href="#">Add RESWUE Operation</a>').on("click", function(d) {
                    var e = new a.OperationSelectorDialog(c._plugin);
                    return e.showDialog().then(function() {
                        return c.createList(b)
                    }), d.preventDefault(), !1
                })), b.append(d)
            }, b.prototype.displayOperationStatus = function(a, b) {
                var c = b.data.authenticated ? $("<span>Authenticated</span>") : $('<a href="#">Not Authenticated - Click to login</a>').on("click", function(a) {
                    return b.api.authenticateWithGoogle(!0).then(function() {
                        return b.syncAll()
                    }), a.preventDefault(), !1
                });
                a.empty(), a.append(" &#183; "), a.append(c), null != b.data.operation && (a.append(" &#183; "), a.append(b.data.operation.isAgentOperator ? "Operator" : "Field Agent"))
            }, b.prototype.displayAlertCount = function(b, c) {
                var d = a.Analyzer.countActiveAlerts(c);
                b.text(d + " Alerts"), 0 === d ? b.removeClass("new") : b.addClass("new")
            }, b
        }();
        a.OperationsDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b, c, d) {
                this._layerManager = a, this.operation = d, this._preferences = b, this._dashboard = c
            }
            return b.prototype.bind = function() {
                var a = this;
                this._layerManager.createLayers(this.operation.data), this.operation.data.addUpdateNotificationHandler({
                    updateOperation: function(a, b) {
                        null !== b && window.runHooks("plugin-reswue-operation-available", b.name)
                    },
                    updatePortals: function(b, c) {
                        a.updatePortals(c)
                    },
                    updateLinks: function(b, c) {
                        a.updateLinks(c)
                    },
                    updatePolygons: function(b, c) {
                        a.updatePolys(c)
                    },
                    updateAlerts: function(b, c) {
                        a.updateAlerts(c)
                    },
                    updateAgents: function(a, b) {},
                    updateGroups: function(b, c) {
                        a.updateAgents(a.operation.data.agents, c)
                    }
                })
            }, b.prototype.refresh = function() {
                this.updatePortals(this.operation.data.portals), this.updateLinks(this.operation.data.links), this.updatePolys(this.operation.data.polygons), this.updateAlerts(this.operation.data.alerts), this.updateAgents(this.operation.data.agents, this.operation.data.groups)
            }, b.prototype.updatePortals = function(b) {
                var c = this;
                this._layerManager.cleanLayers(this.operation.data, a.LayerKind.Portals), b.forEach(function(b) {
                    var d = c._layerManager.getLayer(c.operation.data, b.layerName, a.LayerKind.Portals);
                    new a.MapPortal(c._layerManager, c._preferences, c.operation, c._dashboard, d, b).render()
                })
            }, b.prototype.updateLinks = function(b) {
                var c = this;
                this._layerManager.cleanLayers(this.operation.data, a.LayerKind.Links), b.forEach(function(b) {
                    var d = c._layerManager.getLayer(c.operation.data, b.layerName, a.LayerKind.Links);
                    new a.MapLink(c._layerManager, c._preferences, c.operation, d, b).render()
                })
            }, b.prototype.updatePolys = function(b) {
                var c = this;
                this._layerManager.cleanLayers(this.operation.data, a.LayerKind.Polygons), b.forEach(function(b) {
                    var d = c._layerManager.getLayer(c.operation.data, b.layerName, a.LayerKind.Polygons);
                    new a.MapPolygon(c._layerManager, c._preferences, c.operation, d, b).render()
                })
            }, b.prototype.updateAgents = function(b, c) {
                var d = this;
                this._layerManager.cleanLayers(this.operation.data, a.LayerKind.Agents);
                var e = new a.AgentVisibilityManager;
                b = b.filter(function(a) {
                    return e.isAgentVisible(d.operation.data.environment, d.operation.data.operationName, a)
                });
                var f = a.AgentGroupPin.analyzeAgentGroupPins(b, c, !this._preferences.groupAgentsOnMap);
                f.forEach(function(b) {
                    var c = d._layerManager.getLayer(d.operation.data, "", a.LayerKind.Agents);
                    new a.MapAgent(d._layerManager, d._preferences, d.operation, c, b).render()
                })
            }, b.prototype.updateAlerts = function(b) {
                var c = this;
                this._layerManager.cleanLayers(this.operation.data, a.LayerKind.Alerts);
                var d = 0;
                b.forEach(function(b) {
                    if ("MessageAlert" !== b.type && (null === b.resolvedDate || void 0 === b.resolvedDate)) {
                        var e = c._layerManager.getLayer(c.operation.data, "", a.LayerKind.Alerts);
                        new a.MapAlert(c._layerManager, c._preferences, c.operation, e, b).render(), d++
                    }
                })
            }, b
        }();
        a.MapBinder = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a) {
                var b = this;
                this.extensions = [], this.selectedTab = "reswue-section-operation", this.tabs = null, this.nav = null, this.selectNav = null, this.container = null, this.dialog = null, this._version = a, window.useAndroidPanes() && (android.addPane("plugin-reswue", "RESWUE", "ic_action_place"), window.addHook("paneChanged", function(a) {
                    return b.onPaneChanged(a)
                }))
            }
            return a.prototype.extend = function(a, b, c, d) {
                this.extensions = this.extensions.filter(function(b) {
                    return b.id != a
                }), this.extensions.push({
                    id: a,
                    isActive: c,
                    title: b,
                    extension: d
                })
            }, a.prototype.onPaneChanged = function(a) {
                return null != this.container && (this.container.remove(), this.close()), "plugin-reswue" == a && (this.showDialog(), this.container.addClass("mobile").appendTo(document.body)), !0
            }, a.prototype.showDialog = function(a) {
                var b = this;
                return void 0 === a && (a = null), window.useAndroidPanes() && "plugin-reswue" != window.currentPane ? (null != a && (this.selectedTab = a), void window.show("plugin-reswue")) : (null != this.dialog && this.dialog.dialog("close"), this.createExtensionMenu(), this.extensions.forEach(function(a) {
                    a.isActive() && b.buildExtension(a.id, a.title, a.extension)
                }), this.selectTab(this.container, null != a ? a : this.selectedTab), void(window.useAndroidPanes() || (this.dialog = window.dialog({
                    title: "RESWUE v" + this._version,
                    html: this.container,
                    id: "reswue-dashboard",
                    width: "500px",
                    height: "auto",
                    closeCallback: function() {
                        return b.close()
                    }
                }), this.dialog.on("dialogdragstop", function() {
                    return b.dialog.dialog("option", "height", "auto")
                }))))
            }, a.prototype.close = function() {
                null != this.container && (this.dialog = null, this.container = null, this.tabs = null, this.nav = null, this.selectNav = null, this.extensions.filter(function(a) {
                    return void 0 != $(a).data("closeCallback")
                }).forEach(function(a) {
                    return $(a).data("closeCallback")()
                }))
            }, a.prototype.buildExtension = function(a, b, c) {
                var d = this,
                    e = $("<section />");
                e.attr("id", a), e.hide(), this.tabs.append(e);
                var f = $('<a href="#" />');
                f.attr("data-section", a), f.html(b);
                var g = this.container;
                f.on("click", function(a) {
                    var b = $(f).data("section");
                    d.selectTab(g, b), a.preventDefault()
                }), this.nav.append(f), this.selectNav.append($("<option />").prop("value", a).text(b.replace(/&nbsp;/g, ">"))), c(e)
            }, a.prototype.selectTab = function(a, b) {
                a.find("nav a").removeClass("clicked"), a.find('nav a[data-section="' + b + '"]').addClass("clicked"), a.find("section").hide(), a.find("#" + b).show(), $(this.selectNav).val(b), this.selectedTab = b
            }, a.prototype.setProgress = function(a, b) {
                0 == b ? $("#reswue-menu-config").removeClass("showprogress") : ($("#reswue-menu-config").addClass("showprogress"), $("#reswue-menu-config .progress .progress-value").css("width", 100 * a / b + "%"))
            }, a.prototype.createExtensionMenu = function() {
                var a = this,
                    b = $('<div id="reswue-menu-config">');
                this.nav = $("<nav />");
                var c = $("<select />").on("change", function() {
                    var d = $(c).val();
                    a.selectTab(b, d)
                });
                this.selectNav = c, this.tabs = $('<div class="tabs" />'), b.append('<div class="progress"><div class="progress-value"></div></div>').append(this.nav).append($('<div id="reswue-menu-config-select" />').append("Menu: ").append(this.selectNav).append("<hr />")).append(this.tabs), this.container = b
            }, a
        }();
        a.DashboardDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(a, b) {
                this._core = a, this._drawToolAddon = b
            }
            return a.create = function(b, c, d) {
                var e = new a(b, c),
                    f = e.createDialog();
                d.append(f)
            }, a.prototype.createDialog = function() {
                var a = this,
                    b = $("<div />");
                return b.append("<h2>Drawtool Integration</h2>"), b.append("<p>Exports the current drawtools lines as RESWUE Links and connected portals as RESWUE Portals into the currently active RESWUE operation.</p>"), b.append($('<a href="#">Convert drawing into Portals and Links</a>').on("click", function(b) {
                    a._drawToolAddon.exportDrawToolIntoOperation(), b.preventDefault()
                })), b
            }, a
        }();
        a.DrawToolAddonDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(b, c) {
                var d = this;
                this._target = null, this._operation = b, this._preferences = c, this._type = $("<select>"), a.alertTypes.forEach(function(a) {
                    d._type.append($("<option>").prop({
                        value: a.name,
                        text: a.label
                    }))
                }), this._type.val(this._preferences.defaultAlertType), this._comment = $("<input>").attr("placeholder", "comment"), this._agent = $('<select class="reswue-agentselect"></select>').css({
                    width: "100%",
                    boxSizing: "border-box"
                });
                var e = $("<div>").addClass("reswue-targetselect").text("To: ");
                this._targetLink = $("<strong>").text("(not set)").appendTo(e);
                $("<button>").text("set").click(function() {
                    return d.setTarget(a.UiHelper.getSelectedPortal())
                }).appendTo(e);
                this._targetMenu = new a.OverflowMenu, this._targetMenu.button.firstElementChild.textContent = "▼", e.append(this._targetMenu.button), this._transcript = $('<input type="checkbox">'), this._restricted = $('<input type="checkbox">'), this._container = $("<div />").append($("<div>").addClass("flex").append(this._type).append(this._comment)).append(document.createTextNode(" ")).append(this._agent).append(e), this._type.change(function() {
                    d._preferences.defaultAlertType = d._type.val(), d._preferences.save(), "CreateLinkAlert" == d._type.val() ? e.css("display", "") : e.hide()
                }), this._type.change();
                var f = this._operation.data.operation.settings;
                (void 0 === f || f.EnableTranscript === !0) && this._container.append($("<label>").append(this._transcript).append(document.createTextNode(" transcript "))), (void 0 === f || f.EnableRestrictedAlerts === !0) && this._container.append($("<label>").append(this._restricted).append(document.createTextNode(" restricted "))), this._portalSelectedHandler = function(a) {
                    return d._setAgents(), !0
                }
            }
            return b.prototype.showDialog = function() {
                var a = this;
                this._dialog && this.closeDialog(), window.addHook("portalSelected", this._portalSelectedHandler), this._dataUpdateHandler = this._operation.data.addUpdateNotificationHandler({
                    updateOperation: function(a, b) {},
                    updatePortals: function(b, c) {
                        a._setPortals()
                    },
                    updateLinks: function(a, b) {},
                    updatePolygons: function(a, b) {},
                    updateAlerts: function(a, b) {},
                    updateAgents: function(b, c) {
                        a._setAgents()
                    },
                    updateGroups: function(b, c) {
                        a._setAgents()
                    }
                }), this._setAgents(), this._setPortals(), this._dialog = window.dialog({
                    title: this._operation.data.operationName + " Alerts",
                    dialogClass: "reswue-dialog-alerts",
                    html: this._container,
                    width: "300",
                    height: "auto",
                    position: {
                        my: "center top",
                        at: "center center+30"
                    },
                    closeCallback: function() {
                        a.closeDialog()
                    }
                }), this._dialog.dialog("option", "buttons", {
                    "send alert": function() {
                        a.sendAlert()
                    },
                    close: function() {
                        a.closeDialog()
                    }
                })
            }, b.prototype.closeDialog = function() {
                this._dialog && (this._operation.data.removeUpdateNotificationHandler(this._dataUpdateHandler), window.removeHook("portalSelected", this._portalSelectedHandler), this._dialog.dialog("close"), this._dialog = null)
            }, b.prototype._setAgents = function() {
                var a = this,
                    b = this._agent.val();
                if (this._agent.empty().append($("<option>").prop({
                        value: "x",
                        text: "Select agent or team..."
                    })), this._operation.data.groups.forEach(function(c) {
                        var d = $("<option>").prop({
                            value: c.key,
                            text: "TEAM " + c.groupName
                        }).appendTo(a._agent);
                        c.color && "all" != c.key && $("<div>").addClass("reswue-group-indicator").css("background-color", c.color).prependTo(d), b == c.key && a._agent.prop("selectedIndex", a._agent.prop("length") - 1)
                    }), this._preferences.loadOrInit(), this._preferences.agentsInAlertTargetList) {
                    var c = [];
                    if (this._preferences.showAgentSortedByDistance && null != window.selectedPortal) {
                        var d = window.portals[window.selectedPortal].getLatLng(),
                            e = this._operation.data.agents.filter(function(a) {
                                return null != a.lastKnownLocation
                            }).map(function(a) {
                                var b = d.distanceTo(a.lastKnownLocation),
                                    c = b / 1e3 / 5 * 60;
                                return {
                                    agent: a,
                                    distance: b,
                                    text: a.agentName + " (" + b.toFixed(0) + "m; " + c.toFixed(2) + "mins)"
                                }
                            }).sort(function(a, b) {
                                return a.distance - b.distance
                            }),
                            f = this._operation.data.agents.filter(function(a) {
                                return null == a.lastKnownLocation
                            }).map(function(a) {
                                return {
                                    agent: a,
                                    distance: -1,
                                    text: a.agentName
                                }
                            });
                        c = e.concat(f)
                    } else c = this._operation.data.agents.map(function(a) {
                        return {
                            agent: a,
                            distance: -1,
                            text: a.agentName
                        }
                    });
                    c.forEach(function(b) {
                        return a._addAgentAsOption(b.agent, b.text)
                    })
                }
                if (this._agent.prop("selectedIndex", 0), "x" != b && b) this._agent.val(b);
                else {
                    var g = sessionStorage["reswue-alert-selected-agentname"];
                    this._agent.children().filter(function(a, b) {
                        return 0 == $(b).text().indexOf(g)
                    }).prop("selected", !0)
                }
            }, b.prototype._addAgentAsOption = function(b, c) {
                var d = $("<option>").prop({
                        value: b.key,
                        text: c
                    }).appendTo(this._agent),
                    e = a.Analyzer.getGroupsForAgent(this._operation.data, b.agentName).filter(function(a) {
                        return !!a.color
                    });
                if (e.length > 0) {
                    var f = $("<div>").addClass("reswue-group-indicator").prependTo(d);
                    e.forEach(function(a) {
                        $("<div>").css({
                            "background-color": a.color,
                            width: 100 / e.length + "%"
                        }).appendTo(f)
                    })
                }
            }, b.prototype._setPortals = function() {
                var a = this;
                this._targetMenu.items = this._operation.data.portals.sort(function(a, b) {
                    return a.name.localeCompare(b.name)
                }).map(function(b) {
                    return {
                        label: b.name,
                        onclick: function() {
                            a.setTarget(b)
                        }
                    }
                })
            }, b.prototype.setTarget = function(b) {
                return this._type.val("CreateLinkAlert").change(), b ? (this._target = b, void this._targetLink.empty().append(a.UiHelper.getPortalLink(b))) : void alert("Please select a portal first!")
            }, b.prototype.sendAlert = function() {
                var b = this._transcript.prop("checked"),
                    c = this._restricted.prop("checked"),
                    d = this._agent.children("option:selected").text();
                d.indexOf("(") >= 0 && (d = d.substring(0, d.indexOf("(") - 1)), sessionStorage["reswue-alert-selected-agentname"] = d;
                var e = this._type.val(),
                    f = this._agent.val(),
                    g = this._comment.val();
                if (!this._operation.data.operation.isAgentOperator) return void alert("You are not an operator of the operation.");
                if ("x" == f || !f) return void alert("Please select an agent or group first.");
                var h = a.UiHelper.getSelectedPortal();
                if ("MessageAlert" == e) h = null;
                else if (!h) return void alert("Please select a portal first!");
                var i = this._target;
                if (console.log(this._target), "CreateLinkAlert" == e) {
                    if (!i || !i.id) return void alert("Please select target portal first!");
                    if (h.id == i.id) return void alert("Cannot link the portal to itself!")
                } else i = null;
                var j = {
                    type: e,
                    assignee: {
                        key: f
                    },
                    comment: g,
                    portal: h,
                    linkTarget: i,
                    isScheduled: b,
                    isRestricted: c
                };
                this._operation.alertService.addAlert(j)
            }, b
        }();
        a.AlertDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b, c, d) {
                this.mapBinders = [], this.localConfig = null, this.core = a, this.layerManager = b, this.preferences = c, this.dashboard = d
            }
            return b.setupAfterIitc = function(c, d) {
                a.Core.version = c, a.UiHelper.extendLeaflet();
                var e = new a.Core(PLAYER.team, PLAYER.nickname),
                    f = new a.Preferences,
                    g = new a.DashboardDialog(c),
                    h = new a.LayerManager(window.map);
                f.loadOrInit();
                var i = new b(e, h, f, g);
                i.version = c, window.plugin.reswue = i, i.publishApiToWindow(), b.addCss(a.CSS.main), b.addCss(a.CSS.ui), a.ApiBase.loadGoogleApi(), i.setupIitcExtensions(), i.loadEnvironments(), i.setupAddons(), i.loadLocalStorageOperations(), i.setupUi()
            }, b.addCss = function(a) {
                $("head").append('<link rel="stylesheet" type="text/css" href="' + a + '" />')
            }, b.prototype.setupAddons = function() {
                this._drawToolAddon = new a.DrawToolAddon(this.core, this.layerManager, this.preferences), this._drawToolAddon.init(), this._crossLinkAddon = new a.CrossLinksAddon(this.core, this.layerManager, this.preferences, window.map), this._crossLinkAddon.init();
                var b = new a.LinkShowDirectionAddon(this.layerManager);
                b.init();
                var c = new a.IitcSearchAddon(this.core, this.layerManager);
                c.init(), new a.PrivacyViewAddon(this.layerManager)
            }, b.prototype.setupUi = function() {
                var b = this;
                this.dashboard.extend("reswue-section-operation", "Operation(s)", function() {
                    return !0
                }, function(c) {
                    return a.OperationsDialog.create(b, b.core, c)
                }), this.dashboard.extend("reswue-section-preferences", "Preferences", function() {
                    return !0
                }, function(c) {
                    return a.PreferencesDialog.create(b.core, b.preferences, b._crossLinkAddon, c)
                }), this.dashboard.extend("reswue-section-drawtool-addon", "Drawtool Integration", a.DrawToolAddon.isLoaded, function(c) {
                    return a.DrawToolAddonDialog.create(b.core, b._drawToolAddon, c)
                });
                var c = a.UiHelper.createButtonLeafletControl(window.map, [{
                        btnId: "reswue-btn-dashboard",
                        btnTitle: "RESWUE",
                        btnIcon: a.Images.toolbar_reswue,
                        btnFunction: function() {
                            b.dashboard.showDialog("reswue-section-operation")
                        }
                    }, {
                        btnId: "reswue-btn-sync",
                        btnTitle: "Synchronize all operations",
                        btnIcon: a.Images.toolbar_sync,
                        btnFunction: function() {
                            b.syncAllOperations()
                        }
                    }, {
                        btnId: "reswue-btn-addportal",
                        btnTitle: "Add/edit portal",
                        btnIcon: a.Images.toolbar_portal,
                        btnFunction: function() {
                            b.addPortalDialog()
                        }
                    }, {
                        btnId: "reswue-btn-addlinks",
                        btnTitle: "Add links",
                        btnIcon: a.Images.toolbar_link,
                        btnFunction: function() {
                            b.addLinkDialog()
                        }
                    }, {
                        btnId: "reswue-btn-addalert",
                        btnTitle: "Add alerts",
                        btnIcon: a.Images.toolbar_alert,
                        btnFunction: function() {
                            b.addAlertDialog()
                        }
                    }]),
                    d = document.body.appendChild(document.createElement("a"));
                d.tabIndex = -1, d.accessKey = "r", d.id = "reswue-fake-button", d.addEventListener("click", function(a) {
                    var b = c.getContainer().querySelector("a");
                    b.focus()
                }, !1);
                var e = document.getElementById("reswue-btn-sync");
                a.RequestTracker.addEventListener("change", function(b) {
                    a.RequestTracker.active ? e.classList.add("running") : e.classList.remove("running")
                })
            }, b.prototype.syncAllOperations = function() {
                var a = this.core.operations.some(function(a) {
                    return 0 == a.data.authenticated
                });
                this.core.operations.forEach(function(a) {
                    a.syncAll().then(function(b) {
                        return window.runHooks("plugin-reswue-operation-sync-finished", {
                            operation: a
                        })
                    })
                }), 1 == a && alert("Not authenticated in at least one operation!")
            }, b.prototype.addAlertDialog = function() {
                null != this.core.selectedOperation && null != this.core.selectedOperation.data.operation ? this.core.selectedOperation.data.operation.isAgentOperator ? new a.AlertDialog(this.core.selectedOperation, this.preferences).showDialog() : alert("You are not an operator of the operation.") : alert("No operation loaded!")
            }, b.prototype.addPortalDialog = function() {
                null != this.core.selectedOperation && null != this.core.selectedOperation.data.operation ? a.PortalDialog.show(this.core.selectedOperation, this.dashboard, this.layerManager) : alert("No operation loaded!")
            }, b.prototype.addLinkDialog = function() {
                null != this.core.selectedOperation && null != this.core.selectedOperation.data.operation ? a.LinkDialog.show(this.core.selectedOperation, this.dashboard, this.layerManager) : alert("No operation loaded!")
            }, b.prototype.loadEnvironments = function() {
                var b = a.Core.createApiNoOperation(null, PLAYER.team, PLAYER.nickname),
                    c = new a.OperationService(b, null);
                c.getEnvironments().then(function(a) {
                    var b = {
                        environments: {}
                    };
                    a.forEach(function(a) {
                        b.environments[a.uri] = a.displayName
                    }), localStorage["reswue-environment-data"] = JSON.stringify(b)
                })
            }, b.prototype.loadLocalStorageOperations = function() {
                var a = this;
                try {
                    this.localConfig = JSON.parse(localStorage["reswue-operation-data"])
                } catch (b) {}(null == this.localConfig || this.localConfig.nickname != PLAYER.nickname) && (this.localConfig = {
                    nickname: PLAYER.nickname,
                    operations: [],
                    selectedEnvironment: null,
                    selectedOperationName: null
                }), this.localConfig.operations.forEach(function(b) {
                    var c = b.environment == a.localConfig.selectedEnvironment && b.operationName == a.localConfig.selectedOperationName;
                    a.openOperation(b.environment, b.operationName, b.password, c)
                }), 0 == this.localConfig.operations.length && console.log("RESWUE: no operation in local storage to add.")
            }, b.prototype.openOperation = function(b, c, d, e) {
                void 0 === d && (d = "--session--"), void 0 === e && (e = !0), this.localConfig.operations.some(function(a) {
                    return a.environment == b && a.operationName == c
                }) || (this.localConfig.operations.push({
                    environment: b,
                    environmentName: "",
                    operationName: c,
                    password: d
                }), localStorage["reswue-operation-data"] = JSON.stringify(this.localConfig));
                var f = this.core.addOperation(b, c, d);
                e && this.setSelectedOperation(f);
                var g = new a.MapBinder(this.layerManager, this.preferences, this.dashboard, f);
                g.bind(), this.mapBinders.push(g);
                var h = new a.CrossLinksBinder(this._crossLinkAddon, f);
                h.bind(), f.active = !0, window.runHooks("plugin-reswue-operation-opened", {
                    operation: f
                })
            }, b.prototype.closeOperation = function(a, b) {
                var c = this.core.getOperation(a, b);
                this.layerManager.cleanLayers(c.data), this.layerManager.removeLayers(c.data), this.core.removeOperation(a, b);
                var d = this.mapBinders.filter(function(c) {
                        return c.operation.data.operationName == b && c.operation.data.environment == a
                    })[0],
                    e = this.mapBinders.indexOf(d);
                if (-1 == e ? console.warn("mapBinder was not registered.") : this.mapBinders.splice(e, 1), this.localConfig.operations = this.localConfig.operations.filter(function(c) {
                        return !(c.operationName == b && c.environment == a)
                    }), localStorage["reswue-operation-data"] = JSON.stringify(this.localConfig), null == this.core.selectedOperation && this.core.operations.length > 0) {
                    var f = this.core.operations[0];
                    this.setSelectedOperation(f)
                }
                window.runHooks("plugin-reswue-operation-closed", {
                    operation: c
                })
            }, b.prototype.setSelectedOperation = function(a) {
                this.core.setSelectedOperation(a.data.environment, a.data.operationName), this.localConfig.selectedEnvironment = a.data.environment, this.localConfig.selectedOperationName = a.data.operationName, localStorage["reswue-operation-data"] = JSON.stringify(this.localConfig), window.runHooks("plugin-reswue-operation-selected", {
                    operation: a
                })
            }, b.prototype.logoutAgent = function() {
                var b = [];
                return this.localConfig.operations.forEach(function(c) {
                    var d = a.Core.createApiNoOperation(c.environment, PLAYER.team, PLAYER.nickname);
                    b.push(d.logoutFromGoogle())
                }), Promise.all(b).then(function() {
                    localStorage.removeItem("reswue-my-operations")
                })
            }, b.prototype.setupMessaging = function() {
                var a = this;
                window.addEventListener("message", function(b) {
                    "reswue.updateData" === b.data && a.mapBinders.forEach(function(a) {
                        return a.refresh()
                    })
                }, !1)
            }, b.prototype.setupIitcExtensions = function() {
                window.pluginCreateHook("plugin-reswue-operation-available"), window.pluginCreateHook("plugin-reswue-operation-opened"), window.pluginCreateHook("plugin-reswue-operation-closed"), window.pluginCreateHook("plugin-reswue-operation-selected"), window.pluginCreateHook("plugin-reswue-operation-sync-finished"), void 0 === window.removeLayerGroup && (window.removeLayerGroup = function(a) {
                    if (!window.layerChooser._layers[a._leaflet_id]) throw "Layer was not found";
                    var b = window.layerChooser._layers[a._leaflet_id].name,
                        c = window.isLayerGroupDisplayed(b);
                    map.removeLayer(a), window.layerChooser.removeLayer(a), window.updateDisplayedLayerGroup(b, c)
                }), void 0 === window.removeHook && (window.removeHook = function(a, b) {
                    if ("function" != typeof b) throw "Callback must be a function.";
                    if (window._hooks[a]) {
                        var c = window._hooks[a].indexOf(b); - 1 == c ? console.warn("Callback wasn't registered for this event.") : window._hooks[a].splice(c, 1)
                    }
                })
            }, b.prototype.publishApiToWindow = function() {
                window.ResWue = a
            }, b
        }();
        a.ResWueIitcPlugin = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a() {
                throw "Static object, cannot create instance"
            }
            return a.onRequestStarted = function() {
                a._count++, this._dispatcher.dispatchEvent(new Event("change")), this._dispatcher.dispatchEvent(new Event("requeststarted"))
            }, a.onRequestFinished = function() {
                a._count = Math.max(a._count - 1, 0), this._dispatcher.dispatchEvent(new Event("change")), this._dispatcher.dispatchEvent(new Event("requestfinished"))
            }, a.addEventListener = function(b, c, d) {
                return a._dispatcher.addEventListener(b, c, d)
            }, a.removeEventListener = function(b, c, d) {
                return a._dispatcher.removeEventListener(b, c, d)
            }, Object.defineProperty(a, "count", {
                get: function() {
                    return a._count
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a, "active", {
                get: function() {
                    return 0 != a._count
                },
                enumerable: !0,
                configurable: !0
            }), a._count = 0, a._dispatcher = document.createElement("reswue"), a
        }();
        a.RequestTracker = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a(b, c, d) {
                var e = this;
                void 0 === d && (d = !0), this.onchange = void 0, this._layerManager = b, this._active = d, this._operation = c, this._container = document.createElement("span"), this._container.className = "reswue-layer";
                var f = this._container.appendChild(document.createElement("label"));
                f.appendChild(document.createTextNode("Layer: ")), this._preview = this._container.appendChild(document.createElement("span")), this._preview.className = "preview", this._select = this._container.appendChild(document.createElement("select")), this._select.id = "reswue-layer-selector-" + a._count++, f.htmlFor = this._select.id, b.getAllLayerConfigs().forEach(function(a) {
                    var b = e._select.appendChild(document.createElement("option"));
                    b.text = e.getLayerDisplayName(a), b.value = a.name;
                    var c = b.insertBefore(document.createElement("span"), b.firstChild);
                    c.style.backgroundColor = a.color
                }), this._select.addEventListener("change", function(a) {
                    return e._onChange(a)
                }, !1), this._output = document.createElement("span"), this._output.className = "output", this._broadcast = new BroadcastChannel("reswue-active-layer"), this._broadcast.addEventListener("message", function(a) {
                    e._active && e.setActiveLayer()
                }, !1), this.setActiveLayer()
            }
            return Object.defineProperty(a.prototype, "disabled", {
                get: function() {
                    return this._output.parentNode == this._container
                },
                set: function(a) {
                    a != this.disabled && (a ? this._container.replaceChild(this._output, this._select) : this._container.replaceChild(this._select, this._output))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "layerName", {
                get: function() {
                    return $(this._select).val()
                },
                set: function(a) {
                    if (this._active) throw "Setting the layer is not supported for active layer selectors";
                    $(this._select).val(a), this.update()
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "value", {
                get: function() {
                    return this._layerManager.getLayerConfig(this.layerName)
                },
                set: function(a) {
                    this.layerName = a.name
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "active", {
                get: function() {
                    return this._active
                },
                set: function(a) {
                    this._active = a, a && this.setActiveLayer()
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "container", {
                get: function() {
                    return this._container
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "label", {
                get: function() {
                    return !this._container.classList.contains("nolabel")
                },
                set: function(a) {
                    a ? this._container.classList.remove("nolabel") : this._container.classList.add("nolabel")
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.getLayerDisplayName = function(a) {
                return this._operation ? this._layerManager.getLayerDisplayName(this._operation, a) : a.displayName
            }, a.prototype.setActiveLayer = function() {
                $(this._select).val(this._layerManager.activeLayer), this.update()
            }, a.prototype._onChange = function(a) {
                this.update(), this._active && (this._layerManager.activeLayer = this.layerName), this.onchange && this.onchange(this.value)
            }, a.prototype.update = function() {
                var a = this.value;
                this._preview.style.backgroundColor = a.color, this._output.textContent = this.getLayerDisplayName(a)
            }, a._count = 0, a
        }();
        a.LayerSelector = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(c, d, e) {
                var f = this;
                this._broadcast = new BroadcastChannel("reswue-linkdialog"), this._portals = {}, this._links = [], this._operation = c, this._dashboard = d, this._layerManager = e, b._dialogs.push(this);
                var g = document.createElement("div");
                this._desc = g.appendChild(document.createElement("textarea")), this._desc.placeholder = "Description (optional)", this._desc.className = "desc";
                var h, i, j, k, l = g.appendChild(document.createElement("table"));
                [0, 1, 2, 3].forEach(function(a) {
                    var b = 0 == a ? "src" : "dst-" + a;
                    h = l.insertRow(), h.setAttribute("data-portal", b), i = h.insertCell(), 0 != a && (k = i.appendChild(document.createElement("input")), k.type = "checkbox", k.checked = !0, k.value = b, f._links.push(k)), i = h.insertCell(), i.textContent = 0 == a ? "from" : "to (#" + a + ")", i = h.insertCell(), j = i.appendChild(document.createElement("button")), j.textContent = "set", j.addEventListener("click", function(a) {
                        return f.setPortal(a)
                    }, !1), i = h.insertCell(), 0 != a && (j = i.appendChild(document.createElement("button")), j.textContent = "add", j.addEventListener("click", function(a) {
                        return f.addLinkTo(a)
                    }, !1)), i = h.insertCell(), i.className = "portal portal-" + b, f._portals[b] = i, f.updatePortal(b)
                });
                var m = g.appendChild(document.createElement("div"));
                m.className = "buttonbar";
                var n = m.appendChild(document.createElement("span")),
                    o = n.appendChild(document.createElement("span"));
                o.className = "arrow", o.textContent = "↳", j = n.appendChild(document.createElement("button")), j.textContent = "add all", j.addEventListener("click", function(a) {
                    return f.addAllLinks()
                }, !1);
                var p = m.appendChild(document.createElement("label"));
                this._reversed = p.appendChild(document.createElement("input")), this._reversed.type = "checkbox", p.appendChild(document.createTextNode(" reverse"));
                var q = new a.LayerSelector(this._layerManager, this._operation.data);
                q.label = !1, m.appendChild(q.container), j = m.appendChild(document.createElement("button")), j.textContent = "close", j.addEventListener("click", function(a) {
                    return f._dialog.dialog("close")
                }, !1);
                var r = function(a) {
                    return f.onMessage(a)
                };
                this._broadcast.addEventListener("message", r, !1), this._dialog = window.dialog({
                    title: this._operation.data.operationName + " Links",
                    width: "auto",
                    height: "auto",
                    html: g,
                    dialogClass: "reswue-dialog reswue-dialog-links",
                    closeCallback: function(a) {
                        f._broadcast.removeEventListener("message", r, !1);
                        var c = b._dialogs.indexOf(f); - 1 !== c && b._dialogs.splice(c, 1)
                    }
                }), this._dialog.dialog("option", "buttons", {})
            }
            return b.show = function(a, c, d) {
                for (var e = 0, f = b._dialogs; e < f.length; e++) {
                    var g = f[e];
                    if (g._operation == a) return g.focus(), g
                }
                return new b(a, c, d)
            }, b.prototype.focus = function() {
                this._dialog.dialog("open")
            }, b.prototype.onMessage = function(a) {
                "setPortal" === a.data.type && this.updatePortal(a.data.name)
            }, b.prototype.setPortal = function(b) {
                var c = b.currentTarget.parentNode.parentNode.getAttribute("data-portal"),
                    d = a.UiHelper.getSelectedPortal();
                d ? localStorage["reswue-portal-" + c] = JSON.stringify(d) : delete localStorage["reswue-portal-" + c], this.updatePortal(c), this._broadcast.postMessage({
                    type: "setPortal",
                    name: c
                })
            }, b.prototype.getPortal = function(a) {
                try {
                    return JSON.parse(localStorage["reswue-portal-" + a])
                } catch (b) {
                    return null
                }
            }, b.prototype.updatePortal = function(b) {
                var c = this.getPortal(b),
                    d = this._portals[b];
                $(d).empty(), c && d.appendChild(a.UiHelper.getPortalLink(c))
            }, b.prototype.addLinkTo = function(a) {
                var b = this,
                    c = a.currentTarget.parentNode.parentNode.getAttribute("data-portal"),
                    d = this.getPortal(c),
                    e = this.getPortal("src");
                if (!e || !d) return void alert("Please select target and destination portals first!");
                var f = this._reversed.checked;
                Promise.all([this.addPortal(e), this.addPortal(d)]).then(function() {
                    return f ? b.addLink(d, e) : b.addLink(e, d)
                })["catch"](function(a) {
                    throw alert(a.message), console.log(a), a
                })
            }, b.prototype.addAllLinks = function() {
                var a = this,
                    b = this.getPortal("src");
                if (!b) return void alert("Please select a target portal first!");
                var c = this._links.map(function(b) {
                    return b.checked ? a.getPortal(b.value) : null
                }).filter(function(a) {
                    return null != a
                });
                if (0 == c.length) return void alert("Please select a destination portal first!");
                var d = this._reversed.checked,
                    e = this.addPortal(b);
                Promise.all(c.map(function(c) {
                    return Promise.all([e, a.addPortal(c)]).then(function() {
                        return d ? a.addLink(c, b) : a.addLink(b, c)
                    })
                }))["catch"](function(a) {
                    throw alert(a.message), console.log(a), a
                })
            }, b.prototype.addPortal = function(b) {
                return b ? this._operation.data.portals.some(function(a) {
                    return a.id == b.id
                }) ? Promise.resolve(this._operation.data.portals) : a.UiCommands.addPortal(this._operation, this._layerManager, b, "", !0) : Promise.reject("no portal given")
            }, b.prototype.addLink = function(a, b) {
                var c = this._desc.value;
                if (!a || !b) return Promise.reject("no portal given");
                var d = this._layerManager.activeLayer,
                    e = !this._operation.data.operation.isAgentOperator;
                return this._operation.linkService.addLink(a.id, b.id, d, e, PLAYER.nickname, c)
            }, b._dialogs = [], b
        }();
        a.LinkDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(b, c, d) {
                var e = this;
                this._operation = b, this._layerManager = c, this._link = d;
                var f = this._operation.data.addUpdateNotificationHandler({
                        updateOperation: function(a, b) {},
                        updatePortals: function(a, b) {
                            e._update()
                        },
                        updateLinks: function(a, b) {
                            e._update()
                        },
                        updatePolygons: function(a, b) {},
                        updateAlerts: function(a, b) {},
                        updateAgents: function(a, b) {},
                        updateGroups: function(a, b) {}
                    }),
                    g = document.createElement("div"),
                    h = g.appendChild(document.createElement("p"));
                h.className = "linkportals", this._from = h.appendChild(document.createElement("span")), h.appendChild(document.createTextNode(" → ")), this._to = h.appendChild(document.createElement("span")), h = g.appendChild(document.createElement("p")), this._desc = h.appendChild(document.createElement("textarea")), this._desc.autofocus = !0, this._desc.className = "desc", this._desc.placeholder = "Description (optional)", h = g.appendChild(document.createElement("p")), h.className = "details";
                var i = h.appendChild(document.createElement("label"));
                i.className = "keys", i.appendChild(document.createTextNode("Keys shared: ")), this._keys = i.appendChild(document.createElement("input")), this._keys.type = "number", this._keys.min = "0", this._layer = new a.LayerSelector(this._layerManager, this._operation.data, !1), this._layer.layerName = d.layerName, this._layer.label = !1, h.appendChild(this._layer.container), this._update(), this._dialog = window.dialog({
                    html: g,
                    dialogClass: "reswue-dialog reswue-dialog-link",
                    title: this._operation.getDisplayName() + " - Edit Link",
                    width: 300,
                    closeCallback: function() {
                        e._operation.data.removeUpdateNotificationHandler(f)
                    }
                }), this._dialog.dialog("option", "buttons", {
                    OK: function(a) {
                        e.save().then(function() {
                            return e.close()
                        })
                    },
                    Apply: function(a) {
                        e.save()
                    },
                    Cancel: function(a) {
                        e.close()
                    }
                })
            }
            return b.prototype._update = function() {
                var a = this,
                    b = this._operation.data.links.filter(function(b) {
                        return b.portalFrom.id == a._link.portalFrom.id && b.portalTo.id == a._link.portalTo.id || b.portalFrom.id == a._link.portalTo.id && b.portalTo.id == a._link.portalFrom.id
                    });
                return b[0] ? (this._link = b[0], this.empty(this._from).appendChild(this.getPortalLink(this._link.portalFrom.id)), this.empty(this._to).appendChild(this.getPortalLink(this._link.portalTo.id)), this._desc.value = this._link.description, this._keys.value = "" + this._link.keysShared, void(this._layer.layerName = this._link.layerName)) : void this.close()
            }, b.prototype.getPortalLink = function(b) {
                return a.UiHelper.getPortalLink(this._operation.data.getPortal(b))
            }, b.prototype.empty = function(a) {
                for (; a.firstChild;) a.removeChild(a.firstChild);
                return a
            }, b.prototype.close = function() {
                this._dialog.dialog("close")
            }, b.prototype.save = function() {
                var a = $.extend({}, this._link, {
                    keysShared: parseInt(this._keys.value),
                    description: this._desc.value,
                    layerName: this._layer.layerName
                });
                return this._operation.linkService.editLink(a, PLAYER.nickname)
            }, b
        }();
        a.LinkEditDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a() {
                var a = this;
                this._button = document.createElement("a"), this._button.href = "#", this._button.addEventListener("click", function(b) {
                    a.onButtonClick(b)
                }, !1), this._button.className = "reswue-overflow-button", this._button.appendChild(document.createElement("span")).textContent = "⋮", this._handler = function(b) {
                    if ("mousedown" == b.type) {
                        var c = b.target;
                        do
                            if (c == a._menu) return;
                        while (c = c.parentNode)
                    }
                    a.hide()
                }, this.items = []
            }
            return Object.defineProperty(a.prototype, "button", {
                get: function() {
                    return this._button
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "items", {
                set: function(a) {
                    var b = this;
                    return this.hide(), a instanceof HTMLElement ? (this._menu = a, void(this._menu.tabIndex = 0)) : (this._menu = document.createElement("ul"), this._menu.tabIndex = 0, this._menu.className = "reswue-overflow-menu", void a.forEach(function(a) {
                        var c = b._menu.appendChild(document.createElement("li"));
                        if ("string" == typeof a.label) {
                            var d = c.appendChild(document.createElement("a"));
                            d.href = "#", d.textContent = a.label
                        } else a.label(c);
                        c.addEventListener("click", function(b) {
                            b.preventDefault(), a.onclick(b)
                        }, !1)
                    }))
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.onButtonClick = function(a) {
                return a.preventDefault(), a.stopPropagation(), this.show(), !1
            }, a.prototype.show = function() {
                document.body.appendChild(this._menu), $(this._menu).position({
                    my: "right top",
                    at: "right bottom",
                    of: this._button,
                    collision: "flipfit"
                }), document.removeEventListener("click", this._handler, !1), document.addEventListener("click", this._handler, !1), document.removeEventListener("mousedown", this._handler, !1), document.addEventListener("mousedown", this._handler, !1), this._menu.focus()
            }, a.prototype.hide = function() {
                document.removeEventListener("click", this._handler, !1), document.removeEventListener("mousedown", this._handler, !1), this._menu && this._menu.parentNode && this._menu.parentNode.removeChild(this._menu)
            }, a
        }();
        a.OverflowMenu = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(b, c, d) {
                var e = this;
                this._operation = b, this._layerManager = c, this._polygon = d;
                var f = this._operation.data.addUpdateNotificationHandler({
                        updateOperation: function(a, b) {},
                        updatePortals: function(a, b) {},
                        updateLinks: function(a, b) {},
                        updatePolygons: function(a, b) {
                            e._update()
                        },
                        updateAlerts: function(a, b) {},
                        updateAgents: function(a, b) {},
                        updateGroups: function(a, b) {}
                    }),
                    g = document.createElement("div"),
                    h = g.appendChild(document.createElement("p"));
                this._desc = h.appendChild(document.createElement("textarea")), this._desc.autofocus = !0, this._desc.className = "desc", this._desc.placeholder = "Description (optional)", h = g.appendChild(document.createElement("p")), h.className = "details";
                var i = h.appendChild(document.createElement("label"));
                i.className = "color", i.appendChild(document.createTextNode("Color: ")), this._color = i.appendChild(document.createElement("input")), this._color.type = "color", this._color.value = this._polygon.color, this._color.addEventListener("change", function() {
                    $.fn.spectrum && $(e._color).spectrum("set", e._color.value)
                }), $.fn.spectrum && $(this._color).spectrum({
                    flat: !1,
                    clickoutFiresChange: !0,
                    showInput: !0,
                    showButtons: !0,
                    showPalette: !0,
                    showSelectionPalette: !0,
                    preferredFormat: "hex",
                    className: "reswue-color-picker",
                    containerClassName: "reswue-color-picker",
                    palette: [
                        ["#a24ac3", "#514ac3", "#4aa8c3", "#51c34a"],
                        ["#c1c34a", "#c38a4a", "#c34a4a", "#c34a6f"],
                        ["#000000", "#666666", "#bbbbbb", "#ffffff"],
                        [], this._layerManager.getAllLayerConfigs().map(function(a) {
                            return a.color
                        }), []
                    ],
                    change: function(a) {
                        var b = a.toHexString();
                        b != e._color.value && (e._color.value = b)
                    }
                }), this._layer = new a.LayerSelector(this._layerManager, this._operation.data, null === this._polygon.id), null !== this._polygon.id && (this._layer.layerName = this._polygon.layerName), h.appendChild(this._layer.container), this._update(), this._promise = new Promise(function(a, b) {
                    e._onAdded = a, e._onClose = b
                }), this._dialog = window.dialog({
                    html: g,
                    dialogClass: "reswue-dialog reswue-dialog-polygon",
                    title: this._operation.getDisplayName() + " - " + (null === this._polygon.id ? "Add Polygon" : "Edit Polygon"),
                    width: 300,
                    closeCallback: function() {
                        e._operation.data.removeUpdateNotificationHandler(f)
                    }
                }), null === this._polygon.id ? this._dialog.dialog("option", "buttons", {
                    "Add polygon": function(a) {
                        return e.save().then(function() {
                            return e.close()
                        })
                    },
                    Cancel: function(a) {
                        return e.close()
                    }
                }) : this._dialog.dialog("option", "buttons", {
                    OK: function(a) {
                        return e.save().then(function() {
                            return e.close()
                        })
                    },
                    Apply: function(a) {
                        return e.save()
                    },
                    Cancel: function(a) {
                        return e.close()
                    }
                })
            }
            return b.prototype._update = function() {
                var a = this;
                if (null !== this._polygon.id) {
                    var b = this._operation.data.polygons.filter(function(b) {
                        return b.id == a._polygon.id
                    });
                    if (!b[0]) return void this.close();
                    this._polygon = b[0], this._desc.value = this._polygon.description, this._layer.layerName = this._polygon.layerName, this._color.value = this._polygon.color, $.fn.spectrum && $(this._color).spectrum("set", this._color.value)
                }
            }, Object.defineProperty(b.prototype, "waitForCreation", {
                get: function() {
                    return this._promise
                },
                enumerable: !0,
                configurable: !0
            }), b.prototype.close = function() {
                this._dialog.dialog("close"), this._onClose()
            }, b.prototype.save = function() {
                var a = this;
                if (null === this._polygon.id) {
                    var b = this._polygon.latLngs,
                        c = [{
                            type: "polygon",
                            latLngs: b.getLatLngs()
                        }];
                    return this._operation.polygonService.addPolygon(JSON.stringify(c), this._color.value, this._layer.layerName, this._desc.value, PLAYER.nickname).then(function(b) {
                        return a._onAdded(), b
                    })
                }
                var d = $.extend({}, this._polygon, {
                    description: this._desc.value,
                    layerName: this._layer.layerName,
                    color: this._color.value
                });
                return this._operation.polygonService.editPolygon(d, PLAYER.nickname)
            }, b
        }();
        a.PolygonEditDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(c, d, e) {
                var f = this;
                this._operation = c, this._dashboard = d, this._layerManager = e, b._dialogs.push(this);
                var g = document.createElement("div"),
                    h = g.appendChild(document.createElement("p"));
                h.className = "name";
                var i = h.appendChild(document.createElement("label"));
                i.appendChild(document.createTextNode("Name: ")), this._name = i.appendChild(document.createElement("input")), h = g.appendChild(document.createElement("p")), h.className = "desc", this._desc = h.appendChild(document.createElement("textarea")), this._desc.autofocus = !0, this._desc.placeholder = "Description (optional)", h = g.appendChild(document.createElement("p")), h.className = "details", i = h.appendChild(document.createElement("label")), i.appendChild(document.createTextNode("Keys farmed: ")), i.className = "keys", this._keys = i.appendChild(document.createElement("input")), this._keys.type = "number", this._keys.min = "0", this._layer = new a.LayerSelector(this._layerManager, this._operation.data), this._layer.label = !1, h.appendChild(this._layer.container), this._positionWarning = g.appendChild(document.createElement("p")), this._positionWarning.className = "positionwarning hidden", this._positionWarning.textContent = "The portal has been moved since it's been added to ResWue. You may want to fix the position.";
                var j = function(a) {
                    return f.onPortalSelected()
                };
                window.addHook("portalSelected", j);
                var k = this._operation.data.addUpdateNotificationHandler({
                    updateOperation: function(a, b) {},
                    updatePortals: function(a, b) {
                        f.onPortalSelected()
                    },
                    updateLinks: function(a, b) {},
                    updatePolygons: function(a, b) {},
                    updateAlerts: function(a, b) {},
                    updateAgents: function(a, b) {},
                    updateGroups: function(a, b) {}
                });
                this._dialog = window.dialog({
                    title: this._operation.data.operationName + " Portals",
                    html: g,
                    dialogClass: "reswue-dialog reswue-dialog-portals",
                    closeCallback: function() {
                        window.removeHook("portalSelected", j), f._operation.data.removeUpdateNotificationHandler(k);
                        var a = b._dialogs.indexOf(f); - 1 !== a && b._dialogs.splice(a, 1)
                    }
                }), this.onPortalSelected(), this.focus()
            }
            return b.show = function(a, c, d) {
                for (var e = 0, f = b._dialogs; e < f.length; e++) {
                    var g = f[e];
                    if (g._operation == a) return g.focus(), g
                }
                return new b(a, c, d)
            }, b.prototype.focus = function() {
                this._dialog.dialog("open"), this._dialog.parent().find("[autofocus]").eq(0).focus()
            }, b.prototype.getSelectedPortal = function() {
                if (null == window.selectedPortal) throw "no portal selected";
                return this._operation.data.getPortal(window.selectedPortal)
            }, b.prototype.onPortalSelected = function() {
                var a = this,
                    b = [],
                    c = null;
                if (this._desc.autofocus = !0, this._positionWarning.classList.add("hidden"), window.selectedPortal)
                    if (c = this.getSelectedPortal()) this.checkPosition() || (b.push({
                        text: "Fix position",
                        click: function(b) {
                            return a.fixPosition()
                        }
                    }), this._positionWarning.classList.remove("hidden")), b.push({
                        text: "Delete",
                        click: function(b) {
                            return a.remove()
                        }
                    }), b.push({
                        text: "Save",
                        click: function(b) {
                            return a.save()
                        }
                    });
                    else {
                        var d = this;
                        b.push({
                            text: "Add portal",
                            click: function(b) {
                                return a.add()
                            },
                            create: function(a, b) {
                                this.autofocus = !0, d._desc.autofocus = !1
                            }
                        })
                    }
                else b.push({
                    text: "Select a portal",
                    disabled: !0
                });
                c ? (this._name.value = c.name, this._keys.value = c.keysFarmed, this._desc.value = c.description, this._layer.active = !1, this._layer.layerName = c.layerName) : (this._name.value = window.selectedPortal && window.portals[window.selectedPortal] && window.portals[window.selectedPortal].options.data.title ? window.portals[window.selectedPortal].options.data.title : "", this._keys.value = "0", this._layer.active = !0), b.push({
                    text: "Close",
                    click: function(b) {
                        return a._dialog.dialog("close")
                    }
                }), this._dialog.dialog("option", "buttons", b)
            }, b.prototype.add = function() {
                var b = this,
                    c = $.extend({}, a.UiHelper.getSelectedPortal(), {
                        name: this._name.value
                    }),
                    d = parseInt(this._keys.value);
                a.UiCommands.addPortal(this._operation, this._layerManager, c, this._desc.value).then(function(a) {
                    if (0 != d) {
                        var e = $.extend({}, b._operation.data.getPortal(c.id), {
                            keysFarmed: d
                        });
                        return b._operation.portalService.editPortal(e, PLAYER.nickname)
                    }
                    return a
                })
            }, b.prototype.save = function() {
                var a = $.extend({}, this.getSelectedPortal(), {
                    name: this._name.value,
                    keysFarmed: parseInt(this._keys.value),
                    description: this._desc.value,
                    layerName: this._layer.layerName
                });
                this._operation.portalService.editPortal(a, PLAYER.nickname)
            }, b.prototype.remove = function() {
                a.UiCommands.deletePortal(this._operation, window.selectedPortal)
            }, b.prototype.fixPosition = function() {
                var b = this,
                    c = a.UiHelper.getSelectedPortal(),
                    d = $.extend({}, this.getSelectedPortal(), {
                        lat: c.lat,
                        lng: c.lng
                    });
                this._operation.portalService.editPortal(d, PLAYER.nickname).then(function(a) {
                    b._operation.data.updateLinks(b._operation.data.links)
                })
            }, b.prototype.checkPosition = function() {
                var a = this.getSelectedPortal(),
                    b = Math.round(1e6 * parseFloat(a.lat)),
                    c = Math.round(1e6 * parseFloat(a.lng)),
                    d = window.portals[window.selectedPortal].options.data;
                return d.latE6 === b && d.lngE6 === c
            }, b._dialogs = [], b
        }();
        a.PortalDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(b, c, d) {
                var e = this;
                this._operation = b, this._dashboard = c, this._layerManager = d, this._table = new a.Sortable, this._table.fields = [{
                    name: "Layer",
                    value: function(a) {
                        return a.layerName
                    },
                    sortValue: function(a) {
                        for (var b = e._layerManager.getAllLayerConfigs(), c = 0; c < b.length; c++)
                            if (b[c].name == a) return c
                    },
                    format: function(b, c) {
                        var d = new a.LayerSelector(e._layerManager, e._operation.data, !1);
                        d.layerName = c, d.disabled = !0, d.label = !1, b.appendChild(d.container)
                    }
                }, {
                    name: "Title",
                    value: function(a) {
                        return a
                    },
                    sortValue: function(a) {
                        return a.name
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(b, c) {
                        b.appendChild(a.UiHelper.getPortalLink(c))
                    }
                }, {
                    name: "Description",
                    value: function(a) {
                        return a.description
                    },
                    sort: function(a, b) {
                        return a.localeCompare(b)
                    },
                    format: function(a, b) {
                        a.className = "desc", a.innerHTML = window.markdown.toHTML(window.escapeHtmlSpecialChars(b))
                    }
                }, {
                    name: "Keys farmed",
                    value: function(a) {
                        return a.keysFarmed
                    },
                    format: function(a, b, c) {
                        if (a.classList.add("keys"), a.textContent = b, b < e.getKeysNeeded(c)) {
                            var d = a.appendChild(document.createElement("span"));
                            d.className = "warn", d.textContent = "⚠"
                        }
                    }
                }, {
                    name: "Keys shared",
                    value: function(a) {
                        return e._operation.data.links.filter(function(b) {
                            return b.portalTo.id == a.id && b.keysShared > 0
                        }).length
                    },
                    format: function(a, b, c) {
                        if (a.classList.add("keys"), a.textContent = b, b < e.getKeysNeeded(c)) {
                            var d = a.appendChild(document.createElement("span"));
                            d.className = "warn", d.textContent = "⚠"
                        }
                    }
                }, {
                    name: "Keys needed",
                    title: "Equals number of incoming links",
                    value: function(a) {
                        return e.getKeysNeeded(a)
                    },
                    format: function(a, b) {
                        a.classList.add("keys"), a.textContent = b
                    }
                }, {
                    name: "Outg. Links",
                    title: "Number of outgoing links<br><br>(For number of incoming links, see <i>Keys needed</i>)",
                    value: function(a) {
                        return e._operation.data.links.filter(function(b) {
                            return b.portalFrom.id == a.id
                        }).length
                    },
                    format: function(a, b) {
                        a.classList.add("links"), a.textContent = b;
                        var c = Math.ceil(b / 8 - 1);
                        if (c > 0) {
                            var d = a.appendChild(document.createElement("span"));
                            d.className = 4 >= c ? "warn" : "warn error", d.textContent = "⚠", a.title = 4 >= c ? "This portal needs " + c + " Ultra Link Amp" + (1 == c ? "" : "s") + " to support more than 8 outgoing links." : "A portal with 4 Ultra Link Amps cannot have more than 40 outgoing links."
                        }
                    }
                }, {
                    name: "",
                    sort: null,
                    value: function(a) {
                        return a
                    },
                    format: function(a, b) {
                        return e.makeMenu(a, b)
                    }
                }], this._table.sortBy = 1, this._setPortals();
                var f = this._operation.data.addUpdateNotificationHandler({
                        updateOperation: function(a, b) {},
                        updatePortals: function(a, b) {
                            e._setPortals()
                        },
                        updateLinks: function(a, b) {
                            e._setPortals()
                        },
                        updatePolygons: function(a, b) {},
                        updateAlerts: function(a, b) {},
                        updateAgents: function(a, b) {},
                        updateGroups: function(a, b) {}
                    }),
                    g = window.dialog({
                        html: this._table.table,
                        dialogClass: "reswue-dialog reswue-dialog-portallist",
                        title: this._operation.getDisplayName() + " Portals",
                        width: "auto",
                        closeCallback: function() {
                            e._operation.data.removeUpdateNotificationHandler(f)
                        }
                    }),
                    h = g.dialog("option", "buttons");
                g.dialog("option", "buttons", $.extend({}, {
                    "Add portals": function(b) {
                        a.PortalDialog.show(e._operation, e._dashboard, e._layerManager)
                    }
                }, h))
            }
            return b.prototype.getKeysNeeded = function(a) {
                return this._operation.data.links.filter(function(b) {
                    return b.portalTo.id == a.id
                }).length
            }, b.prototype._setPortals = function() {
                this._table.items = this._operation.data.portals
            }, b.prototype.editPortal = function(b) {
                window.renderPortalDetails(b.id),
                    a.PortalDialog.show(this._operation, this._dashboard, this._layerManager)
            }, b.prototype.showLinks = function(b) {
                new a.LinkListDialog(this._operation, this._dashboard, this._layerManager, b.id)
            }, b.prototype.makeMenu = function(b, c) {
                var d = this,
                    e = new a.OverflowMenu;
                e.items = [{
                    label: "Links",
                    onclick: function() {
                        return d.showLinks(c)
                    }
                }, {
                    label: "Edit",
                    onclick: function() {
                        return d.editPortal(c)
                    }
                }, {
                    label: "Delete",
                    onclick: function() {
                        return a.UiCommands.deletePortal(d._operation, c.id)
                    }
                }], b.className = "menu", b.appendChild(e.button)
            }, b
        }();
        a.PortalListDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function b(a, b, c) {
                this._core = a, this._preferences = b, this._crossLinkAddon = c
            }
            return b.create = function(a, c, d, e) {
                var f = new b(a, c, d),
                    g = f.createDialog();
                e.append(g)
            }, b.prototype.createDialog = function() {
                function c() {
                    if (b.isNodeAttached(h.get(0))) {
                        e.loadOrInit();
                        var a = e.fastSyncMode,
                            f = Date.now();
                        if (a > f) {
                            var g = Math.round((a - f) / 6e4),
                                j = g > 60 ? Math.floor(g / 60) + "h" + window.zeroPad(g % 60, 2) + "min" : g + "min";
                            h.empty().append($("<label>").text("Fast sync will disable in " + j + ". ").append($("<a>").text("Disable now.").attr("href", "#").on("click", function(a) {
                                return e.fastSyncMode = 0, e.save(), c.call(d), a.preventDefault(), !1
                            })))
                        } else h.empty().append($("<label>").text("Fast sync mode: ").append($("<select>").append($("<option>").prop({
                            value: "0",
                            text: "Disabled"
                        })).append($("<option>").prop({
                            value: "1",
                            text: "1h"
                        })).append($("<option>").prop({
                            value: "2",
                            text: "2h"
                        })).append($("<option>").prop({
                            value: "4",
                            text: "4h"
                        })).append($("<option>").prop({
                            value: "6",
                            text: "6h"
                        })).on("change", function(a) {
                            e.fastSyncMode = Date.now() + 60 * parseInt($(this).val()) * 60 * 1e3, e.save(), d._core.operations.forEach(function(a) {
                                return a.syncVolatile()
                            }), c.call(d)
                        })));
                        clearTimeout(i), i = setTimeout(c.bind(d), a > f && f + 12e4 > a ? 1e4 : 6e4)
                    }
                }
                var d = this,
                    e = this._preferences,
                    f = $("<div />").append("<h2>Preferences</h2>").append("<p>Preferences are not synced to other browsers or agents."),
                    g = $("<fieldset>").appendTo(f).append("<legend>Map display</legend>").append($("<p>").append($("<label>").text(" Group agents").prepend($("<input>").prop({
                        type: "checkbox",
                        checked: e.groupAgentsOnMap !== !1
                    }).on("change", function() {
                        e.groupAgentsOnMap = $(this).prop("checked"), e.save(), d.refreshAgents()
                    })))).append($("<p>").append($("<label>").text(" Show agent names").prepend($("<input>").prop({
                        type: "checkbox",
                        checked: e.showAgentNames !== !1
                    }).on("change", function() {
                        e.showAgentNames = $(this).prop("checked"), e.save(), d.refreshAgents()
                    })))).append($("<p>").append($("<label>").text(" Show polygon labels").prepend($("<input>").prop({
                        type: "checkbox",
                        checked: e.showPolygonLabels !== !1
                    }).on("change", function() {
                        e.showPolygonLabels = $(this).prop("checked"), e.save(), d.refreshPolygons()
                    })))).append($("<p>").append($("<label>").text(" Disable polygon popups").prepend($("<input>").prop({
                        type: "checkbox",
                        checked: e.disablePolygonPopups !== !1
                    }).on("change", function() {
                        e.disablePolygonPopups = $(this).prop("checked"), e.save(), d.refreshPolygons()
                    })))).append($("<p>").append($("<label>").text("Portal overlay: ").append($("<select>").append($("<option>").prop({
                        value: "false",
                        text: "disabled"
                    })).append($("<option>").prop({
                        value: "links",
                        text: "outgoing links"
                    })).append($("<option>").prop({
                        value: "needed",
                        text: "keys needed/incoming links"
                    })).append($("<option>").prop({
                        value: "farmed",
                        text: "keys farmed"
                    })).append($("<option>").prop({
                        value: "remaining",
                        text: "keys missing"
                    })).val(e.showKeys).on("change", function() {
                        e.showKeys = $(this).val(), e.save(), d.refreshPortals()
                    }))));
                g = $("<fieldset>").appendTo(f).append("<legend>Alert dialog</legend>").append($("<p>").append($("<label>").text(" Show agents in target list").prepend($("<input>").prop({
                    type: "checkbox",
                    checked: e.agentsInAlertTargetList !== !1
                }).on("change", function() {
                    e.agentsInAlertTargetList = $(this).prop("checked"), e.save(), d.refreshAgents()
                })))).append($("<p>").append($("<label>").text(" Sort agents by distance").prepend($("<input>").prop({
                    type: "checkbox",
                    checked: e.showAgentSortedByDistance !== !1
                }).on("change", function() {
                    e.showAgentSortedByDistance = $(this).prop("checked"), e.save(), d.refreshAgents()
                })))), g = $("<fieldset>").appendTo(f).append("<legend>Behavior</legend>");
                var h = $("<p>").appendTo(g),
                    i = null;
                return clearTimeout(i), setTimeout(c.bind(d), 100), a.DrawToolAddon.isLoaded() && g.append($("<p>").append($("<label>").text(" Upload polygons from DrawTools").prepend($("<input>").prop({
                    type: "checkbox",
                    checked: e.uploadDrawToolsPolygons !== !1
                }).on("change", function() {
                    e.uploadDrawToolsPolygons = $(this).prop("checked"), e.save()
                })))), a.CrossLinksAddon.isLoaded() && g.append($("<p>").append($("<label>").text(" Hide cross links from targeted portals").prepend($("<input>").prop({
                    type: "checkbox",
                    checked: e.targetCrossLinks !== !1
                }).on("change", function() {
                    e.targetCrossLinks = $(this).prop("checked"), e.save(), a.CrossLinksAddon.isLoaded() && d._crossLinkAddon.enableResWueAlertOverride(e.targetCrossLinks), d._crossLinkAddon.checkAllDrawToolsLinks(), d._crossLinkAddon.checkAllReswueLinks()
                })))), f
            }, b.isNodeAttached = function(a) {
                do
                    if (a == document.documentElement) return !0;
                while (a = a.parentNode);
                return !1
            }, b.prototype.refreshAgents = function() {
                this._core.operations.forEach(function(a) {
                    return a.data.updateAgents(a.data.agents)
                }), this._core.operations.forEach(function(a) {
                    return a.data.updateGroups(a.data.groups)
                })
            }, b.prototype.refreshPortals = function() {
                this._core.operations.forEach(function(a) {
                    return a.data.updatePortals(a.data.portals)
                })
            }, b.prototype.refreshPolygons = function() {
                this._core.operations.forEach(function(a) {
                    return a.data.updatePolygons(a.data.polygons)
                })
            }, b
        }();
        a.PreferencesDialog = b
    }(ResWue || (ResWue = {}));
    var ResWue;
    ! function(a) {
        var b = function() {
            function a() {
                this._items = [], this._fields = [], this._sortBy = 0, this._sortAsc = !0, this._table = document.createElement("table"), this._table.className = "reswue-table", this._head = this._table.appendChild(document.createElement("thead")), this._body = this._table.appendChild(document.createElement("tbody")), this.renderHead()
            }
            return Object.defineProperty(a.prototype, "sortBy", {
                get: function() {
                    return this._sortBy
                },
                set: function(a) {
                    this._sortBy = a, this.sort()
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "sortAsc", {
                get: function() {
                    return this._sortAsc
                },
                set: function(a) {
                    this._sortAsc = a, this.sort()
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "table", {
                get: function() {
                    return this._table
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "items", {
                get: function() {
                    return this._items.map(function(a) {
                        return a.obj
                    })
                },
                set: function(a) {
                    var b = this;
                    this._items = a.map(function(a) {
                        var c = document.createElement("tr"),
                            d = {
                                obj: a,
                                row: c,
                                index: 0,
                                values: [],
                                sortValues: []
                            };
                        return b._fields.forEach(function(b) {
                            var e = b.value(a);
                            d.values.push(e), d.sortValues.push(b.sortValue ? b.sortValue(e, a) : e);
                            var f = c.insertCell(-1);
                            b.format ? b.format(f, e, a) : f.textContent = e
                        }), d
                    }), this.sort()
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "fields", {
                get: function() {
                    return this._fields
                },
                set: function(a) {
                    this._fields = a, this.renderHead()
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.renderHead = function() {
                var a = this;
                this.empty(this._head);
                var b = this._head.insertRow(-1);
                this._fields.forEach(function(c, d) {
                    var e = b.appendChild(document.createElement("th"));
                    e.textContent = c.name, c.title && (e.title = c.title), null !== c.sort && (e.classList.add("sortable"), e.tabIndex = 0, e.addEventListener("keypress", function(a) {
                        13 == a.keyCode && a.target.dispatchEvent(new MouseEvent("click", {
                            bubbles: !0,
                            cancelable: !0
                        }))
                    }, !1), e.addEventListener("click", function(b) {
                        d == a._sortBy ? a._sortAsc = !a._sortAsc : (a._sortBy = d, a._sortAsc = c.defaultAsc === !1 ? !1 : !0), a.sort()
                    }, !1))
                })
            }, a.prototype.sort = function(a, b) {
                var c = this;
                this.empty(this._body);
                var d = this._fields[this._sortBy];
                this._items.forEach(function(a, b) {
                    return a.index = b
                }), this._items.sort(function(a, b) {
                    var e = a.sortValues[c._sortBy],
                        f = b.sortValues[c._sortBy],
                        g = 0;
                    return g = d.sort ? d.sort(e, f, a.obj, b.obj) : f > e ? -1 : e > f ? 1 : 0, 0 == g && (g = a.index - b.index), c._sortAsc ? g : -g
                }), this._items.forEach(function(a) {
                    return c._body.appendChild(a.row)
                }), $(this._head.getElementsByClassName("sorted")).removeClass("sorted asc desc");
                var e = this._head.rows[0].children[this._sortBy];
                e.classList.add("sorted"), e.classList.add(this._sortAsc ? "asc" : "desc")
            }, a.prototype.empty = function(a) {
                for (; a.firstChild;) a.removeChild(a.firstChild)
            }, a
        }();
        a.Sortable = b
    }(ResWue || (ResWue = {}));
    var setup = function() {
        ResWue.ResWueIitcPlugin.setupAfterIitc("1.49.1", !0)
    };
    setup.info = plugin_info; //add the script info data to the function as a property
    if (!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if (window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = {
    version: GM_info.script.version,
    name: GM_info.script.name,
    description: GM_info.script.description
};
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);
