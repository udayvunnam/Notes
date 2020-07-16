import React from "react";
import Link from "next/link";

const App = () => {
  return (
    <div>
      <h1>Examples</h1>
      <ol>
        <li>
          <Link href="/simple">
            <a>Simple</a>
          </Link>
        </li>
        <li>
          <Link href="/basic">
            <a>Basic</a>
          </Link>
        </li>
        <li>
          <Link href="/custom-hooks">
            <a>Basic- extract to hooks</a>
          </Link>
        </li>
        <li>
          <Link href="/auto-refetch">
            <a>auto refetch</a>
          </Link>
        </li>
        <li>
          <Link href="/default-query-fn">
            <a>default query function</a>
          </Link>
        </li>
        <li>
          <Link href="/focus-refetch">
            <a>focus refetch</a>
          </Link>
        </li>
      </ol>
    </div>
  );
};

export default App;
