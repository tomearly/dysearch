document.addEventListener('DOMContentLoaded', function(){ // on dom ready

var cy = cytoscape({
  container: document.querySelector('#cy'),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(name)',
        'text-valign': 'center',
        'color': 'black',
        'text-outline-width': 0,
        'background-color': '#999',
        'text-outline-color': '#999'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#ccc',
        'line-color': '#ccc',
        'width': 1
      })
    .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),

  elements: {
    nodes: [
      { data: { id: 'sushi', name: 'Sushi' } },
      { data: { id: 'rice', name: 'Rice' } },
      { data: { id: 'tokyo', name: 'Tokyo' } },
      { data: { id: 'sashimi', name: 'Sashimi' } },
      { data: { id: 'rawfish', name: 'Raw Fish'} }
    ],
    edges: [
      { data: { source: 'sushi', target: 'rice' } },
      { data: { source: 'sushi', target: 'tokyo' } },
      { data: { source: 'sushi', target: 'sashimi' } },
      { data: { source: 'sashimi', target: 'rawfish'} }
    ]
  },

  layout: {
    name: 'grid',
    padding: 10
  }
});

cy.on('tap', 'node', function(e){
  var node = e.cyTarget;
  var neighborhood = node.neighborhood().add(node);
  console.log(e);
  cy.elements().addClass('faded');
  neighborhood.removeClass('faded');
});

cy.on('tap', function(e){
  if( e.cyTarget === cy ){
    cy.elements().removeClass('faded');
  }
});

var options = {
  name: 'circle',

  fit: true, // whether to fit the viewport to the graph
  padding: 30, // the padding on fit
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
  radius: undefined, // the radius of the circle
  startAngle: 3 / 2 * Math.PI, // where nodes start in radians
  sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
  clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
  sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  animate: false, // whether to transition the node positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  ready: undefined, // callback on layoutready
  stop: undefined // callback on layoutstop
};

cy.layout( options );

}); // on dom ready
