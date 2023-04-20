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
const got_1 = __importDefault(require("got"));
const _1 = require("./");
jest.mock('got', () => {
    return {
        post: jest.fn(),
    };
});
const mockedPost = got_1.default.post;
describe('DingtalkBot', () => {
    const apiUrl = 'https://your-webhook-url';
    let dingtalkBot;
    beforeEach(() => {
        dingtalkBot = new _1.DingtalkBot(apiUrl);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should send text messages', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedPost.mockResolvedValueOnce({ body: 'success' });
        const response = yield dingtalkBot.text('这是一条文本消息');
        expect(response).toBe('success');
        expect(mockedPost).toHaveBeenCalledWith(apiUrl, expect.objectContaining({ json: expect.any(Object) }));
    }));
    it('should send link messages', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedPost.mockResolvedValueOnce({ body: 'success' });
        const response = yield dingtalkBot.link({
            text: '这个即将发布的新',
            title: '时代的火车向前开',
            picUrl: '',
            messageUrl: 'https://www.dingtalk.com',
        });
        expect(response).toBe('success');
        expect(mockedPost).toHaveBeenCalledWith(apiUrl, expect.objectContaining({ json: expect.any(Object) }));
    }));
    // 类似地，为其他消息类型编写测试用例
    // it("should send markdown messages", async () => { ... });
    // it("should send actionCard messages", async () => { ... });
    // it("should send feedCard messages", async () => { ... });
});
