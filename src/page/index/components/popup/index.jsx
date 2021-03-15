import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import QueueAnim from "rc-queue-anim";
import { getNumberFromStyle } from "@/utils/index";
import "./style.scss";

function Popup({ visible, className, style, date = "00", rp }) {
  const popRef = useRef();

  const [ownStyle, setStyle] = useState({ ...style });

  useEffect(() => {
    if (popRef.current) {
      const computedStyle = window.getComputedStyle(popRef.current);
      const left = -(getNumberFromStyle(computedStyle.width) / 2) + "px";
      setStyle({
        ...ownStyle,
        left,
      });
    }
  }, [popRef.current]);

  function getRef(el) {
    if (!!el) {
      popRef.current = el;
    }
  }

  const popEle = (
    <div key="popupAnim" className="popup-content" ref={getRef}>
      <div className="triangle popup-fill"></div>
      <div className="popup popup-fill">
        <div className="popup-spending">spending</div>
        <div className="popup-date">{`${date} December 2020`}</div>
        <div className="popup-rp">
          <span>Rp</span> {rp}
        </div>
      </div>
    </div>
  );

  return (
    <div className={classnames("popup-warpper", className)} style={style}>
      <QueueAnim type="top" duration={400} delay={[0, 200]}>
        {visible ? popEle : null}
      </QueueAnim>
    </div>
  );
}

export default React.memo(Popup);
