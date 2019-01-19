(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-present-present-module"],{

/***/ "./node_modules/angular-froala-wysiwyg/editor/editor.directive.js":
/*!************************************************************************!*\
  !*** ./node_modules/angular-froala-wysiwyg/editor/editor.directive.js ***!
  \************************************************************************/
/*! exports provided: FroalaEditorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FroalaEditorDirective", function() { return FroalaEditorDirective; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FroalaEditorDirective = (function () {
    function FroalaEditorDirective(el, zone) {
        this.zone = zone;
        // editor options
        this._opts = {
            immediateAngularModelUpdate: false,
            angularIgnoreAttrs: null
        };
        this.SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
        this.INNER_HTML_ATTR = 'innerHTML';
        this._hasSpecialTag = false;
        this._listeningEvents = [];
        this._editorInitialized = false;
        this._oldModel = null;
        // Begin ControlValueAccesor methods.
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // froalaModel directive as output: update model if editor contentChanged
        this.froalaModelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        // froalaInit directive as output: send manual editor initialization
        this.froalaInit = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        var element = el.nativeElement;
        // check if the element is a special tag
        if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) != -1) {
            this._hasSpecialTag = true;
        }
        // jquery wrap and store element
        this._$element = $(element);
        this.zone = zone;
    }
    // Form model content changed.
    // Form model content changed.
    FroalaEditorDirective.prototype.writeValue = 
    // Form model content changed.
    function (content) {
        this.updateEditor(content);
    };
    FroalaEditorDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    FroalaEditorDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
        set: 
        // End ControlValueAccesor methods.
        // froalaEditor directive as input: store the editor options
        function (opts) {
            this._opts = opts || this._opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
        set: 
        // froalaModel directive as input: store initial editor content
        function (content) {
            this.updateEditor(content);
        },
        enumerable: true,
        configurable: true
    });
    // Update editor with model contents.
    // Update editor with model contents.
    FroalaEditorDirective.prototype.updateEditor = 
    // Update editor with model contents.
    function (content) {
        if (JSON.stringify(this._oldModel) == JSON.stringify(content)) {
            return;
        }
        this._oldModel = content;
        if (this._editorInitialized) {
            this._$element.froalaEditor('html.set', content);
        }
        else {
            this._$element.html(content);
        }
    };
    // update model if editor contentChanged
    // update model if editor contentChanged
    FroalaEditorDirective.prototype.updateModel = 
    // update model if editor contentChanged
    function () {
        var _this = this;
        this.zone.run(function () {
            var modelContent = null;
            if (_this._hasSpecialTag) {
                var attributeNodes = _this._$element[0].attributes;
                var attrs = {};
                for (var i = 0; i < attributeNodes.length; i++) {
                    var attrName = attributeNodes[i].name;
                    if (_this._opts.angularIgnoreAttrs && _this._opts.angularIgnoreAttrs.indexOf(attrName) != -1) {
                        continue;
                    }
                    attrs[attrName] = attributeNodes[i].value;
                }
                if (_this._$element[0].innerHTML) {
                    attrs[_this.INNER_HTML_ATTR] = _this._$element[0].innerHTML;
                }
                modelContent = attrs;
            }
            else {
                var returnedHtml = _this._$element.froalaEditor('html.get');
                if (typeof returnedHtml === 'string') {
                    modelContent = returnedHtml;
                }
            }
            _this._oldModel = modelContent;
            // Update froalaModel.
            // Update froalaModel.
            _this.froalaModelChange.emit(modelContent);
            // Update form model.
            // Update form model.
            _this.onChange(modelContent);
        });
    };
    // register event on jquery element
    // register event on jquery element
    FroalaEditorDirective.prototype.registerEvent = 
    // register event on jquery element
    function (element, eventName, callback) {
        if (!element || !eventName || !callback) {
            return;
        }
        this._listeningEvents.push(eventName);
        element.on(eventName, callback);
    };
    FroalaEditorDirective.prototype.initListeners = function () {
        var self = this;
        // bind contentChange and keyup event to froalaModel
        this.registerEvent(this._$element, 'froalaEditor.contentChanged', function () {
            setTimeout(function () {
                self.updateModel();
            }, 0);
        });
        if (this._opts.immediateAngularModelUpdate) {
            this.registerEvent(this._editor, 'keyup', function () {
                setTimeout(function () {
                    self.updateModel();
                }, 0);
            });
        }
    };
    // register events from editor options
    // register events from editor options
    FroalaEditorDirective.prototype.registerFroalaEvents = 
    // register events from editor options
    function () {
        if (!this._opts.events) {
            return;
        }
        for (var eventName in this._opts.events) {
            if (this._opts.events.hasOwnProperty(eventName)) {
                this.registerEvent(this._$element, eventName, this._opts.events[eventName]);
            }
        }
    };
    FroalaEditorDirective.prototype.createEditor = function () {
        var _this = this;
        if (this._editorInitialized) {
            return;
        }
        this.setContent(true);
        // Registering events before initializing the editor will bind the initialized event correctly.
        this.registerFroalaEvents();
        this.initListeners();
        // init editor
        this.zone.runOutsideAngular(function () {
            _this._$element.on('froalaEditor.initialized', function () {
                _this._editorInitialized = true;
            });
            _this._editor = _this._$element.froalaEditor(_this._opts).data('froala.editor').$el;
        });
    };
    FroalaEditorDirective.prototype.setHtml = function () {
        this._$element.froalaEditor('html.set', this._model || '', true);
        // This will reset the undo stack everytime the model changes externally. Can we fix this?
        this._$element.froalaEditor('undo.reset');
        this._$element.froalaEditor('undo.saveStep');
    };
    FroalaEditorDirective.prototype.setContent = function (firstTime) {
        if (firstTime === void 0) { firstTime = false; }
        var self = this;
        // Set initial content
        if (this._model || this._model == '') {
            this._oldModel = this._model;
            if (this._hasSpecialTag) {
                var tags = this._model;
                // add tags on element
                if (tags) {
                    for (var attr in tags) {
                        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
                            this._$element.attr(attr, tags[attr]);
                        }
                    }
                    if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
                        this._$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
                    }
                }
            }
            else {
                if (firstTime) {
                    this.registerEvent(this._$element, 'froalaEditor.initialized', function () {
                        self.setHtml();
                    });
                }
                else {
                    self.setHtml();
                }
            }
        }
    };
    FroalaEditorDirective.prototype.destroyEditor = function () {
        if (this._editorInitialized) {
            this._$element.off(this._listeningEvents.join(" "));
            this._editor.off('keyup');
            this._$element.froalaEditor('destroy');
            this._listeningEvents.length = 0;
            this._editorInitialized = false;
        }
    };
    FroalaEditorDirective.prototype.getEditor = function () {
        if (this._$element) {
            return this._$element.froalaEditor.bind(this._$element);
        }
        return null;
    };
    // send manual editor initialization
    // send manual editor initialization
    FroalaEditorDirective.prototype.generateManualController = 
    // send manual editor initialization
    function () {
        var self = this;
        var controls = {
            initialize: this.createEditor.bind(this),
            destroy: this.destroyEditor.bind(this),
            getEditor: this.getEditor.bind(this),
        };
        this.froalaInit.emit(controls);
    };
    // TODO not sure if ngOnInit is executed after @inputs
    // TODO not sure if ngOnInit is executed after @inputs
    FroalaEditorDirective.prototype.ngOnInit = 
    // TODO not sure if ngOnInit is executed after @inputs
    function () {
        // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
        if (!this.froalaInit.observers.length) {
            this.createEditor();
        }
        else {
            this.generateManualController();
        }
    };
    FroalaEditorDirective.prototype.ngOnDestroy = function () {
        this.destroyEditor();
    };
    FroalaEditorDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[froalaEditor]',
                    providers: [{
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NG_VALUE_ACCESSOR"], useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return FroalaEditorDirective; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    FroalaEditorDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], },
    ]; };
    FroalaEditorDirective.propDecorators = {
        "froalaEditor": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "froalaModel": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "froalaModelChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "froalaInit": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    };
    return FroalaEditorDirective;
}());

//# sourceMappingURL=editor.directive.js.map

/***/ }),

/***/ "./node_modules/angular-froala-wysiwyg/editor/editor.module.js":
/*!*********************************************************************!*\
  !*** ./node_modules/angular-froala-wysiwyg/editor/editor.module.js ***!
  \*********************************************************************/
/*! exports provided: FroalaEditorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FroalaEditorModule", function() { return FroalaEditorModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _editor_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.directive */ "./node_modules/angular-froala-wysiwyg/editor/editor.directive.js");


