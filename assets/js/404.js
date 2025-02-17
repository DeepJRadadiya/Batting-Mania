
        let serverStatus = false; // Track server status

        // Function to check server status
        const checkServerStatus = async () => {
            try {
                const response = await fetch('http://localhost:3000/users/');
                
                // Server is connected (successful response)
                if (response.ok) {
                    if (!serverStatus) { // If server was down and is now back up
                        serverStatus = true;
                        console.log('Server connected');
                        window.location.replace('index.html'); // Redirect to index.html
                    }
                }
            } catch (error) {
                if (serverStatus) {
                    serverStatus = false; // Update status
                    console.error('Server error:', error.message);
                    window.location.replace('/views/404.html'); // Redirect to 404 page
                }
            }
        };

        setInterval(checkServerStatus, 5000);

        window.onload = () => {
            checkServerStatus();
        };

