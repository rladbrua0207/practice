import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postArrAtom } from "../atoms";
import PageNation from "../Components/PageNation";
import Posts from "../Components/Posts";
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
  min-height: 575px;
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

function Notice() {
  const posts: IPosts[] = JSON.parse(localStorage.getItem("posts") as string);
  let noticeArr: IPosts[] = [];

  if (posts?.filter((post) => post.category === "notice")) {
    noticeArr = posts?.filter((post) => post.category === "notice");
  }

  for (let i = 0; i < noticeArr?.length; i++) {
    noticeArr[i].no = i + 1;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [noticePosts, setNoticePosts] = useState<IPosts[]>([...noticeArr]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setIsLoading(false);
    })();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp: IPosts[]) {
    const currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
  return (
    <div>
      {isLoading ? (
        <Title>Loading...</Title>
      ) : (
        <div>
          <Title>공지사항</Title>
          <PostContainer>
            <Posts
              arr={currentPosts(noticePosts)}
              isLoading={isLoading}
            ></Posts>
            <PageNation
              totalPosts={noticeArr.length}
              postsPerPage={10}
              paginate={setCurrentPage}
            ></PageNation>
          </PostContainer>
        </div>
      )}
    </div>
  );
}

export default Notice;
