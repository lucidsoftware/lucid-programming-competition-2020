def write_test(number, in_str, out_str):
  with open(f'tests/{number:02}.in', 'w') as in_file:
    in_file.write(in_str)
  with open(f'tests/{number:02}.out', 'w') as out_file:
    out_file.write(out_str)


write_test(
  0,
  'just_a_little_antimatter_to_go',
  'just_a_little__to_go',
)

write_test(
  1,
  'more_antiantimattermatter_to_annihilate',
  'more__to_annihilate',
)

write_test(
  2,
  'not_quite_anti_matter',
  'not_quite_anti_matter',
)

write_test(
  3,
  'matter_insantimatteride_antiantimatterantimattermatter_anantimattertiantimattermatantimatterter_other_matter',
  'matter_inside___other_matter',
)

write_test(
  4,
  'antimaantimattertter_iantiantimattermattern_the_begantimatterinning',
  '_in_the_beginning',
)

write_test(
  5,
  'at_the_enantimatterd_there_was_nothiantimatterng_but_antiantimattermatter',
  'at_the_end_there_was_nothing_but_',
)

from collections import deque
import random
for case in range(6, 10):
  size = 10**(case - 5)
  random.seed(case)
  correct_output = 'some_problems_are_hard_some_are_easy_not_sure_which_this_is_' + 'x'*case
  input_deque = deque(correct_output)
  for i in range(size):
    rot = random.randint(0, len(correct_output))
    input_deque.rotate(rot)
    input_deque.extend('antimatter')
    input_deque.rotate(-rot)
  if len(input_deque) > 1_000_000:
    print(f'ERROR: length of input too long. {len(input_deque)} > 1_000_000')
  write_test(
    case,
    "".join(input_deque),
    correct_output,
  )

write_test(
  10,
  'extra_' + 'antimatte'*90000 + 'r'*90000 + 'matter',
  'extra_matter',
)

write_test(
  11,
  'extra_' + 'a'*90000 + 'ntimatter'*90000 + 'matter',
  'extra_matter',
)

