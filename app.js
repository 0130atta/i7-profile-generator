const characterAssets = [
  'Iori_Izumi.png', 'Yamato_Nikaido.png', 'Mitsuki_Izumi.webp', 'Tamaki_Yotsuba.png',
  'Sogo_Osaka.png', 'Nagi_Rokuya.png', 'Riku_Nanase.png', 'Gaku_Yaotome.png',
  'Tenn_Kujo.png', 'Ryunosuke_Tsunashi.png', 'Momo.png', 'Yuki.png',
  'Toma_Inumaru.png', 'Haruka_Isumi.png', 'Minami_Natsume.png', 'Torao_Mido.png',
  'Aya_Kujo.png', 'Banri_Ogami.png', 'Haruki_Sakura_Navigation.png', 'Kaoru_Anesagi.png',
  'Otoharu_Takanashi.png', 'Rintaro_Okazaki.png', 'Rinto_Okazaki.png', 'Ryo_Tsukumo.png',
  'Seto_Ranvalt_von_Northmeir.png', 'Shiro_Utsugi.png', 'Shizuo_Chiba.png', 'Soshi_Osaka.png',
  'Sosuke_Yaotome.png', 'Takamasa_Kujo.png', 'Tsumugi_Takanashi.png', 'ZERO_Navigation.png'
];

const characters = characterAssets.map((image) => ({
  id: image, label: image.replace(/\.[^.]+$/, '').replaceAll('_', ' '), image: `assets/characters/${image}`
}));

const groups = [
  { id: 'I7.png', label: 'IDOLiSH7', image: 'assets/groups/I7.png' },
  { id: 'TRG.png', label: 'TRIGGER', image: 'assets/groups/TRG.png' },
  { id: 'Rvl.png', label: 'Re:vale', image: 'assets/groups/Rvl.png' },
  { id: 'ZOOL.png', label: 'ŹOOĻ', image: 'assets/groups/ZOOL.png' },
  { id: 'other', label: '其他团体', image: '' }
];

const data = {
  characterAttitudes: ['最喜欢', '好感', '不喜欢粉丝', '雷'],
  cpAttitudes: ['最喜欢', '可以接受', '更喜欢 CP 之外的关系', '不想见到']
};

const defaultColors = {
  character: { '最喜欢': '#e15b64', '好感': '#e6a23c', '不喜欢粉丝': '#7d8796', '雷': '#9a64bd' },
  group: { '最喜欢': '#e15b64', '好感': '#e6a23c', '不喜欢粉丝': '#7d8796', '雷': '#9a64bd' },
  cp: { '最喜欢': '#e15b64', '可以接受': '#4f93d2', '更喜欢 CP 之外的关系': '#e6a23c', '不想见到': '#7d8796' },
  single: { '左位固定': '#5477ce', '右位固定': '#c95c7c', '梦思考固定': '#8563bb' },
  triple: { '3p': '#c95c7c', 'CB组合': '#429276' }
};

const state = {
  name: '', bio: '', avatar: '', mobileView: 'editor', visibility: { personal: true, legend: true, character: true, group: true, cp: true, notes: true }, colorLegend: [], savedColors: [], notes: [],
  character: { selected: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.character }, entries: [] },
  group: { selected: '', otherName: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.group }, entries: [] },
  cp: { selected: [], attitude: '', customAttitudes: [], colors: { ...defaultColors.cp }, entries: [], nonDirectional: false, singleStatus: '', singleCustomStatuses: [], singleColors: { ...defaultColors.single }, tripleStatus: '', tripleCustomStatuses: [], tripleColors: { ...defaultColors.triple }, tripleAttitude: '', tripleCustomAttitudes: [], tripleAttitudeColors: { ...defaultColors.cp } }
};

const storageKey = 'i7-profile-generator-state-v1';

const elements = {
  character: document.querySelector('#characterChips'), characterAttitudes: document.querySelector('#characterAttitudeChips'),
  characterColor: document.querySelector('#characterColorInput'), characterCustomInput: document.querySelector('#characterAttitudeCustomInput'),
  addCharacterAttitude: document.querySelector('#addCharacterAttitudeButton'), characterDraft: document.querySelector('#characterDraftPreview'),
  confirmCharacter: document.querySelector('#confirmCharacterButton'), characterEntryList: document.querySelector('#characterEntryList'),
  group: document.querySelector('#groupChips'), otherGroupRow: document.querySelector('#otherGroupRow'), otherGroupInput: document.querySelector('#otherGroupInput'), groupAttitudes: document.querySelector('#groupAttitudeChips'), groupColor: document.querySelector('#groupColorInput'), groupCustomInput: document.querySelector('#groupAttitudeCustomInput'), addGroupAttitude: document.querySelector('#addGroupAttitudeButton'), groupDraft: document.querySelector('#groupDraftPreview'), confirmGroup: document.querySelector('#confirmGroupButton'), groupEntryList: document.querySelector('#groupEntryList'), cpCharacters: document.querySelector('#cpCharacterPicker'),
  cpNonDirectional: document.querySelector('#cpNonDirectionalToggle'), cpSwap: document.querySelector('#cpSwapButton'), cpSecondStepTitle: document.querySelector('#cpSecondStepTitle'), cpAttitudeArea: document.querySelector('#cpAttitudeArea'), cpSingleArea: document.querySelector('#cpSingleArea'), cpSingleStatuses: document.querySelector('#cpSingleStatusChips'), cpSingleCustomInput: document.querySelector('#cpSingleCustomInput'), addCpSingleCustom: document.querySelector('#addCpSingleCustomButton'), cpTripleArea: document.querySelector('#cpTripleArea'), cpTripleStatuses: document.querySelector('#cpTripleStatusChips'), cpTripleCustomInput: document.querySelector('#cpTripleCustomInput'), addCpTripleCustom: document.querySelector('#addCpTripleCustomButton'), cpTripleAttitudes: document.querySelector('#cpTripleAttitudeChips'), cpTripleColor: document.querySelector('#cpTripleColorInput'), cpTripleAttitudeCustomInput: document.querySelector('#cpTripleAttitudeCustomInput'), addCpTripleAttitude: document.querySelector('#addCpTripleAttitudeButton'),
  cpAttitudes: document.querySelector('#cpPreferenceChips'), cpColor: document.querySelector('#cpColorInput'),
  cpCustomInput: document.querySelector('#cpAttitudeCustomInput'), addCpAttitude: document.querySelector('#addCpAttitudeButton'),
  cpDraft: document.querySelector('#cpEntryOutput'), confirmCp: document.querySelector('#generateCpButton'), cpEntryList: document.querySelector('#cpEntryList'),
  nameInput: document.querySelector('#nameInput'), bioInput: document.querySelector('#bioInput'),
  avatarInput: document.querySelector('#avatarInput'), avatarPreview: document.querySelector('#avatarPreview'), avatarPlaceholder: document.querySelector('#avatarPlaceholder'),
  card: document.querySelector('#profileCard'), cardName: document.querySelector('#cardName'), cardBio: document.querySelector('#cardBio'), cardAvatar: document.querySelector('#cardAvatar'),
  previewCharacter: document.querySelector('#previewCharacter'), previewGroup: document.querySelector('#previewGroup'), previewCp: document.querySelector('#previewCp'),
  workspace: document.querySelector('.workspace'), mobileViewButtons: document.querySelectorAll('[data-workspace-view]'),
  quickColorButtons: document.querySelectorAll('[data-color-target]'), savedColorSlots: document.querySelectorAll('[data-saved-color-slot]'), colorLegendEditor: document.querySelector('#colorLegendEditor'), addColorLegend: document.querySelector('#addColorLegendButton'), colorLegendDialog: document.querySelector('#colorLegendDialog'), legendColorChoices: document.querySelector('#legendColorChoices'), legendNoteInput: document.querySelector('#legendNoteInput'), confirmColorLegend: document.querySelector('#confirmColorLegendButton'), cancelColorLegend: document.querySelector('#cancelColorLegendButton'),
  visibilityButtons: document.querySelectorAll('[data-preview-module]'), notesEditor: document.querySelector('#notesEditor'), addNote: document.querySelector('#addNoteButton'),
  profileHeader: document.querySelector('#profileHeader'), profileHeaderDivider: document.querySelector('#profileHeaderDivider'), previewLegendSection: document.querySelector('#previewLegendSection'), previewColorLegend: document.querySelector('#previewColorLegend'), previewCharacterSection: document.querySelector('#previewCharacterSection'), previewGroupSection: document.querySelector('#previewGroupSection'), previewCpSection: document.querySelector('#previewCpSection'), previewNotesSection: document.querySelector('#previewNotesSection'), previewNotes: document.querySelector('#previewNotes'),
  exportPng: document.querySelector('#exportPngButton'), exportStatus: document.querySelector('#exportStatus'),
  disclaimerDialog: document.querySelector('#disclaimerDialog'), confirmDisclaimer: document.querySelector('#confirmDisclaimerButton')
};

