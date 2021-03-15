import React, { useEffect, useState } from "react";
import { Alternate } from "@/components/cursor";
import Icon from "@/components/icons";
import Popup from "../popup";
import "./style.scss";
import { fixNumber, fixRp, getRandomAmount } from "@/utils/index";
import QueueAnim from "rc-queue-anim";
import SectionTitle from "../sectionTitle";

export default function Histogram(props) {
  const { lineAmount = 5, ...otherProps } = props;
  const [chartData, setData] = useState([]);
  const [popupVisible, setVisible] = useState({});

  useEffect(() => {
    function getRandomData() {
      return new Array(12).fill(1).map((_i, index) => {
        let data = {
          date: index + 1,
          balance: getRandomAmount(),
        };
        return data;
      });
    }
    setData(getRandomData());
  }, []);

  const handleMouseEnter = (item) => {
    setVisible({
      ...popupVisible,
      [item.date]: true,
    });
  };

  const handleMouseLeave = (item) => {
    setVisible({
      ...popupVisible,
      [item.date]: false,
    });
  };

  const rigntContent = (
    <Alternate>
      <div className="histogram-selector">
        <span className="">01-12 December 2020</span>
        <Icon
          size="20"
          bgColor="none"
          color="#9191a4"
          fontSize="8"
          type="iconzuanshi"
        />
      </div>
    </Alternate>
  );

  return (
    <section className="histogram-warpper" {...otherProps}>
      <SectionTitle title="Spending Activity" rightContent={rigntContent} />

      <div className="histogram-chart">
        <div className="histogram-chart-figure histogram-chart-area">
          {chartData.map((item) => {
            const { date, balance } = item;

            const popStyle = {
              top: `-${(balance / 45000) * 100 - 10}%`,
            };

            const animConfig = {
              height: [`${(balance / 45000) * 100}%`, 0],
            };

            return (
              <div key={date} className="histogram-chart-figure-warpper">
                <QueueAnim animConfig={animConfig}>
                  <Alternate key={date}>
                    <div
                      key={date}
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={() => handleMouseLeave(item)}
                      className="histogram-chart-figure-single"
                    ></div>
                  </Alternate>
                </QueueAnim>
                <Popup
                  style={popStyle}
                  visible={popupVisible[item.date]}
                  date={fixNumber(date)}
                  rp={fixRp(balance)}
                />
              </div>
            );
          })}
        </div>
        <div className="histogram-chart-axis histogram-chart-area">
          {new Array(lineAmount).fill(1).map((_, index) => (
            <div key={index} className="histogram-chart-axis-line"></div>
          ))}
        </div>
        <div className="histogram-chart-axisnumber">
          <div className="histogram-chart-axisnumber-y">
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>
          <div className="histogram-chart-axisnumber-x">
            {chartData.map(({ date }) => {
              return <span key={date}>{fixNumber(date)}</span>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
