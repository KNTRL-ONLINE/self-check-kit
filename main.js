/* ═══════════════════════════════════════════════════
   SELFCHK — main.js
   Features: dark mode, image export, i18n, usage counter,
             result history, share (link + Kakao)
   ═══════════════════════════════════════════════════ */

/* ─── i18n 번역 데이터 ─── */
const TRANSLATIONS = {
  ko: {
    // 네비게이션
    'nav.home': '홈',
    'nav.history': '💾 기록',
    // 홈
    'home.headline': '나를 숫자로 확인하세요',
    'home.subheadline': '무료 자가진단 도구 7가지 — 건강부터 돈 성격까지',
    // 공통
    'common.calculate': '계산하기',
    'common.male': '남성',
    'common.female': '여성',
    // 태그
    'tag.health': '건강',
    'tag.nutrition': '영양',
    'tag.fun': '재미',
    'tag.mental': '멘탈',
    'tag.finance': '재무',
    // 도구 이름
    'tool.bmi.name': 'BMI 계산기',
    'tool.bmi.desc': '키·몸무게로 체질량지수와 비만도를 확인하세요.',
    'tool.bmi.header_desc': '체질량지수(BMI)로 내 체중이 정상 범위인지 확인하세요.',
    'tool.calorie.name': '칼로리 계산기',
    'tool.calorie.desc': '나이·성별·활동량으로 하루 권장 칼로리를 계산하세요.',
    'tool.calorie.header_desc': 'Mifflin-St Jeor 공식으로 하루 권장 칼로리를 계산합니다.',
    'tool.water.name': '하루 물 섭취량',
    'tool.water.desc': '몸무게 기반으로 하루 권장 수분량을 계산하세요.',
    'tool.water.header_name': '하루 물 섭취량 계산기',
    'tool.water.header_desc': '몸무게와 활동 수준에 맞는 하루 권장 수분량을 알려드립니다.',
    'tool.age.name': '나이·생존 일수',
    'tool.age.desc': '생일을 입력하면 살아온 일수·시간·분을 계산합니다.',
    'tool.age.header_name': '나이·생존 일수 계산기',
    'tool.age.header_desc': '태어난 날부터 지금까지 얼마나 살았는지 숫자로 확인해보세요.',
    'tool.burnout.name': '번아웃 자가진단',
    'tool.burnout.desc': '10문항으로 지금 나의 번아웃 단계를 확인하세요.',
    'tool.burnout.header_desc': '최근 2주를 기준으로 솔직하게 답해주세요.',
    'tool.salary.name': '연봉 상위 몇 %',
    'tool.salary.desc': '내 연봉이 한국에서 상위 몇 %인지 확인하세요.',
    'tool.salary.header_desc': '내 연봉이 한국 근로소득자 중 상위 몇 %인지 확인하세요.',
    'tool.salary.header_note': '국세청 근로소득 통계(2023년 기준) 데이터를 사용합니다.',
    'tool.money.name': '돈 성격 테스트',
    'tool.money.desc': '5문항으로 나만의 돈 성격 유형을 알아보세요.',
    'tool.money.header_name': '나의 돈 성격 테스트',
    'tool.money.header_desc': '5문항으로 나만의 돈을 대하는 성격 유형을 알아보세요.',
    // BMI 폼
    'bmi.height_label': '키 (cm)',
    'bmi.height_placeholder': '예: 170',
    'bmi.weight_label': '몸무게 (kg)',
    'bmi.weight_placeholder': '예: 65',
    'bmi.underweight': '저체중',
    'bmi.normal': '정상',
    'bmi.overweight': '과체중',
    'bmi.obese': '비만',
    // BMI 결과
    'bmi.result.underweight': '저체중',
    'bmi.result.normal': '정상 체중',
    'bmi.result.overweight': '과체중',
    'bmi.result.obese': '비만',
    'bmi.desc.underweight': '체중이 정상 범위보다 낮습니다. 균형 잡힌 식사와 규칙적인 운동으로 근육량을 늘려보세요.',
    'bmi.desc.normal': '건강한 체중 범위입니다. 현재 식습관과 활동량을 유지하세요.',
    'bmi.desc.overweight': '정상 범위를 살짝 벗어났습니다. 식단 조절과 유산소 운동이 도움이 됩니다.',
    'bmi.desc.obese': '체중이 건강에 영향을 줄 수 있습니다. 전문가와 상담해 체계적인 관리를 시작해보세요.',
    // 칼로리 폼
    'calorie.gender_label': '성별',
    'calorie.age_label': '나이',
    'calorie.age_placeholder': '예: 28',
    'calorie.activity_label': '활동 수준',
    'calorie.activity_sedentary': '거의 안 움직임 (좌식 생활)',
    'calorie.activity_light': '가벼운 활동 (주 1–3회 운동)',
    'calorie.activity_moderate': '보통 활동 (주 3–5회 운동)',
    'calorie.activity_active': '활발한 활동 (주 6–7회 운동)',
    'calorie.activity_very_active': '매우 활발 (운동선수급)',
    'calorie.tdee_label': '하루 유지 칼로리 (TDEE)',
    'calorie.lose': '체중 감량',
    'calorie.maintain': '유지',
    'calorie.gain': '체중 증가',
    'calorie.bmr_note': '기초대사량(BMR):',
    // 물 폼
    'water.activity_sedentary': '좌식 / 운동 거의 안 함',
    'water.activity_moderate': '보통 활동',
    'water.activity_active': '활발한 운동 (주 5회 이상)',
    'water.env_label': '날씨·환경',
    'water.env_normal': '보통 (실내)',
    'water.env_hot': '더운 날씨 / 야외 활동',
    'water.env_very_hot': '매우 더운 날씨 / 강도 높은 운동',
    'water.result_label': '하루 권장 물 섭취량',
    'water.tips_title': '💡 수분 섭취 꿀팁',
    'water.tip1': '아침 기상 직후 물 한 잔(200ml)으로 하루를 시작하세요',
    'water.tip2': '식사 30분 전 물 한 잔이 소화를 돕습니다',
    'water.tip3': '커피·탄산음료는 수분으로 계산하지 마세요',
    'water.tip4': '소변 색이 연한 노란색이면 적절한 수분 상태입니다',
    // 나이
    'age.birth_label': '생년월일',
    'age.stat_days': '살아온 일수',
    'age.stat_hours': '살아온 시간',
    'age.stat_minutes': '살아온 분',
    'age.stat_months': '살아온 개월수',
    'age.age_label_format': '만 {0}세',
    'age.birth_format': '{0}년 {1}월 {2}일 출생',
    // 번아웃
    'burnout.reset': '다시 진단하기',
    'burnout.step_label': '질문 {0} / {1}',
    'burnout.tips_title': '💡 지금 할 수 있는 것',
    // 번아웃 문항
    'burnout.q1': '일을 생각하면 에너지가 고갈되는 느낌이 든다',
    'burnout.q2': '아침에 일어났을 때 출근·등교가 힘들게 느껴진다',
    'burnout.q3': '하루 종일 집중력이 유지되지 않는다',
    'burnout.q4': '예전엔 즐거웠던 일이 이제 의미 없게 느껴진다',
    'burnout.q5': '사람들과 교류하는 것이 피곤하게 느껴진다',
    'burnout.q6': '작은 일에도 짜증이 나거나 감정 조절이 어렵다',
    'burnout.q7': '내가 하는 일이 아무 의미가 없다고 느낀다',
    'burnout.q8': '신체적으로 자주 피곤하거나 두통·복통이 생긴다',
    'burnout.q9': '휴식을 취해도 충분히 회복되지 않는 느낌이다',
    'burnout.q10': '지금 상황에서 벗어나고 싶다는 생각이 자주 든다',
    // 번아웃 옵션
    'burnout.opt0': '전혀 그렇지 않다',
    'burnout.opt1': '가끔 그렇다',
    'burnout.opt2': '자주 그렇다',
    'burnout.opt3': '거의 항상 그렇다',
    // 번아웃 결과
    'burnout.level0': '안정 단계',
    'burnout.level1': '주의 단계',
    'burnout.level2': '위험 단계',
    'burnout.level3': '심각 단계',
    'burnout.desc0': '현재 번아웃 위험이 낮습니다. 지금의 균형을 잘 유지하고 있어요.',
    'burnout.desc1': '번아웃 초기 신호가 감지됩니다. 지금부터 예방 관리가 필요합니다.',
    'burnout.desc2': '번아웃이 진행 중입니다. 즉각적인 휴식과 관리가 필요합니다.',
    'burnout.desc3': '번아웃이 심각한 수준입니다. 반드시 전문가의 도움을 받아야 합니다.',
    'burnout.tip0_1': '현재 루틴을 꾸준히 이어가세요',
    'burnout.tip0_2': '정기적인 휴가·여가 시간을 미리 계획하세요',
    'burnout.tip0_3': '소중한 사람들과 시간을 보내세요',
    'burnout.tip1_1': '업무 강도를 조절하고 작은 휴식을 자주 가지세요',
    'burnout.tip1_2': '하루 30분 이상 자신만의 시간을 확보하세요',
    'burnout.tip1_3': '수면 시간을 7~8시간으로 지키세요',
    'burnout.tip1_4': '무거운 감정은 일기나 가까운 사람에게 털어놓으세요',
    'burnout.tip2_1': '가능하다면 며칠이라도 완전한 휴식을 취하세요',
    'burnout.tip2_2': '업무·학업의 우선순위를 재조정하고 일부를 위임하세요',
    'burnout.tip2_3': '명상, 가벼운 산책 등 스트레스 해소 루틴을 만드세요',
    'burnout.tip2_4': '신뢰할 수 있는 사람에게 현재 상태를 솔직히 털어놓으세요',
    'burnout.tip2_5': '지속된다면 심리 상담을 적극 고려하세요',
    'burnout.tip3_1': '즉시 업무·학업 강도를 낮추고 회복에 집중하세요',
    'burnout.tip3_2': '혼자 해결하려 하지 마세요 — 도움을 요청하는 것이 힘입니다',
    'burnout.tip3_3': '정신건강 위기상담 전화: ☎ 1577-0199 (24시간)',
    'burnout.tip3_4': '가까운 정신건강복지센터나 심리 상담사를 찾아보세요',
    'burnout.tip3_5': '번아웃에서의 회복은 시간이 걸립니다 — 자신을 책망하지 마세요',
    // 연봉
    'salary.input_label': '연봉 (세전, 만 원)',
    'salary.input_placeholder': '예: 4000',
    'salary.top_format': '상위 {0}%',
    'salary.label_format': '연봉 {0}만 원',
    'salary.bar_low': '하위',
    'salary.bar_mid': '중위',
    'salary.bar_high': '상위',
    'salary.note': '전국 근로소득자 약 2,000만 명 기준 / 참고용 수치입니다.',
    'salary.desc_top5': '상위 5% 이내로, 전국 근로소득자 중 최상위 구간입니다.',
    'salary.desc_top20': '상위 20% 이내로, 평균 이상의 소득 수준입니다.',
    'salary.desc_top50': '전체 근로소득자 중 중상위 구간입니다.',
    'salary.desc_other': '전체 근로소득자의 중하위~중위 구간입니다. 꾸준한 역량 개발로 소득을 높여보세요.',
    // 돈 성격 테스트
    'money.reset': '다시 테스트하기',
    'money.step_label': '질문 {0} / {1}',
    'money.tips_title': '💡 나에게 맞는 재정 조언',
    // 돈 성격 문항
    'money.q1': '예상치 못한 보너스 100만 원이 생겼다. 나는?',
    'money.q1.opt1': '즉시 원하던 것을 구매한다',
    'money.q1.opt2': '전액 저축하거나 투자한다',
    'money.q1.opt3': '절반은 쓰고 절반은 저축한다',
    'money.q1.opt4': '수익률 높은 상품을 찾아본다',
    'money.q1.opt5': '가족·친구에게 선물하거나 나눈다',
    'money.q2': '돈에 대한 나의 평소 생각은?',
    'money.q2.opt1': '지금 행복하면 됐지, 미래는 나중에',
    'money.q2.opt2': '한 푼이라도 아끼는 게 미덕',
    'money.q2.opt3': '적당히 쓰고 적당히 모으는 균형이 최고',
    'money.q2.opt4': '돈이 돈을 벌게 해야 한다',
    'money.q2.opt5': '돈은 사람과의 관계에 써야 의미 있다',
    'money.q3': '친구가 생일인데 선물 예산은?',
    'money.q3.opt1': '기분에 따라 확 쓴다',
    'money.q3.opt2': '최대한 저렴하면서 실용적인 것',
    'money.q3.opt3': '미리 정한 예산 안에서 최선',
    'money.q3.opt4': '나중에 투자가 될 만한 선물 (책, 강의 등)',
    'money.q3.opt5': '내가 직접 만들거나 시간을 쓴다',
    'money.q4': '월급날 제일 먼저 하는 일은?',
    'money.q4.opt1': '기다렸던 소비 목록 체크',
    'money.q4.opt2': '고정 저축부터 자동이체',
    'money.q4.opt3': '지출 계획을 세워 항목별로 배분',
    'money.q4.opt4': '투자 계좌에 추가 납입',
    'money.q4.opt5': '가족·지인과 식사 자리 잡기',
    'money.q5': '5년 후 내 통장에 바라는 모습은?',
    'money.q5.opt1': '풍요롭게 쓰며 살았던 추억이 남아 있다',
    'money.q5.opt2': '안정된 비상금과 예비 자금이 충분하다',
    'money.q5.opt3': '쓸 것 쓰고, 모을 것 모은 균형 잡힌 상태',
    'money.q5.opt4': '자산이 복리로 불어 있다',
    'money.q5.opt5': '소중한 사람들을 충분히 챙겼다는 뿌듯함',
    // 돈 성격 결과
    'money.type.spender': '자유 소비형',
    'money.subtitle.spender': '"지금 이 순간이 최고야"',
    'money.desc.spender': '현재의 즐거움과 경험을 중시합니다. 소비를 통해 삶의 질을 높이는 스타일이에요. 단, 미래 대비가 부족해질 수 있으니 주의가 필요합니다.',
    'money.tip.spender1': '자동이체로 소비 전 저축을 먼저 확보하세요',
    'money.tip.spender2': '충동구매를 줄이는 "24시간 대기" 규칙을 써보세요',
    'money.tip.spender3': '월 고정 지출 항목을 한번 점검해보세요',
    'money.tip.spender4': '소비 일기를 쓰면 패턴이 보입니다',
    'money.type.saver': '안전 저축형',
    'money.subtitle.saver': '"모으는 것이 곧 행복"',
    'money.desc.saver': '안정감과 미래 대비를 최우선으로 합니다. 절약 의지가 강하고 재정적 위기에 강한 유형이에요. 지나친 절약이 현재의 삶의 질을 낮출 수 있어요.',
    'money.tip.saver1': '고정 지출과 비상금이 확보되면 즐거움에도 예산을 배분해보세요',
    'money.tip.saver2': '인플레이션을 이기는 투자 상품도 조금씩 알아보세요',
    'money.tip.saver3': '지금 자신에게 투자하는 것도 저축의 한 형태입니다',
    'money.tip.saver4': '저축 목표를 구체적으로 세우면 동기 부여가 됩니다',
    'money.type.balancer': '균형 관리형',
    'money.subtitle.balancer': '"오늘도, 내일도 중요해"',
    'money.desc.balancer': '소비와 저축의 균형을 자연스럽게 유지합니다. 합리적이고 계획적인 재정 관리 능력이 있어요. 이 균형을 장기간 유지하는 것이 핵심입니다.',
    'money.tip.balancer1': '현재 자산 배분 비율을 점검해보세요 (저축:투자:소비)',
    'money.tip.balancer2': '균형을 유지하면서 투자 비중을 조금씩 늘려보세요',
    'money.tip.balancer3': '가계부 앱으로 균형이 흔들리는 달을 파악해보세요',
    'money.tip.balancer4': '비상금은 생활비 3~6개월치를 유지하세요',
    'money.type.investor': '자산 증식형',
    'money.subtitle.investor': '"돈이 일해야 한다"',
    'money.desc.investor': '돈을 불리는 것에 집중하는 전략적 사고를 가졌습니다. 장기적 관점으로 자산을 쌓아가는 유형이에요. 단, 지나친 위험 추구나 현재 소비 무시에 주의하세요.',
    'money.tip.investor1': '리스크 분산을 위해 자산 유형을 다양화하세요',
    'money.tip.investor2': '투자 공부를 게을리하지 마세요 — 정보가 무기입니다',
    'money.tip.investor3': '긴급 자금 없이 투자만 하는 건 위험합니다',
    'money.tip.investor4': '투자와 함께 현재의 삶도 충분히 즐기세요',
    'money.type.giver': '관계 중심형',
    'money.subtitle.giver': '"나눌 때 가장 행복해"',
    'money.desc.giver': '돈을 사람과의 관계, 나눔에서 의미를 찾습니다. 관대하고 따뜻한 재정 철학을 가졌어요. 자신을 위한 재정 기반도 함께 챙기는 것이 중요합니다.',
    'money.tip.giver1': '나눔·선물 예산을 월 고정으로 배정해보세요',
    'money.tip.giver2': '자신의 노후와 비상금도 빠짐없이 챙기세요',
    'money.tip.giver3': '"내 컵이 가득 차야 남에게도 줄 수 있다"는 원칙을 기억하세요',
    'money.tip.giver4': '가족·지인을 위한 지출 한도를 미리 정해두면 좋습니다',
    // 결과 액션 버튼
    'action.save_history': '💾 내 기록 저장',
    'action.save_image': '📷 이미지로 저장',
    'action.copy_link': '🔗 링크 복사',
    'action.kakao': '📤 URL 공유',
    // 히스토리
    'history.title': '내 기록',
    'history.subtitle': '저장된 결과를 날짜별로 확인하세요.',
    'history.clear_all': '전체 삭제',
    'history.select': '선택',
    'history.cancel_select': '취소',
    'history.delete_selected': '선택 삭제',
    'history.selected_count': '{0}개 선택됨',
    'history.empty': '아직 저장된 기록이 없어요.\n각 도구에서 결과를 저장해보세요!',
    // 공유
    'share.shared_result': '공유된 결과',
    'share.try_myself': '나도 해보기',
    // 토스트
    'toast.link_copied': '링크가 복사됐어요!',
    'toast.history_saved': '기록에 저장됐어요!',
    'toast.history_cleared': '전체 기록이 삭제됐어요.',
    // 사용자 수
    'usage.count': '{0}명이 사용했어요',
    // 알림
    'alert.bmi_invalid': '키와 몸무게를 올바르게 입력해주세요.',
    'alert.calorie_invalid': '모든 항목을 입력해주세요.',
    'alert.water_invalid': '몸무게를 올바르게 입력해주세요.',
    'alert.age_invalid': '생년월일을 입력해주세요.',
    'alert.age_future': '생년월일이 오늘보다 미래입니다.',
    'alert.salary_invalid': '연봉을 입력해주세요.',
    'result.disclaimer': '본 결과는 참고용이며 전문가 상담을 대체하지 않습니다.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.history': '💾 History',
    // Home
    'home.headline': 'Know Yourself with Numbers',
    'home.subheadline': '7 free self-check tools — from health to money personality',
    // Common
    'common.calculate': 'Calculate',
    'common.male': 'Male',
    'common.female': 'Female',
    // Tags
    'tag.health': 'Health',
    'tag.nutrition': 'Nutrition',
    'tag.fun': 'Fun',
    'tag.mental': 'Mental',
    'tag.finance': 'Finance',
    // Tool names
    'tool.bmi.name': 'BMI Calculator',
    'tool.bmi.desc': 'Check your body mass index and weight category.',
    'tool.bmi.header_desc': 'See if your weight is in a healthy range using BMI.',
    'tool.calorie.name': 'Calorie Calculator',
    'tool.calorie.desc': 'Calculate your daily recommended calories by age, gender & activity.',
    'tool.calorie.header_desc': 'Calculate daily calories using the Mifflin-St Jeor formula.',
    'tool.water.name': 'Daily Water Intake',
    'tool.water.desc': 'Find out how much water you should drink daily based on your weight.',
    'tool.water.header_name': 'Daily Water Intake Calculator',
    'tool.water.header_desc': 'Get your recommended daily water intake based on weight and activity level.',
    'tool.age.name': 'Age & Days Alive',
    'tool.age.desc': 'Enter your birthday to see how many days, hours and minutes you\'ve lived.',
    'tool.age.header_name': 'Age & Days Alive Calculator',
    'tool.age.header_desc': 'Find out exactly how long you\'ve been alive in numbers.',
    'tool.burnout.name': 'Burnout Self-Test',
    'tool.burnout.desc': 'Check your burnout level with 10 questions.',
    'tool.burnout.header_desc': 'Answer honestly based on the past 2 weeks.',
    'tool.salary.name': 'Salary Percentile',
    'tool.salary.desc': 'Find out what top % you are among Korean workers.',
    'tool.salary.header_desc': 'See what top percentile your salary ranks among Korean workers.',
    'tool.salary.header_note': 'Based on NTS income statistics (2023).',
    'tool.money.name': 'Money Personality',
    'tool.money.desc': 'Discover your money personality type with 5 questions.',
    'tool.money.header_name': 'My Money Personality Test',
    'tool.money.header_desc': 'Discover how you relate to money with 5 questions.',
    // BMI form
    'bmi.height_label': 'Height (cm)',
    'bmi.height_placeholder': 'e.g. 170',
    'bmi.weight_label': 'Weight (kg)',
    'bmi.weight_placeholder': 'e.g. 65',
    'bmi.underweight': 'Underweight',
    'bmi.normal': 'Normal',
    'bmi.overweight': 'Overweight',
    'bmi.obese': 'Obese',
    // BMI results
    'bmi.result.underweight': 'Underweight',
    'bmi.result.normal': 'Normal Weight',
    'bmi.result.overweight': 'Overweight',
    'bmi.result.obese': 'Obese',
    'bmi.desc.underweight': 'Your weight is below the normal range. Try to increase muscle mass through balanced diet and regular exercise.',
    'bmi.desc.normal': 'You are in a healthy weight range. Keep up your current habits!',
    'bmi.desc.overweight': 'Slightly above the normal range. Diet adjustment and cardio exercise can help.',
    'bmi.desc.obese': 'Your weight may be affecting your health. Consider consulting a professional for a structured plan.',
    // Calorie form
    'calorie.gender_label': 'Gender',
    'calorie.age_label': 'Age',
    'calorie.age_placeholder': 'e.g. 28',
    'calorie.activity_label': 'Activity Level',
    'calorie.activity_sedentary': 'Sedentary (little/no exercise)',
    'calorie.activity_light': 'Light (1–3 days/week)',
    'calorie.activity_moderate': 'Moderate (3–5 days/week)',
    'calorie.activity_active': 'Active (6–7 days/week)',
    'calorie.activity_very_active': 'Very Active (athlete level)',
    'calorie.tdee_label': 'Daily Maintenance Calories (TDEE)',
    'calorie.lose': 'Weight Loss',
    'calorie.maintain': 'Maintain',
    'calorie.gain': 'Weight Gain',
    'calorie.bmr_note': 'Basal Metabolic Rate (BMR):',
    // Water form
    'water.activity_sedentary': 'Sedentary / Little exercise',
    'water.activity_moderate': 'Moderate activity',
    'water.activity_active': 'Active (5+ days/week)',
    'water.env_label': 'Weather / Environment',
    'water.env_normal': 'Normal (indoors)',
    'water.env_hot': 'Hot weather / outdoor activity',
    'water.env_very_hot': 'Very hot / intense exercise',
    'water.result_label': 'Daily Recommended Water Intake',
    'water.tips_title': '💡 Hydration Tips',
    'water.tip1': 'Start your day with a glass of water (200ml) right after waking up',
    'water.tip2': 'Drink a glass 30 minutes before meals to aid digestion',
    'water.tip3': 'Coffee and soda don\'t count toward your water intake',
    'water.tip4': 'Pale yellow urine means you\'re well hydrated',
    // Age
    'age.birth_label': 'Date of Birth',
    'age.stat_days': 'Days Alive',
    'age.stat_hours': 'Hours Alive',
    'age.stat_minutes': 'Minutes Alive',
    'age.stat_months': 'Months Alive',
    'age.age_label_format': '{0} years old',
    'age.birth_format': 'Born on {0}/{1}/{2}',
    // Burnout
    'burnout.reset': 'Retake Test',
    'burnout.step_label': 'Question {0} / {1}',
    'burnout.tips_title': '💡 What You Can Do Now',
    // Burnout questions
    'burnout.q1': 'I feel drained just thinking about work',
    'burnout.q2': 'Getting up in the morning for work/school feels very hard',
    'burnout.q3': 'I struggle to maintain focus throughout the day',
    'burnout.q4': 'Things I used to enjoy now feel meaningless',
    'burnout.q5': 'Interacting with people feels exhausting',
    'burnout.q6': 'I get irritated by small things or struggle to control my emotions',
    'burnout.q7': 'I feel like what I do has no meaning',
    'burnout.q8': 'I frequently feel physically tired, have headaches or stomachaches',
    'burnout.q9': 'Even after resting, I don\'t feel recovered',
    'burnout.q10': 'I often think about escaping my current situation',
    // Burnout options
    'burnout.opt0': 'Not at all',
    'burnout.opt1': 'Sometimes',
    'burnout.opt2': 'Often',
    'burnout.opt3': 'Almost always',
    // Burnout results
    'burnout.level0': 'Stable',
    'burnout.level1': 'Caution',
    'burnout.level2': 'At Risk',
    'burnout.level3': 'Severe',
    'burnout.desc0': 'Your burnout risk is low right now. You\'re maintaining a good balance.',
    'burnout.desc1': 'Early burnout signals detected. Prevention management is needed now.',
    'burnout.desc2': 'Burnout is progressing. Immediate rest and management are necessary.',
    'burnout.desc3': 'Burnout is at a serious level. You must seek professional help.',
    'burnout.tip0_1': 'Keep maintaining your current routine',
    'burnout.tip0_2': 'Plan regular vacations and leisure time in advance',
    'burnout.tip0_3': 'Spend time with people you care about',
    'burnout.tip1_1': 'Reduce work intensity and take frequent short breaks',
    'burnout.tip1_2': 'Secure at least 30 minutes of personal time daily',
    'burnout.tip1_3': 'Maintain 7–8 hours of sleep',
    'burnout.tip1_4': 'Express heavy feelings through journaling or to a trusted person',
    'burnout.tip2_1': 'Take a complete break for a few days if possible',
    'burnout.tip2_2': 'Reprioritize tasks and delegate some responsibilities',
    'burnout.tip2_3': 'Build a stress-relief routine: meditation, light walks, etc.',
    'burnout.tip2_4': 'Honestly share your current state with someone you trust',
    'burnout.tip2_5': 'If it continues, actively consider psychological counseling',
    'burnout.tip3_1': 'Immediately reduce work/study intensity and focus on recovery',
    'burnout.tip3_2': 'Don\'t try to solve this alone — asking for help is strength',
    'burnout.tip3_3': 'Mental health crisis hotline: ☎ 1577-0199 (24hrs)',
    'burnout.tip3_4': 'Find a nearby mental health center or counselor',
    'burnout.tip3_5': 'Recovery from burnout takes time — don\'t blame yourself',
    // Salary
    'salary.input_label': 'Annual Salary (pre-tax, 10K KRW)',
    'salary.input_placeholder': 'e.g. 4000',
    'salary.top_format': 'Top {0}%',
    'salary.label_format': 'Annual salary: {0}만원',
    'salary.bar_low': 'Low',
    'salary.bar_mid': 'Mid',
    'salary.bar_high': 'High',
    'salary.note': 'Based on ~20 million Korean workers / for reference only.',
    'salary.desc_top5': 'Top 5% — you\'re in the very highest income bracket in Korea.',
    'salary.desc_top20': 'Top 20% — you\'re earning above average.',
    'salary.desc_top50': 'Upper-middle range among all Korean workers.',
    'salary.desc_other': 'Lower-middle to middle range. Keep developing your skills to grow your income.',
    // Money personality test
    'money.reset': 'Retake Test',
    'money.step_label': 'Question {0} / {1}',
    'money.tips_title': '💡 Financial Advice for Your Type',
    // Money questions
    'money.q1': 'You unexpectedly receive a ₩1M bonus. What do you do?',
    'money.q1.opt1': 'Buy something you\'ve been wanting right away',
    'money.q1.opt2': 'Save or invest the whole amount',
    'money.q1.opt3': 'Spend half, save half',
    'money.q1.opt4': 'Research high-yield investment products',
    'money.q1.opt5': 'Give gifts or share it with family/friends',
    'money.q2': 'What\'s your general attitude toward money?',
    'money.q2.opt1': 'Being happy now is enough; the future can wait',
    'money.q2.opt2': 'Every penny saved is a penny earned',
    'money.q2.opt3': 'Balance between spending and saving is best',
    'money.q2.opt4': 'Money should work for you',
    'money.q2.opt5': 'Money is most meaningful when spent on relationships',
    'money.q3': 'It\'s a friend\'s birthday — what\'s your gift budget?',
    'money.q3.opt1': 'Spend generously based on mood',
    'money.q3.opt2': 'As cheap and practical as possible',
    'money.q3.opt3': 'Best within a pre-set budget',
    'money.q3.opt4': 'A gift that will be an investment (book, course, etc.)',
    'money.q3.opt5': 'Make something or give your time',
    'money.q4': 'What\'s the first thing you do on payday?',
    'money.q4.opt1': 'Check the shopping list I\'ve been waiting for',
    'money.q4.opt2': 'Set up auto-transfer to savings first',
    'money.q4.opt3': 'Make a spending plan and allocate by category',
    'money.q4.opt4': 'Add funds to my investment account',
    'money.q4.opt5': 'Plan a meal with family or friends',
    'money.q5': 'What do you hope your bank account looks like in 5 years?',
    'money.q5.opt1': 'Memories of living richly and spending freely',
    'money.q5.opt2': 'Stable emergency fund and ample reserves',
    'money.q5.opt3': 'Balanced — spent what I needed, saved what I should',
    'money.q5.opt4': 'Assets grown through compound interest',
    'money.q5.opt5': 'Pride in having taken good care of loved ones',
    // Money results
    'money.type.spender': 'Free Spender',
    'money.subtitle.spender': '"Live for the moment!"',
    'money.desc.spender': 'You value present enjoyment and experience. You improve your quality of life through spending. Just watch out for insufficient future planning.',
    'money.tip.spender1': 'Set up auto-savings before spending each month',
    'money.tip.spender2': 'Try the "24-hour wait" rule to reduce impulse purchases',
    'money.tip.spender3': 'Review your fixed monthly expenses',
    'money.tip.spender4': 'Keeping a spending journal reveals patterns',
    'money.type.saver': 'Safe Saver',
    'money.subtitle.saver': '"Saving is happiness"',
    'money.desc.saver': 'Stability and future preparation are your top priorities. You\'re disciplined and resilient against financial crises. Just make sure excessive frugality doesn\'t diminish your present quality of life.',
    'money.tip.saver1': 'Once you have an emergency fund, budget for enjoyment too',
    'money.tip.saver2': 'Explore inflation-beating investment products',
    'money.tip.saver3': 'Investing in yourself is also a form of saving',
    'money.tip.saver4': 'Setting concrete saving goals boosts motivation',
    'money.type.balancer': 'Balanced Manager',
    'money.subtitle.balancer': '"Both today and tomorrow matter"',
    'money.desc.balancer': 'You naturally maintain balance between spending and saving. You have rational and planned financial management skills. The key is sustaining this balance long-term.',
    'money.tip.balancer1': 'Review your current asset allocation ratio (save:invest:spend)',
    'money.tip.balancer2': 'Gradually increase your investment portion while staying balanced',
    'money.tip.balancer3': 'Use a budget app to identify months when balance slips',
    'money.tip.balancer4': 'Keep 3–6 months of living expenses as emergency fund',
    'money.type.investor': 'Wealth Builder',
    'money.subtitle.investor': '"Money must work"',
    'money.desc.investor': 'You have strategic thinking focused on growing wealth. You\'re a long-term asset builder. Be careful of excessive risk-taking or neglecting present enjoyment.',
    'money.tip.investor1': 'Diversify asset types to spread risk',
    'money.tip.investor2': 'Keep studying investing — information is your weapon',
    'money.tip.investor3': 'Investing without an emergency fund is dangerous',
    'money.tip.investor4': 'Enjoy your present life alongside investing',
    'money.type.giver': 'Relationship Giver',
    'money.subtitle.giver': '"Sharing brings happiness"',
    'money.desc.giver': 'You find meaning in spending on relationships and sharing. You have a generous and warm financial philosophy. It\'s important to also maintain your own financial foundation.',
    'money.tip.giver1': 'Set a fixed monthly budget for giving/gifts',
    'money.tip.giver2': 'Don\'t forget your retirement fund and emergency savings',
    'money.tip.giver3': 'Remember: "Your cup must be full before you can fill others"',
    'money.tip.giver4': 'Set spending limits for family and friends in advance',
    // Result action buttons
    'action.save_history': '💾 Save Result',
    'action.save_image': '📷 Save as Image',
    'action.copy_link': '🔗 Copy Link',
    'action.kakao': '📤 Share URL',
    // History
    'history.title': 'My History',
    'history.subtitle': 'View your saved results grouped by date.',
    'history.clear_all': 'Clear All',
    'history.select': 'Select',
    'history.cancel_select': 'Cancel',
    'history.delete_selected': 'Delete Selected',
    'history.selected_count': '{0} selected',
    'history.empty': 'No saved results yet.\nSave a result from any tool!',
    // Share
    'share.shared_result': 'Shared Result',
    'share.try_myself': 'Try It Myself',
    // Toast
    'toast.link_copied': 'Link copied!',
    'toast.history_saved': 'Saved to history!',
    'toast.history_cleared': 'All history cleared.',
    // Usage count
    'usage.count': '{0} people used this',
    // Alerts
    'alert.bmi_invalid': 'Please enter valid height and weight.',
    'alert.calorie_invalid': 'Please fill in all fields.',
    'alert.water_invalid': 'Please enter a valid weight.',
    'alert.age_invalid': 'Please enter your date of birth.',
    'alert.age_future': 'Date of birth cannot be in the future.',
    'alert.salary_invalid': 'Please enter your salary.',
    'result.disclaimer': 'Results are for reference only and do not replace professional advice.',
  }
};