function characterById(id) { return characters.find((character) => character.id === id); }
function groupById(id) { return groups.find((group) => group.id === id); }
function createPortrait(character) { const image = document.createElement('img'); image.src = character.image; image.alt = character.label; return image; }
function createGroupLogo(group, label = group.label) { if (group.image) { const image = document.createElement('img'); image.src = group.image; image.alt = label; return image; } const text = document.createElement('span'); text.className = 'group-logo-text'; text.textContent = label; return text; }
function entryId() { return `${Date.now()}-${Math.random()}`; }

function persistState() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (error) { console.warn('无法保存本地资料', error); }
}

function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey)); if (!saved || typeof saved !== 'object') return;
    state.name = typeof saved.name === 'string' ? saved.name : ''; state.bio = typeof saved.bio === 'string' ? saved.bio : ''; state.avatar = typeof saved.avatar === 'string' ? saved.avatar : '';
    state.mobileView = saved.mobileView === 'preview' ? 'preview' : 'editor'; state.visibility = { ...state.visibility, ...(saved.visibility || {}) };
    state.colorLegend = Array.isArray(saved.colorLegend) ? saved.colorLegend : []; state.savedColors = Array.isArray(saved.savedColors) ? saved.savedColors : []; state.notes = Array.isArray(saved.notes) ? saved.notes : [];
    state.character = { ...state.character, ...(saved.character || {}) }; state.group = { ...state.group, ...(saved.group || {}) }; state.cp = { ...state.cp, ...(saved.cp || {}) };
  } catch (error) { console.warn('无法读取本地资料', error); }
}

function renderPersonalFields() {
  elements.nameInput.value = state.name; elements.bioInput.value = state.bio;
  if (state.avatar) { elements.avatarPreview.src = state.avatar; elements.avatarPreview.hidden = false; elements.avatarPlaceholder.hidden = true; }
  else { elements.avatarPreview.hidden = true; elements.avatarPreview.removeAttribute('src'); elements.avatarPlaceholder.hidden = false; }
}

function renderPortraitPicker(container, selectedIds, onToggle, roleMode = false) {
  container.replaceChildren();
  characters.forEach((character) => {
    const button = document.createElement('button'); const position = selectedIds.indexOf(character.id);
    button.className = 'portrait-choice'; button.type = 'button'; button.title = character.label; button.setAttribute('aria-label', character.label);
    button.setAttribute('aria-pressed', String(position !== -1));
    if (roleMode && position !== -1) button.dataset.order = position === 0 ? '左' : '右';
    button.append(createPortrait(character)); button.addEventListener('click', () => onToggle(character.id)); container.append(button);
  });
}

function renderCharacterPicker() {
  renderPortraitPicker(elements.character, state.character.selected ? [state.character.selected] : [], (id) => {
    state.character.selected = state.character.selected === id ? '' : id;
    renderCharacterPicker(); renderCharacterDraft();
  });
}

function renderCpPicker() {
  renderPortraitPicker(elements.cpCharacters, state.cp.selected, (id) => {
    const index = state.cp.selected.indexOf(id);
    if (index !== -1) state.cp.selected.splice(index, 1);
    else state.cp.selected.push(id);
    if (state.cp.selected.length === 1) { state.cp.attitude = ''; state.cp.tripleStatus = ''; state.cp.tripleAttitude = ''; }
    else if (state.cp.selected.length === 2) { state.cp.singleStatus = ''; state.cp.tripleStatus = ''; state.cp.tripleAttitude = ''; }
    else if (state.cp.selected.length >= 3) { state.cp.attitude = ''; state.cp.singleStatus = ''; }
    renderCpPicker(); renderCpMode(); renderCpDraft();
  }, state.cp.selected.length === 2 && !state.cp.nonDirectional);
}

function renderChips(container, values, selected, onToggle) {
  container.replaceChildren();
  values.forEach((value) => {
    const button = document.createElement('button'); button.className = 'chip'; button.type = 'button'; button.textContent = value;
    button.setAttribute('aria-pressed', String(Array.isArray(selected) ? selected.includes(value) : selected === value));
    button.addEventListener('click', () => onToggle(value)); container.append(button);
  });
}

