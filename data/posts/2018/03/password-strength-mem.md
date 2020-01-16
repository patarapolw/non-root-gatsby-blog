---
title: An Analysis on Password Strength vs. Memorability
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgSYPCYNS5GZ9ec5BU2WDjn9YbZ1F2nEGABnZAhXZtSUkikTjg
date: 2018-03-02
tag:
  - password
  - nltk
---

As I am creating [memorable-password](https://github.com/patarapolw/memorable-password) project, I am challenged on whether diceware-type passwords / memorable passwords are really strong.

I learnt about Entropy and created (actually updated an old project) [passwordstrength](https://github.com/patarapolw/passwordstrength).

I formularized the concept on memorability based on pronounceability with NLTK and double metaphone -- [pronounceable](https://github.com/patarapolw/pronounceable).

[Here](https://github.com/patarapolw/memorable-password/tree/master/analysis) is the result.

<!-- excerpt_separator -->

## Random characters

Typically created by a password generator. PIN, although often not created by a password generator also falls into this category.

- strength (entropy): 
  - length=10: Worst: 49.0044, 50.9478, 52.0044; Best: 59.8346, 59.8346, 60.7781
  - length=15: Worst: 76.4500, 78.3934, 78.3934; Best: 91.1671, 91.1671, 93.0539 
- complexity: 
  - length=10: Best: 0.40, 0.40, 0.40; Worst: 13.40, 15.20, 16.20
  - length=15: Best: 3.13, 3.60, 3.67; Worst: 18.87, 18.93, 20.00 

Complexity > 10 is deemed hard to remember. Entropy < 70 is a weak password.

## Diceware passwords

Common words are usually chosen, making it susceptible to dictionary attack. I have found a common word list, based on Google.

### Simple, readable words. No upper-case/ modifications.

- strength: 
  - number_of_words=4: Worst: 81.9075, 81.9075, 81.9075; Best: 161.8150, 171.2158, 190.0176
  - number_of_words=6: Worst: 100.7092, 124.2114, 138.3128; Best: 241.7224, 251.1233, 255.8237 
- complexity: 
  - number_of_words=4: Best: 2.50, 4.09, 4.26; Worst: 11.77, 12.75, 12.80
  - number_of_words=6: Best: 8.73, 8.77, 8.83; Worst: 20.49, 21.50, 22.48 
