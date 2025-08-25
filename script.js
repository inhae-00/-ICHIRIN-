// 활성화 캐릭터
let activeCharacter = 'R';

// 캐릭터 전환
function setActiveCharacter(char) {
  activeCharacter = char;
  document.getElementById('btn_R').src = (char === 'R') ? 'img/R_활성화.png' : 'img/R_비활성화.png';
  document.getElementById('btn_J').src = (char === 'J') ? 'img/J_활성화.png' : 'img/J_비활성화.png';
}

// 캐릭터 전환 hover
function hoverCharacter(char) {
  const btn = document.getElementById(`btn_${char}`);
  btn.src = `img/${char}_활성화.png`;
}

// 캐릭터 전환 hover 기존 활성화는 마우스 떼도 문제없게
function unhoverCharacter(char) {
  const btn = document.getElementById(`btn_${char}`);
  btn.src = (activeCharacter === char) 
    ? `img/${char}_활성화.png` 
    : `img/${char}_비활성화.png`;
}

// 탭 전환
function showTab(tabName) {
  document.querySelectorAll('.tab_content').forEach(el => el.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// 저장 전 UI 숨기기
function prepareForCapture(target) {
  document.querySelectorAll('.tab_container, .save_buttons').forEach(el => {
    el.style.visibility = 'hidden';
  });
}

// 저장 후 UI 복구
function restoreAfterCapture() {
  document.querySelectorAll('.tab_container, .save_buttons').forEach(el => {
    el.style.visibility = 'visible';
  });
}

// 캐릭터 저장버튼
function saveOnlyCharacter() {
  const target = document.querySelector('.character_wrapper');
  prepareForCapture(target);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const scaleValue = isMobile ? 3 : 1;

  document.fonts.ready.then(() => {
    setTimeout(() => {
      html2canvas(target, {
        useCORS: false,
        scale: scaleValue,
        backgroundColor: null
      }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'ICHIRIN.png';
        link.click();
        restoreAfterCapture();
      });
    }, 300);
  });
}


// 의상 변경
function changeOutfit(type) {
  const imgId = `outfit_${activeCharacter}`;
  const file = `img/${activeCharacter}_${type}.png`;
  document.getElementById(imgId).src = file;
  document.getElementById(imgId).style.display = 'block';
}

// 헤어 변경
function changeHair(type) {
  if (activeCharacter === 'R') {
    document.getElementById('hair_R').style.display = 'none';
    document.getElementById('hair_R_1').style.display = 'none';
    document.getElementById('hair_R_2').style.display = 'none';

    if (type === '초등부_헤어') {
      document.getElementById('hair_R').src = '';
      document.getElementById('hair_R_1').src = 'img/R_초등부_헤어_밑.png';
      document.getElementById('hair_R_2').src = 'img/R_초등부_헤어_위.png';
      document.getElementById('hair_R_1').style.display = 'block';
      document.getElementById('hair_R_2').style.display = 'block';
    } else {
      document.getElementById('hair_R').src = `img/R_${type}.png`;
      document.getElementById('hair_R').style.display = 'block';
    }
  }

  if (activeCharacter === 'J') {
    document.getElementById('hair_J').style.display = 'none';
    document.getElementById('hair_J').src = `img/J_${type}.png`;
    document.getElementById('hair_J').style.display = 'block';
  }
}

// 기타 꾸밈
function changeEtc(itemName) {
  const imgId = `etc_${activeCharacter}`;
  const etcImg = document.getElementById(imgId);
  etcImg.src = `img/${itemName}.png`;
  etcImg.style.display = 'block';
}

// 초기 헤어 설정
function applyInitialHair(char, type) {
  if (char === 'R') {
    document.getElementById('hair_R').style.display = 'none';
    document.getElementById('hair_R_1').style.display = 'none';
    document.getElementById('hair_R_2').style.display = 'none';

    if (type === '초등부_헤어') {
      document.getElementById('hair_R').src = '';
      document.getElementById('hair_R_1').src = 'img/R_초등부_헤어_밑.png';
      document.getElementById('hair_R_2').src = 'img/R_초등부_헤어_위.png';
      document.getElementById('hair_R_1').style.display = 'block';
      document.getElementById('hair_R_2').style.display = 'block';
    } else {
      document.getElementById('hair_R').src = `img/R_${type}.png`;
      document.getElementById('hair_R').style.display = 'block';
    }
  }

  if (char === 'J') {
    document.getElementById('hair_J').src = `img/J_${type}.png`;
    document.getElementById('hair_J').style.display = 'block';
  }
}

// 페이지 로드 초기
window.onload = function () {
  applyInitialHair('R', '초등부_헤어');
  applyInitialHair('J', '초등부_헤어');
  showTab('hair');
};
