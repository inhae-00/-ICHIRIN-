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
  // 모든 콘텐츠 숨기기
  document.querySelectorAll('.tab_content').forEach(el => el.classList.remove('active'));
  // 선택된 콘텐츠만 보이기
  document.getElementById(tabName).classList.add('active');

  // 모든 탭 버튼에서 active 제거
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  // 클릭한 탭 버튼에 active 추가
  document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
}

  // 전체 저
function saveCharacterImage() {
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

  // 캐릭터 부분만 저장
function saveOnlyCharacter() {
  const target = document.querySelector('.character_wrapper');

  document.fonts.ready.then(() => {
    html2canvas(target, {
      useCORS: false,
      scale: 2,
      backgroundColor: null
    }).then(originalCanvas => {
      const rect = target.getBoundingClientRect();

      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = rect.width;
      croppedCanvas.height = rect.height;

      const ctx = croppedCanvas.getContext('2d');

      ctx.drawImage(
        originalCanvas,
        0, 0, rect.width, rect.height,
        0, 0, rect.width, rect.height
      );

      const link = document.createElement('a');
      link.href = croppedCanvas.toDataURL('image/png');
      link.download = 'ICHIRIN.png';
      link.click();
    });
  });
}

  // 모바일 여부
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // 모바일이면 크게 저장 아니면 기본값
  const scaleValue = isMobile ? 3 : 1;

  document.fonts.ready.then(() => {
    html2canvas(target, {
      useCORS: false,
      scale: scaleValue,
      backgroundColor: null
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
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
    // 기존 헤어 숨김
    document.getElementById('hair_R').style.display = 'none';
    document.getElementById('hair_R_1').style.display = 'none';
    document.getElementById('hair_R_2').style.display = 'none';

    if (type === '초등부_헤어') {
      // 초등부 헤어는 위/아래 나눠야했음
      document.getElementById('hair_R').src = '';
      document.getElementById('hair_R_1').src = 'img/R_초등부_헤어_밑.png';
      document.getElementById('hair_R_2').src = 'img/R_초등부_헤어_위.png';
      document.getElementById('hair_R_1').style.display = 'block';
      document.getElementById('hair_R_2').style.display = 'block';
    } else {
      // 단일 이미지
      document.getElementById('hair_R').src = `img/R_${type}.png`;
      document.getElementById('hair_R').style.display = 'block';
    }
  }

  if (activeCharacter === 'J') {
    // J 캐릭터 헤어 변경
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

// 페이지 로드 초기
window.onload = function () {
  applyInitialHair('R', '초등부_헤어');
  applyInitialHair('J', '초등부_헤어');
  showTab('hair'); // 기본으로 머리 활성화
};
