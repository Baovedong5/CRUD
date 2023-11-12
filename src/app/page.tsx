"use client";

import { Button } from "antd";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.grid}>
      <div
        style={{ padding: "16px 16px", textAlign: "center", margin: "15px" }}
      >
        <Button type="primary" size="large">
          <Link href="/type">Question Type</Link>
        </Button>
      </div>

      <div
        style={{ padding: "16px 19.2px", textAlign: "center", margin: "20px" }}
      >
        <Button type="primary" size="large">
          <Link href="/question">Question</Link>
        </Button>
      </div>

      <div
        style={{ padding: "16px 19.2px", textAlign: "center", margin: "20px" }}
      >
        <Button type="primary" size="large">
          <Link href="/answerer">Answerer</Link>
        </Button>
      </div>

      <div
        style={{ padding: "16px 19.2px", textAlign: "center", margin: "20px" }}
      >
        <Button type="primary" size="large">
          <Link href="/answer">Answer</Link>
        </Button>
      </div>
    </div>
  );
}
