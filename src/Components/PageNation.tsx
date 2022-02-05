import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IBoardPage {
  totalPosts: number;
  postsPerPage: number;
  paginate: React.Dispatch<React.SetStateAction<number>>;
}

const Paging = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
  text-align: center;
  margin-right: 40px;
  height: 34px;
`;

const PageBtn = styled.button`
  background: none;
  height: 34px;
  border: none;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  &.selected {
    background: #e2e2e2;
    border-radius: 9999px;
  }
`;

const PageBox = styled.div`
  margin-left: 70px;
`;

const createArr = (n: number) => {
  const arr = [];
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
  const startPageNum = Number(pageBlock * pageNumInterval);
  let pageNumArr = arr.slice(startPageNum, pageNumInterval + startPageNum);

  const selectedPage = (n: string) => {
    pageNumArr.map((n) => {
      const id = document.getElementById(`${n}`);
      id?.classList.remove("selected");
    });
    const id = document.getElementById(`${n}`);
    id?.classList.add("selected");
  };

  const updateCurrPage = (n: number) => {
    currPage = n;
    paginate(currPage);
    selectedPage(`${n}`);
  };

  const nextPage = () => {
    if (currPage >= maxPage) return;
    currPage += 1;
    if (currPage > Math.ceil((pageBlock + 1) * pageNumInterval)) {
      setPageBlock((n) => n + 1);
    }
    paginate(currPage);
    selectedPage(`${currPage}`);
  };

  const prevPage = () => {
    if (currPage === 1) return;
    currPage -= 1;
    if (currPage <= pageNumInterval * pageBlock) {
      setPageBlock((n) => n - 1);
    }
    paginate(currPage);
    selectedPage(`${currPage}`);
  };

  const firstPage = () => {
    currPage = 1;
    setPageBlock(0);
    paginate(currPage);
    selectedPage(`${currPage}`);
  };

  const lastPage = () => {
    currPage = Math.ceil(maxPage);
    setPageBlock(Math.ceil(maxPage / pageNumInterval - 1));
    paginate(currPage);
    selectedPage(`${currPage}`);
    console.log(currPage);
  };

  useEffect(() => {
    (async () => {
      selectedPage(`${currPage}`);
    })();
  }, [pageBlock]);

  if (maxPage <= 1) {
    return <Paging></Paging>;
  }

  return (
    <Paging>
      <PageBox>
        <PageBtn onClick={firstPage}>&lt;&lt;</PageBtn>
        <PageBtn onClick={prevPage}>&lt;</PageBtn>
        <>
          {pageNumArr.map((n) => (
            <PageBtn key={n} id={`${n}`} onClick={() => updateCurrPage(n)}>
              {n}
            </PageBtn>
          ))}
        </>
        <PageBtn onClick={nextPage}>&gt;</PageBtn>
        <PageBtn onClick={lastPage}>&gt;&gt;</PageBtn>
      </PageBox>
    </Paging>
  );
}

export default PageNation;
