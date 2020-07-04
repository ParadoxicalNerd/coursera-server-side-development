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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
const dishes_1 = __importDefault(require("../services/dishes"));
// ##########################################################
//                      Root routing
// ##########################################################
router.route('/')
    .all((req, res, next) => {
    res.type('json');
    next();
})
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.getAllDishes();
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.createNewDish(req.body);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .put((req, res, next) => {
    res.statusCode = 403;
    res.send({ message: "Operation not supported", });
})
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.deleteAllDishes();
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}));
// ##########################################################
//                      Dish routing
// ##########################################################
router.route('/:dishID')
    .all((req, res, next) => {
    res.type('json');
    next();
})
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.getOneDish(req.params.dishID);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .post((req, res, next) => {
    res.status(403);
    res.send({ error: "Cannot create dish this way" });
})
    .put((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.updateOneDish(req.params.dishID, req.body);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.deleteOneDish(req.params.dishID);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}));
// ##########################################################
//               Dish comments root routing
// ##########################################################
router.route('/:dishID/comments')
    .all((req, res, next) => {
    res.type('text');
    next();
})
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.getAllComments(req.params.dishID);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.createNewComment(req.params.dishID, req.body);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .put((req, res, next) => {
    res.statusCode = 400;
    res.send('Impossible request');
})
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.deleteAllComments(req.params.dishID);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}));
// ##########################################################
//                    Dish comments routing
// ##########################################################
router.route('/:dishID/comments/:commentID')
    .all((req, res, next) => {
    res.type('text');
    next();
})
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.getOneComment(req.params.dishID, req.params.commentID);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .post((req, res, next) => {
    res.status(400);
    res.send("Can't set name this way");
})
    .put((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.updateOneComment(req.params.dishID, req.params.commentID, req.body);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield dishes_1.default.deleteOneComment(req.params.dishID, req.params.commentID);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=dishes.js.map