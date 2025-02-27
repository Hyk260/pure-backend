export interface ServerOptions {
  port: number | string;
  host: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export type ClientType = "web" | "app";

export type UserInfoType = {
  id: number;                          // 用户的唯一标识符
  login: string;                       // 用户名
  avatar_url: string;                  // 用户头像 URL
  node_id: string;                     // Node ID
  gravatar_id: string;                 // Gravatar ID
  url: string;                         // API 访问用户数据的 URL
  html_url: string;                    // GitHub 用户页面的 URL
  followers_url: string;               // API 获取该用户的关注者的 URL
  following_url: string;               // API 获取该用户关注的用户的 URL
  gists_url: string;                   // API 获取该用户的 Gists 的 URL
  starred_url: string;                 // API 获取该用户星标的项目的 URL
  subscriptions_url: string;           // API 获取该用户的订阅信息的 URL
  organizations_url: string;           // API 获取该用户所属组织的 URL
  repos_url: string;                   // API 获取该用户仓库的 URL
  events_url: string;                  // API 获取该用户的事件的 URL
  received_events_url: string;         // API 获取该用户接收到的事件的 URL
  type: 'User';                        // 用户类型
  user_view_type: 'public' | 'private'; // 用户视图类型
  site_admin: boolean;                 // 是否为 GitHub 管理员
  name: string | null;                 // 用户全名，可能为 null
  company: string | null;              // 所在公司，可能为 null
  blog: string;                        // 个人博客 URL
  location: string | null;             // 所在地点，可能为 null
  email: string | null;                // 电子邮箱，可能为 null
  hireable: boolean | null;            // 是否可被雇佣，可能为 null
  bio: string | null;                  // 用户个人简介，可能为 null
  twitter_username: string | null;     // Twitter 用户名，可能为 null
  notification_email: string | null;   // 通知邮箱，可能为 null
  public_repos: number;                // 公共仓库数量
  public_gists: number;                // 公共 Gists 数量
  followers: number;                   // 关注者数量
  following: number;                   // 关注的人数
  created_at: string;                  // 创建时间
  updated_at: string;                  // 更新时间
}