var FroalaEditorModule = (function () {
    function FroalaEditorModule() {
    }
    FroalaEditorModule.forRoot = function () {
        return { ngModule: FroalaEditorModule, providers: [] };
    };
    FroalaEditorModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [_editor_directive__WEBPACK_IMPORTED_MODULE_1__["FroalaEditorDirective"]],
                    exports: [_editor_directive__WEBPACK_IMPORTED_MODULE_1__["FroalaEditorDirective"]]
                },] },
    ];
    return FroalaEditorModule;
}());

//# sourceMappingURL=editor.module.js.map

/***/ }),

/***/ "./node_modules/angular-froala-wysiwyg/editor/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/angular-froala-wysiwyg/editor/index.js ***!
  \*************************************************************/
/*! exports provided: FroalaEditorDirective, FroalaEditorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.directive */ "./node_modules/angular-froala-wysiwyg/editor/editor.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaEditorDirective", function() { return _editor_directive__WEBPACK_IMPORTED_MODULE_0__["FroalaEditorDirective"]; });

/* harmony import */ var _editor_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.module */ "./node_modules/angular-froala-wysiwyg/editor/editor.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaEditorModule", function() { return _editor_module__WEBPACK_IMPORTED_MODULE_1__["FroalaEditorModule"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/angular-froala-wysiwyg/index.js":
/*!******************************************************!*\
  !*** ./node_modules/angular-froala-wysiwyg/index.js ***!
  \******************************************************/
/*! exports provided: FroalaEditorDirective, FroalaEditorModule, FroalaViewDirective, FroalaViewModule, FERootModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FERootModule", function() { return FERootModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "./node_modules/angular-froala-wysiwyg/editor/index.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./node_modules/angular-froala-wysiwyg/view/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaEditorDirective", function() { return _editor__WEBPACK_IMPORTED_MODULE_1__["FroalaEditorDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaEditorModule", function() { return _editor__WEBPACK_IMPORTED_MODULE_1__["FroalaEditorModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaViewDirective", function() { return _view__WEBPACK_IMPORTED_MODULE_2__["FroalaViewDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaViewModule", function() { return _view__WEBPACK_IMPORTED_MODULE_2__["FroalaViewModule"]; });






var MODULES = [
    _editor__WEBPACK_IMPORTED_MODULE_1__["FroalaEditorModule"],
    _view__WEBPACK_IMPORTED_MODULE_2__["FroalaViewModule"]
];
var FERootModule = (function () {
    function FERootModule() {
    }
    FERootModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _editor__WEBPACK_IMPORTED_MODULE_1__["FroalaEditorModule"].forRoot(),
                        _view__WEBPACK_IMPORTED_MODULE_2__["FroalaViewModule"].forRoot()
                    ],
                    exports: MODULES
                },] },
    ];
    return FERootModule;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/angular-froala-wysiwyg/view/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/angular-froala-wysiwyg/view/index.js ***!
  \***********************************************************/
/*! exports provided: FroalaViewDirective, FroalaViewModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.directive */ "./node_modules/angular-froala-wysiwyg/view/view.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaViewDirective", function() { return _view_directive__WEBPACK_IMPORTED_MODULE_0__["FroalaViewDirective"]; });

/* harmony import */ var _view_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.module */ "./node_modules/angular-froala-wysiwyg/view/view.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FroalaViewModule", function() { return _view_module__WEBPACK_IMPORTED_MODULE_1__["FroalaViewModule"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/angular-froala-wysiwyg/view/view.directive.js":
/*!********************************************************************!*\
  !*** ./node_modules/angular-froala-wysiwyg/view/view.directive.js ***!
  \********************************************************************/
/*! exports provided: FroalaViewDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FroalaViewDirective", function() { return FroalaViewDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var FroalaViewDirective = (function () {
    function FroalaViewDirective(renderer, element) {
        this.renderer = renderer;
        this._element = element.nativeElement;
    }
    Object.defineProperty(FroalaViewDirective.prototype, "froalaView", {
        set: 
        // update content model as it comes
        function (content) {
            this._element.innerHTML = content;
        },
        enumerable: true,
        configurable: true
    });
    FroalaViewDirective.prototype.ngAfterViewInit = function () {
        this.renderer.setElementClass(this._element, "fr-view", true);
    };
    FroalaViewDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[froalaView]'
                },] },
    ];
    /** @nocollapse */
    FroalaViewDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
    ]; };
    FroalaViewDirective.propDecorators = {
        "froalaView": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return FroalaViewDirective;
}());

//# sourceMappingURL=view.directive.js.map

/***/ }),

/***/ "./node_modules/angular-froala-wysiwyg/view/view.module.js":
/*!*****************************************************************!*\
  !*** ./node_modules/angular-froala-wysiwyg/view/view.module.js ***!
  \*****************************************************************/
/*! exports provided: FroalaViewModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FroalaViewModule", function() { return FroalaViewModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.directive */ "./node_modules/angular-froala-wysiwyg/view/view.directive.js");


var FroalaViewModule = (function () {
    function FroalaViewModule() {
    }
    FroalaViewModule.forRoot = function () {
        return { ngModule: FroalaViewModule, providers: [] };
    };
    FroalaViewModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [_view_directive__WEBPACK_IMPORTED_MODULE_1__["FroalaViewDirective"]],
                    exports: [_view_directive__WEBPACK_IMPORTED_MODULE_1__["FroalaViewDirective"]]
                },] },
    ];
    return FroalaViewModule;
}());

//# sourceMappingURL=view.module.js.map

/***/ }),

/***/ "./node_modules/marked/lib/marked.js":
/*!*******************************************!*\
  !*** ./node_modules/marked/lib/marked.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

;(function(root) {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  nptable: noop,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit(block.paragraph)
  .replace('hr', block.hr)
  .replace('heading', block.heading)
  .replace('lheading', block.lheading)
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = edit(block.paragraph)
  .replace('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  .getRegex();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});

/**
 * Pedantic grammar
 */

block.pedantic = merge({}, block.normal, {
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.pedantic) {
    this.rules = block.pedantic;
  } else if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      space,
      i,
      tag,
      l,
      isordered,
      istask,
      ischecked;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(item.cells[i], item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      this.tokens.push({
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : ''
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start',
          task: istask,
          checked: ischecked
        });

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/(?: *\| *)?\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)|^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)/,
  em: /^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*][\s\S]*?[^\s])\*(?!\*)|^_([^\s_])_(?!_)|^\*([^\s*])\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
};

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit(inline.tag)
  .replace('comment', block._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/;
inline._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?)/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('label', inline._label)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
    .replace('email', inline._email)
    .getRegex(),
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: edit(inline.text)
    .replace(']|', '~]|')
    .replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|')
    .getRegex()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.pedantic) {
    this.rules = inline.pedantic;
  } else if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      title,
      cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      cap[0] = this.rules._backpedal.exec(cap[0])[0];
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: InlineLexer.escapes(href),
        title: InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

InlineLexer.escapes = function(text) {
  return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
}

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = link.href,
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || marked.defaults;
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + raw.toLowerCase().replace(/[^\w]+/g, '-')
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.checkbox = function(checked) {
  return '<input '
    + (checked ? 'checked="" ' : '')
    + 'disabled="" type="checkbox"'
    + (this.options.xhtml ? ' /' : '')
    + '> ';
}

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + body
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' align="' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return text;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text;
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return text;
  }
  var out = '<a href="' + escape(href) + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text;
}

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
}

TextRenderer.prototype.br = function() {
  return '';
}

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, {renderer: new TextRenderer()})
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)));
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';

      if (this.token.task) {
        body += this.renderer.checkbox(this.token.checked);
      }

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      // TODO parse inline content if parameter markdown=1
      return this.renderer.html(this.token.text);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  var cells = tableRow.replace(/([^\\])\|/g, '$1 |').split(/ +\| */),
      i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    cells[i] = cells[i].replace(/\\\|/g, '|');
  }
  return cells;
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.getDefaults = function () {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: new Renderer(),
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tables: true,
    xhtml: false
  };
}

marked.defaults = marked.getDefaults();

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (true) {
  module.exports = marked;
} else {}
})(this || (typeof window !== 'undefined' ? window : global));


/***/ }),

/***/ "./node_modules/ngx-markdown-editor/esm5/ngx-markdown-editor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ngx-markdown-editor/esm5/ngx-markdown-editor.js ***!
  \**********************************************************************/
