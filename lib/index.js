"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var WebClient = require('@slack/web-api').WebClient;
var web = new WebClient(process.env.Slack_Token);
module.exports = function (app) {
    app.log('***** This is my app ');
    app.on('pull_request.opened', function (context) { return __awaiter(_this, void 0, void 0, function () {
        var payload, issueComment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('PR************');
                    payload = context.payload;
                    console.log(JSON.stringify(payload));
                    issueComment = context.issue({ body: 'PR opened' }) //{ body: `Thanks for opening this pull request with the title ${payload.pull_request.title}, ${payload.pull_request.user.login}!!! The contents of head are:` + '\n\n\n```json\n' + JSON.stringify(payload.pull_request.head, null, 2) + '\n```\n' + 'The sender is:\n\n\n```json\n' + JSON.stringify(payload.sender, null, 2) + '\n```\n' })
                    ;
                    return [4 /*yield*/, context.github.issues.createComment(issueComment)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    app.on('issues.opened', function (context) { return __awaiter(_this, void 0, void 0, function () {
        var issueComment;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app.log('***** start ');
                    issueComment = context.issue({ body: 'Thanks for opening this issue!' });
                    return [4 /*yield*/, context.github.issues.createComment(issueComment)];
                case 1:
                    _a.sent();
                    //Start
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        var res, userId, response, _i, _a, i, response2, _b, _c, i;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, web.auth.test()
                                    // Find your user id to know where to send messages to
                                ];
                                case 1:
                                    res = _d.sent();
                                    userId = res.user_id;
                                    return [4 /*yield*/, web.channels.list({})];
                                case 2:
                                    response = _d.sent();
                                    for (_i = 0, _a = response.channels; _i < _a.length; _i++) {
                                        i = _a[_i];
                                        //console.log(i.name);
                                    }
                                    console.log("********");
                                    return [4 /*yield*/, web.groups.list({})];
                                case 3:
                                    response2 = _d.sent();
                                    for (_b = 0, _c = response2.groups; _b < _c.length; _b++) {
                                        i = _c[_b];
                                        console.log(i.name);
                                        /*if(i.name=="mpdm-manel.tahari--mbelhaouane--ahlem.zebda-1"){
                                          // Use the `chat.postMessage` method to send a message from this app
                                          await web.chat.postMessage({
                                            channel: i.id,
                                            text: `This is a test message`,
                                          });
                                        }*/
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })();
                    return [2 /*return*/];
            }
        });
    }); });
    // For more information on building apps:
    // https://probot.github.io/docs/
    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
};
//# sourceMappingURL=index.js.map