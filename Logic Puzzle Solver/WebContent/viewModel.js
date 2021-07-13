/**
 * This program defines the View-Model for the Logic Puzzle Solver site.
 * It will allow me to keep track of each category + options, as well
 * as each condition and tests.
 * @author Gavin Vogt
 */

/**
 * Creates the category ID string for the given category
 * @param {number} categoryId is the ID of the category
 * @returns {string} category ID used within the HTML view
 * @example getCategoryId(3) - 'category3'
 */
function getCategoryId(categoryId) {
    return "category" + categoryId;
}

/**
 * Creates the category name ID string for the given category
 * @param {number} categoryId is the ID of the category
 * @returns {string} ID for the category name input field used within the HTML view
 * @example getCategoryNameId(3) - 'catName3'
 */
function getCategoryNameId(categoryId) {
    return "catName" + categoryId;
}

/**
 * Creates the category options ID string for the given category
 * @param {number} categoryId is the ID of the category
 * @returns {string} ID for the div for options input used within the HTML view
 * @example getOptionsId(3) - 'options3'
 */
function getOptionsId(categoryId) {
    return "options" + categoryId;
}

/**
 * Creates the ID string for the given option in the category
 * @param {number} categoryId is the ID of the category
 * @param {number} optionId is the ID of the option
 * @returns {string} ID for the option input field
 * @example getOptionId(3, 2) - 'option3,2'
 */
function getOptionId(categoryId, optionId) {
    return "option" + categoryId + "," + optionId;
}

/**
 * Creates the ID string for the given condition
 * @param {number} conditionId is the ID of the condition
 * @returns {string} ID for the condition input div
 * @example getConditionId(4) - 'condition4'
 */
function getConditionId(conditionId) {
    return "condition" + conditionId;
}

/**
 * Creates the ID string for the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test belonging to this condition
 * @returns {string} ID for the test input div
 * @example getConditionId(4, 2) - 'test4,2'
 */
function getTestId(conditionId, testId) {
    return "test" + conditionId + "," + testId;
}

class FirstTestViewModel {
    constructor(puzzle, testId, testDiv) {
        this.puzzle = puzzle;
        this.id = testId;
        this.testDiv = testDiv;
    }

    getId() {
        return this.id;
    }

    getTestElement() {
        return this.testDiv;
    }
}

class SecondTestViewModel {

}

/**
 * This class represents the View-Model for a condition
 */
class ConditionViewModel {
    constructor(puzzle, conditionId, conditionDiv) {
        this.puzzle = puzzle;
        this.id = conditionId;
        this.conditionDiv = conditionDiv;
        this.tests = {};   // {test ID : test View-Model}
        this.currentTestId = 0;
    }

    /**
     * Gets the div attached to this Condition
     */
    getConditionElement() {
        return this.conditionDiv;
    }

    /**
     * Adds a test to this Condition
     */
    addTest() {
        this.conditionDiv.innerHTML += this._generateTestInput();
        let testDiv = document.getElementById(getTestId(this.id, this.currentTestId));
        this.tests[this.currentTestId] = new FirstTestViewModel(
            this.puzzle, this.currentTestId, testDiv);
        ++this.currentTestId;
    }

    /**
     * Generates the HTML code for a test input
     * @returns {string} holding the HTML code for a test
     */
    _generateTestInput() {
        // Create test container
        let testStr = '<div class="testContainer" id="'
            + getTestId(this.id, this.currentTestId) + '">';
        
        // <select> for the first Category
        testStr += "<select>";
        this.puzzle.getCategories().forEach(category => {
            if (category !== null) {
                testStr += "<option value='" + category.getId() + "'>"
                        + category.getIdentifier() + "</option>";
            }
        });
        testStr += "</select> ";
        
        // <select> for the first Category's option
        testStr += "<select>";
        let firstCategory = this.puzzle.getFirstCategory();
        firstCategory.getOptions().forEach(option => {
            if (option !== null) {
                testStr += "<option value='" + option.getId() + "'>"
                        + option.getIdentifier() + "</option>";
            }
        });
        testStr += "</select> ";
        
        // Operation for the first item
        testStr += '<input maxlength="15" size="10" placeholder="any operations"> ';
        
        // <select> for the test
        testStr += "<select><option>is</option><option>isn't</option><option>=</option>"
                + "<option>!=</option><option>&lt;</option><option>&lt;=</option>"
                + "<option>&gt;=</option><option>&gt;=</option></select> ";
        
        // <select> for the second Category
        testStr += "<select>";
        this.puzzle.getCategories().forEach(category => {
            if (category !== null) {
                testStr += "<option value='" + category.getId() + "'>"
                        + category.getIdentifier() + "</option>";
            }
        });
        testStr += "</select> ";
        
        // <select> for the second Category's option
        testStr += "<select>";
        firstCategory.getOptions().forEach(option => {
            if (option !== null) {
                testStr += "<option value='" + option.getId() + "'>"
                        + option.getIdentifier() + "</option>";
            }
        });
        testStr += "</select> ";
        
        // Operation for the second item
        testStr += '<input maxlength="15" size="10" placeholder="any operations"> ';

        // Button to remove test
        testStr += '<button type="button" onclick="binding.removeTest('
                + this.id + ', ' + this.currentTestId + ');">Remove Test</button>';
        return testStr + "</div>";
    }

    removeTest(testId) {
        let newHtml = "";
        for (const tId in this.tests) {
            if (testId != tId) {
                // Keep this test
                newHtml += this.tests[tId].getTestElement().innerHTML;
            }
        }
        this.conditionDiv.innerHTML = newHtml;
        delete this.tests[testId];
    }
}