/*! exports provided: LMarkdownEditorModule, MarkdownEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LMarkdownEditorModule", function() { return LMarkdownEditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownEditorComponent", function() { return MarkdownEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");





var MarkdownEditorComponent = /** @class */ (function () {
    function MarkdownEditorComponent(required, maxlength, _renderer, _domSanitizer) {
        if (required === void 0) { required = false; }
        if (maxlength === void 0) { maxlength = -1; }
        this.required = required;
        this.maxlength = maxlength;
        this._renderer = _renderer;
        this._domSanitizer = _domSanitizer;
        this.hideToolbar = false;
        this.height = "300px";
        this._hideIcons = {};
        this.showPreviewPanel = true;
        this.isFullScreen = false;
        this._onChange = function (_) { };
        this._onTouched = function () { };
    }
    Object.defineProperty(MarkdownEditorComponent.prototype, "mode", {
        get: function () {
            return this._mode || 'editor';
        },
        set: function (value) {
            if (!value || (value.toLowerCase() !== 'editor' && value.toLowerCase() !== 'preview')) {
                value = 'editor';
            }
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownEditorComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            var _this = this;
            this._options = value || {
                showBorder: true,
                hideIcons: []
            };
            this._hideIcons = {};
            (this._options.hideIcons || []).forEach(function (v) {
                _this._hideIcons[v] = true;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownEditorComponent.prototype, "markdownValue", {
        get: function () {
            return this._markdownValue || '';
        },
        set: function (value) {
            var _this = this;
            this._markdownValue = value;
            this._onChange(value);
            if (this.preRender && this.preRender instanceof Function) {
                value = this.preRender(value);
            }
            if (value !== null && value !== undefined) {
                if (this._renderMarkTimeout)
                    clearTimeout(this._renderMarkTimeout);
                this._renderMarkTimeout = setTimeout(function () {
                    var html = marked(value || '', _this._markedOpt);
                    _this._previewHtml = _this._domSanitizer.bypassSecurityTrustHtml(html);
                }, 100);
            }
        },
        enumerable: true,
        configurable: true
    });
    MarkdownEditorComponent.prototype.ngOnInit = function () {
        var _markedRender = new marked.Renderer();
        _markedRender.code = function (code, language) {
            var validLang = !!(language && hljs.getLanguage(language));
            var highlighted = validLang ? hljs.highlight(language, code).value : code;
            return "<pre style=\"padding: 0; border-radius: 0;\"><code class=\"hljs " + language + "\">" + highlighted + "</code></pre>";
        };
        _markedRender.table = function (header, body) {
            return "<table class=\"table table-bordered\">\n<thead>\n" + header + "</thead>\n<tbody>\n" + body + "</tbody>\n</table>\n";
        };
        _markedRender.listitem = function (text) {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> ')
                    .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> ');
                return "<li style=\"list-style: none;\">" + text + "</li>";
            }
            else {
                return "<li>" + text + "</li>";
            }
        };
        this._markedOpt = {
            renderer: _markedRender,
            highlight: function (code) { return hljs.highlightAuto(code).value; }
        };
    };
    MarkdownEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editorElement = this.aceEditorContainer.nativeElement;
        this.editor = ace.edit(editorElement);
        this.editor.$blockScrolling = Infinity;
        this.editor.getSession().setUseWrapMode(true);
        this.editor.getSession().setMode("ace/mode/markdown");
        this.editor.setValue(this.markdownValue || '');
        this.editor.on("change", function (e) {
            var val = _this.editor.getValue();
            _this.markdownValue = val;
        });
    };
    MarkdownEditorComponent.prototype.ngOnDestroy = function () {
    };
    MarkdownEditorComponent.prototype.writeValue = function (value) {
        var _this = this;
        setTimeout(function () {
            _this.markdownValue = value;
            if (typeof value !== 'undefined' && _this.editor) {
                _this.editor.setValue(value || '');
            }
        }, 1);
    };
    MarkdownEditorComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    MarkdownEditorComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    MarkdownEditorComponent.prototype.validate = function (c) {
        var result = null;
        if (this.required && this.markdownValue.length === 0) {
            result = { required: true };
        }
        if (this.maxlength > 0 && this.markdownValue.length > this.maxlength) {
            result = { maxlength: true };
        }
        return result;
    };
    MarkdownEditorComponent.prototype.insertContent = function (type) {
        if (!this.editor)
            return;
        var selectedText = this.editor.getSelectedText();
        var isSeleted = !!selectedText;
        var startSize = 2;
        var initText = '';
        var range = this.editor.selection.getRange();
        switch (type) {
            case 'Bold':
                initText = 'Bold Text';
                selectedText = "**" + (selectedText || initText) + "**";
                break;
            case 'Italic':
                initText = 'Italic Text';
                selectedText = "*" + (selectedText || initText) + "*";
                startSize = 1;
                break;
            case 'Heading':
                initText = 'Heading';
                selectedText = "# " + (selectedText || initText);
                break;
            case 'Refrence':
                initText = 'Refrence';
                selectedText = "> " + (selectedText || initText);
                break;
            case 'Link':
                selectedText = "[](http://)";
                startSize = 1;
                break;
            case 'Image':
                selectedText = "![](http://)";
                break;
            case 'Ul':
                selectedText = "- " + (selectedText || initText);
                break;
            case 'Ol':
                selectedText = "1. " + (selectedText || initText);
                startSize = 3;
                break;
            case 'Code':
                initText = 'Source Code';
                selectedText = "```language\r\n" + (selectedText || initText) + "\r\n```";
                startSize = 3;
                break;
        }
        this.editor.session.replace(range, selectedText);
        if (!isSeleted) {
            range.start.column += startSize;
            range.end.column = range.start.column + initText.length;
            this.editor.selection.setRange(range);
        }
        this.editor.focus();
    };
    MarkdownEditorComponent.prototype.togglePreview = function () {
        this.showPreviewPanel = !this.showPreviewPanel;
        this.editorResize();
    };
    MarkdownEditorComponent.prototype.previewPanelClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    MarkdownEditorComponent.prototype.fullScreen = function () {
        this.isFullScreen = !this.isFullScreen;
        this._renderer.setElementStyle(document.body, 'overflowY', this.isFullScreen ? 'hidden' : 'auto');
        this.editorResize();
    };
    MarkdownEditorComponent.prototype.editorResize = function (timeOut) {
        var _this = this;
        if (timeOut === void 0) { timeOut = 100; }
        if (this.editor) {
            setTimeout(function () {
                _this.editor.resize();
                _this.editor.focus();
            }, timeOut);
        }
    };
    return MarkdownEditorComponent;
}());
MarkdownEditorComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'md-editor',
                styles: [".md-editor-container{margin-bottom:15px;border:1px solid rgba(0,0,0,.1)}.md-editor-container.fullscreen{margin:0;position:fixed;border:0;top:0;left:0;width:100%;height:100%;z-index:99999999}.md-editor-container.fullscreen .editor-panel,.md-editor-container.fullscreen .preview-panel{height:calc(100vh - 40px)!important}.md-editor-container .ace-editor{height:100%}.md-editor-container .tool-bar{background-color:#f5f5f5;border-bottom:1px solid rgba(0,0,0,.1)}.md-editor-container .tool-bar .btn-group{padding:6px}.md-editor-container .tool-bar .btn-group>.btn:first-child::before{content:' ';background-color:#a9a9a9;width:1px;height:24px;left:-9px;top:2px;position:absolute}.md-editor-container .tool-bar .btn-group.hide-split>.btn:first-child::before,.md-editor-container .tool-bar .btn-group:first-child>.btn:first-child::before{display:none}.md-editor-container .tool-bar .btn{margin-bottom:0}.md-editor-container .editor-container{display:-webkit-box;display:-ms-flexbox;display:flex}.md-editor-container .editor-container>div{-webkit-box-flex:1;-ms-flex:1;flex:1}.md-editor-container .preview-panel{border-left:1px solid rgba(0,0,0,.1);background-color:#fff;padding:10px;overflow-y:auto}.md-editor-container .md-footer{padding:2px;background-color:#f0f0f0;font-size:12px;border-top:1px solid rgba(0,0,0,.1)}"],
                template: "<div class=\"md-editor-container\" [class.fullscreen]=\"isFullScreen\">\n  <div class=\"tool-bar\" *ngIf=\"!hideToolbar && mode != 'preview'\">\n    <div class=\"btn-group\">\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Bold\" (click)=\"insertContent('Bold')\" *ngIf=\"!_hideIcons.Bold\">\n        <i class=\"fa fa-bold\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Italic\" (click)=\"insertContent('Italic')\" *ngIf=\"!_hideIcons.Italic\">\n        <i class=\"fa fa-italic\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Heading\" (click)=\"insertContent('Heading')\" *ngIf=\"!_hideIcons.Heading\">\n        <i class=\"fa fa-header\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Refrence\" (click)=\"insertContent('Refrence')\" *ngIf=\"!_hideIcons.Refrence\">\n        <i class=\"fa fa-quote-left\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Link\" (click)=\"insertContent('Link')\" *ngIf=\"!_hideIcons.Link\">\n        <i class=\"fa fa-link\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Image\" (click)=\"insertContent('Image')\" *ngIf=\"!_hideIcons.Image\">\n        <i class=\"fa fa-image\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Unordered List\" (click)=\"insertContent('Ul')\" *ngIf=\"!_hideIcons.Ul\">\n        <i class=\"fa fa-list-ul\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Ordered List\" (click)=\"insertContent('Ol')\" *ngIf=\"!_hideIcons.Ol\">\n        <i class=\"fa fa-list-ol\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Code Block\" (click)=\"insertContent('Code')\" *ngIf=\"!_hideIcons.Code\">\n        <i class=\"fa fa-file-code-o\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button class=\"btn btn-sm btn-default\" type=\"button\" [attr.title]=\"showPreviewPanel ? 'Hide Preview' : 'Show Preview'\" (click)=\"togglePreview()\"\n        *ngIf=\"!_hideIcons.TogglePreview\">\n        <i class=\"fa\" [class.fa-eye]=\"!showPreviewPanel\" [class.fa-eye-slash]=\"showPreviewPanel\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group pull-right hide-split\">\n      <button class=\"btn btn-sm btn-default\" type=\"button\" [class.active]=\"isFullScreen\" (click)=\"fullScreen()\" *ngIf=\"!_hideIcons.FullScreen\">\n        <i class=\"fa fa-arrows-alt\"></i>\n      </button>\n    </div>\n  </div>\n  <div class=\"editor-container\">\n    <div [style.display]=\"mode == 'preview' ? 'none' : null\">\n      <div class=\"editor-panel\" [style.height]=\"height\">\n        <div class=\"ace-editor\" #aceEditor></div>\n      </div>\n    </div>\n    <div [style.display]=\"showPreviewPanel ? 'block' : 'none'\" (click)=\"previewPanelClick($event)\">\n      <div class=\"preview-panel\" [innerHtml]=\"_previewHtml\" [style.height]=\"height\"></div>\n    </div>\n  </div>\n  <div *ngIf=\"maxlength > 0 && mode != 'preview'\">\n    <div class=\"text-right md-footer\">\n      {{ markdownValue?.length }} / {{ maxlength }}\n    </div>\n  </div>\n</div>\n",
                providers: [
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MarkdownEditorComponent; }),
                        multi: true
                    },
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MarkdownEditorComponent; }),
                        multi: true
                    }
                ]
            },] },
];
MarkdownEditorComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Attribute"], args: ['required',] },] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Attribute"], args: ['maxlength',] },] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"], },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"], },
]; };
MarkdownEditorComponent.propDecorators = {
    "aceEditorContainer": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['aceEditor',] },],
    "hideToolbar": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    "height": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    "preRender": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    "mode": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    "options": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
};
var LMarkdownEditorModule = /** @class */ (function () {
    function LMarkdownEditorModule() {
    }
    return LMarkdownEditorModule;
}());
LMarkdownEditorModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [
                    MarkdownEditorComponent
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]
                ],
                exports: [
                    MarkdownEditorComponent
                ]
            },] },
];
LMarkdownEditorModule.ctorParameters = function () { return []; };


