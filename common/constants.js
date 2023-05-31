export const referenceForm = {
  form_name: {
    id: '', // Number
    name: '',
    type: '',
    object_type: '',
    loaded: '',
    resume: '',
    closed: '',
    scan_event: '',
    elements: [], // Array
    methods: {},
  },
}
export const referencePrimitiveList = [
  {
    id: '',
    type: 'layout',
    grouping: 'vertical',
    appearance: 'tablet',
    alignment: 'left',
    elements: [],
  },
  {
    id: '',
    type: 'input',
    sourceData: '',
    label: 'Описание',
    labelPosition: 'bottom',
    alignment: 'left',
    defaultText: 'Основной текст ввода',
    fontStyle: 'regular',
  },
  {
    id: '',
    type: 'label',
    sourceData: '',
    label: 'Описание',
    labelPosition: 'bottom',
    alignment: 'left',
    defaultText: 'Основной текст',
    fontStyle: 'regular',
  },
  {
    id: '',
    type: 'button',
    sourceData: '',
    label: '',
    style: '',
    click: '',
  },
  {
    id: '',
    type: 'separator',
  },
]
export const referenceFormStyle = {
  compactFontSize: 12,
  compactFontColor: '#000000',
  regularFontSize: 16,
  regularFontColor: '#000000',
  strongFontSize: 26,
  strongFontColor: '#000000',
  cornerStyle: 'semi',
  colorTheme: '#0971c7',
  background: '',
  backgroundColor: '#ffffff',
}
export const referencePrimitivesSetting = {
  commonSetting: {
    fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
  },
  button: {
    cornerStyle: [
      { name: 'Rounded', value: 'round' },
      { name: 'Crisp', value: 'none' },
      { name: 'Semi', value: 'semi' },
    ],
  },
  label: {
    positions: [
      { position: 'none', name: 'Нет' },
      { position: 'left', name: 'Слева' },
      { position: 'top', name: 'Сверху' },
      { position: 'bottom', name: 'Снизу' },
      { position: 'right', name: 'Справа' },
    ],
    alignment: [
      { position: 'left', name: 'Слева' },
      { position: 'center', name: '' },
      { position: 'right', name: 'Справа' },
    ],
    fontStyle: [
      { style: 'compact', name: 'Мелкий текст' }, // compactFontSize
      { style: 'regular', name: 'Обычный текст' }, // regularFontSize
      { style: 'strong', name: 'Большой текст' }, // strongFontSize
    ],
  },
  input: {
    positions: [
      { position: 'none', name: 'Нет' },
      { position: 'left', name: 'Слева' },
      { position: 'top', name: 'Сверху' },
      { position: 'bottom', name: 'Снизу' },
      { position: 'right', name: 'Справа' },
    ],
    alignment: [
      { position: 'left', name: 'Слева' },
      { position: 'center', name: '' },
      { position: 'right', name: 'Справа' },
    ],
    fontStyle: [
      { style: 'compact', name: 'Мелкий текст' }, // compactFontSize
      { style: 'regular', name: 'Обычный текст' }, // regularFontSize
      { style: 'strong', name: 'Большой текст' }, // strongFontSize
    ],
  },
  layout: {
    grouping: [
      { group: 'vertical', name: 'В колонку' },
      { group: 'horizontal', name: 'В ряд' },
    ],
    appearance: [
      { view: 'tablet', name: 'Обведенный' },
      { view: 'separated', name: 'С разделителями' },
      { view: 'none', name: 'Нет' },
    ],
    alignment: [
      { position: 'left', name: 'Прижать влево' },
      { position: 'center', name: 'По центру' },
      { position: 'right', name: 'Прижать вправо' },
    ],
  },
}
export const referenceLayout = {
  id: '',
  type: 'layout',
  grouping: 'vertical',
  appearance: 'tablet',
  alignment: 'left',
  elements: [],
}
export const referenceButton = {
  id: '',
  type: 'button',
  sourceData: '',
  label: '',
  style: '',
  click: '',
}
export const referenceLabel = {
  id: '',
  type: 'label',
  sourceData: '',
  label: 'Описание',
  labelPosition: 'bottom',
  alignment: 'left',
  defaultText: 'Текстовый элемент',
  fontStyle: 'regular',
}
export const referenceInput = {
  id: '',
  type: 'input',
  sourceData: '',
  label: 'Описание',
  labelPosition: 'bottom',
  alignment: 'left',
  defaultText: 'Текстовый элемент',
  fontStyle: 'regular',
}
export const referenceSeparator = {
  id: '',
  type: 'separator',
}

export default {
  referencePrimitiveList,
  referenceFormStyle,
  referencePrimitivesSetting,
  referenceForm,
  referenceLayout,
  referenceButton,
  referenceLabel,
  referenceSeparator,
}
