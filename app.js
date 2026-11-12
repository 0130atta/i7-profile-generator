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
  { id: 'ZOOL.png', label: 'ŹOOĻ', image: 'assets/groups/ZOOL.png' }
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
  name: '', bio: '', avatar: '', mobileView: 'editor', visibility: { personal: true, character: true, group: true, cp: true, notes: true }, notes: [],
  character: { selected: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.character }, entries: [] },
  group: { selected: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.group }, entries: [] },
  cp: { selected: [], attitude: '', customAttitudes: [], colors: { ...defaultColors.cp }, entries: [], nonDirectional: false, singleStatus: '', singleCustomStatuses: [], singleColors: { ...defaultColors.single }, tripleStatus: '', tripleCustomStatuses: [], tripleColors: { ...defaultColors.triple }, tripleAttitude: '', tripleCustomAttitudes: [], tripleAttitudeColors: { ...defaultColors.cp } }
};

const elements = {
  character: document.querySelector('#characterChips'), characterAttitudes: document.querySelector('#characterAttitudeChips'),
  characterColor: document.querySelector('#characterColorInput'), characterCustomInput: document.querySelector('#characterAttitudeCustomInput'),
  addCharacterAttitude: document.querySelector('#addCharacterAttitudeButton'), characterDraft: document.querySelector('#characterDraftPreview'),
  confirmCharacter: document.querySelector('#confirmCharacterButton'), characterEntryList: document.querySelector('#characterEntryList'),
  group: document.querySelector('#groupChips'), groupAttitudes: document.querySelector('#groupAttitudeChips'), groupColor: document.querySelector('#groupColorInput'), groupCustomInput: document.querySelector('#groupAttitudeCustomInput'), addGroupAttitude: document.querySelector('#addGroupAttitudeButton'), groupDraft: document.querySelector('#groupDraftPreview'), confirmGroup: document.querySelector('#confirmGroupButton'), groupEntryList: document.querySelector('#groupEntryList'), cpCharacters: document.querySelector('#cpCharacterPicker'),
  cpNonDirectional: document.querySelector('#cpNonDirectionalToggle'), cpSwap: document.querySelector('#cpSwapButton'), cpSecondStepTitle: document.querySelector('#cpSecondStepTitle'), cpAttitudeArea: document.querySelector('#cpAttitudeArea'), cpSingleArea: document.querySelector('#cpSingleArea'), cpSingleStatuses: document.querySelector('#cpSingleStatusChips'), cpSingleCustomInput: document.querySelector('#cpSingleCustomInput'), addCpSingleCustom: document.querySelector('#addCpSingleCustomButton'), cpTripleArea: document.querySelector('#cpTripleArea'), cpTripleStatuses: document.querySelector('#cpTripleStatusChips'), cpTripleCustomInput: document.querySelector('#cpTripleCustomInput'), addCpTripleCustom: document.querySelector('#addCpTripleCustomButton'), cpTripleAttitudes: document.querySelector('#cpTripleAttitudeChips'), cpTripleColor: document.querySelector('#cpTripleColorInput'), cpTripleAttitudeCustomInput: document.querySelector('#cpTripleAttitudeCustomInput'), addCpTripleAttitude: document.querySelector('#addCpTripleAttitudeButton'),
  cpAttitudes: document.querySelector('#cpPreferenceChips'), cpColor: document.querySelector('#cpColorInput'),
  cpCustomInput: document.querySelector('#cpAttitudeCustomInput'), addCpAttitude: document.querySelector('#addCpAttitudeButton'),
  cpDraft: document.querySelector('#cpEntryOutput'), confirmCp: document.querySelector('#generateCpButton'), cpEntryList: document.querySelector('#cpEntryList'),
  nameInput: document.querySelector('#nameInput'), bioInput: document.querySelector('#bioInput'),
  avatarInput: document.querySelector('#avatarInput'), avatarPreview: document.querySelector('#avatarPreview'), avatarPlaceholder: document.querySelector('#avatarPlaceholder'),
  card: document.querySelector('#profileCard'), cardName: document.querySelector('#cardName'), cardBio: document.querySelector('#cardBio'), cardAvatar: document.querySelector('#cardAvatar'),
  previewCharacter: document.querySelector('#previewCharacter'), previewGroup: document.querySelector('#previewGroup'), previewCp: document.querySelector('#previewCp'),
  workspace: document.querySelector('.workspace'), mobileViewButtons: document.querySelectorAll('[data-workspace-view]'),
  visibilityButtons: document.querySelectorAll('[data-preview-module]'), notesEditor: document.querySelector('#notesEditor'), addNote: document.querySelector('#addNoteButton'),
  profileHeader: document.querySelector('#profileHeader'), profileHeaderDivider: document.querySelector('#profileHeaderDivider'), previewCharacterSection: document.querySelector('#previewCharacterSection'), previewGroupSection: document.querySelector('#previewGroupSection'), previewCpSection: document.querySelector('#previewCpSection'), previewNotesSection: document.querySelector('#previewNotesSection'), previewNotes: document.querySelector('#previewNotes')
};

function characterById(id) { return characters.find((character) => character.id === id); }
function groupById(id) { return groups.find((group) => group.id === id); }
function createPortrait(character) { const image = document.createElement('img'); image.src = character.image; image.alt = character.label; return image; }
function createGroupLogo(group) { const image = document.createElement('img'); image.src = group.image; image.alt = group.label; return image; }
function entryId() { return `${Date.now()}-${Math.random()}`; }

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