//# sourceMappingURL=ngx-markdown-editor.js.map


/***/ }),

/***/ "./node_modules/ngx-markdown/fesm5/ngx-markdown.js":
/*!*********************************************************!*\
  !*** ./node_modules/ngx-markdown/fesm5/ngx-markdown.js ***!
  \*********************************************************/
/*! exports provided: LanguagePipe, MarkdownComponent, initialMarkedOptions, MarkdownModule, MarkdownPipe, errorSrcWithoutHttpClient, MarkdownService, MarkedOptions, MarkedRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguagePipe", function() { return LanguagePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownComponent", function() { return MarkdownComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialMarkedOptions", function() { return initialMarkedOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownModule", function() { return MarkdownModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownPipe", function() { return MarkdownPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorSrcWithoutHttpClient", function() { return errorSrcWithoutHttpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownService", function() { return MarkdownService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkedOptions", function() { return MarkedOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkedRenderer", function() { return MarkedRenderer; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! marked */ "./node_modules/marked/lib/marked.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(marked__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LanguagePipe = /** @class */ (function () {
    function LanguagePipe() {
    }
    /**
     * @param {?} value
     * @param {?} language
     * @return {?}
     */
    LanguagePipe.prototype.transform = /**
     * @param {?} value
     * @param {?} language
     * @return {?}
     */
    function (value, language) {
        if (typeof value !== 'string') {
            console.error("LanguagePipe has been invoked with an invalid value type [" + value + "]");
            return value;
        }
        if (typeof language !== 'string') {
            console.error("LanguagePipe has been invoked with an invalid parameter [" + language + "]");
            return value;
        }
        return '```' + language + '\n' + value + '\n```';
    };
    LanguagePipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                    name: 'language',
                },] },
    ];
    return LanguagePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarkedOptions = /** @class */ (function () {
    function MarkedOptions() {
    }
    return MarkedOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// tslint:disable-next-line:max-line-length
var /** @type {?} */ errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
var MarkdownService = /** @class */ (function () {
    function MarkdownService(http, options) {
        this.http = http;
        this.options = options;
        if (!this.renderer) {
            this.renderer = new marked__WEBPACK_IMPORTED_MODULE_2__["Renderer"]();
        }
    }
    Object.defineProperty(MarkdownService.prototype, "renderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.renderer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.options.renderer = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} markdown
     * @param {?=} markedOptions
     * @return {?}
     */
    MarkdownService.prototype.compile = /**
     * @param {?} markdown
     * @param {?=} markedOptions
     * @return {?}
     */
    function (markdown, markedOptions) {
        if (markedOptions === void 0) { markedOptions = this.options; }
        var /** @type {?} */ precompiled = this.precompile(markdown);
        return Object(marked__WEBPACK_IMPORTED_MODULE_2__["parse"])(precompiled, markedOptions);
    };
    /**
     * @param {?} src
     * @return {?}
     */
    MarkdownService.prototype.getSource = /**
     * @param {?} src
     * @return {?}
     */
    function (src) {
        var _this = this;
        if (!this.http) {
            throw new Error(errorSrcWithoutHttpClient);
        }
        return this.http
            .get(src, { responseType: 'text' })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (markdown) { return _this.handleExtension(src, markdown); }));
    };
    /**
     * @return {?}
     */
    MarkdownService.prototype.highlight = /**
     * @return {?}
     */
    function () {
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll(false);
        }
    };
    /**
     * @param {?} src
     * @param {?} markdown
     * @return {?}
     */
    MarkdownService.prototype.handleExtension = /**
     * @param {?} src
     * @param {?} markdown
     * @return {?}
     */
    function (src, markdown) {
        var /** @type {?} */ extension = src
            ? src.split('.').splice(-1).join()
            : null;
        return extension !== 'md'
            ? '```' + extension + '\n' + markdown + '\n```'
            : markdown;
    };
    /**
     * @param {?} markdown
     * @return {?}
     */
    MarkdownService.prototype.precompile = /**
     * @param {?} markdown
     * @return {?}
     */
    function (markdown) {
        if (!markdown) {
            return '';
        }
        var /** @type {?} */ indentStart;
        return markdown
            .replace(/\&gt;/g, '>')
            .split('\n')
            .map(function (line) {
            // find position of 1st non-whitespace character
            // to determine the markdown indentation start
            if (line.length > 0 && isNaN(indentStart)) {
                indentStart = line.search(/\S|$/);
            }
            // remove whitespaces before indentation start
            return indentStart
                ? line.substring(indentStart)
                : line;
        }).join('\n');
    };
    MarkdownService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    MarkdownService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] },
        { type: MarkedOptions }
    ]; };
    return MarkdownService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarkdownComponent = /** @class */ (function () {
    function MarkdownComponent(element, markdownService) {
        this.element = element;
        this.markdownService = markdownService;
        this.error = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.load = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(MarkdownComponent.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () { return this._data; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data = value;
            this.render(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownComponent.prototype, "src", {
        get: /**
         * @return {?}
         */
        function () { return this._src; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._src = value;
            this.markdownService
                .getSource(value)
                .subscribe(function (markdown) {
                _this.render(markdown);
                _this.load.emit(markdown);
            }, function (error) { return _this.error.emit(error); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownComponent.prototype, "isTranscluded", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.data && !this.src;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MarkdownComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.isTranscluded) {
            this.render(this.element.nativeElement.innerHTML);
        }
    };
    /**
     * @param {?} markdown
     * @return {?}
     */
    MarkdownComponent.prototype.render = /**
     * @param {?} markdown
     * @return {?}
     */
    function (markdown) {
        this.element.nativeElement.innerHTML = this.markdownService.compile(markdown);
        this.markdownService.highlight();
    };
    MarkdownComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'markdown, [markdown]',
                    template: '<ng-content></ng-content>',
                    styles: [":host /deep/ table{border-spacing:0;border-collapse:collapse;margin-bottom:16px}:host /deep/ table td,:host /deep/ table th{padding:6px 13px;border:1px solid #ddd}:host /deep/ table td[align=left],:host /deep/ table th[align=left]{text-align:left}:host /deep/ table td[align=center],:host /deep/ table th[align=center]{text-align:center}:host /deep/ table td[align=right],:host /deep/ table th[align=right]{text-align:right}:host /deep/ table tr:nth-child(2n){background-color:rgba(0,0,0,.03)}:host /deep/ blockquote{padding:0 1em;color:rgba(0,0,0,.535);border-left:.25em solid rgba(0,0,0,.11)}"],
                },] },
    ];
    /** @nocollapse */
    MarkdownComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: MarkdownService }
    ]; };
    MarkdownComponent.propDecorators = {
        data: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        src: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        error: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        load: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
    };
    return MarkdownComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarkdownPipe = /** @class */ (function () {
    function MarkdownPipe(markdownService, zone) {
        this.markdownService = markdownService;
        this.zone = zone;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    MarkdownPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (typeof value !== 'string') {
            console.error("MarkdownPipe has been invoked with an invalid value type [" + value + "]");
            return value;
        }
        var /** @type {?} */ markdown = this.markdownService.compile(value);
        this.zone.onStable
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function () { return _this.markdownService.highlight(); });
        return markdown;
    };
    MarkdownPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                    name: 'markdown',
                },] },
    ];
    /** @nocollapse */
    MarkdownPipe.ctorParameters = function () { return [
        { type: MarkdownService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    return MarkdownPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ initialMarkedOptions = {
    provide: MarkedOptions,
    useValue: {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    },
};
var /** @type {?} */ sharedDeclarations = [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
];
var MarkdownModule = /** @class */ (function () {
    function MarkdownModule() {
    }
    /**
     * @param {?=} markdownModuleConfig
     * @return {?}
     */
    MarkdownModule.forRoot = /**
     * @param {?=} markdownModuleConfig
     * @return {?}
     */
    function (markdownModuleConfig) {
        return {
            ngModule: MarkdownModule,
            providers: Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__spread"])([
                MarkdownService
            ], (markdownModuleConfig
                ? [
                    markdownModuleConfig.loader || [],
                    markdownModuleConfig.markedOptions || initialMarkedOptions,
                ]
                : [initialMarkedOptions])),
        };
    };
    /**
     * @return {?}
     */
    MarkdownModule.forChild = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: MarkdownModule,
        };
    };
    MarkdownModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__spread"])(sharedDeclarations),
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__spread"])(sharedDeclarations),
                },] },
    ];
    return MarkdownModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MarkedRenderer = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__extends"])(MarkedRenderer, _super);
    function MarkedRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MarkedRenderer;
}(marked__WEBPACK_IMPORTED_MODULE_2__["Renderer"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcmtkb3duLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtbWFya2Rvd24vc3JjL2xhbmd1YWdlLnBpcGUudHMiLCJuZzovL25neC1tYXJrZG93bi9zcmMvbWFya2VkLW9wdGlvbnMudHMiLCJuZzovL25neC1tYXJrZG93bi9zcmMvbWFya2Rvd24uc2VydmljZS50cyIsIm5nOi8vbmd4LW1hcmtkb3duL3NyYy9tYXJrZG93bi5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXJrZG93bi9zcmMvbWFya2Rvd24ucGlwZS50cyIsIm5nOi8vbmd4LW1hcmtkb3duL3NyYy9tYXJrZG93bi5tb2R1bGUudHMiLCJuZzovL25neC1tYXJrZG93bi9zcmMvbWFya2VkLXJlbmRlcmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbGFuZ3VhZ2UnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYExhbmd1YWdlUGlwZSBoYXMgYmVlbiBpbnZva2VkIHdpdGggYW4gaW52YWxpZCB2YWx1ZSB0eXBlIFske3ZhbHVlfV1gKTtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBsYW5ndWFnZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgTGFuZ3VhZ2VQaXBlIGhhcyBiZWVuIGludm9rZWQgd2l0aCBhbiBpbnZhbGlkIHBhcmFtZXRlciBbJHtsYW5ndWFnZX1dYCk7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAnYGBgJyArIGxhbmd1YWdlICsgJ1xcbicgKyAgdmFsdWUgKyAnXFxuYGBgJztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdtYXJrZWQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hcmtlZE9wdGlvbnMgaW1wbGVtZW50cyBtYXJrZWQuTWFya2VkT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogQSBwcmVmaXggVVJMIGZvciBhbnkgcmVsYXRpdmUgbGluay5cclxuICAgKi9cclxuICBiYXNlVXJsPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgR0ZNIGxpbmUgYnJlYWtzLiBUaGlzIG9wdGlvbiByZXF1aXJlcyB0aGUgZ2ZtIG9wdGlvbiB0byBiZSB0cnVlLlxyXG4gICAqL1xyXG4gIGJyZWFrcz86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBHaXRIdWIgZmxhdm9yZWQgbWFya2Rvd24uXHJcbiAgICovXHJcbiAgZ2ZtPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5jbHVkZSBhbiBpZCBhdHRyaWJ1dGUgd2hlbiBlbWl0dGluZyBoZWFkaW5ncy5cclxuICAgKi9cclxuICBoZWFkZXJJZHM/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHByZWZpeCBmb3IgaGVhZGVyIHRhZyBpZHMuXHJcbiAgICovXHJcbiAgaGVhZGVyUHJlZml4Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHByZWZpeCBmb3IgY29kZSBibG9jayBjbGFzc2VzLlxyXG4gICAqL1xyXG4gIGxhbmdQcmVmaXg/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbmdsZSBhdXRvbGlua3MgKDxlbWFpbEBkb21haW4uY29tPikuXHJcbiAgICovXHJcbiAgbWFuZ2xlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uZm9ybSB0byBvYnNjdXJlIHBhcnRzIG9mIG1hcmtkb3duLnBsIGFzIG11Y2ggYXMgcG9zc2libGUuIERvbid0IGZpeCBhbnkgb2YgdGhlIG9yaWdpbmFsIG1hcmtkb3duIGJ1Z3Mgb3IgcG9vciBiZWhhdmlvci5cclxuICAgKi9cclxuICBwZWRhbnRpYz86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGU6IG9iamVjdCBEZWZhdWx0OiBuZXcgUmVuZGVyZXIoKVxyXG4gICAqXHJcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgZnVuY3Rpb25zIHRvIHJlbmRlciB0b2tlbnMgdG8gSFRNTC5cclxuICAgKi9cclxuICByZW5kZXJlcj86IFJlbmRlcmVyO1xyXG5cclxuICAvKipcclxuICAgKiBTYW5pdGl6ZSB0aGUgb3V0cHV0LiBJZ25vcmUgYW55IEhUTUwgdGhhdCBoYXMgYmVlbiBpbnB1dC5cclxuICAgKi9cclxuICBzYW5pdGl6ZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIGFuIEhUTUwgZXJyb3IgbWVzc2FnZSB3aGVuIHJlbmRlcmluZyBmYWlscy5cclxuICAgKi9cclxuICBzaWxlbnQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBVc2Ugc21hcnRlciBsaXN0IGJlaGF2aW9yIHRoYW4gdGhlIG9yaWdpbmFsIG1hcmtkb3duLiBNYXkgZXZlbnR1YWxseSBiZSBkZWZhdWx0IHdpdGggdGhlIG9sZCBiZWhhdmlvciBtb3ZlZCBpbnRvIHBlZGFudGljLlxyXG4gICAqL1xyXG4gIHNtYXJ0TGlzdHM/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgXCJzbWFydFwiIHR5cG9ncmFoaWMgcHVuY3R1YXRpb24gZm9yIHRoaW5ncyBsaWtlIHF1b3RlcyBhbmQgZGFzaGVzLlxyXG4gICAqL1xyXG4gIHNtYXJ0eXBhbnRzPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIEdGTSB0YWJsZXMuIFRoaXMgb3B0aW9uIHJlcXVpcmVzIHRoZSBnZm0gb3B0aW9uIHRvIGJlIHRydWUuXHJcbiAgICovXHJcbiAgdGFibGVzPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgY2xvc2luZyBzbGFzaCBmb3Igc2VsZi1jbG9zaW5nIHRhZ3MgKDxici8+IGluc3RlYWQgb2YgPGJyPilcclxuICAgKi9cclxuICB4aHRtbD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24gdG8gaGlnaGxpZ2h0IGNvZGUgYmxvY2tzLiBUaGUgZnVuY3Rpb24gdGFrZXMgdGhyZWUgYXJndW1lbnRzOiBjb2RlLCBsYW5nLCBhbmQgY2FsbGJhY2suXHJcbiAgICovXHJcbiAgaGlnaGxpZ2h0Pyhjb2RlOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgY2FsbGJhY2s/OiAoZXJyb3I6IGFueSB8IHVuZGVmaW5lZCwgY29kZTogc3RyaW5nKSA9PiB2b2lkKTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBPcHRpb25hbGx5IHNhbml0aXplIGZvdW5kIEhUTUwgd2l0aCBhIHNhbml0aXplciBmdW5jdGlvbi5cclxuICAgKi9cclxuICBzYW5pdGl6ZXI/KGh0bWw6IHN0cmluZyk6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBwYXJzZSwgUmVuZGVyZXIgfSBmcm9tICdtYXJrZWQnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE1hcmtlZE9wdGlvbnMgfSBmcm9tICcuL21hcmtlZC1vcHRpb25zJztcclxuXHJcbmRlY2xhcmUgdmFyIFByaXNtOiB7XHJcbiAgaGlnaGxpZ2h0QWxsOiAoYXN5bmM6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbmV4cG9ydCBjb25zdCBlcnJvclNyY1dpdGhvdXRIdHRwQ2xpZW50ID0gJ1tuZ3gtbWFya2Rvd25dIFdoZW4gdXNpbmcgdGhlIFtzcmNdIGF0dHJpYnV0ZSB5b3UgKmhhdmUgdG8qIHBhc3MgdGhlIGBIdHRwQ2xpZW50YCBhcyBhIHBhcmFtZXRlciBvZiB0aGUgYGZvclJvb3RgIG1ldGhvZC4gU2VlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNYXJrZG93blNlcnZpY2Uge1xyXG4gIGdldCByZW5kZXJlcigpOiBSZW5kZXJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmVyO1xyXG4gIH1cclxuICBzZXQgcmVuZGVyZXIodmFsdWU6IG1hcmtlZC5SZW5kZXJlcikge1xyXG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHB1YmxpYyBvcHRpb25zOiBNYXJrZWRPcHRpb25zLFxyXG4gICkge1xyXG4gICAgaWYgKCF0aGlzLnJlbmRlcmVyKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBpbGUobWFya2Rvd246IHN0cmluZywgbWFya2VkT3B0aW9ucyA9IHRoaXMub3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBwcmVjb21waWxlZCA9IHRoaXMucHJlY29tcGlsZShtYXJrZG93bik7XHJcbiAgICByZXR1cm4gcGFyc2UocHJlY29tcGlsZWQsIG1hcmtlZE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U291cmNlKHNyYzogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGlmICghdGhpcy5odHRwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclNyY1dpdGhvdXRIdHRwQ2xpZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQoc3JjLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKG1hcChtYXJrZG93biA9PiB0aGlzLmhhbmRsZUV4dGVuc2lvbihzcmMsIG1hcmtkb3duKSkpO1xyXG4gIH1cclxuXHJcbiAgaGlnaGxpZ2h0KCkge1xyXG4gICAgaWYgKHR5cGVvZiBQcmlzbSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgUHJpc20uaGlnaGxpZ2h0QWxsKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRXh0ZW5zaW9uKHNyYzogc3RyaW5nLCBtYXJrZG93bjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHNyY1xyXG4gICAgICA/IHNyYy5zcGxpdCgnLicpLnNwbGljZSgtMSkuam9pbigpXHJcbiAgICAgIDogbnVsbDtcclxuICAgIHJldHVybiBleHRlbnNpb24gIT09ICdtZCdcclxuICAgICAgPyAnYGBgJyArIGV4dGVuc2lvbiArICdcXG4nICsgbWFya2Rvd24gKyAnXFxuYGBgJ1xyXG4gICAgICA6IG1hcmtkb3duO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcmVjb21waWxlKG1hcmtkb3duOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFtYXJrZG93bikge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBsZXQgaW5kZW50U3RhcnQ6IG51bWJlcjtcclxuICAgIHJldHVybiBtYXJrZG93blxyXG4gICAgICAucmVwbGFjZSgvXFwmZ3Q7L2csICc+JylcclxuICAgICAgLnNwbGl0KCdcXG4nKVxyXG4gICAgICAubWFwKGxpbmUgPT4ge1xyXG4gICAgICAgIC8vIGZpbmQgcG9zaXRpb24gb2YgMXN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlclxyXG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgbWFya2Rvd24gaW5kZW50YXRpb24gc3RhcnRcclxuICAgICAgICBpZiAobGluZS5sZW5ndGggPiAwICYmIGlzTmFOKGluZGVudFN0YXJ0KSkge1xyXG4gICAgICAgICAgaW5kZW50U3RhcnQgPSBsaW5lLnNlYXJjaCgvXFxTfCQvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVtb3ZlIHdoaXRlc3BhY2VzIGJlZm9yZSBpbmRlbnRhdGlvbiBzdGFydFxyXG4gICAgICAgIHJldHVybiBpbmRlbnRTdGFydFxyXG4gICAgICAgICAgPyBsaW5lLnN1YnN0cmluZyhpbmRlbnRTdGFydClcclxuICAgICAgICAgIDogbGluZTtcclxuICAgICAgfSkuam9pbignXFxuJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICcuL21hcmtkb3duLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnbWFya2Rvd24sIFttYXJrZG93bl0nLFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbiAgc3R5bGVzOiBbYDpob3N0IC9kZWVwLyB0YWJsZXtib3JkZXItc3BhY2luZzowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTttYXJnaW4tYm90dG9tOjE2cHh9Omhvc3QgL2RlZXAvIHRhYmxlIHRkLDpob3N0IC9kZWVwLyB0YWJsZSB0aHtwYWRkaW5nOjZweCAxM3B4O2JvcmRlcjoxcHggc29saWQgI2RkZH06aG9zdCAvZGVlcC8gdGFibGUgdGRbYWxpZ249bGVmdF0sOmhvc3QgL2RlZXAvIHRhYmxlIHRoW2FsaWduPWxlZnRde3RleHQtYWxpZ246bGVmdH06aG9zdCAvZGVlcC8gdGFibGUgdGRbYWxpZ249Y2VudGVyXSw6aG9zdCAvZGVlcC8gdGFibGUgdGhbYWxpZ249Y2VudGVyXXt0ZXh0LWFsaWduOmNlbnRlcn06aG9zdCAvZGVlcC8gdGFibGUgdGRbYWxpZ249cmlnaHRdLDpob3N0IC9kZWVwLyB0YWJsZSB0aFthbGlnbj1yaWdodF17dGV4dC1hbGlnbjpyaWdodH06aG9zdCAvZGVlcC8gdGFibGUgdHI6bnRoLWNoaWxkKDJuKXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjAzKX06aG9zdCAvZGVlcC8gYmxvY2txdW90ZXtwYWRkaW5nOjAgMWVtO2NvbG9yOnJnYmEoMCwwLDAsLjUzNSk7Ym9yZGVyLWxlZnQ6LjI1ZW0gc29saWQgcmdiYSgwLDAsMCwuMTEpfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICBwcml2YXRlIF9kYXRhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfc3JjOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRhdGEoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH1cclxuICBzZXQgZGF0YSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICB0aGlzLnJlbmRlcih2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzcmMoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3NyYzsgfVxyXG4gIHNldCBzcmModmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fc3JjID0gdmFsdWU7XHJcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZVxyXG4gICAgICAuZ2V0U291cmNlKHZhbHVlKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIG1hcmtkb3duID0+IHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyKG1hcmtkb3duKTtcclxuICAgICAgICAgIHRoaXMubG9hZC5lbWl0KG1hcmtkb3duKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvciksXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBAT3V0cHV0KCkgbG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBnZXQgaXNUcmFuc2NsdWRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhdGhpcy5kYXRhICYmICF0aGlzLnNyYztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgbWFya2Rvd25TZXJ2aWNlOiBNYXJrZG93blNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuaXNUcmFuc2NsdWRlZCkge1xyXG4gICAgICB0aGlzLnJlbmRlcih0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lckhUTUwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKG1hcmtkb3duOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmNvbXBpbGUobWFya2Rvd24pO1xyXG4gICAgdGhpcy5tYXJrZG93blNlcnZpY2UuaGlnaGxpZ2h0KCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nWm9uZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJy4vbWFya2Rvd24uc2VydmljZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ21hcmtkb3duJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcmtkb3duUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBNYXJrZG93blNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICApIHsgfVxyXG5cclxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBNYXJrZG93blBpcGUgaGFzIGJlZW4gaW52b2tlZCB3aXRoIGFuIGludmFsaWQgdmFsdWUgdHlwZSBbJHt2YWx1ZX1dYCk7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXJrZG93biA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmNvbXBpbGUodmFsdWUpO1xyXG5cclxuICAgIHRoaXMuem9uZS5vblN0YWJsZVxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubWFya2Rvd25TZXJ2aWNlLmhpZ2hsaWdodCgpKTtcclxuXHJcbiAgICByZXR1cm4gbWFya2Rvd247XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGFuZ3VhZ2VQaXBlIH0gZnJvbSAnLi9sYW5ndWFnZS5waXBlJztcclxuaW1wb3J0IHsgTWFya2Rvd25Db21wb25lbnQgfSBmcm9tICcuL21hcmtkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcmtkb3duUGlwZSB9IGZyb20gJy4vbWFya2Rvd24ucGlwZSc7XHJcbmltcG9ydCB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJy4vbWFya2Rvd24uc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcmtlZE9wdGlvbnMgfSBmcm9tICcuL21hcmtlZC1vcHRpb25zJztcclxuXHJcbi8vIGhhdmluZyBhIGRlcGVuZGVuY3kgb24gYEh0dHBDbGllbnRNb2R1bGVgIHdpdGhpbiBhIGxpYnJhcnlcclxuLy8gYnJlYWtzIGFsbCB0aGUgaW50ZXJjZXB0b3JzIGZyb20gdGhlIGFwcCBjb25zdW1pbmcgdGhlIGxpYnJhcnlcclxuLy8gaGVyZSwgd2UgZXhwbGljaXRlbHkgYXNrIHRoZSB1c2VyIHRvIHBhc3MgYSBwcm92aWRlciB3aXRoXHJcbi8vIHRoZWlyIG93biBpbnN0YW5jZSBvZiBgSHR0cENsaWVudE1vZHVsZWBcclxuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93bk1vZHVsZUNvbmZpZyB7XHJcbiAgbG9hZGVyPzogUHJvdmlkZXI7XHJcbiAgbWFya2VkT3B0aW9ucz86IFByb3ZpZGVyO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbE1hcmtlZE9wdGlvbnM6IFByb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IE1hcmtlZE9wdGlvbnMsXHJcbiAgdXNlVmFsdWU6IHtcclxuICAgIGdmbTogdHJ1ZSxcclxuICAgIHRhYmxlczogdHJ1ZSxcclxuICAgIGJyZWFrczogZmFsc2UsXHJcbiAgICBwZWRhbnRpYzogZmFsc2UsXHJcbiAgICBzYW5pdGl6ZTogZmFsc2UsXHJcbiAgICBzbWFydExpc3RzOiB0cnVlLFxyXG4gICAgc21hcnR5cGFudHM6IGZhbHNlLFxyXG4gIH0sXHJcbn07XHJcblxyXG5jb25zdCBzaGFyZWREZWNsYXJhdGlvbnMgPSBbXHJcbiAgTGFuZ3VhZ2VQaXBlLFxyXG4gIE1hcmtkb3duQ29tcG9uZW50LFxyXG4gIE1hcmtkb3duUGlwZSxcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZXhwb3J0czogW1xyXG4gICAgLi4uc2hhcmVkRGVjbGFyYXRpb25zLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAuLi5zaGFyZWREZWNsYXJhdGlvbnMsXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcmtkb3duTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChtYXJrZG93bk1vZHVsZUNvbmZpZz86IE1hcmtkb3duTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTWFya2Rvd25Nb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIE1hcmtkb3duU2VydmljZSxcclxuICAgICAgICAuLi4obWFya2Rvd25Nb2R1bGVDb25maWdcclxuICAgICAgICAgID8gW1xyXG4gICAgICAgICAgICAgIG1hcmtkb3duTW9kdWxlQ29uZmlnLmxvYWRlciB8fCBbXSxcclxuICAgICAgICAgICAgICBtYXJrZG93bk1vZHVsZUNvbmZpZy5tYXJrZWRPcHRpb25zIHx8IGluaXRpYWxNYXJrZWRPcHRpb25zLFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICA6IFtpbml0aWFsTWFya2VkT3B0aW9uc10pLFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBNYXJrZG93bk1vZHVsZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnbWFya2VkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXJrZWRSZW5kZXJlciBleHRl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

/***/ }),

