window.addEventListener('load', function () {
document.querySelector('.left').innerHTML = '';
document.querySelector('.right').innerHTML = '';
    input = document.querySelector('input');
    input.value = '';

  data(function (err, inform) {
      if (err)
      {
          console.log(err);
      }
      for (var a in inform)
      {
          context(inform[a].author, inform[a].name, inform[a].img, a);
      }
      document.querySelector('.ri').innerHTML = 'Правая колонка:' + document.querySelector('.right').childNodes.length;
      document.querySelector('.le').innerHTML = 'Левая колонка:' + document.querySelector('.left').childNodes.length;


  })
    let timer ;


document.querySelector('input').addEventListener( 'keydown', function (event) {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
        data( function (err , res) {
            if(err)
            {
console.log(err);
            }
            else
                {
                    document.querySelector('.left').innerHTML = '';
                    document.querySelector('.right').innerHTML = '';
                    for (var b in res)
                    {

                        if ( res[b].author.toLowerCase().search(event.target.value.toLowerCase())!= -1)
                        {
                            console.log('hi');
                            context(res[b].author, res[b].name, res[b].img, b);
                        }
                    }
                    document.querySelector('.ri').innerHTML = 'Правая колонка:' + document.querySelector('.right').childNodes.length;
                    document.querySelector('.le').innerHTML = 'Левая колонка:' + document.querySelector('.left').childNodes.length;

                }
        })
        },500)
});
});


function  data (callbek) {
  let xml = new XMLHttpRequest();
  xml.open('GET',  './static/data.json')
  xml.onreadystatechange = function () {
      if (xml.readyState == 4)
      {
          try {
              callbek(null, JSON.parse(xml.responseText));
          }
          catch (err)
              {
                  callbek(err);
              }
      }
  }
  xml.send(null);
}
function dataImage (UrlImage) {
let pic = document.createElement('div');
pic.className = 'pic';
let span = document.createElement('span');
let image = document.createElement('img');
image.setAttribute('src', UrlImage );
span.appendChild(image);
pic.appendChild(span);
return pic;
}
function databutton (sct) {
    function checkIt() {
        if(localStorage.getItem(sct))
        {
            return 'before';
        }
        else
            {
                return'after';
            }
    }
    let div = document.createElement('div');
    div.className = checkIt();
    div.onclick = function (event) {
        if(event.target.className=='after')
        {
            localStorage.setItem(sct, sct)
            event.target.className = 'before';
            document.querySelector('.right').appendChild(event.target.parentNode);
        }
        else if(event.target.className == 'before')
        {
            localStorage.removeItem(sct);
            event.target.className = 'after';
            document.querySelector('.left').appendChild(event.target.parentNode);

        }
        else
            {
                localStorage.removeItem(sct);
                event.target.className = 'after';
                document.querySelector('.left').appendChild(event.target.parentNode);
        }
        document.querySelector('.ri').innerHTML = 'Правая колонка:' + document.querySelector('.right').childNodes.length;
        document.querySelector('.le').innerHTML = 'Левая колонка:' + document.querySelector('.left').childNodes.length;

    };
    return div;
}
function dataTitle (autor, name) {
    let title = document.createElement('div');
    title.className = 'title';
    let spanfirst = document.createElement('span');
    let spansecond = document.createElement('span');
    let b1 = document.createElement('b');
    let b2 = document.createElement('b');
    b1.innerHTML = 'Название:';
    b2.innerHTML = 'Автор:';
    spanfirst.appendChild(b1);
    spanfirst.appendChild(document.createTextNode(name));
    spansecond.appendChild(b2);
    spansecond.appendChild(document.createTextNode(autor));
    title.appendChild(spanfirst);
    title.appendChild(spansecond);
    return title;
}
function context (autor, name, UrlImage, src) {
    let item = document.createElement('div');
    let classN = localStorage.getItem(src)|| null;
    item.className = 'item';
    item.appendChild(dataImage(UrlImage));
    item.appendChild(dataTitle(autor,name));
    item.appendChild(databutton(src));
    if(classN)
    {
        document.querySelector('.right').appendChild(item);
    }
    else
    {
        document.querySelector('.left').appendChild(item);

    }

}

