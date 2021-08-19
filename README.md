# Table of Contents

* [General Information](#general-information)
* [Technologies](#technologies)
* [Setup and Gameplay](#setup-and-gameplay)

***

## General Information

This is my solution to the **Codecademy** portfolio project entitled *Find Your Hat*, 
wherein I had to design an **interactive node terminal game**.  The aim of this game is to successfully 
navigate through a maze in order to find your 'hat' (represented by the '^' character), 
ensuring that you don't fall down any 'holes' (represented by the 'O' character) along the 
way. 

The game fulfills the following requirements: 

- when a user runs **main.js**, they should be prompted for input and be able to indicate 
  which direction they'd like to move
- after entering an instruction, the user should see a printed result of their current field 
  map with the tiles they have visited represented by the '*' character.  The user should 
  then be prompted for their next move

The game continues until:

- the user wins by finding their hat
- the user loses by falling down a hole
- the user loses by attempting to go outside the bounds of the game field

***

## Technologies
  
I wrote this *node terminal game* using JavaScript, with some node.js-specific syntax in order 
to require the 'prompt-sync' module (to facilitate asking for user input) and to clear the 
console before re-drawing the game field.

I created some rules for the placement of 'holes' on the first three lines of the grid, in 
order to increase the likelihood that the maze can actually be completed.  The first 'hole' 
on the first line cannot appear before character three; the first 'hole' on the second line 
cannot appear before character four; and 'holes' on the third line cannot appear if there is 
a 'hole' in the second line directly above them/above them and one character to the left/above 
them and one character to the right.

Also, in the event that the 'hat' is surrounded on all sides by a 'hole', one of the 'holes' 
will be replaced by a 'field character'.  The replaced 'hole' is chosen at random.

The user is able to select a difficulty level: 'easy', 'medium', or 'hard'.  On 'easy' mode, 
a 10 x 10 maze is created; on 'medium' mode, a 15 x 15 maze is created; and on 'hard' mode, a 
25 x 25 maze is created. 

***

## Setup and Gameplay

Simply download this project, navigate to the relevant directory in a node terminal, and 
enter the command 'node main.js'.  You will be prompted to select a difficulty level, and 
then the game will begin.
  
The images below show how to start the game, and the possible game outcomes:


Entering 'node main.js':

![Starting the game in a node terminal][start_game]

[start_game]: images/node_terminal_game_start.PNG


Selecting a difficulty level:

![Selecting a difficulty level][difficulty_level]

[difficulty_level]: images/node_terminal_game_difficulty_level.PNG


The game field and direction prompt:

![The direction input prompt][direction_prompt]

[direction_prompt]: images/node_terminal_game_direction_prompt.PNG


An example of entering a direction:

![Choosing a direction][direction_input]

[direction_input]: images/node_terminal_game_direction_input.PNG


An example of leaving the game field bounds by choosing 'l' when already in the left-most slot:

![Out-of-bounds game state][out_of_bounds]

[out_of_bounds]: images/node_terminal_game_out_of_bounds.PNG


An example of moving right and falling into a 'hole':

![Fell-down-a-hole game state][fell_down_a_hole]

[fell_down_a_hole]: images/node_terminal_game_fell_down_a_hole.PNG


An example of moving right and finding the 'hat':

![Found-hat game state][found_hat]

[found_hat]: images/node_terminal_game_found_hat.PNG

***