/***/ "./src/app/components/present/present-new/present-new.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/components/present/present-new/present-new.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .wrap {\n    width: 320px;\n    height: 192px;\n    padding: 0;\n    overflow: hidden;\n}\n.frame {\n    width: 1280px;\n    height: 786px;\n    border: 0;\n    -ms-transform: scale(0.25);\n    -moz-transform: scale(0.25);\n    -o-transform: scale(0.25);\n    -webkit-transform: scale(0.25);\n    transform: scale(0.25);\n    \n    -ms-transform-origin: 0 0;\n    -moz-transform-origin: 0 0;\n    -o-transform-origin: 0 0;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n} */\n.wrap { width: 600px; height: 390px; padding: 0; overflow: hidden; }\n.frame { width: 800px; height: 520px; border: 1px solid black; }\n.frame {\n    -ms-zoom: 0.75;\n    -moz-transform: scale(0.75);\n    -moz-transform-origin: 0 0;\n    -o-transform: scale(0.75);\n    -o-transform-origin: 0 0;\n    -webkit-transform: scale(0.75);\n    -webkit-transform-origin: 0 0;\n}"

/***/ }),

/***/ "./src/app/components/present/present-new/present-new.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/components/present/present-new/present-new.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <mat-grid-list cols=\"2\" rowHeight=\"1:1\">\n  <mat-grid-tile>\n    <div class=\"container\">\n      <textarea name=\"\" id=\"markdownText\" [value]=\"markdown\" (keyup)=\"onKeyUp()\" cols=\"80\" rows=\"10\"></textarea>\n    </div>\n    <button mat-button (click)=\"onPreview()\" class=\"btn-success\" >Preview</button>\n  </mat-grid-tile>\n  <mat-grid-tile>\n      <div class=\"wrap\">\n          <iframe #iframe id=\"slides-frame\"  [src]=\"url\" frameborder=\"0\" allowfullscreen></iframe>\n      </div>\n  </mat-grid-tile>\n</mat-grid-list> -->\n\n<div class=\"box\">\n  <div class=\"box-body\">\n    <div class=\"row\">\n      <div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\">\n        <div >\n          <!-- <textarea name=\"\" id=\"markdownText\" [value]=\"markdown\" (keyup)=\"onKeyUp()\" cols=\"80\" rows=\"10\"></textarea> -->\n          <md-editor name=\"Content\"  [(ngModel)]=\"markdown\" [height]=\"'300px'\" [mode]=\"mode\" [options]=\"options\"\n    required maxlength=\"500\"></md-editor>\n        </div>\n      </div>\n      \n      <div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">\n        <button type=\"button\" (click)=\"onPreview()\" class=\"btn btn-primary\">Preview</button>\n      </div>\n      \n      <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">\n        <div class=\"wrap\">\n          <iframe id=\"slides-frame\" class=\"frame\" [src]=\"url\"></iframe>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"box-footer\">\n    \n    <button type=\"button\" (click)=\"onSave()\" class=\"btn btn-large btn-block btn-success\">Save</button>\n    \n  </div>\n</div>\n<mat-progress-bar *ngIf=\"isLoading\" mode=\"indeterminate\"></mat-progress-bar>\n<!-- Kieu server -->\n\n<!-- <mat-grid-list cols=\"2\" rowHeight=\"1:1\">\n  <mat-grid-tile>\n    <div class=\"container\">\n<md-editor name=\"Content\" [preRender]=\"preRenderFunc\" [(ngModel)]=\"content\" [height]=\"'200px'\" [mode]=\"mode\" [options]=\"options\"\n  required maxlength=\"500\"></md-editor>\n<p>{{markdown}}</p>\n    </div>\n    <button mat-button (click)=\"onPreview()\">Preview</button>\n    <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\">{{content}}</textarea>\n  </mat-grid-tile>\n  <mat-grid-tile>\n        <div class=\"reveal\">\n                <div class=\"slides\">\n                        <section data-markdown\n                          data-separator=\"^---\"\n                          data-separator-vertical=\"^--\"\n                          data-separator-notes=\"^Note:\"\n                          data-charset=\"iso-8859-15\">\n                        <textarea data-template>\n                                {{content}}\n                        </textarea>\n               </section>\n                </div>\n            </div>\n  </mat-grid-tile>\n</mat-grid-list> -->"

