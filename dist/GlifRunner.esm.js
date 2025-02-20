import { throwError, allowStringMatching, expectStringMatching, expectPlainObject, ValueIsString, ValueIsArray, expectListSatisfying, allowFunction } from 'javascript-interface-library';

/******************************************************************************
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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**** GlifRunner - runs a given Glif ****/
var GlifRunner = /** @class */ (function () {
    /**** constructor - allows to configure a specific Glif API token ****/
    function GlifRunner(APIToken) {
        allowStringMatching('Glif API Token', APIToken, /^[a-z0-9]{32}$/);
        this._APIToken = APIToken;
    }
    Object.defineProperty(GlifRunner.prototype, "isRunning", {
        get: function () { return (this._AbortController != null); },
        set: function (_) { throwError('ReadOnlyProperty: cannot set "isRunning"'); },
        enumerable: false,
        configurable: true
    });
    GlifRunner.prototype.abort = function () {
        if (this._AbortController != null) {
            this._AbortController.abort();
            this._AbortController = undefined;
        }
    };
    Object.defineProperty(GlifRunner.prototype, "Response", {
        get: function () { return (this._Response == null ? undefined : structuredClone(this._Response)); },
        set: function (_) { throwError('ReadOnlyProperty: cannot set "Response"'); },
        enumerable: false,
        configurable: true
    });
    /**** run - run a given Glif and grab its result ****/
    GlifRunner.prototype.run = function (GlifId, InputValues, Callback) {
        return __awaiter(this, void 0, void 0, function () {
            var APIToken, Response_1, _a, Signal_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expectStringMatching('Glif Id', GlifId, /^[a-z0-9]{25}$/);
                        switch (true) {
                            case (InputValues == null):
                                InputValues = [];
                                break;
                            case ValueIsArray(InputValues):
                                expectListSatisfying('list of input values', InputValues, ValueIsString);
                                break;
                            default:
                                expectPlainObject('set of input values', InputValues);
                                if (Object.values(InputValues).some(function (Value) { return !ValueIsString(Value); }))
                                    throwError('InvalidArgument: Glif input values must be strings');
                        }
                        allowFunction('GlifRunner callback', Callback);
                        APIToken = this._APIToken || GlifRunner._APIToken;
                        if (APIToken == null)
                            throwError('MissingArgument: no Glif API token given');
                        if (this._AbortController != null) {
                            this.abort(); // create multiple runners for concurrent Glif runs
                        }
                        /**** now actually run the Glif ****/
                        this._AbortController = new AbortController();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('https://simple-api.glif.app', {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(APIToken),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: GlifId,
                                    inputs: (InputValues == null ? [] : structuredClone(InputValues)),
                                }),
                                signal: this._AbortController.signal
                            })];
                    case 2:
                        Response_1 = _b.sent();
                        _a = this;
                        return [4 /*yield*/, Response_1.json()];
                    case 3:
                        _a._Response = _b.sent();
                        this._AbortController = undefined;
                        return [3 /*break*/, 5];
                    case 4:
                        Signal_1 = _b.sent();
                        this._AbortController = undefined;
                        if (Callback != null) {
                            Callback(Signal_1, this);
                        }
                        throw Signal_1;
                    case 5:
                        if (Callback != null) {
                            Callback(this._Response, this);
                        }
                        return [2 /*return*/, this._Response]; // no structured clone here...
                }
            });
        });
    }; // ...as most users will not run their Glifs in the background
    Object.defineProperty(GlifRunner, "APIToken", {
        get: function () {
            return GlifRunner._APIToken;
        },
        set: function (APIToken) {
            allowStringMatching('Glif API Token', APIToken, /^[a-z0-9]{32}$/);
            GlifRunner._APIToken = APIToken;
        },
        enumerable: false,
        configurable: true
    });
    /**** static run - convenience method for simple GlifRunner invocations ****/
    GlifRunner.run = function (GlifId, InputValues, Callback) {
        return __awaiter(this, void 0, void 0, function () {
            var Runner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Runner = new GlifRunner();
                        return [4 /*yield*/, Runner.run(GlifId, InputValues, Callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GlifRunner;
}());

export { GlifRunner };
//# sourceMappingURL=GlifRunner.esm.js.map
