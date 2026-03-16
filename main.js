/* ─── 네비게이션 ─── */
const TOOLS = {
  bmi:     'BMI 계산기',
  calorie: '칼로리 계산기',
  water:   '하루 물 섭취량',
  age:     '나이·생존 일수',
  burnout: '번아웃 자가진단',
  salary:  '연봉 상위 몇 %',
  money:   '돈 성격 테스트',
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
  Object.keys(TOOLS).forEach(t => document.getElementById('tool-' + t).style.display = 'none');
  document.getElementById('tool-' + id).style.display = '';
  document.getElementById('breadcrumb').style.display = 'flex';
  document.getElementById('breadcrumb-title').textContent = TOOLS[id];
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'burnout') initBurnout();
  if (id === 'money')   initMoney();
  if (id === 'age') {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('age-birth').setAttribute('max', today);
  }
}

/* ─── 1. BMI 계산기 ─── */
function calcBMI() {
  const h = parseFloat(document.getElementById('bmi-height').value);
  const w = parseFloat(document.getElementById('bmi-weight').value);
  if (!h || !w || h < 100 || w < 20) { alert('키와 몸무게를 올바르게 입력해주세요.'); return; }

  const bmi = w / ((h / 100) ** 2);
  const bmiRound = bmi.toFixed(1);
  let label, desc, color, pct;

  if (bmi < 18.5) {
    label = '저체중'; color = '#60a5fa'; pct = (bmi / 18.5) * 25;
    desc = '체중이 정상 범위보다 낮습니다. 균형 잡힌 식사와 규칙적인 운동으로 근육량을 늘려보세요.';
  } else if (bmi < 23) {
    label = '정상 체중'; color = '#4ade80'; pct = 25 + ((bmi - 18.5) / 4.5) * 25;
    desc = '건강한 체중 범위입니다. 현재 식습관과 활동량을 유지하세요.';
  } else if (bmi < 25) {
    label = '과체중'; color = '#facc15'; pct = 50 + ((bmi - 23) / 2) * 25;
    desc = '정상 범위를 살짝 벗어났습니다. 식단 조절과 유산소 운동이 도움이 됩니다.';
  } else {
    label = '비만'; color = '#f87171'; pct = Math.min(75 + ((bmi - 25) / 10) * 25, 98);
    desc = '체중이 건강에 영향을 줄 수 있습니다. 전문가와 상담해 체계적인 관리를 시작해보세요.';
  }

  document.getElementById('bmi-value').textContent = bmiRound;
  document.getElementById('bmi-value').style.color = color;
  document.getElementById('bmi-label').textContent = label;
  document.getElementById('bmi-desc').textContent = desc;
  document.getElementById('bmi-pointer').style.left = pct + '%';

  const r = document.getElementById('bmi-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 2. 칼로리 계산기 ─── */
function calcCalorie() {
  const gender = document.querySelector('input[name="cal-gender"]:checked').value;
  const age = parseFloat(document.getElementById('cal-age').value);
  const h   = parseFloat(document.getElementById('cal-height').value);
  const w   = parseFloat(document.getElementById('cal-weight').value);
  const act = parseFloat(document.getElementById('cal-activity').value);
  if (!age || !h || !w) { alert('모든 항목을 입력해주세요.'); return; }

  const bmr = gender === 'male'
    ? 10 * w + 6.25 * h - 5 * age + 5
    : 10 * w + 6.25 * h - 5 * age - 161;
  const tdee = Math.round(bmr * act);

  document.getElementById('calorie-bmr').textContent = Math.round(bmr).toLocaleString();
  document.getElementById('calorie-tdee').textContent = tdee.toLocaleString() + ' kcal';
  document.getElementById('calorie-lose').textContent = (tdee - 500).toLocaleString() + ' kcal';
  document.getElementById('calorie-maintain').textContent = tdee.toLocaleString() + ' kcal';
  document.getElementById('calorie-gain').textContent = (tdee + 300).toLocaleString() + ' kcal';

  const r = document.getElementById('calorie-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 3. 물 섭취량 계산기 ─── */
function calcWater() {
  const w   = parseFloat(document.getElementById('water-weight').value);
  const act = parseInt(document.getElementById('water-activity').value);
  const env = parseInt(document.getElementById('water-env').value);
  if (!w || w < 20) { alert('몸무게를 올바르게 입력해주세요.'); return; }

  const ml = Math.round(w * act + env);
  const L  = (ml / 1000).toFixed(1);
  const cups = Math.round(ml / 200); // 200ml 기준 컵 수

  document.getElementById('water-value').textContent = L + 'L (' + ml.toLocaleString() + 'ml)';
  document.getElementById('water-cups').textContent = '🥤'.repeat(Math.min(cups, 12)) + (cups > 12 ? ' …' : '');
  document.getElementById('water-desc').textContent =
    `하루 ${cups}잔(200ml 기준)을 목표로 하세요. 한꺼번에 많이 마시기보다 조금씩 자주 마시는 게 효과적입니다.`;

  const r = document.getElementById('water-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 4. 나이·생존 일수 계산기 ─── */
function calcAge() {
  const val = document.getElementById('age-birth').value;
  if (!val) { alert('생년월일을 입력해주세요.'); return; }

  const birth = new Date(val);
  const now   = new Date();
  if (birth > now) { alert('생년월일이 오늘보다 미래입니다.'); return; }

  const diffMs   = now - birth;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHrs  = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  // 만 나이 계산
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) { years--; months += 12; }
  if (now.getDate() < birth.getDate()) months--;
  if (months < 0) months += 12;

  document.getElementById('age-years').textContent = `만 ${years}세`;
  document.getElementById('age-label').textContent = `${birth.getFullYear()}년 ${birth.getMonth()+1}월 ${birth.getDate()}일 출생`;

  document.getElementById('age-stats').innerHTML = `
    <div class="age-stat-item">
      <div class="age-stat-value">${diffDays.toLocaleString()}</div>
      <div class="age-stat-label">살아온 일수</div>
    </div>
    <div class="age-stat-item">
      <div class="age-stat-value">${diffHrs.toLocaleString()}</div>
      <div class="age-stat-label">살아온 시간</div>
    </div>
    <div class="age-stat-item">
      <div class="age-stat-value">${diffMins.toLocaleString()}</div>
      <div class="age-stat-label">살아온 분</div>
    </div>
    <div class="age-stat-item">
      <div class="age-stat-value">${years * 12 + months}</div>
      <div class="age-stat-label">살아온 개월수</div>
    </div>
  `;

  const r = document.getElementById('age-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 5. 번아웃 자가진단 ─── */
const BURNOUT_QUESTIONS = [
  '일을 생각하면 에너지가 고갈되는 느낌이 든다',
  '아침에 일어났을 때 출근·등교가 힘들게 느껴진다',
  '하루 종일 집중력이 유지되지 않는다',
  '예전엔 즐거웠던 일이 이제 의미 없게 느껴진다',
  '사람들과 교류하는 것이 피곤하게 느껴진다',
  '작은 일에도 짜증이 나거나 감정 조절이 어렵다',
  '내가 하는 일이 아무 의미가 없다고 느낀다',
  '신체적으로 자주 피곤하거나 두통·복통이 생긴다',
  '휴식을 취해도 충분히 회복되지 않는 느낌이다',
  '지금 상황에서 벗어나고 싶다는 생각이 자주 든다',
];

const BURNOUT_OPTIONS = [
  { text: '전혀 그렇지 않다', score: 0 },
  { text: '가끔 그렇다', score: 1 },
  { text: '자주 그렇다', score: 2 },
  { text: '거의 항상 그렇다', score: 3 },
];

const BURNOUT_RESULTS = [
  {
    range: [0, 9],  icon: '😊', level: '안정 단계',
    desc: '현재 번아웃 위험이 낮습니다. 지금의 균형을 잘 유지하고 있어요.',
    tips: ['현재 루틴을 꾸준히 이어가세요', '정기적인 휴가·여가 시간을 미리 계획하세요', '소중한 사람들과 시간을 보내세요']
  },
  {
    range: [10, 18], icon: '😐', level: '주의 단계',
    desc: '번아웃 초기 신호가 감지됩니다. 지금부터 예방 관리가 필요합니다.',
    tips: ['업무 강도를 조절하고 작은 휴식을 자주 가지세요', '하루 30분 이상 자신만의 시간을 확보하세요', '수면 시간을 7~8시간으로 지키세요', '무거운 감정은 일기나 가까운 사람에게 털어놓으세요']
  },
  {
    range: [19, 24], icon: '😰', level: '위험 단계',
    desc: '번아웃이 진행 중입니다. 즉각적인 휴식과 관리가 필요합니다.',
    tips: ['가능하다면 며칠이라도 완전한 휴식을 취하세요', '업무·학업의 우선순위를 재조정하고 일부를 위임하세요', '명상, 가벼운 산책 등 스트레스 해소 루틴을 만드세요', '신뢰할 수 있는 사람에게 현재 상태를 솔직히 털어놓으세요', '지속된다면 심리 상담을 적극 고려하세요']
  },
  {
    range: [25, 30], icon: '🚨', level: '심각 단계',
    desc: '번아웃이 심각한 수준입니다. 반드시 전문가의 도움을 받아야 합니다.',
    tips: ['즉시 업무·학업 강도를 낮추고 회복에 집중하세요', '혼자 해결하려 하지 마세요 — 도움을 요청하는 것이 힘입니다', '정신건강 위기상담 전화: ☎ 1577-0199 (24시간)', '가까운 정신건강복지센터나 심리 상담사를 찾아보세요', '번아웃에서의 회복은 시간이 걸립니다 — 자신을 책망하지 마세요']
  },
];

let burnoutStep = 0;
let burnoutScore = 0;

function initBurnout() {
  burnoutStep = 0; burnoutScore = 0;
  document.getElementById('burnout-quiz').style.display = '';
  document.getElementById('burnout-result').style.display = 'none';
  renderBurnoutQuestion();
}

function renderBurnoutQuestion() {
  const total = BURNOUT_QUESTIONS.length;
  document.getElementById('burnout-progress-bar').style.width = (burnoutStep / total * 100) + '%';
  document.getElementById('burnout-step-label').textContent = `질문 ${burnoutStep + 1} / ${total}`;
  document.getElementById('burnout-question').textContent = BURNOUT_QUESTIONS[burnoutStep];

  const el = document.getElementById('burnout-options');
  el.innerHTML = '';
  BURNOUT_OPTIONS.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.onclick = () => {
      burnoutScore += opt.score;
      burnoutStep++;
      burnoutStep >= total ? showBurnoutResult() : renderBurnoutQuestion();
    };
    el.appendChild(btn);
  });
}

function showBurnoutResult() {
  document.getElementById('burnout-progress-bar').style.width = '100%';
  document.getElementById('burnout-quiz').style.display = 'none';

  const res = BURNOUT_RESULTS.find(r => burnoutScore >= r.range[0] && burnoutScore <= r.range[1]);
  document.getElementById('burnout-icon').textContent = res.icon;
  document.getElementById('burnout-level').textContent = res.level;
  document.getElementById('burnout-desc').textContent = res.desc;
  document.getElementById('burnout-tips').innerHTML =
    `<h3>💡 지금 할 수 있는 것</h3><ul>${res.tips.map(t => `<li>${t}</li>`).join('')}</ul>`;

  const r = document.getElementById('burnout-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetBurnout() { initBurnout(); }

/* ─── 6. 연봉 상위 % ─── */
// 국세청 2023년 근로소득 통계 기반 누적 분포 (만 원 → 상위 %)
// [연봉 상한(만원), 해당 구간 비율 누적] 형태로 하위 누적 비율 계산
const SALARY_DIST = [
  // [연봉 이하(만원), 해당 이하 근로자 비율(%)]
  [500,   4.5],
  [1000,  14.0],
  [1500,  26.0],
  [2000,  38.5],
  [2500,  49.5],
  [3000,  59.0],
  [3500,  67.0],
  [4000,  73.5],
  [4500,  78.5],
  [5000,  82.5],
  [6000,  87.5],
  [7000,  90.8],
  [8000,  93.0],
  [9000,  94.8],
  [10000, 96.0],
  [12000, 97.2],
  [15000, 98.2],
  [20000, 99.0],
  [30000, 99.6],
  [99999, 100.0],
];

function calcSalary() {
  const val = parseFloat(document.getElementById('salary-input').value);
  if (!val || val <= 0) { alert('연봉을 입력해주세요.'); return; }

  // 선형 보간으로 하위 % 계산
  let belowPct = 0;
  for (let i = 0; i < SALARY_DIST.length; i++) {
    const [limit, cumPct] = SALARY_DIST[i];
    const prevLimit = i === 0 ? 0 : SALARY_DIST[i-1][0];
    const prevCumPct = i === 0 ? 0 : SALARY_DIST[i-1][1];
    if (val <= limit) {
      belowPct = prevCumPct + (val - prevLimit) / (limit - prevLimit) * (cumPct - prevCumPct);
      break;
    }
    if (i === SALARY_DIST.length - 1) belowPct = 99.9;
  }

  const topPct = Math.max(0.1, 100 - belowPct);
  const topStr = topPct < 1 ? topPct.toFixed(1) : Math.round(topPct);

  document.getElementById('salary-top').textContent = `상위 ${topStr}%`;
  document.getElementById('salary-label').textContent = `연봉 ${val.toLocaleString()}만 원`;
  document.getElementById('salary-marker').style.left = (100 - topPct) + '%';

  let desc;
  if (topPct <= 5) desc = '상위 5% 이내로, 전국 근로소득자 중 최상위 구간입니다.';
  else if (topPct <= 20) desc = '상위 20% 이내로, 평균 이상의 소득 수준입니다.';
  else if (topPct <= 50) desc = '전체 근로소득자 중 중상위 구간입니다.';
  else desc = '전체 근로소득자의 중하위~중위 구간입니다. 꾸준한 역량 개발로 소득을 높여보세요.';

  document.getElementById('salary-desc').textContent = desc;

  const r = document.getElementById('salary-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ─── 7. 돈 성격 테스트 ─── */
const MONEY_QUESTIONS = [
  {
    q: '예상치 못한 보너스 100만 원이 생겼다. 나는?',
    options: [
      { text: '즉시 원하던 것을 구매한다', type: 'spender' },
      { text: '전액 저축하거나 투자한다', type: 'saver' },
      { text: '절반은 쓰고 절반은 저축한다', type: 'balancer' },
      { text: '수익률 높은 상품을 찾아본다', type: 'investor' },
      { text: '가족·친구에게 선물하거나 나눈다', type: 'giver' },
    ]
  },
  {
    q: '돈에 대한 나의 평소 생각은?',
    options: [
      { text: '지금 행복하면 됐지, 미래는 나중에', type: 'spender' },
      { text: '한 푼이라도 아끼는 게 미덕', type: 'saver' },
      { text: '적당히 쓰고 적당히 모으는 균형이 최고', type: 'balancer' },
      { text: '돈이 돈을 벌게 해야 한다', type: 'investor' },
      { text: '돈은 사람과의 관계에 써야 의미 있다', type: 'giver' },
    ]
  },
  {
    q: '친구가 생일인데 선물 예산은?',
    options: [
      { text: '기분에 따라 확 쓴다', type: 'spender' },
      { text: '최대한 저렴하면서 실용적인 것', type: 'saver' },
      { text: '미리 정한 예산 안에서 최선', type: 'balancer' },
      { text: '나중에 투자가 될 만한 선물 (책, 강의 등)', type: 'investor' },
      { text: '내가 직접 만들거나 시간을 쓴다', type: 'giver' },
    ]
  },
  {
    q: '월급날 제일 먼저 하는 일은?',
    options: [
      { text: '기다렸던 소비 목록 체크', type: 'spender' },
      { text: '고정 저축부터 자동이체', type: 'saver' },
      { text: '지출 계획을 세워 항목별로 배분', type: 'balancer' },
      { text: '투자 계좌에 추가 납입', type: 'investor' },
      { text: '가족·지인과 식사 자리 잡기', type: 'giver' },
    ]
  },
  {
    q: '5년 후 내 통장에 바라는 모습은?',
    options: [
      { text: '풍요롭게 쓰며 살았던 추억이 남아 있다', type: 'spender' },
      { text: '안정된 비상금과 예비 자금이 충분하다', type: 'saver' },
      { text: '쓸 것 쓰고, 모을 것 모은 균형 잡힌 상태', type: 'balancer' },
      { text: '자산이 복리로 불어 있다', type: 'investor' },
      { text: '소중한 사람들을 충분히 챙겼다는 뿌듯함', type: 'giver' },
    ]
  },
];

const MONEY_RESULTS = {
  spender: {
    icon: '🛍️', type: '자유 소비형', subtitle: '"지금 이 순간이 최고야"',
    desc: '현재의 즐거움과 경험을 중시합니다. 소비를 통해 삶의 질을 높이는 스타일이에요. 단, 미래 대비가 부족해질 수 있으니 주의가 필요합니다.',
    tips: ['자동이체로 소비 전 저축을 먼저 확보하세요', '충동구매를 줄이는 "24시간 대기" 규칙을 써보세요', '월 고정 지출 항목을 한번 점검해보세요', '소비 일기를 쓰면 패턴이 보입니다']
  },
  saver: {
    icon: '🏦', type: '안전 저축형', subtitle: '"모으는 것이 곧 행복"',
    desc: '안정감과 미래 대비를 최우선으로 합니다. 절약 의지가 강하고 재정적 위기에 강한 유형이에요. 지나친 절약이 현재의 삶의 질을 낮출 수 있어요.',
    tips: ['고정 지출과 비상금이 확보되면 즐거움에도 예산을 배분해보세요', '인플레이션을 이기는 투자 상품도 조금씩 알아보세요', '지금 자신에게 투자하는 것도 저축의 한 형태입니다', '저축 목표를 구체적으로 세우면 동기 부여가 됩니다']
  },
  balancer: {
    icon: '⚖️', type: '균형 관리형', subtitle: '"오늘도, 내일도 중요해"',
    desc: '소비와 저축의 균형을 자연스럽게 유지합니다. 합리적이고 계획적인 재정 관리 능력이 있어요. 이 균형을 장기간 유지하는 것이 핵심입니다.',
    tips: ['현재 자산 배분 비율을 점검해보세요 (저축:투자:소비)', '균형을 유지하면서 투자 비중을 조금씩 늘려보세요', '가계부 앱으로 균형이 흔들리는 달을 파악해보세요', '비상금은 생활비 3~6개월치를 유지하세요']
  },
  investor: {
    icon: '📈', type: '자산 증식형', subtitle: '"돈이 일해야 한다"',
    desc: '돈을 불리는 것에 집중하는 전략적 사고를 가졌습니다. 장기적 관점으로 자산을 쌓아가는 유형이에요. 단, 지나친 위험 추구나 현재 소비 무시에 주의하세요.',
    tips: ['리스크 분산을 위해 자산 유형을 다양화하세요', '투자 공부를 게을리하지 마세요 — 정보가 무기입니다', '긴급 자금 없이 투자만 하는 건 위험합니다', '투자와 함께 현재의 삶도 충분히 즐기세요']
  },
  giver: {
    icon: '🎁', type: '관계 중심형', subtitle: '"나눌 때 가장 행복해"',
    desc: '돈을 사람과의 관계, 나눔에서 의미를 찾습니다. 관대하고 따뜻한 재정 철학을 가졌어요. 자신을 위한 재정 기반도 함께 챙기는 것이 중요합니다.',
    tips: ['나눔·선물 예산을 월 고정으로 배정해보세요', '자신의 노후와 비상금도 빠짐없이 챙기세요', '"내 컵이 가득 차야 남에게도 줄 수 있다"는 원칙을 기억하세요', '가족·지인을 위한 지출 한도를 미리 정해두면 좋습니다']
  },
};

let moneyStep = 0;
let moneyScores = {};

function initMoney() {
  moneyStep = 0;
  moneyScores = { spender: 0, saver: 0, balancer: 0, investor: 0, giver: 0 };
  document.getElementById('money-quiz').style.display = '';
  document.getElementById('money-result').style.display = 'none';
  renderMoneyQuestion();
}

function renderMoneyQuestion() {
  const total = MONEY_QUESTIONS.length;
  document.getElementById('money-progress-bar').style.width = (moneyStep / total * 100) + '%';
  document.getElementById('money-step-label').textContent = `질문 ${moneyStep + 1} / ${total}`;
  document.getElementById('money-question').textContent = MONEY_QUESTIONS[moneyStep].q;

  const el = document.getElementById('money-options');
  el.innerHTML = '';
  MONEY_QUESTIONS[moneyStep].options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.onclick = () => {
      moneyScores[opt.type]++;
      moneyStep++;
      moneyStep >= total ? showMoneyResult() : renderMoneyQuestion();
    };
    el.appendChild(btn);
  });
}

function showMoneyResult() {
  document.getElementById('money-progress-bar').style.width = '100%';
  document.getElementById('money-quiz').style.display = 'none';

  const topType = Object.entries(moneyScores).sort((a, b) => b[1] - a[1])[0][0];
  const res = MONEY_RESULTS[topType];

  document.getElementById('money-icon').textContent = res.icon;
  document.getElementById('money-type').textContent = res.type;
  document.getElementById('money-subtitle').textContent = res.subtitle;
  document.getElementById('money-desc').textContent = res.desc;
  document.getElementById('money-tips').innerHTML =
    `<h3>💡 나에게 맞는 재정 조언</h3><ul>${res.tips.map(t => `<li>${t}</li>`).join('')}</ul>`;

  const r = document.getElementById('money-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetMoney() { initMoney(); }
