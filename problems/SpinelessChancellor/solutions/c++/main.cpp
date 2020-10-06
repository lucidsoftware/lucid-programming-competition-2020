#include <iostream>
#include <map>
#include <vector>
#include <string>
using namespace std;

int main()
{
    int issues;
    cin >> issues;
    map<string, int> issueVotes;
    vector<string> issuesInOrder;
    string issueName;
    for(int i = 0; i < issues; i++) {
        cin >> issueName;
        issueVotes[issueName] = 0;
        issuesInOrder.push_back(issueName);
    }
    int sheets;
    string answer;
    cin >> sheets;
    for(int i = 0; i < sheets * issues; i++) {
        cin >> issueName;
        cin >> answer;
        if(answer == "yes") {
            issueVotes[issueName] += 1;
        }
        else if(answer == "no") {
            issueVotes[issueName] -= 2;
        }
    }
    for(int i = 0; i < issuesInOrder.size(); i++) {
        issueName = issuesInOrder.at(i);
        int votes = issueVotes[issueName];
        cout << issueName << " ";
            if(votes > 0) {
                cout << "yes" << endl;
            }
            else if(votes < 0) {
                cout << "no" << endl;
            }
            else {
                cout << "abstain" << endl;
            }
    }

    return 0;
}
