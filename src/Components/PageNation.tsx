import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postArrAtom } from "../atoms";
import { IPosts } from "../Interface";

interface IBoardPage {
  totalPosts: number;
  postsPerPage: number;
  paginate: React.Dispatch<React.SetStateAction<number>>;
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

function PageNation({ totalPosts, postsPerPage, paginate }: IBoardPage) {
  const [currPage, setCurrPage] = useState(1);

  const pageNumArr = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumArr.push(i);
  }

  const total = Math.ceil(totalPosts / postsPerPage);

  const iArr = createArr(Number(total));

  const updateCurrPage = (n: number) => {
    setCurrPage(n);
  };

  const firstPage = () => {
    setCurrPage(1);
  };

  const lastPage = () => {
    setCurrPage(totalPosts / postsPerPage);
  };

  return (
    <Paging>
      <PageBtn onClick={firstPage}>&lt;&lt;</PageBtn>
      <>
        {pageNumArr.map((n) => (
          <PageBtn key={n} onClick={() => updateCurrPage(n)}>
            {n}
          </PageBtn>
        ))}
      </>
      <PageBtn onClick={lastPage}>&gt;&gt;</PageBtn>
    </Paging>
  );
}

export default PageNation;
