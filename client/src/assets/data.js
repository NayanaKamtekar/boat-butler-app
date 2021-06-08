function createData(userName,boatType, service, boatLocation, jobType, jobId) {
    return { userName, boatType, service, boatLocation, jobType , jobId };
  }
  
  const proposal_mock_data = [
    createData("Barnbrook Grove", "Motor Boat", "Engine Repair", "Copenhagen", "Normal", "1"),
    createData("Nine Elms", "Sail Boat", "Sail Repair", "Fredriksberg", "Emergency", "2"),
    createData("Bent", "Yacht", "Painting", "Valby", "Normal", "3"),
    createData("Stefen", "Motor Boat", "Engine Repair", "Copenhagen", "Normal", "4"),
    createData("Willium", "Sail Boat", "Sail Repair", "Fredriksberg", "Emergency", "5"),
    createData("Bo", "Yacht", "Painting", "Valby", "Normal", "6"),
    createData("Christoffer", "Motor Boat", "Engine Repair", "Copenhagen", "Normal", "7"),
    createData("Emma", "Sail Boat", "Painting", "Herlev", "Emergency", "8"),
    createData("Michel", "Yacht", "Painting", "copenhagen", "Normal", "9"),
  ];
  export { proposal_mock_data };