/**
 * This class represents the View-Model for the information on the Logic
 * Puzzle solver site.
 */
class ViewModel {
    constructor(puzzle) {
        // Get all the important elements from the view
        this.puzzleTable = document.getElementById("puzzle");
        this.numOptionsInput = document.getElementById("numOptions");
        this.categoriesDiv = document.getElementById("categories");
        this.conditionsList = document.getElementById("conditions");

        // Components of the model
        this.puzzle = puzzle;
        this.categories = {};  // {category ID: category input element}
        this.conditions = {};  // {condition ID: ConditionViewModel}

        // Counter variables
        this.currentCategoryId = 0;
        this.currentConditionId = 0;
    }

    /**
     * Updates the puzzle table according to the information in the Puzzle
     */
    updatePuzzleTable() {
        this.puzzleTable.innerHTML = this.puzzle.createHtml();
    }

    /**
     * Gets the number of options per category
     * @returns {number} number of options in each category
     */
    getNumOptions() {
        return numOptions.value;
    }

    /**
     * Adds a category to the View and Model and increments the category ID
     * for the next time one is added
     */
    addCategory() {
        this.puzzle.addCategory(this.currentCategoryId);
        this._createCategoryInput();
        this.categories[this.currentCategoryId] = document.getElementById(
            getCategoryId(this.currentCategoryId));
        ++this.currentCategoryId;
    }

    /**
     * Creates the category input HTML string and adds it to the Categories div
     */
    _createCategoryInput() {
        let catIdString = getCategoryId(this.currentCategoryId);
        let catNameIdString = getCategoryNameId(this.currentCategoryId);
        let optionsIdString = getOptionsId(this.currentCategoryId);
        this.categoriesDiv.innerHTML += "<div class='categoryContainer' id='"
            + catIdString + "'><i>Category " + puzzle.numCategories()
            + "</i>: <input id='" + catNameIdString + "' required>"
            + "<button type='button' class='categoryOption' tabindex='-1' "
            + "onclick='binding.removeCategory(" + this.currentCategoryId
            + ");'>Remove Category</button>"
            + "<hr><div class='optionInputDiv' id='" + optionsIdString
            + "'></div></div>";
        
        // Add all the options to the category
        for (let optionId = 0, n = this.getNumOptions(); optionId < n; optionId++) {
            this._addOptionInput(this.currentCategoryId, optionId);
        }
    }

    /**
     * Adds an option input field to the given category
     * @param {number} categoryId is the ID of the category
     * @param {number} optionId is the ID of the option for this category
     */
    _addOptionInput(categoryId, optionId) {
        // Add an option to this Category in the Puzzle
        puzzle.getCategory(categoryId).addOption(optionId);
        let optionIdString = getOptionId(categoryId, optionId);
        let optionsDiv = document.getElementById(getOptionsId(categoryId));
        optionsDiv.innerHTML += "Option " + (optionId + 1) + ": <input id='"
                + optionIdString + "' required><br>";
    }

    /**
     * Removes a category from the View and Model
     * @param {number} categoryId is the ID of the category to remove
     */
    removeCategory(categoryId) {
        let newHtml = ""
        for (const catId in this.categories) {
            if (categoryId != catId) {
                newHtml += this.categories[catId].outerHTML;
            }
        }
        this.categoriesDiv.innerHTML = newHtml;
        delete this.categories[categoryId];

        // TODO: remove category from puzzle
        this.puzzle.removeCategory(categoryId);
    }

    /**
     * Adds a condition to the page and updates the internal model
     */
    addCondition() {
        this.conditionsList.innerHTML += "<li>" + this._generateConditionInput() + "</li>";
        let element = document.getElementById(getConditionId(this.currentConditionId));
        let condition = new ConditionViewModel(this.puzzle, this.currentConditionId, element);
        condition.addTest();
        this.conditions[this.currentConditionId] = condition;
        ++this.currentConditionId;
    }

    /**
     * Generates the HTML code for a Condition input
     * @returns {string} holding the HTML code for a Condition
     */
    _generateConditionInput() {
        // Create condition container
        let conditionIdStr = getConditionId(this.currentConditionId);
        let conditionStr = "<div class='conditionContainer' id='" + conditionIdStr
            + "'>Number of tests true must be "
            + '<select><option>=</option><option>!=</option><option>&lt;</option>'
            + '<option>&lt;=</option><option>&gt;=</option><option>&gt;=</option>'
            + '</select> <input type="number" value="1" min="0" style="width: 5em">'
            + '<button type="button" class="categoryOption" onclick="binding.removeCondition('
            + this.currentConditionId + ');">Remove Condition</button><hr>'
        return conditionStr + "</div>";
    }

    /**
     * Removes a Condition
     * @param {number} conditionId is the ID of the condition to remove
     */
    removeCondition(conditionId) {
        let newHtml = "";
        for (const condId in this.conditions) {
            if (conditionId != condId) {
                // Keep this condition
                newHtml += "<li>" + this.conditions[condId].getConditionElement().outerHTML + "</li>";
            }
        }this.conditionsList.innerHTML = newHtml;
        delete this.conditions[conditionId];
    }

    /**
     * Removes a test
     * @param {number} conditionId is the ID of the condition
     * @param {number} testId is the ID of the test to remove
     */
    removeTest(conditionId, testId) {
        this.conditions[conditionId].removeTest(testId);
    }

}