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
 * This class represents the View-Model for the information on the Logic
 * Puzzle solver site.
 */
class ViewModel {
    constructor(document, puzzle) {
        // Get all the important elements from the view
        this.document = document;
        this.puzzleTable = document.getElementById("puzzle");
        this.numOptionsInput = document.getElementById("numOptions");
        this.categoriesDiv = document.getElementById("categories");
        this.conditionsList = document.getElementById("conditions");

        // Components of the model
        this.puzzle = puzzle;
        this.categories = {};  // {category ID: category input element}

        // Counter variables
        this.currentCategoryId = 0;
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
        this.categories[this.currentCategoryId] = this.document.getElementById(
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
        let optionsDiv = this.document.getElementById(getOptionsId(categoryId));
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
        //this.puzzle.removeCategory(this.currentCategoryId);
    }
}