#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>

struct GoldCountData {
    int goldCount;
    int goldIncreaseIterationCount;
};

class GoldCounter {
public:
    GoldCountData data;

    GoldCounter() {
        data = {0, 0};
    }

    void changeGoldCount(const std::string& changeType) {
        if (changeType != "increase" && changeType != "decrease_first_letter" &&
            changeType != "decrease_letter_count" && changeType != "decrease_max") {
            std::cout << "Неверный тип изменения" << std::endl;
            return;
        }

        int number = 0;
        if (changeType == "increase") {
            number = 10;
        } else if (changeType == "decrease_first_letter") {
            number = 3;
        } else if (changeType == "decrease_letter_count") {
            number = 5;
        } else if (changeType == "decrease_max") {
            number = 10;
        }

        if (data.goldCount - number <= -1 && changeType.find("decrease") != std::string::npos) {
            std::cout << "not enough count" << std::endl;
            return;
        }

        for (int i = 0; i < number; ++i) {
            if (changeType == "increase") {
                data.goldCount++;
            } else {
                data.goldCount--;
            }
            data.goldIncreaseIterationCount++;
        }
    }
};