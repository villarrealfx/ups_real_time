const ctx = document.getElementById('myChart');

var graphData = {
    type: 'bar',
    data: {
      labels: ['-5', '-4', '-3', '-2', '-1', '0'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['rgb(75, 192, 192)'],
        borderWidth: 1
      },
      {
        type: 'line',
        label: 'Limit',
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: .3,
        data: [230, 230, 230, 230, 230, 230],
    }
    ]
    },
    options: {}
  }

var myChart = new Chart(ctx, graphData);

var socket = new WebSocket('ws://localhost:8000/ws/graph/');

socket.onmessage = function(e){
    var djangoData = JSON.parse(e.data);
    console.log(djangoData);

    var newGraphData = graphData.data.datasets[0].data;
    newGraphData.shift();
    newGraphData.push(djangoData.value);
    graphData.data.datasets[0].data = newGraphData;
    myChart.update();

    myChart_2.update();

    var elemento = document.getElementById('v_salida');

    if (djangoData.value < 300) {
        /* hace algo */
        if (elemento.classList.contains('text-danger')){
            elemento.classList.replace('text-danger', 'text-success');
        }
        
      } 
      
      if (djangoData.value > 259){
        /* hace algo */
        if (elemento.classList.contains('text-success')){
            elemento.classList.replace('text-success', 'text-danger');
        }
       
      }
    elemento.innerText=djangoData.value + " Vac ";

    
}