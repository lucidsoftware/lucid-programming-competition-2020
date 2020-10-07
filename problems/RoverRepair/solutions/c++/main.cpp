#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <bits/stdc++.h>
using namespace std;

struct node {
    int number;
    node* left;
    node* right;
};

void print(vector<int> numbers) {
    for(int i = 0; i < numbers.size(); i++){
        cout << numbers.at(i) << " ";
    }
}

void orderTree(vector<int> &almostOrdered, vector<int> &ordered, node* head) {
    if(head == NULL){
        return;
    }
    orderTree(almostOrdered, ordered, head->left);
    ordered.push_back(head->number);
    almostOrdered.push_back(head->number);
    orderTree(almostOrdered, ordered, head->right);
}

int main()
{
    int numNodes;
    cin >> numNodes;
    string nodeString;
    vector<node*> nodes;
    node* parent = NULL;
    node* head = NULL;
    for(int i = 0; i < numNodes; i++) {
        node* nextNode = NULL;
        cin >> nodeString;
        if(nodeString == "empty") {
            //Stay NULL
        }
        else {
            nextNode = new node();
            nextNode->left = NULL;
            nextNode->right = NULL;
            nextNode->number = stoi(nodeString);
        }
        nodes.push_back(nextNode);
        if(i != 0) {
            if(i % 2 == 1) {
                parent = nodes.at(0);
                nodes.erase(nodes.begin());
                if(parent != NULL){
                    parent->left = nextNode;
                }
            }
            else {
                if(parent != NULL){
                    parent->right = nextNode;
                }
            }
        }
        else {
            head = nextNode;
        }
    }
    vector<int> ordered;
    vector<int> almostOrdered;
    orderTree(almostOrdered, ordered, head);
    
    sort(ordered.begin(), ordered.end());
    for(int i = 0; i < ordered.size(); i++) {
        if(ordered.at(i) != almostOrdered.at(i)) {
            if(ordered.at(i) < almostOrdered.at(i)){
                cout << "Swap nodes " << ordered.at(i) << " and " << almostOrdered.at(i);
            }
            else {
                cout << "Swap nodes " << almostOrdered.at(i) << " and " << ordered.at(i);
            }
            return 0;
        }
    }
    cout << "you have failed" << endl;
    return 0;
}
