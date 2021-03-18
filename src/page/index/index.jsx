import React from "react";
import { Alternate } from "@/components/cursor";
import "./style.scss";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Icon from "@/components/icons";
import Histogram from "./components/histogram";
import Table from "./components/table";

export default function index() {
  return (
    <div className="s-background">
      <Layout>
        <Layout.Nav>
          <Navbar />
        </Layout.Nav>
        <Layout.Content className="content">
          <section className="balance">
            <div className="balance-warpper">
              <div className="balance-totalize">
                <div className="balance-totalize-subtitle">Your Balance</div>
                <div className="balance-totalize-number">
                  <span className="balance-totalize-unit">Rp</span>
                  8.250.000
                </div>
              </div>
              <ul className="balance-operates">
                <li className="balance-operates-item">
                  <Alternate>
                    <Icon
                      size={56}
                      type="iconfenxiang"
                      className="balance-operates-icon"
                    ></Icon>
                  </Alternate>
                  <div className="balance-operates-title">transfer</div>
                </li>
                <li className="balance-operates-item">
                  <Alternate>
                    <Icon
                      size={56}
                      type="iconxiazaigengxin"
                      className="balance-operates-icon"
                    ></Icon>
                  </Alternate>
                  <div className="balance-operates-title">Top-up</div>
                </li>
                <li className="balance-operates-item">
                  <Alternate>
                    <Icon
                      size={56}
                      type="iconqianbao"
                      className="balance-operates-icon"
                    ></Icon>
                  </Alternate>
                  <div className="balance-operates-title">Bill</div>
                </li>
              </ul>
            </div>
            <div className="balance-split"></div>
          </section>
          <Histogram className="section-interval" />
          <Table className="section-interval" />
        </Layout.Content>
      </Layout>
    </div>
  );
}
