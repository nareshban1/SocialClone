import {createGlobalStyle} from "styled-components";
export const GlobalStyles = createGlobalStyle`

body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Poppins;
    transition: all 0.50s linear;
  }
  

.navbar {
  background: ${({ theme }) => theme.background};
  transition: all 0.50s linear;
}

.displayname{
  background-color: ${({ theme }) => theme.lightback};
  transition: all 0.50s linear;

}


.createPostTitle , .createPostInput,.profile,.postformsection,.postCommentSection{
  background-color: ${({ theme }) => theme.background};
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;
}

.sideprofile{
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;
}

.otherinfo > p > span {
  background-color: ${({ theme }) => theme.mainbackground};
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;
}

.blog-item {
  background-color: ${({ theme }) => theme.background};
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;
}

.createComment, .comment-tab,.comment-menu{
  background-color: ${({ theme }) => theme.background};
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;
  
}

.likebtn{
  color:${({ theme }) => theme.text};
  transition: all 0.3s linear;
}

.sidebar {
  background-color: ${({ theme }) => theme.background};
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;

}
  `