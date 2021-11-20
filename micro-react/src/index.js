import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import RouterConfig from "./router";
import './index.css'

function render(props) {
  const { container, info } = props;
  ReactDOM.render(
    <React.StrictMode>
      <RouterConfig info={info}/>
    </React.StrictMode>,
    // 为了避免根 id #root 与其他的 DOM 冲突，需要限制查找范围。
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react17] react app bootstraped");
}

export async function mount(props) {
  console.log("[react17] props from main framework", props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
