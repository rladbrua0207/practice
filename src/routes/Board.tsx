import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageNation from "../Components/PageNation";
import { IPost } from "../Interface";
import BoardTable from "../Components/BoardTable";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../atoms";

const Container = styled.div`
  min-height: 900px;
`;

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
  height: 650px;
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

const PostWrapper = styled.div`
  height: 560px;
`;

const WriteSelect = styled.select`
  border: solid 1px #aaaaaa;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  height: 30px;
  width: 100px;
  margin-left: 15px;
  margin-bottom: 5px;
`;

const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
  #post {
    background-color: #e2e2e2;
    margin-right: 15px;
    padding: 7px;
    border-radius: 5px;
    color: #000;
  }
`;

function Board() {
  const allPosts: IPost[] = JSON.parse(localStorage.getItem("post") as string);
  let postArr: IPost[] = [];
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  const [category, setCategory] = useState("notice");

  const handleCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    const category = event.currentTarget.value;
    setCategory(category);
    console.log(category);
  };

  const setPostArr = () => {
    if (allPosts?.filter((allPosts) => allPosts.category === category)) {
      postArr = allPosts?.filter((allPosts) => allPosts.category === category);
    }

    for (let i = 0; i < postArr?.length; i++) {
      postArr[i].no = i + 1;
    }
  };

  function currentPosts(tmp: IPost[]) {
    const currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    console.log(indexOfLast);
    return currentPosts;
  }

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setPostArr();
      setPosts(postArr);
      setIsLoading(false);
    })();
  }, [category]);

  const [Posts, setPosts] = useState<IPost[]>([...postArr]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLast = currentPage * postsPerPage;
  console.log(indexOfLast);
  const indexOfFirst = indexOfLast - postsPerPage;

  return (
    <Container>
      {isLoading ? (
        <Title>Loading...</Title>
      ) : (
        <div>
          <Title>{category === "notice" ? "공지사항" : "질문"}</Title>
          <PostContainer>
            <PostWrapper>
              <WriteSelect onChange={handleCategory}>
                <option value={"notice"}>공지사항</option>
                <option value={"question"}>질문</option>
              </WriteSelect>
              <BoardTable
                arr={currentPosts(Posts)}
                isLoading={isLoading}
              ></BoardTable>
            </PostWrapper>
            <PageNation
              totalPosts={Posts.length}
              postsPerPage={10}
              paginate={setCurrentPage}
            ></PageNation>
            {loggedInUser.isLoggedIn ? (
              <WriteBox>
                <Link id="post" to="/postwrite">
                  글 작성
                </Link>
              </WriteBox>
            ) : (
              <></>
            )}
          </PostContainer>
        </div>
      )}
    </Container>
  );
}

export default Board;