function currentColor(section) {
  const item = state[section]; return item.colors[item.attitude] || '#5273cc';
}

const presetColors = ['#000000', '#ffffff', '#e15b64', '#e6a23c', '#d2a526', '#429276', '#9a64bd'];
let selectedLegendColor = '';

function normalizedColor(color) { return color.toLowerCase(); }

function saveCustomColor(color) {
  const normalized = normalizedColor(color);
  if (!presetColors.includes(normalized) && !state.savedColors.includes(normalized)) { state.savedColors.push(normalized); renderSavedColorButtons(); }
}

function applyQuickColor(colorTarget, color) {
  if (colorTarget === 'cp-triple') { elements.cpTripleColor.value = color; updateTripleAttitudeColor(color); return; }
  const colorInput = colorTarget === 'character' ? elements.characterColor : colorTarget === 'group' ? elements.groupColor : elements.cpColor;
  colorInput.value = color; updateAttitudeColor(colorTarget, color);
}

function renderSavedColorButtons() {
  elements.savedColorSlots.forEach((slot) => {
    slot.replaceChildren(); state.savedColors.forEach((color) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'quick-color-button saved-color-button'; button.style.setProperty('--quick-color', color); button.dataset.colorTarget = slot.dataset.savedColorSlot; button.dataset.color = color; button.title = color; button.setAttribute('aria-label', `使用已保存颜色 ${color}`);
      button.addEventListener('click', () => applyQuickColor(button.dataset.colorTarget, button.dataset.color)); slot.append(button);
    });
  });
}

function renderColorLegendEditor() {
  elements.colorLegendEditor.replaceChildren();
  if (!state.colorLegend.length) { const empty = document.createElement('p'); empty.className = 'color-legend-empty'; empty.textContent = '点击“添加颜色词条”后，选择已生成词条中使用的颜色。'; elements.colorLegendEditor.append(empty); return; }
  state.colorLegend.forEach((item, index) => {
    const row = document.createElement('div'); row.className = 'color-legend-item';
    const swatch = document.createElement('span'); swatch.className = 'legend-swatch'; swatch.style.backgroundColor = item.color; swatch.setAttribute('aria-label', `颜色 ${item.color}`);
    const text = document.createElement('input'); text.type = 'text'; text.maxLength = 30; text.value = item.note; text.placeholder = '填写颜色说明'; text.setAttribute('aria-label', '颜色说明'); text.addEventListener('input', (event) => { item.note = event.target.value; renderPreview(); });
    const controls = document.createElement('div'); controls.className = 'legend-order-controls';
    const up = document.createElement('button'); up.type = 'button'; up.textContent = '↑'; up.title = '上移'; up.setAttribute('aria-label', '上移'); up.disabled = index === 0;
    up.addEventListener('click', () => { [state.colorLegend[index - 1], state.colorLegend[index]] = [state.colorLegend[index], state.colorLegend[index - 1]]; renderColorLegendEditor(); renderPreview(); });
    const down = document.createElement('button'); down.type = 'button'; down.textContent = '↓'; down.title = '下移'; down.setAttribute('aria-label', '下移'); down.disabled = index === state.colorLegend.length - 1;
    down.addEventListener('click', () => { [state.colorLegend[index], state.colorLegend[index + 1]] = [state.colorLegend[index + 1], state.colorLegend[index]]; renderColorLegendEditor(); renderPreview(); });
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'legend-remove-button'; remove.textContent = '×'; remove.title = '删除说明'; remove.setAttribute('aria-label', '删除说明');
    remove.addEventListener('click', () => { state.colorLegend = state.colorLegend.filter((legend) => legend.id !== item.id); renderColorLegendEditor(); renderPreview(); });
    controls.append(up, down, remove); row.append(swatch, text, controls); elements.colorLegendEditor.append(row);
  });
}

function usedEntryColors() {
  const colors = [...state.character.entries, ...state.group.entries, ...state.cp.entries].map((entry) => normalizedColor(entry.color));
  return [...new Set(colors)];
}

function renderLegendColorChoices() {
  const colors = usedEntryColors(); elements.legendColorChoices.replaceChildren();
  const available = colors.filter((color) => !state.colorLegend.some((item) => item.id === color));
  if (!available.length) { const empty = document.createElement('p'); empty.className = 'color-legend-empty'; empty.textContent = colors.length ? '这些已使用颜色都已有说明。' : '请先在下方模块确认生成至少一个词条。'; elements.legendColorChoices.append(empty); selectedLegendColor = ''; elements.confirmColorLegend.disabled = true; return; }
  if (!available.includes(selectedLegendColor)) selectedLegendColor = available[0];
  available.forEach((color) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'legend-color-choice'; button.style.setProperty('--legend-color', color); button.setAttribute('aria-pressed', String(selectedLegendColor === color)); button.title = color; button.setAttribute('aria-label', `选择颜色 ${color}`);
    button.addEventListener('click', () => { selectedLegendColor = color; renderLegendColorChoices(); }); elements.legendColorChoices.append(button);
  });
  elements.confirmColorLegend.disabled = false;
}

function openColorLegendDialog() {
  selectedLegendColor = ''; elements.legendNoteInput.value = ''; renderLegendColorChoices(); elements.colorLegendDialog.hidden = false; document.body.classList.add('disclaimer-open');
}

function closeColorLegendDialog() { elements.colorLegendDialog.hidden = true; document.body.classList.remove('disclaimer-open'); }

function addColorLegend() {
  if (!selectedLegendColor || state.colorLegend.some((item) => item.id === selectedLegendColor)) return;
  state.colorLegend.push({ id: selectedLegendColor, color: selectedLegendColor, note: elements.legendNoteInput.value }); renderColorLegendEditor(); renderPreview(); closeColorLegendDialog();
}

function renderPreviewColorLegend() {
  elements.previewColorLegend.replaceChildren();
  state.colorLegend.forEach((item) => {
    const row = document.createElement('div'); row.className = 'preview-legend-item';
    const swatch = document.createElement('span'); swatch.className = 'preview-legend-swatch'; swatch.style.backgroundColor = item.color;
    const text = document.createElement('span'); text.textContent = item.note.trim() || '未填写说明'; row.append(swatch, text); elements.previewColorLegend.append(row);
  });
}

