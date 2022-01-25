import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { postArrAtom } from "../atoms";
import BoardPage from "../Components/PageNation";
import { IPosts } from "../Interface";

const Title = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const PostContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
  min-height: 630px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: solid 1px #8d8d8d;
  padding: 10px;
  a {
  }
  a:hover,
  a:active {
    text-decoration: none;
  }
`;

const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  left: 800px;
  top: 900px;
  #write {
    background-color: #e2e2e2;
    margin: 10px 15px 0 0;
    padding: 7px;
    border-radius: 5px;
    color: #000;
  }
`;

const PostTable = styled.table`
  margin: 0 10px;
  text-align: center;
  #no {
  }
  #category {
    width: 90px;
  }
  #name {
    width: 60px;
  }
  #title {
    width: 280px;
  }
  #date {
    width: 150px;
  }
  #views {
    width: 70px;
  }
  thead {
    tr {
      th:nth-child(1) {
        width: 8%;
      }
      th:nth-child(2) {
        width: 12%;
      }
      th:nth-child(3) {
        width: 40%;
      }
      th:nth-child(4) {
        width: 20%;
      }
      th:nth-child(5) {
        width: 10%;
      }
      th:nth-child(6) {
        width: 10%;
      }
    }
  }

  th,
  td {
    height: 25px;
    padding: 10px;
    vertical-align: middle;
    border-bottom: solid 2px #e8e8e8;
  }
`;

interface IPostArr {
  isLoading: boolean;
  arr: IPosts[];
}

function Posts({ arr: postArr, isLoading }: IPostArr) {
  const navigate = useNavigate();

  console.log("Notice", postArr);

  const columns: any = useMemo(
    () => [
      {
        accessor: `no`,
        Header: "번호",
      },
      {
        accessor: `category`,
        Header: "카테고리",
      },
      {
        accessor: `title`,
        Header: "제목",
      },
      {
        accessor: `name`,
        Header: "글쓴이",
      },
      {
        accessor: `date`,
        Header: "등록일",
      },
      {
        accessor: `views`,
        Header: "조회수",
      },
    ],
    []
  );
  const data = useMemo(() => [...postArr], []);

  //{ no: 1, category: 1, title: "1", name: "1", date: 1, views: 1 }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      {isLoading ? (
        <Title>Loading...</Title>
      ) : (
        <div>
          <Title>공지사항</Title>
          <PostContainer>
            {/* <PostTable>
              <thead>
                <tr>
                  <th id="no">번호</th>
                  <th id="category">카테고리</th>
                  <th id="title">제목</th>
                  <th id="name">글쓴이</th>
                  <th id="date">등록일</th>
                  <th id="views">조회수</th>
                </tr>
              </thead>
              <tbody>
                {postArr.map((post, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{post.category}</td>
                    <td>{post.title}</td>
                    <td>{post.name}</td>
                    <td>{post.date}</td>
                    <td>{post.views}</td>
                  </tr>
                ))}
              </tbody>
            </PostTable> */}

            <PostTable {...getTableProps()}>
              <thead>
                {headerGroups.map((header, i) => (
                  <tr {...header.getHeaderGroupProps()}>
                    {header.headers.map((col) => (
                      <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      onClick={() => navigate(`/write/${row.original.postId}`)}
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </PostTable>
            <WriteBox>
              <Link id="write" to="/write">
                글 작성
              </Link>
            </WriteBox>
          </PostContainer>
        </div>
      )}
    </div>
  );
}

export default Posts;
