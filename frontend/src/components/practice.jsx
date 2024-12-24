import React, { useRef } from "react";

function Practice() {
  const inputRef = useRef();
  function focus() {
    inputRef.current.focus();
  }
  return (
    <>
      <input type="text" ref={inputRef} className="border border-black" />{" "}
      <br />
      <input type="text" className="border border-black" />
      <br />
      <button className="border border-black" onClick={focus}>
        focus
      </button>
    </>
  );
}

export default Practice;
