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
 * Creates the ID string for the first sub-category selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the first sub-category selection element
 * @example getTestSubCat1Id(1, 2) - 'test1,2subCat1'
 */
function getTestSubCat1Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "subCat1";
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
 * @example getTestTypeId(1, 2) - 'test1,2type'
 */
function getTestTypeId(conditionId, testId) {
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
 * Creates the ID string for the second sub-category selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @returns {string} ID for the second sub-category selection element
 * @example getTestSubCat2Id(1, 2) - 'test1,2subCat2'
 */
function getTestSubCat2Id(conditionId, testId) {
    return getTestId(conditionId, testId) + "subCat2";
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
        this.catName = this.readName();
        this.optionValues = this.readOptionNames();
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

/**
 * Base class for other View-Models for a test
 */
class TestViewModel {
    /**
     * Constructs a View-Model for a new test
     * @param {Puzzle} puzzle is the Puzzle to link to
     * @param {number} conditionId is the ID of the condition the test
     * belongs to
     * @param {number} testId is the ID of the test
     */
    constructor(puzzle, conditionId, testId) {
        this.puzzle = puzzle;
        this.conditionId = conditionId;
        this.id = testId;
    }

    /**
     * Gets the ID for this test
     * @returns {number} test ID
     */
    getId() {
        return this.id;
    }

    /**
     * Gets the ID of the condition this test belongs to
     * @returns {number} condition ID
     */
    getConditionId() {
        return this.conditionId;
    }

    _generateDivHtml(testType) {
        // Opening div tag for the test container
        return '<div class="testContainer ' + testType + '" id="'
                + getTestId(this.conditionId, this.id) + '">'
    }

    _generateCat1Html() {
        // <select> for the first Category
        let testStr = '<select id="' + getTestCat1Id(this.conditionId, this.id) + '">';
        this.puzzle.getCategories().forEach(category => {
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getIdentifier() + "</option>";
        });
        return testStr + "</select>";
    }

    _generateOption1Html() {
        // <select> for the first Category's option
        let testStr = '<select id="' + getTestOption1Id(this.conditionId, this.id) + '">';
        let firstCategory = this.puzzle.getCategoryByIndex(0);
        firstCategory.getOptions().forEach(option => {
            testStr += "<option value='" + option.getId() + "'>"
                    + option.getIdentifier() + "</option>";
        });
        return testStr + "</select>";
    }

    _generateTypeHtml(...types) {
        // <select> for the test
        let typeStr = '<select id="' + getTestTypeId(this.conditionId, this.id) + '">';
        types.forEach(type => {
            // Add each test type option
            typeStr += '<option>' + type + '</option>'
        })
        return typeStr + "</select>";
    }

    _generateCat2Html() {
        // <select> for the second Category
        let testStr = '<select id="' + getTestCat2Id(this.conditionId, this.id) + '">';
        this.puzzle.getCategories().forEach(category => {
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getIdentifier() + "</option>";
        });
        return testStr + "</select>";
    }

    _generateOption2Html() {
        // <select> for the second Category's option
        let testStr = '<select id="' + getTestOption2Id(this.conditionId, this.id) + '">';
        let firstCategory = this.puzzle.getCategoryByIndex(0);
        firstCategory.getOptions().forEach(option => {
            testStr += "<option value='" + option.getId() + "'>"
                    + option.getIdentifier() + "</option>";
        });
        return testStr + "</select>";
    }

    _generateRemoveHtml() {
        // Button to remove test
        return '<button type="button" class="internalButton" onclick="binding.removeTest('
                + this.conditionId + ', ' + this.id + ');">Remove</button>';
    }

    /**
     * Finds all the View elements linked to this test
     */
    findViewElements() {
        this.testDiv = document.getElementById(
                getTestId(this.conditionId, this.id));
        this.cat1Select = document.getElementById(
                getTestCat1Id(this.conditionId, this.id));
        this.option1Select = document.getElementById(
                getTestOption1Id(this.conditionId, this.id));
        this.typeSelect = document.getElementById(
                getTestTypeId(this.conditionId, this.id));
        this.cat2Select = document.getElementById(
                getTestCat2Id(this.conditionId, this.id));
        this.option2Select = document.getElementById(
                getTestOption2Id(this.conditionId, this.id));
    }

    saveValues() {
        this.findViewElements();
        this.cat1 = this.getCat1();
        this.option1 = this.getOption1();
        this.type = this.getType();
        this.cat2 = this.getCat2();
        this.option2 = this.getOption2();
    }

    /**
     * Gets the test div element
     */
    getTestElement() {
        return this.testDiv;
    }

    /**
     * Gets the value for the first category ID
     */
    getCat1() {
        return this.cat1Select.value;
    }

    /**
     * Gets the value for the first option ID
     */
    getOption1() {
        return this.option1Select.value;
    }

    /**
     * Gets the test type
     */
    getType() {
        return this.typeSelect.value;
    }

    /**
     * Gets the value for the second category ID
     */
    getCat2() {
        return this.cat2Select.value;
    }

    /**
     * Gets the value for the second option ID
     */
    getOption2() {
        return this.option2Select.value;
    }
}

class MatchTestViewModel extends TestViewModel {
    constructor(puzzle, conditionId, testId) {
        super(puzzle, conditionId, testId);
    }

    generateHtml() {
        // Create test container
        let testStr = this._generateDivHtml("matchTest")
            + this._generateCat1Html() + " " + this._generateOption1Html() + " "
            + this._generateTypeHtml("is", "isn't") + " "
            + this._generateCat2Html() + " " + this._generateOption2Html();
        return testStr + "</div>";
    }
}

class CompareTestViewModel extends TestViewModel {
    constructor(puzzle, conditionId, testId) {
        super(puzzle, conditionId, testId);
    }

    generateHtml() {
        // Create test container
        let testStr = this._generateDivHtml("compareTest")
            + this._generateCat1Html() + " " + this._generateOption1Html() + " "
            + this._generateSubCat1Html() + " " + this._generateOps1Html() + " "
            + this._generateTypeHtml("=", "!=", "<", "<=", ">", ">=") + " "
            + this._generateCat2Html() + " " + this._generateOption2Html() + " "
            + this._generateSubCat2Html() + " " + this._generateOps2Html();
        return testStr + "</div>";
    }

    _generateSubCat1Html() {
        // <select> for the first sub-category
        let testStr = '<select id="' + getTestSubCat1Id(this.conditionId, this.id) + '">';
        this.puzzle.getCategories().forEach(category => {
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getIdentifier() + "</option>";
        });
        return testStr + "</select>";
    }

    _generateOps1Html() {
        // Operations for the first item
        return '<input maxlength="15" size="10" id="'
                + getTestOps1Id(this.conditionId, this.id)
                + '" placeholder="any operations">';
    }

    _generateSubCat2Html() {
        // <select> for the second sub-category
        let testStr = '<select id="' + getTestSubCat2Id(this.conditionId, this.id) + '">';
        this.puzzle.getCategories().forEach(category => {
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getIdentifier() + "</option>";
        });
        return testStr + "</select>";
    }

    _generateOps2Html() {
        // Operations for the second item
        return '<input maxlength="15" size="10" id="'
                + getTestOps2Id(this.conditionId, this.id)
                + '" placeholder="any operations">';
    }

    findViewElements() {
        super.findViewElements();
        this.subCat1Input = document.getElementById(
                getTestSubCat1Id(this.conditionId, this.id));
        this.ops1Input = document.getElementById(
                getTestOps1Id(this.conditionId, this.id));
        this.subCat2Input = document.getElementById(
                getTestSubCat2Id(this.conditionId, this.id));
        this.ops2Input = document.getElementById(
                getTestOps2Id(this.conditionId, this.id));
    }

    saveValues() {
        super.saveValues();
        this.subCat1Input = this.getSubCat1();
        this.ops1 = this.getOps1();
        this.subCat2Input = this.getSubCat2();
        this.ops2 = this.getOps2();
    }

    /**
     * Gets the value for the first sub-category ID
     */
    getSubCat1() {
        return this.subCat1Input.value;
    }

    /**
     * Gets the text describing operations to do on the option
     * selected for sub-category 1
     */
    getOps1() {
        return this.ops1Input.value;
    }

    /**
     * Gets the value for the second sub-category ID
     */
    getSubCat2() {
        return this.subCat2Input.value;
    }

    /**
     * Gets the text describing operations to do on the option
     * selected for sub-category 2
     */
    getOps2() {
        return this.ops2Input.value;
    }
}

/**
 * This class represents the View-Model for a condition
 */
class ConditionViewModel {
    /**
     * Constructs the View-Model for a condition on the puzzle
     * @param {Puzzle} puzzle is the Puzzle to link to
     * @param {number} conditionId is the ID of the condition
     */
    constructor(puzzle, conditionId) {
        this.puzzle = puzzle;
        this.id = conditionId;
        this.findViewElements();
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

    findViewElements() {
        this.testsDiv = document.getElementById(getTestsId(this.id));
        this.logicSelect = document.getElementById(getConditionLogicId(this.id));
        this.numSelect = document.getElementById(getConditionNumId(this.id));
    }

    /**
     * Adds a test to this Condition
     * @param {string} testType is the string explaining the test type
     */
    addTest(testType) {
        // Create the correct type of test
        this.findViewElements();
        if (testType === "match") {
            var testVM = new MatchTestViewModel(
                    this.puzzle, this.id, this.currentTestId);
        } else if (testType === "compare") {
            var testVM = new CompareTestViewModel(
                    this.puzzle, this.id, this.currentTestId);
        } else {
            return;
        }

        // Generate the HTML and save the View-Model
        this.testsDiv.innerHTML += testVM.generateHtml();
        testVM.saveValues();
        this.tests.set(this.currentTestId, testVM);
        ++this.currentTestId;

        // Update max of num input
        this.updateMaxNum();
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
        
        // Update max of num input
        this.updateMaxNum();
    }

    /**
     * Updates the max value of the number true selector based
     * on the number of tests in the condition
     */
    updateMaxNum() {
        this.findViewElements();
        this.numSelect.max = this.tests.size;
    }

    /**
     * Creates the Condition from the user's inputs in the View
     */
    createCondition() {
        // Get the number of tests true
        this.findViewElements();
        let logic = this.logicSelect.value;
        let numTrue = Number(this.numSelect.value);

        // Create the tests
        let tests = new Array(this.tests.size);
        for (testVM of this.tests.values()) {
            tests.push(testVM.createTest());
        }

        // Create the condition
        return Condition();
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
        conditionVM.addTest("compare");
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
            + '<select id="' + getConditionLogicId(this.currentConditionId) + '"><option>=</option><option>!=</option><option>&lt;</option>'
            + '<option>&lt;=</option><option>&gt;=</option><option>&gt;=</option>'
            + '</select> <input type="number" value="1" min="0" style="width: 5em" id="'
            + getConditionNumId(this.currentConditionId) + '">'
            + '<button type="button" class="internalButton" onclick="binding.removeCondition('
            + this.currentConditionId + ');">Remove Condition</button><hr>'
            + '<div id="' + testsIdStr + '"></div>'
            + '<button type="button" class="externalButton" onclick="binding.addTest('
            + this.currentConditionId + ', ' + "'match'" + ');">Add Match Test</button> '
            + '<button type="button" class="externalButton" onclick="binding.addTest('
            + this.currentConditionId + ', ' + "'compare'" + ');">Add Compare Test</button>';
        return conditionStr + "</div>";
    }

    /**
     * Removes a Condition
     * @param {number} conditionId is the ID of the condition to remove
     */
    removeCondition(conditionId) {
        let newHtml = "";
        for (const conditionVM of this.conditions.values()) {
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
     * @param {string} testType is the string telling the test type
     */
    addTest(conditionId, testType) {
        this.conditions.get(conditionId).addTest(testType);
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