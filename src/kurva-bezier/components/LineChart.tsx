import { ResponsiveLine } from '@nivo/line'
import { LineSvgProps } from '@nivo/line';


const MyResponsiveLine = ( props : LineSvgProps) => {
    return (
        <ResponsiveLine
            data={props.data}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            xScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false,
                clamp: true
            }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false,
                clamp: true
            }}
            yFormat=" >-.2f"
            xFormat=" >-.2f"
            axisTop={null}
            axisRight={null}    
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Y-axis',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'X-axis',
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}                      
            pointSize={5}
            pointColor="#ffffff"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            colors={{ scheme: 'accent' }}
            legends={
                [
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 250,
                        translateY: 50,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]
            }
            theme={{
                text: {
                    fill: '#ffffff'
                },
                grid:{
                    line: {
                        stroke: '#3e3e3e',
                        strokeWidth: 1
                    }
                },
                axis:{
                    ticks:{
                        line: {
                            stroke: '#3e3e3e',
                            strokeWidth: 1
                        },
                        text: {
                            fill: '#ffffff'
                        }
                    }
                },
                tooltip:{
                    container:{
                        background: '#2e2e2e',
                        color: '#ffffff',
                        fontSize: '14px',
                    }
                },
                crosshair:{
                    line: {
                        stroke: '#ffffff',
                        strokeWidth: 1
                    }
                }
            }}
        />
    )
}

export default MyResponsiveLine;