import React, {
  createElement,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import AlternateContext from "../../utils/alternateContext";
import { getChildInfo, isSameInfo } from "../../utils/index";

export default function Alternate(props) {
  const { children } = props;
  const Alternates = useContext(AlternateContext);

  const isChildHover = useRef(false);

  const childRef = useRef();

  const childInfo = useRef();

  // TODO 初始渲染就在 child 中,不会触发 Enter 事件
  useEffect(() => {
    // const child = childRef.current;
    // console.log(child);
  }, []);

  const handleMouseEnter = useCallback(() => {
    isChildHover.current = true;
    const child = childRef.current;
    childInfo.current = getChildInfo(child);
    Alternates.add(child, childInfo.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
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

  const tagProps = {
    ...children.props,
    ref: childRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return createElement(children.type, tagProps);
}