/* ─── i18n 상태 ─── */
let currentLang = localStorage.getItem('selfchk_lang') || 'ko';

function t(key, ...args) {
  let str = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || (TRANSLATIONS['ko'][key])
    || key;
  args.forEach((a, i) => { str = str.replace(`{${i}}`, a); });
  return str;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('selfchk_lang', lang);
  document.getElementById('lang-ko').classList.toggle('active', lang === 'ko');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
  applyI18n();
  renderAllUsageCounts();
}

function applyI18n() {
  // data-i18n 텍스트
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  // data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  // select option data-i18n
  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  // TOOLS 맵 업데이트
  TOOLS.bmi     = t('tool.bmi.name');
  TOOLS.calorie = t('tool.calorie.name');
  TOOLS.water   = t('tool.water.name');
  TOOLS.age     = t('tool.age.name');
  TOOLS.burnout = t('tool.burnout.name');
  TOOLS.salary  = t('tool.salary.name');
  TOOLS.money   = t('tool.money.name');
}

/* ─── 다크/라이트 모드 ─── */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('selfchk_theme', newTheme);
  document.getElementById('theme-toggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  const saved = localStorage.getItem('selfchk_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-toggle').textContent = saved === 'dark' ? '☀️' : '🌙';
}

/* ─── 토스트 알림 ─── */
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