function renderAttitudePicker(section) {
  const item = state[section]; const isCharacterStyle = section === 'character' || section === 'group'; const values = isCharacterStyle ? [...data.characterAttitudes, ...item.customAttitudes] : [...data.cpAttitudes, ...item.customAttitudes];
  const container = section === 'character' ? elements.characterAttitudes : section === 'group' ? elements.groupAttitudes : elements.cpAttitudes;
  const colorInput = section === 'character' ? elements.characterColor : section === 'group' ? elements.groupColor : elements.cpColor;
  container.replaceChildren();
  values.forEach((value) => {
    const button = document.createElement('button'); button.className = 'chip attitude-chip'; button.type = 'button'; button.textContent = value;
    button.setAttribute('aria-pressed', String(item.attitude === value)); button.style.setProperty('--attitude-color', item.colors[value] || '#5273cc');
    button.addEventListener('click', () => {
      item.attitude = item.attitude === value ? '' : value;
      colorInput.value = currentColor(section); renderAttitudePicker(section);
      section === 'character' ? renderCharacterDraft() : section === 'group' ? renderGroupDraft() : renderCpDraft();
    });
    container.append(button);
  });
  colorInput.value = currentColor(section);
  colorInput.disabled = !item.attitude;
}

function addCustomAttitude(section) {
  const item = state[section]; const input = section === 'character' ? elements.characterCustomInput : section === 'group' ? elements.groupCustomInput : elements.cpCustomInput;
  const builtIn = section === 'character' || section === 'group' ? data.characterAttitudes : data.cpAttitudes; const value = input.value.trim();
  if (!value || [...builtIn, ...item.customAttitudes].includes(value)) return;
  item.customAttitudes.push(value); item.colors[value] = '#5273cc'; item.attitude = value; input.value = '';
  renderAttitudePicker(section); section === 'character' ? renderCharacterDraft() : section === 'group' ? renderGroupDraft() : renderCpDraft();
}

function updateAttitudeColor(section, color, saveColor = false) {
  const item = state[section]; if (!item.attitude) return;
  const normalized = normalizedColor(color); if (saveColor) saveCustomColor(normalized); item.colors[item.attitude] = normalized; renderAttitudePicker(section);
  section === 'character' ? renderCharacterDraft() : section === 'group' ? renderGroupDraft() : renderCpDraft();
}

function singleStatusColor() { return state.cp.singleColors[state.cp.singleStatus] || '#5273cc'; }

function renderSingleStatuses() {
  const values = ['左位固定', '右位固定', '梦思考固定', ...state.cp.singleCustomStatuses];
  elements.cpSingleStatuses.replaceChildren();
  values.forEach((value) => {
    const button = document.createElement('button'); button.className = 'chip attitude-chip'; button.type = 'button'; button.textContent = value;
    button.setAttribute('aria-pressed', String(state.cp.singleStatus === value)); button.style.setProperty('--attitude-color', state.cp.singleColors[value] || '#5273cc');
    button.addEventListener('click', () => { state.cp.singleStatus = state.cp.singleStatus === value ? '' : value; renderSingleStatuses(); renderCpDraft(); });
    elements.cpSingleStatuses.append(button);
  });
}

function addSingleCustomStatus() {
  const value = elements.cpSingleCustomInput.value.trim();
  if (!value || ['左位固定', '右位固定', '梦思考固定', ...state.cp.singleCustomStatuses].includes(value)) return;
  state.cp.singleCustomStatuses.push(value); state.cp.singleColors[value] = '#5273cc'; state.cp.singleStatus = value; elements.cpSingleCustomInput.value = '';
  renderSingleStatuses(); renderCpDraft();
}

function tripleStatusColor() { return state.cp.tripleColors[state.cp.tripleStatus] || '#5273cc'; }

function renderTripleStatuses() {
  const values = ['3p', 'CB组合', ...state.cp.tripleCustomStatuses];
  elements.cpTripleStatuses.replaceChildren();
  values.forEach((value) => {
    const button = document.createElement('button'); button.className = 'chip attitude-chip'; button.type = 'button'; button.textContent = value;
    button.setAttribute('aria-pressed', String(state.cp.tripleStatus === value)); button.style.setProperty('--attitude-color', state.cp.tripleColors[value] || '#5273cc');
    button.addEventListener('click', () => { state.cp.tripleStatus = state.cp.tripleStatus === value ? '' : value; renderTripleStatuses(); renderCpDraft(); });
    elements.cpTripleStatuses.append(button);
  });
}

function addTripleCustomStatus() {
  const value = elements.cpTripleCustomInput.value.trim();
  if (!value || ['3p', 'CB组合', ...state.cp.tripleCustomStatuses].includes(value)) return;
  state.cp.tripleCustomStatuses.push(value); state.cp.tripleColors[value] = '#5273cc'; state.cp.tripleStatus = value; elements.cpTripleCustomInput.value = '';
  renderTripleStatuses(); renderCpDraft();
}

function tripleAttitudeColor() { return state.cp.tripleAttitudeColors[state.cp.tripleAttitude] || '#5273cc'; }

function renderTripleAttitudes() {
  const values = [...data.cpAttitudes, ...state.cp.tripleCustomAttitudes];
  elements.cpTripleAttitudes.replaceChildren();
  values.forEach((value) => {
    const button = document.createElement('button'); button.className = 'chip attitude-chip'; button.type = 'button'; button.textContent = value;
    button.setAttribute('aria-pressed', String(state.cp.tripleAttitude === value)); button.style.setProperty('--attitude-color', state.cp.tripleAttitudeColors[value] || '#5273cc');
    button.addEventListener('click', () => { state.cp.tripleAttitude = state.cp.tripleAttitude === value ? '' : value; elements.cpTripleColor.value = tripleAttitudeColor(); renderTripleAttitudes(); renderCpDraft(); });
    elements.cpTripleAttitudes.append(button);
  });
  elements.cpTripleColor.value = tripleAttitudeColor(); elements.cpTripleColor.disabled = !state.cp.tripleAttitude;
}

function addTripleCustomAttitude() {
  const value = elements.cpTripleAttitudeCustomInput.value.trim();
  if (!value || [...data.cpAttitudes, ...state.cp.tripleCustomAttitudes].includes(value)) return;
  state.cp.tripleCustomAttitudes.push(value); state.cp.tripleAttitudeColors[value] = '#5273cc'; state.cp.tripleAttitude = value; elements.cpTripleAttitudeCustomInput.value = '';
  renderTripleAttitudes(); renderCpDraft();
}

function updateTripleAttitudeColor(color, saveColor = false) {
  if (!state.cp.tripleAttitude) return;
  const normalized = normalizedColor(color); if (saveColor) saveCustomColor(normalized); state.cp.tripleAttitudeColors[state.cp.tripleAttitude] = normalized; renderTripleAttitudes(); renderCpDraft();
}

