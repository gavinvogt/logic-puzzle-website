/**
 * File: solver.js
 * Author: Gavin Vogt
 * This program provides the logic puzzle solving objects.
 * Most important are Puzzle, which stores the Puzzle being
 * solved, and Condition, which applies a condition that
 * the puzzle must statisfy.
 */
 
 /**
  * Represents a logic puzzle to solve
  * Useful methods include:
  *     addCategory()
  *     getCategory()
  *     createHtml()
  *     solve()
  */
 class Puzzle {
    
    /**
     * Constructs a new Puzzle
     */
    constructor() {
        // Keep track of the categories, by both ID and name
        this.categories = [];
        this.count = 0;
    }
    
    /**
     * Adds a category to the Puzzle
     * @param {number} categoryId is the integer identifying the ID of
     * this category
     */
    addCategory(categoryId) {
        this.categories[categoryId] = new Category(categoryId);
        this.count += 1;
    }
    
    /**
     * Edits a category name by category ID
     * @param {number} categoryId is the ID of the category to edit
     * @param {string} newName is the new name of the category
     * @returns {boolean} true if the name was valid, and false if
     * the category could not be renamed
     */
    editCategoryName(categoryId, newName) {
        // TODO: actually check if can rename
        this.categories[categoryId].setName(newName);
    }
    
    /**
     * Gets a category in the Puzzle by ID
     * @param {number} categoryId is the ID of the category to get
     * @returns {Category} the Category with matching ID
     */
    getCategory(categoryId) {
        return this.categories[categoryId];
    }
    
    /**
     * Gets all the categories in the Puzzle
     * @returns {Category[]} array of categories in the Puzzle
     */
    getCategories() {
        return this.categories;
    }
    
    /**
     * Gets the number of categories in the Puzzle
     * @returns {number} integer number of categories in the Puzzle
     */
    numCategories() {
        return this.count;
    }
    
    /**
     * Checks if the puzzle inputs are valid
     * @returns {string} null if valid, error message otherwise
     */
    validate() {
        let usedCategories = new Set();
        let usedOptions = new Set();
        for (let i = 0; i < this.categories.length; i++) {
            // Make sure the category name is not a duplicate
            let category = this.categories[i];
            if (usedCategories.has(category.getName())) {
                return "Duplicate category name - " + category.getName();
            } else {
                usedCategories.add(category.getName());
            }

            // Make sure the option names are not duplicates for this category
            usedOptions.clear();
            let options = category.getOptions();
            for (let j = 0; j < options.length; j++) {
                // Make sure the option name is not a duplicate
                let option = options[j];
                if (usedOptions.has(option.getName())) {
                    return "Duplicate option name - " + option.getName()
                            + "\nIn category " + (category.getId() + 1);
                } else {
                    usedOptions.add(option.getName())
                }
            }
        }
        
        // Puzzle is valid
        return null;
    }
    
    /**
     * Solves the puzzle according to an array of Conditions by brute force.
     * @param {Condition[]} conditions is an array of Condition objects
     * @returns {Entity[]} the list of entities that solves the Puzzle,
     * or null if not possible
     */
    solveBruteForce(conditions) {
        // Create the array of blank entities
        let entities = [];
        let optionCount = this.categories[0].numOptions();
        for (let i = 0; i < optionCount; ++i) {
            entities[i] = new Entity();
        }

        // TODO: brute force and elegant version
        
        // TODO: create each possibility
        catIds = []
        this.categories.forEach(category => {
            if (category !== null) {
                catIds.add(category.getId());
            }
        });
        return this.solveBruteForceHelper(conditions, entities, catIds, 0);
    }

    /**
     * Helper function for solving the Puzzle with brute force (trying every
     * possible permutation)
     * @param {Condition[]} conditions is the array of conditions that must
     * be satisfied by the entities
     * @param {Entity[]} entities is the array of entities representing the
     * potential solution
     * @param {number[]} catIds is the array of category IDs
     * @param {number} curId is the index of the current category ID to use
     * @returns {Entity[]} array of entities representing the solution
     */
    solveBruteForceHelper(conditions, entities, catIds, curId) {
        // Get possible permutations of option IDs for this category
        let categoryId = catIds[curId];
        let category = this.categories[categoryId];
        let optionIds = [];
        category.forEach(option => {
            optionIds.add(option.getId());
        })
        // Implementation yoinked from https://stackoverflow.com/a/22063440
        var permutations = inputArray.reduce(function permute(res, item, key, arr) {
            return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(function(perm) { return [item].concat(perm); }) || item);
        }, []);
        
        // Try each permutation
        permutations.forEach(permutation => {
            // Apply the permutation
            for (let i = 0; i < entities.length; ++i) {
                let option = category.getOption(permutation[i]);
                entities[i].setAttribute(categoryId, option);
            }

            // Check solution OR recurse deeper to fill in other categories
            if (curId < catIds.length) {
                // Need to go deeper
                solution = this.solveHelper(conditions, catIds, curId + 1,
                                            permuations);
                if (solution !== null) {
                    return solution;
                }
            } else {
                // Try the solution
                if (this._isSolved(entities)) {
                    return entities;
                } else {
                    return null;
                }
            }
        });

        // Failed to solve the Puzzle
        return null;
    }

    /**
     * Checks if this Puzzle is solved
     * @param {Entity[]} entities is the array of Entity objects that
     * attempts to solve this puzzle
     * @returns {boolean} whether this puzzle is solved by the current
     * arrangement
     */
    _isSolved(entities) {
        this.conditions.forEach(condition => {
            if (!condition.check(this, entities)) {
                // Failed a condition
                return false;
            }
        });
        return true;
    }
    
    /**
     * Gets the inner HTML for a table representing the Puzzle
     * @returns {string} inner HTML for the table representing this Puzzle
     */
    createHtml() {
        let numOptions = this.categories[0].numOptions();
        
        // Add empty box and top layer of headings to the table
        let retStr = "<tr><th class='empty' rowspan='2' colspan='2'></th>";
        for (let i = 1; i < this.numCategories(); i++) {
            retStr += "<th class='catName' colspan='" + numOptions + "'>"
                    + this.categories[i].getName() + "</th>";
        }
        retStr += "</tr><tr>";
        for (let i = 1; i < this.numCategories(); i++) {
            for (var optionId = 0; optionId < numOptions; optionId++) {
                let option = this.categories[i].getOption(optionId);
                if (option.getId() === 0) {
                    retStr += "<th class='leftBorder'>";
                } else if (option.getId() === numOptions - 1) {
                    retStr += "<th class='rightBorder'>";
                } else {
                    retStr += "<th>";
                }
                
                retStr += "<span class='verticalText'>"
                        + option.getName() + "</span></th>";
            }
        }
        retStr += "</tr>";
        
        // Add the first category (this.categories[0])
        for (let leftOptionId = 0; leftOptionId < numOptions; leftOptionId++) {
            // leftOptionId = ID of the option on the left bar
            retStr += this._getTableRow(0, leftOptionId, numOptions);
        }
        
        // Work backwards from the last category ID to 3
        for (let leftCategoryId = this.numCategories() - 1; leftCategoryId >= 2;
                leftCategoryId--) {
            for (let leftOptionId = 0; leftOptionId < numOptions; leftOptionId++) {
                // leftOptionId = ID of the option on the left bar
                retStr += this._getTableRow(leftCategoryId, leftOptionId, numOptions);
            }
        }
        
        return retStr;
    }
    
    /**
     * Gets the HTML for a single row in the table. Automatically
     * applies border widths and disregards redundant cells
     * @param {number} leftCategoryId is the ID of the category in the
     * left heading bar of the puzzle table
     * @param {number} leftOptionId is the ID of the option for the
     * provided category in the left side of the table
     * @param {number} numOptions is the number of options
     * @returns {string} HTML code for a row in the table
     */
    _getTableRow(leftCategoryId, leftOptionId, numOptions) {
        let category = this.categories[leftCategoryId];
        let option = category.getOption(leftOptionId);
        let rowStr = "<tr>";
        if (leftOptionId === 0) {
            // first option, so add a Category header
            rowStr += "<th class='catName' rowspan='" + numOptions
                    + "'><span class='verticalText'>" + category.getName()
                    + "</span></th>"
                    + "<th class='topBorder'>" + option.getName() + "</th>";
            
        } else if (leftOptionId === numOptions - 1) {
            rowStr += "<th class='bottomBorder'>" + option.getName() + "</th>";
        } else {
            rowStr += "<th>" + option.getName() + "</th>";
        }
        let topCategoryId = 1;
        while (topCategoryId < this.numCategories() && topCategoryId != leftCategoryId) {
            for (let topOptionId = 0; topOptionId < numOptions; topOptionId++) {
                // ID string: "{leftCat},{leftOption},{topCat},{topOption}"
                let idStr = leftCategoryId + "," + leftOptionId + ","
                        + topCategoryId + "," + topOptionId;
                let classStr = this._getLocationClass(leftOptionId, topOptionId,
                        numOptions);
                rowStr += "<td class='" + classStr + "' id='" + idStr + "'></td>";
            }
            topCategoryId += 1;
        }
        return rowStr + "</tr>";
    }
    
    /**
     * Gets the class to use on a cell in the table by figuring
     * out where the border should be thicker (at category lines)
     * @param {number} leftOptionId is the ID of the option in the left bar
     * @param {number} topOptionId is the ID of the option in the top bar
     * @param {number} numOptions is the number of options
     * @returns {string} string of the class for that cell
     */
    _getLocationClass(leftOptionId, topOptionId, numOptions) {
        if (topOptionId === 0) {
            // on the left
            if (leftOptionId === 0) {
                return "leftBorder topBorder";
            } else if (leftOptionId === numOptions - 1) {
                return "leftBorder bottomBorder";
            } else {
                return "leftBorder";
            }
        } else if (topOptionId === numOptions - 1) {
            // on the right
            if (leftOptionId === 0) {
                return "rightBorder topBorder";
            } else if (leftOptionId === numOptions - 1) {
                return "rightBorder bottomBorder";
            } else {
                return "rightBorder";
            }
        } else if (leftOptionId === 0) {
            // on the top
            return "topBorder";
        } else if (leftOptionId === numOptions - 1) {
            // on the bottom
            return "bottomBorder";
        } else {
            // somewhere in the middle
            return "";
        }
    }
}

