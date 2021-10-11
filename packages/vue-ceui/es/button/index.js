import { defineComponent, openBlock, createElementBlock, createElementVNode, toDisplayString } from 'vue';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
(process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
(process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];

var withInstall = function (main, extra) {
    main.install = function (app) {
        for (var _i = 0, _a = __spreadArray([main], Object.values(extra !== null && extra !== void 0 ? extra : {}), true); _i < _a.length; _i++) {
            var comp = _a[_i];
            app.component(comp.name, comp);
        }
    };
    if (extra) {
        for (var _i = 0, _a = Object.entries(extra); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], comp = _b[1];
            main[key] = comp;
        }
    }
    return main;
};

var script = defineComponent({
  name: 'CeButton',
  componentName: 'CeButton',
  props: {
    name: {
      type: String,
      default: '确认',
    },
  },
  setup() {
    return {
      abc: 'abc',
    };
  },
});

const _hoisted_1 = { class: "ce-button" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("button", _hoisted_1, toDisplayString(_ctx.name), 1 /* TEXT */)
  ]))
}

script.render = render;
script.__file = "packages/components/button/button.vue";

var CeButton = withInstall(script);

export { CeButton, CeButton as default };
//# sourceMappingURL=index.js.map
