/**
 * This program defines the View-Model for the Logic Puzzle Solver site.
 * It will allow me to keep track of each category + options, as well
 * as each condition and tests.
 * @author Gavin Vogt
 */



/**
 * Creates the cell ID string for the given cell
 * @param {number} cat1 is the ID of the first category
 * @param {number} option1 is the ID of the first option
 * @param {number} cat2  is the ID of the second category
 * @param {number} option2 is the ID of the second option
 * @returns {string} cell ID used within the HTML view
 * @example getCellId(0, 0, 1, 2) - 'cell0,0-1,2'
 */
function getCellId(cat1, option1, cat2, option2) {
    return "cell" + cat1 + "," + option1 + "-" + cat2 + "," + option2;
}

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
 * @param {number} num is the number of the category
 * @returns {string} ID for the first category selection element
 * @example getTestCat1Id(1, 2, 1) - 'test1,2cat1'
 */
function getTestCatId(conditionId, testId, num) {
    return getTestId(conditionId, testId) + "cat" + num;
}

/**
 * Creates the ID string for the first option selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @param {number} num is the number of the option
 * @returns {string} ID for the first option selection element
 * @example getTestOption1Id(1, 2, 1) - 'test1,2option1'
 */
function getTestOptionId(conditionId, testId, num) {
    return getTestId(conditionId, testId) + "option" + num;
}

/**
 * Creates the ID string for the first sub-category selection element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @param {number} num is the number of the sub-category
 * @returns {string} ID for the first sub-category selection element
 * @example getTestSubCat1Id(1, 2, 1) - 'test1,2subCat1'
 */
function getTestSubCatId(conditionId, testId, num) {
    return getTestId(conditionId, testId) + "subCat" + num;
}

/**
 * Creates the ID string for the first operations input element
 * of the given test
 * @param {number} conditionId is the ID of the condition
 * @param {number} testId is the ID of the test
 * @param {number} num is the number of the operations
 * @returns {string} ID for the first operations input element
 * @example getTestOps1Id(1, 2, 1) - 'test1,2ops1'
 */