/**
 * Represents a category of options in a logic puzzle
 */
class Category {
    
    /**
     * Constructs a new Category, storing a name and
     * a dictionary of Options for the category
     * @param {number} categoryId is the ID of the category
     */
    constructor(categoryId) {
        // Keep track of the options, by both ID and name
        this.name = "";
        this.id = categoryId;
        this.options = [];
        this.count = 0;
    }
    
    /**
     * Returns the category name
     * @returns {string} name of the category
     */
    getName() {
        if (this.name === "") {
            return "Category " + (this.id + 1);
        } else {
            return this.name;
        }
    }
    
    /**
     * Returns the category ID
     * @returns {number} the category ID
     */
    getId() {
        return this.id;
    }
    
    /**
     * Gets the identifier for the category
     * @returns {string} the name and number of the category
     */
    getIdentifier() {
        if (this.name === "") {
            return "Category " + (this.id + 1);
        } else {
            return this.name + " <b>(" + (this.id + 1) + ")</b>";
        }
    }
    
    /**
     * Sets the category name
     * @param {string} newName is the new name of the Category
     */
    setName(newName) {
        this.name = newName;
    }
    
    /**
     * Adds an option to the Category
     * @param {number} optionId is the integer identifying the ID of
     * this option
     */
    addOption(optionId) {
        this.options[optionId] = new Option(optionId, this);
        this.count += 1;
    }
    
