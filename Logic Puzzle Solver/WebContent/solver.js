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
  *     getCategoryById()
  *     getCategoryByIndex()
  *     createHtml()
  *     solve()
  */
 class Puzzle {
    
    /**
     * Constructs a new Puzzle
     */
    constructor() {
        this.categories = [];
    }
    
    /**
     * Adds a category to the Puzzle
     * @param {number} categoryId is the integer identifying the ID of
     * this category
     */
    addCategory(categoryId) {
        this.categories.push(new Category(categoryId));
    }

    /**
     * Removes a category from the Puzzle by ID
     * @param {number} categoryId is the integer identifying the ID of
     * this category
     */
    removeCategoryById(categoryId) {
        let index = this.categories.findIndex(cat => cat.getId() === categoryId);
        this.removeCategoryByIndex(index);
    }

    /**
     * Removes a category from the Puzzle by index
     * @param {number} categoryIndex is the integer identifying the index of
     * this category
     */
    removeCategoryByIndex(categoryIndex) {
        this.categories.splice(categoryIndex, 1);
    }

    /**
     * Gets a category in the Puzzle by ID
     * @param {number} categoryId is the ID of the category to get
     * @returns {Category} the Category with matching ID, or `undefined`
     */
    getCategoryById(categoryId) {
        return this.categories.find(cat => cat.getId() === categoryId);
    }

    /**
     * Gets a category in the Puzzle by index
     * @param {number} categoryId is the index of the category to get
     * @returns {Category} the Category with matching index
     */
    getCategoryByIndex(categoryIndex) {
        return this.categories[categoryIndex];
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
        return this.categories.length;
    }

    /**
     * Sets the number of options per category
     * @param {number} numOptions is the new number of options per category
     */
    setNumOptions(numOptions) {
        this.categories.forEach(category => {
            category.setNumOptions(numOptions);
        });
    }
    
    /**
     * Checks if the puzzle inputs are valid
     * @returns {string} null if valid, error message otherwise
     */
    validate() {
        let usedCategories = new Set();
        let usedOptions = new Set();
        for (let i = 0; i < this.categories.length; ++i) {
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
            for (let j = 0; j < options.length; ++j) {
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
            entities.push(new Entity());
        }
        console.log(this.categories);
        console.log("Length: " + this.categories.length);
        return this.solveBruteForceHelper(conditions, entities, 0);
    }

    /**
     * Helper function for solving the Puzzle with brute force (trying every
     * possible permutation)
     * @param {Condition[]} conditions is the array of conditions that must
     * be satisfied by the entities
     * @param {Entity[]} entities is the array of entities representing the
     * potential solution
     * @param {number} curIndex is the index of the current category index to use
     * @returns {Entity[]} array of entities representing the solution
     */
    solveBruteForceHelper(conditions, entities, curIndex) {
        // Get possible permutations of option IDs for this category
        let category = this.categories[curIndex];
        let optionIds = [];
        category.getOptions().forEach(option => {
            optionIds.push(option.getId());
        })
        // Implementation yoinked from https://stackoverflow.com/a/22063440
        var permutations = optionIds.reduce(function permute(res, item, key, arr) {
            return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(function(perm) { return [item].concat(perm); }) || item);
        }, []);
        
        // Try each permutation
        let categoryId = category.getId();
        for (let j = 0, n = permutations.length; j < n; ++j) {
            // Apply the permutation (array of option IDs)
            let permutation = permutations[j];
            console.log("Applying " + permutation + " at index " + curIndex);
            for (let i = 0; i < entities.length; ++i) {
                let option = category.getOption(permutation[i]);
                entities[i].setAttribute(categoryId, option);
            }

            // Check solution OR recurse deeper to fill in other categories
            if (curIndex < this.categories.length - 1) {
                // Need to go deeper
                let solution = this.solveBruteForceHelper(conditions, entities, curIndex + 1);
                if (solution !== null) {
                    // Found solution
                    return solution;
                }
                // Otherwise continue through other permutations
            } else {
                // Try the solution
                if (this._isSolved(conditions)) {
                    return entities;
                }
                // Otherwise continue through other permutations
            }
        }

        // Failed to solve the Puzzle
        return null;
    }

    /**
     * Checks if this Puzzle is solved
     * @param {Condition[]} condition is the array of conditions that
     * must be passed for the puzzle to be solved
     * @returns {boolean} whether this puzzle is solved by the current
     * arrangement
     */
    _isSolved(conditions) {
        for (let i = 0, n = conditions.length; i < n; ++i) {
            if (!conditions[i].check(this)) {
                // Failed a condition
                return false;
            }
        }

        // Passed all conditions
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
        for (let i = 1; i < this.numCategories(); ++i) {
            let category = this.categories[i];
            retStr += "<th class='catName' colspan='" + numOptions + "'>"
                   + category.getName() + "</th>";
        }
        retStr += "</tr><tr>";
        for (let i = 1; i < this.numCategories(); ++i) {
            let category = this.categories[i];
            for (let optionId = 0; optionId < numOptions; ++optionId) {
                let option = category.getOption(optionId);
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
        for (let leftCategoryIndex = this.numCategories() - 1; leftCategoryIndex >= 2;
                leftCategoryIndex--) {
            for (let leftOptionId = 0; leftOptionId < numOptions; leftOptionId++) {
                // leftOptionId = ID of the option on the left bar
                retStr += this._getTableRow(leftCategoryIndex, leftOptionId, numOptions);
            }
        }
        
        return retStr;
    }
    
    /**
     * Gets the HTML for a single row in the table. Automatically
     * applies border widths and disregards redundant cells
     * @param {number} leftCategoryIndex is the index of the category in the
     * left heading bar of the puzzle table
     * @param {number} leftOptionId is the ID of the option for the
     * provided category in the left side of the table
     * @param {number} numOptions is the number of options
     * @returns {string} HTML code for a row in the table
     */
    _getTableRow(leftCategoryIndex, leftOptionId, numOptions) {
        let category = this.categories[leftCategoryIndex];
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
        while (topCategoryId < this.numCategories() && topCategoryId != leftCategoryIndex) {
            for (let topOptionId = 0; topOptionId < numOptions; topOptionId++) {
                // ID string: "cell{leftCat},{leftOption}-{topCat},{topOption}"
                let idStr = getCellId(leftCategoryIndex, leftOptionId,
                                      topCategoryId, topOptionId);
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
     * @returns {Option} new option that was created
     */
    addOption() {
        let newOption = new Option(this.count, this);
        this.options.push(newOption);
        ++this.count;
        return newOption;
    }

    /**
     * Removes the last option in this Category
     */
    removeOption() {
        this.options.splice(-1, 1);
        --this.count;
    }

    /**
     * Sets the number of options for this Category
     * @param {number} numOptions is the new number of options in this category
     */
    setNumOptions(numOptions) {
        let numToAdd = numOptions - this.count;
        if (numToAdd > 0) {
            // Adding options
            var action = function(cat) {
                cat.addOption();
            }
        } else if (numToAdd < 0) {
            // Removing options
            numToAdd = -numToAdd
            var action = function(cat) {
                cat.removeOption();
            }
        } else {
            // Don't need to do anything
            return;
        }

        // Perform the actions
        for (let i = 0; i < numToAdd; ++i) {
            action(this);
        }
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
     * @param {number} numTrue is the number of tests that must be true
     * @param {string} logic is the logic for comparing the number of tests
     * that were actually true to `numTrue`
     */
    constructor(tests, numTrue, logic) {
        this.tests = tests;
        this.num = numTrue;
        this.logic = logic;
    }

    /**
     * Checks if this condition is satisfied by the puzzle
     * @param {Puzzle} puzzle is the Puzzle to check
     * @returns {boolean} whether the entities satisfy the condition
     */
    check(puzzle) {
        // Get number of true tests
        let count = 0;
        this.tests.forEach(test => {
            count += test.check(puzzle);
        });

        // Check if number correct passes the logic
        switch (this.logic) {
            case "=":
                return (count === this.num);
            case "!=":
                return (count !== this.num);
            case "<":
                return (count < this.num);
            case "<=":
                return (count <= this.num);
            case ">":
                return (count > this.num);
            case ">=":
                return (count >= this.num);
        }

        // Didn't recognize logic
        return false;
    }
}

/**
 * This class represents a single test that is part of a Condition.
 * It is the base class for MatchTest and CompareTest (not meant for use).
 */
class Test {
    /**
     * Creates the Test for the puzzle to pass
     * @param {number} cat1 is the ID of the first category
     * @param {number} option1 is the ID of the option for the first category
     * @param {string} test is the string representing the test to do
     * @param {number} cat2 is the ID of the second category
     * @param {number} option2 is the ID of the option for the second category
     */
    constructor(cat1, option1, test, cat2, option2) {
        this.cat1 = cat1;
        this.option1 = option1;
        this.test = test;
        this.cat2 = cat2;
        this.option2 = option2;
    }
}

class MatchTest extends Test {
    /**
     * Creates the MatchTest for the puzzle to pass. It means that the entity
     * that has attribute `option1` must also have attribute `option2` (is)
     * @param {number} cat1 is the ID of the first category
     * @param {number} option1 is the ID of the option for the first category
     * @param {string} test is the string representing the test to do
     * @param {number} cat2 is the ID of the second category
     * @param {number} option2 is the ID of the option for the second category
     */
    constructor(cat1, option1, test, cat2, option2) {
        super(cat1, option1, test, cat2, option2);
    }

    check(puzzle) {
        // Get category 1
        let category1 = puzzle.getCategoryById(this.cat1);
        let option1 = category1.getOption(this.option1);

        // Get category 2
        let category2 = puzzle.getCategoryById(this.cat2);
        let option2 = category2.getOption(this.option2);
        
        // Check if the logical test is true
        switch (this.test) {
            case "is":
                // Entity for option1 is same as entity for option2
                return Number(option1.getEntity() === option2.getEntity());
            case "isn't":
                // Entity for option1 is not same as entity for option2
                return Number(option1.getEntity() !== option2.getEntity());
        }

        // Didn't recognize the test type
        return 0;
    }
}

class CompareTest extends Test {
    /**
     * Creates the CompareTest for the puzzle to pass. This means that it
     * gets the entities for `option1` and `option2`, and then does some kind
     * of comparison between the names of each entity's attribute from the
     * given sub-categories
     * @param {number} cat1 is the ID of the first category
     * @param {number} option1 is the ID of the option for the first category
     * @param {number} subCat1 is the ID of the first sub-category
     * @param {string} operations1 is the operations to do on the first name
     * @param {string} test is the string representing the test to do
     * @param {number} cat2 is the ID of the second category
     * @param {number} option2 is the ID of the option for the second category
     * @param {number} subCat2 is the ID of the second sub-category
     * @param {string} operations2 is the operations to do on the second name
     */
    constructor(cat1, option1, subCat1, operations1, test, cat2, option2, subCat2, operations2) {
        super(cat1, option1, test, cat2, option2);
        this.subCat1 = subCat1;   // ID of sub-category 1
        this.ops1 = operations1;  // operations to do on first
        this.subCat2 = subCat2;   // ID of sub-category 2
        this.ops2 = operations2;  // operations to do on second
    }

    
    /**
     * Checks if the puzzle satisfies this test
     * @param {Puzzle} puzzle is the Puzzle to check
     * @param {Entity[]} entities is the array of Entity objects that
     * attempts to solve the puzzle
     * @returns {number} 0 if failed, 1 if passed
     */
    check(puzzle) {
        let category1 = puzzle.getCategoryById(this.cat1);
        let option1 = category1.getOption(this.option1);
        let attr1 = option1.getEntity().getAttribute(this.subCat1).getName();
        let val1 = this._applyOperations(attr1, this.ops1);

        let category2 = puzzle.getCategoryById(this.cat2);
        let option2 = category2.getOption(this.option2);
        let attr2 = option2.getEntity().getAttribute(this.subCat2).getName();
        let val2 = this._applyOperations(attr2, this.ops2);
        
        /*
        console.log("Attrs:");
        console.log(attr1);
        console.log(attr2);

        console.log("After operations:");
        console.log("val1: " + val1 + " (" + typeof val1 +")");
        console.log("val2: " + val2 + " (" + typeof val2 +")");
        */

        // Check if the logical test is true
        switch (this.test) {
            case "=":
                return Number(val1 === val2);
            case "!=":
                return Number(val1 !== val2);
            case "<=":
                return Number(val1 <= val2);
            case ">=":
                return Number(val1 >= val2);
            case "<":
                return Number(val1 < val2);
            case ">":
                return Number(val1 > val2);
        }

        // Didn't recognize test
        return 0;
    }

    _applyOperations(name, ops) {
        ops.split(" ").forEach(op => {
            if (op.startsWith("[") && op.endsWith("]")) {
                name = name.charAt(Number(op.substring(1, op.length - 1)));
            } else if (op.startsWith("+")) {
                // Adding a number
                name += Number(op.substring(1));
            } else if (op.startsWith("-")) {
                // Subtracting a number
                name -= Number(op.substring(1));
            } else if (op.startsWith("*")) {
                // Multiplying by a number
                name *= Number(op.substring(1));
            } else if (op.startsWith("/")) {
                // Dividing by a number
                name /= Number(op.substring(1));
            } else if (op.includes("#")) {
                // Convert to a number
                name = Number(name);
            }
        });
        return name;
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

