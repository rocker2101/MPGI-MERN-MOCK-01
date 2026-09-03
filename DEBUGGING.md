# Task 4 — Part B: Debugging Challenge Solution

This document details the issues found in the buggy JavaScript snippet provided in `TEST.md` (Task 4 Part B) and provides the corrected, fixed code.

---

## 1. Identified Problems in Buggy Code

1. **Page Reloads on Form Submit**:
   - **Issue:** The `submit` event listener did not call `event.preventDefault()`. As a result, the browser executed standard form submission and reloaded the page, instantly wiping out newly created cards.
   - **Fix:** Added `event.preventDefault();` at the beginning of the `submit` event handler.

2. **Validation Does Not Stop Execution**:
   - **Issue:** When `name.trim() === ""` was true, `alert("Name is required")` was shown, but there was no `return;` statement. Execution proceeded to create an empty student card.
   - **Fix:** Added `return;` inside the validation block so card creation is halted when validation fails.

3. **Delete Button Never Triggered Click Handler**:
   - **Issue:** The click delegation handler listened for elements with `delete-btn` (`event.target.classList.contains("delete-btn")`). However, the `deleteButton` element created in the submit handler was never assigned the `"delete-btn"` class name.
   - **Fix:** Added `deleteButton.classList.add("delete-btn");` when creating the button.

4. **Fragile DOM Traversal with `parentElement`**:
   - **Issue:** The delete handler used `const card = event.target.parentElement;`, which breaks if the button is nested within other wrappers or child elements.
   - **Fix:** Used `event.target.closest(".student-card")` as explicitly required by the assessment specification.

5. **Input Field Not Cleared After Submission**:
   - **Issue:** After successfully adding a student, `studentName.value` remained unchanged instead of clearing for the next entry.
   - **Fix:** Added `studentName.value = "";` following successful card addition.

---

## 2. Corrected & Fixed JavaScript Code

```javascript
const form =
    document.querySelector("#studentForm");

const studentName =
    document.querySelector("#studentName");

const studentContainer =
    document.querySelector("#studentContainer");

form.addEventListener(
    "submit",
    function (event) {
        // Fix 1: Prevent page reload
        event.preventDefault();

        const name =
            studentName.value;

        // Fix 2: Reject empty or whitespace-only names and return early
        if (name.trim() === "") {
            alert("Name is required");
            return;
        }

        // Fix 3: Create student card
        const card =
            document.createElement("div");

        card.classList.add("student-card");

        const heading =
            document.createElement("h3");

        heading.textContent =
            name;

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Delete";

        // Fix 4: Add required 'delete-btn' class so event delegation detects it
        deleteButton.classList.add("delete-btn");

        card.appendChild(heading);
        card.appendChild(deleteButton);
        studentContainer.appendChild(card);

        // Fix 5: Clear input after successful card addition
        studentName.value = "";
    }
);

studentContainer.addEventListener(
    "click",
    function (event) {
        // Event delegation: check if clicked element is or is inside .delete-btn
        if (
            event.target.classList.contains("delete-btn") ||
            event.target.closest(".delete-btn")
        ) {
            // Fix 6: Use closest() to find the related .student-card
            const card =
                event.target.closest(".student-card");

            if (card) {
                card.remove();
            }
        }
    }
);
```

---

## 3. Verification of Expected Behaviors

| Requirement | Status | Verification |
|-------------|--------|--------------|
| Page does not refresh after form submission | **Fixed** | Handled via `event.preventDefault()` |
| Empty or space-only names are rejected | **Fixed** | Handled via `name.trim() === ""` |
| Card is not created when validation fails | **Fixed** | Handled via early `return` |
| Valid names create student cards | **Fixed** | `studentContainer.appendChild(card)` executes for valid inputs |
| Multiple cards can be added | **Fixed** | Appends cards sequentially without overwriting |
| Delete button works correctly | **Fixed** | Enabled by adding `.delete-btn` class |
| Only selected card is deleted | **Fixed** | Targets specific `.student-card` instance |
| Use `closest()` to locate student card | **Fixed** | Uses `event.target.closest(".student-card")` |
| Input clears after submission | **Fixed** | Reset with `studentName.value = ""` |
