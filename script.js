const card = document.querySelector(".card");
const input = document.querySelector('textarea');
const list = document.querySelector('.list-pack');
const inpBlock = document.querySelector('.input-block');
const title = document.querySelector('h1');

let resArr = [];
let allData = [];
let engl = 'English';
let rus = 'Русский';

const openCard = () =>{
  if (card.classList.contains('openCard')) {
    card.classList.remove('openCard')
    card.innerHTML = engl
  } else {
    card.classList.add('openCard')
    card.innerHTML = `<div class="ret">${rus}</div>`
  }
}


const play = () => {
  if (input.value.includes('hide""')) {
    hideData()
    return
  } else if (input.value.includes('get""')) {
    getData();
    return
  } else if (input.value.includes('push"')) {
    pushData();
    return
  } else if (input.value.includes('rules""')) {
    alert('test-test ,test = "1)test-test_,test"')
    input.value = '';
    return
  }
  resArr = []
  if (card.classList.contains('openCard')) {
    card.classList.remove('openCard')
    card.innerHTML = engl
  }

  let resStr = input.value.replace(/ /g, '')
  const letters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяєїiґabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯЄЇIҐABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const nums = '0123456789';
  let resOb = {en: '', ru: ''};
  let word = '';
  resStr = resStr.replace(/\n/g, "").split('')
  resStr.forEach((elem, idx) => {
    if (nums.includes(resStr[idx-1]) && elem === ')') {
      resOb.ru = word;
      resArr.push(resOb)
      word = ''
      resOb = {en: '', ru: ''};
    } else if(elem === '-') {
        resOb.en = word;
        word = '';
    } else if (nums.includes(elem)) {

    } else if (elem === '_') {
      word += ' ';
    } else {
      word += elem;
    } 
  })
  resArr.splice(0,1)
  resOb.ru = word;
  resArr.push(resOb)
  word = ''
  resOb = {en: '', ru: ''};

  rus = resArr[0].ru
  engl = resArr[0].en
  card.innerHTML = engl
  input.value = '';
};


const know = () => {
  if (resArr.length === 1) {
    resArr = []
    alert("Game Finished");
    card.innerHTML = 'English'
    engl = 'English';
    rus = 'Русский';
    return
  }
  resArr.forEach((elem, idx) => {
    if (elem.en === engl || elem.en === rus) {
      resArr.splice(idx,1)
    }
  });
  let rand = Math.floor(Math.random() * resArr.length)
  card.classList.remove('openCard')
  rus = resArr[rand].ru
  engl = resArr[rand].en
  let randSing = Math.round(Math.random())
  if (randSing === 0) {
    let engl2 = engl
    engl = rus
    rus = engl2
  }
  card.innerText = engl
}

const dknow = () => {
  if (resArr.length === 0) {
    return
  }
  let rand = Math.floor(Math.random() * resArr.length)
  card.classList.remove('openCard')
  rus = resArr[rand].ru
  engl = resArr[rand].en
  let randSing = Math.round(Math.random())
  if (randSing === 0) {
    let engl2 = engl
    engl = rus
    rus = engl2
  }
  card.innerText = engl
}



const pushData = async () => {
  let info = input.value;
  let name = info.replace(/"/g, '').replace(/push/g, '').replace(/ /g, '');
  await axios.post('https://6368e71615219b849609d6ae.mockapi.io/wordspacks', {name, array: resArr})
  input.value = '';
}

const changePack = (id) => {
  resArr = allData[id].array;
  rus = resArr[0].ru
  engl = resArr[0].en
  card.innerHTML = engl
  input.value = '';
  if (card.classList.contains('openCard')) {
    card.classList.remove('openCard')
    card.innerHTML = engl
  }
}


const getData = async () => {
  const res = await axios.get('https://6368e71615219b849609d6ae.mockapi.io/wordspacks')
  const arrayHtml = res.data.map((item, idx) => `<div class='pack' onclick="changePack(${idx})">${item.name}</div>`).join('');
  list.innerHTML = arrayHtml;
  input.value = '';
  allData = res.data;
}


const hideData = () => {
  inpBlock.style.display = 'none';
  title.style.display = 'none';
}
