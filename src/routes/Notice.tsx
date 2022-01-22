import { Link } from "react-router-dom";
import styled from "styled-components";

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
  max-height: 600px;
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
    width: 35px;
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
  tbody {
  }
  th,
  td {
    height: 25px;
    padding: 10px;
    vertical-align: middle;
    border-bottom: solid 2px #e8e8e8;
  }
`;

const MakePostBtn = styled.button``;

function Notice() {
  return (
    <div>
      <Title>공지사항</Title>
      <PostContainer>
        <PostTable>
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
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </PostTable>
        <WriteBox>
          <Link id="write" to="/write">
            글 작성
          </Link>
        </WriteBox>
      </PostContainer>
    </div>
  );
}

export default Notice;