function getTestOpsId(conditionId, testId, num) {
    return getTestId(conditionId, testId) + "ops" + num;
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
 * Clears all the child nodes of the given parent node
 * @param parent is the document element to clear
 */
function clearChildren(parent) {
    while (parent.firstChild) {
        parent.remove(parent.firstChild);
    }
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
        this.findViewElements();
        let curNum = this.optionInputs.length;
        let numToAdd = numOptions - curNum;
        if (numToAdd > 0) {
            for (let i = 0; i < numToAdd; ++i) {
                this._addOptionInput(curNum + i);
            }
        } else if (numToAdd < 0) {
            numToAdd = -numToAdd;
            for (let i = 0; i < numToAdd; ++i) {
                this._removeOptionInput();
            }
        }
    }

    /**
     * Adds an option to both the Puzzle model and the View. SHOULD ONLY
     * BE USED WHILE SETTING UP THE CATEGORY FOR THE FIRST TIME
     */
    addOption() {
        let newOption = this.puzzle.getCategoryById(this.id).addOption();
        this._addOptionInput(newOption.getId());
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
        this._findInputs();
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
        // Create the input element
        let input = document.createElement("input");
        input.id = getOptionId(this.id, optionId);
        input.onchange = function() {
            binding.updatePuzzle();
        };
        input.required = true;

        // Add to the div
        this.optionsDiv.append(
            "Option " + (optionId + 1) + ": ",
            input,
            document.createElement("br")
        );
    }

    /**
     * Removes the last option input field in this category
     */
    _removeOptionInput() {
        // Remove test, input, and <br>
        for (let i = 0; i < 3; ++i) {
            this.optionsDiv.lastChild.remove();
        }
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

    /**
     * Updates the various view inputs in the test based on
     * the new data in the Puzzle
     */
    update() {
        // Save the previous values
        this.saveValues();

        // Category + option 1 selections
        this._fillCatSelect(this.cat1Select, this.cat1);
        let category = this.puzzle.getCategoryById(this.cat1Select.value);
        this._fillOptionSelect(category, this.option1Select, this.option1);

        // Category + option 2 selections
        this._fillCatSelect(this.cat2Select, this.cat2);
        category = this.puzzle.getCategoryById(this.cat2Select.value);
        this._fillOptionSelect(category, this.option2Select, this.option2);
    }

    /**
     * Fills up a category selecter with all the categories from the Puzzle
     * @param {HTMLSelectElement} catSelect 
     * @param prevValue is the previous value the select was set to
     */
    _fillCatSelect(catSelect, prevValue) {
        // Clear all previous options
        clearChildren(catSelect);

        // Remember what category to set value to
        let prevCategory = this.puzzle.getCategoryById(prevValue);
        if (!prevCategory) {
            // Default to first category
            prevCategory = this.puzzle.getCategoryByIndex(0);
        }

        // Add each option
        this.puzzle.getCategories().forEach(category => {
            let catOption = document.createElement("option");
            catOption.value = category.getId();
            catOption.text = category.getName();
            catSelect.append(catOption);
        });

        // Set the value
        catSelect.value = prevCategory.getId()
    }

    /**
     * Fills up an option selecter with all the options from the given category
     * @param {Category} category is the category to get options from
     * @param {HTMLSelectElement} optionSelect is the select element
     * @param prevValue is the previous value of the select
     */
    _fillOptionSelect(category, optionSelect, prevValue) {
        // Clear all previous options
        clearChildren(optionSelect);

        // Remember what category to set value to
        let prevOption = category.getOption(prevValue);
        if (!prevOption) {
            // Default to first option
            prevOption = category.getOption(0);
        }

        // Add each option
        category.getOptions().forEach(option => {
            let optOption = document.createElement("option");
            optOption.value = option.getId();
            optOption.text = option.getName();
            optionSelect.append(optOption);
        });

        // Set the value
        optionSelect.value = prevOption.getId()
    }

    /**
     * Creates the div that the test will be held in
     * @returns {HTMLDivElement} of the div for the test
     */
    _createDiv(testType) {
        // Div for the test container
        let testDiv = document.createElement("div");
        testDiv.className = "testContainer " + testType;
        testDiv.id = getTestId(this.conditionId, this.id);
        return testDiv;
    }

    /**
     * Gerates the HTML string for a category select element
     * @param {number} num is the number (1 or 2)
     * @returns {string} HTML for the category select
     */
    _generateCatHtml(num) {
        // <select> for the a Category
        let testStr = '<select id="' + getTestCatId(this.conditionId, this.id, num)
                    + '" onchange="binding.updateTests(' + this.conditionId + ');">';
        this.puzzle.getCategories().forEach(category => {
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getName() + "</option>";
        });
        return testStr + "</select>";
    }

    /**
     * Gerates the HTML string for an option select element
     * @param {number} num is the number (1 or 2)
     * @returns {string} HTML for the option select
     */
    _generateOptionHtml(num) {
        // <select> for an option
        let testStr = '<select id="' + getTestOptionId(this.conditionId, this.id, num) + '">';
        let firstCategory = this.puzzle.getCategoryByIndex(0);
        firstCategory.getOptions().forEach(option => {
            testStr += "<option value='" + option.getId() + "'>"
                    + option.getName() + "</option>";
        });
        return testStr + "</select>";
    }

    /**
     * Generates the HTML string for a test type select element
     * @param  {...string} types are all the test type options to include
     * @returns {string} HTML for the type select
     */
    _generateTypeHtml(...types) {
        // <select> for the test
        let typeStr = '<select id="' + getTestTypeId(this.conditionId, this.id) + '">';
        types.forEach(type => {
            // Add each test type option
            typeStr += '<option>' + type + '</option>'
        })
        return typeStr + "</select>";
    }

    /**
     * Generates the HTML string for the test remove button
     * @returns {string} HTML for the test remove button
     */
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
                getTestCatId(this.conditionId, this.id, 1));
        this.option1Select = document.getElementById(
                getTestOptionId(this.conditionId, this.id, 1));
        this.typeSelect = document.getElementById(
                getTestTypeId(this.conditionId, this.id));
        this.cat2Select = document.getElementById(
                getTestCatId(this.conditionId, this.id, 2));
        this.option2Select = document.getElementById(
                getTestOptionId(this.conditionId, this.id, 2));
    }

    /**
     * Saves all the values for this test
     */
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

    /**
     * Creates the div for entering the test
     * @returns {HTMLDivElement} div holding the test input
     */
    generateTestDiv() {
        // Create test container
        let testDiv = this._createDiv("matchTest");
        testDiv.innerHTML = this._generateCatHtml(1) + " "
            + this._generateOptionHtml(1) + " "
            + this._generateTypeHtml("is", "isn't") + " "
            + this._generateCatHtml(2) + " " + this._generateOptionHtml(2)
            + this._generateRemoveHtml();
        return testDiv;
    }

    /**
     * Creates the Test corresponding to the inputs in the View
     * @returns {MatchTest} MatchTest created from the inputs
     */
    createTest() {
        this.findViewElements();
        let cat1 = Number(this.getCat1());
        let option1 = Number(this.getOption1());
        let type = this.getType();
        let cat2 = Number(this.getCat2());
        let option2 = Number(this.getOption2());
        return new MatchTest(cat1, option1, type, cat2, option2);
    }
}

