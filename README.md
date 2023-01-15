# playmix

플레이리스트 공유만을 위한 플랫폼

## 제작 배경

- 유튜브 플레이리스트 영상
  - 영상 편집이 필요하다
    - 플레이리스트 전체를 관통하는 영상을 만들 수 있지만
    - 간단하게 플레이리스트만 제작하고픈 사람에게는 불편하다
  - 제작자가 곡 정보를 적어두지 않는 경우가 있다
    - "이 노래 뭐지?" 싶을 때 바로 찾아보기 힘들다
  - 가사를 보기 힘들다
    - 단일 곡 영상은 자막이나 설명란, 댓글에 있는 경우가 많지만
    - 플레이리스트 영상은 그렇지 않음
    - 물론, playmix에서도 플레이리스트 제작자가 가사를 함께 첨부해야 하겠지만
    - 일단 첨부하면 재생 중인 노래의 가사를 바로 볼 수 있다는 장점이 있다
- 유튜브 자체 플레이리스트 기능
  - 순서를 바꾸기 불편하다
    - 순서를 설정함에 있어 다양한 방법을 제공할 필요가 있다
  - 유튜브에 없는 노래는 들을 수 없다
  - 공유가 활발하지 않다
    - 제작자와 코멘트도 있고 검색이 가능하지만
    - 리스트보단 단일 영상 하나하나의 임팩트가 큰 유튜브라는 큰 플랫폼 내에서 그 존재는 미미하다고 생각한다
    - 관심사의 분리가 필요하지 않을까
- 멜론, 유튜브 뮤직 등의 음악 앱
  - 유료
  - 유튜브 뮤직을 제외하면 음원으로 발매되지 않은 노래는 청취가 불가능하다
  - 플레이리스트 관련 기능이 불편한 앱이 존재

## 기능

- 유튜브 또는 사운드클라우드의 식별 아이디를 여러개 받아서 연속적으로 틀어준다
- 플레이리스트 생성/삭제
- 플레이리스트 내부 음악 추가/삭제
- 플레이리스트 소유자와 이용자 (owner & listeners)
  - owner & users로 하면 일반 사용자를 의미하는 user와 혼동
- 기본적으로 소유자가 설정한 음악 순서를 따르지만 이용자가 순서를 바꿀 수도 있음
  - 해당 작업은 이용자의 로컬 작업 (fork 느낌)
- 플레이리스트 구성요소
  - 총 음악 개수와 소요시간
  - 제목
  - 설명
  - 댓글, 좋아요
  - \*태그 (검색/분류 목적)
- \*이용자가 소유자에게 음악 추가 건의
- 자신이 소유자인 플레이리스트 및 로컬 작업한 플레이리스트를 모아볼 수 있는 곳

(\*은 미확정)

## 기술 스택

- Remix + DB
  - DB 미정

## Data Structure

### Playlist Data

DB에서 관리?

```json
[
  {
    "id": "",
    "owner": "",
    "links": [""],
    "title": "",
    "description": "",
    "likes?": 0,
    "comments?": [{ "author": "", "content": "" }],
    "tags??": []
  }
]
```

`likes`, `comments`는 나중에
`tags`는 더 나중에

### User Data

당장 회원 기능까지 구현하기는 힘들 거 같음
일단 익명 시스템으로 만들고 차차 구현할 수 있지 않을까

```json
[
  {
    "id": "",
    "nickname": "",
    "playlists": [
      { "type": "owned", "id": "" },
      { "type": "forked", "id": "", "links": [] }
    ]
  }
]
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
