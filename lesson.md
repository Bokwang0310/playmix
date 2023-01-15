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
