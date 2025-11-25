// generate a plot with D3.js of the selling price of the album by year
// x-axis are the month series and y-axis show the numbers of albums sold
// data from the sales of album are loaded in from an external source and are in json format

import * as d3 from 'd3';

export interface AlbumSalesData {
  year: number;
  month: string;
  albumsSold: number;
  price: number;
}


// Loads album sales data from a JSON file and creates a D3 SVG bar chart
export function renderAlbumSalesGraphFromJson(jsonUrl: string, containerSelector: string): void {
  d3.json(jsonUrl).then((data: any) => {
    // Assume data is AlbumSalesData[]
    const sales: AlbumSalesData[] = data;

    // Set up SVG dimensions
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Remove any previous SVG
    d3.select(containerSelector).select('svg').remove();

    // Create SVG
    const svg = d3
      .select(containerSelector)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Get unique months and years
    const months = Array.from(new Set(sales.map(d => d.month)));
    const years = Array.from(new Set(sales.map(d => d.year)));
    const yearStrings = years.map(String);

    // Create scales for x and y axis
    const x = d3.scaleBand()
      .domain(months)
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(sales, d => d.albumsSold) || 0])
      .nice()
      .range([height, 0]);

    // Color scale for years
    const color = d3.scaleOrdinal<string>()
      .domain(yearStrings)
      .range(d3.schemeCategory10);

    // Group data by year
    const dataByYear = years.map(year => ({
      year,
      values: sales.filter(d => d.year === year)
    }));

    // Draw bars for each year
    dataByYear.forEach((group, i) => {
      svg.selectAll(`.bar-year-${group.year}`)
        .data(group.values)
        .enter()
        .append('rect')
        .attr('class', `bar-year-${group.year}`)
        .attr('x', d => (x(d.month) as number) + (i * (x.bandwidth() / years.length)))
        .attr('y', d => y(d.albumsSold))
        .attr('width', x.bandwidth() / years.length)
        .attr('height', d => height - y(d.albumsSold))
        .attr('fill', color(String(group.year)));
    });

    // Create axes for the x and y axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    // Axis labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Month');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .text('Albums Sold');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 100}, 0)`);

    years.forEach((year, i) => {
      legend.append('rect')
        .attr('x', 0)
        .attr('y', i * 20)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', color(String(year)));
      legend.append('text')
        .attr('x', 25)
        .attr('y', i * 20 + 13)
        .text(year.toString());
    });
  });
}
