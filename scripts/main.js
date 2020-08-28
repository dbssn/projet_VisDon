// Paramètres de visualisation
const width = 800;
const height = 600;
const margin = { top: 20, right: 50, bottom: 20, left: 230 };

// Dictionnaire des dimensions
const dimensions = [
    {id : "prix_moyen", name : "Prix moyen par personne"},
    {id : "prix_med", name : "Prix médian par personne"},
    {id : "nb_annonces", name : "Nombre total d'annonces"},
    {id : "occup_max_moy", name : "Occupation maximale moyenne"}
]

// Déclaration des variables
let quartierData;
let chartQuartierBars;
let chartQuartierTitles;
let chartQuartierScaleX;
let chartQuartierScaleY;
let chartQuartierColorScale;

let currentDimension = "prix_moyen"

// Fonction setup
function setup() {
    // Chargement des données
    loadData();
}

function loadData() {
    // Chargement des données, puis une fois la promise résolue, appel à onDataLoaded
    d3.csv("../data/donnees_quartiers.csv", function(d) {
        return {
            quartier : d.quartier,
            prix_moyen : parseFloat(parseFloat(d.prix_moyen).toFixed(2)),
            prix_min : parseFloat(parseFloat(d.prix_min).toFixed(2)),
            prix_max : parseFloat(parseFloat(d.prix_max).toFixed(2)),
            prix_med : parseFloat(parseFloat(d.prix_med).toFixed(2)),
            nb_annonces : parseInt(d.nb_annonces),
            nb_log_entier : parseInt(d.nb_log_entier),
            nb_chambre_privee : parseInt(d.nb_chambre_privee),
            nb_chambre_hotel : parseInt(d.nb_chambre_hotel),
            nb_chambre_ptg : parseInt(d.nb_chambre_ptg),
            occup_max_moy : parseFloat(parseFloat(d.occup_max_moy).toFixed(2))
        }
    }).then(onDataLoaded);
}

function onDataLoaded(data) {
    
    quartierData = data;

    console.log(quartierData)

    optionsSetAndRefresh();
    
    setupChartQuartier(currentDimension);
    
    graphChartQuartier(currentDimension);
    
}

function optionsSetAndRefresh() {
    d3.select("#dimensions")
    .selectAll("option")
    .data(dimensions)
    .join("option")
    .attr("value", d => d.id)
    .text(d => d.name)
    .each(function(d) {
        const option = d3.select(this);
        if (d.id === currentDimension) {
            option.attr("selected", "");
        }
        else {
            option.attr("selected", null);
        }
    })
}

function setupChartQuartier(dimension) {

    // Si un svg existe, il est d'abord supprimé
    const oldSvg = d3.select(".quartierChart")
    .select("svg")
    
    if (oldSvg) {
        oldSvg.remove()
    }

    // Création du SVG pour cette visualisation
    const svg = d3.select(".quartierChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "font: 10px sans-serif");
    
    // Axe horizontal
    chartQuartierScaleX = d3.scaleLinear()
    .domain([0, d3.max(quartierData, d => d[dimension])])
    .range([margin.left + 1 , width - margin.right]);
    
    // Axe vertical
    chartQuartierScaleY = d3.scaleBand()
    .domain(quartierData.map(d => d.quartier))
    .range([height - margin.bottom - 5, margin.top])
    .padding(0.1)
    .round(true);
    
    // Echelle de couleur
    chartQuartierColorScale = d3.scaleSequential()
    .domain([0, d3.max(quartierData, d => d[dimension])])
    .interpolator(d3.interpolateGreens);
    
    // Création de groupes SVG pour les barres et titres
    chartQuartierBars = svg.append("g");
    chartQuartierTitles = svg.append("g")
    .style("fill", "white")
    .attr("text-anchor", "end")
    .attr("transform", `translate(-5, ${chartQuartierScaleY.bandwidth() / 2})`);
    
    // Ajouter l'axe horizontal
    svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(chartQuartierScaleX))
    .call(g => g.select(".domain"));
    
    // Ajouter l'axe vertical
    svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(chartQuartierScaleY))
    .call(g => g.select(".domain").remove());

    // Evénement de changement dans le menu déroulant (dimension)
    d3.select("#dimensions").on("change", (e) => {
        const dimension = d3.event.target.value;
        currentDimension = dimension;
        optionsSetAndRefresh();
        setupChartQuartier(currentDimension);
        graphChartQuartier(currentDimension);
    })
}

function graphChartQuartier(dimension) {
        
    const data = quartierData;
    
    // Ajout des barres
    chartQuartierBars.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", d => chartQuartierScaleX(d[dimension]) - chartQuartierScaleX(0))
    .attr("height", chartQuartierScaleY.bandwidth())
    .attr("x", d => chartQuartierScaleX(0))
    .attr("y", d => chartQuartierScaleY(d.quartier))
    .style("fill", d => chartQuartierColorScale(d[dimension]))
    
    // Ajout des titres
    chartQuartierTitles.selectAll("text")
    .data(data)
    .join("text")
    .attr("dy", "0.35em")
    .attr("x", d => chartQuartierScaleX(d[dimension]))
    .attr("y", d => chartQuartierScaleY(d.quartier))
    .text(d => d[dimension])
}

// Appel à setup
setup()