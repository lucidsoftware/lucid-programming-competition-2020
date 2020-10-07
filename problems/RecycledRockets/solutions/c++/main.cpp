#include <iostream>
using namespace std;


int main()
{
    int numParts;
    int requiredParts;
    int spareParts;
    int rockets;
    cin >> numParts;
    for(int i = 0; i < numParts; i++) {
        cin >> requiredParts >> spareParts;
        if(i == 0) {
            rockets = spareParts / requiredParts;
        }
        else if(spareParts / requiredParts < rockets) {
            rockets = spareParts / requiredParts;
        }
    }
    cout << rockets;
    return 0;
}
