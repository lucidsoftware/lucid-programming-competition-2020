#include <iostream>
#include <vector>

using namespace std;

int main()
{
    int numberBlocks;
    cin >> numberBlocks;
    float length;
    vector<float> lengths;
    float max = 0;
    int maxIndex = 0;
    for(int i = 0; i < numberBlocks; i++) {
        cin >> length;
        if(length > max) {
            max = length;
            maxIndex = i;
        }
        lengths.push_back(length);
    }
    float maxFromLeft = 0;
    float volume = 0;
    for(int i = 0; i < maxIndex; i++) {
        float current = lengths.at(i);
        if(current >= maxFromLeft) {
            maxFromLeft = current;
        } 
        else {
            volume += (maxFromLeft - current);
        }
    }
    float maxFromRight = 0;
    for(int i = numberBlocks - 1; i > maxIndex; i--) {
        float current = lengths.at(i);
        if(current >= maxFromRight) {
            maxFromRight = current;
        } 
        else {
            volume += (maxFromRight - current);
        }
    }
    cout << volume;

    return 0;
}
