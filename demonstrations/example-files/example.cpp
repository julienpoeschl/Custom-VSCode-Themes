#include <iostream>
#include <vector>
using namespace std;

class Greeter {
public:
    string name;
    Greeter(string n) : name(n) {}
    void greet() {
        cout << "Hello, " << name << "!\n";
    }
};

int main() {
    Greeter g("World");
    g.greet();

    vector<int> v = {1, 2, 3};
    for (int x : v) {
        cout << x << "\n";
    }

    return 0;
}
