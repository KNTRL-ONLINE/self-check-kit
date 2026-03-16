/* ─── 네비게이션 ─── */

const TOOLS = {
  bmi:     'BMI 계산기',
  calorie: '칼로리 계산기',
  skin:    '피부 타입 테스트',
  sleep:   '수면 사이클 계산기',
  stress:  '스트레스 지수 테스트',
};

function showHome() {
  document.getElementById('home').style.display = '';
  document.getElementById('breadcrumb').style.display = 'none';
  Object.keys(TOOLS).forEach(id => {
    document.getElementById('tool-' + id).style.display = 'none';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showTool(id) {
  document.getElementById('home').style.display = 'none';
  Object.keys(TOOLS).forEach(t => {
    document.getElementById('tool-' + t).style.display = 'none';
  });
  document.getElementById('tool-' + id).style.display = '';
  document.getElementById('breadcrumb').style.display = 'flex';
  document.getElementById('breadcrumb-title').textContent = TOOLS[id];
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 퀴즈 초기화
  if (id === 'skin') initSkin();
  if (id === 'stress') initStress();
}

/* ─── BMI 계산기 ─── */

function calcBMI() {
  const h = parseFloat(document.getElementById('bmi-height').value);
  const w = parseFloat(document.getElementById('bmi-weight').value);
  if (!h || !w || h < 100 || w < 20) {
    alert('키와 몸무게를 올바르게 입력해주세요.');
    return;
  }
  const bmi = w / ((h / 100) ** 2);
  const bmiRound = bmi.toFixed(1);

  let label, desc, color, pointerPct;

  if (bmi < 18.5) {
    label = '저체중'; desc = '체중이 정상 범위보다 낮습니다. 균형 잡힌 식사와 규칙적인 운동으로 근육량을 늘려보세요.';
    color = '#60a5fa'; pointerPct = (bmi / 18.5) * 25;
  } else if (bmi < 23) {
    label = '정상 체중'; desc = '건강한 체중 범위입니다. 현재 식습관과 활동량을 유지하세요.';
    color = '#4ade80'; pointerPct = 25 + ((bmi - 18.5) / (23 - 18.5)) * 25;
  } else if (bmi < 25) {
    label = '과체중'; desc = '정상 범위를 살짝 벗어났습니다. 식단 조절과 유산소 운동이 도움이 됩니다.';
    color = '#facc15'; pointerPct = 50 + ((bmi - 23) / (25 - 23)) * 25;
  } else {
    label = '비만'; desc = '체중이 건강에 영향을 줄 수 있습니다. 전문가와 상담해 체계적인 관리를 시작해보세요.';
    color = '#f87171'; pointerPct = Math.min(75 + ((bmi - 25) / 10) * 25, 98);
  }

  document.getElementById('bmi-value').textContent = bmiRound;
  document.getElementById('bmi-value').style.color = color;
  document.getElementById('bmi-label').textContent = label;
  document.getElementById('bmi-desc').textContent = desc;
  document.getElementById('bmi-pointer').style.left = pointerPct + '%';

  const result = document.getElementById('bmi-result');
  result.style.display = '';
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 칼로리 계산기 ─── */

function calcCalorie() {
  const gender = document.querySelector('input[name="cal-gender"]:checked').value;
  const age = parseFloat(document.getElementById('cal-age').value);
  const h = parseFloat(document.getElementById('cal-height').value);
  const w = parseFloat(document.getElementById('cal-weight').value);
  const act = parseFloat(document.getElementById('cal-activity').value);

  if (!age || !h || !w) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  let bmr;
  if (gender === 'male') {
    bmr = 10 * w + 6.25 * h - 5 * age + 5;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * age - 161;
  }

  const tdee = Math.round(bmr * act);

  document.getElementById('calorie-bmr').textContent = Math.round(bmr).toLocaleString();
  document.getElementById('calorie-tdee').textContent = tdee.toLocaleString() + ' kcal';
  document.getElementById('calorie-lose').textContent = (tdee - 500).toLocaleString() + ' kcal';
  document.getElementById('calorie-maintain').textContent = tdee.toLocaleString() + ' kcal';
  document.getElementById('calorie-gain').textContent = (tdee + 300).toLocaleString() + ' kcal';

  const result = document.getElementById('calorie-result');
  result.style.display = '';
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 피부 타입 테스트 ─── */

const SKIN_QUESTIONS = [
  {
    q: '세안 후 아무것도 바르지 않았을 때 피부가 어떤가요?',
    options: [
      { text: '당기고 건조하다', score: { dry: 3 } },
      { text: '편안하고 자연스럽다', score: { normal: 3 } },
      { text: '이마·코는 번들거리고 볼은 건조하다', score: { combo: 3 } },
      { text: '전체적으로 번들거린다', score: { oily: 3 } },
    ]
  },
  {
    q: '오후 2~3시쯤 피부 상태는?',
    options: [
      { text: '여전히 건조하고 각질이 보인다', score: { dry: 3 } },
      { text: '아침과 비슷하게 유지된다', score: { normal: 3 } },
      { text: 'T존만 번들거린다', score: { combo: 3 } },
      { text: '얼굴 전체가 번들거린다', score: { oily: 3 } },
    ]
  },
  {
    q: '모공은 어떤가요?',
    options: [
      { text: '거의 보이지 않는다', score: { dry: 2, normal: 1 } },
      { text: '작고 눈에 잘 띄지 않는다', score: { normal: 3 } },
      { text: 'T존 모공이 크고 볼 모공은 작다', score: { combo: 3 } },
      { text: '전체적으로 모공이 크다', score: { oily: 3 } },
    ]
  },
  {
    q: '새로운 스킨케어 제품을 사용할 때 피부 반응은?',
    options: [
      { text: '자주 트러블이 생기거나 붉어진다', score: { sensitive: 3 } },
      { text: '가끔 반응이 있다', score: { sensitive: 1, normal: 1 } },
      { text: '거의 반응이 없다', score: { normal: 2, oily: 1 } },
      { text: '전혀 반응이 없다', score: { oily: 2 } },
    ]
  },
  {
    q: '피부 질감은?',
    options: [
      { text: '거칠고 각질이 잘 일어난다', score: { dry: 3 } },
      { text: '부드럽고 매끄럽다', score: { normal: 3 } },
      { text: '부위마다 다르다', score: { combo: 3 } },
      { text: '매끄럽지만 번들거린다', score: { oily: 3 } },
    ]
  },
  {
    q: '여드름이나 뾰루지가 나는 편인가요?',
    options: [
      { text: '거의 나지 않는다', score: { dry: 1, normal: 2 } },
      { text: '가끔 T존에 난다', score: { combo: 3 } },
      { text: '자주 나고 번들거림과 함께 온다', score: { oily: 3 } },
      { text: '특정 제품이나 환경에서 민감하게 반응한다', score: { sensitive: 3 } },
    ]
  },
];

const SKIN_RESULTS = {
  dry: {
    icon: '🌵',
    type: '건성 피부',
    desc: '수분과 유분이 모두 부족한 편입니다. 보습에 집중한 케어가 필요해요.',
    tips: ['순한 크림 클렌저로 세안하세요', '세안 후 3분 내 토너·에센스·크림을 레이어링하세요', '히알루론산·세라마이드 성분을 찾아보세요', '일주일에 1~2회 보습 마스크팩을 활용하세요', '실내 습도를 50~60%로 유지하세요']
  },
  normal: {
    icon: '🌿',
    type: '중성 피부',
    desc: '수분과 유분 균형이 잘 맞는 이상적인 피부입니다. 현재 루틴을 유지하세요.',
    tips: ['자극이 적은 순한 세안제를 사용하세요', '가벼운 수분 크림으로 마무리하세요', '자외선 차단제는 매일 빠짐없이 바르세요', '계절 변화에 맞게 보습량을 조절하세요', '규칙적인 수면과 수분 섭취가 피부 건강의 기본입니다']
  },
  combo: {
    icon: '🍃',
    type: '복합성 피부',
    desc: 'T존은 지성, 볼은 건성인 복합 피부입니다. 부위별 맞춤 케어가 효과적입니다.',
    tips: ['T존과 볼에 각각 다른 제품을 사용해보세요', 'T존엔 가벼운 젤 타입, 볼엔 크림 타입을 사용하세요', '과도한 세안은 피하세요 (하루 2회가 적당)', '블랙헤드 케어는 T존에 집중하세요', '논코메도제닉 제품을 선택하세요']
  },
  oily: {
    icon: '💧',
    type: '지성 피부',
    desc: '피지 분비가 활발한 지성 피부입니다. 가볍고 수분감 있는 제품을 선택하세요.',
    tips: ['거품이 풍부한 세안제로 모공을 깨끗이 하세요', '오일프리·논코메도제닉 제품을 선택하세요', '보습을 건너뛰면 오히려 피지가 더 분비됩니다', '클레이 마스크로 주 1~2회 모공 케어를 하세요', '매트 선크림으로 번들거림을 조절하세요']
  },
  sensitive: {
    icon: '🌸',
    type: '민감성 피부',
    desc: '외부 자극에 쉽게 반응하는 민감한 피부입니다. 성분이 간단한 제품을 선택하세요.',
    tips: ['향료·알코올·파라벤이 없는 제품을 선택하세요', '새 제품은 반드시 패치 테스트 후 사용하세요', '센텔라아시아티카·판테놀 성분이 진정에 도움이 됩니다', '뜨거운 물 대신 미온수로 세안하세요', '심한 자극이 지속되면 피부과 전문의 상담을 권장합니다']
  }
};

let skinScores = {};
let skinStep = 0;

function initSkin() {
  skinScores = { dry: 0, normal: 0, oily: 0, combo: 0, sensitive: 0 };
  skinStep = 0;
  document.getElementById('skin-quiz').style.display = '';
  document.getElementById('skin-result').style.display = 'none';
  renderSkinQuestion();
}

function renderSkinQuestion() {
  const total = SKIN_QUESTIONS.length;
  document.getElementById('skin-progress-bar').style.width = (skinStep / total * 100) + '%';
  document.getElementById('skin-step-label').textContent = `질문 ${skinStep + 1} / ${total}`;

  const q = SKIN_QUESTIONS[skinStep];
  document.getElementById('skin-question').textContent = q.q;

  const optionsEl = document.getElementById('skin-options');
  optionsEl.innerHTML = '';
  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.onclick = () => {
      Object.entries(opt.score).forEach(([k, v]) => { skinScores[k] += v; });
      skinStep++;
      if (skinStep >= total) {
        showSkinResult();
      } else {
        renderSkinQuestion();
      }
    };
    optionsEl.appendChild(btn);
  });
}

function showSkinResult() {
  document.getElementById('skin-progress-bar').style.width = '100%';
  document.getElementById('skin-quiz').style.display = 'none';

  const topType = Object.entries(skinScores).sort((a, b) => b[1] - a[1])[0][0];
  const res = SKIN_RESULTS[topType];

  document.getElementById('skin-icon').textContent = res.icon;
  document.getElementById('skin-type').textContent = res.type;
  document.getElementById('skin-desc').textContent = res.desc;
  document.getElementById('skin-tips').innerHTML = `
    <h3>🌟 추천 케어 방법</h3>
    <ul>${res.tips.map(t => `<li>${t}</li>`).join('')}</ul>
  `;

  const result = document.getElementById('skin-result');
  result.style.display = '';
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetSkin() {
  initSkin();
  document.getElementById('skin-quiz').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 수면 사이클 계산기 ─── */

function switchSleepTab(tab) {
  document.getElementById('tab-wake').classList.toggle('active', tab === 'wake');
  document.getElementById('tab-bed').classList.toggle('active', tab === 'bed');
  document.getElementById('sleep-wake-panel').style.display = tab === 'wake' ? '' : 'none';
  document.getElementById('sleep-bed-panel').style.display = tab === 'bed' ? '' : 'none';
  document.getElementById('sleep-result').style.display = 'none';
}

function formatTime(h, m) {
  const ampm = h < 12 ? '오전' : '오후';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${ampm} ${hh}:${String(m).padStart(2, '0')}`;
}

function addMinutes(h, m, mins) {
  const total = h * 60 + m + mins;
  return { h: Math.floor(total / 60) % 24, m: total % 60 };
}

function subMinutes(h, m, mins) {
  let total = h * 60 + m - mins;
  if (total < 0) total += 1440;
  return { h: Math.floor(total / 60) % 24, m: total % 60 };
}

function calcSleepFromWake() {
  const val = document.getElementById('sleep-wake-time').value;
  if (!val) return;
  const [wh, wm] = val.split(':').map(Number);

  // 잠드는 데 14분 소요 반영
  // 기상시간에서 역으로 90분씩 빼기 (3~6사이클 = 270~540분)
  const cycles = [6, 5, 4, 3]; // 권장: 5~6사이클
  const times = cycles.map(c => {
    const sleepMins = c * 90 + 14;
    const t = subMinutes(wh, wm, sleepMins);
    return { cycle: c, time: t, recommended: c === 6 || c === 5 };
  });

  renderSleepResult('취침 권장 시간', times, '취침');
}

function calcSleepFromBed() {
  const val = document.getElementById('sleep-bed-time').value;
  if (!val) return;
  const [bh, bm] = val.split(':').map(Number);

  const cycles = [3, 4, 5, 6];
  const times = cycles.map(c => {
    const sleepMins = c * 90 + 14;
    const t = addMinutes(bh, bm, sleepMins);
    return { cycle: c, time: t, recommended: c === 6 || c === 5 };
  });

  renderSleepResult('기상 권장 시간', times, '기상');
}

function renderSleepResult(label, times, type) {
  document.getElementById('sleep-result-label').textContent = label;

  const container = document.getElementById('sleep-times');
  container.innerHTML = times.map(({ cycle, time, recommended }) => `
    <div class="sleep-time-item ${recommended ? 'recommended' : ''}">
      <div>
        <div class="sleep-cycle-label">${cycle}사이클 (${cycle * 1.5}시간)</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="sleep-time-value">${formatTime(time.h, time.m)}</span>
        ${recommended ? '<span class="sleep-badge">추천</span>' : ''}
      </div>
    </div>
  `).join('');

  const result = document.getElementById('sleep-result');
  result.style.display = '';
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 스트레스 지수 테스트 ─── */

const STRESS_QUESTIONS = [
  { q: '예상치 못한 일이 생겨 당황한 적이 있나요?' },
  { q: '중요한 일을 제대로 통제하지 못한다고 느꼈나요?' },
  { q: '불안하거나 스트레스를 받았나요?' },
  { q: '개인적인 문제를 처리하는 자신의 능력에 자신감을 느꼈나요?' },
  { q: '일이 내 뜻대로 잘 풀린다고 느꼈나요?' },
  { q: '감당하기 힘든 일이 쌓인다고 느꼈나요?' },
  { q: '짜증나는 일을 잘 조절할 수 있었나요?' },
  { q: '최고의 컨디션이라고 느꼈나요?' },
  { q: '내가 통제할 수 없는 일 때문에 화가 난 적이 있나요?' },
  { q: '어려움이 너무 많이 쌓여 극복하기 힘들다고 느꼈나요?' },
];

// 문항 4,5,7,8은 역채점 (낮을수록 스트레스 높음)
const REVERSE_ITEMS = new Set([3, 4, 6, 7]);

const STRESS_OPTIONS = [
  { text: '전혀 없었다', score: 0 },
  { text: '거의 없었다', score: 1 },
  { text: '가끔 있었다', score: 2 },
  { text: '꽤 자주 있었다', score: 3 },
  { text: '매우 자주 있었다', score: 4 },
];

let stressAnswers = [];
let stressStep = 0;

function initStress() {
  stressAnswers = [];
  stressStep = 0;
  document.getElementById('stress-quiz').style.display = '';
  document.getElementById('stress-result').style.display = 'none';
  renderStressQuestion();
}

function renderStressQuestion() {
  const total = STRESS_QUESTIONS.length;
  document.getElementById('stress-progress-bar').style.width = (stressStep / total * 100) + '%';
  document.getElementById('stress-step-label').textContent = `질문 ${stressStep + 1} / ${total}`;
  document.getElementById('stress-question').textContent = STRESS_QUESTIONS[stressStep].q;

  const optionsEl = document.getElementById('stress-options');
  optionsEl.innerHTML = '';
  STRESS_OPTIONS.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.onclick = () => {
      const score = REVERSE_ITEMS.has(stressStep) ? (4 - opt.score) : opt.score;
      stressAnswers.push(score);
      stressStep++;
      if (stressStep >= total) {
        showStressResult();
      } else {
        renderStressQuestion();
      }
    };
    optionsEl.appendChild(btn);
  });
}

function showStressResult() {
  document.getElementById('stress-progress-bar').style.width = '100%';
  document.getElementById('stress-quiz').style.display = 'none';

  const total = stressAnswers.reduce((a, b) => a + b, 0);
  const max = 40;
  const pct = total / max;

  // 게이지 애니메이션 (반원 = 251.2 둘레)
  const circumference = 251.2;
  setTimeout(() => {
    document.getElementById('gauge-fill').style.strokeDashoffset = circumference * (1 - pct);
  }, 100);

  document.getElementById('stress-score-display').textContent = total + '점';

  let level, desc, tips, color;

  if (total <= 13) {
    level = '낮은 스트레스';
    desc = '현재 스트레스가 잘 관리되고 있습니다. 지금의 생활 패턴을 유지하세요.';
    tips = ['현재 루틴을 꾸준히 유지하세요', '주기적인 운동으로 활력을 유지하세요', '소중한 사람들과 시간을 보내세요', '취미 활동으로 즐거움을 이어가세요'];
    color = '#4ade80';
  } else if (total <= 26) {
    level = '보통 스트레스';
    desc = '일상적인 수준의 스트레스입니다. 예방적 관리를 시작하면 좋습니다.';
    tips = ['하루 10분 명상이나 심호흡을 실천하세요', '규칙적인 수면 스케줄을 유지하세요', '업무와 휴식의 경계를 명확히 하세요', '주 3회 이상 가벼운 유산소 운동을 해보세요', '스트레스 원인을 파악하고 우선순위를 정해보세요'];
    color = '#facc15';
  } else {
    level = '높은 스트레스';
    desc = '스트레스가 높은 수준입니다. 적극적인 관리가 필요하며, 필요하다면 전문가의 도움을 받아보세요.';
    tips = ['즉시 스트레스 원인을 파악하고 줄일 수 있는 것부터 시작하세요', '깊은 복식 호흡을 하루 수차례 실천하세요', '신뢰하는 사람과 감정을 나눠보세요', '잠자리에 들기 1시간 전 스마트폰을 멀리 하세요', '필요하다면 심리 상담사나 정신건강 전문가와 상담하세요'];
    color = '#f87171';
  }

  document.getElementById('gauge-fill').style.stroke = color;
  document.getElementById('stress-level').textContent = level;
  document.getElementById('stress-level').style.color = color;
  document.getElementById('stress-desc').textContent = desc;
  document.getElementById('stress-tips').innerHTML = `
    <h3>💡 스트레스 관리 방법</h3>
    <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
  `;

  const result = document.getElementById('stress-result');
  result.style.display = '';
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetStress() {
  initStress();
  document.getElementById('stress-quiz').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
