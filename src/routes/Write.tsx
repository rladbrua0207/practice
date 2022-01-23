import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import styled from "styled-components";

const WriteForm = styled.form`
  margin: 50px auto;
  max-width: 800px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: solid 1px #8d8d8d;
  padding: 10px;
  background-color: ${(props) => props.theme.postBgColor};
  a {
  }
  a:hover,
  a:active {
    text-decoration: none;
  }
  #file {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

const WriteInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WriteSelect = styled.select`
  margin-right: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  height: 30px;
`;

const WriteLabel = styled.label`
  margin-right: 10px;
  min-width: 35px;

  &#fileLabel {
    min-width: 60px;
    margin-left: 10px;
    margin-right: 0;
    background-color: ${(props) => props.theme.bgColor};
    height: 32px;
    border-radius: 5px;
    line-height: 32px;
    padding: 0 5px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const WriteInput = styled.input`
  background-color: ${(props) => props.theme.bgColor};

  height: 30px;
  border-radius: 5px;
  border: none;
  width: 100%;
  font-size: 1.2rem;
`;

const WriteTextarea = styled.textarea`
  margin-top: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  width: 800px;
  resize: none;
  background-color: ${(props) => props.theme.bgColor};
  padding: 3px;
`;

const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteBtn = styled.button`
  background-color: #fff;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  color: #000;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const errorModalStyle: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    position: "absolute",
    top: "15%",
    left: "37%",
    right: "37%",
    bottom: "50%",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};

const ExitModal = styled.button`
  background-color: white;
  border-radius: 5px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const ModalTitle = styled.div`
  width: 100%;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContent = styled.div`
  margin-top: 20px;
  word-wrap: break-word;
  line-height: 1.2rem;
`;

function Write() {
  let posts: string[] = [];
  const { register, handleSubmit } = useForm();

  const onValid = (data: any) => {
    //인증에 성공했을 때 코드
    let now = new Date();
    console.log(data);
    const currentTime = {
      year: now.getFullYear(),
      month: String(now.getMonth() + 1).padStart(2, "0"),
      date: String(now.getDate()).padStart(2, "0"),
      hour: String(now.getHours()).padStart(2, "0"),
      minute: String(now.getMinutes()).padStart(2, "0"),
    };

    data.postId = now.valueOf();
    data.date = `${currentTime.year}.${currentTime.month}.${currentTime.date} ${currentTime.hour}:${currentTime.minute}`;
    data.name = ``; //로그인 한 사용자 이름
    data.views = 0; //조회수 백엔드랑 함께 구현
    posts = localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts") as string)
      : [];
    posts.push(data);
    localStorage.setItem("posts", JSON.stringify([...posts]));
  };

  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  let errorArr: string[] = [];
  const oninvalid = (data: any) => {
    if (data.content) errorArr.push(data.content.message);
    if (data.category) errorArr.push(data.category.message);
    if (data.title) errorArr.push(data.title.message);
    setErrors([...errorArr]);
    errorArr = [];
    setErrorIsOpen(true);
  };

  return (
    <WriteForm onSubmit={handleSubmit(onValid, oninvalid)}>
      <WriteInputWrapper>
        <WriteSelect
          {...register("category", {
            required: "카테고리를 선택 해 주세요",
          })}
        >
          <option value="">카테고리</option>
          <option value="notice">공지사항</option>
          <option value="question">질문</option>
        </WriteSelect>
        <WriteLabel htmlFor="title">제목</WriteLabel>
        <WriteInput
          id="title"
          {...register("title", {
            required: "제목을 한 글자 이상 적어 주세요.",
          })}
        ></WriteInput>
        <WriteLabel htmlFor="file" id="fileLabel">
          파일첨부
        </WriteLabel>
        <WriteInput type={"file"} id="file" {...register("file")}></WriteInput>
      </WriteInputWrapper>

      <WriteInputWrapper>
        <WriteTextarea
          rows={10}
          id="content"
          placeholder="내용을 입력해 주세요"
          {...register("content", {
            required: "내용을 한 글자 이상 적어 주세요.",
          })}
        ></WriteTextarea>
      </WriteInputWrapper>
      <WriteBox>
        <WriteBtn>완료</WriteBtn>
      </WriteBox>
      <ReactModal
        onRequestClose={() => setErrorIsOpen(false)}
        style={errorModalStyle}
        isOpen={errorIsOpen}
      >
        <ModalTitle>
          <span>오류</span>
          <ExitModal onClick={() => setErrorIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </ExitModal>
        </ModalTitle>
        {errors.map((error, index) => (
          <ModalContent key={index}>{error}</ModalContent>
        ))}
      </ReactModal>
    </WriteForm>
  );
}

export default Write;
