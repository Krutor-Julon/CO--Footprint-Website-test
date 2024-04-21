//Durchsucht die Unternehmen
function searchunternehmen() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = sanitizeInput(input.value); // Eingabe säubern
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Durchläuft die Tabelle in einem Loop und markiert die, die dem Kriterium entsprechen
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].classList.add("potential-result");
      } else {
        tr[i].classList.remove("potential-result");
      }
    }
  }
  // Zeige die gefilterten Zeilen an
  showFilteredRows();
}

//Durchsucht die Länder
function searchcountry() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInputcountry");
  filter = sanitizeInput(input.value); // Eingabe säubern
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Durchläuft die Tabelle in einem Loop und markiert die, die dem Kriterium entsprechen
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].classList.add("potential-result");
      } else {
        tr[i].classList.remove("potential-result");
      }
    }
  }
  // Zeige die gefilterten Zeilen an
  showFilteredRows();
}

//Zeigt die Tabelle an
function showFilteredRows() {
  var table = document.getElementById("myTable");
  var tbody = table.getElementsByTagName("tbody")[0]; // Zugriff auf das tbody-Element
  var rows = tbody.getElementsByTagName("tr"); // Alle Zeilen im tbody

  // Loop durch alle Datenzeilen und zeige nur diejenigen, die potenzielle Ergebnisse sind
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].classList.contains("potential-result")) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

// Funktion zum Säubern der Eingabe, um Schadcode-Injektion zu verhindern
function sanitizeInput(input) {
  // Entferne alle HTML-Tags und wandele Sonderzeichen in HTML-Entitäten um
  var sanitizedInput = input.replace(/<[^>]*>?/gm, '').replace(/[&<>"'`=\/]/g, function(s) {
    return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#x60;", "=": "&#x3D;", "/": "&#x2F;"}[s];
  });
  return sanitizedInput;
}

//Sortiert Tabelle für Unternehmen und Länder
function sortTable(columnIndex) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    //
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];
      
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//Sortiert Tabelle für Emmisionen
function sortTable_Emmisionen(columnIndex) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];

      // Zahlen in Ganzzahlen umwandeln
      var xValue = parseInt(x.innerHTML.trim(), 10); // trim() entfernt Leerzeichen am Anfang und Ende
      var yValue = parseInt(y.innerHTML.trim(), 10);

      // Überprüfen, ob die Spaltenwerte Ganzzahlen sind
      if (xValue > yValue) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


document.getElementById("headerUnternehmen").addEventListener("click", function() {
  sortTable(0); // Index der Unternehmen-Spalte
});

document.getElementById("headerCountry").addEventListener("click", function() {
  sortTable(1); // Index der Länder-Spalte
});

document.getElementById("headerEmmisionen").addEventListener("click", function() {
  sortTable_Emmisionen(2); // Index der Emmisionen-Spalte
});

document.getElementById("myInput").addEventListener("keyup", searchunternehmen);
document.getElementById("myInputcountry").addEventListener("keyup", searchcountry);