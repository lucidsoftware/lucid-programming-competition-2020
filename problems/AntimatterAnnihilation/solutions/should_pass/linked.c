#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_INPUT_SIZE 1000000
#define LIST_SIZE (MAX_INPUT_SIZE+1)
#define MATCH_STRING "antimatter"

typedef struct Node {
  char c;
  size_t next;
} Node;

char full_match[] = MATCH_STRING;

// Important that this uses tail recursion. Otherwise, we would overflow the stack before we can finish.
void remove_match(Node list[LIST_SIZE], size_t start, char* match, size_t begin) {
  if (match[0] == '\0') {
    list[begin].next = start;
  } else {
    if (list[list[start].next].c == full_match[0]) {
      remove_match(list, list[start].next, full_match, start);
    }
    if (list[start].c == match[0]) {
      remove_match(list, list[start].next, match+1, begin);
    }
  }
}

void remove_antimatter(Node list[LIST_SIZE], size_t start) {
  size_t current = start;
  while (list[current].c != '\0') {
    size_t next = list[current].next;
    if (list[next].c == full_match[0]) {
      remove_match(list, next, full_match, current);
    }
    current = next;
  }
}

int main() {
  char* src = malloc((MAX_INPUT_SIZE) * sizeof(char));
  char* result = malloc((MAX_INPUT_SIZE) * sizeof(char));
  memset(src, 0, MAX_INPUT_SIZE);
  if (fgets(src, MAX_INPUT_SIZE, stdin) == 0) {
    printf("Failed to read line.\n");
  }
  Node* list = malloc(LIST_SIZE * sizeof(Node));
  list[0].c = 'B';
  list[0].next = 1;
  size_t i;
  for(i = 0; src[i] != '\0' && i < MAX_INPUT_SIZE; ++i) {
    list[i+1].c = src[i];
    list[i+1].next = i+2;
  }
  list[i+1].c = '\0';
  list[i+1].next = 0;

  remove_antimatter(list, 0);
  size_t from = list[0].next;
  size_t to = 0;
  while (list[from].next != 0 && from < LIST_SIZE && to < MAX_INPUT_SIZE) {
    result[to] = list[from].c;
    to += 1;
    from = list[from].next;
  }
  result[to] = '\0';
  printf("%s\n", result);
}