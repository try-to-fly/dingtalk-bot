import { DingtalkBot } from './index';

jest.mock('got', () => {
  return {
    post: jest.fn(),
  };
});

describe('DingtalkBot', async () => {
  const got = await import('got').then((res) => res.default);
  const mockedPost = got.post as jest.MockedFunction<typeof got.post>;

  const apiUrl = 'https://your-webhook-url';
  let dingtalkBot: DingtalkBot;

  beforeEach(() => {
    dingtalkBot = new DingtalkBot(apiUrl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send text messages', async () => {
    mockedPost.mockResolvedValueOnce({ body: 'success' } as any);

    const response = await dingtalkBot.text('这是一条文本消息');

    expect(response).toBe('success');
    expect(mockedPost).toHaveBeenCalledWith(
      apiUrl,
      expect.objectContaining({ json: expect.any(Object) }),
    );
  });

  it('should send link messages', async () => {
    mockedPost.mockResolvedValueOnce({ body: 'success' } as any);

    const response = await dingtalkBot.link({
      text: '这个即将发布的新',
      title: '时代的火车向前开',
      picUrl: '',
      messageUrl: 'https://www.dingtalk.com',
    });

    expect(response).toBe('success');
    expect(mockedPost).toHaveBeenCalledWith(
      apiUrl,
      expect.objectContaining({ json: expect.any(Object) }),
    );
  });

  // 类似地，为其他消息类型编写测试用例

  // it("should send markdown messages", async () => { ... });
  // it("should send actionCard messages", async () => { ... });
  // it("should send feedCard messages", async () => { ... });
});
