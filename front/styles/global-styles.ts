import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    //background: linear-gradient(to bottom, #dae2f8, #d6a4a4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background : ${({ theme }) => theme.mode.background};
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

  body {
    margin: 0;
    font-family: 'NanumBrushScript-Regular', -apple-system, BlinkMacSystemFont,
      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-auto-rows: 20px;

  }
  .item {
    background-color: #ffffff;
  }
  
  .photothumb{
    width: 100%;
  }
  
  .title {
    padding: 20px;
   }
  
  .title h3{
    font-size: 1.2em;
    color: #ffffff;
    text-transform: uppercase;
  }
  
  .project .title{
    background-color: #607D8B;
  }
  
  .blog .title{
    background-color: #ff9800;
  }
  
  .photo .title{
    background-color: #f44336;
  }
  
  .desc{
    padding: 10px 10px 5px 10px;
  }
  
  .desc img{
    width: 50%;
    margin: 0 10px 10px 0;
    float: left;
  }
  
  .desc p{
    margin-bottom: 10px;
  }

`;

export default GlobalStyle;
