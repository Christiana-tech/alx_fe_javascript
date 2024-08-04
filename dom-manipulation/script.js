/// Array to store quotes
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
  }
  
  // Function to create the add quote form using createElement and appendChild
  function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; // Clear any existing content
  
    // Create form elements
    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.id = 'newQuoteText';
    newQuoteTextInput.type = 'text';
    newQuoteTextInput.placeholder = 'Enter a new quote';
  
    const newQuoteCategoryInput = document.createElement('input');
    newQuoteCategoryInput.id = 'newQuoteCategory';
    newQuoteCategoryInput.type = 'text';
    newQuoteCategoryInput.placeholder = 'Enter quote category';
  
    const addQuoteButton = document.createElement('button');
    addQuoteButton.id = 'addQuoteButton';
    addQuoteButton.textContent = 'Add Quote';
  
    // Append form elements to the form container
    formContainer.appendChild(newQuoteTextInput);
    formContainer.appendChild(newQuoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
  
    // Add event listener to the newly created button
    addQuoteButton.addEventListener('click', addQuote);
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('Quote added successfully!');
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
  // Event listeners for buttons
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('showForm').addEventListener('click', createAddQuoteForm);


  // Function to export quotes to JSON
function exportToJson() {
    const json = JSON.stringify(quotes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Load quotes and last viewed quote on initialization
  window.onload = function() {
    loadQuotes();
    showRandomQuote();
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `<p>${lastViewedQuote.text}</p><p><em>${lastViewedQuote.category}</em></p>`;
    }
  };
  
  // Event listeners for buttons
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('showForm').addEventListener('click', createAddQuoteForm);
  document.getElementById('exportJson').addEventListener('click', exportToJson);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  
  // Initial display
  showRandomQuote();
  