function renderCpMode() {
  const isSingle = state.cp.selected.length === 1;
  const isTriple = state.cp.selected.length >= 3;
  elements.cpAttitudeArea.hidden = isSingle || isTriple; elements.cpSingleArea.hidden = !isSingle; elements.cpTripleArea.hidden = !isTriple;
  elements.cpSecondStepTitle.innerHTML = isSingle ? '<b>2</b> 选择固定类型' : isTriple ? '<b>2</b> 选择组合类型' : '<b>2</b> 选择个人态度';
  if (isSingle) renderSingleStatuses();
  if (isTriple) { renderTripleStatuses(); renderTripleAttitudes(); }
}

function renderGroupPicker() {
  elements.group.replaceChildren();
  groups.forEach((group) => {
    const button = document.createElement('button'); button.className = 'group-logo-choice'; button.type = 'button'; button.title = group.label; button.setAttribute('aria-label', group.label);
    button.setAttribute('aria-pressed', String(state.group.selected === group.id)); button.append(createGroupLogo(group));
    button.addEventListener('click', () => { state.group.selected = state.group.selected === group.id ? '' : group.id; renderGroupPicker(); renderGroupDraft(); }); elements.group.append(button);
  });
  elements.otherGroupRow.hidden = state.group.selected !== 'other'; elements.otherGroupInput.value = state.group.otherName;
}

function buildDraft(container, ids, attitude, color, type, pairOptions = null) {
  container.replaceChildren(); const ready = type === 'character' || type === 'single' ? ids.length === 1 && attitude : type === 'triple' ? ids.length >= 3 && attitude : ids.length === 2 && attitude;
  const text = !ids.length ? (type === 'character' ? '请选择角色，再选择态度' : '请选择角色；选择一位可设固定类型，选择两位可建立 CP，选择三位可建立组合') : !attitude ? (type === 'single' ? '请选择固定类型，或继续选择第二位建立 CP' : type === 'triple' ? '请选择组合类型' : '请选择个人态度') : type === 'cp' && ids.length < 2 ? '请选择右位头像' : '';
  if (text) { container.textContent = text; container.classList.remove('has-entry'); return; }
  const draft = document.createElement('div'); draft.className = 'draft-entry'; draft.append(entryAvatars(ids, 'draft-avatars', color, pairOptions));
  const tag = document.createElement('span'); tag.className = 'color-attitude'; tag.textContent = attitude; tag.style.setProperty('--entry-color', color); draft.append(tag);
  container.append(draft); container.classList.toggle('has-entry', ready);
}

function renderCharacterDraft() { buildDraft(elements.characterDraft, state.character.selected ? [state.character.selected] : [], state.character.attitude, currentColor('character'), 'character'); elements.confirmCharacter.disabled = !(state.character.selected && state.character.attitude); }

function groupEntryLogos(ids, className, color, names = {}) {
  const logos = document.createElement('span'); logos.className = className;
  ids.forEach((id) => {
    const group = groupById(id); const holder = document.createElement('span'); holder.className = 'group-entry-logo'; holder.style.setProperty('--entry-color', color); holder.append(createGroupLogo(group, names[id])); logos.append(holder);
  });
  return logos;
}

function renderGroupDraft() {
  elements.groupDraft.replaceChildren(); const selected = state.group.selected; const attitude = state.group.attitude;
  const needsName = selected === 'other' && !state.group.otherName.trim();
  if (!selected || !attitude || needsName) { elements.groupDraft.textContent = !selected ? '请选择组合，再选择态度' : needsName ? '请填写其他团体名称' : '请选择组合态度'; elements.groupDraft.classList.remove('has-entry'); elements.confirmGroup.disabled = true; return; }
  const draft = document.createElement('div'); draft.className = 'draft-entry'; draft.append(groupEntryLogos([selected], 'draft-group-logos', currentColor('group'), selected === 'other' ? { other: state.group.otherName.trim() } : {}));
  const tag = document.createElement('span'); tag.className = 'color-attitude'; tag.textContent = attitude; tag.style.setProperty('--entry-color', currentColor('group')); draft.append(tag);
  elements.groupDraft.append(draft); elements.groupDraft.classList.add('has-entry'); elements.confirmGroup.disabled = false;
}

function cpPairOptions(entry = state.cp) {
  return { showSides: !entry.nonDirectional, separator: entry.nonDirectional ? '×' : '→' };
}

function renderCpControls() {
  elements.cpNonDirectional.setAttribute('aria-pressed', String(state.cp.nonDirectional));
  elements.cpSwap.disabled = state.cp.selected.length !== 2;
  elements.cpNonDirectional.disabled = state.cp.selected.length !== 2;
}

function renderCpDraft() {
  const isSingle = state.cp.selected.length === 1; const isTriple = state.cp.selected.length >= 3;
  const label = isSingle ? state.cp.singleStatus : isTriple ? [state.cp.tripleStatus, state.cp.tripleAttitude].filter(Boolean).join(' · ') : state.cp.attitude;
  const color = isSingle ? singleStatusColor() : isTriple ? tripleAttitudeColor() : currentColor('cp');
  const avatarOptions = isSingle ? { noColorBorder: true } : state.cp.selected.length === 2 ? cpPairOptions() : null;
  buildDraft(elements.cpDraft, state.cp.selected, label, color, isSingle ? 'single' : isTriple ? 'triple' : 'cp', avatarOptions);
  elements.confirmCp.disabled = isSingle ? !state.cp.singleStatus : isTriple ? !(state.cp.tripleStatus && state.cp.tripleAttitude) : !(state.cp.selected.length === 2 && state.cp.attitude);
  renderCpControls();
}

function entryAvatars(ids, className, color, pairOptions = null) {
  const avatars = document.createElement('span'); avatars.className = className;
  const isPair = Boolean(pairOptions?.separator); const showSides = pairOptions?.showSides;
  ids.forEach((id, index) => {
    const holder = document.createElement('span'); holder.className = 'entry-avatar'; holder.style.setProperty('--entry-color', color);
    if (pairOptions?.noColorBorder) holder.classList.add('no-color-border');
    if (showSides) holder.dataset.side = index === 0 ? '左' : '右';
    holder.append(createPortrait(characterById(id))); avatars.append(holder);
    if (isPair && index === 0) { const arrow = document.createElement('span'); arrow.className = 'pair-arrow'; arrow.textContent = pairOptions.separator; avatars.append(arrow); }
  });
  return avatars;
}

function cpEntryAvatarOptions(entry) {
  if (entry.characters.length === 1) return { noColorBorder: true };
  if (entry.characters.length === 2) return cpPairOptions(entry);
  return null;
}

