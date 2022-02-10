## React / TypeScript 로 게시판만들기

게시판의 간단한 기능들에 로그인 까지만 구현 해 보려고 한다.



백엔드와 연결은 아직 못했지만 연결하기 전 까지 해 두거나 localstorage를 활용하여 데이터를 저장 해 구현하였다.



### 구현 한 기능

1. 유저인증

   1. 회원가입, 로그인
   2. 소셜 로그인

2. 게시판 페이지

   1. 게시판
   2. 페이지네이션

3. 게시글 페이지

   1. 게시글 작성, 수정, 삭제, 오류모달
   2. 댓글 및 대댓글 작성, 삭제




### 1. 유저인증

#### 1-1. 회원가입, 로그인

react-hook-form 패키지를 활용 해 구현하였다



##### 회원가입 UI

검증에 맞게 작성

![image-20220210213509461](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210213509461.png)

검증에 맞지 않게 작성

![image-20220210213601762](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210213601762.png)



##### 로그인 UI

![image-20220210213344204](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210213344204.png)



#### 1-2. 소셜 로그인

백엔드랑 연결 바로 할 수 있도록 accessToken을 받아오는거 까지 구현하였고 페이스북은 아직 구현 안하였다.

깃허브 로그인은 보안을 낮추지 않고 했을때는 CORS오류가 나왔는데 해결하지 못했다.



##### 카카오 

![image-20220210214829997](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210214829997.png)



##### 구글



![image-20220210214711560](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210214711560.png)

##### 깃허브

![image-20220210215850789](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210215850789.png)



### 2. 게시판페이지

처음에 react-table 과 react-pagination 패키지를 활용해 테이블을 만들어보다가 버전이 안맞는 문제와 그냥 실력 부족때문에 페이지 로딩이 한턴씩 늦게 되는 오류를 해결하지 못해 table 태그로 다시 구현하였다.



localstorage에서 게시물 리스트를 받아와 페이지에 10개씩 보여준다.



카테고리를 선택 할 수 있고 페이지네이션으로 다음 페이지를 렌더링 한다.

![image-20220210220340454](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210220340454.png)

![image-20220210220723480](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210220723480.png)



### 3. 게시글 페이지

게시글 작성은 로그인 한 유저만 할 수 있도록 하였고

게시글 수정, 삭제는 해당 게시글의 주인만 가능하도록 구현하였다.



#### 3-1. 게시글 작성, 수정, 삭제, 오류모달

##### 게시글 작성

![image-20220210221708487](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210221708487.png)



##### 게시글

![image-20220210222559602](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210222559602.png)



##### 게시글 수정

![image-20220210222654873](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210222654873.png)

=>

![image-20220210222715029](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210222715029.png)



##### 삭제

삭제버튼 누르고 확인하면 삭제

![image-20220210222936185](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210222936185.png)





##### 오류모달

게시글 작성 및 수정 할 때 카테고리설정, 제목작성, 내용작성 안하고 form 제출 시 오류모달 생성

![image-20220210223239406](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210223239406.png)



#### 3-2. 댓글 및 대댓글 작성, 삭제

본인의 댓글만 삭제 할 수 있고 모든 댓글에 답글을 작성 할 수 있다.

답글이 달린 댓글을 삭제하면 답글도 같이 삭제된다.



##### 댓글 및 대댓글 작성

![image-20220210223938890](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210223938890.png)



##### 댓글 및 대댓글 삭제

'?' 삭제

![image-20220210224116852](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210224116852.png)



'안' 삭제

![image-20220210224245076](https://raw.githubusercontent.com/rladbrua0207/image_repo/main/img/image-20220210224245076.png)
