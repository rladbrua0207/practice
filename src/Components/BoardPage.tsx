import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postArrAtom } from "../atoms";
import { IPosts } from "../Interface";

interface IBoardPage {
  postsCount: number;
  per: number;
  arr: IPosts[];
}

const Paging = styled.div`
  margin-top: 12px;
  text-align: center;
`;

const PageBtn = styled.button`
  height: 34px;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
`;

const On = styled.div`
  background-color: pink;
`;

const createArr = (n: number) => {
  const iArr = [];
  for (let i = 0; i < n; i++) iArr[i] = i + 1;
  return iArr;
};

function BoardPage({ postsCount, per, arr }: IBoardPage) {
  const [currPage, setCurrPage] = useState(1);

  const pageNumArr = [];
  for (let i = 1; i <= Math.ceil(postsCount / per); i++) {
    pageNumArr.push(i);
  }

  const total = Math.ceil(postsCount / per);

  const iArr = createArr(Number(total));

  const [postArr, setPostArr] = useRecoilState(postArrAtom);
  useEffect(() => {
    (async () => {})();
    setPostArr(arr.slice((currPage - 1) * Number(per), Number(per) * currPage));
    console.log(postArr);
  }, [currPage]);
  //10개씩 자른 posts

  const updateCurrPage = (n: number) => {
    setCurrPage(n);
  };

  const firstPage = () => {
    setCurrPage(1);
  };

  const lastPage = () => {
    setCurrPage(postsCount / per);
  };

  //   const prevPage = () => {
  //     if (currPage <= 1) return;
  //     if (currPage - 1 <= per * blockNum) {
  //     }
  //     setCurrPage((n) => n - 1);
  //   };

  //   const nextPage = () => {
  //     if (currPage >= postsCount / per) return;
  //     if (per * Number(blockNum + 1) < Number(currPage + 1)) {
  //     }
  //     setCurrPage((n) => n + 1);
  //   };

  return (
    <Paging>
      <PageBtn onClick={firstPage}>&lt;&lt;</PageBtn>
      {/* <PageBtn onClick={prevPage}>&lt;</PageBtn> */}
      <>
        {pageNumArr.map((n) => (
          <PageBtn key={n} onClick={() => updateCurrPage(n)}>
            {n}
          </PageBtn>
        ))}
      </>
      {/* <PageBtn onClick={nextPage}>&gt;</PageBtn> */}
      <PageBtn onClick={lastPage}>&gt;&gt;</PageBtn>
    </Paging>
  );
}

export default BoardPage;