class CompareTestViewModel extends TestViewModel {
    constructor(puzzle, conditionId, testId) {
        super(puzzle, conditionId, testId);
    }

    /**
     * Finds all the elements in the View
     */
    findViewElements() {
        super.findViewElements();
        this.subCat1Select = document.getElementById(
            getTestSubCatId(this.conditionId, this.id, 1));
        this.ops1Input = document.getElementById(
            getTestOpsId(this.conditionId, this.id, 1));
        this.subCat2Select = document.getElementById(
            getTestSubCatId(this.conditionId, this.id, 2));
        this.ops2Input = document.getElementById(
            getTestOpsId(this.conditionId, this.id, 2));
    }

    /**
     * Creates the div for this test
     * @returns {HTMLDivElement} div for the test
     */
    generateTestDiv() {
        // Create test container
        let testDiv = this._createDiv("compareTest");
        testDiv.innerHTML = this._generateCatHtml(1) + " "
            + this._generateOptionHtml(1) + " "
            + this._generateSubCatHtml(1) + " " + this._generateOpsHtml(1) + " "
            + this._generateTypeHtml("=", "!=", "<", "<=", ">", ">=") + " "
            + this._generateCatHtml(2) + " " + this._generateOptionHtml(2) + " "
            + this._generateSubCatHtml(2) + " " + this._generateOpsHtml(2)
            + this._generateRemoveHtml();
        return testDiv;
    }

    /**
     * Generates the HTML string for the sub-category select element
     * @param {number} num is the number (1 or 2)
     * @returns {string} HTML for the sub-category select element
     */
    _generateSubCatHtml(num) {
        // <select> for a sub-category
        let testStr = '<select id="' + getTestSubCatId(this.conditionId, this.id, num) + '">';
        this.puzzle.getCategories().forEach(category => {
            testStr += "<option value='" + category.getId() + "'>"
                    + category.getName() + "</option>";
        });
        return testStr + "</select>";
    }

    /**
     * Generates the HTML string for the operations input element
     * @param {number} num is the number (1 or 2)
     * @returns {string} HTML for the operations input element
     */
    _generateOpsHtml(num) {
        // Operations for the operations to do
        return '<input maxlength="15" size="10" id="'
                + getTestOpsId(this.conditionId, this.id, num)
                + '" placeholder="any operations">';
    }

    /**
     * Updates the various view inputs in the test based on
     * the new data in the Puzzle
     */
    update() {
        // Save the previous values
        this.saveValues();

        // Category + option 1 selections
        this._fillCatSelect(this.cat1Select, this.cat1);
        let category = this.puzzle.getCategoryById(this.cat1Select.value);
        this._fillOptionSelect(category, this.option1Select, this.option1);
        this._fillCatSelect(this.subCat1Select, this.subCat1);

        // Category + option 2 selections
        this._fillCatSelect(this.cat2Select, this.cat2);
        category = this.puzzle.getCategoryById(this.cat2Select.value);
        this._fillOptionSelect(category, this.option2Select, this.option2);
        this._fillCatSelect(this.subCat2Select, this.subCat2);
    }

