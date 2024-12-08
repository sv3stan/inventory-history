const API_URL = 'http://localhost:3002';

let currentPage = 1;
const limit = 10;

function changePage(direction) {
  currentPage += direction;
  if (currentPage <= 1) {
    currentPage = 1;
    document.getElementById('prevPage').disabled = true;
  } else {
    document.getElementById('prevPage').disabled = false;
  }
  document.getElementById('currentPage').textContent = currentPage;
  searchHistory();
}

async function searchHistory() {
  const shopId = document.getElementById('shop_id').value;
  const plu = document.getElementById('plu').value;
  const action = document.getElementById('action').value;
  const dateFrom = document.getElementById('date_from').value;
  const dateTo = document.getElementById('date_to').value;

  const params = new URLSearchParams();
  if (shopId) params.append('shop_id', shopId);
  if (plu) params.append('plu', plu);
  if (action) params.append('action', action);
  if (dateFrom) params.append('date_from', dateFrom);
  if (dateTo) params.append('date_to', dateTo);
  params.append('page', currentPage);
  params.append('limit', limit);

  // const url = `/history?${params.toString()}`;

  try {
    const response = await fetch(`${API_URL}/history?${params.toString()}`);
    // const response = await fetch(`${API_URL}/url`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    renderTable(data.data);

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = data.data.length < limit;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    alert('Не удалось загрузить данные.');
  }
}

function renderTable(data) {
  const tableBody = document.getElementById('resultsTable');
  tableBody.innerHTML = '';

  if (data.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="9">Нет данных для отображения</td></tr>';
    return;
  }

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.shop_id || '-'}</td>
      <td>${item.plu || '-'}</td>
      <td>${item.action || '-'}</td>
      <td>${item.quantity_on_shelf || '-'}</td>
      <td>${item.quantity_in_order || '-'}</td>
      <td>${item.balance_on_shelf || '-'}</td>
      <td>${item.balance_in_order || '-'}</td>
      <td>${new Date(item.timestamp).toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  let date_from = document.getElementById('date_from');
  let date_to = document.getElementById('date_to');
  const date = new Date();
  const date_begin = new Date(2024, 1, 1);
  date_from.valueAsDate = date_begin;
  date_to.valueAsDate = date;
});
