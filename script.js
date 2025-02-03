
let userEmail = ""; // Store the email dynamically
        let bankDetails = null; // Store the bank details dynamically
        let promotionLinkGenerated = false; // Track if the promotion link has been generated
        let promotionLink = ""; // Store the generated link

        function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // List of valid credentials
    const validUsers = [
        { username: "saduwa@gmail.com", password: "isaac" },
        { username: "mcashshare1@gmail.com", password: "mcashshare111" },
        { username: "mcashshare2@gmail.com", password: "mcashshare112" },
        { username: "mcashshare3@gmail.com", password: "mcashshare113" },
        { username: "mcashshare4@gmail.com", password: "mcashshare114" },
        { username: "mcashshare5@gmail.com", password: "mcashshare115" },
    ];

    // Check if the entered credentials match any of the valid ones
    const isValid = validUsers.some(
        user => user.username === username && user.password === password
    );

    if (isValid) {
        const header = document.querySelector('.header h1');
        header.textContent = "WELCOME TO MCASH - CLICK & EARN";

        // Switch to dashboard interface
        document.querySelector('.main-container').classList.remove('active');
        document.querySelector('.dashboard-container').classList.add('active');
        showNotification("Sign in successful!");
    } else {
        showNotification("Account not yet verified! Please contact the help desk.");
    }
}


        function switchToDashboard() {
            document.querySelector('.profile-container').classList.remove('active');
            document.querySelector('.promotion-container').classList.remove('active');
            document.querySelector('.dashboard-container').classList.add('active');
        }

        function switchToProfile() {
            document.querySelector('.dashboard-container').classList.remove('active');
            document.querySelector('.promotion-container').classList.remove('active');
            document.querySelector('.profile-container').classList.add('active');
            // Display user email in the profile
            document.getElementById('profile-email').textContent = userEmail;
            // Show bank details if available
            if (bankDetails) {
                document.getElementById('bank-name-display').textContent = bankDetails.name;
                document.getElementById('bank-account-number-display').textContent = bankDetails.accountNumber;
                document.getElementById('bank-holder-name-display').textContent = bankDetails.holderName;
                document.getElementById('bank-details-form').style.display = 'none';
                document.getElementById('update-bank-details').style.display = 'block';
            } else {
                document.getElementById('bank-details-form').style.display = 'block';
                document.getElementById('update-bank-details').style.display = 'none';
            }
        }
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
                switchToProfile(); // Switch to profile to display bank details
            } else {
                showNotification("Please fill in all fields.");
            }
        }

        function updateBankDetails() {
            document.getElementById('bank-details-form').style.display = 'block';
            document.getElementById('update-bank-details').style.display = 'none';
        }
        function showPromotion() {
            if (!promotionLinkGenerated) {
                promotionLink = generatePromotionLink();
                promotionLinkGenerated = true; // Set the flag to true
            }
            document.getElementById('promotion-link').value = promotionLink; // Set the link in the input
            document.querySelector('.dashboard-container').classList.remove('active');
            document.querySelector('.promotion-container').classList.add('active'); // Show the promotion container
        }

        function generatePromotionLink() {
            return "https://mcashshare.com/promo/" + Math.random().toString(36).substr(2, 9); // Example link generation
        }

        function copyToClipboard() {
            const linkInput = document.getElementById('promotion-link');
            linkInput.select();
            document.execCommand('copy');
            showNotification("Promotion link copied to clipboard!");
        }

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
            document.querySelector('.profile-container').classList.remove('active');
            document.querySelector('.main-container').classList.add('active');
            hideLogoutModal();
            showNotification("You have been logged out. Please sign in again.");
        }