/* ─── 사용 횟수 카운터 ─── */
const TOOL_IDS = ['bmi', 'calorie', 'water', 'age', 'burnout', 'salary', 'money'];

function getUsageCount(toolId) {
  return parseInt(localStorage.getItem('selfchk_count_' + toolId) || '0', 10);
}

function incrementUsage(toolId) {
  const local = parseInt(localStorage.getItem('selfchk_count_' + toolId) || '0', 10);
  localStorage.setItem('selfchk_count_' + toolId, local + 1);
  renderUsageCount(toolId);
}

function renderUsageCount(toolId) {
  const el = document.getElementById('usage-' + toolId);
  if (!el) return;
  const count = getUsageCount(toolId).toLocaleString();
  el.textContent = t('usage.count', count);
}

function renderAllUsageCounts() {
  TOOL_IDS.forEach(id => renderUsageCount(id));
}

/* ─── 결과 히스토리 ─── */
const HISTORY_KEY = 'selfchk_history';
const HISTORY_MAX = 50;
let historySelectMode = false;
let selectedTimestamps = new Set();

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
  catch { return []; }
}

function saveToHistory(toolId, icon, value, label) {
  const history = getHistory();
  history.unshift({
    toolId, icon, value, label,
    timestamp: new Date().toISOString()
  });
  if (history.length > HISTORY_MAX) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  showToast(t('toast.history_saved'));
}

