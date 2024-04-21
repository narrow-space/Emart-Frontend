import React from 'react'
import ReactLoading from "react-loading";
const Loading = ({margin}) => {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ReactLoading className={`${margin}`}  type="spin" color="#4D2DB7" />
  </div>
  )
}

export default Loading