#include <iostream>
using namespace std;
 
int interior(int width, int height) {
    return (width - 2) * (height - 2);
}

int exterior(int width, int height) {
    return (width * 2) + (height * 2) - 4;
}

double calcRatio(int width, int height) {
    return (exterior(width, height) * 1.0) / ((exterior(width, height) * 1.0) + (interior(width, height) * 1.0));
}

int numberOfRooms(int width, int height) {
  return width * height;
}

int findMostRooms(int goalPercent) {
    float goal = goalPercent / 100.0;
    int width = 3;
    int height = 3;
    float ratio = calcRatio(width, height);
    while(ratio > goal) {
        width++;
        height++;
        ratio = calcRatio(width, height);
    }
    if(ratio == goal){
        return numberOfRooms(width, height);
    }
    while(ratio != goal) {
        if(ratio < goal) {
            height--;
        } else if (ratio > goal) {
            width++;
        }
        ratio = calcRatio(width, height);
    }
    return numberOfRooms(width, height);
}
int main()
{
    int goal;
    cin >> goal;
    int rooms = findMostRooms(goal);
    cout << rooms;
    return 0;
}
