"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObject = exports.listAll = exports.uploadBytesResumable = exports.getDownloadURL = exports.ref = exports.storage = exports.app = void 0;
__exportStar(require("./graphql-queries"), exports);
__exportStar(require("./helper-methods"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./order-graphql-queries"), exports);
var firebase_1 = require("./firebase");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return firebase_1.app; } });
Object.defineProperty(exports, "storage", { enumerable: true, get: function () { return firebase_1.storage; } });
var storage_1 = require("firebase/storage");
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return storage_1.ref; } });
Object.defineProperty(exports, "getDownloadURL", { enumerable: true, get: function () { return storage_1.getDownloadURL; } });
Object.defineProperty(exports, "uploadBytesResumable", { enumerable: true, get: function () { return storage_1.uploadBytesResumable; } });
Object.defineProperty(exports, "listAll", { enumerable: true, get: function () { return storage_1.listAll; } });
Object.defineProperty(exports, "deleteObject", { enumerable: true, get: function () { return storage_1.deleteObject; } });
