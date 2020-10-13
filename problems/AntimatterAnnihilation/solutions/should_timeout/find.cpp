#include <iostream>
#include <string>
#include <algorithm>

std::string match = "antimatter";

void removeAllAntimatter(std::string& s) {
  int n = match.length();
  std::string::size_type i = s.find(match, 0);
  while(i != std::string::npos) {
    s.erase(i, n);
    i = std::max(0, (int) i-n);
    i = s.find(match, i);
  }
}

int main() {
  std::string line;
  std::cin >> line;
  removeAllAntimatter(line);
  std::cout << line;
}
