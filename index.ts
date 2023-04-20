import got from 'got';

export class DingtalkBot {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async sendMessage(message: DingtalkMessage): Promise<any> {
    const response = await got.post(this.apiUrl, {
      json: message,
      responseType: 'json',
    });
    return response.body;
  }

  /**
   * 发送文本消息
   * @param content 文本消息内容
   * @param at 可选，@相关信息
   */
  async text(content: string, at?: AtInfo): Promise<any> {
    const message: TextMessage = {
      at,
      text: { content },
      msgtype: 'text',
    };
    return await this.sendMessage(message);
  }

  /**
   * 发送链接消息
   * @param linkInfo 链接消息内容
   */
  async link(linkInfo: LinkMessage['link']): Promise<any> {
    const message: LinkMessage = {
      link: linkInfo,
      msgtype: 'link',
    };
    return await this.sendMessage(message);
  }

  /**
   * 发送Markdown消息
   * @param title Markdown消息的标题
   * @param text Markdown格式的消息内容
   * @param at 可选，@相关信息
   */
  async markdown(title: string, text: string, at?: AtInfo): Promise<any> {
    const message: MarkdownMessage = {
      at,
      markdown: { title, text },
      msgtype: 'markdown',
    };
    return await this.sendMessage(message);
  }

  /**
   * 发送ActionCard消息
   * @param actionCardInfo ActionCard消息内容
   */
  async actionCard(actionCardInfo: ActionCardMessage['actionCard']): Promise<any> {
    const message: ActionCardMessage = {
      actionCard: actionCardInfo,
      msgtype: 'actionCard',
    };
    return await this.sendMessage(message);
  }

  /**
   * 发送FeedCard消息
   * @param links FeedCard消息中的链接列表
   */
  async feedCard(links: FeedCardLink[]): Promise<any> {
    const message: FeedCardMessage = {
      feedCard: { links },
      msgtype: 'feedCard',
    };
    return await this.sendMessage(message);
  }
}

type AtInfo = {
  atMobiles: string[];
  atUserIds: string[];
  isAtAll: boolean;
};

type TextMessage = {
  at?: AtInfo;
  text: { content: string };
  msgtype: 'text';
};

type LinkMessage = {
  msgtype: 'link';
  link: {
    text: string;
    title: string;
    picUrl: string;
    messageUrl: string;
  };
};

type MarkdownMessage = {
  msgtype: 'markdown';
  markdown: { title: string; text: string };
  at?: AtInfo;
};

type ActionCardMessage = {
  actionCard: {
    title: string;
    text: string;
    btnOrientation: string;
    singleTitle: string;
    singleURL: string;
  };
  msgtype: 'actionCard';
};

type FeedCardLink = {
  title: string;
  messageURL: string;
  picURL: string;
};

type FeedCardMessage = {
  msgtype: 'feedCard';
  feedCard: { links: FeedCardLink[] };
};

type DingtalkMessage =
  | TextMessage
  | LinkMessage
  | MarkdownMessage
  | ActionCardMessage
  | FeedCardMessage;
