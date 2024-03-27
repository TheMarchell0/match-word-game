#include <iostream>
#include <string>

void useHelper(std::string selector, std::string word) {
    std::string result;

    if (selector == "js-helper-show-letter-text") {
        result = word[0];
        result[0] = std::toupper(result[0]);
    } else if (selector == "js-helper-show-letters-length-text") {
        result = std::to_string(word.length());
    } else if (selector == "js-helper-show-full-word-text") {
        result = word;
        for (char &c : result) {
            c = std::toupper(c);
        }
    } else {
        std::cout << "Неверный тип изменения" << std::endl;
        return;
    }

    std::cout << result << std::endl;
}