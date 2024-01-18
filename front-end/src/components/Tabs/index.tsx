import { useState } from "react";
import "./index.scss";
import classNames from "classnames";
export default function Tabs(props: { loading?: boolean }) {
  const [array, setArray] = useState<number[]>([0]);
  const [active, setActive] = useState<number>(0);
  const addTab = () => {
    setArray([...array, array.length]); // Add a new element to the array when the button is clicked
  };
  return (
    <div className='tab-container'>
      {array.map((ele) => (
        <div
          className={classNames("tab_label", { isActive: active === ele })}
          onClick={() => setActive(ele)}
        >
          Profile {ele}
        </div>
      ))}
      <div className='tab_label' onClick={addTab}>
        +
      </div>
    </div>
  );
}
