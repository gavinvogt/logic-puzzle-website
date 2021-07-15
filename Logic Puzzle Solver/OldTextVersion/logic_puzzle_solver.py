'''
Author: Gavin Vogt
Program: logic_puzzle_solver.py
This program will solve logic puzzles.

Note from 1 year later: Deeply regretting the fact that I decided
not to comment a lot of the methods since I was just writing the program
as a one-off. Because it is no longer a one-off.
'''

class LogicPuzzle:
    """
    This class represents the information about a logic puzzle, holding
    each category.

    The constructor builds an empty dictionary, which will store category
    names as the keys, and Category objects as values.

    Public fields:
        N/A

    Public methods:
        get_category():     - returns a specific category, or
                              the entire dictionary of categories
        add_category():     - adds a category to the puzzle
        is_solved():        - checks if the puzzle is solved
    """

    def __init__(self):
        '''
        Constructs the LogicPuzzle object by creating an
        empty dictionary to hold categories
        '''
        self._categories = {}

    def __str__(self):
        '''
        Prints out the current state of the puzzle
        '''
        for category in list(self._categories.values()):
            items = list(category.get_item().values())
            for item in items:
                attributes = ", ".join(item.get_all_attributes())
                print(f"{item.get_name()}: {attributes}")
        return ""

    def get_category(self, name=None):
        '''
        Gets the Category object corresponding to the category
        name provided. If no name is provided, it returns the
        entire dictionary of categories
        name: str, representing the category name
        '''
        if name is None:
            return self._categories

        # otherwise, return the category named
        return self._categories[name]

    def add_category(self, category):
        '''
        Adds a Category object to the puzzle
        category: Category object
        '''
        self._categories[category.get_name()] = category

    def is_solved(self, conditions):
        '''
        Checks if the puzzle meets the conditions provided.
        conditions: list of Condition objects
        Return: True (solved) or False
        '''
        solved = True
        for condition in conditions:
            solved = solved and condition.check(self)

        return solved

class Category:
    """
    This class represents a category in the logic puzzle, which holds
    some number of items.

    The constructor builds an empty dictionary, which will store item
    names as the keys, and Item objects as values. It also stores the
    category's name.

    Public fields:
        N/A

    Public methods:
        get_name():     - gets the category name
        get_item():     - gets a single item or the dictionary
                          of every item in the category
        add_item():     - adds an item to the category
        get_size():     - gets number of items in the category
    """
    def __init__(self, name):
        self._name = name
        self._items = {}

    def __str__(self):
        retstrings = []
        for item in self._items.values():
            attributes = item.get_all_attributes()
            retstrings.append(" : ".join(attributes))

        return "\n".join(retstrings)

    def get_name(self):
        return self._name

    def get_item(self, item_name=None):
        if item_name is None:
            return self._items
        return self._items[item_name]

    def add_item(self, item):
        self._items[item.get_name()] = item
        item.set_attribute(self._name, item.get_name())

    def get_size(self):
        return len(self._items)

class Item:
    def __init__(self, name):
        self._name = name
        self._attributes = {}

    def get_name(self):
        return self._name

    def get_attribute(self, cat):
        return self._attributes[cat]

    def get_all_attributes(self):
        return list(self._attributes.values())

    def set_attribute(self, cat, item):
        self._attributes[cat] = item

    def match_attributes(self, other_item):
        for cat_name, item_name in other_item._attributes.items():
            self._attributes[cat_name] = item_name

