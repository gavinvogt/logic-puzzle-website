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
 * Creates the ID string for the given tests div of a condition
 * @param {number} conditionId is the ID of the condition
 * @returns {string} ID for the tests input div
 * @example getTestsId(3) - 'tests3'
 */
function getTestsId(conditionId) {
    return "tests" + conditionId;
}

/**
 * Creates the ID string for the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test belonging to this condition
 * @returns {string} ID for the test input div
 * @example getTestId(4, 2) - 'test4,2'
 */
function getTestId(conditionId, testId) {
    return "test" + conditionId + "," + testId;
}

/**
 * Creates the ID string for the condition logic selector
 * @param {number} conditionId is the ID of the condition
 * @returns {string} ID for the condition logic selection element
 * @example getConditionLogicId(0) - 'condition0logic'
 */
function getConditionLogicId(conditionId) {
    return "condition" + conditionId + "logic";
}

/**
 * Creates the ID string for the condition number of tests true
 * @param {number} conditionId is the ID of the condition
 * @returns {string} ID for the condition number input element
 * @example getConditionNumId(0) - 'condition0num'
 */
function getConditionNumId(conditionId) {
    return "condition" + conditionId + "num";
}

/**
 * Creates the ID string for the first category selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the first category selection element
 * @example getTestCat1Id(1, 2) - 'test1,2cat1'
 */
function getTestCat1Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "cat1";
}

/**
 * Creates the ID string for the first option selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the first option selection element
 * @example getTestOption1Id(1, 2) - 'test1,2option1'
 */
function getTestOption1Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "option1";
}

/**
 * Creates the ID string for the first operations input element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the first operations input element
 * @example getTestOps1Id(1, 2) - 'test1,2ops1'
 */
function getTestOps1Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "ops1";
}

/**
 * Creates the ID string for the test type selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the test type selection element
 * @example getTestType(1, 2) - 'test1,2type'
 */
function getTestType(conditionId, testId) {
    return getTestId(conditionId, testId) + "type";
}

/**
 * Creates the ID string for the second category selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the second category selection element
 * @example getTestCat2Id(1, 2) - 'test1,2cat2'
 */
function getTestCat2Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "cat2";
}

/**
 * Creates the ID string for the second option selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the second option selection element
 * @example getTestOption2Id(1, 2) - 'test1,2option2'
 */
function getTestOption2Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "option2";
}

/**
 * Creates the ID string for the second operations input element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the second operations input element
 * @example getTestOps2Id(1, 2) - 'test1,2ops2'
 */
function getTestOps2Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "ops2";
}




/**
 * This class represents the View-Model for a category input along with
 * all the option names
 */
class CategoryViewModel {

    /**
     * Constructs the View-Model for the given category
     * @param {Puzzle} puzzle is the Puzzle to connect to
     * @param {number} categoryId is the ID of the category that this
     * View-Model is for
     */
    constructor(puzzle, categoryId) {
        this.puzzle = puzzle;
        this.id = categoryId;
        this.saveValues();    // Finds all the view elements and saves values
    }

    /**
     * Gets the ID of this category
     * @returns {number} ID of the category
     */
    getId() {
        return this.id;
    }

    /**
     * Gets the category div that makes up the View
     */
    getCategoryDiv() {
        return this.categoryDiv;
    }

    /**
     * Finds the necessary elements in the view
     */
    findViewElements() {
        this.categoryDiv = document.getElementById(getCategoryId(this.id));
        this.optionsDiv = document.getElementById(getOptionsId(this.id));
        this._findInputs();
    }

    /**
     * Finds all the option name inputs for this category
     */
    _findInputs() {
        this.nameInput = document.getElementById(getCategoryNameId(this.id));
        this.optionInputs = [...this.optionsDiv.getElementsByTagName("input")];
    }

    /**
     * Sets the number of options in the category view (does not update model)
     * @param {number} numOptions is the new number of options in the Category
     * View-Model
     */
    setNumOptions(numOptions) {
        // Save the old option input values
        this.saveValues();

        // Replace inner HTML of category div with new number of option inputs
        this.optionsDiv.innerHTML = "";
        for (let i = 0; i < numOptions; ++i) {
            this._addOptionInput(i);
        }

        // Insert the previous values
        this.fillInValues();
    }

    /**
     * Adds an option to both the Puzzle model and the View. SHOULD ONLY
     * BE USED WHILE SETTING UP THE CATEGORY FOR THE FIRST TIME
     */
    addOption() {
        let newOption = this.puzzle.getCategoryById(this.id).addOption();
        this._addOptionInput(newOption.getId());
        this._findInputs();
    }
    
    /**
     * Saves the inputted option values in `catName` and `optionValues` fields
     */
    saveValues() {
        this.findViewElements();
        this.catName = this.nameInput.value;
        this.optionValues = [];
        this.optionInputs.forEach(input => {
            this.optionValues.push(input.value);
        })
    }

