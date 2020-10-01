#include <iostream>
#include <map>
#include <math.h>
using namespace std;
 
void calcJumps(map<int,double> &averageJumps, int parsecs, int maxJump) {
 if(parsecs < 1){
   averageJumps[parsecs] = 0;
   return;
 }
 map<int,double>::iterator it_next = averageJumps.find(parsecs - 1);
 if(it_next == averageJumps.end()){
   calcJumps(averageJumps, parsecs - 1, maxJump);
   it_next = averageJumps.find(parsecs - 1);
 }
 map<int,double>::iterator it_last = averageJumps.find(parsecs - maxJump - 1);
 if(it_last == averageJumps.end()){
   calcJumps(averageJumps, parsecs - maxJump - 1, maxJump);
   it_last = averageJumps.find(parsecs - maxJump - 1);
 }
 double average = ((it_next->second * maxJump) - it_last->second + it_next->second) / maxJump;
 averageJumps[parsecs] = average;
}
 
int main() {
 map<int,double> averageJumps;
 int parsecs;
 int maxJump;
 cin >> parsecs >> maxJump;
 averageJumps[1] = 1;
 calcJumps(averageJumps, parsecs, maxJump);
 double average = averageJumps[parsecs];
 double roundedAverage = round(average * 100) / 100.0;
 cout << roundedAverage;
}
