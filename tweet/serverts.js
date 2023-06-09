"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
var schema_1 = require("@graphql-tools/schema");
var ws_1 = require("ws");
var ws_2 = require("graphql-ws/lib/use/ws");
var graphql_subscriptions_1 = require("graphql-subscriptions");
// This `app` is the returned value from `express()`.
var httpServer = (0, http_1.createServer)(app);
var schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });
// ...
var server = new ApolloServer({
    schema: schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer: httpServer }),
        // Proper shutdown for the WebSocket server.
        {
            serverWillStart: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, {
                                drainServer: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, serverCleanup.dispose()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                            }];
                    });
                });
            },
        },
    ],
});
// Creating the WebSocket server
var wsServer = new ws_1.WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
});
// Hand in the schema we just created and have the
// WebSocketServer start listening.
var serverCleanup = (0, ws_2.useServer)({ schema: schema }, wsServer);
var resolvers = {
    Subscription: {
        hello: {
            // Example using an async generator
            subscribe: function () {
                return __asyncGenerator(this, arguments, function () {
                    var _a, _b, _c, word, e_1_1;
                    var _d, e_1, _e, _f;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                _g.trys.push([0, 9, 10, 15]);
                                _a = true, _b = __asyncValues(['Hello', 'Bonjour', 'Ciao']);
                                _g.label = 1;
                            case 1: return [4 /*yield*/, __await(_b.next())];
                            case 2:
                                if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                                _f = _c.value;
                                _a = false;
                                _g.label = 3;
                            case 3:
                                _g.trys.push([3, , 6, 7]);
                                word = _f;
                                return [4 /*yield*/, __await({ hello: word })];
                            case 4: return [4 /*yield*/, _g.sent()];
                            case 5:
                                _g.sent();
                                return [3 /*break*/, 7];
                            case 6:
                                _a = true;
                                return [7 /*endfinally*/];
                            case 7: return [3 /*break*/, 1];
                            case 8: return [3 /*break*/, 15];
                            case 9:
                                e_1_1 = _g.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 15];
                            case 10:
                                _g.trys.push([10, , 13, 14]);
                                if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                                return [4 /*yield*/, __await(_e.call(_b))];
                            case 11:
                                _g.sent();
                                _g.label = 12;
                            case 12: return [3 /*break*/, 14];
                            case 13:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 14: return [7 /*endfinally*/];
                            case 15: return [2 /*return*/];
                        }
                    });
                });
            },
        },
        postCreated: {
            // More on pubsub below
            subscribe: function () { return pubsub.asyncIterator(['POST_CREATED']); },
        },
    },
    // ...other resolvers...
};
var pubsub = new graphql_subscriptions_1.PubSub();