    /**
     * Fills in all the user's previously inputted values to the input
     * fields for category name and option names
     */
    fillInValues() {
        this.findViewElements();
        this.nameInput.value = this.catName;
        let n = (this.optionValues.length < this.optionInputs.length)
                ? this.optionValues.length : this.optionInputs.length;
        for (let i = 0; i < n; ++i) {
            this.optionInputs[i].value = this.optionValues[i];
        }
    }

    /**
     * Reads the category name the user inputted
     * @returns {string} category name
     */
    readName() {
        return this.nameInput.value;
    }

    /**
     * Reads the option names the user inputted for this category
     * @returns {string[]} array of option names (indexed by option ID)
     */
    readOptionNames() {
        let optionNames = [];
        this.optionInputs.forEach(input => {
            optionNames.push(input.value);
        })
        return optionNames;
    }

    /**
     * Adds an option input field to this category
     */
    _addOptionInput(optionId) {
        // Add an option to this Category in the Puzzle
        let optionIdString = getOptionId(this.id, optionId);
        this.optionsDiv.innerHTML += "Option " + (optionId + 1) + ": <input id='"
                + optionIdString + "' required><br>";
    }

}

class FirstTestViewModel {
    constructor(puzzle, conditionId, testId) {
        this.puzzle = puzzle;
        this.conditionId = conditionId;
        this.id = testId;
        this.testDiv = document.getElementById(getTestId(conditionId, testId));
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
    constructor(puzzle, conditionId) {
        this.puzzle = puzzle;
        this.id = conditionId;
        this.conditionDiv = document.getElementById(getConditionId(conditionId));
        this.testsDiv = document.getElementById(getTestsId(conditionId));
        this.tests = new Map();   // {test ID : test View-Model}
        this.currentTestId = 0;
    }

    /**
     * Gets the ID of the condition
     * @returns {number} ID of the condition
     */
    getId() {
        return this.id;
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
        this.testsDiv.innerHTML += this._generateTestInput();
        this.tests.set(this.currentTestId, new FirstTestViewModel(
            this.puzzle, this.id, this.currentTestId));
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
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getIdentifier() + "</option>";
        });
        testStr += "</select> ";
        
        // <select> for the first Category's option
        testStr += "<select>";
        let firstCategory = this.puzzle.getCategoryByIndex(0);
        firstCategory.getOptions().forEach(option => {
            testStr += "<option value='" + option.getId() + "'>"
                    + option.getIdentifier() + "</option>";
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
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getIdentifier() + "</option>";
        });
        testStr += "</select> ";
        
        // <select> for the second Category's option
        testStr += "<select>";
        firstCategory.getOptions().forEach(option => {
            testStr += "<option value='" + option.getId() + "'>"
                    + option.getIdentifier() + "</option>";
        });
        testStr += "</select> ";
        
        // Operation for the second item
        testStr += '<input maxlength="15" size="10" placeholder="any operations"> ';

        // Button to remove test
        testStr += '<button type="button" class="internalButton" onclick="binding.removeTest('
                + this.id + ', ' + this.currentTestId + ');">Remove</button>';
        return testStr + "</div>";
    }

    /**
     * Removes a test from the condition
     * @param {number} testId is the ID of the test to remove
     */
    removeTest(testId) {
        let newHtml = "";
        for (const testVM of this.tests.values()) {
            if (testId !== testVM.getId()) {
                // Keep this test
                newHtml += testVM.getTestElement().outerHTML;
            }
        }
        this.testsDiv.innerHTML = newHtml;
        this.tests.delete(testId);
    }
}


/**
 * This class represents the View-Model for the information on the Logic
 * Puzzle solver site.
 */
class ViewModel {

    /**
     * Constructs the overall View-Model
     * @param {Puzzle} puzzle is the puzzle to connect to as the model
     */
    constructor(puzzle) {
        // Get all the important elements from the view
        this.puzzleTable = document.getElementById("puzzle");
        this.numOptionsInput = document.getElementById("numOptions");
        this.categoriesDiv = document.getElementById("categories");
        this.conditionsList = document.getElementById("conditions");

        // Components of the model
        this.puzzle = puzzle;
        this.categories = new Map();  // {category ID: CategoryViewModel}
        this.conditions = new Map();  // {condition ID: ConditionViewModel}

        // Counter variables
        this.currentCategoryId = 0;
        this.currentConditionId = 0;
    }

