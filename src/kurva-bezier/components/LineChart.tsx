import { ResponsiveLine } from '@nivo/line'
import { LineSvgProps } from '@nivo/line';

export interface lineData {
    id:   string | number;
    color: string;
    data: {
        x: number | string | Date
        y: number | string | Date
    }[];
}   

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