


let userEmail = ""; // Store the email dynamically
        let bankDetails = null; // Store the bank details dynamically
        let promotionLinkGenerated = false; // Track if the promotion link has been generated
        let promotionLink = ""; // Store the generated link
        function registerUser(event) {
            event.preventDefault();
            
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            
            // Check if all fields are filled
            if (username && email && phone && password) {
                const registeredUser = { username, email, phone, password };
        
                // Retrieve existing users from localStorage (if any)
                let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        
                // Check if email is already registered
        //  const userExists = users.some(user => user.email === email);
        // if (userExists) {
        //    showNotification("Email is already registered. Please log in.");
        //     return;
        // }
                // Add the new user to the list
                users.push(registeredUser);
        
                // Store the updated list of users back into localStorage
                localStorage.setItem("registeredUsers", JSON.stringify(users));
        
                showNotification("Registration successful! Redirecting to login...");
        
                // Redirect to the login page after 2 seconds
                setTimeout(() => {
                    window.location.href = "login.html"; // Redirect to the login page
                }, 2000);
            } else {
                showNotification("Please fill in all fields.");
            }
        }   
        function validateLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Retrieve stored user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (storedUser && username === storedUser.email && password === storedUser.password) {
        showNotification("Login successful! Redirecting to dashboard...");     
        setTimeout(() => {       
           window.location.href = "dashboard.html"; 
        }, 1000);
    } else {   
        showNotification("Invalid credentials. Please try again.");
    }
   }
   function goToPromotion() {
    window.location.href = "promotion.html";
// Add event listener to the icon
document.getElementById('promotion-icon').addEventListener('click', goToPromotion);
   }


const gmail = localStorage.getItem('email');
document.getElementById('profile-email').innerHTML = gmail;
// const result = document.getElementById('profile-email');
// if (gmail) {
//   result.textContent =`${gmail}`;
// } 

 function updateEmail() {
            const newEmail = prompt("Enter your new email address:");
            if (newEmail) {
                userEmail = newEmail; // Update email dynamically
                alert("Email updated successfully!");
                document.getElementById('profile-email').textContent = userEmail;
            }
        }

        function saveBankDetails() {
            const bankName = document.getElementById('bank-name').value;
            const accountNumber = document.getElementById('account-number').value;
            const holderName = document.getElementById('holder-name').value;
            if (bankName && accountNumber && holderName) {
                bankDetails = { name: bankName, accountNumber: accountNumber, holderName: holderName };
                showNotification("Bank details saved successfully!");
                document.getElementById('bank-name-display').textContent = bankName;
                document.getElementById('bank-account-number-display').textContent = accountNumber;
                document.getElementById('bank-holder-name-display').textContent = holderName;
                 // Switch to profile to display bank details
            } else {
                showNotification("Please fill in all fields.");
            }
        }

        function updateBankDetails() {
            document.getElementById('bank-details-form').style.display = 'block';
            document.getElementById('update-bank-details').style.display = 'none';
        }// Function to generate a random promotion link
function generatePromotionLink() {
    return "https://mcashshare.com/promo/" + Math.random().toString(36).slice(2, 11); 
}

// Function to set the generated link in the input field
function setPromotionLink() {
    const linkInput = document.getElementById('promotion-link');
    if (linkInput) {
        linkInput.value = generatePromotionLink();
    } else {
        console.error("Element with ID 'promotion-link' not found.");
    }
}

// Function to copy the link to the clipboard
function copyToClipboard() {
    const linkInput = document.getElementById('promotion-link');

    if (!linkInput) {
        console.error("Element with ID 'promotion-link' not found.");
        showNotification("Error: Promotion link field not found.");
        return;
    }

    // Use Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(linkInput.value)
            .then(() => {
                showNotification("Promotion link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy text:", err);
                showNotification("Failed to copy link. Please copy manually.");
            });
    } else {
        // Fallback method using execCommand (deprecated)
        linkInput.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification("Promotion link copied to clipboard!");
            } else {
                showNotification("Failed to copy. Please copy manually.");
            }
        } catch (err) {
            console.error("execCommand failed:", err);
            showNotification("Copying not supported in this browser.");
        }
    }
}

// Ensure the promotion link is generated automatically when the page loads
document.addEventListener("DOMContentLoaded", setPromotionLink);





        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.background = '#1f1b2c';
            notification.style.color = '#fff';
            notification.style.padding = '15px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
            notification.style.zIndex = '1000';
            notification.style.transition = 'opacity 0.3s';
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        let totalEarnings = 0;

        function completeTask(amount) {
            const confirmTask = confirm("Do you want to perform this task to earn NGN " + amount + "?");

            if (confirmTask) {
                showNotification("Task accepted. Please wait while it's being processed...");
                setTimeout(() => {
                    totalEarnings += amount;
                    document.getElementById('total-earnings').textContent = "NGN " + totalEarnings;

                    showNotification("You have earned NGN " + amount + "!");

                }, 3000); // few minutes
            } else {
                showNotification("Task successfully canceled.");
            }
        }
         function imcompleteTask(amount) {
            const confirmTask = confirm("Don't you want to perform this task to earn NGN " + amount + "?");

            if (confirmTask) {
                showNotification("Task Cancelled. Please wait ...");
                setTimeout(() => {
                    totalEarnings = amount;
                    document.getElementById('total-earnings').textContent = "NGN " + totalEarnings;

                    showNotification("You didn't earned NGN " + amount + "!");

                }, 180000); // 3 minutes
            } else {
                showNotification("Rejection request canceled. Please Wait...");
            }
        }
    function showWithdrawalModal() {
            document.querySelector('.withdrawal').style.display = 'flex';
        }

        function hideWithdrawalModal() {
            document.querySelector('.withdrawal').style.display = 'none';
        }

        function confirmWithdrawal(amount) {
            if (!bankDetails) {
                showNotification("Please save your bank details before withdrawing.");
                return;
            }
            if (totalEarnings < 1000) {
                showNotification("You need at least NGN 1000 to withdraw.");

                return;
            }
            if (totalEarnings < amount) {
                showNotification("You do not have enough earnings for this withdrawal.");
                return;
            }
            showNotification("Your request is being processed for NGN " + amount + "...");

            setTimeout(() => {
                totalEarnings -= amount; // Deduct the withdrawn amount
                document.getElementById('total-earnings').textContent = "NGN " + totalEarnings.toFixed(2); // Update displayed earnings

                showNotification("Withdrawal of NGN " + amount + " successful! Your earnings have been updated.");

                hideWithdrawalModal();
            }, 2000); // Simulate a 2-second processing time
        }
        function showLogoutModal() {
            document.querySelector('.modal').style.display = 'flex';
        }

        function hideLogoutModal() {
            document.querySelector('.modal').style.display = 'none';
        }

        function logout() {
            // Clear user data and redirect to login
            userEmail = "";
            bankDetails = null;
            // document.querySelector('.profile-container').classList.remove('active');
            // document.querySelector('.main-container').classList.add('active');
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect to the login page
            }, 2000);
            hideLogoutModal();
            showNotification("You have been logged out. Please sign in again.");
        }