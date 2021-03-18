import React from "react";
import Icon from "@/components/icons";
import classnames from "classnames";
import { Alternate } from "@/components/cursor";
import avatarImg from "@/assets/image.jpg";
import "./style.scss";

const navMenuList = [
  {
    icon: "iconshouye",
    title: "Dashboard",
    bgColor: "#696adf",
  },
  {
    icon: "iconhongbao",
    title: "Send Money",
    bgColor: "#32a7e2",
  },
  {
    icon: " iconqianbao",
    title: "Top up Wallet",
    bgColor: "#9470f6",
  },
  {
    icon: "iconshangpu",
    title: "Withdraw",
    bgColor: "#23b07d",
  },
  {
    icon: "iconyinhangqia",
    title: "Bill Payment",
    bgColor: "#ff8702",
  },
];

const otherMenuList = [
  {
    icon: "iconzhinanzhen",
    title: "History Transactions",
    bgColor: "#9470f6",
  },
  {
    icon: "iconpengyou",
    title: "Request Payment",
    bgColor: "#f67171",
  },
  {
    icon: "iconjisuan",
    title: "Statistics",
    bgColor: "#12cdd9",
  },
  {
    icon: "iconwendang",
    title: "Help",
    bgColor: "#ffb648",
  },
];

function Navbar(props) {
  return (
    <>
      <div className="navbar-usrinfo">
        <Alternate>
          <a className="navbar-usrinfo-avatar-icon">
            <img className="user-avatar" src={avatarImg} alt="samantha" />
          </a>
        </Alternate>
        <div className="navbar-usrinfo-text">
          <div className="navbar-usrinfo-username">Samantha</div>
          <div className="navbar-usrinfo-email">sam@email.com</div>
        </div>
        <div className="navbar-usrinfo-setting">
          <Alternate>
            <Icon
              bgClassName="navbar-usrinfo-setting-iconbg"
              color="#9E9EB9"
              bgColor="#DDDDED"
              type="iconshezhi"
            />
          </Alternate>
        </div>
      </div>
      <nav className="navbar-nav">
        <NavItem
          className="navbar-nav-list-menu"
          bgColor="#9E9EB9"
          key="caidan"
          title="caidan"
          iconName="iconhanbaocaidan"
        ></NavItem>
        <div className="navbar-nav-list-title">Menu</div>
        <ul className="navbar-nav-list">
          {navMenuList.map(({ bgColor, title, icon }) => {
            return (
              <NavItem
                bgColor={bgColor}
                key={title}
                title={title}
                iconName={icon}
              ></NavItem>
            );
          })}
        </ul>
        <div className="navbar-nav-list-title">Other Menu</div>
        <ul className="navbar-nav-list">
          {otherMenuList.map(({ bgColor, title, icon }) => {
            return (
              <NavItem
                bgColor={bgColor}
                key={title}
                title={title}
                iconName={icon}
              ></NavItem>
            );
          })}
        </ul>
        <NavItem
          className="navbar-nav-list-setting"
          bgColor="#9E9EB9"
          key="setting"
          title="setting"
          iconName="iconshezhi"
        ></NavItem>
      </nav>
    </>
  );
}

function NavItem({ bgColor, title, iconName, className }) {
  return (
    <li className={classnames(["navbar-nav-item", className])}>
      <Alternate>
        <a className="navbar-nav-item-active">
          <Icon bgColor={bgColor} type={iconName}></Icon>
          <span className="navbar-nav-item-title">{title}</span>
        </a>
      </Alternate>
    </li>
  );
}

export default Navbar;