/***/ }),

/***/ "./src/app/components/present/present-new/present-new.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/present/present-new/present-new.component.ts ***!
  \*************************************************************************/
/*! exports provided: PresentNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentNewComponent", function() { return PresentNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_reveal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/reveal.service */ "./src/app/services/reveal.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PresentNewComponent = /** @class */ (function () {
    function PresentNewComponent(fb, revealServices, sanitizer) {
        this.fb = fb;
        this.revealServices = revealServices;
        this.sanitizer = sanitizer;
        this.isLoading = false;
        this.createForm();
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/api/present/showReveal');
    }
    PresentNewComponent.prototype.createForm = function () {
        this.presentForm = this.fb.group({
            templateEditor: []
        });
    };
    PresentNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.revealServices.getMarkDownContent().subscribe(function (data) {
            console.log(data);
            _this.markdown = data.data;
            // let x=data.data.toString()
        });
    };
    PresentNewComponent.prototype.ngAfterViewInit = function () {
        //   Reveal.initialize({
        //     dependencies: [
        //         { src: '../../../../assets/reveal/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        //         { src: '../../../../assets/reveal/plugin/markdown/marked.js' },
        //         { src: '../../../../assets/reveal/plugin/markdown/markdown.js' },
        //         { src: '../../../../assets/reveal/plugin/notes/notes.js', async: true },
        //         { src: '../../../../assets/reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
        //      ],
        //     // Display controls in the bottom right corner
        //     controls: false,
        //     // Display a presentation progress bar
        //     progress: true,
        //     // If true; each slide will be pushed to the browser history
        //     history: true,
        //     // Apply a 3D roll to links on hover
        //     rollingLinks: true,
        //     width: "100%",
        //     height: "100%",
        //     margin: 0.2,
        //     top:"100px",
        //     minScale: 1,
        //     maxScale: 1
        // });
        // Reveal.configure({ slideNumber: true });
        // Reveal.configure({ slideNumber: 'c/t' });
    };
    PresentNewComponent.prototype.onKeyUp = function () {
        var seft = this;
        $("#markdownText").keyup(function (data) {
            // console.log($(this).val())
        });
    };
    PresentNewComponent.prototype.onPreview = function () {
        var seft = this;
        seft.revealServices.updateMarkdown(this.markdown).subscribe(function (data) {
            console.log(data);
            seft.iframe;
            seft.url = seft.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/api/present/showReveal');
        });
        console.log('preview');
        // this.content=`### Cao Van`
    };
    PresentNewComponent.prototype.reLoadIframe = function () {
        $('#slides-frame')[0].contentWindow.postMessage(JSON.stringify({
            method: 'reloadMarkdown'
        }), window.location.origin);
    };
    PresentNewComponent.prototype.preRenderFunc = function (content) {
        console.log(content);
        this.content = content;
        return content; // must return a string
    };
    //Save template reveal
    PresentNewComponent.prototype.onSave = function () {
        var _this = this;
        this.isLoading = true;
        this.revealServices.save({
            user_id: 1,
            content: this.markdown
        }).subscribe(function (data) {
            _this.isLoading = false;
            console.log(data);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('iframe'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], PresentNewComponent.prototype, "iframe", void 0);
    PresentNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-present-new',
            template: __webpack_require__(/*! ./present-new.component.html */ "./src/app/components/present/present-new/present-new.component.html"),
            styles: [__webpack_require__(/*! ./present-new.component.css */ "./src/app/components/present/present-new/present-new.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _services_reveal_service__WEBPACK_IMPORTED_MODULE_2__["RevealService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], PresentNewComponent);
    return PresentNewComponent;
}());



