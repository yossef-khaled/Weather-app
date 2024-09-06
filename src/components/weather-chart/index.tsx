import * as React from "react";
import * as d3 from "d3";
import { useChartDimensions } from "../../utils/hooks";
import { AxisDimensions, formatAPITime } from "../../utils/functions";
import {
    CHART_LINE_WIDTH,
  HOURLY_SAMPLES_STEP,
  MEDIUM_GRAY,
  PRIMARY_COLOR,
  TEMPERATURE_CHART_ANIMATION_DURATION,
  TEMPERATURE_CHART_ANIMATION_STAGGER,
  TEMPERATURE_CHART_Y_AXIS_STEPS,
  WEATHER_SAMPLES_ENDING_HOUR,
  WEATHER_SAMPLES_STARTING_HOUR,
} from "../../utils/consts";

type BoundedDimensions = AxisDimensions & {
    boundedWidth: number;
    boundedHeight: number;
}

function drawChart(
  svgRef: React.RefObject<SVGSVGElement>,
  dimensions: BoundedDimensions,
  data: WeatherSample[]
) {
    console.log(dimensions)
  
    const svg = d3.select(svgRef.current);
    const height = dimensions.height ?? 500;
    const margin = dimensions.margin;

    /* Scale */

    // X-axis
    const xScale = d3
        .scaleLinear()
        .domain([WEATHER_SAMPLES_STARTING_HOUR, WEATHER_SAMPLES_ENDING_HOUR])
        .range([0, dimensions.boundedWidth - margin]);
  
    const X_AXIS_TICKS = Math.max(1, Math.floor(dimensions.boundedWidth / HOURLY_SAMPLES_STEP));
  
    // Y-axis
    const [minY, maxY] = d3.extent(data, (d: WeatherSample) => d.temperature);
    const yScale = d3
        .scaleLinear()
        .domain([minY ?? 0, maxY ?? 20])
        .range([height - margin, 0]);

    /* Add SVG */
    svg
        .attr("width", dimensions.boundedWidth + margin + "px")
        .attr("height", height + margin + "px")
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

    const xAxis = d3
        .axisBottom(xScale)
        .ticks(X_AXIS_TICKS)
        .tickFormat((d) => formatAPITime(d.toString()))
        .tickSize(height - margin)
        .tickSizeOuter(0)
        .tickPadding(15);

    const yAxis = d3
        .axisLeft(yScale)
        .tickSize(margin - dimensions.boundedWidth)
        .tickSizeOuter(0)
        .ticks(TEMPERATURE_CHART_Y_AXIS_STEPS)
        .tickPadding(10);

    // Add the X Axis to the chart SVG
    svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(${margin}, ${margin})`)
        .attr("font-weight", "800")
        .attr("font-family", '"Roboto", "sans-serif"')
        .attr("font-size", '0')
        .call(xAxis)
        .selectAll("line")
        .attr('stroke-width', "0")
        .selectAll(".domain")
        .attr('stroke-width', 0)

    // Add the Y Axis to the chart SVG
    svg
        .append("g")
        .attr("class", "y axis")
        .attr("transform", `translate(${margin}, ${margin})`)
        .attr("font-weight", "100")
        .attr("font-family", '"Roboto", "sans-serif"')
        .call(yAxis)
        .selectAll("line")
        .attr('stroke', MEDIUM_GRAY)
        .selectAll(".domain")
        .attr('stroke', MEDIUM_GRAY)
        .attr('stroke-width', '0.5')
        .append("text")
        .attr("y", 15)
        .attr("transform", "rotate(-90)")

    /* Add data line into SVG */
    const drawLine = d3
        .line<WeatherSample>()
        .x((d) => xScale(+d.time))
        .y((d) => yScale(d.temperature))
        // .curve(d3.curveBasis);

    const line = svg
        .append("g")
        .attr("class", "line")
        .attr("transform", `translate(${margin}, ${margin})`);

    // Draws out line and different points
    line
        .selectAll("line-group")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "line-group")
        .append("path")
        .attr("class", "line")
        .attr("d", drawLine(data))
        .style("stroke-width", CHART_LINE_WIDTH)
        // line color that connects dots
        .style("stroke", PRIMARY_COLOR)
        .style("fill", "none")

    /* Add circles in the line for each weather sample */
    line
        .selectAll("circle-group")
        .data(data)
        .enter()
        .append("g")
        .attr('class', 'font-bold fill-secondary-color')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "circle")
        .on("mouseover", function (_e: MouseEvent, hoveredCircleData) {
            svg.select(".temperature-text").remove()

            d3.select<SVGGElement, WeatherSample>(this)
                .style("cursor", "pointer")
                .append("text")
                .style('opacity', '0')
                .attr("class", "temperature-text")
                .text(`Temp: ${hoveredCircleData.temperature}° C`)
                .attr("x", (d) => xScale(+d.time) - 50)
                .attr("y", (d) => yScale(d.temperature) - 15)
                .transition()
                .style('opacity', '1')
                .duration(TEMPERATURE_CHART_ANIMATION_DURATION)
        })
        .append('circle')
        .transition()
        .duration(TEMPERATURE_CHART_ANIMATION_DURATION)
        .delay((d, i) => i * TEMPERATURE_CHART_ANIMATION_STAGGER)
        .attr('r', CHART_LINE_WIDTH)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr("cx", (d) => xScale(+d.time))
        .attr("cy", (d) => yScale(d.temperature))
}

type WeatherSample = {
  time: string;
  temperature: number;
};

interface WeatherChartProps {
  data: WeatherSample[];
  width: number;
  xScaleDomain: number[];
  xScaleRange?: number[];
  height?: number;
  margin: number;
}

const WeatherChart = ({
  data,
  width,
  height = 400,
  margin = 50,
}: WeatherChartProps) => {
    const { ref, dimensions } = useChartDimensions({
        width,
        height,
        margin
    });
    React.useEffect(() => {
        drawChart(ref, dimensions as BoundedDimensions, data);
    }, [ref]);

    return <svg className="text-black" id="chart-wrapper" ref={ref} />;
};

export default WeatherChart;