import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TableState,
  usePagination,
  UsePaginationInstanceProps,
  useTable,
} from "react-table";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { IPost } from "../Interface";

const Table = styled.table`
  margin: 0 10px;
  text-align: center;

  & #no {
  }
  & #category {
    width: 90px;
  }
  & #name {
    width: 70px;
  }
  & #title {
    width: 280px;
  }
  & #date {
    width: 150px;
  }
  & #views {
    width: 60px;
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
  td {
    cursor: pointer;
    max-width: 270px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

interface IPostArr {
  isLoading: boolean;
  arr: IPost[];
}

function BoardTable({ arr: postArr, isLoading }: IPostArr) {
  const navigate = useNavigate();

  return (
    <div>
      <Table>
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
            <tr
              key={index}
              onClick={() =>
                navigate(`/post/${post.postId}`, {
                  state: {
                    no: post.no,
                    category: post.category,
                    title: post.title,
                    name: post.name,
                    date: post.date,
                    views: post.views,
                    postId: post.postId,
                    content: post.content,
                    file: post.file,
                  },
                })
              }
            >
              <td>{post.no}</td>
              <td>{post.category}</td>
              <td>{post.title}</td>
              <td>{post.name}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <PostTable {...getTableProps()}>
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
            </PostTable> */}
    </div>
  );
}

export default BoardTable;
