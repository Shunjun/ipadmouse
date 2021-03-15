import React, {
  createElement,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import AlternateContext from "../../utils/alternateContext";
import { getChildInfo, isSameInfo } from "../../utils/index";

function Alternate(props, ref) {
  const { children } = props;
  const Alternates = useContext(AlternateContext);

  const isChildHover = useRef(false);

  const childRef = useRef();

  const childInfo = useRef();

  function checkChildInstance() {
    if (!(childRef.current instanceof HTMLElement)) {
      throw new Error(childRef.current, "child is not HTMLLIElement");
    }
  }

  // TODO 初始渲染就在 child 中,不会触发 Enter 事件

  useEffect(() => {
    checkChildInstance();
    const child = childRef.current;
    if (ref?.current) {
      ref.current = child;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (typeof children.props.onMouseEnter === "function") {
      children.props.onMouseEnter.call(children);
    }
    isChildHover.current = true;
    const child = childRef.current;
    childInfo.current = getChildInfo(child);
    Alternates.add(child, childInfo.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (typeof children.props.onMouseLeave === "function") {
      children.props.onMouseLeave.call(children);
    }
    isChildHover.current = false;
    const child = childRef.current;
    Alternates.remove(child);
  }, []);

  // 检查元素位置是否改变,更新鼠标形状及位置
  useEffect(() => {
    if (isChildHover.current) {
      const child = childRef.current;
      const preInfo = childInfo.current;
      childInfo.current = getChildInfo(child);

      if (isSameInfo(preInfo, childInfo.current)) {
        Alternates.refresh();
      }
    }
  });

  function getRef(el) {
    childRef.current = el;
  }

  const tagProps = {
    ...children.props,
    ref: getRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return createElement(children.type, tagProps);
}

export default React.forwardRef(Alternate);
