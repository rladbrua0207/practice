import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { postArrAtom } from "../atoms";
import PageNation from "../Components/PageNation";
import Posts from "../Components/Posts";
import { IPosts } from "../Interface";

function Notice() {
  const posts: IPosts[] = JSON.parse(localStorage.getItem("posts") as string);
  let noticeArr: IPosts[] = [];

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  if (posts?.filter((post) => post.category === "notice")) {
    noticeArr = posts?.filter((post) => post.category === "notice");
  }

  for (let i = 0; i < noticeArr?.length; i++) {
    noticeArr[i].no = i + 1;
  }

  const [noticePosts, setNoticePosts] = useState<IPosts[]>([...noticeArr]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setIsLoading(false);
    })();
  }, []);

  console.log(noticePosts);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp: IPosts[]) {
    const currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <div>
      <Posts arr={currentPosts(noticePosts)} isLoading={isLoading}></Posts>
      <PageNation
        totalPosts={noticeArr.length}
        postsPerPage={10}
        paginate={setCurrentPage}
      ></PageNation>
    </div>
  );
}

export default Notice;
