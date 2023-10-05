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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamMessages = void 0;
const params_1 = require("../../request/params");
const defaultOptions = {
    messageId: null,
    offset: 0,
    qty: 10,
    sortBy: "lastUpdated",
    sortDirection: "ASC",
    teamId: null,
};
const getTeamMessages = (client, options) => __awaiter(void 0, void 0, void 0, function* () {
    const methodParams = Object.assign({ method: "User_GetTeamMessages" }, (options !== null && options !== void 0 ? options : defaultOptions));
    const params = (0, params_1.create)({
        client,
        httpMethod: "GET",
        params: methodParams,
    });
    const { data } = yield client.axiosInstance.get("/", {
        params,
    });
    return data;
});
exports.getTeamMessages = getTeamMessages;
