import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  display: flex;
  position: sticky;
  top: 795px;
  justify-content: space-between;
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

const PageBox = styled.div`
  margin-left: 70px;
`;

const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  left: 800px;
  top: 1000px;
  #write {
    background-color: #e2e2e2;
    margin-right: 15px;
    padding: 7px;
    border-radius: 5px;
    color: #000;
  }
`;

const createArr = (n: number) => {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }
  return arr;
};
let currPage = 1;
function PageNation({ totalPosts, postsPerPage, paginate }: IBoardPage) {
  const maxPage = totalPosts / postsPerPage;

  const [pageBlock, setPageBlock] = useState(0);
  const pageNumInterval = 5;

  const arr = createArr(Number(maxPage));
  const v = Number(pageBlock * pageNumInterval);
  let pageNumArr = arr.slice(v, pageNumInterval + v);

  const updateCurrPage = (n: number) => {
    currPage = n;
    paginate(currPage);
  };

  const nextPage = () => {
    if (currPage >= maxPage) return;
    currPage += 1;
    if (currPage > Math.ceil((pageBlock + 1) * pageNumInterval)) {
      setPageBlock((n) => n + 1);
    }
    paginate(currPage);
  };

  const prevPage = () => {
    if (currPage === 1) return;
    currPage -= 1;
    if (currPage <= pageNumInterval * pageBlock) {
      setPageBlock((n) => n - 1);
    }
    paginate(currPage);
  };

  const firstPage = () => {
    currPage = 1;
    setPageBlock(0);
    paginate(currPage);
  };

  const lastPage = () => {
    currPage = totalPosts / postsPerPage;
    setPageBlock(Math.ceil(maxPage / pageNumInterval - 1));
    paginate(currPage);
  };

  return (
    <Paging>
      <div></div>
      <PageBox>
        <PageBtn onClick={firstPage}>&lt;&lt;</PageBtn>
        <PageBtn onClick={prevPage}>&lt;</PageBtn>
        <>
          {pageNumArr.map((n) => (
            <PageBtn key={n} onClick={() => updateCurrPage(n)}>
              {n}
            </PageBtn>
          ))}
        </>
        <PageBtn onClick={nextPage}>&gt;</PageBtn>
        <PageBtn onClick={lastPage}>&gt;&gt;</PageBtn>
      </PageBox>
      <WriteBox>
        <Link id="write" to="/write">
          글 작성
        </Link>
      </WriteBox>
    </Paging>
  );
}

export default PageNation;
