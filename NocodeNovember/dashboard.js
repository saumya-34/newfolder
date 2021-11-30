function groupBy(objectArray, property) {
	return objectArray.reduce(function (acc, obj) {
	  let key = obj[property]
	  if (!acc[key]) {
		acc[key] = []
	  }
	  acc[key].push(obj)
	  return acc
	}, {})
}

function print(){
	let sum_confirmed_cases = 0;	
	let sum_deaths = 0;
	fetch("https://covid19.mathdro.id/api/confirmed").then((response)=>{
		return response.json();
	}).then(data => {
		console.log(data);
		for(let i = 0 ;  i < 100 ; i++){
			 sum_confirmed_cases += data[i].cases28Days;
			 sum_deaths = data[i].deaths28Days;
		} 
		document.querySelector("#confirmed").innerHTML = sum_confirmed_cases;
		document.querySelector("#deaths").innerHTML = sum_deaths;
		const test = groupBy(data,'countryRegion')
		console.log(test);
		let india_deaths = 0 , aus_deaths = 0 , brazil_deaths = 0 , ger_deaths = 0, tur_deaths = 0;
		let india_confirmed = 0, aus_confirmed = 0, brazil_confirmed = 0, ger_confirmed = 0 , tur_confirmed = 0;
		let india_cases28 = 0 , aus_cases28 = 0 , brazil_cases28 = 0 , ger_cases28 = 0, tur_cases28 = 0;
		let india_deaths28 = 0 , aus_deaths28 = 0 , brazil_deaths28 = 0 , ger_deaths28 = 0, tur_deaths28 = 0;
		for(let i  = 0 ; i < test['Australia'].length;i++){
			aus_deaths += test['Australia'][i].deaths;
			aus_confirmed += test['Australia'][i].confirmed;
			aus_cases28 += test['Australia'][i].cases28Days
			aus_deaths28 +=  test['Australia'][i].deaths28Days;
		}
		for(let i  = 0 ; i < test['India'].length;i++){
			india_deaths += test['India'][i].deaths;
			india_confirmed += test['India'][i].confirmed;
			india_cases28 += test['India'][i].cases28Days;
			india_deaths28 += test['India'][i].deaths28Days;
		}
		for(let i  = 0 ; i < test['Brazil'].length;i++){
			brazil_deaths += test['Brazil'][i].deaths;
			brazil_confirmed += test['Brazil'][i].cases28Days;
			brazil_cases28 += test['Brazil'][i].deaths28Days;
		}
		for(let i  = 0 ; i < test['Germany'].length;i++){
			ger_deaths += test['Germany'][i].deaths;
			ger_confirmed += test['Germany'][i].confirmed;
			ger_cases28 += test['Germany'][i].cases28Days;
			ger_deaths28 += test['Germany'][i].deaths28Days
		}
		for(let i  = 0 ; i < test['Turkey'].length;i++){
			tur_deaths += test['Turkey'][i].deaths;
			tur_confirmed += test['Turkey'][i].confirmed;
			tur_cases28 += test['Turkey'][i].cases28Days;
			tur_deaths28 += test['Turkey'][i].deaths28Days;
		}
		const newobj = {
		Australia : { 'deaths' :aus_deaths,'confirmed':aus_confirmed , 'latestcases' : aus_cases28, 'latestdeaths' : aus_deaths28},
		Brazil : {'deaths': brazil_deaths, 'confirmed' : brazil_confirmed,'latestcases' : brazil_cases28,'latestdeaths' : brazil_deaths28}, 
		Germany :{'deaths': ger_deaths,'confirmed': ger_confirmed,'latestcases' : ger_cases28, 'latestdeaths':ger_deaths28}, 
		India : {'deaths' : india_deaths, 'confirmed' : india_confirmed,'latestcases':india_cases28,'latestdeaths':india_deaths28}, Turkey : {'deaths' : tur_deaths , 'confirmed' : tur_confirmed, 'latestcases':tur_cases28,'latestdeaths':tur_deaths28}};
		console.log(newobj);

		//google bar chart for no. of recent deaths country wise
	
		google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
		function drawChart() {
			var bar = google.visualization.arrayToDataTable([
			  ['Country','Deaths','Confirmed'],
			  ['Australia',aus_deaths,aus_confirmed],
			  ['Brazil',brazil_deaths,brazil_confirmed],
			  ['Germany',ger_deaths,ger_confirmed],
			  ['India',india_deaths,india_confirmed],
			  ['Turkey',tur_deaths, tur_confirmed]
			]);
			var options = {
				chart: {
				  title: 'Death Tally',
				  subtitle: 'Country Wise recent figures',
				},
				bars: 'vertical' // Required for Material Bar Charts.
			  };
			  var chart = new google.charts.Bar(document.getElementById('bar-chart'));
			  chart.draw(bar, google.charts.Bar.convertOptions(options));
      }
		
	  // making a pie-chart
	  let c = document.querySelector("#country");
	  let country = c.options[c.selectedIndex].text;

	  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawPie);

      function drawPie() {

        var pie = google.visualization.arrayToDataTable([
          ['CaseType', 'Numbers'],
          ['Confirmed',  newobj[country]['confirmed']],
          ['Deaths',    newobj[country]['deaths']  ],
          ['cases last 28 days',  newobj[country]['latestcases']],
          ['Deaths lat 28 Days', newobj[country]['latestdeaths']],
        ]);

        var options = {
          title: 'Covid Cases Details',
		  width : 550,
		  height : 400
        };

        var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));

        chart.draw(pie, options);
      }	
	}).catch((err)=>{
		console.log(err);
	})
}
print();
// console.log("result = ",result);
// const test = groupBy(result,result.countryRegion)
// console.log(test);

