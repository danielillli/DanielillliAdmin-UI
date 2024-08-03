document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    let currentIndex = 0;
    let previousMenuHTML; // Variable to store previous menu HTML

    // Initial focus on the first button
    buttons[currentIndex].focus();

    // Function to handle arrow key navigation
    function handleArrowKey(e) {
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            currentIndex--;
        } else if (e.key === 'ArrowDown' && currentIndex < buttons.length - 1) {
            currentIndex++;
        }

        // Focus on the button at the new index
        buttons[currentIndex].focus();
    }

    // Add event listener for arrow key presses
    document.addEventListener('keydown', function(event) {
        handleArrowKey(event);
        // Check if Enter key is pressed on the focused button
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default action of the Enter key
            navigateToSecondMenu();
        }
        // Check if Backspace key is pressed
        if (event.key === "Backspace" && previousMenuHTML) {
            event.preventDefault(); // Prevent the default action of the Backspace key
            navigateToPreviousMenu();
        }
    });

    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default action of the button
            navigateToSecondMenu();
        });
    });

    // Function to navigate to the second menu
    function navigateToSecondMenu() {
        // Store the current menu HTML
        previousMenuHTML = document.querySelector(".buttons").outerHTML;

        // Hide the first menu
        document.querySelector(".buttons").style.display = "none";

        // Load content of playeroptions.html into the second menu container
        fetch("Player.html")
            .then(response => response.text())
            .then(html => {
                document.getElementById("secondMenuContainer").innerHTML = html;
                document.getElementById("secondMenuContainer").classList.remove("hidden");
            })
            .catch(error => {
                console.error("Error fetching player options:", error);
            });
    }

    // Function to navigate back to the previous menu
    function navigateToPreviousMenu() {
        // Restore the previous menu HTML
        document.getElementById("secondMenuContainer").innerHTML = previousMenuHTML;
        document.getElementById("secondMenuContainer").classList.add("hidden");

        // Show the previous menu
        document.querySelector(".buttons").style.display = "block";

        // Reset focus to the button that was focused before
        buttons[currentIndex].focus();
    }
});
