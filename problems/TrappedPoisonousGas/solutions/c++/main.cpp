#include <iostream>
#include <vector>

using namespace std;

int main()
{
    int numberBlocks;
    cin >> numberBlocks;
    int length;
    vector<int> lengths;
    int max = 0;
    int maxIndex = 0;
    for(int i = 0; i < numberBlocks; i++) {
        cin >> length;
        if(length > max) {
            max = length;
            maxIndex = i;
        }
        lengths.push_back(length);
    }
    int maxFromLeft = 0;
    int volume = 0;
    for(int i = 0; i < maxIndex; i++) {
        int current = lengths.at(i);
        if(current >= maxFromLeft) {
            maxFromLeft = current;
        } 
        else {
            volume += (maxFromLeft - current);
        }
    }
    int maxFromRight = 0;
    for(int i = numberBlocks - 1; i > maxIndex; i--) {
        int current = lengths.at(i);
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
