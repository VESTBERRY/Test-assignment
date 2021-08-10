import React, {useRef} from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

export const Doughnut = (props) => {
  const {data} = props
  const chartRef = useRef()

  React.useEffect(() => {
    drawChart()
  }, [])

  const drawChart = () => {
    const svgContainer = d3.select(chartRef.current).node()
    const {width} = svgContainer.getBoundingClientRect()
    // Some responsive conditions mobile [ 0 - 600 ], table [ 600 - 1200 ], desktop [ > 1200 ]
    const mobile = window.innerWidth <= 600
    const tablet = window.innerWidth > 600 && window.innerWidth <= 1200
    const height = mobile ? width + data.length * 30 : tablet ? Math.max(5, data.length) * 30 : 350
    const radius = Math.min(width, height) / 2
    // Generate 10 random colors for each data
    // TODO: Create random colors based on the number of companies that are being fetched
    // After 10 companies the color is black
    const color = d3.schemeCategory10

    const pie = d3.pie().value(d => d.investmentSize)
    const dataReady = pie(data)
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + width + ' ' + height)

    const gsvg = svg
      .append('g')
      .attr('transform', 'translate(' + (mobile ? width / 2 : width / 4) + ',' + Math.min(width, height) / 2 + ')')
    // Doughnut chart
    gsvg
      .selectAll('whatever')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(radius / 1.55)
        .outerRadius(radius)
      )
      .attr('fill', (d) => color[d.data.id])
      .attr('stroke', '#fff')
      .style('stroke-width', '2')
      .style('opacity', '1')
    // Text inside the doughnut chart
    gsvg.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '34px')
      .attr('font-weight', 'bold')
      .attr('fill', '#555555')
      .attr('y', -5)
      .text(data.length)

    gsvg.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '16x')
      .attr('fill', '#555555')
      .attr('y', 20)
      .text('COMPANIES')
    // Legend on the right of the chart
    // Transform for some responsive cases
    const legend = svg.selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function (d, i) {
        let horizontal = 0
        if (mobile) {
          horizontal = 25
        } else if (tablet) {
          horizontal = width / 2 + 50
        } else {
          horizontal = i + 1 > 10 ? width / 2 + 350 : width / 2 + 50
        }
        let vertical = 0
        if (mobile) {
          vertical = width + 20 + i * 30
        } else if (tablet) {
          vertical = 20 + i * 30
        } else {
          vertical = 20 + i % 10 * 30
        }
        return 'translate(' + horizontal + ',' + vertical + ')'
      })
    // Circle left of each legend text
    legend.append('circle')
      .attr('r', 10)
      .style('fill', (d) => color[d.id])
      .style('stroke', (d) => color[d.id])
    // Text of the legend
    legend.append('text')
      .attr('x', 25)
      .attr('y', 5)
      .style('font-size', 15)
      .text(d => d.name)
  }

  return <div style={{width: '100%'}} ref={chartRef} />
}

Doughnut.propTypes = {
  data: PropTypes.array,
}

export default Doughnut
