# Logic Puzzle Website
The logic puzzle website allows the user to enter any number of categories, with the same number of options per each.
Then enter each condition as a collection of tests, of which a certain number must be passed for the condition to pass.
If a solution can be found, the table will display the first one found.

### Match Test
A match test locates the entity that has each option as an attribute, and checks if they are the same entity.

Example: `color` `red` IS `shape` `circle`

The red entity must also be the circle

### Compare Test
A compare test find the entity with a given option as an attribute. It then finds which option that entity has
selected for the given sub-category. The string value of that option's name is compared to the other option's name.
Operations may be done on each option name (such as converting to a number for numerical comparison).

Example: `color` `red` `sideCount` > `color` `blue` `sideCount`

The entity that is red must have a larger sideCount than the entity that is blue.

### Operations
`[i]` - selects the `i`'th character from the string (0-indexed)
`#` - converts string to number
`+n` - adds by `n`
`-n` - subtracts by `n`
`*n` - multiplies by `n`
`/n` - divides by `n`
