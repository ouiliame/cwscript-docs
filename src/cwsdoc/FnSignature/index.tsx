import React from "react";
import styles from "./styles.module.css";

export const FnSignature = ({ obj, name, params, returnType }) => {
  if (obj) {
    return (
      <>
        <div id={`_` + name} className={styles.signature}>
          <a className={"hash-link"} href={`#_` + name}></a>
          <span className={styles.obj}>{obj}.</span>
          <span className={styles.name}>{name}</span>
          <span className={styles.params}>({params.join(", ")})</span>
          {/*<span className={styles.returnType}>*/}
          {/*  {" -> "} {returnType}*/}
          {/*</span>*/}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id={`_` + name} className={styles.signature}>
          <a className={"hash-link"} href={`#_` + name}></a>
          <span className={styles.name}>{name}</span>
          <span className={styles.params}>({params.join(", ")})</span>
          {/*<span className={styles.returnType}>*/}
          {/*  {" -> "} {returnType}*/}
          {/*</span>*/}
        </div>
      </>
    );
  }
};