function entryVisuals(entry, type, className) {
  return type === 'group' ? groupEntryLogos(entry.characters, className, entry.color, entry.groupNames) : entryAvatars(entry.characters, className, entry.color, type === 'cp' ? cpEntryAvatarOptions(entry) : null);
}

function moveEntry(type, draggedId, targetId) {
  if (!draggedId || draggedId === targetId) return;
  const entries = state[type].entries; const fromIndex = entries.findIndex((entry) => entry.id === draggedId); const toIndex = entries.findIndex((entry) => entry.id === targetId);
  if (fromIndex === -1 || toIndex === -1) return;
  const [entry] = entries.splice(fromIndex, 1); entries.splice(toIndex, 0, entry);
}

function renderEntryList(container, entries, type) {
  container.replaceChildren();
  if (!entries.length) { const empty = document.createElement('p'); empty.className = 'entry-empty'; empty.textContent = '还没有生成词条'; container.append(empty); return; }
  entries.forEach((entry) => {
    const row = document.createElement('div'); row.className = 'generated-entry'; row.dataset.entryId = entry.id;
    const handle = document.createElement('button'); handle.className = 'drag-handle'; handle.type = 'button'; handle.draggable = true; handle.textContent = '⠿'; handle.title = '拖动调整词条顺序'; handle.setAttribute('aria-label', '拖动调整词条顺序');
    handle.addEventListener('dragstart', (event) => { event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', entry.id); row.classList.add('is-dragging'); });
    handle.addEventListener('dragend', () => { container.querySelectorAll('.is-dragging, .drag-over').forEach((item) => item.classList.remove('is-dragging', 'drag-over')); });
    row.addEventListener('dragover', (event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; if (event.currentTarget.dataset.entryId !== event.dataTransfer.getData('text/plain')) row.classList.add('drag-over'); });
    row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
    row.addEventListener('drop', (event) => { event.preventDefault(); const draggedId = event.dataTransfer.getData('text/plain'); moveEntry(type, draggedId, entry.id); renderEntryList(container, state[type].entries, type); renderPreview(); });
    row.append(handle, entryVisuals(entry, type, type === 'group' ? 'entry-group-logos' : 'entry-avatars'));
    const attitude = document.createElement('span'); attitude.className = 'entry-attitude'; attitude.textContent = entry.attitude; attitude.style.setProperty('--entry-color', entry.color); row.append(attitude);
    const remove = document.createElement('button'); remove.className = 'remove-entry-button'; remove.type = 'button'; remove.textContent = '删除';
    remove.addEventListener('click', () => { state[type].entries = state[type].entries.filter((item) => item.id !== entry.id); renderEntryList(container, state[type].entries, type); renderPreview(); });
    row.append(remove); container.append(row);
  });
}

function confirmEntry(type) {
  const item = state[type]; const ids = type === 'character' || type === 'group' ? (item.selected ? [item.selected] : []) : item.selected;
  const isSingle = type === 'cp' && ids.length === 1; const isTriple = type === 'cp' && ids.length >= 3;
  const label = isSingle ? item.singleStatus : isTriple ? [item.tripleStatus, item.tripleAttitude].filter(Boolean).join(' · ') : item.attitude;
  const color = isSingle ? singleStatusColor() : isTriple ? tripleAttitudeColor() : currentColor(type);
  if ((!ids.length || !label) || (type === 'cp' && ids.length < 1) || (type === 'group' && item.selected === 'other' && !item.otherName.trim())) return;
  item.entries.push({ id: entryId(), characters: [...ids], attitude: label, color, ...(type === 'group' && item.selected === 'other' ? { groupNames: { other: item.otherName.trim() } } : {}), ...(type === 'cp' && ids.length === 2 ? { nonDirectional: item.nonDirectional } : {}) });
  item.selected = type === 'cp' ? [] : ''; item.attitude = '';
  if (type === 'character') { renderCharacterPicker(); renderAttitudePicker(type); renderCharacterDraft(); renderEntryList(elements.characterEntryList, item.entries, type); }
  else if (type === 'group') { renderGroupPicker(); renderAttitudePicker(type); renderGroupDraft(); renderEntryList(elements.groupEntryList, item.entries, type); }
  else { item.singleStatus = ''; item.tripleStatus = ''; item.tripleAttitude = ''; renderCpPicker(); renderCpMode(); renderAttitudePicker(type); renderCpDraft(); renderEntryList(elements.cpEntryList, item.entries, type); }
  renderPreview();
}

function renderPreviewEntries(container, entries, type) {
  container.replaceChildren(); if (!entries.length) { const empty = document.createElement('span'); empty.className = 'empty-tag'; empty.textContent = '尚未生成词条'; container.append(empty); return; }
  const renderMergedEntries = (items, target) => {
    const byAttitude = new Map();
    items.forEach((entry) => {
      const matching = byAttitude.get(entry.attitude) || [];
      matching.push(entry); byAttitude.set(entry.attitude, matching);
    });
    byAttitude.forEach((matching, attitude) => {
      const row = document.createElement('div'); row.className = 'preview-entry preview-entry-merged';
      const avatars = document.createElement('span'); avatars.className = 'preview-merged-avatars';
      matching.forEach((entry) => avatars.append(entryVisuals(entry, type, type === 'group' ? 'preview-entry-group-logos' : 'preview-entry-avatars')));
      const tag = document.createElement('span'); tag.className = 'preview-tag color-attitude'; tag.textContent = attitude; tag.style.setProperty('--entry-color', matching[0].color);
      row.append(avatars, tag); target.append(row);
    });
  };
  if (type !== 'cp') { renderMergedEntries(entries, container); return; }
  let hasPreviousGroup = false;
  [1, 2, 'multi'].forEach((count) => {
    const groupEntries = entries.filter((entry) => count === 'multi' ? entry.characters.length >= 3 : entry.characters.length === count); if (!groupEntries.length) return;
    const group = document.createElement('div'); group.className = 'preview-entry-group';
    if (hasPreviousGroup) group.classList.add('preview-entry-group-separated');
    renderMergedEntries(groupEntries, group); container.append(group); hasPreviousGroup = true;
  });
}

function renderPreview() {
  elements.card.className = 'profile-card theme-blue'; elements.cardName.textContent = state.name.trim() || '你的昵称'; elements.cardBio.textContent = state.bio.trim() || '在左侧填写信息，生成属于你的属性卡。';
  renderPreviewEntries(elements.previewCharacter, state.character.entries, 'character'); renderPreviewEntries(elements.previewGroup, state.group.entries, 'group'); renderPreviewEntries(elements.previewCp, state.cp.entries, 'cp');
  elements.cardAvatar.replaceChildren(); if (state.avatar) { const image = document.createElement('img'); image.src = state.avatar; image.alt = '用户头像'; elements.cardAvatar.append(image); } else { const mark = document.createElement('span'); mark.textContent = 'i7'; elements.cardAvatar.append(mark); }
  renderPreviewColorLegend(); renderPreviewNotes(); renderPreviewVisibility();
}

function renderPreviewVisibility() {
  elements.profileHeader.hidden = !state.visibility.personal; elements.profileHeaderDivider.hidden = !state.visibility.personal;
  elements.previewLegendSection.hidden = !state.visibility.legend || !state.colorLegend.length;
  elements.previewCharacterSection.hidden = !state.visibility.character; elements.previewGroupSection.hidden = !state.visibility.group; elements.previewCpSection.hidden = !state.visibility.cp;
  elements.previewNotesSection.hidden = !state.visibility.notes || !state.notes.length;
  elements.visibilityButtons.forEach((button) => button.setAttribute('aria-pressed', String(state.visibility[button.dataset.previewModule])));
}

function renderPreviewNotes() {
  elements.previewNotes.replaceChildren();
  state.notes.forEach((note) => {
    const item = document.createElement('div'); item.className = 'preview-note';
    const title = document.createElement('b'); title.textContent = note.title.trim() || '备注';
    const text = document.createElement('p'); text.textContent = note.text.trim() || '未填写内容'; item.append(title, text); elements.previewNotes.append(item);
  });
}

function renderNotesEditor() {
  elements.notesEditor.replaceChildren();
  state.notes.forEach((note, index) => {
    const item = document.createElement('div'); item.className = 'note-editor-item';
    const heading = document.createElement('span'); heading.className = 'note-editor-index'; heading.textContent = `备注 ${index + 1}`;
    const remove = document.createElement('button'); remove.className = 'remove-entry-button'; remove.type = 'button'; remove.textContent = '删除';
    remove.addEventListener('click', () => { state.notes = state.notes.filter((item) => item.id !== note.id); renderNotesEditor(); renderPreview(); });
    const title = document.createElement('input'); title.type = 'text'; title.maxLength = 24; title.placeholder = '自定义标题（例如：补充说明）'; title.value = note.title;
    title.addEventListener('input', (event) => { note.title = event.target.value; renderPreview(); });
    const text = document.createElement('textarea'); text.maxLength = 160; text.placeholder = '填写备注内容'; text.value = note.text;
    text.addEventListener('input', (event) => { note.text = event.target.value; renderPreview(); });
    const header = document.createElement('div'); header.className = 'note-editor-header'; header.append(heading, remove); item.append(header, title, text); elements.notesEditor.append(item);
  });
}

function addNote() { state.notes.push({ id: entryId(), title: '', text: '' }); renderNotesEditor(); renderPreview(); }

let pendingPngExport = null;

function canvasToExportBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (typeof canvas.toBlob === 'function') {
      canvas.toBlob((blob) => { if (blob) resolve(blob); else reject(new Error('PNG blob unavailable')); }, 'image/png');
      return;
    }
    try {
      const dataUrl = canvas.toDataURL('image/png'); const parts = dataUrl.split(','); const binary = window.atob(parts[1]); const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
      resolve(new Blob([bytes], { type: 'image/png' }));
    } catch (error) { reject(error); }
  });
}