function updateAttitudeColor(section, color) {
  const item = state[section]; if (!item.attitude) return;
  item.colors[item.attitude] = color; renderAttitudePicker(section);
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

function updateTripleAttitudeColor(color) {
  if (!state.cp.tripleAttitude) return;
  state.cp.tripleAttitudeColors[state.cp.tripleAttitude] = color; renderTripleAttitudes(); renderCpDraft();
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

function groupEntryLogos(ids, className, color) {
  const logos = document.createElement('span'); logos.className = className;
  ids.forEach((id) => {
    const holder = document.createElement('span'); holder.className = 'group-entry-logo'; holder.style.setProperty('--entry-color', color); holder.append(createGroupLogo(groupById(id))); logos.append(holder);
  });
  return logos;
}

function renderGroupDraft() {
  elements.groupDraft.replaceChildren(); const selected = state.group.selected; const attitude = state.group.attitude;
  if (!selected || !attitude) { elements.groupDraft.textContent = !selected ? '请选择组合，再选择态度' : '请选择组合态度'; elements.groupDraft.classList.remove('has-entry'); elements.confirmGroup.disabled = true; return; }
  const draft = document.createElement('div'); draft.className = 'draft-entry'; draft.append(groupEntryLogos([selected], 'draft-group-logos', currentColor('group')));
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
  return type === 'group' ? groupEntryLogos(entry.characters, className, entry.color) : entryAvatars(entry.characters, className, entry.color, type === 'cp' ? cpEntryAvatarOptions(entry) : null);
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
  if ((!ids.length || !label) || (type === 'cp' && ids.length < 1)) return;
  item.entries.push({ id: entryId(), characters: [...ids], attitude: label, color, ...(type === 'cp' && ids.length === 2 ? { nonDirectional: item.nonDirectional } : {}) });
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
  renderPreviewNotes(); renderPreviewVisibility();
}

function renderPreviewVisibility() {
  elements.profileHeader.hidden = !state.visibility.personal; elements.profileHeaderDivider.hidden = !state.visibility.personal;
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

function renderMobileView() {
  elements.workspace.dataset.mobileView = state.mobileView;
  elements.mobileViewButtons.forEach((button) => button.setAttribute('aria-selected', String(button.dataset.workspaceView === state.mobileView)));
}

function reset() {
  state.name = ''; state.bio = ''; state.avatar = ''; state.mobileView = 'editor'; state.visibility = { personal: true, character: true, group: true, cp: true, notes: true }; state.notes = [];
  state.character = { selected: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.character }, entries: [] };
  state.group = { selected: '', attitude: '', customAttitudes: [], colors: { ...defaultColors.group }, entries: [] };
  state.cp = { selected: [], attitude: '', customAttitudes: [], colors: { ...defaultColors.cp }, entries: [], nonDirectional: false, singleStatus: '', singleCustomStatuses: [], singleColors: { ...defaultColors.single }, tripleStatus: '', tripleCustomStatuses: [], tripleColors: { ...defaultColors.triple }, tripleAttitude: '', tripleCustomAttitudes: [], tripleAttitudeColors: { ...defaultColors.cp } };
  elements.nameInput.value = ''; elements.bioInput.value = ''; elements.avatarInput.value = ''; elements.characterCustomInput.value = ''; elements.groupCustomInput.value = ''; elements.cpCustomInput.value = ''; elements.cpSingleCustomInput.value = ''; elements.cpTripleCustomInput.value = ''; elements.cpTripleAttitudeCustomInput.value = '';
  elements.avatarPreview.hidden = true; elements.avatarPreview.removeAttribute('src'); elements.avatarPlaceholder.hidden = false; renderAll();
}

function renderAll() { renderCharacterPicker(); renderAttitudePicker('character'); renderCharacterDraft(); renderEntryList(elements.characterEntryList, state.character.entries, 'character'); renderGroupPicker(); renderAttitudePicker('group'); renderGroupDraft(); renderEntryList(elements.groupEntryList, state.group.entries, 'group'); renderCpPicker(); renderCpMode(); renderAttitudePicker('cp'); renderCpDraft(); renderEntryList(elements.cpEntryList, state.cp.entries, 'cp'); renderNotesEditor(); renderPreview(); renderMobileView(); }

elements.nameInput.addEventListener('input', (event) => { state.name = event.target.value; renderPreview(); }); elements.bioInput.addEventListener('input', (event) => { state.bio = event.target.value; renderPreview(); });
elements.avatarInput.addEventListener('change', (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.addEventListener('load', () => { state.avatar = reader.result; elements.avatarPreview.src = state.avatar; elements.avatarPreview.hidden = false; elements.avatarPlaceholder.hidden = true; renderPreview(); }); reader.readAsDataURL(file); });
elements.characterColor.addEventListener('input', (event) => updateAttitudeColor('character', event.target.value)); elements.groupColor.addEventListener('input', (event) => updateAttitudeColor('group', event.target.value)); elements.cpColor.addEventListener('input', (event) => updateAttitudeColor('cp', event.target.value)); elements.cpTripleColor.addEventListener('input', (event) => updateTripleAttitudeColor(event.target.value));
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
document.querySelector('#resetButton').addEventListener('click', reset);

renderAll();
