# Changelog

## 20240905

### Fixes

- Fixed warnings about keys (give each TodoItem a unique key).
- Fixed deletion of todo items (logic error was previously deleting all items EXCEPT the chosen one).
- Fixed logic for filtering lists down to just urgent or non-urgent incomplete items.
- Fixed adding an item:
  - In AddTodoForm > handleSubmit, prevented the default submission event to avoid reloading the page.
  - In AddTodo, copy the todos array before passing it to setTodos - allows React to see it as a new array and update the state correctly, rendering the newly added item in the list.
- Fixed issue with toggleProperty by removing the 'useCallback' part - it was not using the state properly, so if new items beyond the sample data had been added, they would go missing when this function was called.
- Fixed logic for new item IDs - with the previous array length method, if items with lower IDs were removed, then adding new items would try to use existing IDs and fail. Now tracking the current maximum ID in state and incrementing from there for new IDs.

### Other adjustments

- Added titles above each list for clarity (passing in "name" string when rendering lists).
- Adjusted banner logic to have a backup image in case of API rate limits/failures.
- Removed resize logic for banner image - the container is set to max 800px wide anyway, so there is no visible difference between using the "HD" image and the smaller one.
- Changed "Banner Loading" render to keep the page title and banner structure. Makes it look less jarring if the image loads in late.
- Adjusted padding on banner title and copyright notice
- Adjusted placeholder text for Title and Description fields in AddTodoForm to be more consistent with each other.
- Changed font on textarea elements to match the rest of the site.

### Future scope

- Not sure if it's in scope for this assignment to store the list data more permanently - could read/write another json file or database when updating todos.