function clearAllHistory() {
  if (!confirm(currentLang === 'ko' ? '정말 전체 기록을 삭제할까요?' : 'Delete all history?')) return;
  localStorage.removeItem(HISTORY_KEY);
  historySelectMode = false;
  selectedTimestamps.clear();
  renderHistoryPage();
  showToast(t('toast.history_cleared'));
}

function toggleSelectMode() {
  historySelectMode = !historySelectMode;
  selectedTimestamps.clear();
  renderHistoryPage();
}

function toggleHistoryItem(timestamp) {
  if (selectedTimestamps.has(timestamp)) {
    selectedTimestamps.delete(timestamp);
  } else {
    selectedTimestamps.add(timestamp);
  }
  renderHistoryPage();
}

function deleteSelectedHistory() {
  const count = selectedTimestamps.size;
  if (count === 0) return;
  const msg = currentLang === 'ko' ? `선택한 ${count}개 기록을 삭제할까요?` : `Delete ${count} selected record(s)?`;
  if (!confirm(msg)) return;
  const history = getHistory().filter(item => !selectedTimestamps.has(item.timestamp));
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  selectedTimestamps.clear();
  historySelectMode = false;
  renderHistoryPage();
  showToast(currentLang === 'ko' ? `${count}개 기록이 삭제됐어요.` : `${count} record(s) deleted.`);
}