    /**
     * Saves the values for this test
     */
    saveValues() {
        super.saveValues();
        this.subCat1 = this.getSubCat1();
        this.ops1 = this.getOps1();
        this.subCat2 = this.getSubCat2();
        this.ops2 = this.getOps2();
    }

    /**
     * Gets the value for the first sub-category ID
     */
    getSubCat1() {
        return this.subCat1Select.value;
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
        return this.subCat2Select.value;
    }

    /**
     * Gets the text describing operations to do on the option
     * selected for sub-category 2
     */
    getOps2() {
        return this.ops2Input.value;
    }

    /**
     * Creates the Test corresponding to the inputs in the View
     * @returns {CompareTest} CompareTest created from the inputs
     */
    createTest() {
        this.findViewElements();
        let cat1 = Number(this.getCat1());
        let option1 = Number(this.getOption1());
        let subCat1 = Number(this.getSubCat1());
        let ops1 = this.getOps1();
        let type = this.getType();
        let cat2 = Number(this.getCat2());
        let option2 = Number(this.getOption2());
        let subCat2 = Number(this.getSubCat2());
        let ops2 = this.getOps2();
        return new CompareTest(cat1, option1, subCat1, ops1, type, cat2, option2, subCat2, ops2);
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

    /**
     * Finds all the elements in the View
     */
    findViewElements() {
        this.testsDiv = document.getElementById(getTestsId(this.id));
        this.logicSelect = document.getElementById(getConditionLogicId(this.id));
        this.numSelect = document.getElementById(getConditionNumId(this.id));
    }

    /**
     * Updates the view for each test in the condition based on
     * the new information in the Puzzle
     */
    updateTests() {
        for (const testVM of this.tests.values()) {
            testVM.update();
        }
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

        // Add to the view
        let testDiv = testVM.generateTestDiv();
        this.testsDiv.append(testDiv);

        // Add to the model
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
        // Remove test from view
        let testDiv = document.getElementById(getTestId(this.id, testId));
        testDiv.parentNode.removeChild(testDiv);

        // Remove test from model
        this.tests.delete(testId);
        
        // Update max of num input
        this.updateMaxNum();
    }

    /**
     * Updates the max value of the number true selector based
     * on the number of tests in the condition. Might update
     * the value of the num selector as well
     */
    updateMaxNum() {
        this.findViewElements();
        let newMax = this.tests.size;
        if (this.numSelect.value == this.numSelect.max) {
            // Change value to new max
            this.numSelect.value = newMax;
        }
        this.numSelect.max = newMax;
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
        let tests = [];
        for (const testVM of this.tests.values()) {
            tests.push(testVM.createTest());
        }

        // Create the condition
        return new Condition(tests, numTrue, logic);
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
    _loadNamingInputs() {
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
     * Updates the tests for the Condition View-Model
     * @param {number} conditionId is the ID of the condition view to update
     */
    updateTests(conditionId) {
        this.conditions.get(conditionId).updateTests();
    }

    /**
     * Updates the puzzle table according to the information in the Puzzle
     */
    updatePuzzle() {
        this._loadNamingInputs();
        for (const conditionVM of this.conditions.values()) {
            conditionVM.updateTests();
        }
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
        this.updatePuzzle();
    }

    /**
     * Adds a category to the View and Model and increments the category ID
     * for the next time one is added
     */
    addCategory() {
        // Add the category to the view
        let categoryDiv = this._createCategoryInputDiv();
        this.categoriesDiv.append(categoryDiv);

        // Add the category to the model
        this.puzzle.addCategory(this.currentCategoryId);
        let categoryVM = new CategoryViewModel(puzzle, this.currentCategoryId);
        this.categories.set(this.currentCategoryId, categoryVM);
        
        // Add all the options to the category
        for (let i = 0, n = this.getNumOptions(); i < n; ++i) {
            categoryVM.addOption();
        }
        ++this.currentCategoryId;
    }

    /**
     * Creates the category input HTML string and adds it to the Categories div.
     * Uses the current category ID.
     * @returns {HTMLDivElement} div holding the category input
     */
    _createCategoryInputDiv() {
        // Create the category div
        let categoryDiv = document.createElement("div");
        categoryDiv.className = "categoryContainer";
        categoryDiv.id = getCategoryId(this.currentCategoryId);

        // Set the inner HTML of the div
        let catNameIdString = getCategoryNameId(this.currentCategoryId);
        let optionsIdString = getOptionsId(this.currentCategoryId);
        categoryDiv.innerHTML = "<i>Category " + (this.currentCategoryId + 1)
            + "</i>: <input id='" + catNameIdString + "' required onchange='binding.updatePuzzle();'>"
            + "<button type='button' class='internalButton' tabindex='-1' "
            + "onclick='binding.removeCategory(" + this.currentCategoryId
            + ");binding.updatePuzzle();'>Remove Category</button>"
            + "<hr><div class='optionInputDiv' id='" + optionsIdString
            + "'></div>";
        return categoryDiv
    }

    /**
     * Removes a category from the View and Model
     * @param {number} categoryId is the ID of the category to remove
     */
    removeCategory(categoryId) {
        // Remove from view
        let categoryDiv = document.getElementById(getCategoryId(categoryId));
        categoryDiv.parentNode.removeChild(categoryDiv);

        // Remove from model
        this.categories.delete(categoryId);
        this.puzzle.removeCategoryById(categoryId);
    }

    /**
     * Adds a condition to the page and updates the internal model
     */
    addCondition() {
        // Place the list item in the DOM tree
        let conditionItem = document.createElement("li");
        conditionItem.append(this._generateConditionInputDiv());
        this.conditionsList.append(conditionItem);

        // Add to the model
        let conditionVM = new ConditionViewModel(this.puzzle, this.currentConditionId);
        this.conditions.set(this.currentConditionId, conditionVM);
        ++this.currentConditionId;
    }

    /**
     * Generates the HTML code for a Condition input
     * @returns {HTMLDivElement} of the div for inputting the condition
     */
    _generateConditionInputDiv() {
        // Create condition container
        let conditionDiv = document.createElement("div");
        conditionDiv.className = "conditionContainer";
        conditionDiv.id = getConditionId(this.currentConditionId);

        // Create the HTML inside the div
        let testsIdStr = getTestsId(this.currentConditionId);
        conditionDiv.innerHTML = "Number of tests true must be "
            + '<select id="' + getConditionLogicId(this.currentConditionId) + '"><option>=</option><option>!=</option><option>&lt;</option>'
            + '<option>&lt;=</option><option>&gt;=</option><option>&gt;=</option>'
            + '</select> <input type="number" value="0" min="0" max="0" style="width: 5em" id="'
            + getConditionNumId(this.currentConditionId) + '">'
            + '<button type="button" class="internalButton" onclick="binding.removeCondition('
            + this.currentConditionId + ');">Remove Condition</button><hr>'
            + '<div id="' + testsIdStr + '"></div>'
            + '<button type="button" class="externalButton" onclick="binding.addTest('
            + this.currentConditionId + ', ' + "'match'" + ');">Add Match Test</button> '
            + '<button type="button" class="externalButton" onclick="binding.addTest('
            + this.currentConditionId + ', ' + "'compare'" + ');">Add Compare Test</button>';
        return conditionDiv;
    }

    /**
     * Removes a Condition
     * @param {number} conditionId is the ID of the condition to remove
     */
    removeCondition(conditionId) {
        // Remove condition from the View
        let conditionDiv = document.getElementById(getConditionId(conditionId));
        let listItem = conditionDiv.parentNode;
        listItem.parentNode.removeChild(listItem);

        // Remove condition from the model
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

    /**
     * Creates the array of Conditions based on the View
     * @returns {Condition[]} array of Conditions for puzzle to pass
     */
    createConditions() {
        let conditions = [];
        for (const conditionVM of this.conditions.values()) {
            conditions.push(conditionVM.createCondition());
        }
        return conditions;
    }

}