class Condition:
    def __init__(self, condition_str, num):
        # number of sub-conditions that must be True
        self._num_true = num
        self._tests = []
        # each item in the test list:
        # (cat1.item1, test, cat2.item2, operations list)

        conditions = condition_str.split(",")
        for condition in conditions:
            # Numeric tests:
            if "<=" in condition:
                # AT MOST test
                test = "<="
            elif ">=" in condition:
                # AT LEAST test
                test = ">="
            elif "<" in condition:
                # LESS THAN test
                test = "<"
            elif ">" in condition:
                # GREATER THAN test
                test = ">"
            elif "==" in condition:
                # EQUAL TO test
                test = "=="

            elif "!=" in condition:
                # item's attribute can't match some item
                test = "!="
            elif "=" in condition:
                # item's attribute must match some item
                test = "="

            # get the items and their operations
            item1, item2 = condition.split(test)
            ops1 = item1.split()
            item1 = ops1.pop(0)
            ops2 = item2.split()
            item2 = ops2.pop(0)
            self._tests.append((item1, ops1, test, item2, ops2))

    def check(self, puzzle):
        num_true = 0
        for condition in self._tests:
            item1, ops1, test, item2, ops2 = condition

            item1_info = item1.split(".")
            if len(item1_info) == 2:
                cat1, item_name = item1_info
                item1 = puzzle.get_category(cat1).get_item(item_name)
            elif len(item1_info) == 3:
                cat1, item_name, other_cat = item1_info
                item1 = puzzle.get_category(cat1).get_item(item_name)
                # from item1 go into other_cat
                name = item1.get_attribute(other_cat)
                item1 = puzzle.get_category(other_cat).get_item(name)

            item2_info = item2.split(".")
            if len(item2_info) == 1:
                cat2 = None
                item2 = puzzle.get_category(item2)
            elif len(item2_info) == 2:
                # both category and item provided
                cat2, item_name = item2_info
                item2 = puzzle.get_category(cat2).get_item(item_name)
            elif len(item2_info) == 3:
                cat2, item_name, other_cat = item2_info
                item2 = puzzle.get_category(cat2).get_item(item_name)
                # from item2 go into other_cat
                name = item2.get_attribute(other_cat)
                item2 = puzzle.get_category(other_cat).get_item(name)

            num_true += self._test_one(item1, ops1, test, cat2, item2, ops2)

        # checked every requirement
        return (self._num_true == num_true)

    def _test_one(self, item1, ops1, test, cat2, item2, ops2):
        if test == "=":
            return item1.get_attribute(cat2) == item2.get_name()
        elif test == "!=":
            return item1.get_attribute(cat2) != item2.get_name()

        thing1 = self._apply_ops(item1, ops1)
        thing2 = self._apply_ops(item2, ops2)
        if test == "==":
            return thing1 == thing2
        if test == "<=":
            return thing1 <= thing2
        if test == ">=":
            return thing1 >= thing2
        if test == "<":
            return thing1 < thing2
        if test == ">":
            return thing1 > thing2

    def _apply_ops(self, item, ops):
        retval = item.get_name()

        for operation in ops:
            if "[" in operation and "]" in operation:
                index = operation.strip("[]")
                retval = retval[index]
            elif "+" in operation:
                retval += float(operation[1:])
            elif "-" in operation:
                retval -= float(operation[1:])
            elif "*" in operation:
                retval *= float(operation[1:])
            elif "/" in operation:
                retval /= float(operation[1:])
            elif "#" in operation:
                retval = float(retval)

        return retval

def new_puzzle():
    puzzle = LogicPuzzle()

    # loop to get all the items for each category
    num_categories = int(input("Num categories: "))
    num_items = int(input("Num items per category: "))
    for i in range(num_categories):
        print("----"*4)
        category = Category(input(f"Category {i+1} name: "))
        for j in range(num_items):
            item = Item(input(f"Item {j+1} name: "))
            category.add_item(item)

        puzzle.add_category(category)

    return puzzle

def iterate_grid(n, deep=0, used_x=[], used_y=[], grids=set()):
    # square grid of size n
    # has n! possibilities
    if deep == n:
        # make sure no re-used stuff
        if len(used_x) == len(set(used_x)) and len(used_y) == len(set(used_y)):
            grid = [(used_x[i], used_y[i]) for i in range(n)]
            grid.sort()
            grids.add(tuple(grid))
        return

    for x in range(n):
        for y in range(n):
            iterate_grid(n, deep + 1, used_x + [x], used_y + [y], grids)

    return grids

def brute_force_solution(puzzle, conditions):
    '''
    Recursively check every possible solution to the puzzle
    '''
    # get list of every category
    categories = list(puzzle.get_category().values())
    first_cat = categories.pop(0)

    size = first_cat.get_size()
    options = iterate_grid(size)

    return check_every_possibility(puzzle, options, first_cat, categories, conditions)

def check_every_possibility(puzzle, options, main_cat, other_cats, conditions):
    '''
    This function will recursively check every possible solution to the puzzle.
    puzzle: LogicPuzzle object, holding the puzzle information
    options:
    '''
    if len(other_cats) == 0:
        if puzzle.is_solved(conditions):
            return puzzle
        else:
            # this possibility is not a solution
            return None

    main_items = list(main_cat.get_item().values())
    other_cat = other_cats[0]
    items = list(other_cat.get_item().values())

    for grid in options:
        # each grid is a tuple of tuples
        # set up the possible puzzle solution
        for position in grid:
            x, y = position
            main_item = main_items[x]
            other_item = items[y]
            main_item.set_attribute(other_cat.get_name(), other_item.get_name())

            # match the other items to the main key
            for old_cat, old_item in main_item._attributes.items():
                item = puzzle.get_category(old_cat).get_item(old_item)
                item.match_attributes(main_item)

        solution = check_every_possibility(puzzle, options, main_cat, other_cats[1:], conditions)
        if solution is not None:
            return solution

    # failed to find a solution

def main():
    puzzle = new_puzzle()
    conditions = []

    # Get all the clues from the user
    clue = ""
    while clue != "done":
        clue = input("Clue: ")
        if clue != "done":
            num = int(input("Num true: "))
            conditions.append(Condition(clue, num))

    # Now we try to use the conditions to solve the puzzle
    solution = brute_force_solution(puzzle, conditions)
    print(solution)

if __name__ == "__main__":
    main()
