const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');
const { exec } = require('child_process');

// Function to get the access token from gcloud
function getAccessToken(callback) {
  exec('gcloud auth print-access-token', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error getting access token: ${stderr}`);
      return;
    }
    callback(stdout.trim());
  });
}

// Your Firebase project config
const firebaseConfig = {
  databaseURL: "https://caferegional-default-rtdb.firebaseio.com",
};

// Main function to run the test
function main() {
  getAccessToken(token => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    // Updated the path to point to 'products'
    const productsRef = ref(db, 'products');

    console.log('Attempting to fetch data from /products...');

    get(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Successfully fetched products:");
        console.log(JSON.stringify(snapshot.val(), null, 2)); // Using JSON.stringify for better formatting
      } else {
        console.log("No data available at /products");
      }
      process.exit(0);
    }).catch((error) => {
      console.error("Failed to fetch data:", error);
      process.exit(1);
    });
  });
}

main();
