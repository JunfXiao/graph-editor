// Define Node interface


export type NodeProp = {
    x: number;
    y: number;
    backgroundColor?: string;
    textColor?: string;
    label?: string;
};

export type ExtNodeProp = Record<string, unknown>;

type ReqNodeProp = Pick<NodeProp, 'x' | 'y'>;
// everything els except those in RequiredNodeProperty
type AutoNodeProp = Omit<NodeProp, keyof ReqNodeProp>;

export const defaultNodeProperty: AutoNodeProp & ExtNodeProp = {
    backgroundColor: '#ffffff',
    textColor: '#000000',
};


export interface Node {
    id: number;
    props: ReqNodeProp & Partial<AutoNodeProp> & ExtNodeProp; // Properties of the node
}