    /**
     * Edits an option name by option ID
     * @param {number} optionId is the ID of the option to edit
     * @param {string} newName is the new name of the option
     * @returns {boolean} true if the name was valid, and false if
     * the option could not be renamed
     */
    editOptionName(optionId, newName) {
        // TODO: check if rename is possible
        this.options[optionId].setName(newName);
    }
    
    /**
     * Gets an option in the Category
     * @param {number} optionId is the ID of the option
     * @returns {Option} Option by ID
     */
    getOption(optionId) {
        return this.options[optionId];
    }
    
    /**
     * Gets all the options in the Category
     * @returns {Category[]} array of categories in the Puzzle
     */
    getOptions() {
        return this.options;
    }
    
    /**
     * Gets the number of options in the Category
     * @returns {number} integer number of options in the Category
     */
    numOptions() {
        return this.count;
    }
    
}

/**
 * This class represents an option in a category in the puzzle
 */
class Option {
    
    /**
     * Constructs a new Option for a category
     * @param {number} optionId is the ID of this option
     * @param {Category} category is the category this Option belongs to 
     */
    constructor(optionId, category) {
        this.name = "";
        this.category = category
        this.id = optionId;
        this.entity = null;
    }
    
    /**
     * Returns the option name
     * @returns {string} the option name
     */
    getName() {
        if (this.name === "") {
            return "Option " + (this.id + 1);
        } else {
            return this.name;
        }
    }

    /**
     * Gets the category this Option belongs to
     * @returns {Category} the category this option is part of
     */
    getCategory() {
        return this.category;
    }
    
    /**
     * Returns the option ID
     * @returns {number} the option ID
     */
    getId() {
        return this.id;
    }
    
