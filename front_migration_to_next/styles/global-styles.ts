import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
  }

  @media only screen and (max-width: 768px) {
    body {
      font-size: 12px;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      font-size: 10px;
    }
  }
  @font-face {
    font-family: 'NotoSansKR-Medium';
    src: local('NotoSansKR-Medium'),
      url('/fonts/NotoSansKR-Medium.woff2') format('woff2');
    font-display: swap;
  }
  
  @font-face {
    font-family: 'NanumMyeongjo';
    src: url('/fonts/NanumMyeongjo.ttf');
  }
  @font-face {
    font-family: 'JejuMyeongjo';
    src: url('/fonts/JejuMyeongjo-Regular.ttf') format('ttf');
  }
  @font-face {
    font-family: 'BlackHanSans-Regular';
    src: local('BlackHanSans-Regular'),
      url('/fonts/black-han-sans-v8-korean-regular.woff2') format('woff2'); // pattern: /directoryName/file.extension
    font-display: swap;
  }
  @font-face {
    font-family: 'NanumBrushScript-Regular';
    src: url('/fonts/NanumBrushScript-Regular.ttf'); // pattern: /directoryName/file.extension
  }
  @font-face {
    font-family: 'NanumSquareR';
    src: url('/fonts/NanumSquareR.woff'); // pattern: /directoryName/file.extension
  }
  body {
    margin: 0;
    font-family: 'NanumBrushScript-Regular', -apple-system, BlinkMacSystemFont,
      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
