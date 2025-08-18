let activeCharacter = 'R';

// 캐릭터 선택
function setActiveCharacter(char) {
  activeCharacter = char;
  document.getElementById('btn_R').src = (char === 'R') ? 'img/R_활성화.png' : 'img/R_비활성화.png';
  document.getElementById('btn_J').src = (char === 'J') ? 'img/J_활성화.png' : 'img/J_비활성화.png';
}
function hoverCharacter(char) {
  const btn = document.getElementById(`btn_${char}`);
  btn.src = `img/${char}_활성화.png`;
}

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

// 저장버튼
function saveFullEditor() {
const target = document.getElementById('character_wrap');

document.fonts.ready.then(() => {
  html2canvas(target, {
    useCORS: true,
    scale: 2,
    foreignObjectRendering: true
  }).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'ICHIRIN.png';
    link.click();
  });
});
}
function saveOnlyCharacter() {
const target = document.querySelector('.character_wrapper');

document.fonts.ready.then(() => {
  html2canvas(target, {
    useCORS: false,
    scale: 1,
    backgroundColor: null
  }).then(originalCanvas => {
    const width = 700;
    const height = 480;

    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;

    const ctx = croppedCanvas.getContext('2d');

    ctx.drawImage(originalCanvas, 0, 0, width, height, 0, 0, width, height);

    const link = document.createElement('a');
    link.href = croppedCanvas.toDataURL('image/png');
    link.download = 'ICHIRIN.png';
    link.click();
  });
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
    // 기존 헤어 숨기기
    document.getElementById('hair_R').style.display = 'none';
    document.getElementById('hair_R_1').style.display = 'none';
    document.getElementById('hair_R_2').style.display = 'none';

    if (type === '초등부_헤어') {
      // 초등부는 밑/위 이미지 두 개로 구성
      document.getElementById('hair_R').src = '';
      document.getElementById('hair_R_1').src = 'img/R_초등부_헤어_밑.png';
      document.getElementById('hair_R_2').src = 'img/R_초등부_헤어_위.png';
      document.getElementById('hair_R_1').style.display = 'block';
      document.getElementById('hair_R_2').style.display = 'block';
    } else {
      // 고등부 등 단일 이미지 처리
      document.getElementById('hair_R').src = `img/R_${type}.png`;
      document.getElementById('hair_R').style.display = 'block';
    }
  }

  if (activeCharacter === 'J') {
    // J 캐릭터 헤어 처리
    document.getElementById('hair_J').style.display = 'none';
    document.getElementById('hair_J').src = `img/J_${type}.png`;
    document.getElementById('hair_J').style.display = 'block';
  }
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



// 페이지 로드 시 초기화
window.onload = function () {
  applyInitialHair('R', '초등부_헤어');
  applyInitialHair('J', '초등부_헤어');
  showTab('hair'); // 머리 탭 기본 활성화
};
