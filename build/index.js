"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const http_1 = __importDefault(require("http"));
const port = 3000;
http_1.default.createServer(server_1.default).listen(port, () => console.log("Server is up and running on port " + port));
//# sourceMappingURL=index.js.map