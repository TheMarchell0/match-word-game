#include <iostream>
#include <string>
#include <vector>

std::string filterFindWords(const std::vector<std::string>& searchWordList, const std::vector<std::string>& findWordsList) {
    std::string notFoundWordsList;

    if (findWordsList.size() > 0) {
        std::vector<std::string> tempNotFoundWordsList;
        for (const auto& word : searchWordList) {
            bool found = false;
            for (const auto& findWord : findWordsList) {
                if (word == findWord) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                tempNotFoundWordsList.push_back(word);
            }
        }

        if (!tempNotFoundWordsList.empty()) {
            notFoundWordsList = tempNotFoundWordsList[0];
        }
    } else {
        notFoundWordsList = searchWordList[0];
    }

    return notFoundWordsList;
}