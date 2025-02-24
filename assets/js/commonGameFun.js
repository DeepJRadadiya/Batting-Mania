//half button
halftoMoney.addEventListener("click", () => {
  let currentValue = Number(batingMoney.value);
  if (currentValue >= 10) {
    if (currentValue >= 20) {
      // if 10 or more
      batingMoney.value = currentValue / 2;
    } else {
      notyf.error("Your money cannot go below 10!");
    }
  } else {
    notyf.error("Minimum bet is 10");
  }
});

//2x button
doubletoMoney.addEventListener("click", () => {
  let currentValue = Number(batingMoney.value);

  if (currentValue >= 10) {
    let newValue = currentValue * 2;

    if (newValue <= 5000) {
      batingMoney.value = newValue;
    } else {
      notyf.error("Batting limit is 5000");
    }
  } else {
    notyf.error("Minimum bet is 10");
  }
}); 


//logic for update money in database
async function updateMoneyInDatabase(id, moneyChangedValue) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
     method: "PATCH", // use PATCH for partial update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ money: moneyChangedValue }), // Send updated money
    });

    if (!response.ok) {
      throw new Error("Failed to update money in the database.");
    }

    const updatedUser = await response.json();
    console.log("Money updated successfully:", updatedUser);

    let alloverMoney = document.getElementById("moneyOfBC");
    alloverMoney.value = updatedUser.money;
  } catch (error) {
    console.error("Error updating money:", error);
  }
}
