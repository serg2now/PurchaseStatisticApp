export interface ChartPart {
    descriptionText: string;
    labelColor: string;
    color: string;
}

export interface RadialLevel {
    radius: number;
    color: string;
    value?: any;
}

export interface RadialSector extends ChartPart {
    sectorStartAngel: number;
    sectorEndAngel: number; 
    radialLevels: RadialLevel[];
}

export interface InnerCircle extends ChartPart {
    value: any;
    radius: number;
}

export interface ChartData {
    radialSectors: RadialSector[];
    innerCircle: InnerCircle;
}