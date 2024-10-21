function filterData() {
  event.preventDefault();
  
  // Get the date values from the input fields
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;

  // Convert the input dates to a comparable format (Date object)
  var start = new Date(startdate);
  var end = new Date(enddate);

  // Get all the rows in the table body
  var rows = document.querySelectorAll("#pitch-data tr");

  rows.forEach(row => {
    // Get the date value from the second cell (Date cell)
    var dateCell = row.cells[1].textContent;
    
    // Convert the table date value to a Date object
    var rowDate = new Date(dateCell);

    // Check if the row's date is within the start and end date range
    if (rowDate >= start && rowDate <= end) {
      row.style.display = ''; // Show the row
    } else {
      row.style.display = 'none'; // Hide the row
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://compute.samford.edu/zohauth/clients/datajson/1';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('pitch-data');
      let rows = '';

      data.forEach(pitch => {
        rows += `
          <tr>
            <td><a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>
            <td>${pitch.Date}</td>
            <td>${pitch.Time}</td>
            <td>${pitch.Batter}</td>
            <td>${pitch.Balls}</td>
            <td>${pitch.Strikes}</td>
            <td>${pitch.Outs}</td>
            <td>${pitch.PitchCall}</td>
            <td>${pitch.KorBB || ''}</td>
            <td>${pitch.RelSpeed || ''}</td>
            <td>${pitch.SpinRate || ''}</td>
            <td>${pitch.SpinAxis || ''}</td>
          </tr>
        `;
      });

      tableBody.innerHTML = rows;
    })
    .catch(error => {
      console.error('Error fetching the data:', error);
    });
});