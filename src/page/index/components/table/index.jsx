import React, { useState } from "react";
import SectionTitle from "../sectionTitle";
import TableItem from "./components/tableItem";
import classnames from "classnames";
import { getRandomItemFormList, getRandomAmount } from "@/utils/index";
import "./style.scss";

const typeList = ["Football Game", "Minimarket Aungrah", "DSLR Camera"],
  titleList = ["Grocery", "Entertainment", "Equipments"],
  iconList = [
    "iconaixin",
    "iconqianbao",
    "icongouwuche",
    "iconxiangji",
    "icondiannao",
    "iconfeiji",
    "iconshangpu",
  ],
  colorList = {
    red: "#f67171",
    orange: "#ff8702",
    yellow: "#ffb648",
    cyan: "#12cdd9",
    purple: "#9470f6",
    green: "#23b07d",
    bluepurple: "#696adf",
    blue: "#32a7e2",
    grape: "#b548c6",
  };

function createRandomData(count) {
  return new Array(count).fill(1).map(() => {
    return {
      title: getRandomItemFormList(titleList),
      type: getRandomItemFormList(typeList),
      date: "Nov 17",
      amount: getRandomAmount(),
      iconType: getRandomItemFormList(iconList),
      iconColor: getRandomItemFormList(colorList),
    };
  });
}

export default function Table(props) {
  const { className, ...otherProps } = props;

  const [data] = useState(createRandomData(5));
  return (
    <div className={classnames([className, "table-warppwer"])} {...otherProps}>
      <SectionTitle title="Latest Transactions" />
      <table className="table">
        <tbody className="table-body">
          {data.map((item, index) => (
            <TableItem key={index} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