    /**
     * Gets the identifier for the option
     * @returns {string} the string identifying this option to the user
     */
    getIdentifier() {
        if (this.name === "") {
            return "Option " + (this.id + 1);
        } else {
            return this.name + " (" + (this.id + 1) + ")";
        }
    }
    
    /**
     * Sets the option name
     * @param {string} newName is the new name of the Option
     */
    setName(newName) {
        this.name = newName;
    }

    /**
     * Gets the entity attached to this Option
     * @returns {Entity} entiy that possesses this Option as an attribute
     */
    getEntity() {
        return this.entity;
    }

    /**
     * Sets the Entity attached to this Option
     * @param {Entity} entity is the entity that possesses this Option as
     * an attribute
     */
    setEntity(entity) {
        this.entity = entity;
    }
}

/**
 * This class represents a Condition for the puzzle solution to be valid
 */
class Condition {

    /**
     * Creates the condition, which performs each test on the puzzle
     * and verifies that the required number of tests were true.
     * @param {Test[]} tests is the list of tests in this condition
     * @param {number} num_true is the number of tests that must be true
     */
    constructor(tests, num_true) {
        self.tests = tests
        self.num = num_true
    }

    /**
     * Checks if this condition is satisfied by the puzzle
     * @param {Puzzle} puzzle is the Puzzle to check
     * @param {Entity[]} entities is the array of Entity objects to
     * check if they satisfy the condition
     * @returns {boolean} whether the entities satisfy the condition
     */
    check(puzzle, entities) {
        var count = 0;
        for (var i = 0; i < this.tests.length; ++i) {
            // Check each test
            if (count > this.num) {
                // Went past the number required; stop
                return false;
            }
            count += this.tests[i].check(puzzle, entities);
        }
        return (count == this.num);
    }
    
}

/**
 * This class represents a single test that is part of a Condition
 */
class Test {

    /**
     * Creates the Test for the puzzle to pass
     * @param {number} cat1 is the ID of the first category
     * @param {number} option1 is the ID of the option for the first category
     * @param operation1 
     * @param test 
     * @param {number} cat2 is the ID of the second category
     * @param {number} option2 is the ID of the option for the second category
     * @param operation2 
     */
    constructor(cat1, option1, operation1, test, cat2, option2, operation2) {
        // TODO: dealing with the operation and test

        this.cat1 = cat1;        // ID of category 1
        this.option1 = option1;  // ID of option 1
        this.op1 = operation1;
        this.test = test
        this.cat2 = cat2;        // ID of category 2
        this.option2 = option2;  // ID of option 2
        this.op2 = operation2;
    }

    /**
     * Checks if the puzzle satisfies this test
     * @param {Puzzle} puzzle is the Puzzle to check
     * @param {Entity[]} entities is the array of Entity objects that
     * attempts to solve the puzzle
     * @returns {number} 0 if failed, 1 if passed
     */
    check(puzzle, entities) {
        // TODO: checking if the puzzle passes the test
        let category1 = puzzle.getCategory(this.cat1);
        let option1 = category1.getOption(this.option1);
        // TODO: apply op1

        let category2 = puzzle.getCategory(this.cat2);
        let option2 = category2.getOption(this.option2);
        // TODO: apply op2
        
        // Check if the logical test is true
        switch (this.test) {
            case "is":
                // Entity for option1 is same as entity for option2
                return (option1.getEntity() === option2.getEntity());
            case "isn't":
                // Entity for option1 is not same as entity for option2
                return (option1.getEntity() !== option2.getEntity());
            case "=":
                ;
                break;
            case "!=":
                ;
                break;
            case "<=":
                ;
                break;
            case ">=":
                ;
                break;
            case "<":
                ;
                break;
            case ">":
                ;
        }
    }
}

/**
 * This class represents a single Entity that is part of the puzzle.
 * The number of entities involved should be the same as the number
 * of options per category.
 */
class Entity {

    /**
     * Constructs a new Entity, empty of any attibutes
     */
    constructor() {
        // Array since each index corresponds to the ID of the category
        this.attributes = [];
    }

    /**
     * Sets an attribute for this Entity. NOTE: also updates the Option's
     * entity as this one.
     * @param {number} categoryId is the ID of the category
     * @param {Option} option is the Option to set this attribute to
     */
    setAttribute(categoryId, option) {
        this.attributes[categoryId] = option;
        option.setEntity(this);
    }

    /**
     * Gets the attribute for the given category
     * @param {number} categoryId is the ID of the category
     * @returns {Option} Option the attribute is set to for the given category
     */
    getAttribute(categoryId) {
        return this.attributes[categoryId];
    }

}

