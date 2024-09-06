2
export enum EdgeDirection {
    Forward = 'forward',
    Backward = 'backward',
    Both = 'both',
    None = 'none'
}


export type EdgeProp = {
    weight: number;
    label?: string;
    lineWidth: number;
    color: string;
    lineStyle: string;
};

export type ExtEdgeProp = Record<string, unknown>;

export type ReqEdgeProp = Pick<EdgeProp, 'weight'>;

export type AutoEdgeProp = Omit<EdgeProp, keyof ReqEdgeProp>;

export const defaultEdgeProperty: AutoEdgeProp & ExtEdgeProp = {
    lineWidth: 1,
    color: '#000000',
    lineStyle: 'solid'
};

export const fillEdgeProperty = (edge: Edge): EdgeProp => { 
    const { props } = edge;
    return { ...defaultEdgeProperty, ...props };
}


export interface Edge {
    edgeId: string; // Unique ID for the edge
    source: number; // ID of the source node
    target: number; // ID of the target node
    props: ReqEdgeProp & Partial<AutoEdgeProp> & ExtEdgeProp; // Optional properties for the edge
    direction: EdgeDirection; // Optional direction for the edge
}
