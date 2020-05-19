async function loadStatistics() {    
    let url = 'http://localhost:50253/api/tableofprocesses/statistics';
    let response = await fetch(url);
    let statistics = await response.json();    
    let nonpagedSystemMemorySizeHeader = document.getElementById('nonpaged-system-memory-size');
    let pagedMemorySizeInBytesHeader = document.getElementById('paged-memory-size');    
    nonpagedSystemMemorySizeHeader.innerText = statistics.sumNonpagedSystemMemorySize64InBytes;
    pagedMemorySizeInBytesHeader.innerText = statistics.sumPagedMemorySize64InBytes;

    let tableOfProcessesBody = document.getElementById('table-of-processes-body');
    refreshTableData(tableOfProcessesBody, statistics.processes);
}

function refreshTableData(tableBody, data) {
    let html = '';
    for (let element of data) {
        html += `<tr>
                    <td>${element.pid}</td>
                    <td>${element.command}</td>
                    <td>${element.nonpagedSystemMemorySize64InBytes}</td>
                    <td>${element.pagedMemorySize64InBytes}</td>
                    <td>${element.workingSet64InBytes}</td>
                    <td>${element.totalProcessorTimeInMilliseconds}</td>
                </tr>`;
    }
    tableBody.innerHTML = html;
}

loadStatistics();
let timer = setInterval(loadStatistics, 500);