function triggerPngDownload(pending) {
  const url = URL.createObjectURL(pending.blob); const link = document.createElement('a'); link.href = url; link.download = pending.name; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

async function savePendingPngExport() {
  const pending = pendingPngExport; if (!pending) return;
  const canShareFiles = typeof File === 'function' && typeof navigator.share === 'function' && (typeof navigator.canShare !== 'function' || navigator.canShare({ files: [new File([pending.blob], pending.name, { type: 'image/png' })] }));
  if (canShareFiles) {
    try {
      await navigator.share({ files: [new File([pending.blob], pending.name, { type: 'image/png' })], title: 'i7 PROFILE' });
      pendingPngExport = null; elements.exportPng.textContent = '\u5bfc\u51fa PNG'; elements.exportStatus.textContent = '\u5df2\u6253\u5f00\u4fdd\u5b58\u6216\u5206\u4eab\u9762\u677f';
      return;
    } catch (error) {
      if (error && error.name === 'AbortError') { elements.exportStatus.textContent = '\u5df2\u53d6\u6d88\u4fdd\u5b58\uff0c\u53ef\u518d\u6b21\u70b9\u51fb\u201c\u4fdd\u5b58 PNG\u201d'; return; }
    }
  }
  triggerPngDownload(pending); pendingPngExport = null; elements.exportPng.textContent = '\u5bfc\u51fa PNG'; elements.exportStatus.textContent = '\u5df2\u89e6\u53d1 PNG \u4e0b\u8f7d';
}

async function exportPng() {
  if (pendingPngExport) { await savePendingPngExport(); return; }
  if (typeof window.html2canvas !== 'function') { elements.exportStatus.textContent = '\u5bfc\u51fa\u7ec4\u4ef6\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5'; return; }
  elements.exportPng.disabled = true; elements.exportStatus.textContent = '\u6b63\u5728\u751f\u6210 PNG\u2026';
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const width = Math.max(elements.card.scrollWidth, elements.card.offsetWidth, 1); const height = Math.max(elements.card.scrollHeight, elements.card.offsetHeight, 1);
    const maxPixels = 4000000; const maxDimension = 4096; const scale = Math.min(2, Math.sqrt(maxPixels / (width * height)), maxDimension / Math.max(width, height));
    const canvas = await window.html2canvas(elements.card, { backgroundColor: null, scale: scale, useCORS: true, logging: false }); const blob = await canvasToExportBlob(canvas);
    const link = document.createElement('a'); const name = (state.name.trim() || 'i7-profile').replace(/[\\/:*?"<>|]/g, '_');
    pendingPngExport = { blob: blob, name: `${name}-profile.png` }; elements.exportPng.textContent = '\u4fdd\u5b58 PNG'; elements.exportStatus.textContent = scale < 2 ? '\u6761\u76ee\u8f83\u591a\uff0c\u5df2\u4f18\u5316 PNG\uff1b\u8bf7\u518d\u6b21\u70b9\u51fb\u201c\u4fdd\u5b58 PNG\u201d' : 'PNG \u5df2\u751f\u6210\uff0c\u8bf7\u70b9\u51fb\u201c\u4fdd\u5b58 PNG\u201d';
  } catch (error) {
    console.error(error); elements.exportStatus.textContent = '\u5bfc\u51fa\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5';
  } finally { elements.exportPng.disabled = false; }
}

function renderMobileView() {
  elements.workspace.dataset.mobileView = state.mobileView;
  elements.mobileViewButtons.forEach((button) => button.setAttribute('aria-selected', String(button.dataset.workspaceView === state.mobileView)));
}

function reset() {
  state.name = ''; state.bio = ''; state.avatar = ''; state.mobileView = 'editor'; state.visibility = { personal: true, legend: true, character: true, group: true, cp: true, notes: true }; state.colorLegend = []; state.savedColors = []; state.notes = [];
  state.character = { selected: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.character }, entries: [] };
  state.group = { selected: '', otherName: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.group }, entries: [] };
  state.cp = { selected: [], attitude: '', customAttitudes: [], colors: { ...defaultColors.cp }, entries: [], nonDirectional: false, singleStatus: '', singleCustomStatuses: [], singleColors: { ...defaultColors.single }, tripleStatus: '', tripleCustomStatuses: [], tripleColors: { ...defaultColors.triple }, tripleAttitude: '', tripleCustomAttitudes: [], tripleAttitudeColors: { ...defaultColors.cp } };
  elements.nameInput.value = ''; elements.bioInput.value = ''; elements.avatarInput.value = ''; elements.characterCustomInput.value = ''; elements.groupCustomInput.value = ''; elements.cpCustomInput.value = ''; elements.cpSingleCustomInput.value = ''; elements.cpTripleCustomInput.value = ''; elements.cpTripleAttitudeCustomInput.value = '';
  try { localStorage.removeItem(storageKey); } catch (error) { console.warn('无法清空本地资料', error); }
  elements.avatarPreview.hidden = true; elements.avatarPreview.removeAttribute('src'); elements.avatarPlaceholder.hidden = false; renderAll();
}