function renderHistoryPage() {
  const list = document.getElementById('history-list');
  const history = getHistory();

  // 선택 모드 툴바 업데이트
  const toolbar = document.getElementById('history-toolbar');
  if (toolbar) {
    const selCount = selectedTimestamps.size;
    toolbar.innerHTML = historySelectMode
      ? `<span class="history-select-info">${t('history.selected_count').replace('{0}', selCount)}</span>
         <div style="display:flex;gap:8px;">
           <button class="btn-secondary btn-danger" onclick="deleteSelectedHistory()" ${selCount === 0 ? 'disabled' : ''}>${t('history.delete_selected')}</button>
           <button class="btn-secondary" onclick="toggleSelectMode()">${t('history.cancel_select')}</button>
         </div>`
      : `<div></div>
         <div style="display:flex;gap:8px;">
           ${history.length > 0 ? `<button class="btn-secondary" onclick="toggleSelectMode()">${t('history.select')}</button>` : ''}
           <button class="btn-secondary btn-danger" onclick="clearAllHistory()" data-i18n="history.clear_all">${t('history.clear_all')}</button>
         </div>`;
  }

  if (history.length === 0) {
    list.innerHTML = `<div class="history-empty">
      <div class="history-empty-icon">📭</div>
      <p>${t('history.empty').replace('\n', '<br>')}</p>
    </div>`;
    return;
  }

  // 날짜별 그룹핑
  const groups = {};
  history.forEach(item => {
    const date = item.timestamp.split('T')[0];
    if (!groups[date]) groups[date] = [];
    groups[date].push(item);
  });

  list.innerHTML = Object.entries(groups).map(([date, items]) => {
    const d = new Date(date);
    const dateLabel = currentLang === 'ko'
      ? `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`
      : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const itemsHtml = items.map(item => {
      const time = new Date(item.timestamp).toLocaleTimeString(
        currentLang === 'ko' ? 'ko-KR' : 'en-US',
        { hour: '2-digit', minute: '2-digit' }
      );
      const isSelected = selectedTimestamps.has(item.timestamp);
      const selectClass = historySelectMode ? ' selectable' + (isSelected ? ' selected' : '') : '';
      const clickAttr = historySelectMode ? `onclick="toggleHistoryItem('${item.timestamp}')"` : '';
      const checkbox = historySelectMode
        ? `<div class="history-checkbox${isSelected ? ' checked' : ''}"></div>`
        : '';
      return `<div class="history-item${selectClass}" ${clickAttr}>
        ${checkbox}
        <div class="history-item-icon">${item.icon}</div>
        <div class="history-item-body">
          <div class="history-item-value">${item.value}</div>
          <div class="history-item-label">${item.label}</div>
        </div>
        <div class="history-item-time">${time}</div>
      </div>`;
    }).join('');
    return `<div class="history-date-group">
      <div class="history-date-label">${dateLabel}</div>
      ${itemsHtml}
    </div>`;
  }).join('');
}

