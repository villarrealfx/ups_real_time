function createChart(canvasId, chartData, socketUrl, limitValue, limitColor, dataColor, updateCallback, initialValueKey) {
    const ctx = document.getElementById(canvasId);
  
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['-5', '-4', '-3', '-2', '-1', '0'],
        datasets: [
          {
            data: chartData,
            backgroundColor: dataColor,
            borderWidth: 1,
          },
          {
            type: 'line',
            label: 'Limit',
            borderColor: limitColor,
            borderWidth: 0.3,
            data: Array(6).fill(limitValue), // Create an array of limit values
          },
        ],
      },
      options: {},
    });
  
    const socket = new WebSocket(socketUrl);
  
    socket.onmessage = function (e) {
      const djangoData = JSON.parse(e.data);
  
      chart.data.datasets[0].data.shift();
      chart.data.datasets[0].data.push(djangoData[initialValueKey]);
      chart.update();
  
      if (updateCallback) {
        updateCallback(djangoData);
      }
    };
  
    return chart;
  }
  
  // Example usage:
  const chart1 = createChart(
    'myChart',
    [12, 19, 3, 5, 2, 3],
    'ws://localhost:8000/ws/graph/',
    230,
    'rgb(255, 0, 0)',
    'rgb(75, 192, 192)',
    (djangoData) => {
      const elemento = document.getElementById('v_salida');
  
      if (djangoData.value < 300) {
        if (elemento.classList.contains('text-danger')) {
          elemento.classList.replace('text-danger', 'text-success');
        }
      }
  
      if (djangoData.value > 259) {
        if (elemento.classList.contains('text-success')) {
          elemento.classList.replace('text-success', 'text-danger');
        }
      }
  
      elemento.innerText = djangoData.value + " Vac ";
    },
    'value'
  );

  const chart2 = createChart(
    'myChart_2',
    [12, 19, 3, 5, 2, 3],
    'ws://localhost:8000/ws/graph/',
    400,
    'rgb(255, 0, 0)',
    'rgb(75, 192, 192)',
    (djangoData) => {
      const elemento = document.getElementById('v_cc');
  
      if (djangoData.cc > 399) {
        if (elemento.classList.contains('text-danger')) {
          elemento.classList.replace('text-danger', 'text-success');
        }
      }
  
      if (djangoData.cc < 400) {
        if (elemento.classList.contains('text-success')) {
          elemento.classList.replace('text-success', 'text-danger');
        }
      }
  
      elemento.innerText = djangoData.cc + " Vcc ";
    },
    'cc'

  );