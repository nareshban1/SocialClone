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

.postformsection {
  background-color: ${({ theme }) => theme.background};
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;

}
.createPostTitle , .createPostInput{
  background-color: ${({ theme }) => theme.background};
  color:${({ theme }) => theme.text};
  transition: all 0.50s linear;
}

  `