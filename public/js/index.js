

function getGraphLocale(typeSeach){
    const id = 90

    fetch(`http://localhost:3333/graph/${id}/${typeSeach}`)
    .then(text => {
        return text.json()
    })
    .then(data => {
        console.log(data)
        createGraph(data)
    })
}

function createGraph({labels, label, data}){
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

document.getElementById('locale').addEventListener('click', () => getGraphLocale('locale'))
document.getElementById('gender').addEventListener('click', () => getGraphLocale('gender'))
const ctx = document.getElementById('myChart');