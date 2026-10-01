/**
 * Ask Lin — example questions shown as starter chips in the chat panel.
 * Questions only: clicking one sends it to Lina like any typed question.
 */

const EXAMPLE_QUESTIONS = [
  {
    id: 'foreign-gift',
    en: 'My parents sent me money from overseas. Do I need to pay tax on it?',
    'zh-tw': '父母從海外匯錢給我，需要繳稅嗎？',
  },
  {
    id: 'fbar',
    en: 'I have a bank account in Taiwan. Do I need to file an FBAR?',
    'zh-tw': '我有台灣銀行帳戶，需要申報 FBAR 嗎？',
  },
  {
    id: 'llc-vs-scorp',
    en: 'What’s the difference between an LLC and an S-Corp?',
    'zh-tw': 'LLC 和 S-Corp 有什麼不同？',
  },
  {
    id: 'cp2000',
    en: 'I received an IRS CP2000 notice. What should I do?',
    'zh-tw': '我收到 IRS CP2000，該怎麼辦？',
  },
]

module.exports = { EXAMPLE_QUESTIONS }
