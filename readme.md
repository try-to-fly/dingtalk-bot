# 钉钉机器人 TypeScript SDK

这是一个使用 TypeScript 编写的钉钉机器人 SDK，用于发送不同类型的消息到钉钉群聊。

## 声明

该仓库代码是根据 chatgpt4.0 模型生成出来的：具体对话过程:https://sharegpt.com/c/akTM0js

## 安装

首先，确保你已经安装了`Node.js`和`npm`。然后，在你的项目根目录下执行以下命令来安装所需的依赖：

```bash
npm install dd-bot
```

## 用法

1. 将上面提供的`dd-bot.ts`文件添加到您的项目中。
2. 在您需要使用钉钉机器人的地方，导入`DingtalkBot`类并创建一个实例。

下面是一个简单的例子：

```typescript
import { DingtalkBot } from 'dd-bot';

const dingtalkBot = new DingtalkBot('https://your-webhook-url');

(async () => {
  // 发送文本消息
  const textResponse = await dingtalkBot.text({ isAtAll: false }, '这是一条文本消息');
  console.log('Text response:', textResponse);

  // 发送链接消息
  const linkResponse = await dingtalkBot.link({
    text: '这个即将发布的新',
    title: '时代的火车向前开',
    picUrl: '',
    messageUrl: 'https://www.dingtalk.com',
  });
  console.log('Link response:', linkResponse);

  // 发送Markdown消息
  const markdownResponse = await dingtalkBot.markdown(
    { isAtAll: false },
    '杭州天气',
    '#### 杭州天气\n > 9度',
  );
  console.log('Markdown response:', markdownResponse);

  // 发送ActionCard消息
  const actionCardResponse = await dingtalkBot.actionCard({
    title: '乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身',
    text: '### 乔布斯 20 年前想打',
    btnOrientation: '0',
    singleTitle: '阅读全文',
    singleURL: 'https://www.dingtalk.com/',
  });
  console.log('ActionCard response:', actionCardResponse);

  // 发送FeedCard消息
  const feedCardResponse = await dingtalkBot.feedCard([
    {
      title: '时代的火车向前开1',
      messageURL: 'https://www.dingtalk.com/',
      picURL: 'https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png',
    },
    {
      title: '时代的火车向前开2',
      messageURL: 'https://www.dingtalk.com/',
      picURL: 'https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png',
    },
  ]);
  console.log('FeedCard response:', feedCardResponse);
})();
```

在这个例子中，我们导入了`DingtalkBot`类，并使用您的钉钉机器人 Webhook URL 创建了一个实例。然后，我们使用该实例发送不同类型的消息，并处理返回的响应数据。
