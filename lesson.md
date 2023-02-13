> :warning: 이 문서는 프로젝트를 진행하며 새롭게 배운 것을 정리하는 곳으로 **잘못된 정보를 포함하고 있을 수 있습니다!**

# Remix의 동적 라우팅에서 `params`를 가져오는 방법

[벨로퍼트님의 Remix 튜토리얼](https://velog.io/@velopert/learn-remix#42-url-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0)에서는 `useParams` 훅을 이용해 `params`를 가져오는 반면, [Remix 공식 가이드에서는](https://remix.run/docs/en/v1/guides/data-loading#route-params) `LoaderArgs` 타입의 객체를 입력으로 받는 `loader` 함수를 이용하여 `params`를 가져온다. 그리고 [Remix 공식 Blog 튜토리얼](https://remix.run/docs/en/v1/tutorials/blog#dynamic-route-params)에서도 공식 가이드와 같은 방법을 이용한다.

처음에는 무슨 차이인지 몰랐는데, 고민하다보니 서버 통신에 `params`를 이용하느냐 하지 않느냐의 차이라는 것을 알게되었다.

```tsx
// app/routes/items/$itemId.tsx
// Example for useParams()
import { useParams } from "@remix-run/react";

export default function Item() {
  const { itemId } = useParams();
  return <div>Item's Id: {itemId}</div>;
}
```

> `params`가 오직 UI를 보여주는 데에만 쓰인다!

```tsx
// app/routes/items/$itemId.tsx
// Example for loader function
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDataFromDB } from "../../lib/api";

export const loader = async ({ params }: LoaderArgs) => {
  const data = await getDataFromDB(params.itemId); // 서버 통신에 params가 쓰인다
  return json(data);
};

export default function Item() {
  const dataFromParams = useLoaderData<typeof loader>();
  return <div> ... </div>;
}
```

> 데이터 요청의 인자로 쓰이는 것뿐 아니라 가져온 데이터로부터 원하는 부분만 뽑아내기 위해 params가 쓰일 수도 있다.

next.js에서는 `params`를 어떻게 처리할지 궁금하지만 귀찮으니까 다음에 알아보도록 해야겠다

그런데, `useParams` 훅을 이용하여 `params`를 가져오는 부분은 서버에서 이루어질까 클라이언트에서 이루어질까? 서버에서 이루어질 거 같긴한데 이것도 다음에 알아봐야겠다.

# React Hydration Error

[이전 프로젝트](https://github.com/Bokwang0310/fifty-hertz)에서 사용한 적이 있는 [`react-player`](https://github.com/cookpete/react-player)를 이번에도 음악 재생을 위해 사용할 생각이었다. 그런데 일반 리액트 패키지를(심지어 UI에 직접적으로 관여하는 패키지를) remix에 바로 적용해도 되는지 의문이 생겼고 검색을 해보다가 [next.js에서의 `react-player`에 관한 이슈](https://github.com/cookpete/react-player/issues/1474#issuecomment-1184645105)를 찾을 수 있었다.

해당 이슈는 [React Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)와 관련되어 있었고 이 에러의 원인은 다음과 같다.

SSR을 위한 pre-rendered React tree와 Hydration 과정에서 생성되는 React tree가 있는데 이 두 트리 사이에 차이가 생기면 React tree와 DOM 사이 동기화가 끊겨 에러가 발생할 수 있다고 한다. 일반적으로, `window` 객체와 같이 pre-rendering과 브라우저에서 다를 수 있는 대상을 참조하는 경우에 발생한다고 한다.

[해당 이슈의 한 코멘트](https://github.com/cookpete/react-player/issues/1474#issuecomment-1186878393)에 따르면 `react-player`에서 `window`를 참조하는 부분에 대해 `react-player`를 수정해야 한다고 한다.

일단, 해당 이슈는 remix가 아니라 next.js의 것이기도 하고 그 사이에 이슈가 해결되었을 수도 있으므로.. 내 프로젝트에서 `react-player`를 적용해 보기로 했다.

적용해 본 결과, Hydration Error가 아니라 다른 에러가 발생했다:

```
Failed to execute ‘postMessage’ on ‘DOMWindow’: The target origin provided (’<URL>’) does not match the recipient window’s origin (’<URL>’).
```

저번 프로젝트에서도 경험했던 에러인데, 앱 구동에는 문제를 주지 않는 에러이다. 그래도 거슬리니까 해결하려면 주소에 `&origin=http://localhost:3000`을 붙여서 현재 앱이 구동되는 주소를 매핑해주면 된다! [출처](https://kingso.netlify.app/posts/error3/)

그런데, 새로고침을 하니까 Hydration Error가 미친듯이 발생했다.

정리하자면, 내 앱은 현재 `/`에서 플레이리스트 목록을 보여주고 그중 하나를 클릭하면 `/playlists/$id`로 넘어가서 해당 플레이리스트를 재생해주는 방식인데, 링크를 클릭해서 플레이리스트 페이지로 처음 왔을 때 렌더링 될 때는 아무 문제가 없다. 그런데, 해당 페이지에서 새로고침을 하면 `Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server.`가 엄청나게 발생한다. 또한, `/playlists/$id`를 주소창에 입력해서 바로 이동할 때도 같은 에러가 발생한다.

다른 종류의 에러도 몇 개 보인다:

```
Warning: An error occurred during hydration. The server HTML was replaced with client content in <#document>.
```

```
Uncaught Error: There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.
```

아무튼 서버 사이드 트리와 클라이언트 트리가 일치하지 않아서 생기는 것 같다.

[해당 이슈글의 코멘트](https://github.com/cookpete/react-player/issues/1474#issuecomment-1184645105)에서는 `next/dynamic`으로부터 `dynamic` 함수를 임포트하고 그걸 이용해 `react-player/lazy`를 동적 임포트하면 해결할 수 있다고 한다.

그런데, 아무리 찾아봐도 remix에서는 next.js의 `dynamic`과 같은 API를 찾을 수 없었다. 동적 임포트를 이용해야 한다는 (잘못된) 믿음을 가지고 `react-player/lazy`와 `React.lazy`, `React.Suspense`를 이용해 보기도 하고 [모듈 사이드이펙트 관련 remix 공식 문서](https://remix.run/docs/en/v1/guides/constraints#module-constraints)를 정독하였지만 답을 찾지 못했다.

그러던중, [`useState`와 `useEffect`를 활용한 `ClientOnly` 컴포넌트 관련 글](https://github.com/remix-run/remix/discussions/2936#discussioncomment-2602182)과 [`.client.tsx`와 `ClientOnly`에 관한 글](https://github.com/remix-run/remix/discussions/1023)로부터 답을 찾았다.

먼저, 서버에서 `react-player`를 실행하는 것을 막기 위해 `components/Player.client.tsx`에서 일반 `react-player`를 임포트하였고, 플레이어를 렌더링하는 컴포넌트에서 `useEffect`를 이용하여 클라이언트 사이드에서만 `Player.client`를 렌더할 수 있었다.

일단 왜 공식 문서에 `.client.tsx`에 대한 설명이 없는지 모르겠다. 아무리 살펴봐도 `entry.client.tsx`에 관한 이야기 뿐이다.

그리고 `ClientOnly`의 로직을 `Player.client.tsx`로 옮기는 것도 해봤는데, 이 경우, 다음과 같은 에러가 발생한다.

```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

서버사이드에서는 client import가 있을 떄 모든 값을 그냥 `undefined`로 처리해 버려서 타입 에러가 나는 것이라고 한다. 따라서, client import와 렌더링 로직을 분리해 주어야 하는 것이다.

에러는 해결했지만 이걸 전부 제대로 이해했는지는 모르겠다. 웹 생태계의 추상화 레벨이 너무 높아진 탓도 있는 것 같지만 근본적으로는, 내가 아직 기본이 많이 부족한 탓도 있는 것 같다.

그나저나 왜 `.client.tsx` 설명 안 해주는지는 진짜 궁금하네

# `entry.server.tsx`의 `handleRequest` 조건부 실행

`handleRequest` 함수는 `isbot` 함수의 결과값이 참이면 `handleBotRequest`를, 거짓이면 `handleBrowserRequest`를 실행한다.

하지만, 두 함수는 `renderToPipeableStream`의 두번째 인자로 들어가는 객체의 메소드 이름 하나만 다르므로 computed property name을 이용해 코드를 더 간단히 할 수 있다.

```tsx
// ...
const { pipe, abort } = renderToPipeableStream(
  <RemixServer context={remixContext} url={request.url} />,
  {
    [isbot(/* ... */) ? "onAllReady" : "onShellReady"]() {
      // ...
    },
    // ...
  }
);
// ...
```

# `renderToPipeableStream`과 css-in-js

emotion과 styled-component와 같은 css-in-js 라이브러리들은 `renderToString`으로 얻은 html로부터 style 규칙을 추출해서 style 태그를 만들었다. 하지만, React 18에 추가된 [`renderToPipeableStream`](https://ko.reactjs.org/docs/react-dom-server.html#rendertopipeablestream)은 한번에 initial html을 얻을 수 없기 때문에 기존의 방식이 먹히지 않는다.

현재 next.js와 remix에서는 `renderToPipeableStream`과 같은 streaming SSR을 지원하고 있지만 아직 많은 css-in-js 라이브러리들이 이에 대한 대응을 하지 못하고있다.

따라서 많은 사람들이 React 18로 업그레이드하는 과정에서 css-in-js 라이브러리에 의해 불편을 겪고 있다. [#1(styled-component)](https://github.com/styled-components/styled-components/issues/3658), [#2(emotion)](https://github.com/emotion-js/emotion/issues/2800)

리액트 팀은 React 18 업데이트에 맞춰 [스타일 라이브러리 업그레이드 가이드글](https://github.com/reactwg/react-18/discussions/110)을 내놓은 상태이지만 아직까지 제대로 된 방법은 나오지 않은 것 같다.

따라서, 본 프로젝트에 MUI를 적용하기 위해서는 remix 기본 구조로 잡혀있는 streaming SSR을 포기하고 `renderToString`을 이용해야 할 것 같다.

**추가**

streaming SSR과 css-in-js를 함께 사용할 수 있는 방법이 있긴 한 것 같다. [링크](https://shud.in/posts/ssr-streaming-and-css-in-js)

[SSR 관련 emotion 공식 문서](https://emotion.sh/docs/ssr)를 살펴보면 일반적으로는 추가 설정 없이도 streaming SSR과 emotion을 함께 사용할 수 있다고 한다.

> The default approach works with streaming and requires no additional configuration, but does not work with nth child or similar selectors.

하지만 nth child와 같은 선택자를 이용하는 경우에는 `default approach`가 불가능하며 streaming SSR을 이용하지 못하는 `advanced approach`만 이용 가능하다고 한다.

그런데 역시나 MUI에서는 emotion의 `advanced approach`가 필요하다고 한다. [참고](https://github.com/mui/material-ui/issues/33280)

# ES 모듈에 관한 의문

```jsx
export default function App() {
  return <>Hello</>;
}
```

이렇게 무언가를 default export 할 때, import 하는 방법은 여러가지가 있다.

```jsx
import App from "./App";
```

```jsx
import { default as App } from "./App";
```

둘의 차이는 뭘까

그리고 위의 경우에는 default export 하는 대상에 이름을 붙여줄 필요가 없고, 이름을 붙였더라도 import 하는 쪽에서 이름을 마음대로 붙여 이용할 수 있다.

그런데 대부분의 리액트 예시를 보면 default export 하는 컴포넌트에 자꾸 이름을 붙인다.

이렇게 되면 파일 이름은 바꾸고 컴포넌트 이름은 바꾸지 않아도 전혀 에러가 나지 않아 묻혀버리는 경우가 많다.

꼭 컴포넌트 이름 바꾸는 것을 잊어버리는 것만이 문제가 아니라, 그냥 파일 이름도 바꾸고 컴포넌트 이름도 바꾸는 것 자체가 낭비인 것 같다.

도대체 왜 수많은 리액트 튜토리얼은 이런 관행을 따르는 것일까.

```jsx
function App() {
  return <>Hello</>;
}

export default App;
```

> export 구문을 떨어뜨려 놓을 필요도 없고 컴포넌트에 이름을 붙여줄 필요도 없다.

사실, default export 자체가 이상하다고 생각하지만, 이 기능은 commonjs 때문에 만들어질 수밖에 없다는 얘기를 들은거 같긴 하다.

일단 난 귀찮으니까 모든 default export 컴포넌트의 이름을 지우기로 했다.

... 지우고 보니까 좀 밋밋하긴하네

# `@mui/icons-material` 사용시 에러

icon 이용을 위해 해당 패키지를 설치하고 Fab 안에 AddIcon을 추가하는 것까지는 문제가 없었지만 `routes/create.tsx`를 만들고 `/create`로 접속하니 이런 에러가 떴다.

```
TypeError: "useEnhancedEffect_default" is not a function
```

`node_modules` 지우고 다시 깔기도 해봤지만 소용 없음

Fab을 임포트 하는 방식을 바꾸니까 에러가 사라졌다. [참고](https://github.com/mui/material-ui/issues/31835#issuecomment-1153393901)

모든 mui 컴포넌트의 임포트 방식을 다 바꾸는 것도 아니고 아이콘이 쓰이는 Fab의 임포트만 바꾸는 것으로 해결된다는 점도 이상하고 Fab은 루트에서 쓰이는데 `/create`만 들어가면 에러가 발생한다는 점도 이상하다
