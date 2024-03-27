#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>

struct WordData {
    std::string mainWord;
    std::vector<std::string> searchWords;
};

class WordsDatabase {
public:
    std::unordered_map<std::string, WordData> data;

    WordsDatabase() {
        data = {
            {"lvl_1", {"телефон", {"тело", "енот", "тлен", "лето", "флот"}}},
            {"lvl_2", {"комната", {"канат", "кома", "танк", "нота", "атом"}}},
            {"lvl_3", {"бутылка", {"улыбка", "булка", "латы", "утка", "клуб"}}},
            {"lvl_4", {"аферист", {"арест", "сфера", "тариф", "аист", "тире"}}},
            {"lvl_5", {"кастрюля", {"люстра", "тряска", "салют", "стая", "трюк"}}}
        };
    }
};

int main() {
    WordsDatabase wordsDatabase;

    for (const auto& pair : wordsDatabase.data) {
        std::cout << pair.first << ": ";
        std::cout << pair.second.mainWord << std::endl;
        std::cout << "Search Words: ";
        for (const auto& word : pair.second.searchWords) {
            std::cout << word << ", ";
        }
        std::cout << std::endl;
    }

    return 0;
}