    /**
     * Loads all the category / option name inputs into the Puzzle
     */
    loadNamingInputs() {
        // Load the category / option information into the table
        puzzle.getCategories().forEach(category => {
            // Get the data from the categoryVM
            let categoryVM = this.categories.get(category.getId());
            category.setName(categoryVM.readName());

            // Update the option names
            let options = category.getOptions();
            let optionNames = categoryVM.readOptionNames();
            for (let i = 0, n = options.length; i < n; ++i) {
                options[i].setName(optionNames[i]);
            }
        });
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
     * Updates the number of options per category using the new value
     * of the `numOptions` element
     */
    updateNumOptions() {
        let newNum = this.getNumOptions();
        puzzle.setNumOptions(newNum);
        for (const categoryVM of this.categories.values()) {
            categoryVM.setNumOptions(newNum);
        }
        this.updatePuzzleTable();
    }

    /**
     * Adds a category to the View and Model and increments the category ID
     * for the next time one is added
     */
    addCategory() {
        // Save the input values
        for (const categoryVM of this.categories.values()) {
            categoryVM.saveValues();
        }

        this.puzzle.addCategory(this.currentCategoryId);
        this._createCategoryInput();
        let categoryVM = new CategoryViewModel(puzzle, this.currentCategoryId);
        this.categories.set(this.currentCategoryId, categoryVM);
        
        // Add all the options to the category
        for (let i = 0, n = this.getNumOptions(); i < n; ++i) {
            categoryVM.addOption();
        }
        ++this.currentCategoryId;

        // Fill the values back into the view
        for (const categoryVM of this.categories.values()) {
            categoryVM.fillInValues();
        }
    }

    /**
     * Creates the category input HTML string and adds it to the Categories div.
     * Uses the current category ID.
     */
    _createCategoryInput() {
        let catIdString = getCategoryId(this.currentCategoryId);
        let catNameIdString = getCategoryNameId(this.currentCategoryId);
        let optionsIdString = getOptionsId(this.currentCategoryId);
        this.categoriesDiv.innerHTML += "<div class='categoryContainer' id='"
            + catIdString + "'><i>Category " + (this.currentCategoryId + 1)
            + "</i>: <input id='" + catNameIdString + "' required>"
            + "<button type='button' class='internalButton' tabindex='-1' "
            + "onclick='binding.removeCategory(" + this.currentCategoryId
            + ");loadTable();'>Remove Category</button>"
            + "<hr><div class='optionInputDiv' id='" + optionsIdString
            + "'></div></div>";
    }

    /**
     * Removes a category from the View and Model
     * @param {number} categoryId is the ID of the category to remove
     */
    removeCategory(categoryId) {
        let newHtml = ""
        for (const categoryVM of this.categories.values()) {
            categoryVM.saveValues();
            if (categoryId != categoryVM.getId()) {
                newHtml += categoryVM.getCategoryDiv().outerHTML;
            }
        }
        this.categoriesDiv.innerHTML = newHtml;
        this.categories.delete(categoryId);
        this.puzzle.removeCategoryById(categoryId);

        // Fill the values back into the view
        for (const categoryVM of this.categories.values()) {
            categoryVM.fillInValues();
        }
    }

    /**
     * Adds a condition to the page and updates the internal model
     */
    addCondition() {
        this.conditionsList.innerHTML += "<li>" + this._generateConditionInput() + "</li>";
        let conditionVM = new ConditionViewModel(this.puzzle, this.currentConditionId);
        conditionVM.addTest();
        this.conditions.set(this.currentConditionId, conditionVM);
        ++this.currentConditionId;
    }

    /**
     * Generates the HTML code for a Condition input
     * @returns {string} holding the HTML code for a Condition
     */
    _generateConditionInput() {
        // Create condition container
        let conditionIdStr = getConditionId(this.currentConditionId);
        let testsIdStr = getTestsId(this.currentConditionId);
        let conditionStr = "<div class='conditionContainer' id='" + conditionIdStr
            + "'>Number of tests true must be "
            + '<select><option>=</option><option>!=</option><option>&lt;</option>'
            + '<option>&lt;=</option><option>&gt;=</option><option>&gt;=</option>'
            + '</select> <input type="number" value="1" min="0" style="width: 5em">'
            + '<button type="button" class="internalButton" onclick="binding.removeCondition('
            + this.currentConditionId + ');">Remove Condition</button><hr>'
            + '<div id="' + testsIdStr + '"></div>'
            + '<button type="button" class="externalButton" onclick="binding.addTest(' + this.currentConditionId + ');">Add Test Type 1</button> '
            + '<button type="button" class="externalButton" onclick="binding.addTest(' + this.currentConditionId + ');">Add Test Type 2</button>';
        return conditionStr + "</div>";
    }

    /**
     * Removes a Condition
     * @param {number} conditionId is the ID of the condition to remove
     */
    removeCondition(conditionId) {
        let newHtml = "";
        for (const conditioNVM of this.conditions.values()) {
            if (conditionId !== conditionVM.getId()) {
                newHtml += "<li>" + conditionVM.getConditionElement().outerHTML
                        + "</li>";
            }
        }
        this.conditionsList.innerHTML = newHtml;
        this.conditions.delete(conditionId);
    }

    /**
     * Adds a test to the given condition
     * @param {number} conditionId is the ID of the condition
     */
    addTest(conditionId) {
        this.conditions.get(conditionId).addTest();
    }

    /**
     * Removes a test from the given condition
     * @param {number} conditionId is the ID of the condition
     * @param {number} testId is the ID of the test to remove
     */
    removeTest(conditionId, testId) {
        this.conditions.get(conditionId).removeTest(testId);
    }

}