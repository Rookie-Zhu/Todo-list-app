#include <iostream>
#include <vector>

void showBalance(double balance);
double deposit();
double withdraw(double balance);
int main() {
    int age;
    std::cout << "Enter your age: ";
    std::cin >> age;

    if(age >= 18){
        std::cout << "Welcome to the side!";
    }
    else{
        std::cout << "You are not old enough to enter!";
    }
}

class Solution{
public:
    int search(std::vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int middle = left + ((right-left)/2);
            if (nums[middle]>target){
                right = middle -1;
            } else if (nums[middle]<target){
                left = middle + 1;
            } else{
                return middle;
            }
        }
        return -1;
            }
};