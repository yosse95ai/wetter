# About
GAS × Slack でお天気ボットを作りました.

もともとはHubotというボット開発サービスでJavaScriptを書いていたのですが，HerokuにHubotをデプロイする段階で，デプロイできないことに気づきました．

そのため無料で運用できるGAS(Google Apps Script)を採用しました．

# Slack Channel

お手数ですが，チャンネルへご参加いただき，直接使用していただければ幸いです．

招待用URL: [https://join.slack.com/t/roaaaa-dev/shared_invite/zt-l92ex72s-wKraUlZK~A1xYEuVIDVYXQ](https://join.slack.com/t/roaaaa-dev/shared_invite/zt-l92ex72s-wKraUlZK~A1xYEuVIDVYXQ)

# Sourvce Code
ソースコードになります．

[https://drive.google.com/drive/folders/1Gx04MppOSxGPHCfqM8-8zA6YpFzm8fLX?usp=sharing](https://drive.google.com/drive/folders/1Gx04MppOSxGPHCfqM8-8zA6YpFzm8fLX?usp=sharing)

# How to use
`#slack-bot`というチャンネルへ入っていただき，コマンドを送信していただきます.

`@wettervol2` に続いて`コマンド名`，`オプション`を指定していただくとボットからのレスポンスが返ってきます．

メッセージはすべて`半角スペース`で区切ってください. 

### Command list
`@wettervol2 help`でヘルプを表示し，コマンドリストを表示してくれますが，こちらにも記します．

- `@wettervol2 ex` : 例文を表示
- `@wettervol2 forecast t {市町村名} {n時間後}` : 市町村周辺のn時間後の天気予報を表示(47時間以内)
- `@wettervol2 forecast d {市町村名} {m日語}` : 市町村周辺のm日後の天気予報を表示(7日以内)
- `@wettervol2 help` : ヘルプを表示
- `@wettervol2 list` : 指定県に存在する市町村を表示
- `@wettervol2 weather c {市町村名}` : 市町村周辺の現在の天気を表示
- `@wettervol2 weather o {郵便番号} {該当国ID}` : 該当郵便番号の天気を表示
- `@wettervol2 weather p {日本郵便番号}` : 該当郵便番号の天気を表示

より詳しい使い方は，`@wettervol2 ex`をご参照いただきたいと思います.