function renderAll() { renderPersonalFields(); renderCharacterPicker(); renderAttitudePicker('character'); renderCharacterDraft(); renderEntryList(elements.characterEntryList, state.character.entries, 'character'); renderColorLegendEditor(); renderSavedColorButtons(); renderGroupPicker(); renderAttitudePicker('group'); renderGroupDraft(); renderEntryList(elements.groupEntryList, state.group.entries, 'group'); renderCpPicker(); renderCpMode(); renderAttitudePicker('cp'); renderCpDraft(); renderEntryList(elements.cpEntryList, state.cp.entries, 'cp'); renderNotesEditor(); renderPreview(); renderMobileView(); }

elements.nameInput.addEventListener('input', (event) => { state.name = event.target.value; renderPreview(); }); elements.bioInput.addEventListener('input', (event) => { state.bio = event.target.value; renderPreview(); });
elements.otherGroupInput.addEventListener('input', (event) => { state.group.otherName = event.target.value; renderGroupDraft(); });
elements.avatarInput.addEventListener('change', (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.addEventListener('load', () => { state.avatar = reader.result; elements.avatarPreview.src = state.avatar; elements.avatarPreview.hidden = false; elements.avatarPlaceholder.hidden = true; renderPreview(); }); reader.readAsDataURL(file); });
elements.characterColor.addEventListener('input', (event) => updateAttitudeColor('character', event.target.value, true)); elements.groupColor.addEventListener('input', (event) => updateAttitudeColor('group', event.target.value, true)); elements.cpColor.addEventListener('input', (event) => updateAttitudeColor('cp', event.target.value, true)); elements.cpTripleColor.addEventListener('input', (event) => updateTripleAttitudeColor(event.target.value, true));
elements.quickColorButtons.forEach((button) => button.addEventListener('click', () => {
  const { color, colorTarget } = button.dataset;
  applyQuickColor(colorTarget, color);
}));
elements.addCharacterAttitude.addEventListener('click', () => addCustomAttitude('character')); elements.addGroupAttitude.addEventListener('click', () => addCustomAttitude('group')); elements.addCpAttitude.addEventListener('click', () => addCustomAttitude('cp'));
elements.addCpSingleCustom.addEventListener('click', addSingleCustomStatus);
elements.addCpTripleCustom.addEventListener('click', addTripleCustomStatus);
elements.addCpTripleAttitude.addEventListener('click', addTripleCustomAttitude);
elements.characterCustomInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addCustomAttitude('character'); } }); elements.groupCustomInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addCustomAttitude('group'); } }); elements.cpCustomInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addCustomAttitude('cp'); } });
elements.cpSingleCustomInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addSingleCustomStatus(); } });
elements.cpTripleCustomInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addTripleCustomStatus(); } });
elements.cpTripleAttitudeCustomInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addTripleCustomAttitude(); } });
elements.confirmCharacter.addEventListener('click', () => confirmEntry('character')); elements.confirmGroup.addEventListener('click', () => confirmEntry('group')); elements.confirmCp.addEventListener('click', () => confirmEntry('cp'));
elements.cpNonDirectional.addEventListener('click', () => { state.cp.nonDirectional = !state.cp.nonDirectional; renderCpPicker(); renderCpDraft(); });
elements.cpSwap.addEventListener('click', () => { if (state.cp.selected.length !== 2) return; state.cp.selected.reverse(); renderCpPicker(); renderCpDraft(); });
elements.mobileViewButtons.forEach((button) => button.addEventListener('click', () => { state.mobileView = button.dataset.workspaceView; renderMobileView(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
elements.visibilityButtons.forEach((button) => button.addEventListener('click', () => { const module = button.dataset.previewModule; state.visibility[module] = !state.visibility[module]; renderPreviewVisibility(); }));
elements.addNote.addEventListener('click', addNote);
elements.addColorLegend.addEventListener('click', openColorLegendDialog);
elements.cancelColorLegend.addEventListener('click', closeColorLegendDialog);
elements.confirmColorLegend.addEventListener('click', addColorLegend);
elements.legendNoteInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addColorLegend(); } });
elements.exportPng.addEventListener('click', exportPng);
elements.confirmDisclaimer.addEventListener('click', () => { elements.disclaimerDialog.hidden = true; document.body.classList.remove('disclaimer-open'); });
document.querySelector('#resetButton').addEventListener('click', reset);

document.addEventListener('input', persistState);
document.addEventListener('change', persistState);
document.addEventListener('click', () => queueMicrotask(persistState));
document.addEventListener('drop', () => queueMicrotask(persistState));

restoreState();
renderAll();
