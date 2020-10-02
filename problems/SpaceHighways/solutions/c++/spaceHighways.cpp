#include <iostream>
#include <set>
#include <vector>
#include <string>
using namespace std;
 
struct edge {
  string planet1;
  string planet2;
  int cost;
} ;
 
int calcCost(vector<edge> edges) {
  int totalCost = 0;
  for(int i = 0; i < edges.size(); i++) {
    totalCost += edges.at(i).cost;
  }
  return totalCost;
}
 
 // This function is for extra speed - we may not require this
void putEdgeInOrder(edge newEdge, vector<edge> &orderedEdges) {
  if(orderedEdges.size() == 0){
    orderedEdges.push_back(newEdge);
    return;
  }
  int newCost = newEdge.cost;
  int lowerBound = 0;
  int upperBound = orderedEdges.size() - 1;
  if(orderedEdges.at(upperBound).cost <= newCost){
    orderedEdges.push_back(newEdge);
    return;
  }
  if(orderedEdges.at(lowerBound).cost >= newCost){
    orderedEdges.insert(orderedEdges.begin(), newEdge);
    return;
  }
  int nextIndexToTry = (upperBound + lowerBound) / 2;
  while(upperBound - lowerBound > 1) {
    if(orderedEdges.at(nextIndexToTry).cost > newCost) {
      upperBound = nextIndexToTry;
    }
    else if(orderedEdges.at(nextIndexToTry).cost < newCost) {
      lowerBound = nextIndexToTry;
    }
    else {
      upperBound = nextIndexToTry + 1;
      lowerBound = nextIndexToTry;
    }
    nextIndexToTry = (upperBound + lowerBound) / 2;
  }
  orderedEdges.insert(orderedEdges.begin() + upperBound, newEdge);
}
 
void addNextEdge(set<string> &usedPlanets, vector<edge> &orderedEdges, vector<edge> &usedEdges) {
  if(usedPlanets.size() == 0) {
    usedEdges.push_back(orderedEdges.at(0));
    usedPlanets.insert(orderedEdges.at(0).planet1);
    usedPlanets.insert(orderedEdges.at(0).planet2);
    orderedEdges.erase(orderedEdges.begin());
    return;
  }
  for (int i = 0; i < orderedEdges.size(); i++){
    edge nextEdge = orderedEdges.at(i);
    set<string>::iterator planet1It = usedPlanets.find(nextEdge.planet1);
    set<string>::iterator planet2It = usedPlanets.find(nextEdge.planet2);
    if(planet1It == usedPlanets.end() && planet2It == usedPlanets.end()) {
      //Skip for now
    }
    else if(planet1It != usedPlanets.end() && planet2It != usedPlanets.end()) {
      orderedEdges.erase(orderedEdges.begin() + i);
      i--;
    }
    else {
      usedPlanets.insert(nextEdge.planet1);
      usedPlanets.insert(nextEdge.planet2);
      usedEdges.push_back(nextEdge);
      return;
    }
  }
  return;
}
 
int main() {
  int planetNumber;
  int edgeNumber;
  cin >> planetNumber >> edgeNumber;
  string planetName;
  set<string> planetNames;
  set<string> usedPlanets;
  vector<edge> edges;
  vector<edge> usedEdges;
  for(int i = 0; i < planetNumber; i++) {
    cin >> planetName;
    planetNames.insert(planetName);
  }
  string planetName1;
  string planetName2;
  int cost;
  edge highway;
  for(int i = 0; i < edgeNumber; i++) {
    cin >> planetName1 >> planetName2 >> cost;
    highway.planet1 = planetName1;
    highway.planet2 = planetName2;
    highway.cost = cost;
    putEdgeInOrder(highway, edges);
  }
  while(usedPlanets.size() < planetNumber){
    addNextEdge(usedPlanets, edges, usedEdges);
  }
  cout << calcCost(usedEdges);
  return 0;
}
