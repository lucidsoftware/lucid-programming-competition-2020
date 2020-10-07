#include <iostream>
#include <vector>
using namespace std;


int main()
{
    int days;
    cin >> days;
    int rock;
    vector<int> vectorA;
    vector<int> vectorB;
    for(int i = 0; i < days; i++) {
        cin >> rock;
        vectorA.push_back(rock);
    }
    for(int i = 0; i < days; i++) {
        cin >> rock;
        vectorB.push_back(rock);
    }
    vector<int> maxVectorA;
    vector<int> maxVectorB;
    maxVectorA.push_back(vectorA.at(0));
    maxVectorA.push_back(vectorA.at(0) + vectorA.at(1));
    maxVectorB.push_back(vectorB.at(0));
    maxVectorB.push_back(vectorB.at(0) + vectorB.at(1));
    for(int i = 2; i < vectorA.size(); i++) {
        maxVectorA.push_back(max(maxVectorB.at(i-2), maxVectorA.at(i-1)) + vectorA.at(i));
        maxVectorB.push_back(max(maxVectorA.at(i-2), maxVectorB.at(i-1)) + vectorB.at(i));
    }
    cout << max(maxVectorA.at(maxVectorA.size() - 1), maxVectorB.at(maxVectorB.size() - 1));
    return 0;
}