/***/ }),

/***/ "./src/app/components/present/present.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/present/present.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/present/present.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/present/present.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/components/present/present.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/present/present.component.ts ***!
  \*********************************************************/
/*! exports provided: PresentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentComponent", function() { return PresentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PresentComponent = /** @class */ (function () {
    function PresentComponent() {
    }
    PresentComponent.prototype.ngOnInit = function () {
    };
    PresentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-present',
            template: __webpack_require__(/*! ./present.component.html */ "./src/app/components/present/present.component.html"),
            styles: [__webpack_require__(/*! ./present.component.css */ "./src/app/components/present/present.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PresentComponent);
    return PresentComponent;
}());



/***/ }),

/***/ "./src/app/components/present/present.module.ts":
/*!******************************************************!*\
  !*** ./src/app/components/present/present.module.ts ***!
  \******************************************************/
/*! exports provided: PresentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentModule", function() { return PresentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _present_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./present.component */ "./src/app/components/present/present.component.ts");
/* harmony import */ var _present_new_present_new_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./present-new/present-new.component */ "./src/app/components/present/present-new/present-new.component.ts");
/* harmony import */ var _present_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./present.routing */ "./src/app/components/present/present.routing.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_froala_wysiwyg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-froala-wysiwyg */ "./node_modules/angular-froala-wysiwyg/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_material_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/material.module */ "./src/app/shared/material.module.ts");
/* harmony import */ var ngx_markdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-markdown */ "./node_modules/ngx-markdown/fesm5/ngx-markdown.js");
/* harmony import */ var ngx_markdown_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-markdown-editor */ "./node_modules/ngx-markdown-editor/esm5/ngx-markdown-editor.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var PresentModule = /** @class */ (function () {
    function PresentModule() {
    }
    PresentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(_present_routing__WEBPACK_IMPORTED_MODULE_4__["PresentRoutes"]),
                angular_froala_wysiwyg__WEBPACK_IMPORTED_MODULE_6__["FroalaEditorModule"].forRoot(),
                angular_froala_wysiwyg__WEBPACK_IMPORTED_MODULE_6__["FroalaViewModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _shared_material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
                ngx_markdown__WEBPACK_IMPORTED_MODULE_9__["MarkdownModule"].forRoot(),
                ngx_markdown_editor__WEBPACK_IMPORTED_MODULE_10__["LMarkdownEditorModule"]
            ],
            declarations: [_present_component__WEBPACK_IMPORTED_MODULE_2__["PresentComponent"], _present_new_present_new_component__WEBPACK_IMPORTED_MODULE_3__["PresentNewComponent"]]
        })
    ], PresentModule);
    return PresentModule;
}());



