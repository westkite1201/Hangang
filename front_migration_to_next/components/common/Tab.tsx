import styled from 'styled-components';
const St = {
  Content: styled.div`
    h4 {
      margin: 0px;
    }

    .tab {
      width: 600px;
      margin: 0px auto;
    }

    .tab-menu {
      background-color: beige;
    }

    .tab-menu > div {
      display: inline-block;
      width: 130px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
    }

    .content {
      background-color: antiquewhite;
      padding: 5%;
    }
  `
};

const Tab = () => {
  function makeTemplate(data, clickedName) {
    const html = document.getElementById('tab-template').innerHTML;
    const target = data.find((it) => it.name === clickedName);
    return html
      .replace('{name}', target.name)
      .replace('{favorites}', target.favorites);
  }

  function getContentFinder() {
    const cache = {};
    return [
      function (name) {
        if (cache.hasOwnProperty(name)) {
          return cache[name];
        } else {
          return null;
        }
      },
      function (name, content) {
        cache[name] = content;
      }
    ];
  }

  // 클로저를 이용한 캐시 기능
  const [getContent, addContent] = getContentFinder();

  function applyContent(template) {
    const section = document.querySelector('.content');
    section.innerHTML = template;
  }

  function sendAjax(url, clickedName) {
    const req = new XMLHttpRequest();
    req.addEventListener('load', function () {
      const data = JSON.parse(req.responseText);
      const content = makeTemplate(data, clickedName);
      applyContent(content);
      addContent(clickedName, content);
    });
    req.open('GET', url, true);
    req.send();
  }

  const tabMenu = document.querySelector('.tab-menu');
  tabMenu.addEventListener('click', function (event) {
    // 각 탭에 대한 이벤트가 아닌
    // tabMenu 요소에서 발생한 이벤트인 경우
    // innerText는 tab의 모든 name 으로 구성된다.
    // 따라서, tabMenu 요소에서 발생한 이벤트는 삭제한다.
    if (event.currentTarget === event.target) {
      event.preventDefault();
      return;
    }

    const name = event.target.innerText;
    const content = getContent(name);
    if (!!content) {
      applyContent(content);
    } else {
      sendAjax('http://127.0.0.1:8080/json.txt', name);
    }
  });
  return (
    <div className="tab">
      <div className="tab-menu">
        <div>red</div>
        <div>black</div>
        <div>blue</div>
        <div>white</div>
      </div>
      <section className="content">
        <h4>hello world</h4>
        <p>golf, facebook</p>
      </section>
    </div>
  );
};
export default Tab;

// <script id="tab-template" type="text/template">
//     <h4>hello {name}</h4>
//     <p>{favorites}</p>
// </script>
