/**
 * TaskFlow - Student Application Manager
 * Assessment Implementation (Vanilla JavaScript)
 */

// ==========================================================
// Task 3: Student Data Storage
// ==========================================================
const students = [];
let nextStudentId = 1;

// ==========================================================
// DOM Elements Selection
// ==========================================================
const studentForm = document.getElementById("studentForm");
const studentNameInput = document.getElementById("studentName");
const studentEmailInput = document.getElementById("studentEmail");
const studentPhoneInput = document.getElementById("studentPhone");
const studentDobInput = document.getElementById("studentDob");
const studentCourseInput = document.getElementById("studentCourse");
const studentAboutInput = document.getElementById("studentAbout");
const studentPhotoInput = document.getElementById("studentPhoto");

const studentContainer = document.getElementById("studentContainer");
const studentCountElement = document.getElementById("studentCount");
const emptyStateElement = document.getElementById("emptyState");

// Error Message Elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const dobError = document.getElementById("dobError");
const genderError = document.getElementById("genderError");
const courseError = document.getElementById("courseError");
const skillsError = document.getElementById("skillsError");
const aboutError = document.getElementById("aboutError");
const photoError = document.getElementById("photoError");

// ==========================================================
// Regular Expressions for Validation
// ==========================================================
// Name: Minimum 3 characters, only letters and spaces allowed
const nameRegex = /^[A-Za-z\s]+$/;

// Email: Standard email pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone: Exactly 10 numeric digits
const phoneRegex = /^\d{10}$/;

// ==========================================================
// Helper Functions: UI & Validation Feedback
// ==========================================================

/**
 * Clear all error messages and visual indicators
 */
function clearErrors() {
    const errorElements = [
        nameError, emailError, phoneError, dobError,
        genderError, courseError, skillsError, aboutError, photoError
    ];
    errorElements.forEach(el => {
        if (el) el.textContent = "";
    });

    const inputs = [
        studentNameInput, studentEmailInput, studentPhoneInput,
        studentDobInput, studentCourseInput, studentAboutInput, studentPhotoInput
    ];
    inputs.forEach(input => {
        if (input) input.classList.remove("input-error");
    });
}

/**
 * Update the total student count display and toggle empty state
 */
function updateStudentCount() {
    studentCountElement.textContent = `Total Students: ${students.length}`;
    if (emptyStateElement) {
        if (students.length === 0) {
            emptyStateElement.style.display = "block";
        } else {
            emptyStateElement.style.display = "none";
        }
    }
}

/**
 * Reset form fields and clear previous errors
 */
function resetForm() {
    studentForm.reset();
    clearErrors();
}