/* ─── 공유 기능 ─── */
function copyShareLink(toolId, icon, value, label) {
  const decodedValue = decodeURIComponent(value);
  const decodedLabel = decodeURIComponent(label);
  const payload = btoa(unescape(encodeURIComponent(JSON.stringify({ t: toolId, v: decodedValue, l: decodedLabel, i: icon }))));
  const url = window.location.href.split('#')[0] + '#share=' + payload;
  function doCopy() {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t('toast.link_copied'));
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(() => showToast(t('toast.link_copied'))).catch(doCopy);
  } else {
    doCopy();
  }
}

function shareKakao(icon, value, label) {
  // 카카오 앱키 없이 URL 복사로 대체
  copyShareLink('share', icon, decodeURIComponent(value), decodeURIComponent(label));
}

function checkShareHash() {
  const hash = window.location.hash;
  if (!hash.startsWith('#share=')) return;
  try {
    const payload = JSON.parse(decodeURIComponent(escape(atob(hash.slice(7)))));
    const overlay = document.getElementById('share-overlay');
    document.getElementById('share-overlay-icon').textContent = payload.i || '';
    document.getElementById('share-overlay-value').textContent = payload.v || '';
    document.getElementById('share-overlay-label').textContent = payload.l || '';
    overlay.style.display = 'flex';
  } catch(e) {}
}

function closeShareOverlay() {
  document.getElementById('share-overlay').style.display = 'none';
  window.location.hash = '';
}

