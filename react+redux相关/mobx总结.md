# Mobx

> Mobx 是 flux 实现的后起之秀. 以更简单的时候和更少的概念, 让 flux 使用起来变得更简单.
>
> 相比 Redux 有mutation, action, dispatch 等概念. mobx则更加简洁, 更符合对store 增删改查的操作概念.

## 安装依赖项: mobx, mobx-react

```shell
npm i mobx mobx-react
```

## 定义observable, observer 和 action

> 定义一个状态对象, 它具有可观察的属性, 我们将它称为 **observable**
>
> - 首先我们需要定义一个状态对象
> - 将其转化为可观察状态
>   - 将状态对象传递给 mobx observable()

```jsx
import {observable} from 'mobx';

let appState = observable({
    timer: 0
});
```

> 创建一个react组件, 它能够响应 observable 的变化, 我们将它称为 observer
>
> - 创建一个 React 组件.
> - 将其转化为 响应 observable 的组件
>   - 使用 mobx-react observer() 来包裹它.

```jsx
let App = observer(({ appState }) => {
    return (
        <div className="App">
            <h1>Time passed: {appState.timer}</h1>
        </div>
    );
});
```

> 定义更改状态的函数, 我们将它称为 action
>
> - 创建一个函数来更改 observable.
> - 使用 mobx action来包裹它.

```jsx
setInterval(action(()=>{
  appState.timer +=1  
}), 1000) 
```

## 完整代码

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

// create State object
let appState = observable({ timer: 0 });

// define action
setInterval(
    action(() => {
        appState.timer += 1;
    }),
    1000
);

appState.resetTimer = action(() => {
    appState.timer = 0;
});

// create observer
let App = observer(({ appState }) => {
    return (
        <div className="App">
            <h1>Time passed
: {appState.timer}</h1>
            <button onClick={appState.resetTimer}>reset timer</button>
        </div>
    );
});

const root = document.getElementById("root");
ReactDOM.render(<App appState={appState} />, root);
```