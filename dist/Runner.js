"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
var AWS = __importStar(require("aws-sdk"));
var chalk = require("chalk");
var Runner = (function () {
    function Runner(steps, definitions, gitInfo) {
        this.promises = [];
        this.steps = steps;
        this.codeBuild = new AWS.CodeBuild();
        this.gitInfo = gitInfo;
        this.definitions = definitions.reduce(function (pv, cv) {
            pv.set(cv.name, cv);
            return pv;
        }, new Map());
    }
    Runner.prototype.run = function (dryRun) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, step, definition, promise, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('dryRun :>> ', dryRun);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        for (_i = 0, _a = this.steps; _i < _a.length; _i++) {
                            step = _a[_i];
                            definition = this.definitions.get(step.codeBuildDefinition);
                            definition.sourceVersion = this.gitInfo.commitHash;
                            delete definition['name'];
                            if (step.commands) {
                                definition.environmentVariablesOverride = [
                                    {
                                        name: 'CI_COMMANDS',
                                        value: step.commands.join('\n'),
                                        type: 'PLAINTEXT'
                                    }
                                ];
                            }
                            if (dryRun) {
                                continue;
                            }
                            console.log(chalk.grey('Triggering AWS Codebuild with the following parameters'), chalk.grey(JSON.stringify(definition, null, '\t')));
                            promise = this.codeBuild.startBuild(definition).promise();
                            this.promises.push(promise);
                        }
                        if (!(!dryRun && this.promises.length > 0)) return [3, 3];
                        return [4, Promise.all(this.promises)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.error(e_1.message);
                        throw e_1;
                    case 5: return [2];
                }
            });
        });
    };
    return Runner;
}());
exports.Runner = Runner;
//# sourceMappingURL=Runner.js.map