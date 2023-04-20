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
