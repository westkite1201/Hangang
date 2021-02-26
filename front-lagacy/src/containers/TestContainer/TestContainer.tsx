/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import Checks from './Checks';
const labels = ['check 1', 'check 2', 'check 3'];

const TestContainer: React.FunctionComponent = () => {
  const [checkList, setCheckList] = useState([false, false, false]);

  // index 번째 체크 상태를 반전시킨다
  const handleCheckClick = (index: number) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)));
  };

  const isAllChecked = checkList.every((x) => x);

  return (
    <div>
      <Checks
        checkList={checkList}
        labels={labels}
        onCheck={handleCheckClick}
      />

      <p>
        <button disabled={!isAllChecked}>다음</button>
      </p>
    </div>
  );
};
export default TestContainer;
