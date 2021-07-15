'''
File: test_puzzle_solver.py
'''

from logic_puzzle_solver import *

def create_puzzle(num_categories, num_items, names):
    puzzle = LogicPuzzle()

    # loop to get all the items for each category
    for i in range(num_categories):
        cat_name = names[i][0]
        item_names = names[i][1]
        category = Category(cat_name)
        for item_name in item_names:
            item = Item(item_name)
            category.add_item(item)

        puzzle.add_category(category)

    return puzzle

def team_test():
    puzzle_info = [["team", ["alley", "oddballs", "pin", "turkey"]],
                   ["color", ["lime", "magenta", "silver", "yellow"]],
                   ["score", ["715", "727", "739", "751"]]]
    puzzle = create_puzzle(3, 4, puzzle_info)

    conditions = [Condition("score.739=team.oddballs,score.739=team.alley", 1),
                  Condition("color.magenta=team.oddballs,color.magenta=team.alley", 1),
                  Condition("team.oddballs.score #==color.lime.score # +12", 1),
                  Condition("team.alley=color.silver,team.alley=score.715", 1),
                  Condition("team.pin=score.715", 1)]

    solution = brute_force_solution(puzzle, conditions)
    print(solution.get_category("team"))

    print()
    print("Expected output:")
    print("alley : silver : 739")
    print("oddballs : magenta : 727")
    print("pin : lime : 715")
    print("turkey : yellow : 751")

def diving_test():
    puzzle_info = [["customer", ["ayers", "chang", "drake", "ferrell", "gallegos"]],
                   ["date", ["13", "14", "15", "16", "17"]],
                   ["location", ["little", "manta", "cove", "porita", "bench"]],
                   ["guide", ["hilda", "inez", "muriel", "ora", "ted"]]]
    puzzle = create_puzzle(4, 5, puzzle_info)

    conditions = [Condition("customer.chang=date.13,customer.chang=guide.ora", 1),
                  Condition("customer.gallegos!=date.15", 1),
                  Condition("location.manta=date.17,guide.ted=date.17", 1),
                  Condition("location.manta=customer.chang,guide.ted=customer.chang", 1),
                  Condition("date.17!=customer.chang", 1),
                  Condition("customer.chang=location.cove,customer.gallegos=location.cove", 0),
                  Condition("date.15=location.porita", 1),
                  Condition("guide.ora=customer.ayers,guide.ora=date.16", 1),
                  Condition("location.bench=customer.ayers,location.bench=date.16", 1),
                  Condition("customer.ayers!=date.16", 1),
                  Condition("guide.ora.date #==guide.hilda.date # +2", 1),
                  Condition("location.little=guide.inez", 1),
                  Condition("guide.muriel.date #<location.bench.date #", 1),
                  Condition("customer.ferrell.date!=date.15", 1)]

    solution = brute_force_solution(puzzle, conditions)
    print(solution.get_category("customer"))

def recycling_test():
    puzzle_info = [["material", ["aluminum", "batteries", "glass", "paper"]],
                   ["day", ["0", "1", "2", "3"]], # 0=tues, 1=weds, 2=thurs, 3=fri
                   ["time", ["5", "6", "7", "8"]],
                   ["color", ["blue", "green", "orange", "yellow"]]]
    puzzle = create_puzzle(4, 4, puzzle_info)

    conditions = [Condition("time.5=color.orange", 1),
                  Condition("material.glass.day #==material.aluminum.day # +1", 1),
                  Condition("material.paper=day.2,material.paper=time.7", 1),
                  Condition("color.blue.time #==color.yellow.time # +1", 1),
                  Condition("material.aluminum=time.6,material.aluminum=time.7", 1),
                  Condition("day.3=time.7,day.3=time.8", 1),
                  Condition("material.paper!=time.8", 1),
                  Condition("material.batteries.day #==color.green.day # -1", 1),
                  Condition("day.2!=time.8", 1),
                  Condition("day.0!=color.blue", 1),
                  Condition("day.1=material.aluminum,day.1=color.orange", 1)]

    solution = brute_force_solution(puzzle, conditions)
    print(solution.get_category("material"))

def main():
    puzzle_info = [["I", ["a", "b", "c"]],
                   ["J", ["d", "e", "f"]],
                   ["K", ["g", "h", "i"]]]
    puzzle = create_puzzle(3, 3, puzzle_info)

    conditions = [Condition('I.a=J.e', 1),
                  Condition('J.d!=I.b', 1),
                  Condition('I.a=K.g', 1),
                  Condition('J.f=K.i', 1)]

    solution = brute_force_solution(puzzle, conditions)
    print(solution.get_category("I"))


    print("Expected output:")
    print("a: e, g")
    print("b: f, i")
    print("c: d, h")

if __name__ == "__main__":
    #main()
    #team_test()
    #diving_test()
    recycling_test()