/***/ }),

/***/ "./src/app/components/present/present.routing.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/present/present.routing.ts ***!
  \*******************************************************/
/*! exports provided: PresentRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentRoutes", function() { return PresentRoutes; });
/* harmony import */ var _present_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./present.component */ "./src/app/components/present/present.component.ts");
/* harmony import */ var _present_new_present_new_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./present-new/present-new.component */ "./src/app/components/present/present-new/present-new.component.ts");


var PresentRoutes = [
    {
        path: '',
        component: _present_component__WEBPACK_IMPORTED_MODULE_0__["PresentComponent"],
        data: {
            breadcrumb: 'Present'
        },
        children: [
            {
                path: '',
                redirectTo: 'present-new',
                pathMatch: 'full'
            },
            {
                path: 'present-new',
                component: _present_new_present_new_component__WEBPACK_IMPORTED_MODULE_1__["PresentNewComponent"],
                data: {
                    breadcrumb: "Present-New",
                    title: "Tạo mới template trình chiếu"
                }
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/services/reveal.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/reveal.service.ts ***!
  \********************************************/
/*! exports provided: RevealService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RevealService", function() { return RevealService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RevealService = /** @class */ (function () {
    function RevealService(httpClient) {
        this.httpClient = httpClient;
        this.API_URL = "http://localhost:3000/api";
        this.options = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'text/plain') };
    }
    RevealService.prototype.updateMarkdown = function (data) {
        // console.log('update')
        return this.httpClient.put(this.API_URL + "/present/update", { data: data });
    };
    RevealService.prototype.getMarkDownContent = function () {
        return this.httpClient.get(this.API_URL + "/present/getMarkDownContent");
    };
    RevealService.prototype.save = function (data) {
        return this.httpClient.post(this.API_URL + "/reveal/save", data);
    };
    RevealService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], RevealService);
    return RevealService;
}());



/***/ })

}]);
//# sourceMappingURL=components-present-present-module.js.map