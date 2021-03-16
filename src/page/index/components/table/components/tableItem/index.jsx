import React from "react";
import Icon from "@/components/icons";
import "./style.scss";
import { fixRp } from "@/utils/index";
import { Alternate } from "@/components/cursor";

export default function TableItem({ data, ...props }) {
  const { title, type, date, amount, iconType, iconColor } = data;

  return (
    <tr className="tableitem-row">
      <th>
        <Alternate>
          <Icon
            type={iconType}
            color={iconColor}
            size={44}
            bgColor={iconColor}
            bgColorOpacity={0.2}
          />
        </Alternate>
        <span className="tableitem-title">{title}</span>
      </th>
      <td className="tableitem-data">{date}</td>
      <td className="tableitem-type">{type}</td>

      <td className="tableitem-amount">
        <Alternate>
          <span>{fixRp(amount)}</span>
        </Alternate>
      </td>
    </tr>
  );
}
