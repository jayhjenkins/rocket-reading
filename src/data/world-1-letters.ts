import { Item } from '../types'

export const WORLD_1_LETTERS: Item[] = [
  // Slice 1 letters (already seeded)
  { id: 'letter_m', type: 'letter', content: 'm', world: 1, metadata: { phonics_coverage: ['m'] } },
  { id: 'letter_a', type: 'letter', content: 'a', world: 1, metadata: { phonics_coverage: ['a'] } },
  { id: 'letter_t', type: 'letter', content: 't', world: 1, metadata: { phonics_coverage: ['t'] } },
  { id: 'letter_s', type: 'letter', content: 's', world: 1, metadata: { phonics_coverage: ['s'] } },
  { id: 'letter_i', type: 'letter', content: 'i', world: 1, metadata: { phonics_coverage: ['i'] } },

  // NEW letters for Slice 2
  { id: 'letter_p', type: 'letter', content: 'p', world: 1, metadata: { phonics_coverage: ['p'] } },
  { id: 'letter_n', type: 'letter', content: 'n', world: 1, metadata: { phonics_coverage: ['n'] } },
  { id: 'letter_o', type: 'letter', content: 'o', world: 1, metadata: { phonics_coverage: ['o'] } },
  { id: 'letter_e', type: 'letter', content: 'e', world: 1, metadata: { phonics_coverage: ['e'] } },
  { id: 'letter_r', type: 'letter', content: 'r', world: 1, metadata: { phonics_coverage: ['r'] } },
  { id: 'letter_d', type: 'letter', content: 'd', world: 1, metadata: { phonics_coverage: ['d'] } },
  { id: 'letter_h', type: 'letter', content: 'h', world: 1, metadata: { phonics_coverage: ['h'] } },
  { id: 'letter_l', type: 'letter', content: 'l', world: 1, metadata: { phonics_coverage: ['l'] } },
]

export const WORLD_1_LETTER_SOUNDS: Record<string, string> = {
  'm': '/mmm/',
  'a': '/aaa/',
  't': '/t/',
  's': '/sss/',
  'i': '/iii/',
  'p': '/p/',
  'n': '/nnn/',
  'o': '/ooo/',
  'e': '/eee/',
  'r': '/rrr/',
  'd': '/d/',
  'h': '/hhh/',
  'l': '/lll/',
}
