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
  height: 800px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: solid #e8e8e8;

`;

const Content = styled.div`
  background-color: ${(props) => props.theme.postBgColor};
  border-color: #e8e8e8;
  border-radius: 8px;
  width: 90%;
  height: 60px;
  margin: 20px auto;
`;

function Notice() {
  return (
    <div>
      <Title>공지사항</Title>
      <PostContainer>
        <Content></Content>
        <Content></Content>
        <Content></Content>
        <Content></Content>
        <Content></Content>
        <Content></Content>
        <Content></Content>
        <Content></Content>
      </PostContainer>
    </div>
  );
}

export default Notice;
