const adminCredentials = { username: 'admin', password: '1234' };
const tariff = { value: 10.0 }; // Tarifa inicial
const tickets = [];

const loginForm = document.getElementById('login-form');
const adminSection = document.getElementById('admin-section');
const employeeSection = document.getElementById('employee-section');
const ticketTable = document.getElementById('ticket-table');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        adminSection.classList.remove('d-none');
        employeeSection.classList.add('d-none');
    } else {
        adminSection.classList.add('d-none');
        employeeSection.classList.remove('d-none');
    }

    document.getElementById('login-section').classList.add('d-none');
});

document.getElementById('change-tariff').addEventListener('click', function () {
    const newTariff = prompt('Digite a nova tarifa:');
    if (newTariff && !isNaN(newTariff)) {
        tariff.value = parseFloat(newTariff);
        alert(`Nova tarifa definida: R$ ${tariff.value.toFixed(2)}`);
    } else {
        alert('Valor inválido!');
    }
});

document.getElementById('add-ticket').addEventListener('click', function () {
    const plate = prompt('Digite a placa do veículo:');
    if (!plate) return alert('Placa inválida!');

    const entryTime = new Date();
    const ticket = { plate, entryTime, exitTime: null, amount: 0.0 };
    tickets.push(ticket);

    updateTicketTable();
});

function updateTicketTable() {
    ticketTable.innerHTML = '';
    tickets.forEach((ticket, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket.plate}</td>
            <td>${ticket.entryTime.toLocaleString()}</td>
            <td>${ticket.exitTime ? ticket.exitTime.toLocaleString() : '-'}</td>
            <td>${ticket.amount ? `R$ ${ticket.amount.toFixed(2)}` : '-'}</td>
            <td>
                ${!ticket.exitTime ? `<button class="btn btn-danger btn-sm" onclick="closeTicket(${index})">Finalizar</button>` : ''}
            </td>
        `;
        ticketTable.appendChild(row);
    });
}

function closeTicket(index) {
    const ticket = tickets[index];
    ticket.exitTime = new Date();
    const duration = Math.ceil((ticket.exitTime - ticket.entryTime) / (1000 * 60 * 60));

    ticket.amount = tariff.value;
    if (duration > 1) {
        ticket.amount += (duration - 1) * (tariff.value / 2);
    }

    updateTicketTable();
}
