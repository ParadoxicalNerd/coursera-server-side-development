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
const promotions_1 = __importDefault(require("../services/promotions"));
// ##########################################################
//                      Root routing
// ##########################################################
router.route('/')
    .all((req, res, next) => {
    res.type('json');
    next();
})
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield promotions_1.default.getAllPromotions();
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield promotions_1.default.createNewPromotion(req.body);
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
    const { document, error } = yield promotions_1.default.deleteAllPromotions();
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}));
// ##########################################################
//                      Promotion routing
// ##########################################################
router.route('/:promotionID')
    .all((req, res, next) => {
    res.type('json');
    next();
})
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield promotions_1.default.getOnePromotion(req.params.promotionID);
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
    res.send({ error: "Cannot create promotion this way" });
})
    .put((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield promotions_1.default.updateOnePromotion(req.params.promotionID, req.body);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}))
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { document, error } = yield promotions_1.default.deleteOnePromotion(req.params.promotionID);
    if (!error) {
        res.statusCode = 200;
        res.send(document);
    }
    else {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=promotions.js.map