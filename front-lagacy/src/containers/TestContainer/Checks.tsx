/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
type Props = {
  checkList: readonly boolean[];
  labels: readonly string[];
  onCheck: (index: number) => void;
};

const Checks: React.FunctionComponent<Props> = ({
  checkList,
  labels,
  onCheck
}) => {
  return (
    <ul>
      {labels.map((label, idx) => (
        <li key={idx}>
          <label>
            <input
              type="checkbox"
              checked={checkList[idx]}
              onClick={() => onCheck(idx)}
            />
            {label}
          </label>
        </li>
      ))}
    </ul>
  );
};
export default Checks;