// ==========================================================
// Task 2: Form Handling & Validation
// ==========================================================
studentForm.addEventListener("submit", function (event) {
    // 1. Prevent default form submission behaviour
    event.preventDefault();

    // Clear previous error messages
    clearErrors();

    // 2. Read values entered by user
    const nameVal = studentNameInput.value.trim();
    const emailVal = studentEmailInput.value.trim();
    const phoneVal = studentPhoneInput.value.trim();
    const dobVal = studentDobInput.value;
    const courseVal = studentCourseInput.value;
    const aboutVal = studentAboutInput.value.trim();
    const photoFile = studentPhotoInput.files[0];

    // Gender selection
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    const genderVal = selectedGender ? selectedGender.value : "";

    // Skills selection
    const checkedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
        .map(input => input.value);

    // 3. Validation Logic
    let isValid = true;

    // Validate Student Name:
    // - Required
    // - Minimum 3 characters
    // - Only letters and spaces allowed (Regex)
    if (!nameVal) {
        nameError.textContent = "Student Name is required.";
        studentNameInput.classList.add("input-error");
        isValid = false;
    } else if (nameVal.length < 3) {
        nameError.textContent = "Name must be at least 3 characters long.";
        studentNameInput.classList.add("input-error");
        isValid = false;
    } else if (!nameRegex.test(nameVal)) {
        nameError.textContent = "Name must only contain letters and spaces.";
        studentNameInput.classList.add("input-error");
        isValid = false;
    }

    // Validate Email:
    // - Required
    // - Must be a valid email format
    if (!emailVal) {
        emailError.textContent = "Email address is required.";
        studentEmailInput.classList.add("input-error");
        isValid = false;
    } else if (!emailRegex.test(emailVal)) {
        emailError.textContent = "Please enter a valid email address.";
        studentEmailInput.classList.add("input-error");
        isValid = false;
    }

    // Validate Phone Number:
    // - Required
    // - Must contain exactly 10 digits
    // - Must contain numbers only (Regex)
    if (!phoneVal) {
        phoneError.textContent = "Phone number is required.";
        studentPhoneInput.classList.add("input-error");
        isValid = false;
    } else if (!phoneRegex.test(phoneVal)) {
        phoneError.textContent = "Phone number must be exactly 10 numeric digits.";
        studentPhoneInput.classList.add("input-error");
        isValid = false;
    }

    // Validate Date of Birth:
    // - Required
    // - Future dates should not be accepted
    if (!dobVal) {
        dobError.textContent = "Date of Birth is required.";
        studentDobInput.classList.add("input-error");
        isValid = false;
    } else {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayFormatted = `${yyyy}-${mm}-${dd}`;
        if (dobVal > todayFormatted) {
            dobError.textContent = "Date of Birth cannot be in the future.";
            studentDobInput.classList.add("input-error");
            isValid = false;
        }
    }

    // Validate Gender:
    // - One option must be selected
    if (!genderVal) {
        genderError.textContent = "Please select a gender.";
        isValid = false;
    }

    // Validate Course:
    // - A course must be selected
    if (!courseVal) {
        courseError.textContent = "Please select a course.";
        studentCourseInput.classList.add("input-error");
        isValid = false;
    }

    // Validate Skills:
    // - At least one skill must be selected
    if (checkedSkills.length === 0) {
        skillsError.textContent = "Please select at least one skill.";
        isValid = false;
    }

    // Validate About Student:
    // - Required
    // - Input containing only spaces should not be accepted
    if (!aboutVal) {
        aboutError.textContent = "About Student description is required.";
        studentAboutInput.classList.add("input-error");
        isValid = false;
    }

    // Validate Profile Photo:
    // - A profile photo must be selected
    if (!photoFile) {
        photoError.textContent = "Please select a profile photo.";
        studentPhotoInput.classList.add("input-error");
        isValid = false;
    }

    // 5. Do not continue if the form contains invalid data
    if (!isValid) {
        return;
    }

    // ==========================================================
    // Task 3: Student Object Creation & Dynamic Card Generation
    // ==========================================================
    const reader = new FileReader();
    reader.onload = function (e) {
        const photoDataUrl = e.target.result;

        // Create student object
        const newStudent = {
            id: nextStudentId++,
            name: nameVal,
            email: emailVal,
            phone: phoneVal,
            dob: dobVal,
            gender: genderVal,
            course: courseVal,
            skills: checkedSkills,
            about: aboutVal,
            photo: photoDataUrl
        };

        // Add to students array
        students.push(newStudent);

        // Render dynamic student card using DOM methods
        renderStudentCard(newStudent);

        // Update student count
        updateStudentCount();

        // Form Reset after successful submission
        resetForm();
    };

    reader.readAsDataURL(photoFile);
});

// ==========================================================
// Task 3: Dynamic Student Card Creation using DOM Methods
// ==========================================================
/**
 * Creates and appends a student card to studentContainer using DOM methods:
 * document.createElement(), appendChild(), append(), classList.add(), textContent
 */