/* ─── 이미지로 저장 ─── */
function saveAsImage(resultEl, toolId) {
  if (typeof html2canvas === 'undefined') {
    alert('html2canvas 라이브러리를 불러오지 못했습니다.');
    return;
  }
  const scale = (window.devicePixelRatio || 1) * 2;
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const bgColor = currentTheme === 'dark' ? '#111111' : '#ffffff';
  html2canvas(resultEl, {
    backgroundColor: bgColor,
    scale: scale,
    logging: false,
    useCORS: true,
    scrollY: -window.scrollY,
    scrollX: 0,
    windowHeight: document.documentElement.scrollHeight,
    height: resultEl.scrollHeight,
    width: resultEl.scrollWidth,
    onclone: (clonedDoc) => {
      clonedDoc.documentElement.setAttribute('data-theme', currentTheme);
      if (currentTheme === 'dark') {
        const style = clonedDoc.createElement('style');
        style.textContent = '[data-theme="dark"] { --text: #F0F0F0 !important; --text-muted: #AAAAAA !important; --border: #333333 !important; }';
        clonedDoc.head.appendChild(style);
      }
    }
  }).then(canvas => {
    // 워터마크 추가
    const ctx = canvas.getContext('2d');
    ctx.font = `bold ${Math.max(24, canvas.width * 0.025)}px Arial, sans-serif`;
    ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('SELFCHK', canvas.width - 24, canvas.height - 20);

    const link = document.createElement('a');
    link.download = `selfchk-${toolId}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

/* ─── 결과 액션 버튼 렌더링 ─── */
function showResultActions(resultEl, toolId, { icon, value, label }) {
  const actionsId = toolId + '-actions';
  const actionsEl = document.getElementById(actionsId);
  if (!actionsEl) return;

  actionsEl.style.display = 'flex';
  actionsEl.innerHTML = `
    <button class="action-btn" onclick="saveToHistoryAndRefresh('${toolId}','${icon}','${encodeURIComponent(value)}','${encodeURIComponent(label)}')">
      ${t('action.save_history')}
    </button>
    <button class="action-btn" onclick="saveAsImage(document.getElementById('${toolId}-result'),'${toolId}')">
      ${t('action.save_image')}
    </button>
    <button class="action-btn" onclick="copyShareLink('${toolId}','${icon}','${encodeURIComponent(value)}','${encodeURIComponent(label)}')">
      ${t('action.copy_link')}
    </button>
    <p class="result-disclaimer">${t('result.disclaimer')}</p>
  `;
}

function saveToHistoryAndRefresh(toolId, icon, encodedValue, encodedLabel) {
  saveToHistory(toolId, icon, decodeURIComponent(encodedValue), decodeURIComponent(encodedLabel));
}

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
  document.getElementById('history-page').style.display = 'none';
  document.getElementById('breadcrumb').style.display = 'none';
  Object.keys(TOOLS).forEach(id => {
    document.getElementById('tool-' + id).style.display = 'none';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showTool(id) {
  document.getElementById('home').style.display = 'none';
  document.getElementById('history-page').style.display = 'none';
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

function showHistory() {
  document.getElementById('home').style.display = 'none';
  Object.keys(TOOLS).forEach(id => {
    document.getElementById('tool-' + id).style.display = 'none';
  });
  document.getElementById('history-page').style.display = '';
  document.getElementById('breadcrumb').style.display = 'flex';
  document.getElementById('breadcrumb-title').textContent = t('history.title');
  historySelectMode = false;
  selectedTimestamps.clear();
  renderHistoryPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── 1. BMI 계산기 ─── */
function calcBMI() {
  const h = parseFloat(document.getElementById('bmi-height').value);
  const w = parseFloat(document.getElementById('bmi-weight').value);
  if (!h || !w || h < 100 || w < 20) { alert(t('alert.bmi_invalid')); return; }

  const bmi = w / ((h / 100) ** 2);
  const bmiRound = bmi.toFixed(1);
  let labelKey, descKey, color, pct;

  if (bmi < 18.5) {
    labelKey = 'bmi.result.underweight'; descKey = 'bmi.desc.underweight';
    color = '#60a5fa'; pct = (bmi / 18.5) * 25;
  } else if (bmi < 23) {
    labelKey = 'bmi.result.normal'; descKey = 'bmi.desc.normal';
    color = '#4ade80'; pct = 25 + ((bmi - 18.5) / 4.5) * 25;
  } else if (bmi < 25) {
    labelKey = 'bmi.result.overweight'; descKey = 'bmi.desc.overweight';
    color = '#facc15'; pct = 50 + ((bmi - 23) / 2) * 25;
  } else {
    labelKey = 'bmi.result.obese'; descKey = 'bmi.desc.obese';
    color = '#f87171'; pct = Math.min(75 + ((bmi - 25) / 10) * 25, 98);
  }

  const label = t(labelKey);
  const desc  = t(descKey);

  document.getElementById('bmi-value').textContent = bmiRound;
  document.getElementById('bmi-value').style.color = color;
  document.getElementById('bmi-label').textContent = label;
  document.getElementById('bmi-desc').textContent  = desc;
  document.getElementById('bmi-pointer').style.left = pct + '%';

  const r = document.getElementById('bmi-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  incrementUsage('bmi');
  showResultActions(r, 'bmi', { icon: '⚖️', value: `BMI ${bmiRound}`, label });
}

/* ─── 2. 칼로리 계산기 ─── */
function calcCalorie() {
  const gender = document.querySelector('input[name="cal-gender"]:checked').value;
  const age = parseFloat(document.getElementById('cal-age').value);
  const h   = parseFloat(document.getElementById('cal-height').value);
  const w   = parseFloat(document.getElementById('cal-weight').value);
  const act = parseFloat(document.getElementById('cal-activity').value);
  if (!age || !h || !w) { alert(t('alert.calorie_invalid')); return; }

  const bmr = gender === 'male'
    ? 10 * w + 6.25 * h - 5 * age + 5
    : 10 * w + 6.25 * h - 5 * age - 161;
  const tdee = Math.round(bmr * act);

  document.getElementById('calorie-bmr').textContent   = Math.round(bmr).toLocaleString();
  document.getElementById('calorie-tdee').textContent  = tdee.toLocaleString() + ' kcal';
  document.getElementById('calorie-lose').textContent  = (tdee - 500).toLocaleString() + ' kcal';
  document.getElementById('calorie-maintain').textContent = tdee.toLocaleString() + ' kcal';
  document.getElementById('calorie-gain').textContent  = (tdee + 300).toLocaleString() + ' kcal';

  const r = document.getElementById('calorie-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const label = t('calorie.tdee_label');
  incrementUsage('calorie');
  showResultActions(r, 'calorie', { icon: '🔥', value: tdee.toLocaleString() + ' kcal', label });
}

/* ─── 3. 물 섭취량 계산기 ─── */
function calcWater() {
  const w   = parseFloat(document.getElementById('water-weight').value);
  const act = parseInt(document.getElementById('water-activity').value);
  const env = parseInt(document.getElementById('water-env').value);
  if (!w || w < 20) { alert(t('alert.water_invalid')); return; }

  const ml   = Math.round(w * act + env);
  const L    = (ml / 1000).toFixed(1);
  const cups = Math.round(ml / 200);

  const valueStr = L + 'L (' + ml.toLocaleString() + 'ml)';
  document.getElementById('water-value').textContent = valueStr;
  document.getElementById('water-cups').textContent = '🥤'.repeat(Math.min(cups, 12)) + (cups > 12 ? ' …' : '');

  const descTemplate = currentLang === 'ko'
    ? `하루 ${cups}잔(200ml 기준)을 목표로 하세요. 한꺼번에 많이 마시기보다 조금씩 자주 마시는 게 효과적입니다.`
    : `Aim for ${cups} glasses (200ml each) per day. Drink little and often rather than all at once.`;
  document.getElementById('water-desc').textContent = descTemplate;

  const r = document.getElementById('water-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const label = t('water.result_label');
  incrementUsage('water');
  showResultActions(r, 'water', { icon: '💧', value: valueStr, label });
}

/* ─── 4. 나이·생존 일수 계산기 ─── */
function calcAge() {
  const val = document.getElementById('age-birth').value;
  if (!val) { alert(t('alert.age_invalid')); return; }

  const birth = new Date(val);
  const now   = new Date();
  if (birth > now) { alert(t('alert.age_future')); return; }

  const diffMs   = now - birth;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHrs  = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) { years--; months += 12; }
  if (now.getDate() < birth.getDate()) months--;
  if (months < 0) months += 12;

  const yearsLabel = t('age.age_label_format', years);
  const birthLabel = t('age.birth_format', birth.getFullYear(), birth.getMonth()+1, birth.getDate());

  document.getElementById('age-years').textContent = yearsLabel;
  document.getElementById('age-label').textContent = birthLabel;
  document.getElementById('age-stats').innerHTML = `
    <div class="age-stat-item">
      <div class="age-stat-value">${diffDays.toLocaleString()}</div>
      <div class="age-stat-label">${t('age.stat_days')}</div>
    </div>
    <div class="age-stat-item">
      <div class="age-stat-value">${diffHrs.toLocaleString()}</div>
      <div class="age-stat-label">${t('age.stat_hours')}</div>
    </div>
    <div class="age-stat-item">
      <div class="age-stat-value">${diffMins.toLocaleString()}</div>
      <div class="age-stat-label">${t('age.stat_minutes')}</div>
    </div>
    <div class="age-stat-item">
      <div class="age-stat-value">${years * 12 + months}</div>
      <div class="age-stat-label">${t('age.stat_months')}</div>
    </div>
  `;

  const r = document.getElementById('age-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  incrementUsage('age');
  showResultActions(r, 'age', { icon: '🗓️', value: yearsLabel, label: birthLabel });
}

/* ─── 5. 번아웃 자가진단 ─── */
function getBurnoutQuestions() {
  return [
    t('burnout.q1'), t('burnout.q2'), t('burnout.q3'), t('burnout.q4'), t('burnout.q5'),
    t('burnout.q6'), t('burnout.q7'), t('burnout.q8'), t('burnout.q9'), t('burnout.q10'),
  ];
}

function getBurnoutOptions() {
  return [
    { text: t('burnout.opt0'), score: 0 },
    { text: t('burnout.opt1'), score: 1 },
    { text: t('burnout.opt2'), score: 2 },
    { text: t('burnout.opt3'), score: 3 },
  ];
}

function getBurnoutResults() {
  return [
    {
      range: [0, 9], icon: '😊',
      level: t('burnout.level0'), desc: t('burnout.desc0'),
      tips: [t('burnout.tip0_1'), t('burnout.tip0_2'), t('burnout.tip0_3')]
    },
    {
      range: [10, 18], icon: '😐',
      level: t('burnout.level1'), desc: t('burnout.desc1'),
      tips: [t('burnout.tip1_1'), t('burnout.tip1_2'), t('burnout.tip1_3'), t('burnout.tip1_4')]
    },
    {
      range: [19, 24], icon: '😰',
      level: t('burnout.level2'), desc: t('burnout.desc2'),
      tips: [t('burnout.tip2_1'), t('burnout.tip2_2'), t('burnout.tip2_3'), t('burnout.tip2_4'), t('burnout.tip2_5')]
    },
    {
      range: [25, 30], icon: '🚨',
      level: t('burnout.level3'), desc: t('burnout.desc3'),
      tips: [t('burnout.tip3_1'), t('burnout.tip3_2'), t('burnout.tip3_3'), t('burnout.tip3_4'), t('burnout.tip3_5')]
    },
  ];
}

let burnoutStep  = 0;
let burnoutScore = 0;

function initBurnout() {
  burnoutStep = 0; burnoutScore = 0;
  document.getElementById('burnout-quiz').style.display   = '';
  document.getElementById('burnout-result').style.display = 'none';
  const actionsEl = document.getElementById('burnout-actions');
  if (actionsEl) actionsEl.style.display = 'none';
  renderBurnoutQuestion();
}

function renderBurnoutQuestion() {
  const questions = getBurnoutQuestions();
  const total = questions.length;
  document.getElementById('burnout-progress-bar').style.width = (burnoutStep / total * 100) + '%';
  document.getElementById('burnout-step-label').textContent   = t('burnout.step_label', burnoutStep + 1, total);
  document.getElementById('burnout-question').textContent     = questions[burnoutStep];

  const el = document.getElementById('burnout-options');
  el.innerHTML = '';
  getBurnoutOptions().forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.onclick = () => {
      document.querySelectorAll('#burnout-options .quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      burnoutScore += opt.score;
      burnoutStep++;
      setTimeout(() => {
        burnoutStep >= total ? showBurnoutResult() : renderBurnoutQuestion();
      }, 300);
    };
    el.appendChild(btn);
  });
}

function showBurnoutResult() {
  document.getElementById('burnout-progress-bar').style.width = '100%';
  document.getElementById('burnout-quiz').style.display = 'none';

  const results = getBurnoutResults();
  const res = results.find(r => burnoutScore >= r.range[0] && burnoutScore <= r.range[1]);
  document.getElementById('burnout-icon').textContent  = res.icon;
  document.getElementById('burnout-level').textContent = res.level;
  document.getElementById('burnout-desc').textContent  = res.desc;
  document.getElementById('burnout-tips').innerHTML =
    `<h3>${t('burnout.tips_title')}</h3><ul>${res.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  document.querySelector('#tool-burnout .btn-secondary').textContent = t('burnout.reset');

  const r = document.getElementById('burnout-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  incrementUsage('burnout');
  showResultActions(r, 'burnout', { icon: res.icon, value: res.level, label: t('tool.burnout.name') });
}

function resetBurnout() { initBurnout(); }

/* ─── 6. 연봉 상위 % ─── */
const SALARY_DIST = [
  [500,   4.5],  [1000,  14.0], [1500,  26.0], [2000,  38.5], [2500,  49.5],
  [3000,  59.0], [3500,  67.0], [4000,  73.5], [4500,  78.5], [5000,  82.5],
  [6000,  87.5], [7000,  90.8], [8000,  93.0], [9000,  94.8], [10000, 96.0],
  [12000, 97.2], [15000, 98.2], [20000, 99.0], [30000, 99.6], [99999, 100.0],
];

function calcSalary() {
  const val = parseFloat(document.getElementById('salary-input').value);
  if (!val || val <= 0) { alert(t('alert.salary_invalid')); return; }

  let belowPct = 0;
  for (let i = 0; i < SALARY_DIST.length; i++) {
    const [limit, cumPct] = SALARY_DIST[i];
    const prevLimit  = i === 0 ? 0 : SALARY_DIST[i-1][0];
    const prevCumPct = i === 0 ? 0 : SALARY_DIST[i-1][1];
    if (val <= limit) {
      belowPct = prevCumPct + (val - prevLimit) / (limit - prevLimit) * (cumPct - prevCumPct);
      break;
    }
    if (i === SALARY_DIST.length - 1) belowPct = 99.9;
  }

  const topPct = Math.max(0.1, 100 - belowPct);
  const topStr = topPct < 1 ? topPct.toFixed(1) : Math.round(topPct);
  const topLabel = t('salary.top_format', topStr);
  const valLabel = t('salary.label_format', val.toLocaleString());

  document.getElementById('salary-top').textContent   = topLabel;
  document.getElementById('salary-label').textContent = valLabel;
  document.getElementById('salary-marker').style.left = (100 - topPct) + '%';

  let descKey;
  if (topPct <= 5) descKey = 'salary.desc_top5';
  else if (topPct <= 20) descKey = 'salary.desc_top20';
  else if (topPct <= 50) descKey = 'salary.desc_top50';
  else descKey = 'salary.desc_other';
  document.getElementById('salary-desc').textContent = t(descKey);

  const r = document.getElementById('salary-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  incrementUsage('salary');
  showResultActions(r, 'salary', { icon: '💰', value: topLabel, label: valLabel });
}

/* ─── 7. 돈 성격 테스트 ─── */
function getMoneyQuestions() {
  return [
    {
      q: t('money.q1'),
      options: [
        { text: t('money.q1.opt1'), type: 'spender' },
        { text: t('money.q1.opt2'), type: 'saver' },
        { text: t('money.q1.opt3'), type: 'balancer' },
        { text: t('money.q1.opt4'), type: 'investor' },
        { text: t('money.q1.opt5'), type: 'giver' },
      ]
    },
    {
      q: t('money.q2'),
      options: [
        { text: t('money.q2.opt1'), type: 'spender' },
        { text: t('money.q2.opt2'), type: 'saver' },
        { text: t('money.q2.opt3'), type: 'balancer' },
        { text: t('money.q2.opt4'), type: 'investor' },
        { text: t('money.q2.opt5'), type: 'giver' },
      ]
    },
    {
      q: t('money.q3'),
      options: [
        { text: t('money.q3.opt1'), type: 'spender' },
        { text: t('money.q3.opt2'), type: 'saver' },
        { text: t('money.q3.opt3'), type: 'balancer' },
        { text: t('money.q3.opt4'), type: 'investor' },
        { text: t('money.q3.opt5'), type: 'giver' },
      ]
    },
    {
      q: t('money.q4'),
      options: [
        { text: t('money.q4.opt1'), type: 'spender' },
        { text: t('money.q4.opt2'), type: 'saver' },
        { text: t('money.q4.opt3'), type: 'balancer' },
        { text: t('money.q4.opt4'), type: 'investor' },
        { text: t('money.q4.opt5'), type: 'giver' },
      ]
    },
    {
      q: t('money.q5'),
      options: [
        { text: t('money.q5.opt1'), type: 'spender' },
        { text: t('money.q5.opt2'), type: 'saver' },
        { text: t('money.q5.opt3'), type: 'balancer' },
        { text: t('money.q5.opt4'), type: 'investor' },
        { text: t('money.q5.opt5'), type: 'giver' },
      ]
    },
  ];
}

function getMoneyResults() {
  return {
    spender:  {
      icon: '🛍️',
      type: t('money.type.spender'), subtitle: t('money.subtitle.spender'),
      desc: t('money.desc.spender'),
      tips: [t('money.tip.spender1'), t('money.tip.spender2'), t('money.tip.spender3'), t('money.tip.spender4')]
    },
    saver: {
      icon: '🏦',
      type: t('money.type.saver'), subtitle: t('money.subtitle.saver'),
      desc: t('money.desc.saver'),
      tips: [t('money.tip.saver1'), t('money.tip.saver2'), t('money.tip.saver3'), t('money.tip.saver4')]
    },
    balancer: {
      icon: '⚖️',
      type: t('money.type.balancer'), subtitle: t('money.subtitle.balancer'),
      desc: t('money.desc.balancer'),
      tips: [t('money.tip.balancer1'), t('money.tip.balancer2'), t('money.tip.balancer3'), t('money.tip.balancer4')]
    },
    investor: {
      icon: '📈',
      type: t('money.type.investor'), subtitle: t('money.subtitle.investor'),
      desc: t('money.desc.investor'),
      tips: [t('money.tip.investor1'), t('money.tip.investor2'), t('money.tip.investor3'), t('money.tip.investor4')]
    },
    giver: {
      icon: '🎁',
      type: t('money.type.giver'), subtitle: t('money.subtitle.giver'),
      desc: t('money.desc.giver'),
      tips: [t('money.tip.giver1'), t('money.tip.giver2'), t('money.tip.giver3'), t('money.tip.giver4')]
    },
  };
}

let moneyStep   = 0;
let moneyScores = {};

function initMoney() {
  moneyStep   = 0;
  moneyScores = { spender: 0, saver: 0, balancer: 0, investor: 0, giver: 0 };
  document.getElementById('money-quiz').style.display   = '';
  document.getElementById('money-result').style.display = 'none';
  const actionsEl = document.getElementById('money-actions');
  if (actionsEl) actionsEl.style.display = 'none';
  renderMoneyQuestion();
}

function renderMoneyQuestion() {
  const questions = getMoneyQuestions();
  const total = questions.length;
  document.getElementById('money-progress-bar').style.width = (moneyStep / total * 100) + '%';
  document.getElementById('money-step-label').textContent   = t('money.step_label', moneyStep + 1, total);
  document.getElementById('money-question').textContent     = questions[moneyStep].q;

  const el = document.getElementById('money-options');
  el.innerHTML = '';
  questions[moneyStep].options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.onclick = () => {
      document.querySelectorAll('#money-options .quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      moneyScores[opt.type]++;
      moneyStep++;
      setTimeout(() => {
        moneyStep >= total ? showMoneyResult() : renderMoneyQuestion();
      }, 300);
    };
    el.appendChild(btn);
  });
}

function showMoneyResult() {
  document.getElementById('money-progress-bar').style.width = '100%';
  document.getElementById('money-quiz').style.display = 'none';

  const topType = Object.entries(moneyScores).sort((a, b) => b[1] - a[1])[0][0];
  const results = getMoneyResults();
  const res = results[topType];

  document.getElementById('money-icon').textContent     = res.icon;
  document.getElementById('money-type').textContent     = res.type;
  document.getElementById('money-subtitle').textContent = res.subtitle;
  document.getElementById('money-desc').textContent     = res.desc;
  document.getElementById('money-tips').innerHTML =
    `<h3>${t('money.tips_title')}</h3><ul>${res.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  document.querySelector('#tool-money .btn-secondary').textContent = t('money.reset');

  const r = document.getElementById('money-result');
  r.style.display = '';
  r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  incrementUsage('money');
  showResultActions(r, 'money', { icon: res.icon, value: res.type, label: res.subtitle });
}

function resetMoney() { initMoney(); }

/* ─── 초기화 ─── */
(function init() {
  initTheme();
  // 언어 설정 복원
  document.getElementById('lang-ko').classList.toggle('active', currentLang === 'ko');
  document.getElementById('lang-en').classList.toggle('active', currentLang === 'en');
  document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'en';
  applyI18n();
  renderAllUsageCounts();
  checkShareHash();
})();