function renderStudentCard(student) {
    // 1. Create main card element
    const card = document.createElement("div");
    card.classList.add("student-card");
    card.setAttribute("data-id", student.id);

    // 2. Card Top (Photo + Basic Info)
    const cardTop = document.createElement("div");
    cardTop.classList.add("card-top");

    // Profile Photo
    const photoImg = document.createElement("img");
    photoImg.classList.add("student-photo");
    photoImg.setAttribute("src", student.photo);
    photoImg.setAttribute("alt", `${student.name}'s Photo`);

    // Title Group
    const titleGroup = document.createElement("div");
    titleGroup.classList.add("card-title-group");

    const nameHeading = document.createElement("h3");
    nameHeading.classList.add("student-name");
    nameHeading.textContent = student.name;

    const courseBadge = document.createElement("span");
    courseBadge.classList.add("course-badge");
    courseBadge.textContent = student.course;

    titleGroup.append(nameHeading, courseBadge);

    cardTop.appendChild(photoImg);
    cardTop.appendChild(titleGroup);

    // 3. Card Details List
    const cardDetails = document.createElement("div");
    cardDetails.classList.add("card-details");

    // Helper to create a detail row
    function createDetailRow(labelText, valueText) {
        const row = document.createElement("div");
        row.classList.add("detail-row");

        const label = document.createElement("span");
        label.classList.add("detail-label");
        label.textContent = labelText;

        const val = document.createElement("span");
        val.classList.add("detail-value");
        val.textContent = valueText;

        row.appendChild(label);
        row.appendChild(val);
        return row;
    }

    cardDetails.appendChild(createDetailRow("Email:", student.email));
    cardDetails.appendChild(createDetailRow("Phone:", student.phone));
    cardDetails.appendChild(createDetailRow("Date of Birth:", student.dob));
    cardDetails.appendChild(createDetailRow("Gender:", student.gender));

    // Skills Row
    const skillsRow = document.createElement("div");
    skillsRow.classList.add("detail-row");
    const skillsLabel = document.createElement("span");
    skillsLabel.classList.add("detail-label");
    skillsLabel.textContent = "Skills:";
    const skillsContainer = document.createElement("div");
    skillsContainer.classList.add("skills-container");

    student.skills.forEach(skill => {
        const tag = document.createElement("span");
        tag.classList.add("skill-tag");
        tag.textContent = skill;
        skillsContainer.appendChild(tag);
    });

    skillsRow.appendChild(skillsLabel);
    skillsRow.appendChild(skillsContainer);
    cardDetails.appendChild(skillsRow);

    // About Row
    const aboutRow = document.createElement("div");
    const aboutLabel = document.createElement("span");
    aboutLabel.classList.add("detail-label");
    aboutLabel.textContent = "About:";
    const aboutText = document.createElement("p");
    aboutText.classList.add("about-text");
    aboutText.textContent = student.about;
    aboutRow.appendChild(aboutLabel);
    aboutRow.appendChild(aboutText);
    cardDetails.appendChild(aboutRow);

    // 4. Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete Student";

    // 5. Assemble and append card
    card.appendChild(cardTop);
    card.appendChild(cardDetails);
    card.appendChild(deleteButton);

    studentContainer.appendChild(card);
}

// ==========================================================
// Task 4: Part A — Delete Functionality via Event Delegation
// ==========================================================
// Add only ONE click event listener to the student card container
studentContainer.addEventListener("click", function (event) {
    // 1. Identify the clicked button
    const deleteBtn = event.target.closest(".delete-btn");
    if (!deleteBtn) {
        return; // Click occurred outside a delete button
    }

    // 2. Use closest() to find the related .student-card
    const card = deleteBtn.closest(".student-card");
    if (!card) {
        return;
    }

    // 3. Read the student's ID from the card (stored in data-id attribute)
    const studentId = Number(card.getAttribute("data-id"));

    // 4. Remove the correct student from the students array
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
    }

    // 5. Remove only the selected student card
    card.remove();

    // 6. Update the total student count
    updateStudentCount();
});

// Initial count setup
updateStudentCount();
